-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2020 at 05:04 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `BookCollection`
--
CREATE DATABASE IF NOT EXISTS `BookCollection` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `BookCollection`;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `itemName` varchar(40) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `supplierCode` varchar(40) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `onHand` int(11) NOT NULL,
  `reorderPoint` int(11) NOT NULL,
  `backOrder` enum('y','n') NOT NULL,
  `deleted` enum('y','n') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `itemName`, `description`, `supplierCode`, `cost`, `price`, `onHand`, `reorderPoint`, `backOrder`, `deleted`) VALUES
(0000000001, 'Secret', 'happen as long as you desire hard', 'SCR2016', '20.50', '20.50', 9, 5, 'y', 'n'),
(0000000002, 'Kim''s Package', 'lala', 'SCC2016', '10.12', '11.12', 11, 2, 'y', 'n'),
(0000000003, 'hello', 'world', 'ABC1234', '1.10', '2.50', 8, 100, 'n', 'n'),
(0000000005, 'need a job', 'contact me anytime', 'ADF5013', '100.10', '100.10', 37, 1, 'y', 'n');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(100) NOT NULL,
  `password` blob NOT NULL,
  `role` enum('user','admin') NOT NULL,
  `passwordHint` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `role`, `passwordHint`) VALUES
('dragonsoup2', 0x31315a6248705a694359754463, 'user', 'last name, first letter of first name, and number'),
('jviki116', 0x24327924313024336c714750576b725a2e6c6533682f4763634f77472e34645862366967334d3473536c507269644a717a6a366c547664584e48356d, 'user', 'ask my wife'),
('ykkim6', 0x2432792431302431496d4739492f6c74784a4e56374f75544c736c69654b316e7176346f73356a49775546624570646161347a6d634d7a696c77786d, 'user', 'first name with first character capital and numbers');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
