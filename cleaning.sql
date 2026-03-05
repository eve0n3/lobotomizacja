-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 05 Mar 2026, 22:28
-- Wersja serwera: 10.4.24-MariaDB
-- Wersja PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `sprzontando`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `chetny`
--

CREATE TABLE `chetny` (
  `id` int(11) NOT NULL,
  `id_ogloszenia` int(11) DEFAULT NULL,
  `id_chetnego` int(11) DEFAULT NULL,
  `zgloszenie` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ogloszenia_oferty`
--

CREATE TABLE `ogloszenia_oferty` (
  `id` int(11) NOT NULL,
  `tytul` varchar(255) DEFAULT NULL,
  `kategoria` varchar(50) DEFAULT NULL,
  `miasto` varchar(100) DEFAULT NULL,
  `adres` varchar(255) DEFAULT NULL,
  `cena` float DEFAULT NULL,
  `opis` varchar(500) DEFAULT NULL,
  `utworzenie` datetime DEFAULT NULL,
  `waznosc` datetime DEFAULT NULL,
  `id_zglasz` int(11) DEFAULT NULL,
  `id_wykon` int(11) DEFAULT NULL,
  `ban` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `ogloszenia_oferty`
--

INSERT INTO `ogloszenia_oferty` (`id`, `tytul`, `kategoria`, `miasto`, `adres`, `cena`, `opis`, `utworzenie`, `waznosc`, `id_zglasz`, `id_wykon`, `ban`) VALUES
(1, 'Apartament z widokiem na park', 'Mieszkania', 'Warszawa', 'ul. Parkowa 12', 850, 'Nowoczesny apartament 75m2 z balkonem', '2025-01-01 10:00:00', '2025-06-01 10:00:00', 1, NULL, 0),
(2, 'Kawalerka inwestycyjna', 'Mieszkania', 'Kraków', 'ul. Szkolna 8', 1000, 'Idealne pod wynajem 28m2', '2025-01-02 10:00:00', '2025-06-02 10:00:00', 2, NULL, 0),
(3, 'Lokal biurowy 120m2', 'Biura', 'Wrocław', 'ul. Biznesowa 5', 1500, 'Biuro w centrum miasta', '2025-01-03 09:00:00', '2025-06-03 09:00:00', 3, NULL, 0),
(4, 'Nowoczesne biuro open space', 'Biura', 'Poznań', 'ul. Nowa 4', 1120, 'Powierzchnia 95m2', '2025-01-04 09:00:00', '2025-06-04 09:00:00', 4, NULL, 0),
(5, 'Garaż podziemny monitorowany', 'Garaże', 'Gdańsk', 'ul. Morska 11', 17, 'Bezpieczny garaż z monitoringiem', '2025-01-05 11:00:00', '2025-06-05 11:00:00', 5, NULL, 0),
(6, 'Garaż przy osiedlu zamkniętym', 'Garaże', 'Łódź', 'ul. Wspólna 3', 225, 'Murowany garaż 18m2', '2025-01-06 11:00:00', '2025-06-06 11:00:00', 6, NULL, 0),
(7, 'Piwnica 20m2 sucha', 'Piwnice', 'Lublin', 'ul. Zielona 9', 170, 'Piwnica w bloku mieszkalnym', '2025-01-07 08:00:00', '2025-06-07 08:00:00', 7, NULL, 0),
(8, 'Piwnica magazynowa 15m2', 'Piwnice', 'Szczecin', 'ul. Jasna 6', 140, 'Dodatkowa przestrzeń', '2025-01-08 08:00:00', '2025-06-08 08:00:00', 8, NULL, 0),
(9, 'Ogród działkowy ROD', 'Ogrody', 'Bydgoszcz', 'ul. Kwiatowa 20', 920, 'Działka 400m2 z altaną', '2025-01-09 14:00:00', '2025-06-09 14:00:00', 9, NULL, 0),
(10, 'Ogród rekreacyjny z domkiem', 'Ogrody', 'Białystok', 'ul. Polna 18', 1050, 'Zadbany ogród z mediami', '2025-01-10 14:00:00', '2025-06-10 14:00:00', 10, NULL, 0),
(11, 'Magazyn wysokiego składowania', 'Magazyny', 'Katowice', 'ul. Przemysłowa 7', 3200, 'Hala 500m2', '2025-01-11 12:00:00', '2025-06-11 12:00:00', 1, NULL, 0),
(12, 'Magazyn z rampą załadunkową', 'Magazyny', 'Rzeszów', 'ul. Handlowa 15', 2100, 'Powierzchnia 350m2', '2025-01-12 12:00:00', '2025-06-12 12:00:00', 2, NULL, 0),
(13, 'Mieszkanie 3 pokoje', 'Mieszkania', 'Opole', 'ul. Słoneczna 2', 560, 'Rodzinne mieszkanie 60m2', '2025-01-13 10:00:00', '2025-06-13 10:00:00', 3, NULL, 0),
(14, 'Apartament premium 100m2', 'Mieszkania', 'Gdynia', 'ul. Klifowa 1', 2137, 'Widok na morze', '2025-01-14 10:00:00', '2025-06-14 10:00:00', 4, NULL, 0),
(15, 'Biuro 80m2 centrum', 'Biura', 'Warszawa', 'ul. Marszałkowska 10', 1340, 'Doskonała lokalizacja', '2025-01-15 09:00:00', '2025-06-15 09:00:00', 5, NULL, 0),
(16, 'Lokal biurowy 60m2', 'Biura', 'Kraków', 'ul. Długa 14', 890, 'Idealny dla startupu', '2025-01-16 09:00:00', '2025-06-16 09:00:00', 6, NULL, 0),
(17, 'Garaż jednostanowiskowy', 'Garaże', 'Wrocław', 'ul. Leśna 12', 470, 'Blisko centrum', '2025-01-17 11:00:00', '2025-06-17 11:00:00', 7, NULL, 0),
(18, 'Garaż dwustanowiskowy', 'Garaże', 'Poznań', 'ul. Brzozowa 4', 990, 'Duży garaż 30m2', '2025-01-18 11:00:00', '2025-06-18 11:00:00', 8, NULL, 0),
(19, 'Piwnica 10m2', 'Piwnice', 'Gdańsk', 'ul. Różana 5', 90, 'Mała komórka lokatorska', '2025-01-19 08:00:00', '2025-06-19 08:00:00', 9, NULL, 0),
(20, 'Piwnica 25m2', 'Piwnice', 'Łódź', 'ul. Wiosenna 9', 220, 'Duża piwnica z wentylacją', '2025-01-20 08:00:00', '2025-06-20 08:00:00', 10, NULL, 0),
(21, 'Ogród 500m2', 'Ogrody', 'Lublin', 'ul. Letnia 6', 1150, 'Duża działka rekreacyjna', '2025-01-21 14:00:00', '2025-06-21 14:00:00', 1, NULL, 0),
(22, 'Ogród z altaną', 'Ogrody', 'Szczecin', 'ul. Spacerowa 7', 980, 'Altana i prąd', '2025-01-22 14:00:00', '2025-06-22 14:00:00', 2, NULL, 0),
(23, 'Magazyn 200m2', 'Magazyny', 'Bydgoszcz', 'ul. Składowa 3', 1850, 'Suchy magazyn', '2025-01-23 12:00:00', '2025-06-23 12:00:00', 3, NULL, 0),
(24, 'Magazyn 150m2', 'Magazyny', 'Białystok', 'ul. Towarowa 8', 1420, 'Dobry do logistyki', '2025-01-24 12:00:00', '2025-06-24 12:00:00', 4, NULL, 0),
(25, 'Mieszkanie 2 pokoje', 'Mieszkania', 'Katowice', 'ul. Graniczna 9', 430, 'Blisko uczelni', '2025-01-25 10:00:00', '2025-06-25 10:00:00', 5, NULL, 0),
(26, 'Mieszkanie loftowe', 'Mieszkania', 'Rzeszów', 'ul. Fabryczna 4', 610, 'Styl industrialny', '2025-01-26 10:00:00', '2025-06-26 10:00:00', 6, NULL, 0),
(27, 'Biuro 150m2', 'Biura', 'Opole', 'ul. Centrum 1', 1750, 'Duża przestrzeń', '2025-01-27 09:00:00', '2025-06-27 09:00:00', 7, NULL, 0),
(28, 'Biuro 45m2', 'Biura', 'Gdynia', 'ul. Portowa 12', 620, 'Małe biuro', '2025-01-28 09:00:00', '2025-06-28 09:00:00', 8, NULL, 0),
(29, 'Garaż w centrum', 'Garaże', 'Warszawa', 'ul. Krótka 3', 300, 'Świetna lokalizacja', '2025-01-29 11:00:00', '2025-06-29 11:00:00', 9, NULL, 0),
(30, 'Garaż osiedlowy', 'Garaże', 'Kraków', 'ul. Piastowska 6', 130, 'Blisko bloku', '2025-01-30 11:00:00', '2025-06-30 11:00:00', 10, NULL, 0),
(31, 'Piwnica 12m2', 'Piwnice', 'Wrocław', 'ul. Śląska 5', 110, 'Sucha i bezpieczna', '2025-02-01 08:00:00', '2025-07-01 08:00:00', 1, NULL, 0),
(32, 'Piwnica 18m2', 'Piwnice', 'Poznań', 'ul. Dębowa 8', 160, 'Dodatkowa przestrzeń', '2025-02-02 08:00:00', '2025-07-02 08:00:00', 2, NULL, 0),
(33, 'Ogród rodzinny', 'Ogrody', 'Gdańsk', 'ul. Ogrodowa 4', 990, 'Spokojna okolica', '2025-02-03 14:00:00', '2025-07-03 14:00:00', 3, NULL, 0),
(34, 'Ogród 300m2', 'Ogrody', 'Łódź', 'ul. Kwiatowa 9', 870, 'Idealny na weekend', '2025-02-04 14:00:00', '2025-07-04 14:00:00', 4, NULL, 0),
(35, 'Magazyn 600m2', 'Magazyny', 'Lublin', 'ul. Produkcyjna 2', 5200, 'Duża hala', '2025-02-05 12:00:00', '2025-07-05 12:00:00', 5, NULL, 0),
(36, 'Magazyn 100m2', 'Magazyny', 'Szczecin', 'ul. Magazynowa 7', 990, 'Mały magazyn', '2025-02-06 12:00:00', '2025-07-06 12:00:00', 6, NULL, 0),
(37, 'Apartament 4 pokoje', 'Mieszkania', 'Bydgoszcz', 'ul. Szeroka 11', 780, 'Duże mieszkanie rodzinne', '2025-02-07 10:00:00', '2025-07-07 10:00:00', 7, NULL, 0),
(38, 'Mieszkanie przy lesie', 'Mieszkania', 'Białystok', 'ul. Leśna 10', 520, 'Cicha okolica', '2025-02-08 10:00:00', '2025-07-08 10:00:00', 8, NULL, 0),
(39, 'Biuro w kamienicy', 'Biura', 'Katowice', 'ul. Rynek 3', 9700, 'Stylowe wnętrze', '2025-02-09 09:00:00', '2025-07-09 09:00:00', 9, NULL, 0),
(40, 'Biuro 200m2', 'Biura', 'Rzeszów', 'ul. Plac 1', 2200, 'Duża przestrzeń biurowa', '2025-02-10 09:00:00', '2025-07-10 09:00:00', 10, NULL, 0),
(41, 'Garaż 25m2', 'Garaże', 'Opole', 'ul. Garażowa 4', 213, 'Duży garaż', '2025-02-11 11:00:00', '2025-07-11 11:00:00', 1, NULL, 0),
(42, 'Garaż z prądem', 'Garaże', 'Gdynia', 'ul. Elektryczna 5', 475, 'Podłączony prąd', '2025-02-12 11:00:00', '2025-07-12 11:00:00', 2, NULL, 0),
(43, 'Piwnica 14m2', 'Piwnice', 'Warszawa', 'ul. Dolna 8', 130, 'Wysoki sufit', '2025-02-13 08:00:00', '2025-07-13 08:00:00', 3, NULL, 0),
(44, 'Piwnica 30m2', 'Piwnice', 'Kraków', 'ul. Górna 6', 260, 'Duża powierzchnia', '2025-02-14 08:00:00', '2025-07-14 08:00:00', 4, NULL, 0),
(45, 'Ogród z domkiem murowanym', 'Ogrody', 'Wrocław', 'ul. Zielna 5', 1200, 'Domek całoroczny', '2025-02-15 14:00:00', '2025-07-15 14:00:00', 5, NULL, 0),
(46, 'Ogród blisko jeziora', 'Ogrody', 'Poznań', 'ul. Wodna 2', 108, 'Malownicza lokalizacja', '2025-02-16 14:00:00', '2025-07-16 14:00:00', 6, NULL, 0),
(47, 'Magazyn z biurem', 'Magazyny', 'Gdańsk', 'ul. Logistyczna 3', 3400, 'Magazyn + zaplecze biurowe', '2025-02-17 12:00:00', '2025-07-17 12:00:00', 7, NULL, 0),
(48, 'Magazyn ogrzewany', 'Magazyny', 'Łódź', 'ul. Ciepła 6', 2750, 'Ogrzewany obiekt', '2025-02-18 12:00:00', '2025-07-18 12:00:00', 8, NULL, 0),
(49, 'Studio 35m2', 'Mieszkania', 'Lublin', 'ul. Akademicka 9', 410, 'Idealne dla studenta', '2025-02-19 10:00:00', '2025-07-19 10:00:00', 9, NULL, 0),
(50, 'Penthouse z tarasem', 'Mieszkania', 'Szczecin', 'ul. Panorama 1', 1490, 'Taras 80m2', '2025-02-20 10:00:00', '2025-07-20 10:00:00', 10, NULL, 0),
(51, 'Biuro przy rynku', 'Biura', 'Bydgoszcz', 'ul. Rynek 8', 1030, 'Ścisłe centrum', '2025-02-21 09:00:00', '2025-07-21 09:00:00', 1, NULL, 0),
(52, 'Biuro 70m2', 'Biura', 'Białystok', 'ul. Centralna 4', 600, 'Nowoczesne wnętrze', '2025-02-22 09:00:00', '2025-07-22 09:00:00', 2, NULL, 0),
(53, 'Garaż pod blokiem', 'Garaże', 'Katowice', 'ul. Blokowa 7', 199, 'Wygodny dojazd', '2025-02-23 11:00:00', '2025-07-23 11:00:00', 3, NULL, 0),
(54, 'Garaż murowany 20m2', 'Garaże', 'Rzeszów', 'ul. Solidna 3', 200, 'Trwała konstrukcja', '2025-02-24 11:00:00', '2025-07-24 11:00:00', 4, NULL, 0),
(55, 'Piwnica z regałami', 'Piwnice', 'Opole', 'ul. Niska 2', 150, 'Gotowa do użytku', '2025-02-25 08:00:00', '2025-07-25 08:00:00', 5, NULL, 0),
(56, 'Piwnica klimatyzowana', 'Piwnice', 'Gdynia', 'ul. Chłodna 4', 200, 'Stała temperatura', '2025-02-26 08:00:00', '2025-07-26 08:00:00', 6, NULL, 0),
(57, 'Ogród 450m2', 'Ogrody', 'Warszawa', 'ul. Relaksowa 5', 118, 'Blisko miasta', '2025-02-27 14:00:00', '2025-07-27 14:00:00', 7, NULL, 0),
(58, 'Magazyn logistyczny 800m2', 'Magazyny', 'Kraków', 'ul. Transportowa 9', 750, 'Nowoczesny obiekt logistyczny', '2025-02-28 12:00:00', '2025-07-28 12:00:00', 8, NULL, 0),
(59, 'Duże mieszkanie 5m2', 'Mieszkania', 'Warszawa', 'ul. Szósta 7', 250, 'Największe mieszkanie w Warszawie', '2025-02-28 12:00:00', '2025-07-28 12:00:00', 1, NULL, 0),
(60, 'Garaż na osiedlu', 'Garaże', 'Kraków', 'ul. Kirkowa 2', 150, 'Mała powierzchnia', '2025-02-28 12:00:00', '2025-07-28 12:00:00', 3, NULL, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `haslo` varchar(255) DEFAULT NULL,
  `nazwa` varchar(255) DEFAULT NULL,
  `utworzenie` datetime DEFAULT NULL,
  `ban` int(11) DEFAULT NULL,
  `ban_data` datetime DEFAULT NULL,
  `ban_end` datetime DEFAULT NULL,
  `kod` int(4) DEFAULT NULL,
  `kod_wygasniecie` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `photo`, `email`, `haslo`, `nazwa`, `utworzenie`, `ban`, `ban_data`, `ban_end`, `kod`, `kod_wygasniecie`) VALUES
(1, 'user1.jpg', 'jan.kowalski@example.com', 'zaq1@WSX', 'JanKowalski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(2, 'user2.jpg', 'anna.nowak@example.com', 'zaq1@WSX', 'AnnaNowak', '2026-02-22 13:05:04', 1, '2026-02-21 09:00:00', '2026-03-01 09:00:00', NULL, NULL),
(3, 'user3.jpg', 'piotr.zielinski@example.com', 'zaq1@WSX', 'PiotrZielinski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(4, 'user4.jpg', 'katarzyna.malysz@example.com', 'zaq1@WSX', 'KasiaMalysz', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(5, 'user5.jpg', 'marek.kowal@example.com', 'zaq1@WSX', 'MarekKowal', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(6, 'user6.jpg', 'magdalena.nowakowska@example.com', 'zaq1@WSX', 'MagdaNowakowska', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(7, 'user7.jpg', 'tomasz.wisniewski@example.com', 'zaq1@WSX', 'TomekWisniewski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(8, 'user8.jpg', 'joanna.kaczmarek@example.com', 'zaq1@WSX', 'JoannaKaczmarek', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(9, 'user9.jpg', 'adam.kowalczyk@example.com', 'zaq1@WSX', 'AdamKowalczyk', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(10, 'user10.jpg', 'ewa.szymanska@example.com', 'zaq1@WSX', 'EwaSzymanska', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(11, 'user11.jpg', 'piotr.lewandowski@example.com', 'zaq1@WSX', 'PiotrLewandowski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(12, 'user12.jpg', 'anna.wroblewska@example.com', 'zaq1@WSX', 'AnnaWroblewska', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(13, 'user13.jpg', 'marcin.kaminskii@example.com', 'zaq1@WSX', 'MarcinKaminski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(14, 'user14.jpg', 'agnieszka.sikora@example.com', 'zaq1@WSX', 'AgnieszkaSikora', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(15, 'user15.jpg', 'lukasz.jablonski@example.com', 'zaq1@WSX', 'LukaszJablonski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(16, 'user16.jpg', 'marta.krol@example.com', 'zaq1@WSX', 'MartaKrol', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(17, 'user17.jpg', 'pawel.dabrowski@example.com', 'zaq1@WSX', 'PawelDabrowski', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(18, 'user18.jpg', 'monika.kowalska@example.com', 'zaq1@WSX', 'MonikaKowalska', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(19, 'user19.jpg', 'krzysztof.nowicki@example.com', 'zaq1@WSX', 'KrzysztofNowicki', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL),
(20, 'user20.jpg', 'ania.wisniewska@example.com', 'zaq1@WSX', 'AniaWisniewska', '2026-02-22 13:05:04', 0, NULL, NULL, NULL, NULL);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `chetny`
--
ALTER TABLE `chetny`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `ogloszenia_oferty`
--
ALTER TABLE `ogloszenia_oferty`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `ogloszenia_oferty`
--
ALTER TABLE `ogloszenia_oferty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
