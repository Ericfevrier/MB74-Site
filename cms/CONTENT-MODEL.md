# Modèle de contenu — CMS Directus MB74

Collections à créer dans Directus (mapping avec les données actuellement en dur).
Chaque collection « indexable » a un groupe de champs **SEO** réutilisable.

## Champs SEO (groupe répété sur les pages indexables)
- `seo_title` (string, ≤ 60)
- `seo_description` (text, ≤ 160)
- `seo_canonical` (string, optionnel)
- `seo_noindex` (boolean, défaut false)
- `og_image` (file)

## Collections

### `pages` (pages éditoriales : accueil, contact, team, légales…)
slug · title · sections (JSON/blocs) · groupe SEO · status (draft/published)

### `brands` (marques)
id (nautique, mastercraft…) · name · role (« Concessionnaire officiel » / « Importateur officiel ») · logo (file) · hero_image (file) · tagline · description · hero_wordmark (bool) · order

### `boat_models` (modèles neufs)
brand (M2O brands) · slug · name · short · gamme · year · tagline · intro · gallery (files) · specs (JSON) · highlights (JSON) · faqs (JSON) · groupe SEO · order

### `used_boats` (occasions + vendus)
slug · brand (M2O) · model_slug · title · year · price · price_value · capacity · power · hours · length · location · description · highlights (JSON) · image (file) · gallery (files) · **sold** (bool) · status

### `hivernage_cities` (pages locales)
slug · city · lake · h1 · intro · zones_intro · ports (JSON) · local_expertise (JSON) · zones_map (JSON: pins {name,lat,lng}) · groupe SEO

### `blog_articles`
slug · path · title · excerpt · category (M2O blog_categories) · date · image (file) · reading_time · body (rich text/blocs) · groupe SEO · status

### `blog_categories`
slug · name

### `services`
slug · title · desc · image (file) · groupe SEO · order

### `settings` (singleton — réglages globaux)
nap (nom, adresse, tel, email) · réseaux sociaux · geo (lat/lng) · scripts analytics · OG par défaut

### `contact_submissions` (entrées formulaires — non éditable, lecture)
nom · email · tel · message · subject · source_page · created_at · status (nouveau/traité)

## Rôles
- **Administrateur** : accès complet.
- **Éditeur** : CRUD contenu + médias, lecture des soumissions ; pas d'accès aux réglages système/utilisateurs.
- **Public (API)** : lecture seule des collections publiées (`status = published`, `seo_noindex` respecté).

## Workflow de publication (SEO)
À chaque publication, un **Flow Directus** déclenche le rebuild statique du site
(webhook → script de build prerendu) → le site public reste statique et indexable.
