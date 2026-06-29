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
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_slug (slug),
  KEY idx_status_sold (status, sold)
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
