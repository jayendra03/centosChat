-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 02, 2018 at 07:57 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `centose`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE IF NOT EXISTS `chat` (
`chat_id` bigint(20) NOT NULL,
  `from_id` bigint(20) NOT NULL,
  `to_id` bigint(20) NOT NULL,
  `message` text,
  `attachment` text,
  `message_type` varchar(50) NOT NULL COMMENT '10 = audio/video call',
  `status` smallint(5) NOT NULL,
  `msg_time` varchar(20) NOT NULL,
  `msg_date` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`chat_id`, `from_id`, `to_id`, `message`, `attachment`, `message_type`, `status`, `msg_time`, `msg_date`) VALUES
(1, 1, 2, 'xcvx', NULL, '0', 0, '03:38 PM', '2016-07-11 00:00:00'),
(2, 1, 2, 'vxcv', NULL, '0', 0, '03:38 PM', '2016-07-11 00:00:00'),
(3, 1, 2, 'xcv', NULL, '0', 0, '03:38 PM', '2016-07-11 00:00:00'),
(4, 1, 2, 'xcv', NULL, '0', 0, '03:38 PM', '2016-07-11 00:00:00'),
(5, 1, 2, 'xcv', NULL, '0', 0, '03:38 PM', '2016-07-11 00:00:00'),
(6, 1, 3, 'cxcv', NULL, '0', 0, '03:41 PM', '2016-07-11 00:00:00'),
(7, 1, 3, 'vxcv', NULL, '0', 0, '03:41 PM', '2016-07-11 00:00:00'),
(8, 1, 3, 'xcv', NULL, '0', 0, '03:41 PM', '2016-07-11 00:00:00'),
(9, 1, 4, 'sdfsd', NULL, '0', 0, '04:17 PM', '2016-07-11 00:00:00'),
(10, 1, 4, 'sdf', NULL, '0', 0, '04:17 PM', '2016-07-11 00:00:00'),
(11, 1, 4, 'sdf', NULL, '0', 0, '04:17 PM', '2016-07-11 00:00:00'),
(12, 1, 4, 'dsf', NULL, '0', 0, '04:17 PM', '2016-07-11 00:00:00'),
(13, 1, 4, 'sdf', NULL, '0', 0, '04:17 PM', '2016-07-11 00:00:00'),
(14, 1, 6, 'vcxv', NULL, '0', 0, '04:19 PM', '2016-07-11 16:19:01'),
(15, 1, 6, 'xcv', NULL, '0', 0, '04:19 PM', '2016-07-11 16:19:02'),
(16, 1, 6, 'xcv', NULL, '0', 0, '04:19 PM', '2016-07-11 16:19:02'),
(17, 1, 6, 'xcv', NULL, '0', 0, '04:19 PM', '2016-07-11 16:19:03'),
(18, 1, 2, 'xcv', NULL, '0', 0, '04:27 PM', '2016-07-11 16:27:50'),
(19, 1, 2, 'xcv', NULL, '0', 0, '04:27 PM', '2016-07-11 16:27:51'),
(20, 1, 2, 'xcv', NULL, '0', 0, '04:27 PM', '2016-07-11 16:27:51'),
(21, 1, 2, 'cxv', NULL, '0', 0, '04:27 PM', '2016-07-11 16:27:52'),
(22, 1, 2, 'xcv', NULL, '0', 0, '04:27 PM', '2016-07-11 16:27:52'),
(23, 1, 2, 'cxv', NULL, '0', 0, '04:27 PM', '2016-07-11 16:27:53'),
(24, 1, 2, 'xcv', NULL, '0', 0, '04:27 PM', '2016-07-11 16:27:53'),
(25, 1, 3, 'hello', NULL, '0', 0, '04:52 PM', '2016-07-11 16:52:21'),
(26, 3, 1, 'hi', NULL, '0', 0, '04:52 PM', '2016-07-11 16:52:59'),
(27, 3, 1, 'how are you', NULL, '0', 0, '04:53 PM', '2016-07-11 16:53:19'),
(28, 3, 1, 'sdas', NULL, '0', 0, '04:54 PM', '2016-07-11 16:54:06'),
(29, 3, 1, 'sdsd', NULL, '0', 0, '04:54 PM', '2016-07-11 16:54:08'),
(30, 3, 1, 'cxzx', NULL, '0', 0, '04:54 PM', '2016-07-11 16:54:09'),
(31, 1, 3, 'www', NULL, '0', 0, '04:54 PM', '2016-07-11 16:54:14'),
(32, 1, 3, 'w', NULL, '0', 0, '04:54 PM', '2016-07-11 16:54:15'),
(33, 1, 3, 'w', NULL, '0', 0, '04:54 PM', '2016-07-11 16:54:16'),
(34, 1, 3, 'a', NULL, '0', 0, '04:54 PM', '2016-07-11 16:54:17'),
(35, 1, 3, 'a', NULL, '0', 0, '04:54 PM', '2016-07-11 16:54:17'),
(36, 1, 3, 'f', NULL, '0', 0, '04:54 PM', '2016-07-11 16:54:19'),
(37, 1, 3, 'g', NULL, '0', 0, '04:54 PM', '2016-07-11 16:54:21'),
(38, 1, 3, 'zx,cz,.', NULL, '0', 0, '04:54 PM', '2016-07-11 16:54:31'),
(39, 1, 2, 'fgdf', NULL, '0', 0, '05:18 PM', '2016-07-11 17:18:32'),
(40, 1, 3, 'n', NULL, '0', 0, '04:51 PM', '2016-07-12 16:51:23'),
(41, 1, 3, 'hello', NULL, '0', 0, '10:46 PM', '2016-07-12 22:46:06'),
(42, 1, 3, 'hi', NULL, '0', 0, '10:46 PM', '2016-07-12 22:46:25'),
(43, 1, 3, 'how are you', NULL, '0', 0, '10:46 PM', '2016-07-12 22:46:33'),
(44, 3, 1, 'i am fine', NULL, '0', 0, '10:46 PM', '2016-07-12 22:46:43'),
(45, 3, 1, 'fgdfgdfg', NULL, '0', 0, '04:21 PM', '2016-07-14 16:21:33'),
(46, 1, 3, 'rrrrrrr', NULL, '0', 0, '04:21 PM', '2016-07-14 16:21:47'),
(47, 3, 1, 'ghfghfg', NULL, '0', 0, '04:22 PM', '2016-07-14 16:22:29'),
(48, 3, 1, 'hello', NULL, '0', 0, '05:27 PM', '2016-07-14 17:27:44'),
(49, 1, 3, 'hi', NULL, '0', 0, '05:27 PM', '2016-07-14 17:27:52'),
(50, 3, 1, 'how are you', NULL, '0', 0, '05:28 PM', '2016-07-14 17:28:04'),
(51, 2, 1, 'canceled', NULL, '10', 0, '08:00 PM', '2016-07-16 20:00:46'),
(52, 1, 2, 'canceled', NULL, '10', 0, '08:02 PM', '2016-07-16 20:02:51'),
(53, 2, 1, 'canceled', NULL, '10', 0, '08:05 PM', '2016-07-16 20:05:40'),
(54, 2, 1, 'Rejected', NULL, '10', 0, '08:08 PM', '2016-07-16 20:08:18'),
(55, 1, 2, 'helo', NULL, '0', 0, '08:31 PM', '2016-07-16 20:31:25'),
(56, 2, 1, 'Rejected', NULL, '10', 0, '08:31 PM', '2016-07-16 20:31:38'),
(57, 2, 1, 'hi', NULL, '0', 0, '08:32 PM', '2016-07-16 20:32:50'),
(58, 1, 2, 'Rejected', NULL, '10', 0, '08:33 PM', '2016-07-16 20:33:01'),
(59, 2, 1, 'canceled', NULL, '10', 0, '08:36 PM', '2016-07-16 20:36:10'),
(60, 2, 1, 'hello', NULL, '0', 0, '08:45 PM', '2016-07-16 20:45:02'),
(61, 2, 1, 'canceled', NULL, '10', 0, '08:45 PM', '2016-07-16 20:45:10'),
(62, 2, 1, 'Rejected', NULL, '10', 0, '08:45 PM', '2016-07-16 20:45:29'),
(63, 2, 1, 'he', NULL, '0', 0, '08:56 PM', '2016-07-16 20:56:23'),
(64, 2, 1, 'canceled', NULL, '10', 0, '08:56 PM', '2016-07-16 20:56:30'),
(65, 2, 1, 'Rejected', NULL, '10', 0, '08:57 PM', '2016-07-16 20:57:09'),
(66, 2, 1, 'Rejected', NULL, '10', 0, '09:06 PM', '2016-07-16 21:06:02'),
(67, 2, 1, 'Rejected', NULL, '10', 0, '09:07 PM', '2016-07-16 21:07:24'),
(68, 2, 1, 'hi', NULL, '0', 0, '09:12 PM', '2016-07-16 21:12:27'),
(69, 2, 1, 'canceled', NULL, '10', 0, '09:12 PM', '2016-07-16 21:12:35'),
(70, 2, 1, 'Rejected', NULL, '10', 0, '09:12 PM', '2016-07-16 21:12:48'),
(71, 2, 1, 'szf', NULL, '0', 0, '09:14 PM', '2016-07-16 21:14:03'),
(72, 2, 1, 'Rejected', NULL, '10', 0, '09:14 PM', '2016-07-16 21:14:09'),
(73, 1, 2, 'xcv', NULL, '0', 0, '09:26 PM', '2016-07-16 21:26:34'),
(74, 1, 2, 'undefined', NULL, '10', 0, '09:27 PM', '2016-07-16 21:27:18'),
(75, 1, 2, 'undefined', NULL, '10', 0, '09:27 PM', '2016-07-16 21:27:18'),
(76, 1, 2, 'undefined', NULL, '10', 0, '09:27 PM', '2016-07-16 21:27:18'),
(77, 1, 2, 'undefined', NULL, '10', 0, '09:27 PM', '2016-07-16 21:27:18'),
(78, 1, 2, 'undefined', NULL, '10', 0, '09:27 PM', '2016-07-16 21:27:18'),
(79, 1, 2, 'undefined', NULL, '10', 0, '09:27 PM', '2016-07-16 21:27:19'),
(80, 2, 1, 'as', NULL, '0', 0, '09:30 PM', '2016-07-16 21:30:15'),
(81, 2, 1, 'canceled', NULL, '10', 0, '09:30 PM', '2016-07-16 21:30:21'),
(82, 2, 1, 'undefined', NULL, '10', 0, '09:30 PM', '2016-07-16 21:30:54'),
(83, 2, 1, 'undefined', NULL, '10', 0, '09:30 PM', '2016-07-16 21:30:54'),
(84, 2, 1, 'undefined', NULL, '10', 0, '09:30 PM', '2016-07-16 21:30:55'),
(85, 2, 1, 'undefined', NULL, '10', 0, '09:30 PM', '2016-07-16 21:30:55'),
(86, 2, 1, 'undefined', NULL, '10', 0, '09:30 PM', '2016-07-16 21:30:55'),
(87, 2, 1, 'undefined', NULL, '10', 0, '09:30 PM', '2016-07-16 21:30:55'),
(88, 2, 1, 'cvxc', NULL, '0', 0, '09:40 PM', '2016-07-16 21:40:39'),
(89, 2, 1, 'vcxv', NULL, '0', 0, '09:45 PM', '2016-07-16 21:45:23'),
(90, 2, 1, '00:00:16', NULL, '10', 0, '09:46 PM', '2016-07-16 21:46:03'),
(91, 2, 1, '00:00:19', NULL, '10', 0, '09:46 PM', '2016-07-16 21:46:03'),
(92, 2, 1, '00:00:18', NULL, '10', 0, '09:46 PM', '2016-07-16 21:46:03'),
(93, 2, 1, 'bvc', NULL, '0', 0, '09:49 PM', '2016-07-16 21:49:39'),
(94, 2, 1, '00:00:08', NULL, '10', 0, '09:50 PM', '2016-07-16 21:50:03'),
(95, 2, 1, '00:00:10', NULL, '10', 0, '09:50 PM', '2016-07-16 21:50:44'),
(96, 2, 1, 'nvb', NULL, '0', 0, '10:04 PM', '2016-07-16 22:04:36'),
(97, 2, 1, 'canceled', NULL, '10', 0, '10:04 PM', '2016-07-16 22:04:44'),
(98, 2, 1, 'canceled', NULL, '10', 0, '10:05 PM', '2016-07-16 22:05:13'),
(99, 2, 1, 'bbcv', NULL, '0', 0, '10:05 PM', '2016-07-16 22:05:56'),
(100, 2, 1, 'canceled', NULL, '10', 0, '10:06 PM', '2016-07-16 22:06:04'),
(101, 2, 1, 'Rejected', NULL, '10', 0, '10:06 PM', '2016-07-16 22:06:12'),
(102, 2, 1, '00:02:09', NULL, '10', 0, '02:49 AM', '2016-07-17 02:49:17'),
(103, 2, 1, 'xvxc', NULL, '0', 0, '11:16 PM', '2016-07-19 23:16:58'),
(104, 2, 1, '00:00:32', NULL, '10', 0, '11:17 PM', '2016-07-19 23:17:45'),
(105, 1, 2, 'hello', NULL, '0', 0, '03:06 PM', '2016-07-21 15:06:18'),
(106, 1, 2, '00:01:26', NULL, '10', 0, '03:07 PM', '2016-07-21 15:07:56'),
(107, 2, 1, '00:03:06', NULL, '10', 0, '03:11 PM', '2016-07-21 15:11:51'),
(108, 1, 2, 'hi', NULL, '0', 0, '03:25 PM', '2016-07-21 15:25:00'),
(109, 1, 2, '00:00:27', NULL, '10', 0, '03:27 PM', '2016-07-21 15:27:30'),
(110, 2, 1, '00:00:17', NULL, '10', 0, '03:28 PM', '2016-07-21 15:28:09'),
(111, 1, 2, 'nc,cxn', NULL, '0', 0, '03:36 PM', '2016-07-23 15:36:35'),
(112, 1, 2, 'canceled', NULL, '10', 0, '03:43 PM', '2016-07-23 15:43:42'),
(113, 2, 1, '00:07:37', NULL, '10', 0, '02:36 PM', '2016-07-26 14:36:31'),
(114, 2, 1, '00:05:17', NULL, '10', 0, '02:43 PM', '2016-07-26 14:43:23'),
(115, 2, 1, '00:01:26', NULL, '10', 0, '02:45 PM', '2016-07-26 14:45:14'),
(116, 2, 1, '00:00:50', NULL, '10', 0, '02:47 PM', '2016-07-26 14:47:47'),
(117, 2, 1, '00:00:26', NULL, '10', 0, '02:51 PM', '2016-07-26 14:51:51'),
(118, 1, 2, '00:01:36', NULL, '10', 0, '03:09 PM', '2016-08-05 15:09:55'),
(119, 1, 2, '00:00:53', NULL, '10', 0, '03:11 PM', '2016-08-05 15:11:13'),
(120, 1, 2, '00:00:27', NULL, '10', 0, '03:14 PM', '2016-08-05 15:14:14'),
(121, 2, 1, '00:02:17', NULL, '10', 0, '04:15 PM', '2016-08-05 16:15:13'),
(122, 2, 1, '00:00:32', NULL, '10', 0, '04:16 PM', '2016-08-05 16:16:19'),
(123, 2, 1, '00:03:24', NULL, '10', 0, '04:21 PM', '2016-08-05 16:21:22'),
(124, 2, 1, '00:00:18', NULL, '10', 0, '04:22 PM', '2016-08-05 16:22:28'),
(125, 1, 2, '00:00:20', NULL, '10', 0, '04:23 PM', '2016-08-05 16:23:39'),
(126, 2, 1, '00:00:08', NULL, '10', 0, '04:24 PM', '2016-08-05 16:24:36'),
(127, 1, 2, '00:00:19', NULL, '10', 0, '04:26 PM', '2016-08-05 16:26:20'),
(128, 1, 2, '00:01:06', NULL, '10', 0, '04:27 PM', '2016-08-05 16:27:28'),
(129, 1, 2, '00:00:08', NULL, '10', 0, '04:28 PM', '2016-08-05 16:28:06'),
(130, 1, 2, 'canceled', NULL, '10', 0, '04:28 PM', '2016-08-05 16:28:11'),
(131, 2, 1, '00:00:33', NULL, '10', 0, '04:30 PM', '2016-08-05 16:30:50'),
(132, 2, 1, '00:00:31', NULL, '10', 0, '04:36 PM', '2016-08-05 16:36:39'),
(133, 1, 2, '00:00:14', NULL, '10', 0, '04:37 PM', '2016-08-05 16:37:47'),
(134, 1, 2, '00:00:34', NULL, '10', 0, '04:57 PM', '2016-08-05 16:57:39'),
(135, 2, 1, 'Rejected', NULL, '10', 0, '04:59 PM', '2016-08-05 16:59:20'),
(136, 1, 2, '00:00:36', NULL, '10', 0, '05:00 PM', '2016-08-05 17:00:19'),
(137, 2, 1, 'cxz', NULL, '0', 0, '05:06 PM', '2016-08-05 17:06:14'),
(138, 1, 2, '00:00:58', NULL, '10', 0, '05:07 PM', '2016-08-05 17:07:31'),
(139, 1, 2, 'Rejected', NULL, '10', 0, '05:07 PM', '2016-08-05 17:07:47'),
(140, 2, 1, '00:00:52', NULL, '10', 0, '05:12 PM', '2016-08-05 17:12:36'),
(141, 1, 2, '00:00:28', NULL, '10', 0, '05:13 PM', '2016-08-05 17:13:29'),
(142, 1, 2, '00:00:16', NULL, '10', 0, '05:13 PM', '2016-08-05 17:13:48'),
(143, 2, 1, '00:00:27', NULL, '10', 0, '05:14 PM', '2016-08-05 17:14:28'),
(144, 2, 1, '00:00:10', NULL, '10', 0, '05:14 PM', '2016-08-05 17:14:41'),
(145, 2, 1, '00:00:14', NULL, '10', 0, '05:15 PM', '2016-08-05 17:15:08'),
(146, 2, 1, '00:00:28', NULL, '10', 0, '05:16 PM', '2016-08-05 17:16:17'),
(147, 1, 2, '00:03:31', NULL, '10', 0, '05:19 PM', '2016-08-05 17:19:56'),
(148, 2, 1, '00:00:36', NULL, '10', 0, '05:33 PM', '2016-08-05 17:33:09'),
(149, 2, 1, '00:01:31', NULL, '10', 0, '05:34 PM', '2016-08-05 17:34:42'),
(150, 2, 1, '00:00:03', NULL, '10', 0, '05:35 PM', '2016-08-05 17:35:00'),
(151, 2, 1, '00:00:15', NULL, '10', 0, '05:36 PM', '2016-08-05 17:36:11'),
(152, 2, 1, '00:00:16', NULL, '10', 0, '05:36 PM', '2016-08-05 17:36:29'),
(153, 1, 2, '00:00:09', NULL, '10', 0, '05:37 PM', '2016-08-05 17:37:30'),
(154, 1, 2, '00:00:05', NULL, '10', 0, '05:37 PM', '2016-08-05 17:37:57'),
(155, 2, 1, '00:02:09', NULL, '10', 0, '05:40 PM', '2016-08-05 17:40:55'),
(156, 1, 2, '00:00:39', NULL, '10', 0, '05:43 PM', '2016-08-05 17:43:54'),
(157, 1, 2, '00:01:39', NULL, '10', 0, '05:49 PM', '2016-08-05 17:49:02'),
(158, 2, 1, '00:00:27', NULL, '10', 0, '06:03 PM', '2016-08-05 18:03:45'),
(159, 3, 4, 'hello', NULL, '0', 0, '01:51 AM', '2016-08-12 01:51:39'),
(160, 3, 4, 'hi', NULL, '0', 0, '01:53 AM', '2016-08-12 01:53:30'),
(161, 4, 3, 'how are you', NULL, '0', 0, '01:53 AM', '2016-08-12 01:53:38'),
(162, 4, 3, 'good', NULL, '0', 0, '01:53 AM', '2016-08-12 01:53:58'),
(163, 3, 4, 'hello', NULL, '0', 0, '02:17 AM', '2016-08-12 02:17:15'),
(164, 4, 3, 'hi', NULL, '0', 0, '02:17 AM', '2016-08-12 02:17:31'),
(165, 1, 2, 'canceled', NULL, '10', 0, '07:52 PM', '2017-01-05 19:52:14');

