-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: customermanagementdb
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'John Doe','john.doe@example.com','123456789','123 Elm Street, Springfield','1985-07-20','Male',1,'2024-12-27 17:22:28','2024-12-27 17:22:28'),(2,'Jane Smith','jane.smith@example.com','987654321','456 Maple Avenue, Springfield','1990-05-15','Female',2,'2024-12-27 17:22:28','2024-12-27 17:22:28'),(3,'Alice Johnson','alice.johnson@example.com','555678123','789 Pine Road, Springfield','1992-09-10','Female',3,'2024-12-27 17:22:28','2024-12-27 17:22:28'),(4,'Robert Brown','robert.brown@example.com','321654987','101 Oak Lane, Springfield','1980-01-25','Male',1,'2024-12-27 17:22:28','2024-12-27 17:22:28'),(5,'Emma Wilson','emma.wilson@example.com','444555666','202 Birch Way, Springfield','1995-03-30','Female',2,'2024-12-27 17:22:28','2024-12-27 17:22:28');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `customer_classification`
--

LOCK TABLES `customer_classification` WRITE;
/*!40000 ALTER TABLE `customer_classification` DISABLE KEYS */;
INSERT INTO `customer_classification` VALUES (1,'VIP'),(2,'Normal'),(3,'Potential');
/*!40000 ALTER TABLE `customer_classification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Human Resources','2024-12-27 17:22:27','2024-12-27 17:22:27'),(2,'IT Department','2024-12-27 17:22:27','2024-12-27 17:22:27'),(3,'Finance Department','2024-12-27 17:22:27','2024-12-27 17:22:27'),(4,'Sales Department','2024-12-27 17:22:27','2024-12-27 17:22:27'),(5,'Marketing Department','2024-12-27 17:22:27','2024-12-27 17:22:27'),(6,'Markettinff','2024-12-27 18:55:01','2024-12-27 18:55:01'),(7,'Nhân sự','2024-12-27 20:54:20','2024-12-27 20:54:20');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `department_permissions`
--

LOCK TABLES `department_permissions` WRITE;
/*!40000 ALTER TABLE `department_permissions` DISABLE KEYS */;
INSERT INTO `department_permissions` VALUES (1,1,2,'2024-12-27 18:56:41'),(2,1,3,'2024-12-27 18:56:41'),(3,1,4,'2024-12-27 18:56:41'),(4,1,1,'2024-12-27 19:49:59'),(5,6,4,'2024-12-27 19:50:40'),(6,6,5,'2024-12-27 19:50:40'),(7,6,6,'2024-12-27 19:50:40'),(8,5,5,'2024-12-27 20:27:03'),(9,5,6,'2024-12-27 20:27:03'),(10,5,7,'2024-12-27 20:27:03'),(11,3,3,'2024-12-27 20:27:45'),(12,3,4,'2024-12-27 20:27:45'),(13,3,5,'2024-12-27 20:27:45'),(14,4,3,'2024-12-27 20:39:45'),(15,4,4,'2024-12-27 20:39:45'),(16,4,5,'2024-12-27 20:39:45');
/*!40000 ALTER TABLE `department_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,1,'2024-12-15','Sự kiện đám cưới tại bãi biển','2024-12-10',0,'PLANNED','2024-12-27 17:22:28','2024-12-27 17:22:28'),(2,2,'2024-12-20','Hội thảo công nghệ hàng năm tại Hà Nội','2024-12-18',0,'PLANNED','2024-12-27 17:22:28','2024-12-27 17:22:28'),(3,3,'2024-12-25','Tiệc sinh nhật bất ngờ cho một người bạn','2024-12-23',0,'PLANNED','2024-12-27 17:22:28','2024-12-27 17:22:28'),(4,4,'2024-12-30','Sự kiện doanh nghiệp cuối năm','2024-12-28',0,'PLANNED','2024-12-27 17:22:28','2024-12-27 17:22:28');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `event_notifications`
--

LOCK TABLES `event_notifications` WRITE;
/*!40000 ALTER TABLE `event_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `event_type`
--

LOCK TABLES `event_type` WRITE;
/*!40000 ALTER TABLE `event_type` DISABLE KEYS */;
INSERT INTO `event_type` VALUES (1,'Đám cưới'),(2,'Hội thảo'),(3,'Tiệc sinh nhật'),(4,'Sự kiện doanh nghiệp');
/*!40000 ALTER TABLE `event_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `event_users`
--

LOCK TABLES `event_users` WRITE;
/*!40000 ALTER TABLE `event_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,4,1,1,650000000000.00,'2025-01-10','Paid','2025-01-10 17:18:51','2025-01-10 17:18:55'),(2,4,1,2,325000000000.00,'2025-01-10','Paid','2025-01-10 17:18:51','2025-01-10 17:26:22'),(3,4,1,3,325000000000.00,'2025-01-10','Paid','2025-01-10 17:18:51','2025-01-10 17:34:17'),(4,2,2,1,3750000000000.00,'2025-01-10','Paid','2025-01-10 17:38:09','2025-01-10 17:38:15'),(5,2,2,2,3750000000000.00,'2025-01-10','Paid','2025-01-10 17:38:09','2025-01-10 17:38:17'),(6,2,2,3,3000000000000.00,'2025-01-10','Paid','2025-01-10 17:38:09','2025-01-10 17:38:21'),(7,2,2,4,4500000000000.00,'2025-01-10','Paid','2025-01-10 17:38:09','2025-01-10 17:38:28'),(8,5,3,1,12500000000000.00,'2025-01-10','Paid','2025-01-10 17:49:17','2025-01-10 17:49:30'),(9,5,3,2,12500000000000.00,'2025-01-10','Paid','2025-01-10 17:49:17','2025-01-10 18:01:03'),(10,4,1,1,2600000.00,'2025-01-10','Pending','2025-01-10 18:00:51','2025-01-10 18:00:51'),(11,4,1,2,44343434.00,'2025-01-10','Pending','2025-01-10 18:00:51','2025-01-10 18:00:51'),(12,4,4,1,540000000003.60,'2025-01-10','Paid','2025-01-10 18:02:04','2025-01-10 18:02:56'),(13,4,4,2,270000000001.80,'2025-01-10','Paid','2025-01-10 18:02:04','2025-01-10 18:03:00'),(14,4,4,3,540000000003.60,'2025-01-10','Paid','2025-01-10 18:02:04','2025-01-10 18:10:43'),(15,4,4,1,675000000004.50,'2025-01-10','Paid','2025-01-10 18:02:51','2025-01-10 18:11:01'),(16,4,4,2,675000000004.50,'2025-01-10','Paid','2025-01-10 18:02:51','2025-01-10 18:11:02'),(17,4,5,1,3750000000000.00,'2025-01-10','Paid','2025-01-10 18:11:46','2025-01-10 18:11:52'),(18,4,5,2,3750000000000.00,'2025-01-10','Paid','2025-01-10 18:11:46','2025-01-10 18:12:19'),(19,4,5,3,7500000000000.00,'2025-01-10','Paid','2025-01-10 18:11:46','2025-01-10 18:12:21'),(20,4,5,1,2812500000000.00,'2025-01-10','Paid','2025-01-10 18:12:11','2025-01-10 18:12:23'),(21,4,5,2,8437500000000.00,'2025-01-10','Paid','2025-01-10 18:12:11','2025-01-10 18:12:44'),(22,5,6,1,5000000000000.00,'2025-01-10','Paid','2025-01-10 18:17:22','2025-01-10 18:17:26'),(23,5,6,2,5000000000000.00,'2025-01-10','Paid','2025-01-10 18:17:22','2025-01-10 18:17:28'),(24,5,6,3,10000000000000.00,'2025-01-10','Paid','2025-01-10 18:17:22','2025-01-10 18:18:13'),(25,5,6,1,1000000000000.00,'2025-01-10','Paid','2025-01-10 18:18:07','2025-01-10 18:18:16'),(26,5,6,2,3000000000000.00,'2025-01-10','Paid','2025-01-10 18:18:07','2025-01-10 18:18:20'),(27,5,6,3,6000000000000.00,'2025-01-10','Pending','2025-01-10 18:18:07','2025-01-10 18:18:07'),(28,4,7,1,12500000000000.00,'2025-01-10','Paid','2025-01-10 18:22:49','2025-01-10 18:22:53'),(29,4,7,2,6250000000000.00,'2025-01-10','Pending','2025-01-10 18:22:49','2025-01-10 18:22:49'),(30,4,7,3,6250000000000.00,'2025-01-10','Pending','2025-01-10 18:22:49','2025-01-10 18:22:49'),(31,5,8,1,5000000000000.00,'2025-01-10','Paid','2025-01-10 18:31:43','2025-01-10 18:31:47'),(32,5,8,2,15000000000000.00,'2025-01-10','Pending','2025-01-10 18:31:44','2025-01-10 18:31:44'),(33,5,8,3,3750000000000.00,'2025-01-10','Pending','2025-01-10 18:44:08','2025-01-10 18:44:08'),(34,5,8,4,11250000000000.00,'2025-01-10','Pending','2025-01-10 18:44:08','2025-01-10 18:44:08'),(35,5,9,3,3750000000000.00,'2025-01-10','Paid','2025-01-10 18:47:48','2025-01-10 18:47:51'),(36,5,9,4,11250000000000.00,'2025-01-10','Pending','2025-01-10 18:47:48','2025-01-10 18:47:48'),(37,5,9,3,2812500000000.00,'2025-01-10','Paid','2025-01-10 18:48:05','2025-01-10 18:48:13'),(38,5,9,4,8437500000000.00,'2025-01-10','Paid','2025-01-10 18:48:05','2025-01-10 18:48:15'),(39,5,10,3,6250000000000.00,'2025-01-10','Paid','2025-01-10 18:51:09','2025-01-10 18:51:14'),(40,5,10,4,18750000000000.00,'2025-01-10','Pending','2025-01-10 18:51:09','2025-01-10 18:51:09'),(41,5,10,3,4687500000000.00,'2025-01-10','Pending','2025-01-10 18:51:30','2025-01-10 18:51:30'),(42,5,10,4,14062500000000.00,'2025-01-10','Pending','2025-01-10 18:51:30','2025-01-10 18:51:30'),(43,5,11,3,5000000000000.00,'2025-01-10','Paid','2025-01-10 18:55:58','2025-01-10 18:56:01'),(44,5,11,4,15000000000000.00,'2025-01-10','Pending','2025-01-10 18:55:58','2025-01-10 18:55:58'),(45,5,11,3,7500000000000.00,'2025-01-10','Pending','2025-01-10 18:56:13','2025-01-10 18:56:13'),(46,5,11,4,7500000000000.00,'2025-01-10','Pending','2025-01-10 18:56:13','2025-01-10 18:56:13'),(47,4,12,3,6250000000000.00,'2025-01-10','Paid','2025-01-10 20:20:19','2025-01-10 20:20:23'),(48,4,12,4,18750000000000.00,'2025-01-10','Pending','2025-01-10 20:20:19','2025-01-10 20:20:19'),(49,4,12,3,9375000000000.00,'2025-01-10','Paid','2025-01-10 20:20:38','2025-01-10 20:20:42'),(50,4,12,4,9375000000000.00,'2025-01-10','Paid','2025-01-10 20:20:38','2025-01-10 20:20:43');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'Quản lý người dùng','bi-person','2024-12-27 17:22:27','2024-12-27 17:22:27'),(2,'Quản lý khách hàng','bi bi-people','2024-12-27 17:22:27','2024-12-27 17:22:27'),(3,'Quản lý dự án','bi-bar-chart','2024-12-27 17:22:27','2024-12-27 17:22:27'),(4,'Quản lý sự kiện','bi-calendar-event','2024-12-27 17:22:27','2024-12-27 17:22:27'),(5,'Thông Báo nhắc nhở','bi-bell','2024-12-27 17:22:27','2024-12-27 17:22:27'),(6,'Quản lý thanh toán','bi-credit-card','2024-12-27 17:22:27','2024-12-27 17:22:27'),(7,'Thống kê và báo cáo','bi-graph-up-arrow','2024-12-27 17:22:27','2024-12-27 17:22:27');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` (`ProjectID`, `CustomerID`, `UserID`, `ProjectName`, `Description`, `StartDate`, `EndDate`, `Status`, `ProjectTypeID`, `TotalAmount`, `PaidAmount`, `CreatedAt`, `UpdatedAt`) VALUES (1,4,10,'Đất Q1','gdfgdf','2025-01-11','2025-01-11','Completed',3,1300000000000.00,1300000000000.00,'2025-01-10 17:18:20','2025-01-10 17:34:17'),(2,2,7,'gamehub','dsadas','2025-01-11','2025-01-11','Completed',5,15000000000000.00,15000000000000.00,'2025-01-10 17:37:27','2025-01-10 17:38:28'),(3,5,11,'musict','dasdas','2025-01-11','2025-01-11','Completed',2,25000000000000.00,25000000000000.00,'2025-01-10 17:49:07','2025-01-10 18:01:03'),(4,4,9,'musictdsadas','dasdasda','2025-01-11','2025-01-11','Completed',3,135000000000.00,2700000000018.00,'2025-01-10 18:01:24','2025-01-10 18:11:02'),(5,4,9,'Đất Quận 7','dsadas','2025-01-11','2025-01-11','Completed',2,15000000000000.00,26250000000000.00,'2025-01-10 18:11:31','2025-01-10 18:12:44'),(6,5,10,'Đất Q9','dasdasd','2025-01-11','2025-01-11','Completed',3,20000000000000.00,24000000000000.00,'2025-01-10 18:17:14','2025-01-10 18:18:20'),(7,4,10,'Đất Q11','dasdas','2025-01-11',NULL,'Ongoing',2,25000000000000.00,12500000000000.00,'2025-01-10 18:21:04','2025-01-10 18:22:53'),(8,5,10,'Đất Q12','dasdasd','2025-01-11',NULL,'Ongoing',3,20000000000000.00,5000000000000.00,'2025-01-10 18:25:51','2025-01-10 18:31:47'),(9,5,10,'Đất Q2','dasdas','2025-01-11','2025-01-11','Completed',2,15000000000000.00,15000000000000.00,'2025-01-10 18:47:36','2025-01-10 18:48:15'),(10,5,9,'Đất Quận 8','asdasdas','2025-01-11',NULL,'Ongoing',2,25000000000000.00,6250000000000.00,'2025-01-10 18:50:57','2025-01-10 18:51:14'),(11,5,11,'Đất Quận 5','dsadas','2025-01-11',NULL,'Ongoing',2,20000000000000.00,5000000000000.00,'2025-01-10 18:55:45','2025-01-10 18:56:01'),(12,4,7,'Đất Quận 6','dasdasdas','2025-01-11','2025-01-11','Completed',4,25000000000000.00,25000000000000.00,'2025-01-10 20:19:53','2025-01-10 20:20:43');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `project_type`
--

LOCK TABLES `project_type` WRITE;
/*!40000 ALTER TABLE `project_type` DISABLE KEYS */;
INSERT INTO `project_type` VALUES (1,'Resort'),(2,'High-Rise'),(3,'Luxury Housing'),(4,'Residential Area'),(5,'Factory');
/*!40000 ALTER TABLE `project_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin123','Admin User','admin@example.com','Admin','avatar_admin.png',NULL,'2024-12-27 17:22:28','2024-12-27 17:22:28'),(2,'john_doe','john123','John Doe','john.doe@example.com','Staff','avatar_john.png',NULL,'2024-12-27 17:22:28','2024-12-27 17:22:28'),(3,'jane_smith','jane123','Jane Smith','jane.smith@example.com','Manager','avatar_jane.png',NULL,'2024-12-27 17:22:28','2024-12-27 17:22:28'),(4,'alice_johnson','alice123','Alice Johnson','alice.johnson@example.com','Staff','avatar_alice.png',2,'2024-12-27 17:22:28','2025-01-10 17:17:06'),(5,'robert_brown','robert123','Robert Brown','robert.brown@example.com','Manager','avatar_robert.png',7,'2024-12-27 17:22:28','2024-12-27 20:54:30'),(6,'minhtri789','b346e9b6d95cd800ddad8ca09e7b87ddfd55e2227b8628f701d8aef377f2bd22','Jodsewqahn Ddsadoe','johndodsewqadsae@example.com','Admin',NULL,1,'2024-12-27 18:11:01','2024-12-27 18:11:01'),(7,'minhtri12389','b346e9b6d95cd800ddad8ca09e7b87ddfd55e2227b8628f701d8aef377f2bd22','Jodseeqwwqahn Ddsadoe','johndodsewqewqadsae@example.com','Admin',NULL,NULL,'2024-12-27 18:12:32','2024-12-27 18:12:32'),(8,'minhtrimyan789','b346e9b6d95cd800ddad8ca09e7b87ddfd55e2227b8628f701d8aef377f2bd22','Trương Minh Trí','minhtri7895123@gmail.com','Admin',NULL,6,'2024-12-27 20:15:04','2024-12-27 20:26:14'),(9,'minhtri02','b346e9b6d95cd800ddad8ca09e7b87ddfd55e2227b8628f701d8aef377f2bd22','Trương Mintfegh Trí','minhtri789@gmail.com','Admin',NULL,3,'2024-12-27 20:28:29','2024-12-27 20:53:38'),(10,'minhtri0202','b346e9b6d95cd800ddad8ca09e7b87ddfd55e2227b8628f701d8aef377f2bd22','Trương Mdsadinh Trí','minhtri7895gfdgdf123@gmail.com','Manager',NULL,2,'2024-12-27 20:57:13','2024-12-27 21:00:21'),(11,'minhtri123','b346e9b6d95cd800ddad8ca09e7b87ddfd55e2227b8628f701d8aef377f2bd22','Trương Midasnh Tríd','minhtri789hgfbcvbc5123@gmail.com','Manager',NULL,3,'2024-12-27 20:59:17','2024-12-27 21:00:27');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_department`
--

LOCK TABLES `user_department` WRITE;
/*!40000 ALTER TABLE `user_department` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_permissions`
--

LOCK TABLES `user_permissions` WRITE;
/*!40000 ALTER TABLE `user_permissions` DISABLE KEYS */;
INSERT INTO `user_permissions` VALUES (4,9,3,'2024-12-27 20:51:25'),(5,9,4,'2024-12-27 20:51:25'),(6,9,5,'2024-12-27 20:51:25'),(7,11,3,'2024-12-27 21:00:27'),(8,11,4,'2024-12-27 21:00:27'),(9,11,5,'2024-12-27 21:00:27');
/*!40000 ALTER TABLE `user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-11  3:32:03
