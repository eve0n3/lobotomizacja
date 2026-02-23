-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 22 Lut 2026, 13:30
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
-- Baza danych: `cleaning`
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
  `lokalizacja` varchar(255) DEFAULT NULL,
  `miasto` varchar(255) DEFAULT NULL,
  `cena` float DEFAULT NULL,
  `kategoria` varchar(255) DEFAULT NULL,
  `opis` varchar(255) DEFAULT NULL,
  `utworzenie` datetime DEFAULT NULL,
  `waznosc` datetime DEFAULT NULL,
  `id_zglasz` int(11) DEFAULT NULL,
  `id_wykon` int(11) DEFAULT NULL,
  `ban` int(11) DEFAULT NULL,
  `photo_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `ogloszenia_oferty`
--

INSERT INTO `ogloszenia_oferty` (`id`, `lokalizacja`, `miasto`, `cena`, `kategoria`, `opis`, `utworzenie`, `waznosc`, `id_zglasz`, `id_wykon`, `ban`, `photo_id`) VALUES
(1, 'ul. Kwiatowa 10', 'Warszawa', 150, 'Sprzątanie mieszkań', 'Sprzątanie mieszkania 2-pokojowego w Warszawie, odkurzanie, mycie podłóg, kurz', '2026-02-22 13:27:14', '2026-03-24 13:27:14', 1, NULL, 0, 101),
(2, 'ul. Lipowa 5', 'Krakow', 200, 'Sprzątanie biur', 'Sprzątanie biura o powierzchni 50m2 w Krakowie, odkurzanie, mycie blatów, opróżnianie koszy', '2026-02-22 13:27:14', '2026-03-24 13:27:14', 2, NULL, 0, 102),
(3, 'ul. Dluga 7', 'Gdansk', 120, 'Sprzątanie mieszkań', 'Sprzątanie domu jednorodzinnego w Gdańsku, mycie podłóg, pranie dywanów, ścieranie kurzu', '2026-02-22 13:27:14', '2026-03-14 13:27:14', 3, NULL, 0, 103),
(4, 'ul. Słoneczna 3', 'Poznan', 180, 'Sprzątanie garaży', 'Sprzątanie garażu w Poznaniu, mycie podłogi, wynoszenie śmieci i porządkowanie narzędzi', '2026-02-22 13:27:14', '2026-03-19 13:27:14', 4, NULL, 0, 104),
(5, 'ul. Wesoła 8', 'Wroclaw', 160, 'Sprzątanie piwnic', 'Sprzątanie piwnicy we Wrocławiu, odkurzanie, mycie podłóg, segregacja przedmiotów', '2026-02-22 13:27:14', '2026-03-09 13:27:14', 5, NULL, 0, 105),
(6, 'ul. Zielona 12', 'Lublin', 220, 'Sprzątanie ogrodów', 'Sprzątanie podwórka w Lublinie, grabienie liści, zamiatanie chodnika, mycie tarasu', '2026-02-22 13:27:14', '2026-03-24 13:27:14', 6, NULL, 0, 106),
(7, 'ul. Brzozowa 6', 'Szczecin', 140, 'Sprzątanie ogrodów', 'Sprzątanie ogrodu w Szczecinie, koszenie trawnika, grabienie liści, czyszczenie mebli ogrodowych', '2026-02-22 13:27:14', '2026-03-04 13:27:14', 7, NULL, 0, 107),
(8, 'ul. Klonowa 9', 'Bydgoszcz', 250, 'Sprzątanie mieszkań', 'Sprzątanie mieszkania po remoncie w Bydgoszczy, usuwanie kurzu, mycie okien i podłóg', '2026-02-22 13:27:14', '2026-04-03 13:27:14', 8, NULL, 0, 108),
(9, 'ul. Modrzewiowa 4', 'Katowice', 100, 'Sprzątanie biur', 'Sprzątanie biura po imprezie w Katowicach, mycie podłóg, opróżnianie koszy, odkurzanie dywanów', '2026-02-22 13:27:14', '2026-03-09 13:27:14', 9, NULL, 0, 109),
(10, 'ul. Akacjowa 11', 'Gdynia', 300, 'Sprzątanie magazynów', 'Sprzątanie magazynu w Gdyni, zamiatanie, mycie posadzek, układanie towaru', '2026-02-22 13:27:14', '2026-03-29 13:27:14', 10, NULL, 0, 110);

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
  `ban_end` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `photo`, `email`, `haslo`, `nazwa`, `utworzenie`, `ban`, `ban_data`, `ban_end`) VALUES
(1, 'user1.jpg', 'jan.kowalski@example.com', 'zaq1@WSX', 'JanKowalski', '2026-02-22 13:05:04', 0, NULL, NULL),
(2, 'user2.jpg', 'anna.nowak@example.com', 'zaq1@WSX', 'AnnaNowak', '2026-02-22 13:05:04', 1, '2026-02-21 09:00:00', '2026-03-01 09:00:00'),
(3, 'user3.jpg', 'piotr.zielinski@example.com', 'zaq1@WSX', 'PiotrZielinski', '2026-02-22 13:05:04', 0, NULL, NULL),
(4, 'user4.jpg', 'katarzyna.malysz@example.com', 'zaq1@WSX', 'KasiaMalysz', '2026-02-22 13:05:04', 0, NULL, NULL),
(5, 'user5.jpg', 'marek.kowal@example.com', 'zaq1@WSX', 'MarekKowal', '2026-02-22 13:05:04', 0, NULL, NULL),
(6, 'user6.jpg', 'magdalena.nowakowska@example.com', 'zaq1@WSX', 'MagdaNowakowska', '2026-02-22 13:05:04', 0, NULL, NULL),
(7, 'user7.jpg', 'tomasz.wisniewski@example.com', 'zaq1@WSX', 'TomekWisniewski', '2026-02-22 13:05:04', 0, NULL, NULL),
(8, 'user8.jpg', 'joanna.kaczmarek@example.com', 'zaq1@WSX', 'JoannaKaczmarek', '2026-02-22 13:05:04', 0, NULL, NULL),
(9, 'user9.jpg', 'adam.kowalczyk@example.com', 'zaq1@WSX', 'AdamKowalczyk', '2026-02-22 13:05:04', 0, NULL, NULL),
(10, 'user10.jpg', 'ewa.szymanska@example.com', 'zaq1@WSX', 'EwaSzymanska', '2026-02-22 13:05:04', 0, NULL, NULL),
(11, 'user11.jpg', 'piotr.lewandowski@example.com', 'zaq1@WSX', 'PiotrLewandowski', '2026-02-22 13:05:04', 0, NULL, NULL),
(12, 'user12.jpg', 'anna.wroblewska@example.com', 'zaq1@WSX', 'AnnaWroblewska', '2026-02-22 13:05:04', 0, NULL, NULL),
(13, 'user13.jpg', 'marcin.kaminskii@example.com', 'zaq1@WSX', 'MarcinKaminski', '2026-02-22 13:05:04', 0, NULL, NULL),
(14, 'user14.jpg', 'agnieszka.sikora@example.com', 'zaq1@WSX', 'AgnieszkaSikora', '2026-02-22 13:05:04', 0, NULL, NULL),
(15, 'user15.jpg', 'lukasz.jablonski@example.com', 'zaq1@WSX', 'LukaszJablonski', '2026-02-22 13:05:04', 0, NULL, NULL),
(16, 'user16.jpg', 'marta.krol@example.com', 'zaq1@WSX', 'MartaKrol', '2026-02-22 13:05:04', 0, NULL, NULL),
(17, 'user17.jpg', 'pawel.dabrowski@example.com', 'zaq1@WSX', 'PawelDabrowski', '2026-02-22 13:05:04', 0, NULL, NULL),
(18, 'user18.jpg', 'monika.kowalska@example.com', 'zaq1@WSX', 'MonikaKowalska', '2026-02-22 13:05:04', 0, NULL, NULL),
(19, 'user19.jpg', 'krzysztof.nowicki@example.com', 'zaq1@WSX', 'KrzysztofNowicki', '2026-02-22 13:05:04', 0, NULL, NULL),
(20, 'user20.jpg', 'ania.wisniewska@example.com', 'zaq1@WSX', 'AniaWisniewska', '2026-02-22 13:05:04', 0, NULL, NULL);

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
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `chetny`
--
ALTER TABLE `chetny`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `ogloszenia_oferty`
--
ALTER TABLE `ogloszenia_oferty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
