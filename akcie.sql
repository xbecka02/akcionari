-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Ned 19. úno 2017, 13:16
-- Verze serveru: 5.7.14
-- Verze PHP: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `akcie`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `akcie`
--

CREATE TABLE `akcie` (
  `id` int(30) NOT NULL,
  `jmeno` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `rodne_c` varchar(12) COLLATE utf8_bin DEFAULT NULL,
  `adresa` varchar(120) COLLATE utf8_bin DEFAULT NULL,
  `akcie` int(50) DEFAULT NULL,
  `1tis` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `10tis` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `100tis` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `byvaly` tinyint(1) NOT NULL DEFAULT '0',
  `poznamka` varchar(1500) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `akcie`
--
ALTER TABLE `akcie`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `akcie`
--
ALTER TABLE `akcie`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
