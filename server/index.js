/**
 * Serveur de production Motor Boat 74 — destiné à l'hébergement Node.js o2switch.
 *
 * Rôles :
 *   1. Servir le build statique de Vite (dossier ../dist)
 *   2. Exposer les endpoints d'envoi des formulaires (contact + hivernage)
 *   3. Renvoyer index.html pour toutes les routes SPA (react-router)
 *
 * o2switch (Phusion Passenger) injecte le port via process.env.PORT.
 */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config({ path: '.env.local' });
dotenv.config(); // .env en repli

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

/* ------------------------------------------------------------------ */
/*  E-mail (nodemailer)                                               */
/* ------------------------------------------------------------------ */

const mailEnabled = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
);

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
    // SMTP non configuré : on journalise au lieu d'échouer (utile en dev).
    console.log(`[mail simulé] ${subject}\n${text}\n`);
    return { simulated: true };
  }

  await transporter.sendMail({
    from: MAIL_FROM,
    to: MAIL_TO,
    replyTo: replyTo || MAIL_FROM,
    subject,
    text,
    html,
  });
  return { simulated: false };
}

/* ------------------------------------------------------------------ */
/*  API                                                               */
/* ------------------------------------------------------------------ */

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mailEnabled });
});

// Formulaire de contact (page d'accueil)
app.post('/api/contact', async (req, res) => {
  const { nom, prenom, tel, email, message, sujet } = req.body || {};
  if (!nom || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Champs requis manquants.' });
  }
  try {
    const fields = { Nom: nom };
    if (prenom) fields['Prénom'] = prenom;
    fields.Email = email;
    if (tel) fields['Téléphone'] = tel;
    if (sujet) fields.Sujet = sujet;
    fields.Message = message;
    const r = await sendMail({
      subject: sujet ? `Contact — ${sujet} — ${nom}` : `Nouveau message de contact — ${nom}`,
      fields,
      replyTo: email,
    });
    res.json({ ok: true, ...r });
  } catch (err) {
    console.error('Erreur envoi contact:', err);
    res.status(500).json({ ok: false, error: "L'envoi a échoué." });
  }
});

// Formulaire devis hivernage / stockage
app.post('/api/hivernage', async (req, res) => {
  const { nom, tel, email, modele, formule } = req.body || {};
  if (!nom || !email) {
    return res.status(400).json({ ok: false, error: 'Champs requis manquants.' });
  }
  try {
    const r = await sendMail({
      subject: `Demande de devis hivernage — ${nom}`,
      fields: {
        Nom: nom,
        Téléphone: tel || '—',
        Email: email,
        'Modèle de bateau': modele || '—',
        Formule: formule || '—',
      },
      replyTo: email,
    });
    res.json({ ok: true, ...r });
  } catch (err) {
    console.error('Erreur envoi hivernage:', err);
    res.status(500).json({ ok: false, error: "L'envoi a échoué." });
  }
});

/* ------------------------------------------------------------------ */
/*  Fichiers statiques + fallback SPA                                 */
/* ------------------------------------------------------------------ */

app.use(express.static(distDir, { index: false, maxAge: '1y' }));

// Toute autre route renvoie l'app React (react-router gère le routage).
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Motor Boat 74 — serveur démarré sur le port ${port} (mail: ${mailEnabled ? 'activé' : 'simulé'})`);
});
