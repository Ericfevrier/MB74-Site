/**
 * Point d'entrée Directus pour o2switch (Phusion Passenger).
 *
 * À placer à la racine de l'app Directus (ex. ~/cms.motorboat74.com/start.js)
 * et à indiquer comme « Application startup file » dans cPanel > Setup Node.js App.
 *
 * Passenger injecte le port via process.env.PORT ; Directus le lit automatiquement.
 * Le dossier doit avoir "type":"module" dans son package.json (npm pkg set type=module).
 *
 * Vérif de l'export avant de démarrer (au cas où la version exposerait un autre nom) :
 *   node -e "import('directus/server').then(m=>console.log(Object.keys(m)))"
 */
import { startServer } from 'directus/server';

startServer();
