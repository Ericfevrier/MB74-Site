-- Schéma MariaDB / MySQL — Motor Boat 74 (admin).
-- À exécuter une fois sur la base o2switch (phpMyAdmin → onglet SQL, ou `mysql < db/schema.sql`).
-- Idempotent : `CREATE TABLE IF NOT EXISTS`.

-- Bateaux d'occasion (source live des pages /bateaux/occasion et des carrousels).
CREATE TABLE IF NOT EXISTS used_boats (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slug         VARCHAR(191) NOT NULL,
  model_slug   VARCHAR(191) NOT NULL DEFAULT '',
  brand        VARCHAR(64)  NOT NULL DEFAULT '',
  title        VARCHAR(255) NOT NULL,
  year         VARCHAR(8)   NOT NULL DEFAULT '',
  capacity     VARCHAR(64)  NULL,
  power        VARCHAR(128) NULL,
  hours        VARCHAR(64)  NULL,
  length       VARCHAR(64)  NULL,
  location     VARCHAR(128) NULL,
  price        VARCHAR(64)  NOT NULL DEFAULT '',
  price_value  INT UNSIGNED NULL,
  image        VARCHAR(512) NOT NULL DEFAULT '',
  gallery      JSON         NULL,
  description  TEXT         NULL,
  highlights   JSON         NULL,
  sold         TINYINT(1)   NOT NULL DEFAULT 0,
  status       VARCHAR(16)  NOT NULL DEFAULT 'published',
  sort_order   INT          NOT NULL DEFAULT 0,
  seo          LONGTEXT     NULL,
  publish_at   DATETIME     NULL,
  unpublish_at DATETIME     NULL,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_slug (slug),
  KEY idx_status_sold (status, sold)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Articles de blog (contenu en markdown, rendu côté site).
CREATE TABLE IF NOT EXISTS blog_articles (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slug         VARCHAR(191) NOT NULL,
  title        VARCHAR(255) NOT NULL,
  excerpt      TEXT         NULL,
  category     VARCHAR(64)  NOT NULL DEFAULT '',
  date         DATE         NULL,
  image        VARCHAR(512) NULL,
  reading_time VARCHAR(32)  NULL,
  content      MEDIUMTEXT   NULL,
  status       VARCHAR(16)  NOT NULL DEFAULT 'published',
  seo          LONGTEXT     NULL,
  publish_at   DATETIME     NULL,
  unpublish_at DATETIME     NULL,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_blog_slug (slug),
  KEY idx_blog_status (status, date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Marques (champs éditoriaux ; le structurel — modèles, comparatifs — reste dans le code).
-- `data` : page marque COMPLÈTE en JSON (identité, hero, description, introImages,
-- models « vitrine », comparatifs). Les colonnes restent pour le listing rapide.
CREATE TABLE IF NOT EXISTS brands (
  brand_id      VARCHAR(64)  NOT NULL PRIMARY KEY,
  name          VARCHAR(191) NULL,
  full_name     VARCHAR(191) NULL,
  role          VARCHAR(191) NULL,
  logo          VARCHAR(512) NULL,
  hero_image    VARCHAR(512) NULL,
  tagline       VARCHAR(255) NULL,
  description   TEXT         NULL,
  hero_wordmark TINYINT(1)   NOT NULL DEFAULT 0,
  data          LONGTEXT     NULL,
  updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Modèles de bateaux (fiches techniques complètes). La fiche entière (specs, galerie,
-- motorisations, éditions, options, millésimes, FAQ, points forts…) est stockée en JSON
-- dans `data`. Fusionnée en live par-dessus les données statiques du code (par brand+slug).
CREATE TABLE IF NOT EXISTS boat_models (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  brand      VARCHAR(64)  NOT NULL DEFAULT '',
  slug       VARCHAR(191) NOT NULL,
  name       VARCHAR(255) NOT NULL DEFAULT '',
  data       LONGTEXT     NULL,
  status     VARCHAR(16)  NOT NULL DEFAULT 'published',
  sort_order INT          NOT NULL DEFAULT 0,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_model (brand, slug),
  KEY idx_model_status (status, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Pages villes (hivernage par ville). ports / local_expertise stockés en JSON.
CREATE TABLE IF NOT EXISTS hivernage_cities (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slug             VARCHAR(191) NOT NULL,
  city             VARCHAR(191) NOT NULL,
  h1               VARCHAR(255) NULL,
  meta_title       VARCHAR(255) NULL,
  meta_description TEXT         NULL,
  hero             VARCHAR(512) NULL,
  intro            TEXT         NULL,
  lake             VARCHAR(191) NULL,
  zones_intro      TEXT         NULL,
  ports            JSON         NULL,
  local_expertise  JSON         NULL,
  seo              LONGTEXT     NULL,
  sort_order       INT          NOT NULL DEFAULT 0,
  status           VARCHAR(16)  NOT NULL DEFAULT 'published',
  created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_city_slug (slug),
  KEY idx_city_status (status, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Membres de l'équipe (page « La Team »).
CREATE TABLE IF NOT EXISTS team_members (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(191) NOT NULL,
  role       VARCHAR(191) NULL,
  bio        TEXT         NULL,
  image      VARCHAR(512) NULL,
  position   VARCHAR(64)  NULL,
  sort_order INT          NOT NULL DEFAULT 0,
  status     VARCHAR(16)  NOT NULL DEFAULT 'published',
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_team_status (status, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Réglages du site (clé/valeur) : coordonnées, réseaux, etc. (affichage live).
CREATE TABLE IF NOT EXISTS settings (
  name       VARCHAR(64) NOT NULL PRIMARY KEY,
  value      TEXT        NULL,
  updated_at TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Comptes admin additionnels (rôles). Le compte des variables d'env reste le
-- super-admin « bootstrap » (fonctionne même si cette table est vide).
CREATE TABLE IF NOT EXISTS admin_users (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username      VARCHAR(64)  NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(16)  NOT NULL DEFAULT 'admin',
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_admin_user (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Journal d'activité (qui a modifié quoi et quand).
CREATE TABLE IF NOT EXISTS activity_log (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(64)  NOT NULL DEFAULT '',
  action     VARCHAR(16)  NOT NULL DEFAULT '',
  entity     VARCHAR(64)  NOT NULL DEFAULT '',
  entity_id  VARCHAR(64)  NULL,
  detail     VARCHAR(255) NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_activity_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Historique de versions (snapshot avant chaque modification, pour restauration).
CREATE TABLE IF NOT EXISTS content_versions (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  entity_type VARCHAR(32)  NOT NULL,
  entity_id   INT UNSIGNED NOT NULL,
  data        LONGTEXT     NULL,
  username    VARCHAR(64)  NOT NULL DEFAULT '',
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_versions_entity (entity_type, entity_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Messages de contact (formulaires contact + hivernage).
CREATE TABLE IF NOT EXISTS contact_submissions (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nom          VARCHAR(191) NOT NULL DEFAULT '',
  email        VARCHAR(191) NOT NULL DEFAULT '',
  tel          VARCHAR(64)  NULL,
  subject      VARCHAR(191) NULL,
  message      TEXT         NULL,
  source_page  VARCHAR(512) NULL,
  is_read      TINYINT(1)   NOT NULL DEFAULT 0,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_read_created (is_read, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
