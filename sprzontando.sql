-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 25, 2026 at 06:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sprzontando`
--

-- --------------------------------------------------------

--
-- Table structure for table `chetny`
--

CREATE TABLE `chetny` (
  `id` int(11) NOT NULL,
  `id_ogloszenia` int(11) DEFAULT NULL,
  `id_chetnego` int(11) DEFAULT NULL,
  `zgloszenie` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chetny`
--

INSERT INTO `chetny` (`id`, `id_ogloszenia`, `id_chetnego`, `zgloszenie`) VALUES
(1, 44, 1, '2026-04-27 18:49:49'),
(2, 44, 7, '2026-04-27 18:49:49'),
(3, 44, 4, '2026-04-27 18:49:49'),
(4, 44, 3, '2026-04-27 18:49:49'),
(5, 10, 2, '2026-04-27 18:49:49'),
(6, 10, 4, '2026-04-27 18:49:49'),
(7, 10, 1, '2026-04-27 18:49:49'),
(8, 10, 15, '2026-04-27 18:49:49'),
(9, 10, 13, '2026-04-27 18:49:49'),
(10, 12, 1, '2026-04-27 18:49:49'),
(11, 18, 1, '2026-04-27 18:49:49'),
(12, 43, 1, '2026-04-27 18:49:49'),
(13, 55, 1, '2026-04-27 18:49:49'),
(14, 55, 12, '2026-04-27 18:49:49'),
(15, 55, 2, '2026-04-27 18:49:49'),
(16, 55, 6, '2026-04-27 18:49:49'),
(17, 25, 2, '2026-04-27 18:49:49'),
(18, 34, 3, '2026-04-27 18:49:49'),
(19, 32, 2, '2026-04-27 18:49:49'),
(20, 19, 2, '2026-04-27 18:49:49'),
(21, 60, 2, '2026-04-27 18:49:49'),
(22, 60, 1, '2026-04-27 18:49:49'),
(23, 60, 5, '2026-04-27 18:49:49'),
(24, 60, 7, '2026-04-27 18:49:49'),
(25, 61, 1, '2026-04-27 18:49:49'),
(26, 61, 6, '2026-04-27 18:49:49'),
(27, 61, 12, '2026-04-27 18:49:49'),
(28, 61, 17, '2026-04-27 18:49:49');

-- --------------------------------------------------------

--
-- Table structure for table `ogloszenia_oferty`
--

