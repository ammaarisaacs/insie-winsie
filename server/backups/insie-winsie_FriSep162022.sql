-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: insie-winsie
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `street` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zipcode` char(255) NOT NULL,
  `province` char(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'14 fifth avenue','rondebosch east','cape town','7780','WC','2022-08-31 17:19:56','2022-08-31 17:19:56'),(2,'424 andrew zondo road','amanzimtoti','durban','4124','NC','2022-08-31 17:19:56','2022-08-31 17:19:56'),(3,'14 fifth avenue','rondebosch','Cape Town','7780','WP','2022-09-11 07:16:17','2022-09-11 07:16:17');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_detail`
--

DROP TABLE IF EXISTS `category_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_detail`
--

LOCK TABLES `category_detail` WRITE;
/*!40000 ALTER TABLE `category_detail` DISABLE KEYS */;
INSERT INTO `category_detail` VALUES (1,'beanies','2022-08-31 17:19:56','2022-08-31 17:19:56'),(2,'bibs','2022-08-31 17:19:56','2022-08-31 17:19:56'),(3,'bows','2022-08-31 17:19:56','2022-08-31 17:19:56'),(4,'dresses','2022-08-31 17:19:56','2022-08-31 17:19:56'),(5,'rompers','2022-08-31 17:19:56','2022-08-31 17:19:56'),(6,'bow tie','2022-08-31 17:19:56','2022-08-31 17:19:56'),(7,'poor boy hats','2022-08-31 17:19:56','2022-08-31 17:19:56'),(8,'berets','2022-08-31 17:19:56','2022-08-31 17:19:56'),(9,'aprons','2022-08-31 17:19:56','2022-08-31 17:19:56'),(10,'mittens','2022-08-31 17:19:56','2022-08-31 17:19:56');
/*!40000 ALTER TABLE `category_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_item`
--

DROP TABLE IF EXISTS `category_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_item` (
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`product_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `category_item_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `category_item_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category_detail` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_item`
--

LOCK TABLES `category_item` WRITE;
/*!40000 ALTER TABLE `category_item` DISABLE KEYS */;
INSERT INTO `category_item` VALUES ('18951ba7-467b-4f6d-875a-9bf34a1a9069',1),('508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),('f344becb-174a-4ed9-b336-ce228ae2f12f',1),('324a2310-8bb6-4769-aea2-c63f3478fd01',3),('a4592227-11d4-4161-8f52-a341f43b08c1',3),('20ae24ba-ae44-4556-9f3e-680d157191d7',4),('23736b20-68dc-4de3-91b0-17b0e71c488b',4),('75f0b19c-af07-4f9d-b9fb-a60faba62bcc',5),('7fa1bd2c-2104-4d78-9290-ffa57487af1f',6),('aed09340-af5a-4eac-b16c-893dc7e0a7dd',6),('b324a88f-319c-44eb-969f-eee84726458e',6),('bf18507b-7fd1-460c-8a13-deb7a64dbb01',6),('ffe73cf9-60eb-4058-9e0e-ef9b5549d2ef',6),('158f8c38-ed52-4ed1-84a9-f04b088b5cca',7),('471327bc-7780-4492-b847-bfd978b26b61',7),('7a57dafa-928e-4513-9c96-ae538a7b1ad3',7),('a7ab8f7d-bf18-4730-a8c7-c9fb3f806932',7),('3c8d6312-1d72-4749-b17d-25db270d0d36',8),('182a27f6-cd1b-4075-835b-90cb669b84f7',10),('6207b066-34ae-4167-bea2-8acc62e031a9',10),('9b97ff03-2f6d-4806-ad3b-2f712552ab9b',10),('a8c18f6d-2083-4f85-8926-298fd0b38007',10),('b459643a-6ac0-418f-8664-e97abbd2f0d9',10),('e593dd9f-621e-47e3-b208-b9425c690b38',10),('f6102d13-4cef-45c9-9510-913d94afc5d6',10);
/*!40000 ALTER TABLE `category_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `cellphone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','Hello this is the message','2022-09-09 14:21:08','2022-09-09 14:21:08'),(2,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','Hello this is a message','2022-09-10 06:48:32','2022-09-10 06:48:32'),(3,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','hello this is message','2022-09-10 10:16:59','2022-09-10 10:16:59'),(4,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','Hello this is another message','2022-09-10 12:37:31','2022-09-10 12:37:31'),(5,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','jkljkjhkjhkjhjhkjnkjkjhjkhhjhj','2022-09-11 16:37:16','2022-09-11 16:37:16'),(6,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','jkljkjkjhkjhjhkjnkjkjhjkhhjhj','2022-09-11 16:38:36','2022-09-11 16:38:36'),(7,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','jkljkkjhkjhjhkjnkjkjhjkhhjhj','2022-09-11 16:39:25','2022-09-11 16:39:25'),(8,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','iojkhjhh','2022-09-13 18:54:52','2022-09-13 18:54:52'),(9,'Ammaar Isaacs','Isaacs','0670213131','isaacsammaar@gmail.com','ammaar was herer','2022-09-15 06:50:12','2022-09-15 06:50:12'),(10,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','Ammaar was here','2022-09-15 12:55:13','2022-09-15 12:55:13');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) NOT NULL,
  `alt_text` varchar(255) NOT NULL,
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `media_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,'IMG_3943.jpg','product 0','158f8c38-ed52-4ed1-84a9-f04b088b5cca','2022-08-31 17:19:56','2022-08-31 17:19:56'),(2,'IMG_3939.jpg','product 1','182a27f6-cd1b-4075-835b-90cb669b84f7','2022-08-31 17:19:56','2022-08-31 17:19:56'),(3,'IMG_1280.jpg','product 2','18951ba7-467b-4f6d-875a-9bf34a1a9069','2022-08-31 17:19:56','2022-08-31 17:19:56'),(4,'IMG_4720 copy.jpg','product 3','20ae24ba-ae44-4556-9f3e-680d157191d7','2022-08-31 17:19:56','2022-08-31 17:19:56'),(5,'IMG_3943.jpg','product 4','23736b20-68dc-4de3-91b0-17b0e71c488b','2022-08-31 17:19:56','2022-08-31 17:19:56'),(6,'IMG_3934.jpg','product 5','324a2310-8bb6-4769-aea2-c63f3478fd01','2022-08-31 17:19:56','2022-08-31 17:19:56'),(7,'pexels-cottonbro-4714950.jpg','product 6','3c8d6312-1d72-4749-b17d-25db270d0d36','2022-08-31 17:19:56','2022-08-31 17:19:56'),(8,'IMG_1280.jpg','product 7','471327bc-7780-4492-b847-bfd978b26b61','2022-08-31 17:19:56','2022-08-31 17:19:56'),(9,'IMG_3934.jpg','product 8','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8','2022-08-31 17:19:56','2022-08-31 17:19:56'),(10,'IMG_1280.jpg','product 9','6207b066-34ae-4167-bea2-8acc62e031a9','2022-08-31 17:19:56','2022-08-31 17:19:56'),(11,'IMG_3934.jpg','product 10','75f0b19c-af07-4f9d-b9fb-a60faba62bcc','2022-08-31 17:19:56','2022-08-31 17:19:56'),(12,'IMG_3934.jpg','product 11','7a57dafa-928e-4513-9c96-ae538a7b1ad3','2022-08-31 17:19:56','2022-08-31 17:19:56'),(13,'IMG_3942.jpg','product 12','7fa1bd2c-2104-4d78-9290-ffa57487af1f','2022-08-31 17:19:56','2022-08-31 17:19:56'),(14,'IMG_3934.jpg','product 13','9b97ff03-2f6d-4806-ad3b-2f712552ab9b','2022-08-31 17:19:56','2022-08-31 17:19:56'),(15,'IMG_3934.jpg','product 14','a4592227-11d4-4161-8f52-a341f43b08c1','2022-08-31 17:19:56','2022-08-31 17:19:56'),(16,'IMG_3939.jpg','product 15','a7ab8f7d-bf18-4730-a8c7-c9fb3f806932','2022-08-31 17:19:56','2022-08-31 17:19:56'),(17,'pexels-cottonbro-4714950.jpg','product 16','a8c18f6d-2083-4f85-8926-298fd0b38007','2022-08-31 17:19:56','2022-08-31 17:19:56'),(18,'IMG_3934.jpg','product 17','aed09340-af5a-4eac-b16c-893dc7e0a7dd','2022-08-31 17:19:56','2022-08-31 17:19:56'),(19,'IMG_3939.jpg','product 18','b324a88f-319c-44eb-969f-eee84726458e','2022-08-31 17:19:56','2022-08-31 17:19:56'),(20,'IMG_3939.jpg','product 19','b459643a-6ac0-418f-8664-e97abbd2f0d9','2022-08-31 17:19:56','2022-08-31 17:19:56'),(21,'IMG_3942.jpg','product 20','bf18507b-7fd1-460c-8a13-deb7a64dbb01','2022-08-31 17:19:56','2022-08-31 17:19:56'),(22,'IMG_1280.jpg','product 21','e593dd9f-621e-47e3-b208-b9425c690b38','2022-08-31 17:19:56','2022-08-31 17:19:56'),(23,'IMG_3943.jpg','product 22','f344becb-174a-4ed9-b336-ce228ae2f12f','2022-08-31 17:19:56','2022-08-31 17:19:56'),(24,'IMG_3942.jpg','product 23','f6102d13-4cef-45c9-9510-913d94afc5d6','2022-08-31 17:19:56','2022-08-31 17:19:56'),(25,'IMG_3943.jpg','product 24','ffe73cf9-60eb-4058-9e0e-ef9b5549d2ef','2022-08-31 17:19:56','2022-08-31 17:19:56');
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `order_number` int NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cellphone` varchar(255) NOT NULL,
  `ship_address_id` int NOT NULL,
  `bill_address_id` int NOT NULL,
  `ship_method_id` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `ship_address_id` (`ship_address_id`),
  KEY `bill_address_id` (`bill_address_id`),
  KEY `ship_method_id` (`ship_method_id`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`ship_address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`bill_address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `order_detail_ibfk_3` FOREIGN KEY (`ship_method_id`) REFERENCES `ship_method` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES ('002ce4dc-207e-4b71-b4be-b18559b400b6',9,'ammaar','isaacs',61.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 10:35:20','2022-09-16 10:35:20'),('0f868226-62f2-43dd-99df-99e3656449d9',5,'ammaar isaacs','isaacs',60.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-11 15:38:39','2022-09-11 15:38:39'),('1f202362-817d-42a2-a31e-9df4a79363bd',7,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-15 12:59:23','2022-09-15 12:59:23'),('23ab5533-49c7-4912-aaf4-cf26839e0c2d',16,'ammaar','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 11:07:47','2022-09-16 11:07:47'),('245010fe-d78e-498b-bc59-d272d28a4d34',11,'ammaar','isaacs',61.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 10:37:41','2022-09-16 10:37:41'),('4d5f9da6-1054-4f56-bb98-3bd36877d923',8,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-15 13:02:53','2022-09-15 13:02:53'),('4f3325d7-d3bb-41f3-96dc-d96f0abf59f1',19,'ammaar','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 11:46:04','2022-09-16 11:46:04'),('5b4442f1-a74f-4c35-b8fa-f967d280fd99',1,'ammaar','isaacs',200.00,'isaacsammaar@gmail.com','0670213131',1,2,1,'pending','2022-08-31 17:19:56','2022-08-31 17:19:56'),('5d43f801-0b27-4bed-8c19-5da52772b5a4',3,'ammaar isaacs','isaacs',54.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-11 07:16:17','2022-09-11 07:16:17'),('60eea2b7-bd55-4ba3-baa8-9c84f98bb4d6',20,'ammaar','isaacs',55.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 11:48:31','2022-09-16 11:48:31'),('69177f95-3b73-4758-a7f2-c889b123cf23',15,'ammaar','isaacs',60.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 11:02:24','2022-09-16 11:02:24'),('75bc4b03-45b4-4a8b-9a12-32eeace2c7bc',17,'ammaar','isaacs',60.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 11:10:39','2022-09-16 11:10:39'),('804b4e27-53b1-44e0-9aaa-d0184b65af35',18,'ammaar','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 11:19:30','2022-09-16 11:19:30'),('a3e843a6-d9b9-47da-998f-86bd474ffd44',21,'ammaar','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 18:38:33','2022-09-16 18:38:33'),('aaf181b3-94e9-4d33-93a5-80329a7ab276',10,'ammaar','isaacs',61.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 10:36:28','2022-09-16 10:36:28'),('b53263ab-e704-4fe4-b31f-63e71dd95341',6,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-15 12:56:52','2022-09-15 12:56:52'),('b558a0c9-cb98-465e-b880-e9a85069da02',4,'ammaar isaacs','isaacs',55.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-11 15:23:39','2022-09-11 15:23:39'),('c73d5d0c-9b1d-41ae-81b2-c7e1d78f1c16',12,'ammaar','isaacs',61.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 10:39:06','2022-09-16 10:39:06'),('ca784923-546f-4b65-b2b0-7815fc987457',2,'ereshia','benjamin',400.00,'ereshiabenjamin@gmail.com','0824583202',2,2,1,'pending','2022-08-31 17:19:56','2022-08-31 17:19:56'),('cfa704fd-5f2d-4fd5-b7e2-93e3c0f04d8a',13,'ammaar','isaacs',60.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 10:48:32','2022-09-16 10:48:32'),('fefb1418-86c1-433e-bead-107264a83e6d',14,'ammaar','isaacs',60.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 10:59:17','2022-09-16 10:59:17');
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `order_qty` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_detail` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,'5b4442f1-a74f-4c35-b8fa-f967d280fd99','b459643a-6ac0-418f-8664-e97abbd2f0d9',2),(2,'ca784923-546f-4b65-b2b0-7815fc987457','b324a88f-319c-44eb-969f-eee84726458e',2),(3,'5d43f801-0b27-4bed-8c19-5da52772b5a4','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(4,'b558a0c9-cb98-465e-b880-e9a85069da02','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(5,'b558a0c9-cb98-465e-b880-e9a85069da02','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(6,'0f868226-62f2-43dd-99df-99e3656449d9','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(7,'0f868226-62f2-43dd-99df-99e3656449d9','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(8,'0f868226-62f2-43dd-99df-99e3656449d9','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(9,'0f868226-62f2-43dd-99df-99e3656449d9','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(10,'b53263ab-e704-4fe4-b31f-63e71dd95341','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(11,'b53263ab-e704-4fe4-b31f-63e71dd95341','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(12,'b53263ab-e704-4fe4-b31f-63e71dd95341','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(13,'1f202362-817d-42a2-a31e-9df4a79363bd','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(14,'1f202362-817d-42a2-a31e-9df4a79363bd','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(15,'1f202362-817d-42a2-a31e-9df4a79363bd','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(16,'4d5f9da6-1054-4f56-bb98-3bd36877d923','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(17,'4d5f9da6-1054-4f56-bb98-3bd36877d923','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(18,'4d5f9da6-1054-4f56-bb98-3bd36877d923','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(19,'002ce4dc-207e-4b71-b4be-b18559b400b6','f344becb-174a-4ed9-b336-ce228ae2f12f',2),(20,'002ce4dc-207e-4b71-b4be-b18559b400b6','324a2310-8bb6-4769-aea2-c63f3478fd01',2),(21,'002ce4dc-207e-4b71-b4be-b18559b400b6','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(22,'aaf181b3-94e9-4d33-93a5-80329a7ab276','f344becb-174a-4ed9-b336-ce228ae2f12f',2),(23,'aaf181b3-94e9-4d33-93a5-80329a7ab276','324a2310-8bb6-4769-aea2-c63f3478fd01',2),(24,'aaf181b3-94e9-4d33-93a5-80329a7ab276','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(25,'245010fe-d78e-498b-bc59-d272d28a4d34','f344becb-174a-4ed9-b336-ce228ae2f12f',2),(26,'245010fe-d78e-498b-bc59-d272d28a4d34','324a2310-8bb6-4769-aea2-c63f3478fd01',2),(27,'245010fe-d78e-498b-bc59-d272d28a4d34','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(28,'c73d5d0c-9b1d-41ae-81b2-c7e1d78f1c16','f344becb-174a-4ed9-b336-ce228ae2f12f',2),(29,'c73d5d0c-9b1d-41ae-81b2-c7e1d78f1c16','324a2310-8bb6-4769-aea2-c63f3478fd01',2),(30,'c73d5d0c-9b1d-41ae-81b2-c7e1d78f1c16','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(31,'cfa704fd-5f2d-4fd5-b7e2-93e3c0f04d8a','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(32,'cfa704fd-5f2d-4fd5-b7e2-93e3c0f04d8a','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(33,'cfa704fd-5f2d-4fd5-b7e2-93e3c0f04d8a','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(34,'cfa704fd-5f2d-4fd5-b7e2-93e3c0f04d8a','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(35,'fefb1418-86c1-433e-bead-107264a83e6d','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(36,'fefb1418-86c1-433e-bead-107264a83e6d','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(37,'fefb1418-86c1-433e-bead-107264a83e6d','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(38,'fefb1418-86c1-433e-bead-107264a83e6d','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(39,'69177f95-3b73-4758-a7f2-c889b123cf23','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(40,'69177f95-3b73-4758-a7f2-c889b123cf23','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(41,'69177f95-3b73-4758-a7f2-c889b123cf23','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(42,'69177f95-3b73-4758-a7f2-c889b123cf23','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(43,'23ab5533-49c7-4912-aaf4-cf26839e0c2d','18951ba7-467b-4f6d-875a-9bf34a1a9069',2),(44,'23ab5533-49c7-4912-aaf4-cf26839e0c2d','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(45,'75bc4b03-45b4-4a8b-9a12-32eeace2c7bc','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(46,'75bc4b03-45b4-4a8b-9a12-32eeace2c7bc','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(47,'75bc4b03-45b4-4a8b-9a12-32eeace2c7bc','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(48,'75bc4b03-45b4-4a8b-9a12-32eeace2c7bc','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(49,'804b4e27-53b1-44e0-9aaa-d0184b65af35','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(50,'804b4e27-53b1-44e0-9aaa-d0184b65af35','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(51,'804b4e27-53b1-44e0-9aaa-d0184b65af35','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(52,'4f3325d7-d3bb-41f3-96dc-d96f0abf59f1','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(53,'4f3325d7-d3bb-41f3-96dc-d96f0abf59f1','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(54,'4f3325d7-d3bb-41f3-96dc-d96f0abf59f1','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(55,'60eea2b7-bd55-4ba3-baa8-9c84f98bb4d6','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(56,'60eea2b7-bd55-4ba3-baa8-9c84f98bb4d6','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(57,'a3e843a6-d9b9-47da-998f-86bd474ffd44','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(58,'a3e843a6-d9b9-47da-998f-86bd474ffd44','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(59,'a3e843a6-d9b9-47da-998f-86bd474ffd44','f344becb-174a-4ed9-b336-ce228ae2f12f',1);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_detail`
--

DROP TABLE IF EXISTS `payment_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `order_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payment_detail_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_detail`
--

LOCK TABLES `payment_detail` WRITE;
/*!40000 ALTER TABLE `payment_detail` DISABLE KEYS */;
INSERT INTO `payment_detail` VALUES (1,'pf payment id 0',200,'5b4442f1-a74f-4c35-b8fa-f967d280fd99','2022-08-31 17:19:56','2022-08-31 17:19:56'),(2,'pf payment id 1',200,'ca784923-546f-4b65-b2b0-7815fc987457','2022-08-31 17:19:56','2022-08-31 17:19:56');
/*!40000 ALTER TABLE `payment_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_qty` int NOT NULL,
  `in_carousel` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('158f8c38-ed52-4ed1-84a9-f04b088b5cca','Blazer','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',6.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('182a27f6-cd1b-4075-835b-90cb669b84f7','Hat','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',8.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('18951ba7-467b-4f6d-875a-9bf34a1a9069','Blazer','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',4.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('20ae24ba-ae44-4556-9f3e-680d157191d7','Jacket','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',10.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('23736b20-68dc-4de3-91b0-17b0e71c488b','Shirt','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',5.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('324a2310-8bb6-4769-aea2-c63f3478fd01','Hat','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',1.00,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('3c8d6312-1d72-4749-b17d-25db270d0d36','Socks','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',1.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('471327bc-7780-4492-b847-bfd978b26b61','Blazer','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',10.99,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('508ed6f6-c0a5-44e2-88f5-f4b8866e1df8','Tie','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',1.00,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('6207b066-34ae-4167-bea2-8acc62e031a9','Shirt','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',4.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('75f0b19c-af07-4f9d-b9fb-a60faba62bcc','Jacket','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',8.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('7a57dafa-928e-4513-9c96-ae538a7b1ad3','Tie','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',2.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('7fa1bd2c-2104-4d78-9290-ffa57487af1f','Socks','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',3.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('9b97ff03-2f6d-4806-ad3b-2f712552ab9b','Tie','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',10.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('a4592227-11d4-4161-8f52-a341f43b08c1','Shoes','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',8.99,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('a7ab8f7d-bf18-4730-a8c7-c9fb3f806932','Jacket','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',8.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('a8c18f6d-2083-4f85-8926-298fd0b38007','Socks','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',3.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('aed09340-af5a-4eac-b16c-893dc7e0a7dd','Tie','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',2.00,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('b324a88f-319c-44eb-969f-eee84726458e','Jacket','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',1.00,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('b459643a-6ac0-418f-8664-e97abbd2f0d9','Shoes','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',8.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('bf18507b-7fd1-460c-8a13-deb7a64dbb01','Blazer','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',4.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('e593dd9f-621e-47e3-b208-b9425c690b38','Smart Pants','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',6.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('f344becb-174a-4ed9-b336-ce228ae2f12f','Blazer','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',4.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('f6102d13-4cef-45c9-9510-913d94afc5d6','Hat','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',1.00,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('ffe73cf9-60eb-4058-9e0e-ef9b5549d2ef','Bowtie','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',10.99,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refund`
--

DROP TABLE IF EXISTS `refund`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refund` (
  `order_item_id` int NOT NULL,
  `exchange_id` int NOT NULL,
  `quantity` int NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  KEY `order_item_id` (`order_item_id`),
  CONSTRAINT `refund_ibfk_1` FOREIGN KEY (`order_item_id`) REFERENCES `order_item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refund`
--

LOCK TABLES `refund` WRITE;
/*!40000 ALTER TABLE `refund` DISABLE KEYS */;
INSERT INTO `refund` VALUES (1,2,1,'just no okay','2022-08-31 17:19:56','2022-08-31 17:19:56'),(1,1,1,'again no okay','2022-08-31 17:19:56','2022-08-31 17:19:56');
/*!40000 ALTER TABLE `refund` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20220624083923-create-product.js'),('20220624083924-create-media.js'),('20220624083925-create-category-detail.js'),('20220624083926-create-category-item.js'),('20220624083929-create-ship-method.js'),('20220624083930-create-address.js'),('20220624083932-create-order-detail.js'),('20220624083933-create-order-item.js'),('20220624083934-create-payment-detail.js'),('20220624083935-create-refund.js'),('20220624083936-create-contact.js'),('20220627154227-insert-product.js'),('20220627164147-insert-media.js'),('20220628123928-insert-category.js'),('20220628123929-insert-category-item.js'),('20220703124444-insert-ship-method.js'),('20220703124508-insert-address.js'),('20220703124725-insert-order-detail.js'),('20220703124731-insert-order-item.js'),('20220703124732-insert-payment-detail.js'),('20220710093728-insert-refund.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ship_method`
--

DROP TABLE IF EXISTS `ship_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ship_method` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `charge` decimal(10,2) NOT NULL,
  `city` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ship_method`
--

LOCK TABLES `ship_method` WRITE;
/*!40000 ALTER TABLE `ship_method` DISABLE KEYS */;
INSERT INTO `ship_method` VALUES (1,'Method 1',50.99,'cape town','rondebosch','2022-08-31 17:19:56','2022-08-31 17:19:56'),(2,'Method 2',200.00,'jhb','sandton','2022-08-31 17:19:56','2022-08-31 17:19:56'),(3,'Method 3',120.00,'durban','amanzimtoti','2022-08-31 17:19:56','2022-08-31 17:19:56');
/*!40000 ALTER TABLE `ship_method` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-16 23:22:04