-- --------------------------------------------------------

--
-- Table structure for table `chat_rooms`
--

CREATE TABLE IF NOT EXISTS `chat_rooms` (
`id` int(20) NOT NULL,
  `fromId` int(20) NOT NULL,
  `toId` int(20) NOT NULL,
  `from_name` varchar(200) NOT NULL,
  `to_name` varchar(200) NOT NULL,
  `pageTitle` varchar(200) NOT NULL,
  `room_name` varchar(200) NOT NULL,
  `room_url` varchar(200) NOT NULL,
  `call_duration` varchar(200) NOT NULL,
  `call_type` smallint(5) NOT NULL COMMENT '1 = audio and 2 = video call',
  `date_created` varchar(50) NOT NULL,
  `status` smallint(5) NOT NULL COMMENT '1 = accept, 2 = cancel, 3 = reject , 4 = in call '
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat_rooms`
--

INSERT INTO `chat_rooms` (`id`, `fromId`, `toId`, `from_name`, `to_name`, `pageTitle`, `room_name`, `room_url`, `call_duration`, `call_type`, `date_created`, `status`) VALUES
(1, 1, 2, 'jay', 'jeet', 'Video Call', 'cenvid121468321509377', 'http://localhost/centoseusercall.html?room=cenvid121468321509377', '', 2, '2016-07-12 16:35:09', 0),
(2, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468321899990', 'http://localhost/centoseusercall.html?room=cenvid131468321899990', '', 2, '2016-07-12 16:41:39', 0),
(3, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468322267350', 'http://localhost/centoseusercall.html?room=cenvid131468322267350', '', 2, '2016-07-12 16:47:47', 0),
(4, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468322430516', 'http://localhost/centoseusercall.html?room=cenvid131468322430516', '', 2, '2016-07-12 16:50:30', 0),
(5, 3, 1, 'ram', 'jay', 'Video Call', 'cenvid311468324237970', 'http://localhost/centose/usercall.html?room=cenvid311468324237970', '', 2, '2016-07-12 17:20:37', 2),
(6, 3, 1, 'ram', 'jay', 'Video Call', 'cenvid311468324254482', 'http://localhost/centose/usercall.html?room=cenvid311468324254482', '', 2, '2016-07-12 17:20:54', 3),
(7, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468333986892', 'http://localhost/centose/usercall.html?room=cenvid131468333986892', '', 2, '2016-07-12 20:03:06', 0),
(8, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468334129635', 'http://localhost/centose/usercall.html?room=cenvid131468334129635', '00:01:44', 2, '2016-07-12 20:05:29', 1),
(9, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468334502833', 'http://localhost/centose/usercall.html?room=cenvid131468334502833', '00:03:28', 2, '2016-07-12 20:11:42', 1),
(10, 3, 1, 'ram', 'jay', 'Video Call', 'cenvid311468335022650', 'http://localhost/centose/usercall.html?room=cenvid311468335022650', '00:00:41', 2, '2016-07-12 20:20:22', 1),
(11, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468335533321', 'http://localhost/centose/usercall.html?room=cenvid131468335533321', '00:00:42', 2, '2016-07-12 20:28:53', 1),
(12, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468336602570', 'http://localhost/centose/usercall.html?room=cenvid131468336602570', '00:01:08', 2, '2016-07-12 20:46:42', 1),
(13, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468337817137', 'http://localhost/centose/usercall.html?room=cenvid131468337817137', '00:00:50', 2, '2016-07-12 21:06:57', 1),
(14, 1, 3, 'jay', 'ram', 'Voice Call', 'cenvid131468340713812', 'http://localhost/centose/usercall.html?room=cenvid131468340713812&ct=1', '00:00:34', 1, '2016-07-12 21:55:13', 1),
(15, 1, 3, 'jay', 'ram', 'Voice Call', 'cenvid131468341101921', 'http://localhost/centose/usercall.html?room=cenvid131468341101921&ct=1', '00:02:29', 1, '2016-07-12 22:01:41', 1),
(16, 1, 3, 'jay', 'ram', 'Voice Call', 'cenvid131468343821058', 'http://localhost/centose/usercall.html?room=cenvid131468343821058&ct=1', '00:00:31', 1, '2016-07-12 22:47:01', 1),
(17, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468343995046', 'http://localhost/centose/usercall.html?room=cenvid131468343995046&ct=2', '00:01:03', 2, '2016-07-12 22:49:55', 1),
(18, 3, 1, 'ram', 'jay', 'Video Call', 'cenvid311468492010626', 'http://localhost/centose/usercall.html?room=cenvid311468492010626&ct=2', '', 2, '2016-07-14 15:56:50', 1),
(19, 3, 1, 'ram', 'jay', 'Video Call', 'cenvid311468492062891', 'http://localhost/centose/usercall.html?room=cenvid311468492062891&ct=2', '', 2, '2016-07-14 15:57:42', 1),
(20, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468492163394', 'http://localhost/centose/usercall.html?room=cenvid131468492163394&ct=2', '00:00:18', 2, '2016-07-14 15:59:23', 1),
(21, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468492212218', 'http://localhost/centose/usercall.html?room=cenvid131468492212218&ct=2', '', 2, '2016-07-14 16:00:12', 1),
(22, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468492445792', 'http://localhost/centose/usercall.html?room=cenvid131468492445792&ct=2', '00:00:26', 2, '2016-07-14 16:04:05', 1),
(23, 3, 1, 'ram', 'jay', 'Video Call', 'cenvid311468492537473', 'http://localhost/centose/usercall.html?room=cenvid311468492537473&ct=2', '00:00:18', 2, '2016-07-14 16:05:37', 1),
(24, 1, 3, 'jay', 'ram', 'Voice Call', 'cenvid131468492578637', 'http://localhost/centose/usercall.html?room=cenvid131468492578637&ct=1', '00:00:43', 1, '2016-07-14 16:06:18', 1),
(25, 1, 3, 'jay', 'ram', 'Voice Call', 'cenvid131468492913774', 'http://localhost/centose/usercall.html?room=cenvid131468492913774&ct=1', '00:00:16', 1, '2016-07-14 16:11:53', 1),
(26, 3, 1, 'ram', 'jay', 'Video Call', 'cenvid311468493352616', 'http://localhost/centose/usercall.html?room=cenvid311468493352616&ct=2', '00:00:18', 2, '2016-07-14 16:19:12', 1),
(27, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468671269271', 'http://localhost/centose/usercall.html?room=cenvid211468671269271&ct=2', '00:01:00', 2, '2016-07-16 17:44:29', 1),
(28, 2, 3, 'jeet', 'ram', 'Video Call', 'cenvid231468671311753', 'http://localhost/centose/usercall.html?room=cenvid231468671311753&ct=2', '', 2, '2016-07-16 17:45:11', 3),
(29, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211468671523152', 'http://localhost/centose/usercall.html?room=cenvid211468671523152&ct=1', '00:01:09', 1, '2016-07-16 17:48:43', 1),
(30, 3, 1, 'ram', 'jay', 'Video Call', 'cenvid311468671565981', 'http://localhost/centose/usercall.html?room=cenvid311468671565981&ct=2', '', 2, '2016-07-16 17:49:25', 4),
(31, 3, 2, 'ram', 'jeet', 'Video Call', 'cenvid321468671582137', 'http://localhost/centose/usercall.html?room=cenvid321468671582137&ct=2', '', 2, '2016-07-16 17:49:42', 4),
(32, 3, 2, 'ram', 'jeet', 'Video Call', 'cenvid321468671603269', 'http://localhost/centose/usercall.html?room=cenvid321468671603269&ct=2', '00:00:17', 2, '2016-07-16 17:50:03', 1),
(33, 2, 3, 'jeet', 'ram', 'Video Call', 'cenvid231468671656570', 'http://localhost/centose/usercall.html?room=cenvid231468671656570&ct=2', '', 2, '2016-07-16 17:50:56', 4),
(34, 3, 2, 'ram', 'jeet', 'Video Call', 'cenvid321468671701597', 'http://localhost/centose/usercall.html?room=cenvid321468671701597&ct=2', '00:00:48', 2, '2016-07-16 17:51:41', 1),
(35, 1, 2, 'jay', 'jeet', 'Video Call', 'cenvid121468671738536', 'http://localhost/centose/usercall.html?room=cenvid121468671738536&ct=2', '', 2, '2016-07-16 17:52:18', 4),
(36, 1, 3, 'jay', 'ram', 'Video Call', 'cenvid131468671744436', 'http://localhost/centose/usercall.html?room=cenvid131468671744436&ct=2', '', 2, '2016-07-16 17:52:24', 4),
(37, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468678086854', 'http://localhost/centose/usercall.html?room=cenvid211468678086854&ct=2', '', 2, '2016-07-16 19:38:06', 3),
(38, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468678119395', 'http://localhost/centose/usercall.html?room=cenvid211468678119395&ct=2', '', 2, '2016-07-16 19:38:39', 2),
(39, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468678286638', 'http://localhost/centose/usercall.html?room=cenvid211468678286638&ct=2', '', 2, '2016-07-16 19:41:26', 2),
(40, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468678391466', 'http://localhost/centose/usercall.html?room=cenvid211468678391466&ct=2', '', 2, '2016-07-16 19:43:11', 2),
(41, 1, 2, 'jay', 'jeet', 'Video Call', 'cenvid121468678597645', 'http://localhost/centose/usercall.html?room=cenvid121468678597645&ct=2', '', 2, '2016-07-16 19:46:37', 2),
(42, 1, 2, 'jay', 'jeet', 'Video Call', 'cenvid121468678745732', 'http://localhost/centose/usercall.html?room=cenvid121468678745732&ct=2', '', 2, '2016-07-16 19:49:05', 2),
(43, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468679071460', 'http://localhost/centose/usercall.html?room=cenvid211468679071460&ct=2', '', 2, '2016-07-16 19:54:31', 2),
(44, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468679234630', 'http://localhost/centose/usercall.html?room=cenvid211468679234630&ct=2', '', 2, '2016-07-16 19:57:14', 2),
(45, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468679335363', 'http://localhost/centose/usercall.html?room=cenvid211468679335363&ct=2', '', 2, '2016-07-16 19:58:55', 2),
(46, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468679444130', 'http://localhost/centose/usercall.html?room=cenvid211468679444130&ct=2', '', 2, '2016-07-16 20:00:44', 2),
(47, 1, 2, 'jay', 'jeet', 'Video Call', 'cenvid121468679568967', 'http://localhost/centose/usercall.html?room=cenvid121468679568967&ct=2', '', 2, '2016-07-16 20:02:48', 2),
(48, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468679737277', 'http://localhost/centose/usercall.html?room=cenvid211468679737277&ct=2', '', 2, '2016-07-16 20:05:37', 2),
(49, 1, 2, 'jay', 'jeet', 'Video Call', 'cenvid121468679892235', 'http://localhost/centose/usercall.html?room=cenvid121468679892235&ct=2', '', 2, '2016-07-16 20:08:12', 3),
(50, 1, 2, 'jay', 'jeet', 'Video Call', 'cenvid121468681291538', 'http://localhost/centose/usercall.html?room=cenvid121468681291538&ct=2', '', 2, '2016-07-16 20:31:31', 3),
(51, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468681372342', 'http://localhost/centose/usercall.html?room=cenvid211468681372342&ct=2', '', 2, '2016-07-16 20:32:52', 3),
(52, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468681567628', 'http://localhost/centose/usercall.html?room=cenvid211468681567628&ct=2', '', 2, '2016-07-16 20:36:07', 2),
(53, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468682107303', 'http://localhost/centose/usercall.html?room=cenvid211468682107303&ct=2', '', 2, '2016-07-16 20:45:07', 2),
(54, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468682123545', 'http://localhost/centose/usercall.html?room=cenvid211468682123545&ct=2', '', 2, '2016-07-16 20:45:23', 3),
(55, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468682786324', 'http://localhost/centose/usercall.html?room=cenvid211468682786324&ct=2', '', 2, '2016-07-16 20:56:26', 2),
(56, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468682820419', 'http://localhost/centose/usercall.html?room=cenvid211468682820419&ct=2', '', 2, '2016-07-16 20:57:00', 3),
(57, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468683356011', 'http://localhost/centose/usercall.html?room=cenvid211468683356011&ct=2', '', 2, '2016-07-16 21:05:56', 3),
(58, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468683438690', 'http://localhost/centose/usercall.html?room=cenvid211468683438690&ct=2', '', 2, '2016-07-16 21:07:18', 3),
(59, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468683751648', 'http://localhost/centose/usercall.html?room=cenvid211468683751648&ct=2', '', 2, '2016-07-16 21:12:31', 2),
(60, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468683762572', 'http://localhost/centose/usercall.html?room=cenvid211468683762572&ct=2', '', 2, '2016-07-16 21:12:42', 3),
(61, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468683846955', 'http://localhost/centose/usercall.html?room=cenvid211468683846955&ct=2', '', 2, '2016-07-16 21:14:06', 3),
(62, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468683944527', 'http://localhost/centose/usercall.html?room=cenvid211468683944527&ct=2', '00:00:22', 2, '2016-07-16 21:15:44', 1),
(63, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468684400139', 'http://localhost/centose/usercall.html?room=cenvid211468684400139&ct=2', '00:00:15', 2, '2016-07-16 21:23:20', 1),
(64, 1, 2, 'jay', 'jeet', 'Video Call', 'cenvid121468684600746', 'http://localhost/centose/usercall.html?room=cenvid121468684600746&ct=2', '00:00:23', 2, '2016-07-16 21:26:40', 1),
(65, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211468684818914', 'http://localhost/centose/usercall.html?room=cenvid211468684818914&ct=2', '', 2, '2016-07-16 21:30:18', 2),
(66, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211468684826118', 'http://localhost/centose/usercall.html?room=cenvid211468684826118&ct=1', '00:00:20', 1, '2016-07-16 21:30:26', 1),
(67, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211468685452394', 'http://localhost/centose/usercall.html?room=cenvid211468685452394&ct=1', '00:00:17', 1, '2016-07-16 21:40:52', 1),
(68, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211468685733196', 'http://localhost/centose/usercall.html?room=cenvid211468685733196&ct=1', '00:00:18', 1, '2016-07-16 21:45:33', 1),
(69, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211468685984546', 'http://localhost/centose/usercall.html?room=cenvid211468685984546&ct=1', '00:00:08', 1, '2016-07-16 21:49:44', 1),
(70, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211468686027499', 'http://localhost/centose/usercall.html?room=cenvid211468686027499&ct=1', '00:00:10', 1, '2016-07-16 21:50:27', 1),
(71, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211468686880281', 'http://localhost/centose/usercall.html?room=cenvid211468686880281&ct=1', '', 1, '2016-07-16 22:04:40', 2),
(72, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211468686910759', 'http://localhost/centose/usercall.html?room=cenvid211468686910759&ct=1', '', 1, '2016-07-16 22:05:10', 2),
(73, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211468686962652', 'http://localhost/centose/usercall.html?room=cenvid211468686962652&ct=1', '', 1, '2016-07-16 22:06:02', 2),
(74, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211468686970109', 'http://localhost/centose/usercall.html?room=cenvid211468686970109&ct=1', '', 1, '2016-07-16 22:06:10', 3),
(75, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211468703815472', 'http://localhost/centose/usercall.html?room=cenvid211468703815472&ct=1', '00:02:09', 1, '2016-07-17 02:46:55', 1),
(76, 3, 1, 'ram', 'jay', 'Video Call', 'cenvid311468703883768', 'http://localhost/centose/usercall.html?room=cenvid311468703883768&ct=2', '', 2, '2016-07-17 02:48:03', 4),
(77, 3, 1, 'ram', 'jay', 'Voice Call', 'cenvid311468703906312', 'http://localhost/centose/usercall.html?room=cenvid311468703906312&ct=1', '', 1, '2016-07-17 02:48:26', 4),
(78, 3, 2, 'ram', 'jeet', 'Voice Call', 'cenvid321468703915239', 'http://localhost/centose/usercall.html?room=cenvid321468703915239&ct=1', '', 1, '2016-07-17 02:48:35', 4),
(79, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211468950424116', 'http://localhost/centose/usercall.html?room=cenvid211468950424116&ct=1', '00:00:32', 1, '2016-07-19 23:17:04', 1),
(80, 1, 2, 'jay', 'jeet', 'Video Call', 'cenvid121469093780721', 'http://localhost/centose/usercall.html?room=cenvid121469093780721&ct=2', '00:01:26', 2, '2016-07-21 15:06:20', 1),
(81, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211469093918225', 'http://localhost/centose/usercall.html?room=cenvid211469093918225&ct=2', '00:03:06', 2, '2016-07-21 15:08:38', 1),
(82, 1, 2, 'jay', 'jeet', 'Video Call', 'cenvid121469094903964', 'http://localhost/centose/usercall.html?room=cenvid121469094903964&ct=2', '00:00:27', 2, '2016-07-21 15:25:03', 1),
(83, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211469095064203', 'http://localhost/centose/usercall.html?room=cenvid211469095064203&ct=2', '00:00:17', 2, '2016-07-21 15:27:44', 1),
(84, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121469268819576', 'http://localhost/centose/usercall.html?room=cenvid121469268819576&ct=1', '', 1, '2016-07-23 15:43:39', 2),
(85, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211469523524129', 'http://localhost/centose/usercall.html?room=cenvid211469523524129&ct=2', '00:07:37', 2, '2016-07-26 14:28:44', 1),
(86, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211469524077678', 'http://localhost/centose/usercall.html?room=cenvid211469524077678&ct=2', '00:05:17', 2, '2016-07-26 14:37:57', 1),
(87, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211469524419577', 'http://localhost/centose/usercall.html?room=cenvid211469524419577&ct=2', '00:01:26', 2, '2016-07-26 14:43:39', 1),
(88, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211469524575741', 'http://localhost/centose/usercall.html?room=cenvid211469524575741&ct=2', '00:00:50', 2, '2016-07-26 14:46:15', 1),
(89, 2, 1, 'jeet', 'jay', 'Video Call', 'cenvid211469524876204', 'http://localhost/centose/usercall.html?room=cenvid211469524876204&ct=2', '00:00:26', 2, '2016-07-26 14:51:16', 1),
(90, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470389891563', 'http://localhost/centose/usercall.html?room=cenvid121470389891563&ct=1', '00:01:36', 1, '2016-08-05 15:08:11', 1),
(91, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470390012043', 'http://localhost/centose/usercall.html?room=cenvid121470390012043&ct=1', '00:00:53', 1, '2016-08-05 15:10:12', 1),
(92, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470390220904', 'http://localhost/centose/usercall.html?room=cenvid121470390220904&ct=1', '00:00:27', 1, '2016-08-05 15:13:40', 1),
(93, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470393704911', 'http://localhost/centose/usercall.html?room=cenvid211470393704911&ct=1', '00:02:17', 1, '2016-08-05 16:11:44', 1),
(94, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470393922149', 'http://localhost/centose/usercall.html?room=cenvid211470393922149&ct=1', '00:00:32', 1, '2016-08-05 16:15:22', 1),
(95, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470394067129', 'http://localhost/centose/usercall.html?room=cenvid211470394067129&ct=1', '00:03:24', 1, '2016-08-05 16:17:47', 1),
(96, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470394305773', 'http://localhost/centose/usercall.html?room=cenvid211470394305773&ct=1', '00:00:18', 1, '2016-08-05 16:21:45', 1),
(97, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470394351124', 'http://localhost/centose/usercall.html?room=cenvid121470394351124&ct=1', '00:00:20', 1, '2016-08-05 16:22:31', 1),
(98, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470394461596', 'http://localhost/centose/usercall.html?room=cenvid211470394461596&ct=1', '00:00:08', 1, '2016-08-05 16:24:21', 1),
(99, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470394485836', 'http://localhost/centose/usercall.html?room=cenvid121470394485836&ct=1', '00:01:06', 1, '2016-08-05 16:24:45', 1),
(100, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470394653937', 'http://localhost/centose/usercall.html?room=cenvid121470394653937&ct=1', '00:00:08', 1, '2016-08-05 16:27:33', 1),
(101, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470394689241', 'http://localhost/centose/usercall.html?room=cenvid121470394689241&ct=1', '', 1, '2016-08-05 16:28:09', 2),
(102, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470394695183', 'http://localhost/centose/usercall.html?room=cenvid211470394695183&ct=1', '00:00:33', 1, '2016-08-05 16:28:15', 1),
(103, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470395159397', 'http://localhost/centose/usercall.html?room=cenvid211470395159397&ct=1', '00:00:31', 1, '2016-08-05 16:35:59', 1),
(104, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470395243046', 'http://localhost/centose/usercall.html?room=cenvid121470395243046&ct=1', '00:00:14', 1, '2016-08-05 16:37:23', 1),
(105, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470396409973', 'http://localhost/centose/usercall.html?room=cenvid121470396409973&ct=1', '00:00:34', 1, '2016-08-05 16:56:49', 1),
(106, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470396526044', 'http://localhost/centose/usercall.html?room=cenvid211470396526044&ct=1', '', 1, '2016-08-05 16:58:46', 3),
(107, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470396576392', 'http://localhost/centose/usercall.html?room=cenvid121470396576392&ct=1', '00:00:36', 1, '2016-08-05 16:59:36', 1),
(108, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470396979716', 'http://localhost/centose/usercall.html?room=cenvid121470396979716&ct=1', '00:00:58', 1, '2016-08-05 17:06:19', 1),
(109, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470397057047', 'http://localhost/centose/usercall.html?room=cenvid121470397057047&ct=1', '', 1, '2016-08-05 17:07:37', 3),
(110, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470397068665', 'http://localhost/centose/usercall.html?room=cenvid211470397068665&ct=1', '00:00:52', 1, '2016-08-05 17:07:48', 1),
(111, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470397376925', 'http://localhost/centose/usercall.html?room=cenvid121470397376925&ct=1', '00:00:16', 1, '2016-08-05 17:12:56', 1),
(112, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470397431234', 'http://localhost/centose/usercall.html?room=cenvid211470397431234&ct=1', '00:00:10', 1, '2016-08-05 17:13:51', 1),
(113, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470397486978', 'http://localhost/centose/usercall.html?room=cenvid211470397486978&ct=1', '00:00:14', 1, '2016-08-05 17:14:46', 1),
(114, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470397515281', 'http://localhost/centose/usercall.html?room=cenvid211470397515281&ct=1', '00:00:28', 1, '2016-08-05 17:15:15', 1),
(115, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470397580118', 'http://localhost/centose/usercall.html?room=cenvid121470397580118&ct=1', '00:03:31', 1, '2016-08-05 17:16:20', 1),
(116, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470398514520', 'http://localhost/centose/usercall.html?room=cenvid211470398514520&ct=1', '00:00:03', 1, '2016-08-05 17:31:54', 1),
(117, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470398715011', 'http://localhost/centose/usercall.html?room=cenvid211470398715011&ct=1', '00:00:16', 1, '2016-08-05 17:35:15', 1),
(118, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470398807411', 'http://localhost/centose/usercall.html?room=cenvid121470398807411&ct=1', '00:00:09', 1, '2016-08-05 17:36:47', 1),
(119, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470398861684', 'http://localhost/centose/usercall.html?room=cenvid121470398861684&ct=1', '00:00:05', 1, '2016-08-05 17:37:41', 1),
(120, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470398882735', 'http://localhost/centose/usercall.html?room=cenvid211470398882735&ct=1', '00:02:09', 1, '2016-08-05 17:38:02', 1),
(121, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470399158171', 'http://localhost/centose/usercall.html?room=cenvid121470399158171&ct=1', '00:00:39', 1, '2016-08-05 17:42:38', 1),
(122, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121470399382376', 'http://localhost/centose/usercall.html?room=cenvid121470399382376&ct=1', '00:01:39', 1, '2016-08-05 17:46:22', 1),
(123, 2, 1, 'jeet', 'jay', 'Voice Call', 'cenvid211470400388770', 'http://localhost/centose/usercall.html?room=cenvid211470400388770&ct=1', '00:00:27', 1, '2016-08-05 18:03:08', 1),
(124, 1, 2, 'jay', 'jeet', 'Voice Call', 'cenvid121483626131719', 'http://localhost/centose/usercall.html?room=cenvid121483626131719&ct=1', '', 1, '2017-01-05 19:52:11', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `online_status` smallint(5) NOT NULL DEFAULT '0',
  `isLoggedIn` smallint(5) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `mobile`, `online_status`, `isLoggedIn`, `created_date`) VALUES
(1, 'jay', 'cjeet3@gmail.com', '12345', '12456977', 1, 1, '2016-08-05 18:02:57'),
(2, 'jeet', 'jeet@gmail.com', '12345', '123456789', 1, 1, '2016-07-21 15:28:27'),
(3, 'ram', 'ram@gmail.com', '12345', '123456987', 0, 0, '2016-07-17 02:50:16'),
(4, 'golu', 'golu@gmail.com', '1', '12365789', 0, 0, '2016-07-10 19:12:36'),
(5, 'rup', 'rup@gmail.com', '1', '123654789', 0, 0, '2016-07-10 19:13:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
 ADD PRIMARY KEY (`chat_id`);

--
-- Indexes for table `chat_rooms`
--
ALTER TABLE `chat_rooms`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
MODIFY `chat_id` bigint(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=166;
--
-- AUTO_INCREMENT for table `chat_rooms`
--
ALTER TABLE `chat_rooms`
MODIFY `id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=125;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
