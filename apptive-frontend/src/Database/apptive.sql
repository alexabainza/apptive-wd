-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 05:25 AM
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
-- Table structure for table `flashcards`
--

CREATE TABLE `flashcards` (
  `flashcard_id` varchar(255) NOT NULL,
  `flashcard_set_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `question` varchar(1024) NOT NULL,
  `answer` varchar(1024) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flashcard_set`
--

CREATE TABLE `flashcard_set` (
  `flashcard_set_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `note_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modifled_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(191650, '191650_21696a69-ea58-4a7a-9765-32ad122508d3', 'Networking', NULL, 0, 0, '2023-12-06 10:25:04', '2023-12-06 10:25:04'),
(191650, '191650_4d90a010-1184-47ab-bc0e-5db7d22040b9', 'CSS', NULL, 0, 0, '2023-12-06 11:38:19', '2023-12-06 11:38:19'),
(191650, '191650_be34dcd3-798c-4231-983b-4e2f023872b9', 'CSS', NULL, 0, 0, '2023-12-06 11:38:19', '2023-12-06 11:38:19'),
(191650, '191650_f1818b7a-b6e3-43ae-8107-7f0b3c1f3a38', 'Networking', NULL, 0, 0, '2023-12-06 10:25:04', '2023-12-06 10:25:04'),
(669211, '669211_03674000-5e00-47fe-93a4-5e5ccc060ab4', 'Data Science', NULL, 0, 0, '2023-12-06 10:21:34', '2023-12-06 10:21:34'),
(669211, '669211_0c367ae7-f639-43b9-bcfb-15ce1e62d02d', 'Data Science', NULL, 0, 0, '2023-12-06 10:21:34', '2023-12-06 10:21:34'),
(669211, '669211_c67199ba-d592-415e-b76c-199bd4c99c93', 'DSA', NULL, 0, 0, '2023-12-06 10:21:28', '2023-12-06 10:21:28'),
(669211, '669211_fb7434ca-7dfc-4bd8-84d7-4685083177fa', 'DSA', NULL, 0, 0, '2023-12-06 10:21:28', '2023-12-06 10:21:28');

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `guest_id` varchar(255) NOT NULL,
  `user_type` enum('guest','registered') NOT NULL DEFAULT 'guest'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `user_id` int(11) NOT NULL,
  `folder_id` varchar(64) NOT NULL,
  `notes_id` varchar(64) NOT NULL,
  `note_title` text NOT NULL DEFAULT 'Untitled Note',
  `contents` mediumtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isPublic` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`user_id`, `folder_id`, `notes_id`, `note_title`, `contents`, `created_at`, `modified_at`, `isPublic`) VALUES
(669211, '669211_c67199ba-d592-415e-b76c-199bd4c99c93', '669211_0d0ec092-76ad-4f2d-93cd-07346795d2c9_52602001-16f4-4d4d-b', 'Graphs', 'Kruskal', '2023-12-06 10:21:45', '2023-12-06 10:21:45', 1),
(669211, '669211_c67199ba-d592-415e-b76c-199bd4c99c93', '669211_d6e6cd5b-4e17-413c-a3f2-4fa4e8aa95c2_cba79b3f-905b-42e5-b', 'History', 'William Wallace', '2023-12-06 10:21:59', '2023-12-06 10:30:24', 0),
(669211, '669211_03674000-5e00-47fe-93a4-5e5ccc060ab4', '669211_053ab3c4-4254-4986-8fbc-e7a71f3d78e5_a981f033-4ba0-49c7-a', 'Reinforcement', 'Learning is about...', '2023-12-06 10:22:13', '2023-12-06 10:22:13', 1),
(191650, '191650_21696a69-ea58-4a7a-9765-32ad122508d3', '191650_e3d6cb5f-bd8c-4e19-83b3-6b1b2a42569a_3f14867e-2728-43d3-a', 'Routing', 'Static Routing', '2023-12-06 10:25:20', '2023-12-06 10:27:45', 0),
(191650, '191650_4d90a010-1184-47ab-bc0e-5db7d22040b9', '191650_dcc4ef30-a0b5-4430-8077-252cea88d0c3_69c6a7d0-1bdc-4914-9', 'Profile', 'ENTER YOUR NOTES HERE', '2023-12-06 11:41:13', '2023-12-06 11:41:13', 1);

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
  `password` varchar(255) NOT NULL,
  `user_type` enum('guest','registered') NOT NULL DEFAULT 'registered'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_credentials`
--

INSERT INTO `user_credentials` (`user_id`, `user_name`, `firstname`, `lastname`, `email`, `password`, `user_type`) VALUES
(191650, 'bobbyy', 'Fabiola', 'Villanueva', 'bobby@gmail.com', '$2b$10$KmWtYNzlCLgfRw2uWgrTYOM5RxcOeNpGS3eJjUTR5QWJb1mHTjXZq', 'registered'),
(669211, 'alexabainza', 'Alex', 'Abainza', 'alexabainza@gmail.com', '$2b$10$ULnJ94gB7e4AiyS6VkqXCeCZb.n6UFvtW7eypkUTAuAUmdBcicIwC', 'registered');

-- --------------------------------------------------------

--
-- Table structure for table `visited_documents`
--

CREATE TABLE `visited_documents` (
  `person_id` varchar(255) NOT NULL,
  `note_id` varchar(255) NOT NULL,
  `date_visited` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flashcards`
--
ALTER TABLE `flashcards`
  ADD PRIMARY KEY (`flashcard_id`);

--
-- Indexes for table `flashcard_set`
--
ALTER TABLE `flashcard_set`
  ADD PRIMARY KEY (`flashcard_set_id`);

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=669212;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
