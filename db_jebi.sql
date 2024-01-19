-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 19 Jan 2024 pada 06.39
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_jebi`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `writer` varchar(255) DEFAULT NULL,
  `synopsis` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `title`, `writer`, `synopsis`, `category`, `tag`, `cover`, `status`, `createdAt`, `updatedAt`) VALUES
(41, 'The Hitchhiker\'s Guide to the Galaxy', 'Douglas Adams', 'A comedic science fiction story following the eccentric adventures of Arthur Dent after Earth is demolished.', 'Financial', 'Novel', 'C:\\fakepath\\SNOW_20221213_011917_207.jpg', 'Publish', '2024-01-18 19:20:54', '2024-01-18 19:20:54'),
(42, 'The Da Vinci Code', 'Dan Brown', 'A mystery thriller that combines codes, art history, and symbols in a quest for an ancient secret', 'Technology', 'Comic', 'C:\\fakepath\\zz.png', 'Publish', '2024-01-18 19:21:29', '2024-01-18 19:21:29'),
(55, 'The Girl on the Train', 'Paula Hawkins', 'A psychological thriller involving a female observer who inadvertently gets entangled in the mystery of a missing woman.', 'Health', 'Novel', 'C:\\fakepath\\z.png', 'Draft', '2024-01-18 20:00:39', '2024-01-18 20:00:39');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
