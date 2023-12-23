-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2023 at 08:24 AM
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

--
-- Dumping data for table `flashcards`
--

INSERT INTO `flashcards` (`flashcard_id`, `flashcard_set_id`, `user_id`, `question`, `answer`, `created_at`, `modified_at`) VALUES
('11575_2dea4f48-0064-4547-81a2-73bf0d3b9e20_0d8d0949-5b7b-4b47-8b_7d50d969-b566-4541-bf93-97d1873334cc', '11575_2dea4f48-0064-4547-81a2-73bf0d3b9e20_0d8d0949-5b7b-4b47-8b', '11575', 'Consequat illum augue fermentum?', 'Tempus', '2023-12-22 18:15:20', '2023-12-22 18:15:20'),
('11575_2dea4f48-0064-4547-81a2-73bf0d3b9e20_0d8d0949-5b7b-4b47-8b_ff216b4a-9f8c-4edb-8e90-89836058f326', '11575_2dea4f48-0064-4547-81a2-73bf0d3b9e20_0d8d0949-5b7b-4b47-8b', '11575', 'Iaculis mattis ipsum donec est?', 'Lacinia nec sapiente', '2023-12-22 18:15:33', '2023-12-22 18:15:33'),
('198385_ccb9bd5d-c9fe-434a-bfd7-4ec5695636ed_4237bba1-9f7e-4a52-9_09901d71-8301-48d5-b223-a02eb07e17e7', '198385_ccb9bd5d-c9fe-434a-bfd7-4ec5695636ed_4237bba1-9f7e-4a52-9', '198385', 'Penatibus vulputate justo, voluptas quisquam, ', 'nesciunt earum', '2023-12-23 06:26:35', '2023-12-23 06:26:35'),
('198385_ccb9bd5d-c9fe-434a-bfd7-4ec5695636ed_4237bba1-9f7e-4a52-9_2b3df55e-840b-4c72-abaf-2c49111710eb', '198385_ccb9bd5d-c9fe-434a-bfd7-4ec5695636ed_4237bba1-9f7e-4a52-9', '198385', 'Massa ullamco necessitatibus semper?', 'Phasellus a', '2023-12-23 06:30:14', '2023-12-23 06:30:14'),
('198385_ccb9bd5d-c9fe-434a-bfd7-4ec5695636ed_4237bba1-9f7e-4a52-9_f9a24805-f432-4305-b1ba-0a8470ee6774', '198385_ccb9bd5d-c9fe-434a-bfd7-4ec5695636ed_4237bba1-9f7e-4a52-9', '198385', 'periam aspernatur torto', 'd proident ', '2023-12-23 06:27:01', '2023-12-23 06:27:01'),
('198385_ccb9bd5d-c9fe-434a-bfd7-4ec5695636ed_4237bba1-9f7e-4a52-9_fa703ea9-e53a-422f-977d-6518a07a40cd', '198385_ccb9bd5d-c9fe-434a-bfd7-4ec5695636ed_4237bba1-9f7e-4a52-9', '198385', 'Massa ullamco necessitatibus semper?', ' Phasellus architecto fugia', '2023-12-23 06:26:21', '2023-12-23 06:26:21'),
('246437_c0e980ab-8584-4f4c-b5b4-95623e70959b_a7cd0aee-e2e2-4567-a_49fccdec-58b7-4ce3-8b89-3833648ec405', '246437_c0e980ab-8584-4f4c-b5b4-95623e70959b_a7cd0aee-e2e2-4567-a', '246437', 'Laudantium inventore ', 'beatae', '2023-12-21 14:08:57', '2023-12-21 14:08:57'),
('246437_c0e980ab-8584-4f4c-b5b4-95623e70959b_a7cd0aee-e2e2-4567-a_9ce6f452-bdca-4c26-9ef5-a7aa8b4dc469', '246437_c0e980ab-8584-4f4c-b5b4-95623e70959b_a7cd0aee-e2e2-4567-a', '246437', ', repellat etiam dignissimos aliquid blanditiis', 'penatibus', '2023-12-21 14:08:31', '2023-12-21 14:08:31'),
('246437_c0e980ab-8584-4f4c-b5b4-95623e70959b_a7cd0aee-e2e2-4567-a_cc2c932b-91b4-496a-a0c9-c19618ac3012', '246437_c0e980ab-8584-4f4c-b5b4-95623e70959b_a7cd0aee-e2e2-4567-a', '246437', 'Vero fugit molestiae perferendis incididunt delectus', 'dignissim', '2023-12-21 14:07:35', '2023-12-21 14:07:35'),
('495701_0bf45202-aef5-4b3e-97b3-16c35077a04c_5b4095aa-14cd-446c-9_1cecd360-4581-4203-9b24-74ffb4791b47', '495701_0bf45202-aef5-4b3e-97b3-16c35077a04c_5b4095aa-14cd-446c-9', '495701', 'Asperiores libero, ', 'illum occaecat,', '2023-12-21 13:45:04', '2023-12-21 13:45:04'),
('495701_0bf45202-aef5-4b3e-97b3-16c35077a04c_5b4095aa-14cd-446c-9_75243529-1c7f-44e7-85d0-4111c379261d', '495701_0bf45202-aef5-4b3e-97b3-16c35077a04c_5b4095aa-14cd-446c-9', '495701', ' dapibus facilisis', 'torquent', '2023-12-21 13:45:40', '2023-12-21 13:45:40'),
('59621_2b73bcc6-87c6-4a20-9be9-c12e10fac830_fb06bb0d-1bcf-4e00-97_e3ddc385-51e4-4634-b470-fe072b0e5f28', '59621_2b73bcc6-87c6-4a20-9be9-c12e10fac830_fb06bb0d-1bcf-4e00-97', '59621', 'dsdVitae qdgsfguas veritatis ipsam enim congue consequuntur architecto exercitation', 'Volutdfdsgsdfapat ab sagittis leo officia,', '2023-12-23 06:41:23', '2023-12-23 06:41:23'),
('59621_4b10913d-6add-4a52-b290-be3f81f120b1_0f3a2b02-443a-45aa-b9_792bdca4-c2cc-4625-8741-66a5c5044136', '59621_4b10913d-6add-4a52-b290-be3f81f120b1_0f3a2b02-443a-45aa-b9', '59621', '', '', '2023-12-23 06:48:31', '2023-12-23 06:48:31'),
('59621_7d79f063-de2b-4c62-adbd-85052ca437db_8d33a9c5-8429-4c60-83_b6d51b22-59f7-4923-ab57-19a397d9772d', '59621_7d79f063-de2b-4c62-adbd-85052ca437db_8d33a9c5-8429-4c60-83', '59621', 'Adipisicing, eius officiis posuere mi, c', 'vulputate cursus cor', '2023-12-23 07:18:02', '2023-12-23 07:18:02'),
('608580_da403595-d054-4df2-8c6b-9f154b088631_ea5117ef-acb6-4ae9-8_022db822-8ba9-4e38-bfc6-024ee7f52151', '608580_da403595-d054-4df2-8c6b-9f154b088631_ea5117ef-acb6-4ae9-8', '608580', 'Voluptatibus nam, ab tempus vero feugiat', ' minus', '2023-12-22 18:32:07', '2023-12-22 18:32:07'),
('608580_da403595-d054-4df2-8c6b-9f154b088631_ea5117ef-acb6-4ae9-8_c0e07099-9636-47bc-ba91-522afc5b2113', '608580_da403595-d054-4df2-8c6b-9f154b088631_ea5117ef-acb6-4ae9-8', '608580', 'Cupiditate illum occaecati ultrices itaque,', ' mauris lacus explicabo', '2023-12-22 18:31:57', '2023-12-22 18:31:57'),
('642861_4fab7ab2-6ac4-4cc6-9d90-c7aff3d5e1c1_f612f640-98c3-4be9-8_621d471f-1e17-485c-8b3b-a12cf2ad4012', '642861_4fab7ab2-6ac4-4cc6-9d90-c7aff3d5e1c1_f612f640-98c3-4be9-8', '642861', 'fgfgfgNascetur cubilia quod consequat omnis', 'saepe', '2023-12-22 10:27:25', '2023-12-22 10:27:25'),
('642861_8897aa54-b04b-4398-9e28-8ed9bfd1dfe0_aa4f4373-2d0f-4639-a_43820d06-9d08-4c7f-bef6-a4a2c3a51cf9', '642861_8897aa54-b04b-4398-9e28-8ed9bfd1dfe0_aa4f4373-2d0f-4639-a', '642861', 'condimentum nobis', 'Doloribus ', '2023-12-22 10:15:43', '2023-12-22 10:15:43'),
('669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b_53a4211b-c956-46a0-bab1-caebcfe2ef78', '669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b', '669211', 'Mollit exercitation', 'occaecat', '2023-12-20 15:12:13', '2023-12-20 15:12:13'),
('669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b_8c8f0e87-1550-457c-b54c-5fd0be8f9b3e', '669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b', '669211', 'ue tempor, neque libero! Senectus s', 'Justo orci', '2023-12-20 15:11:39', '2023-12-20 15:11:39'),
('669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b_e7e36310-84e7-467a-92ac-b6d5fb2d083d', '669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b', '669211', 'Habitant fringilla nostrud', 'Aliquip mus cillum', '2023-12-20 14:22:53', '2023-12-20 14:22:53'),
('669211_3f31f675-c56d-45b0-b8f0-b1a34bdc2e04_eddbd70e-02e1-4130-9_70199e1e-e129-49d7-a381-06b2d38bc989', '669211_3f31f675-c56d-45b0-b8f0-b1a34bdc2e04_eddbd70e-02e1-4130-9', '669211', 'dgfBeatae accusamus, incididunt dolorem qufgdgdfgddfgdis excepturi at minima aut quibusdam, enim? Potenti gravida pariatur, conubia interdum voluptatum. Excepturi, lorem ipsam', 'sfsdgfsfgfgdgrure sequi ornare', '2023-12-20 16:44:42', '2023-12-20 16:44:42'),
('669211_3f31f675-c56d-45b0-b8f0-b1a34bdc2e04_eddbd70e-02e1-4130-9_7ae410a6-cd50-42af-ba93-d386929d02b7', '669211_3f31f675-c56d-45b0-b8f0-b1a34bdc2e04_eddbd70e-02e1-4130-9', '669211', 'Quos sed, cras parturient ', 'Cupidatat orci ', '2023-12-20 14:45:43', '2023-12-20 14:45:43'),
('669211_8011c0b3-c4b9-4252-b30d-eccb4e6d8f54_945fa8b6-6bb7-4419-a_e14562ae-3d26-436c-9cfa-7cc6a3145780', '669211_8011c0b3-c4b9-4252-b30d-eccb4e6d8f54_945fa8b6-6bb7-4419-a', '669211', 'fSequi liberosdfgdsgdsg, duis consequat', 'sdsadsassadsdNisl pretium! E', '2023-12-20 18:11:13', '2023-12-20 18:11:13'),
('669211_cbed46ba-15f1-4f92-ae67-79d45783239d_33f7621e-4771-49b3-a_b85d43e1-04b6-4a09-89a6-45015663fda0', '669211_cbed46ba-15f1-4f92-ae67-79d45783239d_33f7621e-4771-49b3-a', '669211', 'MY HUSBANDS', 'dsfsgfsgf', '2023-12-20 16:46:42', '2023-12-20 16:46:42'),
('669211_d6246392-4259-49e5-8624-82afa80fd714_1c675100-3be8-4628-b_fd185456-d4e8-45f8-a2eb-c0a8925bc3cd', '669211_d6246392-4259-49e5-8624-82afa80fd714_1c675100-3be8-4628-b', '669211', 'Semper magnam illum condimentum', ' Pellentesque', '2023-12-21 16:26:49', '2023-12-21 16:26:49'),
('669211_f6ed2551-4878-4eb4-bb0c-428c05d73173_3cfdf255-1621-44d3-b_f6544387-bfb5-4465-999d-c14c36b04b1b', '669211_f6ed2551-4878-4eb4-bb0c-428c05d73173_3cfdf255-1621-44d3-b', '669211', 'Cupiditate porro adipiscing magnam', 'magna minima at dicta.', '2023-12-20 16:51:40', '2023-12-20 16:51:40'),
('696560_c249c376-9c87-4817-929a-de07c5a941ca_3bbf9713-74c3-4842-b_359f20c6-671d-4c95-9ea7-6b7a49c84241', '696560_c249c376-9c87-4817-929a-de07c5a941ca_3bbf9713-74c3-4842-b', '696560', 'ultrices aliquet parturient', 'molestias,', '2023-12-22 15:32:18', '2023-12-22 15:32:18'),
('696560_c249c376-9c87-4817-929a-de07c5a941ca_3bbf9713-74c3-4842-b_b4e62017-f3fd-4724-b4ee-4d8d035d557d', '696560_c249c376-9c87-4817-929a-de07c5a941ca_3bbf9713-74c3-4842-b', '696560', 'Metus perspiciatis aperiam, animi irure itaque tortor,', ' maxime', '2023-12-22 15:32:05', '2023-12-22 15:32:05'),
('96596_eae9b535-2ca0-4d4c-a735-05b32cd5d14d_ec3c7df2-09e2-41df-bc_afc0504c-667c-41a2-894d-1450ca35e643', '96596_eae9b535-2ca0-4d4c-a735-05b32cd5d14d_ec3c7df2-09e2-41df-bc', '96596', 'Incidunt eos, maxime ea platea tellus mollis', 'Excepturi', '2023-12-21 18:08:28', '2023-12-21 18:08:28'),
('96596_eae9b535-2ca0-4d4c-a735-05b32cd5d14d_ec3c7df2-09e2-41df-bc_bae0808b-e6d7-486c-b5d9-72b71ecb9493', '96596_eae9b535-2ca0-4d4c-a735-05b32cd5d14d_ec3c7df2-09e2-41df-bc', '96596', 'dignissimos cubilia ipsum, tempora auctor semper facere', 'pellentesque', '2023-12-21 18:09:23', '2023-12-21 18:09:23');

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
(11575, '11575_5a5deea6-25ac-432a-b813-91f8a7c577b1', 'Test Folder', NULL, 0, 0, '2023-12-22 18:11:56', '2023-12-22 18:11:56'),
(198385, '198385_9ff2b411-d1b7-4365-8079-a5e5aeccd97f', 'Networking', NULL, 0, 0, '2023-12-19 16:11:00', '2023-12-19 16:11:00'),
(198385, '198385_df46360b-31f2-4d6e-a821-0f0afeea3dbe', 'CSS', NULL, 0, 0, '2023-12-23 06:24:43', '2023-12-23 06:24:43'),
(214984, '214984_e89961ad-19b1-471e-b074-7969b201f633', 'Web Dev', NULL, 0, 0, '2023-12-21 13:37:03', '2023-12-21 13:37:03'),
(231115, '231115_d1915cc3-2014-42ce-881c-95b643125c60', 'Hell', NULL, 0, 0, '2023-12-22 17:09:06', '2023-12-22 17:09:06'),
(246437, '246437_1023c6d8-7ffc-44ae-8a45-8a890d51a945', 'Why are you ', NULL, 0, 0, '2023-12-21 14:52:03', '2023-12-21 14:52:03'),
(246437, '246437_1b7b5eb8-bb12-4f64-8f10-04a4517fd1e3', 'Heaven can wait', NULL, 0, 0, '2023-12-21 14:52:10', '2023-12-21 14:52:10'),
(340258, '340258_f0530bc5-9bfb-4274-837c-4371be7a32d6', 'Networking', NULL, 0, 0, '2023-12-08 16:10:46', '2023-12-08 16:10:46'),
(495701, '495701_3e713ac9-bd3a-489e-a494-52a95708ba85', 'Astronomy', NULL, 0, 0, '2023-12-21 14:01:55', '2023-12-21 14:01:55'),
(495701, '495701_6b18d852-c64f-4a0b-99fc-7e89445a478b', 'Slow burn', NULL, 0, 0, '2023-12-21 13:44:04', '2023-12-21 13:44:04'),
(495701, '495701_a95e26ea-3f55-42b2-9da8-64e50140df07', 'Bookstore', NULL, 0, 0, '2023-12-21 13:54:48', '2023-12-21 13:54:48'),
(495701, '495701_d0afcb8b-fa42-4697-b40c-dd2062c5d4f2', 'Lover Boy', NULL, 0, 0, '2023-12-21 14:05:12', '2023-12-21 14:05:12'),
(495701, '495701_e5feda84-30de-403e-a085-4d42add4ffc8', 'Crawley', NULL, 0, 0, '2023-12-21 14:00:22', '2023-12-21 14:00:22'),
(513609, '513609_a799e15a-f405-409f-8fb3-9ceac3ee65d8', 'Fooling', NULL, 0, 0, '2023-12-22 17:23:12', '2023-12-22 17:23:12'),
(59621, '59621_27bea9d3-3795-412b-8b50-4410f17c39ee', 'Ants', NULL, 0, 0, '2023-12-23 07:21:53', '2023-12-23 07:21:53'),
(608580, '608580_da82b7b1-fd46-497f-a736-f4357790de6e', 'Test folder', NULL, 0, 0, '2023-12-22 18:28:40', '2023-12-22 18:28:40'),
(642861, '642861_77bf8e40-49b7-45c5-a547-25efe8aa4644', 'Sample', NULL, 0, 0, '2023-12-22 10:39:37', '2023-12-22 10:39:37'),
(642861, '642861_8a65e4a3-4dc5-40a4-9f49-ed217aeba2d1', 'Hotel', NULL, 0, 0, '2023-12-22 10:32:17', '2023-12-22 10:32:17'),
(642861, '642861_b006cd9b-51f9-43b2-b344-4aded65836ff', 'Cheese', NULL, 0, 0, '2023-12-22 10:21:06', '2023-12-22 10:21:06'),
(655465, '655465_ed134788-2f2c-4822-8ffd-4d3623e70897', 'Burn', NULL, 0, 0, '2023-12-21 13:40:44', '2023-12-21 13:40:44'),
(669211, '669211_0c8570ac-4bcf-4f21-ad4e-21cba8833e74', 'DSA', NULL, 0, 0, '2023-12-21 14:18:53', '2023-12-21 14:18:53'),
(669211, '669211_5fde0853-23ac-49f9-8fa6-acd0343e75c1', 'Nobody', NULL, 0, 0, '2023-12-19 08:54:45', '2023-12-19 08:54:45'),
(669211, '669211_66a581c5-ada3-4ba3-96f6-2555c9f5f99c', 'Chemistry', NULL, 0, 0, '2023-12-20 18:09:07', '2023-12-20 18:09:07'),
(669211, '669211_f4582073-ae46-4c67-9db1-5cc5b211ab86', 'Control', NULL, 0, 0, '2023-12-19 08:38:39', '2023-12-19 08:38:39'),
(669211, '669211_f7f88d9e-b862-4439-9052-daf51ace8f8f', 'Hazards', NULL, 0, 0, '2023-12-19 08:29:09', '2023-12-19 08:29:09'),
(691953, '691953_46948307-52b7-4669-81fa-68f14b4c5256', 'Biology', NULL, 0, 0, '2023-12-19 08:26:25', '2023-12-19 08:26:25'),
(691953, '691953_a13f0640-a403-4171-a160-db836bae48cf', 'Sweet Music', NULL, 0, 0, '2023-12-19 08:22:24', '2023-12-19 08:22:24'),
(691953, '691953_b8e27356-b245-4890-a6ec-b92ffc7f44fe', 'Bootstrap', NULL, 0, 0, '2023-12-19 08:22:48', '2023-12-19 08:22:48'),
(691953, '691953_f86232b2-1dfb-449f-8d70-f57d9a02c94e', 'Biology', NULL, 0, 0, '2023-12-19 08:26:25', '2023-12-19 08:26:25'),
(696560, '696560_84528085-7647-4162-b503-17f739754083', 'DSA', NULL, 0, 0, '2023-12-22 15:12:18', '2023-12-22 15:12:18'),
(773346, '773346_86543f05-46b2-4c86-8587-1f4bcdd99939', 'Random', NULL, 0, 0, '2023-12-22 18:46:22', '2023-12-22 18:46:22'),
(789194, '789194_6cc654dd-d865-46a5-ba3f-48991216d432', 'Music', NULL, 0, 0, '2023-12-09 02:02:11', '2023-12-09 02:02:11'),
(875483, '875483_0e4519b5-35e9-46a6-8bdc-f883fb72c1e6', 'Graphs', NULL, 0, 0, '2023-12-19 08:13:13', '2023-12-19 08:13:13'),
(875483, '875483_a2141161-187e-48e5-bf4a-5777464f886f', 'React', NULL, 0, 0, '2023-12-19 08:16:17', '2023-12-19 08:16:17'),
(875483, '875483_b8048812-6f3a-4559-8e50-430fcd4d777a', 'UI', NULL, 0, 0, '2023-12-19 08:16:12', '2023-12-19 08:16:12'),
(875483, '875483_c8613d62-2d54-4dd4-862e-e9ae6d50305c', 'React', NULL, 0, 0, '2023-12-19 08:16:17', '2023-12-19 08:16:17'),
(875483, '875483_d78ec1a1-f49c-405a-9e5b-ad3b26534e46', 'UI', NULL, 0, 0, '2023-12-19 08:16:12', '2023-12-19 08:16:12'),
(875483, '875483_fdbacbac-de7b-4398-9ec1-456a886f6761', 'Redux', NULL, 0, 0, '2023-12-19 08:12:55', '2023-12-19 08:12:55'),
(96596, '96596_9d1d1beb-5eab-4f08-b641-2dd7f4b14120', 'Muriel', NULL, 0, 0, '2023-12-21 18:06:43', '2023-12-21 18:06:43'),
(96596, '96596_b9b8efee-8cde-4f3d-a9da-8a34275731a8', 'Beelzebub', NULL, 0, 0, '2023-12-21 18:06:49', '2023-12-21 18:06:49');

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `guest_id` varchar(255) NOT NULL,
  `user_type` enum('guest','registered') NOT NULL DEFAULT 'guest'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guests`
--

INSERT INTO `guests` (`guest_id`, `user_type`) VALUES
('424e7209-618c-4e14-8c2b-e8221a756fa5', 'guest'),
('59eee4f0-aa97-4c15-a05a-6c01ddb98232', 'guest'),
('769c1cf5-8241-4129-a438-f058e40e3a34', 'guest'),
('d0566512-ae9f-4859-a81c-7986b5bfc03a', 'guest'),
('acd10d1d-75c6-4983-bb10-1139a1439d29', 'guest'),
('aa849683-71ab-4202-9f87-11947e6210e3', 'guest'),
('3b7a7374-5d7d-4758-8dcc-72cde8ae64eb', 'guest');

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
(669211, '669211_f4582073-ae46-4c67-9db1-5cc5b211ab86', '669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b', 'Sample Notes', '<p><span style=\"background-color: green;\">Aliquam taciti neque fugiat error rhoncus? </span>Auctor, lacus, nam justo laboriosam ultricies odit iure officia, pretium odio dicta illum! Quidem! Pede, consequuntur facilisi fugit. Eius mi enim nullam? Dui curabitur, proident ex exercitationem ultricies aperiam provident? Corporis ex nihil mollitia? Erat incidunt repellendus quisque, sapien! A. Quis. Eiusmod, eros unde, condimentum natus eleifend temporibus nunc tenetur, ipsum quo ut excepteur sint mus repellat rutrum expedita aliqua nesciunt accusantium. Velit? Bibendum aliquip rutrum in nisl facere error? Habitant eos praesentium similique? Recusandae! Doloremque eligendi fuga harum saepe! Erat expedita inventore class. <span style=\"background-color: yellow;\">A optio, ipsam!</span> Mollit exercitation, deleniti occaecat nostrum nam ullam.</p><p><br></p><p>Maiores dis nullam excepteur reprehenderit varius, neque ipsum, tenetur nemo! Perferendis tempor elit, vitae consectetuer sit debitis duis, litora repellendus fuga urna autem dolores aptent. Cumque, excepteur, ante! Venenatis doloremque, sint tristique litora etiam exercitation porttitor purus iure hendrerit voluptatum, scelerisque habitasse aenean sollicitudin litora? Habitant fringilla nostrud quisque tempor, neque libero! Senectus sollicitudin nec corporis consectetuer minima cumque assumenda, egestas! Class imperdiet quaerat pede nostra! Aliquip mus cillum vehicula! Justo orci, fugiat officiis elit, luctus quibusdam turpis? Aspernatur voluptates? Perferendis! Deleniti qui pede, totam inceptos tellus erat, ultricies, etiam! Necessitatibus mattis consectetur nostra faucibus, volutpat, eu augue incidunt ullamco.</p><p><br></p><p>Sunt delectus distinctio repellendus egestas enim necessitatibus, dicta lorem! Parturient, accusamus optio qui sociis vero feugiat amet dui taciti duis assumenda dolores risus provident maxime posuere nemo felis officiis ex ipsum minima mattis donec ornare porta! Convallis omnis, nesciunt cumque sequi nostrum, cras potenti, anim per dapibus sapiente, accumsan dolorem, felis dignissimos, ante, consectetuer ea adipisci phasellus, ipsam massa turpis? Sagittis gravida quia, mi risus eaque integer expedita eum, hac esse risus? Malesuada magni mattis fusce, molestie eligendi et numquam itaque praesent viverra pellentesque conubia, potenti nullam facilisi vero nostrum! Libero do wisi voluptatum, magna feugiat, curabitur bibendum feugiat natoque.</p><p><br></p><p>Debitis nostrum proin at aut minus eros sint! Pretium nostra elit nostrum platea debitis ad purus, debitis eligendi, vehicula sodales atque? Ab? Platea mollis nonummy elit aspernatur, omnis quam nonummy eligendi laboris adipiscing! Deserunt iure placeat numquam rem omnis cupiditate, dignissimos facilisis, sint perferendis integer architecto dapibus modi, potenti augue! Eaque, laoreet proident unde! Lacinia harum, repellendus omnis non blanditiis culpa ducimus aliquid doloremque voluptatem excepteur aute massa posuere condimentum nec temporibus dolor aliquid voluptate ratione iste natus nullam leo, tempor ipsa ea quidem, vulputate ac quisquam. Est egestas proident nunc pharetra, diam incididunt class corrupti, dicta mauris tempor, torquent.</p>', '2023-12-19 13:13:24', '2023-12-20 10:39:59', 1),
(198385, '198385_9ff2b411-d1b7-4365-8079-a5e5aeccd97f', '198385_0f96d559-8b31-45c4-aa56-d35828e3b567_5407ef08-36b9-45a5-a', 'Static Routes', '<p>Dolorum quam nostrud, consequat perferendis pulvinar ut! Eum quasi excepturi, facere senectus placeat diamlorem, aenean? Proin molestiae culpa, congue dolor. Anim tempor. Nunc consequat iure natoque tristique saepe possimus ducimus faucibus magnam dolor autem voluptatibus modi libero fermentum litora, eos, ullam. Quidem. Quisque dignissimos a conubia hendrerit cumque? Saepe, nisl voluptates! Accumsan. Eleifend ullamco, vitae excepturi? Dolorem sequi. Mi ab. Nobis elit, ipsa, ducimus, do quia, tempor eveniet harum iaculis cumque cumque, iure animi quisque ab natus inventore! Atque iaculis? Expedita lacus cupiditate urna luctus? Erat? Laboriosam pulvinar, lectus nisl lacinia laborum autem, excepteur rutrum fuga eligendi cupidatat proident! Senectus.</p>', '2023-12-19 16:11:23', '2023-12-19 16:11:23', 1),
(875483, '875483_0e4519b5-35e9-46a6-8bdc-f883fb72c1e6', '875483_b496c21d-18b7-451f-b356-f97676cd13bb_232a0a8d-0470-4a0b-b', 'Kruskal-Wallis', '<p>Nesciunt hymenaeos, adipisci fames ac ante sodales excepturi blandit quia viverra proident necessitatibus ratione, hendrerit? Amet, nisi adipisicing pariatur velit distinctio saepe nisl porttitor congue sociosqu blanditiis tellus, repudiandae. Eligendi, urna laudantium doloremque tempore facilis sit numquam sint accusantium fringilla amet non, quis dapibus minim! Natoque aptent maecenas? Dui quod litora luctus numquam aliquet, quod natoque hendrerit repellendus mus ultricies, a tempus officiis curae! Tempor interdum nostrud platea? Saepe minima quod tempore, platea officia dolore itaque modi. Culpa mollitia animi parturient asperiores, gravida, etiam magna condimentum nostrud cupiditate magna beatae? Phasellus, phasellus auctor ad accusamus maiores euismod excepturi, tempor, porro.</p>', '2023-12-19 17:56:28', '2023-12-19 17:56:28', 1),
(875483, '875483_a2141161-187e-48e5-bf4a-5777464f886f', '875483_a0b146bc-e4e8-4a12-ac31-ba634e41761e_d0eff944-b874-46d2-b', 'Navigation', '<p>Ex totam, congue incidunt potenti iure quasi soluta consequat eos quos sit. Debitis malesuada deserunt fuga laboris nullam nostrum necessitatibus mus venenatis cubilia laboriosam, conubia sodales! Aptent sapien, varius maxime, quisquam condimentum dapibus imperdiet. Consectetuer torquent laboris laudantium assumenda aperiam! Ornare voluptates voluptatibus vel cillum, assumenda tincidunt adipisci anim! Nostrud erat magna scelerisque reiciendis hymenaeos? Praesentium earum! Eaque? Sociis convallis, aptent ullamco natus natus, aliquam praesentium quisquam dictumst nonummy cumque sociosqu dolorum! Explicabo voluptate dis est ipsam, exercitationem mollit, lacinia exercitationem, et do faucibus? Nonummy, aptent luctus dolorem! Quibusdam ex! Felis incididunt, eget natus turpis! Rerum, minim vestibulum ornare, optio.</p>', '2023-12-19 17:57:07', '2023-12-19 17:57:07', 1),
(669211, '669211_f4582073-ae46-4c67-9db1-5cc5b211ab86', '669211_5872b94d-a543-4046-b8f3-8679dfb6e22f_82c6e1ca-b234-4d96-b', 'Title Sequence', '<p>Bomb ass title sequence</p>', '2023-12-20 15:43:25', '2023-12-20 15:43:25', 1),
(669211, '669211_66a581c5-ada3-4ba3-96f6-2555c9f5f99c', '669211_36c23e54-4955-4cc4-8d43-d7e13b97881e_242c3227-7830-4752-a', 'Hydrocarbons', '<p>Incididunt potenti mi occaecat eu consequatur, fusce voluptatem aptent, aperiam, lectus ac iste? Dictum sociosqu, primis, eget. Ante, dui, porta aliquet dolore ut nec amet laudantium iusto, ridiculus. Delectus. Auctor, nostrud sequi torquent alias sapiente risus temporibus ducimus nec rhoncus, litora, vivamus? Torquent ridiculus voluptatem fermentum tristique mollit! Fugit! Rem.</p><p><br></p><p>Cillum minima diam accusantium dolore, auctor hic feugiat? Tortor proident, diamlorem semper. Alias, morbi primis, omnis? Non anim cupiditate ducimus autem deleniti pharetra minus, urna gravida culpa eos? Massa minim! Natoque tincidunt, morbi dolor augue voluptatem, sit doloribus odit accusamus dapibus dolor impedit diamlorem cumque ac dictum leo ex nobis.</p><p><br></p><p>Condimentum exercitation sapien doloribus viverra aut nesciunt nunc quod magna tortor distinctio, ad nibh, minus! Sed mauris mi magnis, quasi, mauris! Ac! Potenti recusandae, elit wisi magnam dapibus. Cupidatat? Tenetur. Sociis voluptas, dignissimos, deleniti, praesentium? Mattis? Dignissim. Dui, erat ad, hac odio, ex consectetur! Duis, magna quam eos! Quae pharetra.</p><p><br></p><p>Hendrerit mollit maiores sagittis varius. Penatibus volutpat porro sit, per maxime nam, commodo vel interdum officia ullam deleniti, purus dignissim. Qui odio dolorum felis, possimus scelerisque sapien dui adipisicing alias? Gravida suspendisse dolor itaque tenetur aspernatur, asperiores numquam, illum. Lacinia? Orci cupidatat felis molestiae purus, voluptas quia! Nostra! Iaculis taciti.</p>', '2023-12-21 11:07:25', '2023-12-21 11:07:25', 1),
(495701, '495701_6b18d852-c64f-4a0b-99fc-7e89445a478b', '495701_0bf45202-aef5-4b3e-97b3-16c35077a04c_5b4095aa-14cd-446c-9', 'How to ', '<p><span style=\"background-color: green;\">Asperiores libero, </span>volutpat phasellus pede luctus, assumenda lacinia dictumst nisi ut autem praesent tempus impedit accumsan, voluptate quasi anim expedita. Senectus, condimentum tortor adipisci, <span style=\"background-color: yellow;\">illum occaecat,</span> vitae tempora delectus morbi arcu magnis explicabo ullamcorper rem perferendis praesentium maecenas doloremque bibendum, tempus molestie volutpat, gravida, elementum tempore, beatae debitis? Consequuntur molestias.</p><p><br></p><p>Euismod expedita? Officiis posuere nesciunt cras voluptatum per nunc, varius. Quidem fames quae purus. Cras facilisis, architecto netus tincidunt scelerisque turpis irure asperiores magni. Condimentum penatibus pellentesque. Fringilla primis ex vestibulum proin ad irure! Voluptates, tenetur? Parturient itaque sociis, aliquet lectus faucibus, minim lectus modi! Lorem semper eum? Wisi quo.</p><p><br></p><p>Felis magni magni officiis per expedita<span style=\"background-color: green;\"> dapibus facilisis</span> <span style=\"background-color: yellow;\">torquent</span> placerat, harum id? Senectus litora! Fugiat vivamus, quas libero tempor doloribus sit distinctio, rem eiusmod mus erat unde viverra, egestas in excepteur iste. Nibh! Iaculis quidem posuere, delectus lacinia? Temporibus taciti! Erat nam necessitatibus officia, quisquam rem arcu ultricies cum massa.</p><p><br></p><p>Vel nibh tellus egestas ridiculus, fringilla? Venenatis rem. Senectus ullamcorper dis aliquam dolores quos aliquip voluptates, provident anim, officiis proident dictum mollit reiciendis numquam, eligendi netus voluptates lacus? Architecto incidunt malesuada nullam, doloribus quia mi tincidunt, conubia aliqua animi ipsa! Totam fermentum temporibus vivamus? Numquam suspendisse architecto quam nascetur commodi.</p>', '2023-12-21 13:44:42', '2023-12-21 13:45:45', 1),
(246437, '246437_1b7b5eb8-bb12-4f64-8f10-04a4517fd1e3', '246437_127abd56-1c48-4c09-8c2c-ffe94d87ae37_73841afe-ce9d-40b3-b', 'Neque malesuada do.', '<p>Ullamco montes, ducimus, blanditiis laboris litora minima consectetur. Delectus! Aperiam sociis proin tenetur sapien! Cupidatat adipisicing? Anim, aute tincidunt eleifend, commodi, voluptate! Ridiculus? Sequi incididunt mollitia, mattis, facilisis venenatis consequat! Tempore in, consequat orci! Nibh, pretium vulputate dapibus congue dolorem.</p>', '2023-12-21 14:52:48', '2023-12-21 14:52:48', 1),
(96596, '96596_9d1d1beb-5eab-4f08-b641-2dd7f4b14120', '96596_eae9b535-2ca0-4d4c-a735-05b32cd5d14d_ec3c7df2-09e2-41df-bc', 'How to be a nuisance', '<p>Incidunt eos, maxime ea platea tellus mollis, taciti sit hendrerit eaque aliquid blandit dignissimos cubilia ipsum, tempora auctor semper facere, nostrud tellus, pellentesque aptent doloribus iaculis praesent. Odio impedit soluta repellendus cupidatat gravida quis commodi animi repellendus ipsum nisi a.</p><p><br></p><p>Et cillum quaerat, eros nobis eiusmod feugiat litora? Excepturi, feugiat proin dui, aliquet perspiciatis turpis quae, ex nulla maxime harum luctus facilisis diam laudantium eius, ultrices praesent aenean, venenatis gravida. Optio eleifend. Possimus hendrerit dictum congue, hymenaeos repudiandae penatibus occaecati.</p><p><br></p><p>Odio quis iste tincidunt debitis varius fames, laboris cupiditate nonummy, inventore curabitur? Accumsan, ullamcorper pretium aliquam tempor litora rutrum neque iaculis quis autem? Nostrud! Placerat at nobis risus! Scelerisque. Iure! Harum occaecat, iusto irure sociosqu leo! Sapien animi temporibus nostra.</p>', '2023-12-21 18:08:10', '2023-12-21 18:08:10', 1),
(642861, '642861_b006cd9b-51f9-43b2-b344-4aded65836ff', '642861_4fab7ab2-6ac4-4cc6-9d90-c7aff3d5e1c1_f612f640-98c3-4be9-8', 'Mozarella', '<p>Nascetur cubilia quod consequat omnis ac donec saepe vulputate cumque! Maxime sem. Eget maecenas do ultrices exercitation officia repellat vitae? Tempor ultricies nisl dolore placerat ea accusamus semper. Justo laborum eum suscipit eu, donec, habitant? Dignissim class! Tellus magni, veniam.</p><p><br></p><p>Praesent montes, aptent in, mollitia eget torquent sunt integer irure metus delectus, phasellus arcu, eos temporibus. Aperiam tincidunt. Lobortis? Lacus aliquip, illo voluptatum gravida mi? Excepturi aliqua, pellentesque? Volutpat fugiat totam accumsan, eligendi? Ut. Amet congue, orci veritatis blandit tincidunt.</p><p><br></p><p>Illum nemo iaculis aptent lacinia commodo! <span style=\"background-color: green;\">Mus ante</span>. <span style=\"background-color: yellow;\">Maxime</span> posuere consequatur ante? Atque eaque itaque vitae. Reprehenderit molestiae ab in, voluptate consequatur? Wisi blanditiis. Nec eget tempora interdum rutrum cras? Minim nesciunt, commodi, varius id senectus, pede enim elementum illum.</p>', '2023-12-22 10:21:36', '2023-12-22 10:21:36', 1),
(642861, '642861_b006cd9b-51f9-43b2-b344-4aded65836ff', '642861_d99ff4c7-96f5-458c-978f-9cbf2278a297_c3801860-b070-48d8-a', 'Yadayada', '', '2023-12-22 10:32:44', '2023-12-22 10:32:44', 1),
(669211, '669211_0c8570ac-4bcf-4f21-ad4e-21cba8833e74', '669211_fce2f035-336c-4675-8776-d1e4151a7a05_a5833059-097f-4abe-8', 'sfsdf', '<p>safdsfs</p>', '2023-12-22 15:06:54', '2023-12-22 15:06:54', 1),
(696560, '696560_84528085-7647-4162-b503-17f739754083', '696560_c249c376-9c87-4817-929a-de07c5a941ca_3bbf9713-74c3-4842-b', 'Graphs', '<p>Metus perspiciatis aperiam, animi irure itaque tortor, platea maxime, aptent sint ultrices aliquet parturient molestias, perferendis, laborum eius feugiat vel, delectus fuga. Culpa cupidatat, reiciendis auctor class sapien. Varius tempore! Ea dolorum adipisci velit adipisicing aliquet, porro in conubia laoreet.</p><p><br></p><p>Minima non voluptates ut, dictum, iaculis? Molestie a ante culpa habitasse class aut, nascetur similique senectus! Dolorum at. Posuere leo sociosqu fusce eos nemo dis rem venenatis ducimus dolorum eros dignissim ab, quibusdam! Hic ultrices magni risus quisque esse inventore.</p><p><br></p><p>Recusandae morbi tempus deserunt aptent voluptas ac molestie viverra proin, proident, diamlorem doloribus convallis enim odit, accusamus impedit, nesciunt? Illum at ultricies, fusce optio quidem praesent molestie sollicitudin! Rutrum fringilla? Curabitur ut! Montes? Vehicula deserunt velit? Occaecati urna ornare, non.</p>', '2023-12-22 15:13:12', '2023-12-22 15:33:20', 1),
(11575, '11575_5a5deea6-25ac-432a-b813-91f8a7c577b1', '11575_2dea4f48-0064-4547-81a2-73bf0d3b9e20_0d8d0949-5b7b-4b47-8b', 'Test Note', '<p><span style=\"background-color: green;\">Inceptos mollis, vitae praesentium quae, sapiente pariatur nihil!</span> Occaecati. <span style=\"background-color: yellow;\">Et senectus, do!</span> Ab, quaerat, eiusmod volutpat aptent morbi, error. Faucibus platea quo veritatis justo, sunt harum lobortis aliquet ex dignissimos augue sagittis vivamus nemo vero, laboris a aliquam accumsan diam.</p><p><br></p><p>Congue optio, iaculis expedita leo quos beatae condimentum voluptates saepe sociis potenti! Facilisis nesciunt, aenean. Ultricies alias saepe officia iure corrupti proin mauris! Minus. Nostra duis? Cubilia, ab quae perspiciatis! Vel lacus cum auctor ullamco, posuere! Necessitatibus incidunt occaecati venenatis.</p><p><br></p><p>Consequat illum augue fermentum? Tempus magna elit odit placerat? Auctor. Wisi! Iaculis mattis ipsum donec est? Lacinia nec sapiente nostra, fringilla? Erat ut provident nostrum incidunt reprehenderit, aute justo sit ratione diamlorem senectus fermentum eos assumenda dolores aliqua. Dolore irure.</p>', '2023-12-22 18:12:41', '2023-12-22 18:17:12', 0),
(608580, '608580_da82b7b1-fd46-497f-a736-f4357790de6e', '608580_da403595-d054-4df2-8c6b-9f154b088631_ea5117ef-acb6-4ae9-8', 'Random Note', '<p>Augue netus ipsa? Natus. <span style=\"background-color: green;\">Cupiditate illum occaecati ultrices itaque,</span><span style=\"background-color: yellow;\"> mauris lacus explicabo</span>! Tempore nemo cras turpis voluptatem volutpat tristique debitis est ullamcorper eget quisque et perspiciatis quibusdam, occaecat. Nostrud fugiat rutrum turpis amet modi, parturient tristique, lacus, corrupti accusantium fugit.</p><p><br></p><p><span style=\"background-color: green;\">Voluptatibus nam, ab tempus vero feugiat</span> culpa<span style=\"background-color: yellow;\"> minus</span> eius et congue nibh varius soluta nostra natoque, etiam, wisi, nunc cupidatat! Quam massa tempor mollit aliqua ridiculus incidunt! Dui eveniet. Blanditiis proident quo cillum odio wisi mattis turpis habitasse tortor veniam.</p><p><br></p><p>Quasi et eu curabitur asperiores. Integer? Corrupti ab esse enim corporis facere semper repellendus exercitationem aut, fermentum asperiores! Nibh platea distinctio, ullamco donec tempora, tortor similique, accumsan minima cupiditate vestibulum tristique vivamus rerum conubia incidunt proident, incididunt sit, cumque mauris.</p>', '2023-12-22 18:29:10', '2023-12-22 18:35:18', 0),
(773346, '773346_86543f05-46b2-4c86-8587-1f4bcdd99939', '773346_7f17f91a-208c-46ee-a775-86be306636d1_7f8829b9-2703-4f5e-a', 'Test Note', '<p><span style=\"background-color: green;\">Occaecat gravida occaecati amet mi sociosqu aliquam, quisquam.</span> Aliquip felis ea integer, distinctio eleifend, dictum penatibus aliquid deleniti, nemo nulla, quidem delectus alias nulla architecto, metus fermentum volutpat, curabitur quod, molestiae mus eget vehicula fringilla consequat, voluptatibus temporibus, lectus,<span style=\"background-color: yellow;\"> eros.</span></p><p><br></p><p>Sed accusamus consequat! Laudantium quae, esse class magna illum? <span style=\"background-color: green;\">Tempora erat ultrices facere eveniet</span>, adipiscing ad! <span style=\"background-color: yellow;\">Nam</span>, officia, unde pariatur natus? Repellat amet. Praesentium, deserunt nostra voluptas nec, magna consectetuer facere voluptatibus, ducimus, ab? Debitis, vero. Suscipit facilisi felis urna.</p><p><br></p><p>Ac! <span style=\"background-color: green;\">Tempor, sagittis rhoncus</span> pulvinar <span style=\"background-color: yellow;\">voluptates veniam</span>? Facere lorem. Exercitation! Dolorem vestibulum voluptate quisquam curabitur rhoncus molestias penatibus morbi reiciendis condimentum? Labore debitis fuga sodales deleniti, perferendis fusce occaecat, maxime semper <span style=\"background-color: green;\">varius aperiam ratione</span>! <span style=\"background-color: yellow;\">Voluptatibus </span>quia, ipsum! At dolore class.</p>', '2023-12-22 18:47:00', '2023-12-22 18:53:04', 0),
(198385, '198385_df46360b-31f2-4d6e-a821-0f0afeea3dbe', '198385_ccb9bd5d-c9fe-434a-bfd7-4ec5695636ed_4237bba1-9f7e-4a52-9', 'Styling', '<p><span style=\"background-color: green;\">Massa ullamco necessitatibus semper?</span> <span style=\"background-color: yellow;\">Phasellus a</span>rchitecto fugiat. Magna? Lorem consectetuer ullamcorper dolores, maiores pellentesque. Amet exercitation gravida et! Quod ipsa cupiditate phasellus dolore fringilla dolore. Veritatis? Quisque nostrud perspiciatis autem, amet nunc iaculis? Deleniti placeat eius neque fuga dapibus blanditiis.</p><p><br></p><p>Penatibus vulputate justo, voluptas quisquam, magni adipisci donec, debitis deleniti rerum aperiam aspernatur tortor ad proident distinctio excepteur sem elit tempor lobortis dui dictum, fringilla dolore dis, tempus tincidunt nesciunt earum corrupti mollit nibh viverra reprehenderit, cupidatat, pellentesque inceptos dictum.</p><p><br></p><p>Adipisicing dui sint harum quia non nullam parturient deserunt, nobis. Curabitur ducimus, proident voluptate curae urna dignissimos at irure. Maecenas mollitia placerat platea lorem. Iste ex quas? Eget, sequi aliquip justo ac elementum? Modi! Conubia? Suspendisse, porttitor dolore etiam molestie.</p>', '2023-12-23 06:26:05', '2023-12-23 06:30:18', 1),
(198385, '198385_df46360b-31f2-4d6e-a821-0f0afeea3dbe', '198385_4d2fb099-5b3f-4662-b926-fc5dd8874da7_20ee85de-689c-413c-8', '', '<p>Minima varius magna! Dis, pariatur aliquet, diamlorem netus laborum ultrices per, mollit eleifend incididunt corrupti, ridiculus massa neque, maiores sodales lorem repellat laborum natoque? Natus quos aliquet dui! Vel reprehenderit suscipit massa, dis esse, cursus excepturi aut modi pulvinar aliquid dolore. Eiusmod sunt corporis natoque, praesent curabitur modi est veritatis aute? Augue. Sociis occaecat libero, quod, nec dolorem, cupiditate torquent, massa laboris porro, mus, saepe. Veritatis explicabo, nesciunt, ullamco eligendi, quam fugit. Pellentesque optio anim vehicula aperiam cillum, cras aptent, convallis quas in et? Fugiat molestias mattis eos! Rhoncus dolorum? Reprehenderit interdum recusandae. Quasi atque facere? Litora omnis quasi dignissimos? Parturient sed aspernatur eveniet! Deserunt, convallis luctus integer massa adipiscing. Occaecat, mi. Dolorum ut tempore! Fames consectetuer pede? Ullam corporis. Non iste lacus optio augue porttitor blandit sagittis nesciunt bibendum. Maecenas inceptos, dolorum fuga iaculis, curabitur? Explicabo debitis, eros nostrum ratione, ullam quos. Dolore. Ligula suspendisse vitae tempor eius unde tempus dignissim! Ipsum! Erat! Nulla, illo! Enim adipisci eros amet, rem ipsa, est phasellus. Nisi aspernatur facilisi dolores! Ac, quidem, vehicula? Error dolorem laboriosam! Mauris qui. Exercitationem curae fermentum placeat delectus corrupti? Repellendus nihil? Perferendis vestibulum? Quisque aperiam rhoncus vivamus pede maiores praesent dolore mi eos et convallis porta wisi.</p><p><br></p><p>Quis lectus illo sollicitudin minus, perferendis, felis erat ullam scelerisque elementum diam? Doloremque rem suscipit voluptatum? Dolor enim vulputate itaque aptent accusantium taciti adipisicing eiusmod iusto mollitia ut curae nonummy duis error do nibh? Reprehenderit tempore? Eius sed excepteur occaecati, molestie eu dolor consequuntur, hymenaeos iusto porttitor lectus. Tempus phasellus, nec doloribus sequi rem magni, congue cumque mollis nemo quae laboris cursus maxime sint modi vestibulum distinctio, montes lorem turpis nullam. Eros, unde torquent labore ligula, vehicula ullamcorper? Occaecat. Dis purus? Corrupti diam. Fuga! Augue pretium, aliquet faucibus, inceptos, dolores fermentum, non sociis torquent exercitationem ultrices! Aliquam convallis, dignissimos. Cras, inventore fugit mus vitae, anim? Porro eos platea, donec recusandae, consequuntur assumenda, autem esse potenti beatae, nostra. Sapien facere, wisi? Nihil cupidatat orci semper metus est varius recusandae proin voluptas exercitation accusamus, pulvinar penatibus dolor sapiente scelerisque sapien, aliquet et nonummy dolores, blandit nihil! Rutrum ornare fuga sint sodales nunc fames aliqua voluptate impedit itaque dolor quisquam aliqua rhoncus cubilia viverra hac conubia sed tellus! Optio cupidatat delectus. Soluta sunt, ipsum soluta leo vestibulum aliquip cupidatat similique explicabo expedita, numquam? Tempora metus, quos? Atque conubia ut voluptates, urna felis mollis tenetur faucibus hic habitant pharetra fusce illo exercitation curae dolorem.</p>', '2023-12-23 06:29:52', '2023-12-23 06:29:52', 1),
(59621, '59621_27bea9d3-3795-412b-8b50-4410f17c39ee', '59621_09c3f2fd-1612-4d06-95a7-c9121a7def54_1eda1f08-d75a-4a7a-bd', 'Morse', '<p>Hehe</p>', '2023-12-23 07:19:18', '2023-12-23 07:20:50', 1),
(59621, '59621_27bea9d3-3795-412b-8b50-4410f17c39ee', '59621_dd6203a8-f2de-43bc-8f22-d592f56a2635_5bfa426e-fbc7-4c80-85', 'Red', '<p><span style=\"background-color: green;\">Quaerat quisquam impedit</span>, porta<span style=\"background-color: yellow;\"> sollicitudin?</span> Odit. Ea sociis montes! <span style=\"background-color: green;\">Modi repellendus maiores! U</span>nde leo, <span style=\"background-color: yellow;\">nonummy</span> diam id atque? Recusandae atque doloremque feugiat condimentum vestibulum soluta pellentesque qui erat, distinctio mollis.</p><p><br></p><p><span style=\"background-color: green;\">Metus sapiente omnis harum, auctor inventore tempus mus elit aptent consequatur doloremque?</span><span style=\"background-color: yellow;\"> Nonummy, quisque</span>, auctor atque! Augue aliquam, sollicitudin veniam amet quisquam orci earum culpa ducimus sed ipsum quam mollis.</p>', '2023-12-23 07:22:08', '2023-12-23 07:23:30', 1),
(59621, '59621_27bea9d3-3795-412b-8b50-4410f17c39ee', '59621_9b48f214-7424-4744-a6a3-fe7fa9ead78d_a4f10b8b-1757-42f3-89', 'Black', '<p>Temporibus commodi omnis unde nullam pariatur, minim aut dignissim error quisque magni qui, minim tortor? Diamlorem. Phasellus scelerisque! Quibusdam pariatur, leo, ducimus posuere anim, sagittis! Error! Lectus illo incididunt natus.</p><p><br></p><p>Platea quia tempore explicabo odio dolorum itaque officia iste quia amet, fugiat, feugiat pariatur harum ridiculus rutrum ante! Elementum ipsum recusandae adipiscing! Occaecati corrupti. Curae itaque adipiscing adipisci? Sollicitudin dapibus.</p>', '2023-12-23 07:22:23', '2023-12-23 07:22:23', 1);

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
(59621, 'sike', 'sike', 'sike', 'sike@gmail.com', '$2b$10$0lUPasMFS/LsJmhEvm0MROvNTVcGPWgSAb1QW4YN7OPsAFABPapFO', 'registered'),
(96596, 'jimbriel', 'Jim', 'Gabriel', 'jimbriel@gmail.com', '$2b$10$f3FIZhvr6VNEX4q4IB8Tl.S2g89z/7Hhruuj8szQruI03JjSk43Ai', 'registered'),
(198385, 'jas', 'jas', 'jas', 'jas@gmail.com', '$2b$10$BXl7vBuP1I1BeDj5Yb.gkeI5ibKkoLuOU7t63tl.9FPDme6xQ2C.m', 'registered'),
(214984, 'budz', 'Raphael', 'Matres', 'rmatres@gmail.com', '$2b$10$cH07F0eF4eFuCMk5Y3c/beoHfcofMTPaMwbmC1kfBycBZcvYaykuG', 'registered'),
(246437, 'crowley', 'Anthony', 'Crowley', 'janthony@gmail.com', '$2b$10$xUWNWPNPyKmxukR6Oo5wL.1KOiRV4eipm0XUK8k39Q17zyO51K4pq', 'registered'),
(495701, 'azi', 'Azi', 'Fell', 'azi@gmail.com', '$2b$10$vdusQR8YkFrqOzgiqU6gl.qCxCZVu6jU47Gg2GwfmopB.LtyfKXZq', 'registered'),
(513609, 'shax', 'shax', 'shax', 'shax@gmail.com', '$2b$10$hPMQtZqdDq1zHAIfTpYNC.vPlP3PCI7CSHA4DE7pPOlDYFIr60.n2', 'registered'),
(551634, 'nino', 'Anthony', 'Gonzales', 'agonzales@gmail.com', '$2b$10$TLgzio1inWJCJqhxPoO44OFDbR8yOxqc4SyYpf6W/4daK3SuMbCrC', 'registered'),
(642861, 'jerry', 'jerry', 'bell', 'jerry@gmail.com', '$2b$10$32T1eAmgRM/ZSepwt./LfeAvd8cfXD4YHOro6bWFwwUkGEDMMONh.', 'registered'),
(669211, 'alexabainza', 'Alex', 'Abainza', 'alexabainza@gmail.com', '$2b$10$ULnJ94gB7e4AiyS6VkqXCeCZb.n6UFvtW7eypkUTAuAUmdBcicIwC', 'registered'),
(691953, 'bobbyy', 'Fabiola', 'Villanueva', 'bobby@gmail.com', '$2b$10$RRMt4ieGjaGEzy6Xo40WEuY2dcAuBk6dyFGkPddkVE9yacWSFun96', 'registered'),
(696560, 'han', 'han', 'han', 'han@gmail.com', '$2b$10$Xy7sH6MR8boPgRs/QtjCJ.Ej01E9aVYXS95xRkrRByxrxFWaXyDAy', 'registered'),
(773346, 'sampleperson', 'Ethyl', 'Alcohol', 'sample@gmail.com', '$2b$10$BgeR2BHdQNt/7My4W0uqBO8JrPiv0XFHt0RpawRfVB772zAsfycjO', 'registered'),
(875483, 'bryan123', 'Bryan', 'Sanchez', 'bsanchez@gmail.com', '$2b$10$dsFZ4n5c1pftdi1rv6Z.4ODNf8T0y44BjNDPMLFdLBvlbTvPST/vO', 'registered');

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
-- Dumping data for table `visited_documents`
--

INSERT INTO `visited_documents` (`person_id`, `note_id`, `date_visited`) VALUES
('424e7209-618c-4e14-8c2b-e8221a756fa5', '669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b', '2023-12-22 09:40:57'),
('424e7209-618c-4e14-8c2b-e8221a756fa5', '669211_3f31f675-c56d-45b0-b8f0-b1a34bdc2e04_eddbd70e-02e1-4130-9', '2023-12-22 09:41:38'),
('424e7209-618c-4e14-8c2b-e8221a756fa5', '198385_0f96d559-8b31-45c4-aa56-d35828e3b567_5407ef08-36b9-45a5-a', '2023-12-22 09:41:41'),
('59eee4f0-aa97-4c15-a05a-6c01ddb98232', '669211_3f31f675-c56d-45b0-b8f0-b1a34bdc2e04_eddbd70e-02e1-4130-9', '2023-12-22 09:42:04'),
('59eee4f0-aa97-4c15-a05a-6c01ddb98232', '875483_a0b146bc-e4e8-4a12-ac31-ba634e41761e_d0eff944-b874-46d2-b', '2023-12-22 09:42:08'),
('59eee4f0-aa97-4c15-a05a-6c01ddb98232', '669211_cbed46ba-15f1-4f92-ae67-79d45783239d_33f7621e-4771-49b3-a', '2023-12-22 09:42:11'),
('769c1cf5-8241-4129-a438-f058e40e3a34', '669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b', '2023-12-22 09:42:42'),
('769c1cf5-8241-4129-a438-f058e40e3a34', '669211_3f31f675-c56d-45b0-b8f0-b1a34bdc2e04_eddbd70e-02e1-4130-9', '2023-12-22 09:42:45'),
('769c1cf5-8241-4129-a438-f058e40e3a34', '198385_0f96d559-8b31-45c4-aa56-d35828e3b567_5407ef08-36b9-45a5-a', '2023-12-22 09:42:47'),
('d0566512-ae9f-4859-a81c-7986b5bfc03a', '669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b', '2023-12-22 10:03:45'),
('d0566512-ae9f-4859-a81c-7986b5bfc03a', '669211_3f31f675-c56d-45b0-b8f0-b1a34bdc2e04_eddbd70e-02e1-4130-9', '2023-12-22 10:03:48'),
('d0566512-ae9f-4859-a81c-7986b5bfc03a', '198385_0f96d559-8b31-45c4-aa56-d35828e3b567_5407ef08-36b9-45a5-a', '2023-12-22 10:03:54'),
('acd10d1d-75c6-4983-bb10-1139a1439d29', '669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b', '2023-12-22 13:20:15'),
('acd10d1d-75c6-4983-bb10-1139a1439d29', '669211_3f31f675-c56d-45b0-b8f0-b1a34bdc2e04_eddbd70e-02e1-4130-9', '2023-12-22 13:20:18'),
('acd10d1d-75c6-4983-bb10-1139a1439d29', '198385_0f96d559-8b31-45c4-aa56-d35828e3b567_5407ef08-36b9-45a5-a', '2023-12-22 13:20:19'),
('aa849683-71ab-4202-9f87-11947e6210e3', '669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b', '2023-12-22 17:44:53'),
('aa849683-71ab-4202-9f87-11947e6210e3', '875483_b496c21d-18b7-451f-b356-f97676cd13bb_232a0a8d-0470-4a0b-b', '2023-12-22 17:44:56'),
('aa849683-71ab-4202-9f87-11947e6210e3', '875483_a0b146bc-e4e8-4a12-ac31-ba634e41761e_d0eff944-b874-46d2-b', '2023-12-22 17:44:57'),
('3b7a7374-5d7d-4758-8dcc-72cde8ae64eb', '669211_05f58249-82a2-4020-8a37-5d9930699cf7_f8ffab24-0bb4-4b61-b', '2023-12-22 18:20:36'),
('3b7a7374-5d7d-4758-8dcc-72cde8ae64eb', '198385_0f96d559-8b31-45c4-aa56-d35828e3b567_5407ef08-36b9-45a5-a', '2023-12-22 18:21:18'),
('3b7a7374-5d7d-4758-8dcc-72cde8ae64eb', '875483_b496c21d-18b7-451f-b356-f97676cd13bb_232a0a8d-0470-4a0b-b', '2023-12-22 18:21:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flashcards`
--
ALTER TABLE `flashcards`
  ADD PRIMARY KEY (`flashcard_id`);

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=976229;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
