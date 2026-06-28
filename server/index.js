/**
 * Serveur de production Motor Boat 74 — app Node.js (SPA React Router v7) pour o2switch.
 *
 * Architecture identique à Ilico (qui tourne sans souci sur o2switch), mais avec
 * PRÉRENDU SEO :
 *   - Chaque route a un HTML statique généré au build (build/client/<route>/index.html)
 *     contenant titres, métas, JSON-LD et contenu → indexable sans JS. Le navigateur
 *     réhydrate par-dessus (toujours du SPA, pas de SSR lourd → o2switch n'est pas saturé).
 *   - Routes inconnues (404, etc.) → shell SPA léger (__spa-fallback.html).
 *   - Endpoints formulaires (contact + hivernage) : persistance Directus + e-mail.
 *
 * o2switch (Phusion Passenger) injecte le port via process.env.PORT.
 * Build attendu : `npm run build:ssr` (génère build/client prérendu).
 */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config({ path: '.env.local' });
dotenv.config(); // .env en repli

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const clientDir = path.join(rootDir, 'build', 'client');
const indexHtml = path.join(clientDir, 'index.html');
const spaFallback = path.join(clientDir, '__spa-fallback.html');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);

/* ------------------------------------------------------------------ */
/*  Directus (persistance des soumissions)                            */
/* ------------------------------------------------------------------ */

const CMS_URL = process.env.CMS_URL;
// Token d'écriture : idéalement un token dédié avec droit "create" sur contact_submissions.
const CMS_WRITE_TOKEN = process.env.CMS_WRITE_TOKEN || process.env.CMS_TOKEN;

let _adminTok = null;
let _adminAt = 0;
async function cmsToken() {
  if (CMS_WRITE_TOKEN) return CMS_WRITE_TOKEN;
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    if (!_adminTok || Date.now() - _adminAt > 10 * 60 * 1000) {
      const r = await fetch(`${CMS_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }),
      });
      if (!r.ok) throw new Error(`CMS login -> ${r.status}`);
      _adminTok = (await r.json()).data.access_token;
      _adminAt = Date.now();
    }
    return _adminTok;
  }
  return null;
}

/** Crée un enregistrement dans contact_submissions. Lève en cas d'échec (géré par l'appelant). */
async function saveSubmission(record) {
  if (!CMS_URL) return { stored: false, reason: 'no-cms' };
  const token = await cmsToken();
  const r = await fetch(`${CMS_URL}/items/contact_submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(record),
  });
  if (!r.ok) throw new Error(`CMS create -> ${r.status} ${await r.text()}`);
  return { stored: true };
}

/* ------------------------------------------------------------------ */
/*  E-mail (nodemailer)                                               */
/* ------------------------------------------------------------------ */

const mailEnabled = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

const transporter = mailEnabled
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE ?? 'true') === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

const MAIL_TO = process.env.MAIL_TO || 'contact@motorboat74.com';
const MAIL_FROM = process.env.MAIL_FROM || 'no-reply@motorboat74.com';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendMail({ subject, fields, replyTo }) {
  const rows = Object.entries(fields)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px;font-weight:bold">${escapeHtml(k)}</td><td style="padding:4px 12px">${escapeHtml(v)}</td></tr>`,
    )
    .join('');
  const html = `<h2>${escapeHtml(subject)}</h2><table>${rows}</table>`;
  const text = Object.entries(fields)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  if (!transporter) {
    console.log(`[mail simulé] ${subject}\n${text}\n`);
    return { simulated: true };
  }
  await transporter.sendMail({ from: MAIL_FROM, to: MAIL_TO, replyTo: replyTo || MAIL_FROM, subject, text, html });
  return { simulated: false };
}

/**
 * Traite une soumission : persiste dans Directus ET envoie l'e-mail, indépendamment.
 * Réussit si AU MOINS un canal aboutit ; échoue seulement si les deux échouent.
 */
