-- Adminer 5.4.1 MariaDB 12.0.2-MariaDB-ubu2404 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;

USE `messenger`;

SET NAMES utf8mb4;

CREATE TABLE `messages` (
    `id` int(8) unsigned NOT NULL AUTO_INCREMENT,
    `imie` varchar(255) NOT NULL,
    `nazwisko` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `wiadomosc` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


-- 2025-11-05 17:47:14 UTC