CREATE TABLE `ogloszenia_oferty` (
  `id` int(11) NOT NULL,
  `tytul` varchar(255) DEFAULT NULL,
  `kategoria` varchar(50) DEFAULT NULL,
  `miasto` varchar(100) DEFAULT NULL,
  `adres` varchar(255) DEFAULT NULL,
  `cena` float DEFAULT NULL,
  `opis` varchar(500) DEFAULT NULL,
  `utworzenie` timestamp NOT NULL DEFAULT current_timestamp(),
  `waznosc` datetime DEFAULT NULL,
  `data_zakonczenia` datetime DEFAULT NULL,
  `id_zglasz` int(11) DEFAULT NULL,
  `ban` int(11) NOT NULL DEFAULT 0,
  `report_count` int(11) NOT NULL DEFAULT 0,
  `zakonczone` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ogloszenia_oferty`
--

INSERT INTO `ogloszenia_oferty` (`id`, `tytul`, `kategoria`, `miasto`, `adres`, `cena`, `opis`, `utworzenie`, `waznosc`, `data_zakonczenia`, `id_zglasz`, `ban`, `report_count`, `zakonczone`) VALUES
(1, 'Apartament z widokiem na park', 'Mieszkania', 'Warszawa', 'ul. Parkowa 12', 850, 'Nowoczesny apartament 75m2 z balkonem', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 1, 0, 0, 0),
(2, 'Kawalerka inwestycyjna', 'Mieszkania', 'Kraków', 'ul. Szkolna 8', 1000, 'Idealne pod wynajem 28m2', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 2, 0, 0, 0),
(3, 'Lokal biurowy 120m2', 'Biura', 'Wrocław', 'ul. Biznesowa 5', 1500, 'Biuro w centrum miasta', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 3, 0, 0, 0),
(4, 'Nowoczesne biuro open space', 'Biura', 'Poznań', 'ul. Nowa 4', 1120, 'Powierzchnia 95m2', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 4, 0, 0, 0),
(5, 'Garaż podziemny monitorowany', 'Garaże', 'Gdańsk', 'ul. Morska 11', 17, 'Bezpieczny garaż z monitoringiem', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 5, 0, 0, 0),
(6, 'Garaż przy osiedlu zamkniętym', 'Garaże', 'Łódź', 'ul. Wspólna 3', 225, 'Murowany garaż 18m2', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 6, 0, 0, 0),
(7, 'Piwnica 20m2 sucha', 'Piwnice', 'Lublin', 'ul. Zielona 9', 170, 'Piwnica w bloku mieszkalnym', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 7, 0, 0, 0),
(8, 'Piwnica magazynowa 15m2', 'Piwnice', 'Szczecin', 'ul. Jasna 6', 140, 'Dodatkowa przestrzeń', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 8, 0, 0, 0),
(9, 'Ogród działkowy ROD', 'Ogrody', 'Bydgoszcz', 'ul. Kwiatowa 20', 920, 'Działka 400m2 z altaną', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 9, 0, 0, 0),
(10, 'Ogród rekreacyjny z domkiem', 'Ogrody', 'Białystok', 'ul. Polna 18', 1050, 'Zadbany ogród z mediami', '2026-05-25 15:46:09', '2026-06-08 17:45:17', '2026-06-09 17:45:17', 10, 0, 0, 1),
(11, 'Magazyn wysokiego składowania', 'Magazyny', 'Katowice', 'ul. Przemysłowa 7', 3200, 'Hala 500m2', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 1, 0, 0, 0),
(12, 'Magazyn z rampą załadunkową', 'Magazyny', 'Rzeszów', 'ul. Handlowa 15', 2100, 'Powierzchnia 350m2', '2026-05-25 15:46:09', '2026-06-08 17:45:17', '2026-06-09 17:45:17', 2, 0, 0, 1),
(13, 'Mieszkanie 3 pokoje', 'Mieszkania', 'Opole', 'ul. Słoneczna 2', 560, 'Rodzinne mieszkanie 60m2', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 3, 0, 0, 0),
(14, 'Apartament premium 100m2', 'Mieszkania', 'Gdynia', 'ul. Klifowa 1', 2137, 'Widok na morze', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 4, 0, 0, 0),
(15, 'Biuro 80m2 centrum', 'Biura', 'Warszawa', 'ul. Marszałkowska 10', 1340, 'Doskonała lokalizacja', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 5, 0, 0, 0),
(16, 'Lokal biurowy 60m2', 'Biura', 'Kraków', 'ul. Długa 14', 890, 'Idealny dla startupu', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 6, 0, 0, 0),
(17, 'Garaż jednostanowiskowy', 'Garaże', 'Wrocław', 'ul. Leśna 12', 470, 'Blisko centrum', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 7, 0, 0, 0),
(18, 'Garaż dwustanowiskowy', 'Garaże', 'Poznań', 'ul. Brzozowa 4', 990, 'Duży garaż 30m2', '2026-05-25 15:46:09', '2026-06-08 17:45:17', '2026-06-09 17:45:17', 8, 0, 0, 1),
(19, 'Piwnica 10m2', 'Piwnice', 'Gdańsk', 'ul. Różana 5', 90, 'Mała komórka lokatorska', '2026-05-25 15:46:09', '2026-06-08 17:45:17', '2026-06-09 17:45:17', 9, 0, 0, 1),
(20, 'Piwnica 25m2', 'Piwnice', 'Łódź', 'ul. Wiosenna 9', 220, 'Duża piwnica z wentylacją', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 10, 0, 0, 0),
(21, 'Ogród 500m2', 'Ogrody', 'Lublin', 'ul. Letnia 6', 1150, 'Duża działka rekreacyjna', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 1, 0, 0, 0),
(22, 'Ogród z altaną', 'Ogrody', 'Szczecin', 'ul. Spacerowa 7', 980, 'Altana i prąd', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 2, 0, 0, 0),
(23, 'Magazyn 200m2', 'Magazyny', 'Bydgoszcz', 'ul. Składowa 3', 1850, 'Suchy magazyn', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 3, 0, 0, 0),
(24, 'Magazyn 150m2', 'Magazyny', 'Białystok', 'ul. Towarowa 8', 1420, 'Dobry do logistyki', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 4, 0, 0, 0),
(25, 'Mieszkanie 2 pokoje', 'Mieszkania', 'Katowice', 'ul. Graniczna 9', 430, 'Blisko uczelni', '2026-05-25 15:46:09', '2026-06-08 17:45:17', '2026-06-09 17:45:17', 5, 0, 0, 1),
(26, 'Mieszkanie loftowe', 'Mieszkania', 'Rzeszów', 'ul. Fabryczna 4', 610, 'Styl industrialny', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 6, 0, 0, 0),
(27, 'Biuro 150m2', 'Biura', 'Opole', 'ul. Centrum 1', 1750, 'Duża przestrzeń', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 7, 0, 0, 0),
(28, 'Biuro 45m2', 'Biura', 'Gdynia', 'ul. Portowa 12', 620, 'Małe biuro', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 8, 0, 0, 0),
(29, 'Garaż w centrum', 'Garaże', 'Warszawa', 'ul. Krótka 3', 300, 'Świetna lokalizacja', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 9, 0, 0, 0),
(30, 'Garaż osiedlowy', 'Garaże', 'Kraków', 'ul. Piastowska 6', 130, 'Blisko bloku', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 10, 0, 0, 0),
(31, 'Piwnica 12m2', 'Piwnice', 'Wrocław', 'ul. Śląska 5', 110, 'Sucha i bezpieczna', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 1, 0, 0, 0),
(32, 'Piwnica 18m2', 'Piwnice', 'Poznań', 'ul. Dębowa 8', 160, 'Dodatkowa przestrzeń', '2026-05-25 15:46:09', '2026-06-08 17:45:17', '2026-06-09 17:45:17', 2, 0, 0, 1),
(33, 'Ogród rodzinny', 'Ogrody', 'Gdańsk', 'ul. Ogrodowa 4', 990, 'Spokojna okolica', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 3, 0, 0, 0),
(34, 'Ogród 300m2', 'Ogrody', 'Łódź', 'ul. Kwiatowa 9', 870, 'Idealny na weekend', '2026-05-25 15:46:09', '2026-06-08 17:45:17', '2026-06-09 17:45:17', 4, 0, 0, 1),
(35, 'Magazyn 600m2', 'Magazyny', 'Lublin', 'ul. Produkcyjna 2', 5200, 'Duża hala', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 5, 0, 0, 0),
(36, 'Magazyn 100m2', 'Magazyny', 'Szczecin', 'ul. Magazynowa 7', 990, 'Mały magazyn', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 6, 0, 0, 0),
(37, 'Apartament 4 pokoje', 'Mieszkania', 'Bydgoszcz', 'ul. Szeroka 11', 780, 'Duże mieszkanie rodzinne', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 7, 0, 0, 0),
(38, 'Mieszkanie przy lesie', 'Mieszkania', 'Białystok', 'ul. Leśna 10', 520, 'Cicha okolica', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 8, 0, 0, 0),
(39, 'Biuro w kamienicy', 'Biura', 'Katowice', 'ul. Rynek 3', 9700, 'Stylowe wnętrze', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 9, 0, 0, 0),
(40, 'Biuro 200m2', 'Biura', 'Rzeszów', 'ul. Plac 1', 2200, 'Duża przestrzeń biurowa', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 10, 0, 0, 0),
(41, 'Garaż 25m2', 'Garaże', 'Opole', 'ul. Garażowa 4', 213, 'Duży garaż', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 1, 0, 0, 0),
(42, 'Garaż z prądem', 'Garaże', 'Gdynia', 'ul. Elektryczna 5', 475, 'Podłączony prąd', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 2, 0, 0, 0),
(43, 'Piwnica 14m2', 'Piwnice', 'Warszawa', 'ul. Dolna 8', 130, 'Wysoki sufit', '2026-05-25 15:46:09', '2026-06-08 17:45:17', '2026-06-09 17:45:17', 3, 0, 0, 1),
(44, 'Piwnica 30m2', 'Piwnice', 'Kraków', 'ul. Górna 6', 260, 'Duża powierzchnia', '2026-05-25 15:46:09', '2026-06-08 17:45:17', '2026-06-09 17:45:17', 4, 0, 0, 1),
(45, 'Ogród z domkiem murowanym', 'Ogrody', 'Wrocław', 'ul. Zielna 5', 1200, 'Domek całoroczny', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 5, 0, 0, 0),
(46, 'Ogród blisko jeziora', 'Ogrody', 'Poznań', 'ul. Wodna 2', 108, 'Malownicza lokalizacja', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 6, 0, 0, 0),
(47, 'Magazyn z biurem', 'Magazyny', 'Gdańsk', 'ul. Logistyczna 3', 3400, 'Magazyn + zaplecze biurowe', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 7, 0, 0, 0),
(48, 'Magazyn ogrzewany', 'Magazyny', 'Łódź', 'ul. Ciepła 6', 2750, 'Ogrzewany obiekt', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 8, 0, 0, 0),
(49, 'Studio 35m2', 'Mieszkania', 'Lublin', 'ul. Akademicka 9', 410, 'Idealne dla studenta', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 9, 0, 0, 0),
(50, 'Penthouse z tarasem', 'Mieszkania', 'Szczecin', 'ul. Panorama 1', 1490, 'Taras 80m2', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 10, 0, 0, 0),
(51, 'Biuro przy rynku', 'Biura', 'Bydgoszcz', 'ul. Rynek 8', 1030, 'Ścisłe centrum', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 1, 0, 0, 0),
(52, 'Biuro 70m2', 'Biura', 'Białystok', 'ul. Centralna 4', 600, 'Nowoczesne wnętrze', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 2, 0, 0, 0),
(53, 'Garaż pod blokiem', 'Garaże', 'Katowice', 'ul. Blokowa 7', 199, 'Wygodny dojazd', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 3, 0, 0, 0),
(54, 'Garaż murowany 20m2', 'Garaże', 'Rzeszów', 'ul. Solidna 3', 200, 'Trwała konstrukcja', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 4, 0, 0, 0),
(55, 'Piwnica z regałami', 'Piwnice', 'Opole', 'ul. Niska 2', 150, 'Gotowa do użytku', '2026-05-25 15:46:09', '2026-06-08 17:45:17', '2026-06-09 17:45:17', 5, 0, 0, 1),
(56, 'Piwnica klimatyzowana', 'Piwnice', 'Gdynia', 'ul. Chłodna 4', 200, 'Stała temperatura', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 6, 0, 0, 0),
(57, 'Ogród 450m2', 'Ogrody', 'Warszawa', 'ul. Relaksowa 5', 118, 'Blisko miasta', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 7, 0, 0, 0),
(58, 'Magazyn logistyczny 800m2', 'Magazyny', 'Kraków', 'ul. Transportowa 9', 750, 'Nowoczesny obiekt logistyczny', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 8, 0, 0, 0),
(59, 'Duże mieszkanie 5m2', 'Mieszkania', 'Warszawa', 'ul. Szósta 7', 250, 'Największe mieszkanie w Warszawie', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 1, 0, 0, 0),
(60, 'Garaż na osiedlu', 'Garaże', 'Kraków', 'ul. Kirkowa 2', 150, 'Mała powierzchnia', '2026-05-25 15:46:09', '2026-06-08 17:45:17', NULL, 3, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `ogloszenia_zrobione`
--

CREATE TABLE `ogloszenia_zrobione` (
  `id` int(11) NOT NULL,
  `id_ogl` int(11) NOT NULL,
  `id_wykon` int(11) NOT NULL,
  `ocena` int(11) DEFAULT NULL,
  `ocena_opis` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `ogloszenia_zrobione`
--

INSERT INTO `ogloszenia_zrobione` (`id`, `id_ogl`, `id_wykon`, `ocena`, `ocena_opis`) VALUES
(1, 44, 1, 4, NULL),
(2, 10, 2, 2, NULL),
(3, 12, 1, 3, NULL),
(4, 18, 1, 5, NULL),
(5, 43, 1, 4, NULL),
(6, 55, 1, 5, NULL),
(7, 25, 2, 2, NULL),
(8, 34, 3, 4, NULL),
(9, 32, 2, 1, NULL),
(10, 19, 2, 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `haslo` varchar(255) DEFAULT NULL,
  `nazwa` varchar(255) DEFAULT NULL,
  `utworzenie` timestamp NOT NULL DEFAULT current_timestamp(),
  `ban` int(11) DEFAULT NULL,
  `ban_data` datetime DEFAULT NULL,
  `ban_end` datetime DEFAULT NULL,
  `kod` int(4) DEFAULT NULL,
  `zatwierdzony` int(11) NOT NULL DEFAULT 0,
  `admin` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `haslo`, `nazwa`, `utworzenie`, `ban`, `ban_data`, `ban_end`, `kod`, `zatwierdzony`, `admin`) VALUES
(1, 'jan.kowalski@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'JanKowalski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(2, 'anna.nowak@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'AnnaNowak', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(3, 'piotr.zielinski@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'PiotrZielinski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(4, 'katarzyna.malysz@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'KasiaMalysz', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(5, 'marek.kowal@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'MarekKowal', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(6, 'magdalena.nowakowska@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'MagdaNowakowska', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(7, 'tomasz.wisniewski@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'TomekWisniewski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(8, 'joanna.kaczmarek@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'JoannaKaczmarek', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(9, 'adam.kowalczyk@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'AdamKowalczyk', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(10, 'ewa.szymanska@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'EwaSzymanska', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(11, 'piotr.lewandowski@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'PiotrLewandowski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(12, 'anna.wroblewska@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'AnnaWroblewska', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(13, 'marcin.kaminskii@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'MarcinKaminski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(14, 'agnieszka.sikora@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'AgnieszkaSikora', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(15, 'lukasz.jablonski@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'LukaszJablonski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(16, 'marta.krol@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'MartaKrol', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(17, 'pawel.dabrowski@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'PawelDabrowski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(18, 'monika.kowalska@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'MonikaKowalska', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(19, 'krzysztof.nowicki@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'KrzysztofNowicki', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(20, 'ania.wisniewska@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'AniaWisniewska', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, 1, 0),
(21, 'LORDMIOTLA@example.com', '$2y$10$Wz1/3pgEW7wK0FEpDmkOMeS8o0V.i9u4j0piqx2FZ5smKj6DMXMmO', 'BOHATER MIOTLY I MOPA', '2001-09-11 12:05:04', 0, NULL, NULL, NULL, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chetny`
--
ALTER TABLE `chetny`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ogloszenia_oferty`
--
ALTER TABLE `ogloszenia_oferty`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ogloszenia_zrobione`
--
ALTER TABLE `ogloszenia_zrobione`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_ogl` (`id_ogl`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`,`nazwa`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chetny`
--
ALTER TABLE `chetny`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `ogloszenia_oferty`
--
ALTER TABLE `ogloszenia_oferty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `ogloszenia_zrobione`
--
ALTER TABLE `ogloszenia_zrobione`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
