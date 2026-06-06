# Déploiement sur o2switch (Node.js)

Ce site est une application **React/Vite** servie par un **serveur Express**
(`server/index.js`) qui gère aussi l'envoi des formulaires par e-mail.

## 1. Pré-requis côté o2switch (cPanel)

1. **Créer le compte e-mail** d'envoi dans cPanel → *Comptes de messagerie*
   (ex. `contact@motorboat74.com`). Noter le mot de passe et les paramètres SMTP
   (généralement `mail.votredomaine.com`, port `465`, SSL).
2. Avoir un accès **SSH** ou le **Gestionnaire de fichiers** + *Setup Node.js App*.

## 2. Envoyer le code

Déposer le contenu du projet dans un dossier hors `public_html`
(ex. `~/motorboat74`), **sans** `node_modules` ni `dist` (ils seront générés).

Via git (recommandé) :
```bash
cd ~
git clone <votre-repo> motorboat74
cd motorboat74
```

## 3. Configurer l'application Node.js (cPanel → « Setup Node.js App »)

| Champ | Valeur |
|---|---|
| Node.js version | 18 ou supérieur |
| Application mode | Production |
| Application root | `motorboat74` |
| Application URL | votre domaine |
| Application startup file | `server/index.js` |

Cliquer **Create**. cPanel crée un environnement et un fichier `.htaccess`
(Passenger). Il injecte automatiquement la variable `PORT`.

## 4. Variables d'environnement

Dans l'interface « Setup Node.js App », ajouter les variables (ou créer un
fichier `.env` à la racine, voir `.env.example`) :

```
SMTP_HOST=mail.motorboat74.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@motorboat74.com
SMTP_PASS=••••••••
MAIL_TO=contact@motorboat74.com
MAIL_FROM=no-reply@motorboat74.com
```
> Sans ces variables, les formulaires sont acceptés mais seulement journalisés
> (aucun e-mail envoyé).

## 5. Installer et construire

Depuis l'interface (bouton **Run NPM Install**) puis, en SSH dans le venv de l'app :
```bash
npm install
npm run build      # génère le dossier dist/
```
> `dist/` doit exister : c'est ce que le serveur Express sert.

## 6. Démarrer / Redémarrer

Cliquer **Restart** dans « Setup Node.js App ». Le serveur démarre via
`server/index.js` et écoute le port fourni par Passenger.

Vérification : `https://votredomaine.com/api/health` doit répondre
`{"ok":true,"mailEnabled":true}`.

## 7. À chaque mise à jour

```bash
git pull
npm install        # si dépendances modifiées
npm run build
# puis Restart dans cPanel
```

---

## Développement local

```bash
npm install
npm run dev         # front Vite sur http://localhost:3000
npm run dev:server  # (autre terminal) API Express sur http://localhost:8787
```
Le proxy Vite relaie `/api/*` vers le serveur Express.

Pour tester exactement comme en production :
```bash
npm run serve       # build + serveur Express (http://localhost:3000)
```
