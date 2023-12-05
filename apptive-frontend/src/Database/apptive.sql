-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2023 at 04:04 AM
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
(293717, '293717_6e4cf387-361c-4f79-9ef1-568f86ed73bc', 'laafasf', NULL, 0, 0, '2023-12-05 02:57:10', '2023-12-05 02:57:10'),
(293717, '293717_eb8e8ab6-8b03-4dbc-b369-4310cffe84c5', 'laafasf', NULL, 0, 0, '2023-12-05 02:57:10', '2023-12-05 02:57:10'),
(320759, '320759_1459a293-a2e8-490d-abed-8eb3fd0320cf', 'fldsffs', NULL, 0, 0, '2023-11-29 05:27:49', '2023-11-29 05:27:49'),
(320759, '320759_1d59a1e6-7614-42a9-aa29-12f1995f964b', 'dfjsd,f', NULL, 0, 0, '2023-11-29 03:38:00', '2023-11-29 03:38:00'),
(371474, '371474_1e22aa4d-ea2f-4669-8ca6-31b561ed9ab6', 'jmb', NULL, 0, 0, '2023-11-28 12:10:09', '2023-11-28 12:10:09'),
(371474, '371474_5bd0f140-9531-4361-ae36-39392c77c7e4', 'WEBDEV', NULL, 0, 0, '2023-11-29 03:39:54', '2023-11-29 03:39:54'),
(371474, '371474_6628c835-62f7-4da9-8f09-38b00e66b464', 'fdsfds', NULL, 0, 0, '2023-11-28 12:05:06', '2023-11-28 12:05:06'),
(371474, '371474_9f179dff-2a0d-4831-896f-8edcc05d5f9f', 'sdfssdsds', NULL, 0, 0, '2023-11-28 12:09:00', '2023-11-28 12:09:00'),
(371474, '371474_b00ab957-d8b4-4eeb-ac3c-ca229ffd844a', 'AEKLFEALF', NULL, 0, 0, '2023-11-29 03:40:15', '2023-11-29 03:40:15'),
(39828, '39828_5ea2a40a-869d-4528-83b6-8e8af4beb0c6', 'IM2', NULL, 0, 0, '2023-11-28 13:02:20', '2023-11-28 13:02:20'),
(481092, '481092_6441f25f-0db6-495d-a020-8399084456c8', 'KJFSDFKSD', NULL, 0, 0, '2023-12-04 08:37:58', '2023-12-04 08:37:58'),
(481092, '481092_cf3b5132-292a-415f-81aa-863282b523e9', 'KJFSDFKSD', NULL, 0, 0, '2023-12-04 08:37:58', '2023-12-04 08:37:58'),
(960121, '960121_2283d09c-e54c-4780-9cfe-4a7c0823b7d5', 'IM2', NULL, 0, 0, '2023-12-04 14:46:31', '2023-12-04 14:46:31'),
(960121, '960121_6901a1c2-ec2b-46f7-9c96-ce18482823aa', 'IM2', NULL, 0, 0, '2023-12-04 14:46:31', '2023-12-04 14:46:31');

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
  `modified_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`user_id`, `folder_id`, `notes_id`, `note_title`, `contents`, `created_at`, `modified_at`) VALUES
(39828, '39828_5ea2a40a-869d-4528-83b6-8e8af4beb0c6', '12345', 'Untitled Note', 'urrent_timestamp(', '2023-11-30 11:41:58', '2023-11-30 11:41:58'),
(39828, '39828_5ea2a40a-869d-4528-83b6-8e8af4beb0c6', '24325', 'Untitled Note', 'urrent_timestamp(', '2023-11-30 11:42:25', '2023-11-30 11:42:25'),
(320759, '320759_1459a293-a2e8-490d-abed-8eb3fd0320cf', '3432', 'Untitled Note', 'urrent_timestamp(', '2023-11-30 11:42:55', '2023-11-30 11:42:55'),
(371474, '371474_9f179dff-2a0d-4831-896f-8edcc05d5f9f', '371474_b1e005f3-78ba-496c-8219-7f4adb3d3c1a_14219609-6c6d-420f-8', 'HEUEANDW WOAFNASFD', 'DFSDFD', '2023-12-03 10:29:14', '2023-12-03 11:21:46'),
(320759, '320759_1459a293-a2e8-490d-abed-8eb3fd0320cf', '320759_2c33b5d8-b9a7-4d87-908a-0028d97b26a0_ee6d76e4-6373-4889-b', 'HEHEHEHE', 'EYOO', '2023-12-03 04:33:03', '2023-12-03 04:33:03'),
(371474, '371474_1e22aa4d-ea2f-4669-8ca6-31b561ed9ab6', '371474_13492e9a-1ff8-406d-bf21-67a74c58c19c_bfd9ccb8-4fd7-4f3e-9', 'HIHELO', 'FDGDFHG', '2023-12-03 08:39:44', '2023-12-03 08:39:44'),
(320759, '320759_1d59a1e6-7614-42a9-aa29-12f1995f964b', '320759_b59e1aa2-853c-4772-9ec1-ec90eb49f19e_fee7675c-89cc-4338-b', 'HeeeeeeeeeeeeeKIIIIIIIIIIIIIIIII', 'i\'m going to seriously kms', '2023-12-03 08:44:43', '2023-12-03 08:44:43'),
(320759, '0', '320759_57280e02-7746-4dc5-a100-fda28f472f45_d8809e0b-e201-40cd-8', 'eyoo', 'hehuhi hello', '2023-12-03 09:16:35', '2023-12-04 07:16:02'),
(371474, '371474_5bd0f140-9531-4361-ae36-39392c77c7e4', '371474_160966f8-d451-4dfd-a441-df85a3267bfb_dc5c7870-9001-40d9-9', 'dsfkjdsjgsfg', 'sdfdsfsdf', '2023-12-03 10:07:44', '2023-12-03 10:07:44'),
(320759, '0', '320759_bd3f1229-3c9b-408e-a267-6548b7af199c_8359fbe2-06df-40d8-a', 'HEALAURESDGSFGF', 'DSGFDSJVJHVBKJB\nHI HERLEGO', '2023-12-03 11:25:45', '2023-12-04 07:14:29'),
(320759, '320759_1d59a1e6-7614-42a9-aa29-12f1995f964b', '320759_ce695179-68ea-4132-8a54-6148a6881e1e_7139d44f-9da9-4a9c-a', 'DFKDSBJG', 'FKJAFDS', '2023-12-04 07:16:31', '2023-12-04 07:16:31'),
(320759, '320759_1d59a1e6-7614-42a9-aa29-12f1995f964b', '320759_86e9e081-14eb-493b-b49e-4599c8a1fd84_3f551468-5ea3-4782-9', 'roror', 'sfsgg', '2023-12-04 08:50:08', '2023-12-04 08:50:08');

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
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_credentials`
--

