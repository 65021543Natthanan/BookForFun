-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.0.17-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for bookforfun
CREATE DATABASE IF NOT EXISTS `bookforfun` /*!40100 DEFAULT CHARACTER SET tis620 */;
USE `bookforfun`;

-- Dumping structure for table bookforfun.adminpostom
CREATE TABLE IF NOT EXISTS `adminpostom` (
  `AP_ID` int(11) NOT NULL AUTO_INCREMENT,
  `P_ID` int(11) DEFAULT NULL,
  `AP_message` varchar(999) DEFAULT NULL,
  `AP_timeStamp` time DEFAULT NULL,
  `AP_status` int(11) DEFAULT NULL,
  PRIMARY KEY (`AP_ID`),
  KEY `P_ID` (`P_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=tis620;

-- Dumping data for table bookforfun.adminpostom: 0 rows
/*!40000 ALTER TABLE `adminpostom` DISABLE KEYS */;
/*!40000 ALTER TABLE `adminpostom` ENABLE KEYS */;

-- Dumping structure for table bookforfun.eventp
CREATE TABLE IF NOT EXISTS `eventp` (
  `E_ID` int(11) NOT NULL AUTO_INCREMENT,
  `S_ID` int(11) DEFAULT NULL,
  `E_name` varchar(20) DEFAULT NULL,
  `E_info` varchar(500) DEFAULT NULL,
  `E_date` date DEFAULT NULL,
  `E_status` int(11) DEFAULT NULL,
  PRIMARY KEY (`E_ID`),
  KEY `S_ID` (`S_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=tis620;

-- Dumping data for table bookforfun.eventp: 0 rows
/*!40000 ALTER TABLE `eventp` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventp` ENABLE KEYS */;

-- Dumping structure for table bookforfun.games
CREATE TABLE IF NOT EXISTS `games` (
  `G_ID` int(11) NOT NULL AUTO_INCREMENT,
  `G_image` mediumblob NOT NULL,
  `G_nameTH` varchar(50) DEFAULT NULL,
  `G_nameEN` varchar(50) DEFAULT NULL,
  `G_member` int(11) DEFAULT NULL,
  `G_type` varchar(20) DEFAULT NULL,
  `G_lv` varchar(10) DEFAULT NULL,
  `G_timeavg` int(11) DEFAULT NULL,
  PRIMARY KEY (`G_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=tis620;

-- Dumping data for table bookforfun.games: 4 rows
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` (`G_ID`, `G_image`, `G_nameTH`, `G_nameEN`, `G_member`, `G_type`, `G_lv`, `G_timeavg`) VALUES
	(1, _binary '', 'กุ้ง', 'okat', 6, 'tada', 'hard', 25),
	(2, _binary '', 'กา', 'raven', 2, 'ดูโอ้', 'โคต', 100),
	(3, _binary '', NULL, NULL, NULL, NULL, NULL, NULL),
	(4, _binary '', NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;

-- Dumping structure for table bookforfun.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `P_ID` int(11) NOT NULL AUTO_INCREMENT,
  `U_ID` int(11) DEFAULT NULL,
  `P_position` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`P_ID`),
  KEY `U_ID` (`U_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=tis620;

-- Dumping data for table bookforfun.permissions: 0 rows
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;

-- Dumping structure for table bookforfun.queues
CREATE TABLE IF NOT EXISTS `queues` (
  `Q_ID` int(11) NOT NULL AUTO_INCREMENT,
  `S_ID` int(11) DEFAULT NULL,
  `U_ID` int(11) DEFAULT NULL,
  `Q_number` int(11) DEFAULT NULL,
  `Q_timeStamp` time DEFAULT NULL,
  `Q_member` int(11) DEFAULT NULL,
  `Q_status` int(11) DEFAULT NULL,
  PRIMARY KEY (`Q_ID`),
  KEY `S_ID` (`S_ID`),
  KEY `U_ID` (`U_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=tis620;

-- Dumping data for table bookforfun.queues: 0 rows
/*!40000 ALTER TABLE `queues` DISABLE KEYS */;
/*!40000 ALTER TABLE `queues` ENABLE KEYS */;

-- Dumping structure for table bookforfun.shops
CREATE TABLE IF NOT EXISTS `shops` (
  `S_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Q_ID` int(11) DEFAULT NULL,
  `E_ID` int(11) DEFAULT NULL,
  `G_ID` int(11) DEFAULT NULL,
  `S_name` varchar(50) DEFAULT NULL,
  `S_ownerName` varchar(50) DEFAULT NULL,
  `S_address` varchar(100) DEFAULT NULL,
  `S_info` varchar(500) DEFAULT NULL,
  `S_phone` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`S_ID`),
  KEY `Q_ID` (`Q_ID`),
  KEY `E_ID` (`E_ID`),
  KEY `G_ID` (`G_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=tis620;

-- Dumping data for table bookforfun.shops: 0 rows
/*!40000 ALTER TABLE `shops` DISABLE KEYS */;
/*!40000 ALTER TABLE `shops` ENABLE KEYS */;

-- Dumping structure for table bookforfun.users
CREATE TABLE IF NOT EXISTS `users` (
  `U_ID` int(11) NOT NULL AUTO_INCREMENT,
  `U_name` varchar(50) DEFAULT NULL,
  `U_surnae` varchar(50) DEFAULT NULL,
  `U_gender` varchar(10) DEFAULT NULL,
  `U_smoke` varchar(10) DEFAULT NULL,
  `U_phone` varchar(10) DEFAULT NULL,
  `U_email` varchar(50) DEFAULT NULL,
  `U_username` varchar(50) DEFAULT NULL,
  `U_password` varchar(50) DEFAULT NULL,
  `U_verificationCode` varchar(20) DEFAULT NULL,
  `U_verificationTimestamp` time DEFAULT NULL,
  `U_verified` int(11) DEFAULT '0',
  PRIMARY KEY (`U_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=tis620;

-- Dumping data for table bookforfun.users: 1 rows
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`U_ID`, `U_name`, `U_surnae`, `U_gender`, `U_smoke`, `U_phone`, `U_email`, `U_username`, `U_password`, `U_verificationCode`, `U_verificationTimestamp`, `U_verified`) VALUES
	(1, 'a', 'a', 'female', 'noSmoke', '1234123412', 'a@gmail.com', 'a', '$2b$10$ZawpzqLJcxIDkkbzj.FzLuEFZBy0GnxujsXWH.zaqSy', '1899d2a8d14454a196b7', '20:34:22', 1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