async function handleSubmission(res, { record, subject, fields, replyTo }) {
  const [store, mail] = await Promise.allSettled([
    saveSubmission(record),
    sendMail({ subject, fields, replyTo }),
  ]);
  if (store.status === 'rejected') console.error('Persistance CMS échouée:', store.reason?.message || store.reason);
  if (mail.status === 'rejected') console.error('Envoi e-mail échoué:', mail.reason?.message || mail.reason);

  const stored = store.status === 'fulfilled' && store.value?.stored;
  const mailed = mail.status === 'fulfilled';
  if (!stored && !mailed) {
    return res.status(502).json({ ok: false, error: "L'envoi a échoué, merci de réessayer ou de nous appeler." });
  }
  res.json({ ok: true, stored: !!stored, mailed });
}

/* ------------------------------------------------------------------ */
/*  API                                                               */
/* ------------------------------------------------------------------ */

app.use('/api', express.json({ limit: '1mb' }));
app.use('/api', express.urlencoded({ extended: true }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mailEnabled, cms: Boolean(CMS_URL) });
});

// Formulaire de contact (toutes pages)
app.post('/api/contact', async (req, res) => {
  const { nom, prenom, tel, email, message, sujet } = req.body || {};
  if (!nom || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Champs requis manquants.' });
  }
  const fullName = [prenom, nom].filter(Boolean).join(' ').trim();
  const sourcePage = req.body?.source_page || req.get('referer') || '';
  const fields = { Nom: fullName };
  fields.Email = email;
  if (tel) fields['Téléphone'] = tel;
  if (sujet) fields.Sujet = sujet;
  fields.Message = message;
  await handleSubmission(res, {
    record: { nom: fullName, email, tel: tel || null, subject: sujet || 'Contact', message, source_page: sourcePage },
    subject: sujet ? `Contact — ${sujet} — ${fullName}` : `Nouveau message de contact — ${fullName}`,
    fields,
    replyTo: email,
  });
});

// Formulaire devis hivernage / stockage
app.post('/api/hivernage', async (req, res) => {
  const { nom, tel, email, modele, formule } = req.body || {};
  if (!nom || !email) {
    return res.status(400).json({ ok: false, error: 'Champs requis manquants.' });
  }
  const sourcePage = req.body?.source_page || req.get('referer') || '';
  const msg = [modele && `Modèle : ${modele}`, formule && `Formule : ${formule}`].filter(Boolean).join(' — ') || '—';
  await handleSubmission(res, {
    record: { nom, email, tel: tel || null, subject: 'Devis hivernage', message: msg, source_page: sourcePage },
    subject: `Demande de devis hivernage — ${nom}`,
    fields: { Nom: nom, Téléphone: tel || '—', Email: email, 'Modèle de bateau': modele || '—', Formule: formule || '—' },
    replyTo: email,
  });
});

/* ------------------------------------------------------------------ */
/*  SPA : assets statiques + fallback index.html                      */
/* ------------------------------------------------------------------ */

// Assets fingerprintés → cache immuable ; autres fichiers publics → cache court.
app.use('/assets', express.static(path.join(clientDir, 'assets'), { immutable: true, maxAge: '1y' }));
// redirect:false → ne pas rediriger '/depannage' vers '/depannage/' (les dossiers
// prérendus existent) ; le catch-all sert directement le HTML de la route.
app.use(express.static(clientDir, { maxAge: '1h', index: false, redirect: false }));

// Route → HTML prérendu de la page si présent (SEO), sinon shell SPA (React Router
// gère alors le routage côté client, y compris la page 404).
app.get('*', (req, res) => {
  const rel = decodeURIComponent(req.path).replace(/\/+$/, ''); // '/contact/' → '/contact'
  const candidate = rel === '' ? indexHtml : path.join(clientDir, rel, 'index.html');
  // HTML peu caché : un nouveau déploiement doit être pris en compte rapidement.
  res.set('Cache-Control', 'no-cache');
  // Garde-fou anti-traversal : le fichier servi doit rester sous clientDir.
  if (candidate.startsWith(clientDir) && existsSync(candidate)) {
    return res.sendFile(candidate);
  }
  res.sendFile(existsSync(spaFallback) ? spaFallback : indexHtml);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Motor Boat 74 — SPA démarré sur le port ${port} ` +
      `(mail: ${mailEnabled ? 'activé' : 'simulé'}, cms: ${CMS_URL ? 'connecté' : 'non configuré'})`,
  );
});