INSERT INTO `user_credentials` (`user_id`, `user_name`, `firstname`, `lastname`, `email`, `password`) VALUES
(27749, 'hozier', 'andrew', 'byrne', 'hozy@gmail.com', '$2b$10$28IejaP3zm3zTEkNkQ3pl.r'),
(39828, 'johnmarie', 'john', 'marie', 'johnmarie@gmail.com', 'johnmarie1'),
(293717, 'jas', 'jas', 'jas', 'jas@gmail.com', '$2b$10$QvfSot3CkD.mRTKyMiugrePnMSRCOdJayaevnDY36BT9E427e1O0K'),
(298638, 'alex', 'alex', 'alex', 'alex@gmail.com', '$2b$10$Y4.FNxs.gD0JIo3J0PQeL.X'),
(320759, 'alexabainza', 'alex', 'abainza', 'abainza.alexandra@gmail.com', 'alex1'),
(322523, 'john', 'John', 'Cruz', 'johncruz@gmail.com', 'john1'),
(371474, 'bobbyy', 'fabiola', 'villanueva', 'fabiolavillanueva@gmail.com', 'bobbyy1'),
(520693, 'goodperson', 'good', 'person', 'good@gmail.com', '$2b$10$dAlsHAeNXE9d4wyFMJ0Dd.M'),
(580798, 'robert', 'rob', 'ert', 'robert@gmail.com', '$2b$10$BxoAK8oOmR.ytV4DW5Ac5eE'),
(626855, 'banjo', 'banjo', 'singer', 'banjosinger@gmail.com', '$2b$10$v3j9u27fYnDDGIEKA7nnDuI'),
(933287, 'jasper', 'jasper', 'marbella', 'jas@gmail.com', '$2b$10$cDfPYJ2XzaKQm1pXvIJfauj'),
(960121, 'hurhur', 'hurhur', 'hur', 'hurhur@gmail.com', '$2b$10$d1F8/qy4OHFCODB.WlqqZ.F');

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=960122;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
