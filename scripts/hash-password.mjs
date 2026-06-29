/**
 * Génère le hash bcrypt à mettre dans ADMIN_PASSWORD_HASH.
 * Usage : node scripts/hash-password.mjs 'MonMotDePasse'
 */
import bcrypt from 'bcryptjs';

const pwd = process.argv[2];
if (!pwd) {
  console.error("Usage : node scripts/hash-password.mjs 'MonMotDePasse'");
  process.exit(1);
}
const hash = await bcrypt.hash(pwd, 10);
console.log(hash);
