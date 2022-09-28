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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'14 fifth avenue','rondebosch east','cape town','7780','WC','2022-08-31 17:19:56','2022-08-31 17:19:56'),(2,'424 andrew zondo road','amanzimtoti','durban','4124','NC','2022-08-31 17:19:56','2022-08-31 17:19:56'),(3,'14 fifth avenue','rondebosch','Cape Town','7780','WP','2022-09-11 07:16:17','2022-09-11 07:16:17'),(4,'14 fifth avenue','rondebosch','Cape Town','7780','GT','2022-09-26 12:47:51','2022-09-26 12:47:51');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','Hello this is the message','2022-09-09 14:21:08','2022-09-09 14:21:08'),(2,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','Hello this is a message','2022-09-10 06:48:32','2022-09-10 06:48:32'),(3,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','hello this is message','2022-09-10 10:16:59','2022-09-10 10:16:59'),(4,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','Hello this is another message','2022-09-10 12:37:31','2022-09-10 12:37:31'),(5,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','jkljkjhkjhkjhjhkjnkjkjhjkhhjhj','2022-09-11 16:37:16','2022-09-11 16:37:16'),(6,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','jkljkjkjhkjhjhkjnkjkjhjkhhjhj','2022-09-11 16:38:36','2022-09-11 16:38:36'),(7,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','jkljkkjhkjhjhkjnkjkjhjkhhjhj','2022-09-11 16:39:25','2022-09-11 16:39:25'),(8,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','iojkhjhh','2022-09-13 18:54:52','2022-09-13 18:54:52'),(9,'Ammaar Isaacs','Isaacs','0670213131','isaacsammaar@gmail.com','ammaar was herer','2022-09-15 06:50:12','2022-09-15 06:50:12'),(10,'Ammaar','Isaacs','0670213131','isaacsammaar@gmail.com','Ammaar was here','2022-09-15 12:55:13','2022-09-15 12:55:13'),(11,'Ammaar Isaacs','Isaacs','0670213131','isaacsammaar@gmail.com','kjjljkljlkjklj','2022-09-22 17:31:52','2022-09-22 17:31:52'),(12,'Ammaar Isaacs','Isaacs','0670213131','isaacsammaar@gmail.com','Hello My name is ammaay','2022-09-24 19:45:30','2022-09-24 19:45:30'),(13,'Ammaar Isaacs','Isaacs','0670213131','isaacsammaar@gmail.com','kljkjlkjlkjlkj','2022-09-26 09:13:20','2022-09-26 09:13:20');
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
INSERT INTO `order_detail` VALUES ('002ce4dc-207e-4b71-b4be-b18559b400b6',9,'ammaar','isaacs',61.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 10:35:20','2022-09-16 10:35:20'),('03341657-5dd0-4a3d-8538-cf8e2fe687ce',70,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'paid','2022-09-26 12:48:58','2022-09-26 12:49:06'),('077884d2-77dc-4906-b924-3418f6a0c31b',49,'ammaar','isaacs',64.98,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-20 22:02:52','2022-09-20 22:02:52'),('0c964d50-058b-47bc-8416-23e28efe116e',59,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-23 09:23:30','2022-09-23 09:23:30'),('0f868226-62f2-43dd-99df-99e3656449d9',5,'ammaar isaacs','isaacs',60.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-11 15:38:39','2022-09-11 15:38:39'),('10eb3ab2-5f38-48a8-a3c2-8253c334cd82',63,'ammaar','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'paid','2022-09-23 09:40:26','2022-09-23 09:40:39'),('17fd2722-6c9f-4110-9446-5e584482b7b4',33,'ammaar isaacs','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 14:56:27','2022-09-18 14:56:27'),('1f202362-817d-42a2-a31e-9df4a79363bd',7,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-15 12:59:23','2022-09-15 12:59:23'),('1fb1d43f-5c88-4e59-8c8f-d8e262d53359',27,'ammaar isaacs','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 13:41:03','2022-09-18 13:41:03'),('2267e089-8302-4dd6-9999-209eaf33f4ea',57,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-23 09:15:45','2022-09-23 09:15:45'),('23ab5533-49c7-4912-aaf4-cf26839e0c2d',16,'ammaar','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 11:07:47','2022-09-16 11:07:47'),('245010fe-d78e-498b-bc59-d272d28a4d34',11,'ammaar','isaacs',61.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 10:37:41','2022-09-16 10:37:41'),('24b9d701-822f-40d6-be6f-d6780a1bf48d',42,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-19 19:27:59','2022-09-19 19:27:59'),('2516bf5d-7bfd-4f8c-9f96-3740c5b443c5',32,'ammaar isaacs','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 14:19:04','2022-09-18 14:19:04'),('2cb8aa53-f3c4-49c7-bfc3-26eab2f8f857',60,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-23 09:30:17','2022-09-23 09:30:17'),('32f06dca-6e17-4d31-bcee-ae1a077f3283',51,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'paid','2022-09-22 14:17:51','2022-09-22 14:18:04'),('350cac75-7cf5-4fee-96d2-4abe185cac8b',66,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-23 09:55:51','2022-09-23 09:55:51'),('3affeb61-1294-4937-a5ad-6995456f2141',61,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-23 09:32:30','2022-09-23 09:32:30'),('434b8866-8a73-4af0-b156-e45c72bd946f',28,'ammaar isaacs','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 13:44:46','2022-09-18 13:44:46'),('45519204-bc5b-4467-9f1b-d14560a80f63',24,'ammaar isaacs','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 13:30:52','2022-09-18 13:30:52'),('4bb72a50-eeed-4d0b-b3ff-6ec2559764ca',36,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-19 17:43:38','2022-09-19 17:43:38'),('4d5f9da6-1054-4f56-bb98-3bd36877d923',8,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-15 13:02:53','2022-09-15 13:02:53'),('4f054663-2431-4e62-9bc9-c8bdc6a51bec',34,'ammaar isaacs','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 15:04:10','2022-09-18 15:04:10'),('4f3325d7-d3bb-41f3-96dc-d96f0abf59f1',19,'ammaar','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 11:46:04','2022-09-16 11:46:04'),('4f6551e3-de38-4069-813f-bf7b35cb282a',54,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-22 17:27:01','2022-09-22 17:27:01'),('5244cb1f-6b28-41d0-89df-452ab4281a5d',67,'ammaar','isaacs',64.98,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-24 07:45:28','2022-09-24 07:45:28'),('5b4442f1-a74f-4c35-b8fa-f967d280fd99',1,'ammaar','isaacs',200.00,'isaacsammaar@gmail.com','0670213131',1,2,1,'pending','2022-08-31 17:19:56','2022-08-31 17:19:56'),('5d43f801-0b27-4bed-8c19-5da52772b5a4',3,'ammaar isaacs','isaacs',54.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-11 07:16:17','2022-09-11 07:16:17'),('5e7aca4f-235c-4594-82c7-749c87b0047b',68,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-26 12:42:43','2022-09-26 12:42:43'),('60eea2b7-bd55-4ba3-baa8-9c84f98bb4d6',20,'ammaar','isaacs',55.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 11:48:31','2022-09-16 11:48:31'),('687b9ca9-2b04-4144-aacc-a03230aa9ccb',46,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'paid','2022-09-20 17:48:16','2022-09-20 17:48:26'),('69177f95-3b73-4758-a7f2-c889b123cf23',15,'ammaar','isaacs',60.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 11:02:24','2022-09-16 11:02:24'),('6a0193f0-61ba-49a2-85dc-0887f0c8e2d9',69,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',4,4,1,'pending','2022-09-26 12:47:51','2022-09-26 12:47:51'),('6b99fb15-5f49-433d-b175-f5d12ada5f77',39,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-19 17:54:24','2022-09-19 17:54:24'),('6e960c0d-e9f5-435e-97e3-aa99dea7755a',29,'ammaar isaacs','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 13:50:26','2022-09-18 13:50:26'),('6fc2b266-55d9-49e4-ba83-83854b747f43',58,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-23 09:20:45','2022-09-23 09:20:45'),('74189a2c-96dd-4658-a342-36596112feb6',25,'ammaar isaacs','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 13:33:29','2022-09-18 13:33:29'),('75bc4b03-45b4-4a8b-9a12-32eeace2c7bc',17,'ammaar','isaacs',60.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 11:10:39','2022-09-16 11:10:39'),('7d40ebf3-977b-45e0-aeb2-28ce934f44fa',37,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-19 17:45:09','2022-09-19 17:45:09'),('7d810c0f-f06c-4f34-8c77-fb49dd1b43e4',65,'ammaar','isaacs',55.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'paid','2022-09-23 09:48:55','2022-09-23 09:49:07'),('804b4e27-53b1-44e0-9aaa-d0184b65af35',18,'ammaar','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 11:19:30','2022-09-16 11:19:30'),('82fd3e7b-9a29-4413-a6a1-046cb77e0e75',38,'ammaar','isaacs',55.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-19 17:51:37','2022-09-19 17:51:37'),('8864a43b-8e2a-454e-ad04-921daf8e8262',30,'ammaar isaacs','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 13:52:50','2022-09-18 13:52:50'),('9af3efd9-7be0-404d-b823-86ff3023c601',50,'ammaar','isaacs',64.98,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-20 22:06:54','2022-09-20 22:06:54'),('a24288ad-9136-4b7a-b38f-b204e2754716',31,'ammaar isaacs','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 13:54:59','2022-09-18 13:54:59'),('a3e843a6-d9b9-47da-998f-86bd474ffd44',21,'ammaar','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 18:38:33','2022-09-16 18:38:33'),('a990bd4d-1df8-491e-a1ed-f12686ae9a29',48,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-20 17:55:05','2022-09-20 17:55:05'),('aaf181b3-94e9-4d33-93a5-80329a7ab276',10,'ammaar','isaacs',61.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 10:36:28','2022-09-16 10:36:28'),('b179ecb6-3f81-44d8-87a8-dad358f434cc',22,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 13:20:01','2022-09-18 13:20:01'),('b51844aa-f3b4-4d97-a101-85cf6091c199',44,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-19 19:53:42','2022-09-19 19:53:42'),('b53263ab-e704-4fe4-b31f-63e71dd95341',6,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-15 12:56:52','2022-09-15 12:56:52'),('b558a0c9-cb98-465e-b880-e9a85069da02',4,'ammaar isaacs','isaacs',55.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-11 15:23:39','2022-09-11 15:23:39'),('bd8b3d28-3f03-4c4d-831d-b1f1df45dffd',55,'ammaar','isaacs',65.98,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-23 09:12:50','2022-09-23 09:12:50'),('c60cc434-6f96-4c13-955c-88cf43f2c539',43,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-19 19:51:16','2022-09-19 19:51:16'),('c6f4056a-82a3-4794-96e2-5ace587592ed',45,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-20 17:41:55','2022-09-20 17:41:55'),('c73d5d0c-9b1d-41ae-81b2-c7e1d78f1c16',12,'ammaar','isaacs',61.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 10:39:06','2022-09-16 10:39:06'),('c7d80522-d6b1-4b50-9176-e660a27fe534',23,'ammaar isaacs','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 13:24:09','2022-09-18 13:24:09'),('ca784923-546f-4b65-b2b0-7815fc987457',2,'ereshia','benjamin',400.00,'ereshiabenjamin@gmail.com','0824583202',2,2,1,'pending','2022-08-31 17:19:56','2022-08-31 17:19:56'),('cba8ea76-f98b-496f-bb61-2e08422a23fc',53,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-22 17:21:56','2022-09-22 17:21:56'),('cccf7bc5-0adf-4f90-b92a-01e30685d153',26,'ammaar isaacs','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-18 13:37:11','2022-09-18 13:37:11'),('cd885290-fe45-4fab-80ba-c3a79087f3b6',52,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'paid','2022-09-22 14:30:13','2022-09-22 14:30:28'),('cfa704fd-5f2d-4fd5-b7e2-93e3c0f04d8a',13,'ammaar','isaacs',60.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 10:48:32','2022-09-16 10:48:32'),('d5ba392f-478d-4136-abd1-f18894ae8cfa',64,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'paid','2022-09-23 09:43:49','2022-09-23 09:43:59'),('d99b8c0a-1254-453c-86d2-2aa88e666071',41,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-19 19:23:03','2022-09-19 19:23:03'),('e137085f-6305-430b-9962-5b2410d18865',35,'ammaar','isaacs',59.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-19 16:33:25','2022-09-19 16:33:25'),('f26a6e99-be6d-458c-829e-2c6b008710ca',47,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-20 17:54:08','2022-09-20 17:54:08'),('f69e030b-e37d-4d26-8156-7caad13f0f86',40,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-19 18:10:22','2022-09-19 18:10:22'),('f7ad64d9-59a3-4a4c-905c-50583e99e6a2',62,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'paid','2022-09-23 09:35:41','2022-09-23 09:35:50'),('fefb1418-86c1-433e-bead-107264a83e6d',14,'ammaar','isaacs',60.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-16 10:59:17','2022-09-16 10:59:17'),('ffea208d-fdc6-4958-9355-bc9ac1513b5d',56,'ammaar','isaacs',56.99,'isaacsammaar@gmail.com','0670213131',3,3,1,'pending','2022-09-23 09:14:26','2022-09-23 09:14:26');
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
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,'5b4442f1-a74f-4c35-b8fa-f967d280fd99','b459643a-6ac0-418f-8664-e97abbd2f0d9',2),(2,'ca784923-546f-4b65-b2b0-7815fc987457','b324a88f-319c-44eb-969f-eee84726458e',2),(3,'5d43f801-0b27-4bed-8c19-5da52772b5a4','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(4,'b558a0c9-cb98-465e-b880-e9a85069da02','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(5,'b558a0c9-cb98-465e-b880-e9a85069da02','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(6,'0f868226-62f2-43dd-99df-99e3656449d9','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(7,'0f868226-62f2-43dd-99df-99e3656449d9','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(8,'0f868226-62f2-43dd-99df-99e3656449d9','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(9,'0f868226-62f2-43dd-99df-99e3656449d9','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(10,'b53263ab-e704-4fe4-b31f-63e71dd95341','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(11,'b53263ab-e704-4fe4-b31f-63e71dd95341','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(12,'b53263ab-e704-4fe4-b31f-63e71dd95341','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(13,'1f202362-817d-42a2-a31e-9df4a79363bd','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(14,'1f202362-817d-42a2-a31e-9df4a79363bd','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(15,'1f202362-817d-42a2-a31e-9df4a79363bd','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(16,'4d5f9da6-1054-4f56-bb98-3bd36877d923','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(17,'4d5f9da6-1054-4f56-bb98-3bd36877d923','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(18,'4d5f9da6-1054-4f56-bb98-3bd36877d923','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(19,'002ce4dc-207e-4b71-b4be-b18559b400b6','f344becb-174a-4ed9-b336-ce228ae2f12f',2),(20,'002ce4dc-207e-4b71-b4be-b18559b400b6','324a2310-8bb6-4769-aea2-c63f3478fd01',2),(21,'002ce4dc-207e-4b71-b4be-b18559b400b6','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(22,'aaf181b3-94e9-4d33-93a5-80329a7ab276','f344becb-174a-4ed9-b336-ce228ae2f12f',2),(23,'aaf181b3-94e9-4d33-93a5-80329a7ab276','324a2310-8bb6-4769-aea2-c63f3478fd01',2),(24,'aaf181b3-94e9-4d33-93a5-80329a7ab276','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(25,'245010fe-d78e-498b-bc59-d272d28a4d34','f344becb-174a-4ed9-b336-ce228ae2f12f',2),(26,'245010fe-d78e-498b-bc59-d272d28a4d34','324a2310-8bb6-4769-aea2-c63f3478fd01',2),(27,'245010fe-d78e-498b-bc59-d272d28a4d34','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(28,'c73d5d0c-9b1d-41ae-81b2-c7e1d78f1c16','f344becb-174a-4ed9-b336-ce228ae2f12f',2),(29,'c73d5d0c-9b1d-41ae-81b2-c7e1d78f1c16','324a2310-8bb6-4769-aea2-c63f3478fd01',2),(30,'c73d5d0c-9b1d-41ae-81b2-c7e1d78f1c16','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(31,'cfa704fd-5f2d-4fd5-b7e2-93e3c0f04d8a','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(32,'cfa704fd-5f2d-4fd5-b7e2-93e3c0f04d8a','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(33,'cfa704fd-5f2d-4fd5-b7e2-93e3c0f04d8a','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(34,'cfa704fd-5f2d-4fd5-b7e2-93e3c0f04d8a','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(35,'fefb1418-86c1-433e-bead-107264a83e6d','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(36,'fefb1418-86c1-433e-bead-107264a83e6d','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(37,'fefb1418-86c1-433e-bead-107264a83e6d','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(38,'fefb1418-86c1-433e-bead-107264a83e6d','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(39,'69177f95-3b73-4758-a7f2-c889b123cf23','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(40,'69177f95-3b73-4758-a7f2-c889b123cf23','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(41,'69177f95-3b73-4758-a7f2-c889b123cf23','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(42,'69177f95-3b73-4758-a7f2-c889b123cf23','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(43,'23ab5533-49c7-4912-aaf4-cf26839e0c2d','18951ba7-467b-4f6d-875a-9bf34a1a9069',2),(44,'23ab5533-49c7-4912-aaf4-cf26839e0c2d','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(45,'75bc4b03-45b4-4a8b-9a12-32eeace2c7bc','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(46,'75bc4b03-45b4-4a8b-9a12-32eeace2c7bc','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(47,'75bc4b03-45b4-4a8b-9a12-32eeace2c7bc','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(48,'75bc4b03-45b4-4a8b-9a12-32eeace2c7bc','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(49,'804b4e27-53b1-44e0-9aaa-d0184b65af35','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(50,'804b4e27-53b1-44e0-9aaa-d0184b65af35','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(51,'804b4e27-53b1-44e0-9aaa-d0184b65af35','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(52,'4f3325d7-d3bb-41f3-96dc-d96f0abf59f1','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(53,'4f3325d7-d3bb-41f3-96dc-d96f0abf59f1','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(54,'4f3325d7-d3bb-41f3-96dc-d96f0abf59f1','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(55,'60eea2b7-bd55-4ba3-baa8-9c84f98bb4d6','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(56,'60eea2b7-bd55-4ba3-baa8-9c84f98bb4d6','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(57,'a3e843a6-d9b9-47da-998f-86bd474ffd44','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(58,'a3e843a6-d9b9-47da-998f-86bd474ffd44','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(59,'a3e843a6-d9b9-47da-998f-86bd474ffd44','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(60,'b179ecb6-3f81-44d8-87a8-dad358f434cc','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(61,'b179ecb6-3f81-44d8-87a8-dad358f434cc','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(62,'b179ecb6-3f81-44d8-87a8-dad358f434cc','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(63,'c7d80522-d6b1-4b50-9176-e660a27fe534','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(64,'c7d80522-d6b1-4b50-9176-e660a27fe534','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(65,'c7d80522-d6b1-4b50-9176-e660a27fe534','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(66,'45519204-bc5b-4467-9f1b-d14560a80f63','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(67,'45519204-bc5b-4467-9f1b-d14560a80f63','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(68,'45519204-bc5b-4467-9f1b-d14560a80f63','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(69,'74189a2c-96dd-4658-a342-36596112feb6','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(70,'74189a2c-96dd-4658-a342-36596112feb6','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(71,'74189a2c-96dd-4658-a342-36596112feb6','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(72,'cccf7bc5-0adf-4f90-b92a-01e30685d153','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(73,'cccf7bc5-0adf-4f90-b92a-01e30685d153','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(74,'cccf7bc5-0adf-4f90-b92a-01e30685d153','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(75,'1fb1d43f-5c88-4e59-8c8f-d8e262d53359','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(76,'1fb1d43f-5c88-4e59-8c8f-d8e262d53359','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(77,'1fb1d43f-5c88-4e59-8c8f-d8e262d53359','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(78,'434b8866-8a73-4af0-b156-e45c72bd946f','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(79,'434b8866-8a73-4af0-b156-e45c72bd946f','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(80,'434b8866-8a73-4af0-b156-e45c72bd946f','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(81,'6e960c0d-e9f5-435e-97e3-aa99dea7755a','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(82,'6e960c0d-e9f5-435e-97e3-aa99dea7755a','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(83,'6e960c0d-e9f5-435e-97e3-aa99dea7755a','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(84,'8864a43b-8e2a-454e-ad04-921daf8e8262','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(85,'8864a43b-8e2a-454e-ad04-921daf8e8262','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(86,'8864a43b-8e2a-454e-ad04-921daf8e8262','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(87,'a24288ad-9136-4b7a-b38f-b204e2754716','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(88,'a24288ad-9136-4b7a-b38f-b204e2754716','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(89,'a24288ad-9136-4b7a-b38f-b204e2754716','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(90,'2516bf5d-7bfd-4f8c-9f96-3740c5b443c5','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(91,'2516bf5d-7bfd-4f8c-9f96-3740c5b443c5','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(92,'2516bf5d-7bfd-4f8c-9f96-3740c5b443c5','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(93,'17fd2722-6c9f-4110-9446-5e584482b7b4','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(94,'17fd2722-6c9f-4110-9446-5e584482b7b4','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(95,'17fd2722-6c9f-4110-9446-5e584482b7b4','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(96,'4f054663-2431-4e62-9bc9-c8bdc6a51bec','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(97,'4f054663-2431-4e62-9bc9-c8bdc6a51bec','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(98,'4f054663-2431-4e62-9bc9-c8bdc6a51bec','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(99,'e137085f-6305-430b-9962-5b2410d18865','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(100,'e137085f-6305-430b-9962-5b2410d18865','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(101,'e137085f-6305-430b-9962-5b2410d18865','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(102,'4bb72a50-eeed-4d0b-b3ff-6ec2559764ca','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(103,'4bb72a50-eeed-4d0b-b3ff-6ec2559764ca','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(104,'4bb72a50-eeed-4d0b-b3ff-6ec2559764ca','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(105,'7d40ebf3-977b-45e0-aeb2-28ce934f44fa','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(106,'7d40ebf3-977b-45e0-aeb2-28ce934f44fa','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(107,'7d40ebf3-977b-45e0-aeb2-28ce934f44fa','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(108,'82fd3e7b-9a29-4413-a6a1-046cb77e0e75','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(109,'82fd3e7b-9a29-4413-a6a1-046cb77e0e75','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(110,'6b99fb15-5f49-433d-b175-f5d12ada5f77','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(111,'6b99fb15-5f49-433d-b175-f5d12ada5f77','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(112,'6b99fb15-5f49-433d-b175-f5d12ada5f77','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(113,'f69e030b-e37d-4d26-8156-7caad13f0f86','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(114,'f69e030b-e37d-4d26-8156-7caad13f0f86','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(115,'f69e030b-e37d-4d26-8156-7caad13f0f86','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(116,'d99b8c0a-1254-453c-86d2-2aa88e666071','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(117,'d99b8c0a-1254-453c-86d2-2aa88e666071','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(118,'d99b8c0a-1254-453c-86d2-2aa88e666071','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(119,'24b9d701-822f-40d6-be6f-d6780a1bf48d','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(120,'24b9d701-822f-40d6-be6f-d6780a1bf48d','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(121,'24b9d701-822f-40d6-be6f-d6780a1bf48d','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(122,'c60cc434-6f96-4c13-955c-88cf43f2c539','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(123,'c60cc434-6f96-4c13-955c-88cf43f2c539','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(124,'c60cc434-6f96-4c13-955c-88cf43f2c539','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(125,'b51844aa-f3b4-4d97-a101-85cf6091c199','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(126,'b51844aa-f3b4-4d97-a101-85cf6091c199','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(127,'b51844aa-f3b4-4d97-a101-85cf6091c199','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(128,'c6f4056a-82a3-4794-96e2-5ace587592ed','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(129,'c6f4056a-82a3-4794-96e2-5ace587592ed','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(130,'c6f4056a-82a3-4794-96e2-5ace587592ed','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(131,'687b9ca9-2b04-4144-aacc-a03230aa9ccb','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(132,'687b9ca9-2b04-4144-aacc-a03230aa9ccb','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(133,'687b9ca9-2b04-4144-aacc-a03230aa9ccb','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(134,'f26a6e99-be6d-458c-829e-2c6b008710ca','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(135,'f26a6e99-be6d-458c-829e-2c6b008710ca','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(136,'f26a6e99-be6d-458c-829e-2c6b008710ca','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(137,'a990bd4d-1df8-491e-a1ed-f12686ae9a29','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(138,'a990bd4d-1df8-491e-a1ed-f12686ae9a29','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(139,'a990bd4d-1df8-491e-a1ed-f12686ae9a29','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(140,'077884d2-77dc-4906-b924-3418f6a0c31b','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(141,'077884d2-77dc-4906-b924-3418f6a0c31b','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(142,'077884d2-77dc-4906-b924-3418f6a0c31b','a4592227-11d4-4161-8f52-a341f43b08c1',1),(143,'9af3efd9-7be0-404d-b823-86ff3023c601','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(144,'9af3efd9-7be0-404d-b823-86ff3023c601','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(145,'9af3efd9-7be0-404d-b823-86ff3023c601','a4592227-11d4-4161-8f52-a341f43b08c1',1),(146,'32f06dca-6e17-4d31-bcee-ae1a077f3283','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(147,'32f06dca-6e17-4d31-bcee-ae1a077f3283','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(148,'32f06dca-6e17-4d31-bcee-ae1a077f3283','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(149,'cd885290-fe45-4fab-80ba-c3a79087f3b6','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(150,'cd885290-fe45-4fab-80ba-c3a79087f3b6','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(151,'cd885290-fe45-4fab-80ba-c3a79087f3b6','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(152,'cba8ea76-f98b-496f-bb61-2e08422a23fc','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(153,'cba8ea76-f98b-496f-bb61-2e08422a23fc','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(154,'cba8ea76-f98b-496f-bb61-2e08422a23fc','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(155,'4f6551e3-de38-4069-813f-bf7b35cb282a','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(156,'4f6551e3-de38-4069-813f-bf7b35cb282a','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(157,'4f6551e3-de38-4069-813f-bf7b35cb282a','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(158,'bd8b3d28-3f03-4c4d-831d-b1f1df45dffd','a4592227-11d4-4161-8f52-a341f43b08c1',1),(159,'bd8b3d28-3f03-4c4d-831d-b1f1df45dffd','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(160,'bd8b3d28-3f03-4c4d-831d-b1f1df45dffd','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(161,'bd8b3d28-3f03-4c4d-831d-b1f1df45dffd','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(162,'ffea208d-fdc6-4958-9355-bc9ac1513b5d','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(163,'ffea208d-fdc6-4958-9355-bc9ac1513b5d','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(164,'ffea208d-fdc6-4958-9355-bc9ac1513b5d','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(165,'2267e089-8302-4dd6-9999-209eaf33f4ea','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(166,'2267e089-8302-4dd6-9999-209eaf33f4ea','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(167,'2267e089-8302-4dd6-9999-209eaf33f4ea','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(168,'6fc2b266-55d9-49e4-ba83-83854b747f43','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(169,'6fc2b266-55d9-49e4-ba83-83854b747f43','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(170,'6fc2b266-55d9-49e4-ba83-83854b747f43','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(171,'0c964d50-058b-47bc-8416-23e28efe116e','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(172,'0c964d50-058b-47bc-8416-23e28efe116e','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(173,'0c964d50-058b-47bc-8416-23e28efe116e','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(174,'2cb8aa53-f3c4-49c7-bfc3-26eab2f8f857','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(175,'2cb8aa53-f3c4-49c7-bfc3-26eab2f8f857','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(176,'2cb8aa53-f3c4-49c7-bfc3-26eab2f8f857','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(177,'3affeb61-1294-4937-a5ad-6995456f2141','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(178,'3affeb61-1294-4937-a5ad-6995456f2141','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(179,'3affeb61-1294-4937-a5ad-6995456f2141','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(180,'f7ad64d9-59a3-4a4c-905c-50583e99e6a2','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(181,'f7ad64d9-59a3-4a4c-905c-50583e99e6a2','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(182,'f7ad64d9-59a3-4a4c-905c-50583e99e6a2','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(183,'10eb3ab2-5f38-48a8-a3c2-8253c334cd82','18951ba7-467b-4f6d-875a-9bf34a1a9069',1),(184,'10eb3ab2-5f38-48a8-a3c2-8253c334cd82','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(185,'10eb3ab2-5f38-48a8-a3c2-8253c334cd82','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(186,'d5ba392f-478d-4136-abd1-f18894ae8cfa','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(187,'d5ba392f-478d-4136-abd1-f18894ae8cfa','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(188,'d5ba392f-478d-4136-abd1-f18894ae8cfa','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(189,'7d810c0f-f06c-4f34-8c77-fb49dd1b43e4','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(190,'7d810c0f-f06c-4f34-8c77-fb49dd1b43e4','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(191,'350cac75-7cf5-4fee-96d2-4abe185cac8b','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(192,'350cac75-7cf5-4fee-96d2-4abe185cac8b','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(193,'350cac75-7cf5-4fee-96d2-4abe185cac8b','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(194,'5244cb1f-6b28-41d0-89df-452ab4281a5d','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(195,'5244cb1f-6b28-41d0-89df-452ab4281a5d','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(196,'5244cb1f-6b28-41d0-89df-452ab4281a5d','a4592227-11d4-4161-8f52-a341f43b08c1',1),(197,'5e7aca4f-235c-4594-82c7-749c87b0047b','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(198,'5e7aca4f-235c-4594-82c7-749c87b0047b','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(199,'5e7aca4f-235c-4594-82c7-749c87b0047b','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(200,'6a0193f0-61ba-49a2-85dc-0887f0c8e2d9','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(201,'6a0193f0-61ba-49a2-85dc-0887f0c8e2d9','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(202,'6a0193f0-61ba-49a2-85dc-0887f0c8e2d9','324a2310-8bb6-4769-aea2-c63f3478fd01',1),(203,'03341657-5dd0-4a3d-8538-cf8e2fe687ce','508ed6f6-c0a5-44e2-88f5-f4b8866e1df8',1),(204,'03341657-5dd0-4a3d-8538-cf8e2fe687ce','f344becb-174a-4ed9-b336-ce228ae2f12f',1),(205,'03341657-5dd0-4a3d-8538-cf8e2fe687ce','324a2310-8bb6-4769-aea2-c63f3478fd01',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_detail`
--

LOCK TABLES `payment_detail` WRITE;
/*!40000 ALTER TABLE `payment_detail` DISABLE KEYS */;
INSERT INTO `payment_detail` VALUES (1,'pf payment id 0',200,'5b4442f1-a74f-4c35-b8fa-f967d280fd99','2022-08-31 17:19:56','2022-08-31 17:19:56'),(2,'pf payment id 1',200,'ca784923-546f-4b65-b2b0-7815fc987457','2022-08-31 17:19:56','2022-08-31 17:19:56'),(3,'1513598',57,'687b9ca9-2b04-4144-aacc-a03230aa9ccb','2022-09-20 17:48:26','2022-09-20 17:48:26'),(4,'1514695',57,'32f06dca-6e17-4d31-bcee-ae1a077f3283','2022-09-22 14:18:04','2022-09-22 14:18:04'),(5,'1514699',57,'cd885290-fe45-4fab-80ba-c3a79087f3b6','2022-09-22 14:30:28','2022-09-22 14:30:28'),(6,'1515002',57,'f7ad64d9-59a3-4a4c-905c-50583e99e6a2','2022-09-23 09:35:50','2022-09-23 09:35:50'),(7,'1515009',60,'10eb3ab2-5f38-48a8-a3c2-8253c334cd82','2022-09-23 09:40:39','2022-09-23 09:40:39'),(8,'1515013',57,'d5ba392f-478d-4136-abd1-f18894ae8cfa','2022-09-23 09:43:59','2022-09-23 09:43:59'),(9,'1515019',56,'7d810c0f-f06c-4f34-8c77-fb49dd1b43e4','2022-09-23 09:49:07','2022-09-23 09:49:07'),(10,'1516732',57,'03341657-5dd0-4a3d-8538-cf8e2fe687ce','2022-09-26 12:49:06','2022-09-26 12:49:06');
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
INSERT INTO `product` VALUES ('158f8c38-ed52-4ed1-84a9-f04b088b5cca','Blazer','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',6.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('182a27f6-cd1b-4075-835b-90cb669b84f7','Hat','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',8.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('18951ba7-467b-4f6d-875a-9bf34a1a9069','Blazer','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',4.00,9,0,'2022-08-31 17:19:56','2022-09-23 09:40:39'),('20ae24ba-ae44-4556-9f3e-680d157191d7','Jacket','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',10.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('23736b20-68dc-4de3-91b0-17b0e71c488b','Shirt','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',5.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('324a2310-8bb6-4769-aea2-c63f3478fd01','Hat','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',1.00,4,1,'2022-08-31 17:19:56','2022-09-26 12:49:06'),('3c8d6312-1d72-4749-b17d-25db270d0d36','Socks','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',1.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('471327bc-7780-4492-b847-bfd978b26b61','Blazer','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',10.99,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('508ed6f6-c0a5-44e2-88f5-f4b8866e1df8','Tie','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',1.00,2,1,'2022-08-31 17:19:56','2022-09-26 12:49:06'),('6207b066-34ae-4167-bea2-8acc62e031a9','Shirt','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',4.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('75f0b19c-af07-4f9d-b9fb-a60faba62bcc','Jacket','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',8.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('7a57dafa-928e-4513-9c96-ae538a7b1ad3','Tie','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',2.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('7fa1bd2c-2104-4d78-9290-ffa57487af1f','Socks','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',3.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('9b97ff03-2f6d-4806-ad3b-2f712552ab9b','Tie','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',10.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('a4592227-11d4-4161-8f52-a341f43b08c1','Shoes','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',8.99,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('a7ab8f7d-bf18-4730-a8c7-c9fb3f806932','Jacket','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',8.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('a8c18f6d-2083-4f85-8926-298fd0b38007','Socks','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',3.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('aed09340-af5a-4eac-b16c-893dc7e0a7dd','Tie','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',2.00,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('b324a88f-319c-44eb-969f-eee84726458e','Jacket','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',1.00,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('b459643a-6ac0-418f-8664-e97abbd2f0d9','Shoes','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',8.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('bf18507b-7fd1-460c-8a13-deb7a64dbb01','Blazer','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',4.00,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('e593dd9f-621e-47e3-b208-b9425c690b38','Smart Pants','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',6.99,10,0,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('f344becb-174a-4ed9-b336-ce228ae2f12f','Blazer','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',4.00,2,0,'2022-08-31 17:19:56','2022-09-26 12:49:06'),('f6102d13-4cef-45c9-9510-913d94afc5d6','Hat','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',1.00,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56'),('ffe73cf9-60eb-4058-9e0e-ef9b5549d2ef','Bowtie','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit ratione molestiae iusto expedita perspiciatis. Id velit quibusdam mollitia qui quisquam magni minima exercitationem voluptates, ducimus officia rem, sit sapiente accusantium.',10.99,10,1,'2022-08-31 17:19:56','2022-08-31 17:19:56');
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

-- Dump completed on 2022-09-26 23:59:00
