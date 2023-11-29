-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 29, 2023 at 06:40 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apptive`
--

-- --------------------------------------------------------

--
-- Table structure for table `folders`
--

CREATE TABLE `folders` (
  `user_id` int(11) NOT NULL,
  `folder_id` varchar(64) NOT NULL,
  `folder_name` varchar(64) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `favorited` tinyint(1) NOT NULL DEFAULT 0,
  `no_of_notes` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `folders`
--

INSERT INTO `folders` (`user_id`, `folder_id`, `folder_name`, `description`, `favorited`, `no_of_notes`, `created_at`, `modified_at`) VALUES
(320759, '0', 'WebDev', NULL, 0, 0, '2023-11-28 11:57:45', '2023-11-28 11:57:45'),
(320759, '320759_1459a293-a2e8-490d-abed-8eb3fd0320cf', 'fldsffs', NULL, 0, 0, '2023-11-29 05:27:49', '2023-11-29 05:27:49'),
(320759, '320759_1d59a1e6-7614-42a9-aa29-12f1995f964b', 'dfjsd,f', NULL, 0, 0, '2023-11-29 03:38:00', '2023-11-29 03:38:00'),
(320759, '320759_b505a313-600c-4691-b67b-06dd3f8bfa82', 'ean bolok', NULL, 0, 0, '2023-11-29 03:38:29', '2023-11-29 03:38:29'),
(371474, '371474_1e22aa4d-ea2f-4669-8ca6-31b561ed9ab6', 'jmb', NULL, 0, 0, '2023-11-28 12:10:09', '2023-11-28 12:10:09'),
(371474, '371474_231d1b60-eeb6-46f6-af00-4200f9e2e6d5', 'AEKLFEALF', NULL, 0, 0, '2023-11-29 03:40:15', '2023-11-29 03:40:15'),
(371474, '371474_435e6721-7cb3-4399-8f4a-1b333af5a0ce', 'fds', NULL, 0, 0, '2023-11-28 12:04:52', '2023-11-28 12:04:52'),
(371474, '371474_449f92b9-e53b-4bf0-ab10-705f4cf235a2', 'elx', NULL, 0, 0, '2023-11-28 12:12:03', '2023-11-28 12:12:03'),
(371474, '371474_5bd0f140-9531-4361-ae36-39392c77c7e4', 'WEBDEV', NULL, 0, 0, '2023-11-29 03:39:54', '2023-11-29 03:39:54'),
(371474, '371474_6628c835-62f7-4da9-8f09-38b00e66b464', 'fdsfds', NULL, 0, 0, '2023-11-28 12:05:06', '2023-11-28 12:05:06'),
(371474, '371474_8b24028b-39cb-478e-bf5c-c2b277edf2ba', 'RARA', NULL, 0, 0, '2023-11-29 03:40:04', '2023-11-29 03:40:04'),
(371474, '371474_9f179dff-2a0d-4831-896f-8edcc05d5f9f', 'sdfssdsds', NULL, 0, 0, '2023-11-28 12:09:00', '2023-11-28 12:09:00'),
(371474, '371474_b00ab957-d8b4-4eeb-ac3c-ca229ffd844a', 'AEKLFEALF', NULL, 0, 0, '2023-11-29 03:40:15', '2023-11-29 03:40:15'),
(371474, '371474_f400b299-4ba7-4e36-90d2-af40a232b9f1', 'sfds', NULL, 0, 0, '2023-11-28 12:11:49', '2023-11-28 12:11:49'),
(371474, '371474_f521be6c-9a88-4ca2-9a34-0b8a307bae77', 'aldfds', NULL, 0, 0, '2023-11-28 12:10:20', '2023-11-28 12:10:20'),
(39828, '39828_5ea2a40a-869d-4528-83b6-8e8af4beb0c6', 'IM2', NULL, 0, 0, '2023-11-28 13:02:20', '2023-11-28 13:02:20');

-- --------------------------------------------------------

--
-- Table structure for table `user_credentials`
--

CREATE TABLE `user_credentials` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `firstname` varchar(250) NOT NULL,
  `lastname` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_credentials`
--

INSERT INTO `user_credentials` (`user_id`, `user_name`, `firstname`, `lastname`, `email`, `password`) VALUES
(39828, 'johnmarie', 'john', 'marie', 'johnmarie@gmail.com', 'johnmarie1'),
(320759, 'alexabainza', 'alex', 'abainza', 'abainza.alexandra@gmail.com', 'alex1'),
(322523, 'john', 'John', 'Cruz', 'johncruz@gmail.com', 'john1'),
(371474, 'bobbyy', 'fabiola', 'villanueva', 'fabiolavillanueva@gmail.com', 'bobbyy1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`folder_id`);

--
-- Indexes for table `user_credentials`
--
ALTER TABLE `user_credentials`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_credentials`
--
ALTER TABLE `user_credentials`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=371475;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
