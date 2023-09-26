-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: localdb
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `attachments_info`
--

DROP TABLE IF EXISTS `attachments_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attachments_info` (
  `attach_id` int NOT NULL AUTO_INCREMENT,
  `notice_id` int NOT NULL,
  `orign_name` varchar(200) NOT NULL,
  `save_name` varchar(200) NOT NULL,
  `save_path` varchar(1000) NOT NULL,
  `file_size` int NOT NULL,
  `file_extension` varchar(10) DEFAULT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  PRIMARY KEY (`attach_id`,`notice_id`),
  KEY `attachments_info_idx1` (`notice_id`),
  CONSTRAINT `attachments_info_ibfk_1` FOREIGN KEY (`notice_id`) REFERENCES `notice_info` (`notice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachments_info`
--

LOCK TABLES `attachments_info` WRITE;
/*!40000 ALTER TABLE `attachments_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `attachments_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_info`
--

DROP TABLE IF EXISTS `auth_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_info` (
  `auth_id` int NOT NULL AUTO_INCREMENT,
  `auth_name` varchar(100) NOT NULL,
  `auth_desc` varchar(500) DEFAULT NULL,
  `use_status` varchar(1) NOT NULL,
  `delete_status` varchar(1) NOT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  `update_id` int NOT NULL,
  `update_date` date NOT NULL,
  PRIMARY KEY (`auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_info`
--

LOCK TABLES `auth_info` WRITE;
/*!40000 ALTER TABLE `auth_info` DISABLE KEYS */;
INSERT INTO `auth_info` VALUES (1,'관리자 권한','관리자 권한입니다.','Y','N',1,'2023-03-15',10,'2023-04-10'),(2,'매니저 권한','매니저 권한입니다.','Y','N',1,'2023-03-15',10,'2023-04-10'),(3,'사용자 권한','사용자 권한입니다.','Y','N',1,'2023-03-15',1,'2023-03-20'),(4,'일반 사용자','도메인 권한이 필요한 일반 사용자(권한 없음)','Y','N',1,'2023-03-15',1,'2023-03-15'),(5,'das','123333','Y','N',1,'2023-03-15',0,'2023-03-16'),(7,'sdsda',NULL,'N','N',1,'2023-03-16',1,'2023-03-16'),(8,'dsds',NULL,'N','N',1,'2023-03-20',1,'2023-03-20'),(9,'sada',NULL,'N','N',1,'2023-03-20',1,'2023-03-20'),(10,'fasfaf',NULL,'N','N',1,'2023-03-20',1,'2023-03-20'),(15,'테스트',NULL,'N','N',1,'2023-03-20',1,'2023-03-20'),(16,'test',NULL,'N','N',1,'2023-03-20',1,'2023-03-20'),(17,'테스트!!!!',NULL,'N','N',1,'2023-03-20',1,'2023-03-20'),(18,'테스트222',NULL,'N','N',1,'2023-03-20',1,'2023-03-20'),(19,'testtest','testtest','N','N',1,'2023-03-20',1,'2023-03-20'),(20,'테스트 권한','테스트!!!','N','N',1,'2023-03-20',1,'2023-03-20'),(21,'등록테스트',NULL,'N','N',1,'2023-03-20',1,'2023-03-20'),(22,'테스트123423213231ㅅㄷㅅㄷㅅㄷ',NULL,'Y','N',1,'2023-03-20',1,'2023-07-19'),(23,'권한 테스트!!','권한 테스트!!','Y','N',1,'2023-03-22',10,'2023-04-10'),(24,'ttttt',NULL,'Y','N',1,'2023-07-19',1,'2023-07-19'),(25,'SDSADSD',NULL,'Y','N',1,'2023-07-19',1,'2023-07-19'),(26,'테스트22323',NULL,'Y','N',1,'2023-08-09',1,'2023-08-09'),(27,'테스트!!34343',NULL,'Y','N',1,'2023-08-09',1,'2023-08-09');
/*!40000 ALTER TABLE `auth_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `common_code`
--

DROP TABLE IF EXISTS `common_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common_code` (
  `code_id` varchar(15) NOT NULL,
  `parent_code_id` varchar(10) DEFAULT NULL,
  `code_name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `code_value` varchar(500) DEFAULT NULL,
  `use_status` varchar(1) NOT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  `update_id` int NOT NULL,
  `update_date` date NOT NULL,
  PRIMARY KEY (`code_id`),
  KEY `fk_common_code_idx` (`parent_code_id`),
  CONSTRAINT `fk_common_code` FOREIGN KEY (`parent_code_id`) REFERENCES `common_code` (`code_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_code`
--

LOCK TABLES `common_code` WRITE;
/*!40000 ALTER TABLE `common_code` DISABLE KEYS */;
INSERT INTO `common_code` VALUES ('01',NULL,'센서분류','센서분류',NULL,'Y',1,'2022-10-24',0,'2023-03-07'),('01001','01','실물센서','실물센서','R','Y',1,'2022-10-24',1,'2022-10-24'),('01002','01','가상센서','가상센서','V','Y',1,'2022-10-24',0,'2023-03-21'),('02',NULL,'저장테이블분류','저장테이블분류',NULL,'Y',1,'2022-10-24',1,'2022-10-24'),('02001','02','실시간 누적 데이터','실시간 누적 데이터',NULL,'Y',1,'2022-10-24',1,'2022-10-24'),('02002','02','전처리 누적 데이터','전처리 누적 데이터',NULL,'Y',2,'2022-10-24',1,'2022-10-24'),('02003','02','디지털트윈 누적 데이터','디지털트윈 누적 데이터',NULL,'Y',1,'2022-10-24',1,'2022-10-24'),('02004','02','실시간 Temp 데이터','실시간 Temp 데이터',NULL,'Y',1,'2022-10-24',1,'2022-10-24'),('02005','02','전처리 Temp 데이터','전처리 Temp 데이터',NULL,'Y',1,'2022-10-24',0,'2023-03-07'),('02006','02','디지털트윈 Temp 데이터','디지털트윈 Temp 데이터',NULL,'Y',1,'2022-10-24',1,'2022-10-24'),('03',NULL,'도메인 분류','도메인 분류',NULL,'Y',1,'2022-10-26',1,'2022-10-26'),('03001','03','화학','화학',NULL,'Y',1,'2022-10-26',1,'2022-10-26'),('03002','03','교량','교량',NULL,'Y',1,'2022-10-26',1,'2022-10-26'),('03003','03','축사','축사',NULL,'Y',1,'2022-10-26',1,'2022-10-26'),('04',NULL,'메뉴 타입 분류','메뉴 타입 분류',NULL,'Y',1,'2022-10-26',1,'2022-10-26'),('05',NULL,'메뉴 레벨 분류','메뉴 레벨 분류',NULL,'Y',1,'2022-10-26',1,'2022-10-26'),('06',NULL,'컨테이너 실행 타입',NULL,NULL,'Y',0,'2023-06-23',0,'2023-06-23'),('06001','06','학습',NULL,NULL,'Y',0,'2023-06-23',0,'2023-06-23'),('06002','06','운영',NULL,NULL,'Y',0,'2023-06-23',0,'2023-06-23'),('06003','06','오차보정용',NULL,NULL,'Y',0,'2023-06-23',0,'2023-06-23'),('06004','06','기타',NULL,NULL,'Y',0,'2023-06-23',0,'2023-06-23'),('07',NULL,'컨테이너 운영 상태',NULL,NULL,'Y',0,'2023-06-23',0,'2023-06-23'),('07001','07','생성',NULL,'C','Y',0,'2023-06-23',0,'2023-06-23'),('07002','07','운영',NULL,'Y','Y',0,'2023-06-23',0,'2023-06-23'),('07003','07','미운영',NULL,'N','Y',0,'2023-06-23',0,'2023-06-23'),('08',NULL,'이미지 버전별 관리 파일 타입',NULL,NULL,'Y',0,'2023-06-23',0,'2023-06-23'),('08001','08','가상센서 모델',NULL,'001','Y',0,'2023-06-23',0,'2023-06-23'),('08002','08','이상감지 모델',NULL,'002','Y',0,'2023-06-23',0,'2023-06-23'),('08003','08','학습데이터',NULL,'003','Y',0,'2023-06-23',0,'2023-06-23'),('08004','08','학습정보(Meta) 데이터',NULL,'004','Y',0,'2023-06-23',0,'2023-06-23'),('1234',NULL,'테스트111',NULL,NULL,'Y',0,'2023-03-16',0,'2023-03-16'),('aaa',NULL,'센서',NULL,NULL,'Y',0,'2023-03-03',0,'2023-03-10'),('aaa11','dasda','센서수정테스트',NULL,'1234556','Y',0,'2023-03-03',0,'2023-03-14'),('aaa423','aaa','센서tete','adasd','aggag','Y',0,'2023-03-03',0,'2023-03-06'),('aaasd','01','fafasfa',NULL,'asfafa','Y',0,'2023-03-10',0,'2023-03-10'),('aafff','aaa11','센서하하',NULL,NULL,'Y',0,'2023-03-03',0,'2023-03-06'),('aasd',NULL,'asfasf',NULL,NULL,'Y',0,'2023-03-14',0,'2023-03-14'),('arewe',NULL,'fsdfsdf',NULL,NULL,'N',0,'2023-03-14',0,'2023-03-14'),('as',NULL,'asd',NULL,NULL,'Y',0,'2023-03-14',0,'2023-03-14'),('asda','02','하하하하하',NULL,NULL,'Y',0,'2023-03-14',0,'2023-03-16'),('asdad',NULL,'sdad',NULL,NULL,'Y',0,'2023-03-14',0,'2023-03-14'),('bdb',NULL,'dsf',NULL,NULL,'N',0,'2023-03-14',0,'2023-03-14'),('daas',NULL,'asdasd',NULL,NULL,'N',0,'2023-03-14',0,'2023-03-14'),('dasda',NULL,'안녕안녕',NULL,NULL,'Y',0,'2023-03-10',0,'2023-03-16'),('DETAIL_FUNC','05','상세 기능','상세 기능',NULL,'Y',1,'2023-03-03',1,'2023-03-03'),('dfdfsd','01','12344',NULL,NULL,'N',0,'2023-03-10',0,'2023-03-10'),('DM001',NULL,'신청 정보 관리 신청 상태','신청 정보 관리 등록 시 신청 상태 확인용',NULL,'Y',0,'2023-07-06',0,'2023-07-06'),('DM002','DM001','심사요청',NULL,NULL,'Y',0,'2023-07-06',0,'2023-07-06'),('DM003','DM001','심사진행',NULL,NULL,'Y',0,'2023-07-06',0,'2023-07-06'),('DM004','DM001','심사완료',NULL,NULL,'Y',0,'2023-07-06',0,'2023-07-06'),('DMS01',NULL,'도메인 타입 Select','도메인 타입 select box ',NULL,'Y',0,'2023-07-07',0,'2023-07-07'),('DMS02','DMS01','화학 도메인','화학 도메인',NULL,'Y',0,'2023-07-07',0,'2023-07-07'),('DMS03','DMS01','축사 도메인','축사 도메인',NULL,'Y',0,'2023-07-07',0,'2023-07-07'),('DMS04','DMS01','교량 도메인','교량 도메인',NULL,'Y',0,'2023-07-07',0,'2023-07-07'),('DMS05','DMS01','기타 도메인','기타 도메인',NULL,'Y',0,'2023-07-07',0,'2023-07-07'),('fafsa',NULL,'asdasdasdad','asfasf','sdasdasd','Y',0,'2023-03-10',0,'2023-03-10'),('fasfaf','02','sssaaa111',NULL,NULL,'Y',0,'2023-03-10',0,'2023-03-10'),('FUNC','04','기능','기능',NULL,'Y',1,'2023-03-03',1,'2023-03-10'),('HEADER','05','HEADER','HEADER',NULL,'Y',1,'2023-03-16',1,'2023-03-16'),('MENU','04','메뉴','메뉴',NULL,'Y',1,'2023-03-16',1,'2023-03-16'),('ROOT','05','CMS 최상위 메뉴','CMS 최상위 메뉴',NULL,'Y',1,'2023-03-03',1,'2023-03-10'),('sdasd',NULL,'11111',NULL,NULL,'N',0,'2023-03-14',0,'2023-03-16'),('sds',NULL,'sds',NULL,'asdasdad','N',0,'2023-03-10',0,'2023-03-10'),('SUB_MENU','05','상세 메뉴','상세 메뉴',NULL,'Y',1,'2023-03-03',1,'2023-03-03'),('test1234','03','테스트!!!!!','테스트등록!!',NULL,'Y',0,'2023-03-22',0,'2023-03-22'),('ttest','03','ttest',NULL,NULL,'Y',0,'2023-03-09',0,'2023-03-22'),('tyrt',NULL,'rtyr',NULL,NULL,'N',0,'2023-03-14',0,'2023-03-14'),('센서등록테스트','aaa','센서등록테스트1234',NULL,NULL,'N',0,'2023-03-09',0,'2023-03-09'),('테스코드ID',NULL,'코드네임',NULL,'코드벨류','N',0,'2023-03-07',0,'2023-03-09'),('테스트123','02','테스트222',NULL,NULL,'N',0,'2023-03-10',0,'2023-03-10');
/*!40000 ALTER TABLE `common_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domain_base_info`
--

DROP TABLE IF EXISTS `domain_base_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domain_base_info` (
  `domain_id` int NOT NULL AUTO_INCREMENT,
  `req_manager_id` int NOT NULL,
  `domain_identifier` varchar(20) NOT NULL,
  `domain_type` varchar(10) DEFAULT NULL,
  `domain_name` varchar(100) NOT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `base_address` varchar(200) DEFAULT NULL,
  `detail_address` varchar(500) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `operational_status` varchar(1) NOT NULL,
  `use_status` varchar(1) NOT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  `update_id` int NOT NULL,
  `update_date` date NOT NULL,
  PRIMARY KEY (`domain_id`),
  UNIQUE KEY `domain_identifier_UNIQUE` (`domain_identifier`),
  KEY `req_manager_id` (`req_manager_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domain_base_info`
--

LOCK TABLES `domain_base_info` WRITE;
/*!40000 ALTER TABLE `domain_base_info` DISABLE KEYS */;
INSERT INTO `domain_base_info` VALUES (1,1,'OnsanChem','03001','화학도메인',NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(2,2,'EDCBridge','03002','교량도메인',NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(3,3,'SmileFarm','03003','축사도메인',NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(4,4,'FishFarm','test1234','양식도메인','59614','전라남도 여수시 여수산단로 918(적량동)','양식장',123.12,123.111,'Y','Y',10,'2023-03-23',10,'2023-03-23'),(5,5,'테스트552','03001','테스트552','','','',0,0,'Y','Y',10,'2023-06-09',10,'2023-06-09'),(6,6,'ExtDomain','03001','기타 도메인','','','',0,0,'Y','Y',10,'2023-07-06',10,'2023-07-06');
/*!40000 ALTER TABLE `domain_base_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domain_change_history`
--

DROP TABLE IF EXISTS `domain_change_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domain_change_history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `domain_id` int NOT NULL,
  `change_type` varchar(10) NOT NULL,
  `change_classify` varchar(10) NOT NULL,
  `change_detail` text NOT NULL,
  `change_id` int NOT NULL,
  `change_date` date NOT NULL,
  PRIMARY KEY (`history_id`,`domain_id`),
  KEY `R_1` (`domain_id`),
  CONSTRAINT `domain_change_history_ibfk_1` FOREIGN KEY (`domain_id`) REFERENCES `domain_base_info` (`domain_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domain_change_history`
--

LOCK TABLES `domain_change_history` WRITE;
/*!40000 ALTER TABLE `domain_change_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `domain_change_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domain_interface`
--

DROP TABLE IF EXISTS `domain_interface`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domain_interface` (
  `interface_classify` varchar(10) NOT NULL,
  `interface_type` varchar(10) NOT NULL,
  `protocol_type` varchar(10) NOT NULL,
  `domain_id` int NOT NULL,
  `interface_name` varchar(100) NOT NULL,
  `connection_url` varchar(500) NOT NULL,
  `operational_status` varchar(1) NOT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  `update_id` int NOT NULL,
  `update_date` date NOT NULL,
  PRIMARY KEY (`interface_classify`,`interface_type`,`protocol_type`,`domain_id`),
  KEY `domain_interface_idx1` (`domain_id`),
  CONSTRAINT `domain_interface_ibfk_1` FOREIGN KEY (`domain_id`) REFERENCES `domain_base_info` (`domain_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domain_interface`
--

LOCK TABLES `domain_interface` WRITE;
/*!40000 ALTER TABLE `domain_interface` DISABLE KEYS */;
/*!40000 ALTER TABLE `domain_interface` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interface_save_space_info`
--

DROP TABLE IF EXISTS `interface_save_space_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interface_save_space_info` (
  `space_id` int NOT NULL AUTO_INCREMENT,
  `data_classify` varchar(10) NOT NULL,
  `sensor_id` int NOT NULL,
  `domain_id` int NOT NULL,
  `table_name` varchar(200) NOT NULL,
  `use_status` varchar(1) NOT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  `update_id` int NOT NULL,
  `update_date` date NOT NULL,
  `temp_trans_id` bigint DEFAULT '0',
  PRIMARY KEY (`space_id`,`data_classify`,`sensor_id`,`domain_id`),
  KEY `interface_save_space_info_idx1` (`sensor_id`,`domain_id`),
  CONSTRAINT `interface_save_space_info_ibfk_1` FOREIGN KEY (`sensor_id`, `domain_id`) REFERENCES `sensor_base_info` (`sensor_id`, `domain_id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interface_save_space_info`
--

LOCK TABLES `interface_save_space_info` WRITE;
/*!40000 ALTER TABLE `interface_save_space_info` DISABLE KEYS */;
INSERT INTO `interface_save_space_info` VALUES (1,'02001',1,1,'realtime_data_record_CDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(2,'02001',2,1,'realtime_data_record_CDS002','Y',1,'2022-10-24',1,'2022-10-24',NULL),(3,'02001',3,1,'realtime_data_record_CDS003','Y',1,'2022-10-24',1,'2022-10-24',NULL),(4,'02004',1,1,'realtime_temp_record_CDS001','Y',1,'2022-10-24',1,'2022-10-24',17684884),(5,'02004',2,1,'realtime_temp_record_CDS002','Y',1,'2022-10-24',1,'2022-10-24',38972331),(6,'02004',3,1,'realtime_temp_record_CDS003','Y',1,'2022-10-24',1,'2022-10-24',14594412),(7,'02001',4,2,'realtime_data_record_BDS001','Y',1,'2022-10-25',1,'2022-10-25',NULL),(8,'02001',5,2,'realtime_data_record_BDS002','Y',1,'2022-10-25',1,'2022-10-25',NULL),(9,'02001',6,2,'realtime_data_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',NULL),(10,'02001',7,2,'realtime_data_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',NULL),(11,'02001',8,2,'realtime_data_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',NULL),(12,'02001',9,2,'realtime_data_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',NULL),(13,'02001',10,2,'realtime_data_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',NULL),(14,'02004',4,2,'realtime_temp_record_BDS001','Y',1,'2022-10-25',1,'2022-10-25',0),(15,'02004',5,2,'realtime_temp_record_BDS002','Y',1,'2022-10-25',1,'2022-10-25',0),(16,'02004',6,2,'realtime_temp_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',0),(17,'02004',7,2,'realtime_temp_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',0),(18,'02004',8,2,'realtime_temp_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',0),(19,'02004',9,2,'realtime_temp_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',0),(20,'02004',10,2,'realtime_temp_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',0),(21,'02002',1,1,'preprocessing_data_record_CDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(22,'02002',2,1,'preprocessing_data_record_CDS002','Y',1,'2022-10-24',1,'2022-10-24',NULL),(23,'02002',3,1,'preprocessing_data_record_CDS003','Y',1,'2022-10-24',1,'2022-10-24',NULL),(24,'02002',4,2,'preprocessing_data_record_BDS001','Y',1,'2022-10-25',1,'2022-10-25',NULL),(25,'02002',5,2,'preprocessing_data_record_BDS002','Y',1,'2022-10-25',1,'2022-10-25',NULL),(26,'02002',6,2,'preprocessing_data_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',NULL),(27,'02002',7,2,'preprocessing_data_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',NULL),(28,'02002',8,2,'preprocessing_data_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',NULL),(29,'02002',9,2,'preprocessing_data_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',NULL),(30,'02002',10,2,'preprocessing_data_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',NULL),(31,'02005',1,1,'preprocessing_temp_record_CDS001','Y',1,'2022-10-24',1,'2022-10-24',1798943),(32,'02005',2,1,'preprocessing_temp_record_CDS002','Y',1,'2022-10-24',1,'2022-10-24',3953943),(33,'02005',3,1,'preprocessing_temp_record_CDS003','Y',1,'2022-10-24',1,'2022-10-24',2966000),(34,'02005',4,2,'preprocessing_temp_record_BDS001','Y',1,'2022-10-25',1,'2022-10-25',0),(35,'02005',5,2,'preprocessing_temp_record_BDS002','Y',1,'2022-10-25',1,'2022-10-25',0),(36,'02005',6,2,'preprocessing_temp_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',0),(37,'02005',7,2,'preprocessing_temp_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',0),(38,'02005',8,2,'preprocessing_temp_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',0),(39,'02005',9,2,'preprocessing_temp_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',0),(40,'02005',10,2,'preprocessing_temp_record_BDS003','Y',1,'2022-10-25',1,'2022-10-25',0),(41,'02001',11,2,'realtime_data_record_BDS003','Y',1,'2022-10-24',1,'2022-10-24',NULL),(42,'02004',11,2,'realtime_temp_record_BDS003','Y',1,'2022-10-24',1,'2022-10-24',0),(43,'02002',11,2,'preprocessing_data_record_BDS003','Y',1,'2022-10-24',1,'2022-10-24',NULL),(44,'02005',11,2,'preprocessing_temp_record_BDS003','Y',1,'2022-10-24',1,'2022-10-24',0),(45,'02001',12,3,'realtime_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(46,'02001',13,3,'realtime_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(47,'02001',14,3,'realtime_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(48,'02001',15,3,'realtime_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(49,'02001',16,3,'realtime_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(50,'02001',17,3,'realtime_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(51,'02001',18,3,'realtime_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(52,'02001',19,3,'realtime_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(53,'02001',20,3,'realtime_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(54,'02001',21,3,'realtime_data_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',NULL),(55,'02001',22,3,'realtime_data_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',NULL),(56,'02001',23,3,'realtime_data_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',NULL),(57,'02001',24,3,'realtime_data_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',NULL),(58,'02001',25,3,'realtime_data_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',NULL),(59,'02001',26,3,'realtime_data_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',NULL),(60,'02004',12,3,'realtime_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(61,'02004',13,3,'realtime_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(62,'02004',14,3,'realtime_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(63,'02004',15,3,'realtime_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(64,'02004',16,3,'realtime_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(65,'02004',17,3,'realtime_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(66,'02004',18,3,'realtime_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(67,'02004',19,3,'realtime_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(68,'02004',20,3,'realtime_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(69,'02004',21,3,'realtime_temp_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',0),(70,'02004',22,3,'realtime_temp_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',0),(71,'02004',23,3,'realtime_temp_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',0),(72,'02004',24,3,'realtime_temp_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',0),(73,'02004',25,3,'realtime_temp_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',0),(74,'02004',26,3,'realtime_temp_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',0),(75,'02002',12,3,'preprocessing_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(76,'02002',13,3,'preprocessing_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(77,'02002',14,3,'preprocessing_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(78,'02002',15,3,'preprocessing_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(79,'02002',16,3,'preprocessing_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(80,'02002',17,3,'preprocessing_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(81,'02002',18,3,'preprocessing_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(82,'02002',19,3,'preprocessing_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(83,'02002',20,3,'preprocessing_data_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',NULL),(84,'02002',21,3,'preprocessing_data_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',NULL),(85,'02002',22,3,'preprocessing_data_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',NULL),(86,'02002',23,3,'preprocessing_data_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',NULL),(87,'02002',24,3,'preprocessing_data_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',NULL),(88,'02002',25,3,'preprocessing_data_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',NULL),(89,'02002',26,3,'preprocessing_data_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',NULL),(90,'02005',12,3,'preprocessing_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(91,'02005',13,3,'preprocessing_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(92,'02005',14,3,'preprocessing_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(93,'02005',15,3,'preprocessing_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(94,'02005',16,3,'preprocessing_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(95,'02005',17,3,'preprocessing_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(96,'02005',18,3,'preprocessing_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(97,'02005',19,3,'preprocessing_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(98,'02005',20,3,'preprocessing_temp_record_FDS001','Y',1,'2022-10-24',1,'2022-10-24',0),(99,'02005',21,3,'preprocessing_temp_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',0),(100,'02005',22,3,'preprocessing_temp_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',0),(101,'02005',23,3,'preprocessing_temp_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',0),(102,'02005',24,3,'preprocessing_temp_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',0),(103,'02005',25,3,'preprocessing_temp_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',0),(104,'02005',26,3,'preprocessing_temp_record_FDS010','Y',1,'2022-10-24',1,'2022-10-24',0),(105,'02001',27,3,'realtime_data_record_FDS016','Y',1,'2022-10-24',1,'2022-10-24',NULL),(106,'02004',27,3,'realtime_temp_record_FDS016','Y',1,'2022-10-24',1,'2022-10-24',0),(107,'02002',27,3,'preprocessing_data_record_FDS016','Y',1,'2022-10-24',1,'2022-10-24',NULL),(108,'02005',27,3,'preprocessing_temp_record_FDS016','Y',1,'2022-10-24',1,'2022-10-24',0),(109,'02001',28,2,'realtime_data_record_BDS003','Y',1,'2022-10-24',1,'2022-10-24',NULL),(110,'02004',28,2,'realtime_temp_record_BDS003','Y',1,'2022-10-24',1,'2022-10-24',0),(111,'02002',28,2,'preprocessing_data_record_BDS003','Y',1,'2022-10-24',1,'2022-10-24',NULL),(112,'02005',28,2,'preprocessing_temp_record_BDS003','Y',1,'2022-10-24',1,'2022-10-24',0);
/*!40000 ALTER TABLE `interface_save_space_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interface_topic`
--

DROP TABLE IF EXISTS `interface_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interface_topic` (
  `interface_classify` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `interface_type` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `protocol_type` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `domain_id` int NOT NULL,
  `topic_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  PRIMARY KEY (`interface_classify`,`interface_type`,`protocol_type`,`domain_id`,`topic_name`),
  KEY `interface_topic_idx1` (`interface_classify`,`interface_type`,`protocol_type`,`domain_id`),
  CONSTRAINT `interface_topic_ibfk_1` FOREIGN KEY (`interface_classify`, `interface_type`, `protocol_type`, `domain_id`) REFERENCES `domain_interface` (`interface_classify`, `interface_type`, `protocol_type`, `domain_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interface_topic`
--

LOCK TABLES `interface_topic` WRITE;
/*!40000 ALTER TABLE `interface_topic` DISABLE KEYS */;
/*!40000 ALTER TABLE `interface_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_auth_info`
--

DROP TABLE IF EXISTS `member_auth_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member_auth_info` (
  `auth_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `auth_name` varchar(45) NOT NULL,
  PRIMARY KEY (`auth_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_auth_info`
--

LOCK TABLES `member_auth_info` WRITE;
/*!40000 ALTER TABLE `member_auth_info` DISABLE KEYS */;
INSERT INTO `member_auth_info` VALUES (1,1,'ROLE_ADMIN'),(2,1,'ROLE_USER'),(3,2,'ROLE_USER'),(4,3,'ROLE_ADMIN'),(5,3,'ROLE_USER'),(6,4,'ROLE_USER');
/*!40000 ALTER TABLE `member_auth_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_auth_mapping`
--

DROP TABLE IF EXISTS `menu_auth_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_auth_mapping` (
  `menu_id` int NOT NULL,
  `auth_id` int NOT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  PRIMARY KEY (`menu_id`,`auth_id`),
  KEY `menu_auth_mapping_idx1` (`auth_id`),
  CONSTRAINT `menu_auth_mapping_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `menu_info` (`menu_id`),
  CONSTRAINT `menu_auth_mapping_ibfk_2` FOREIGN KEY (`auth_id`) REFERENCES `auth_info` (`auth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_auth_mapping`
--

LOCK TABLES `menu_auth_mapping` WRITE;
/*!40000 ALTER TABLE `menu_auth_mapping` DISABLE KEYS */;
INSERT INTO `menu_auth_mapping` VALUES (1,1,10,'2023-04-10'),(1,2,10,'2023-04-10'),(1,23,10,'2023-04-10'),(1,26,1,'2023-08-09'),(2,1,10,'2023-04-10'),(2,2,10,'2023-04-10'),(2,23,10,'2023-04-10'),(2,26,1,'2023-08-09'),(3,1,10,'2023-04-10'),(3,2,10,'2023-04-10'),(3,23,10,'2023-04-10'),(3,26,1,'2023-08-09'),(4,1,10,'2023-04-10'),(4,2,10,'2023-04-10'),(5,1,10,'2023-04-10'),(5,2,10,'2023-04-10'),(5,23,10,'2023-04-10'),(6,1,10,'2023-04-10'),(6,2,10,'2023-04-10'),(6,25,1,'2023-07-19'),(7,1,10,'2023-04-10'),(7,2,10,'2023-04-10'),(7,23,10,'2023-04-10'),(7,25,1,'2023-07-19'),(8,1,10,'2023-04-10'),(8,2,10,'2023-04-10'),(8,25,1,'2023-07-19'),(9,1,10,'2023-04-10'),(9,2,10,'2023-04-10'),(10,1,10,'2023-04-10'),(10,2,10,'2023-04-10'),(11,2,10,'2023-04-10'),(11,27,1,'2023-08-09'),(12,2,10,'2023-04-10'),(12,27,1,'2023-08-09'),(13,1,10,'2023-04-10'),(13,2,10,'2023-04-10'),(15,1,10,'2023-04-10'),(15,2,10,'2023-04-10'),(16,1,10,'2023-04-10'),(16,2,10,'2023-04-10');
/*!40000 ALTER TABLE `menu_auth_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_info`
--

DROP TABLE IF EXISTS `menu_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_info` (
  `menu_id` int NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(100) NOT NULL,
  `parent_menu` int DEFAULT NULL,
  `menu_url` varchar(300) DEFAULT NULL,
  `menu_desc` varchar(500) DEFAULT NULL,
  `menu_img_path` varchar(100) DEFAULT NULL,
  `menu_level` varchar(20) DEFAULT NULL,
  `menu_order` int DEFAULT NULL,
  `menu_type` varchar(10) NOT NULL,
  `use_status` varchar(1) NOT NULL,
  `delete_status` varchar(1) NOT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  `update_id` int NOT NULL,
  `update_date` date NOT NULL,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_info`
--

LOCK TABLES `menu_info` WRITE;
/*!40000 ALTER TABLE `menu_info` DISABLE KEYS */;
INSERT INTO `menu_info` VALUES (1,'CMS ROOT',0,'/','CMS ROOT 메뉴',NULL,'0',1,'MENU','Y','N',0,'2023-03-10',1,'2023-03-10'),(2,'Dashboard',1,'/#','MAIN 홈 DASH BOARD','bx bx-home-circle','HEADER',1,'MENU','Y','N',0,'2023-03-21',0,'2023-03-21'),(3,'CMS관리',1,'/#','CMS관리','bx bxs-wrench','HEADER',2,'MENU','Y','N',0,'2023-03-21',0,'2023-03-21'),(4,'데이터 모니터링',1,'/#','데이터 모니터링','bx bx-chalkboard','HEADER',4,'MENU','Y','N',0,'2023-03-21',4,'2023-03-21'),(5,'Sample',1,'/#','','bx bx-briefcase-alt','HEADER',999,'MENU','Y','N',0,'2023-03-21',0,'2023-03-21'),(6,'Main',2,'/dashboard','','','SUB_MENU',0,'MENU','Y','N',0,'2023-03-21',0,'2023-03-21'),(7,'게시판',3,'/board','CMS관리 > 게시판','','SUB_MENU',0,'MENU','Y','N',0,'2023-03-21',0,'2023-03-21'),(8,'사용자 관리',3,'/user','CMS관리 > 사용자 관리','','SUB_MENU',1,'MENU','Y','N',0,'2023-03-21',0,'2023-03-21'),(9,'메뉴 관리',3,'/menu','CMS관리 > 메뉴 관리','','SUB_MENU',2,'MENU','Y','N',0,'2023-03-21',0,'2023-03-21'),(10,'공통 코드 관리',3,'/code','CMS관리 > 공통 코드 관리','','SUB_MENU',3,'MENU','Y','N',0,'2023-03-21',0,'2023-03-21'),(11,'권한 관리',3,'/auth','CMS관리 > 권한 관리','','SUB_MENU',4,'MENU','Y','N',0,'2023-03-21',0,'2023-03-21'),(12,'데이터 모니터링',4,'/monitoring','데이터 모니터링 상세 메뉴','','SUB_MENU',0,'MENU','Y','N',0,'2023-03-21',0,'2023-03-21'),(13,'Sample List',5,'/job-list','Sample List','','SUB_MENU',0,'MENU','Y','N',0,'2023-03-21',0,'2023-03-21'),(14,'testtest2222222',11,'/testtest','testtest','','SUB_MENU',1,'MENU','N','N',0,'2023-03-21',10,'2023-03-22'),(15,'ss',9,'sss','','ssss','ROOT',0,'MENU','Y','N',0,'2023-03-23',10,'2023-03-23'),(16,'ㅁㅁㅁ',15,'ㅁㅁㅁ','','','DETAIL_FUNC',0,'FUNC','Y','N',0,'2023-03-23',0,'2023-03-23');
/*!40000 ALTER TABLE `menu_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_info`
--

DROP TABLE IF EXISTS `notice_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_info` (
  `notice_id` int NOT NULL AUTO_INCREMENT,
  `notice_classify` varchar(10) NOT NULL,
  `title` varchar(200) NOT NULL,
  `contents` text NOT NULL,
  `read_cnd` int NOT NULL,
  `delete_status` varchar(1) NOT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  `update_id` int NOT NULL,
  `update_date` date NOT NULL,
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_info`
--

LOCK TABLES `notice_info` WRITE;
/*!40000 ALTER TABLE `notice_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_base_info`
--

DROP TABLE IF EXISTS `sensor_base_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_base_info` (
  `sensor_id` int NOT NULL AUTO_INCREMENT,
  `domain_id` int NOT NULL,
  `sensor_type` varchar(10) NOT NULL,
  `sensor_identifier` varchar(20) NOT NULL,
  `sensor_name` varchar(200) NOT NULL,
  `visual_x` float DEFAULT NULL,
  `visual_y` float DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `btmac_address` varchar(50) DEFAULT NULL,
  `wifi_mac_address` varchar(50) DEFAULT NULL,
  `ip_address` varchar(15) DEFAULT NULL,
  `operational_status` varchar(1) NOT NULL,
  `use_status` varchar(1) NOT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  `update_id` int NOT NULL,
  `update_date` date NOT NULL,
  PRIMARY KEY (`sensor_id`,`domain_id`),
  UNIQUE KEY `sensor_identifier_UNIQUE` (`sensor_identifier`),
  KEY `sensor_base_info_idx1` (`domain_id`),
  CONSTRAINT `sensor_base_info_ibfk_1` FOREIGN KEY (`domain_id`) REFERENCES `domain_base_info` (`domain_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_base_info`
--

LOCK TABLES `sensor_base_info` WRITE;
/*!40000 ALTER TABLE `sensor_base_info` DISABLE KEYS */;
INSERT INTO `sensor_base_info` VALUES (1,1,'01001','CDS001','작물보호제생산팀 RTO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(2,1,'01001','CDS002','폐수처리장 부지경계',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(3,1,'01001','CDS003','안전환경 옥상(울주군 설치)',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(4,2,'01001','BDS001','가속도센서1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(5,2,'01001','BDS002','가속도센서2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(6,2,'01001','BDS003','표면온도센서',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(7,2,'01001','BDS004','대기온도센서',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(8,2,'01001','BDS005','기울기센서1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(9,2,'01001','BDS007','신축이음센서1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(10,2,'01001','BDS008','신축이음센서2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(11,2,'01001','BDS006','기울기센서2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(12,3,'01001','FDS001','3-in-1 Air sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(13,3,'01001','FDS002','3-in-1 Air sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(14,3,'01001','FDS003','3-in-1 Air sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(15,3,'01001','FDS004','3-in-1 Air sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(16,3,'01001','FDS005','3-in-1 Air sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(17,3,'01001','FDS006','3-in-1 Air sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(18,3,'01001','FDS007','3-in-1 Air sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(19,3,'01001','FDS008','3-in-1 Air sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(20,3,'01001','FDS009','3-in-1 Air sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(21,3,'01001','FDS010','Air NH3 sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(22,3,'01001','FDS011','Air NH3 sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(23,3,'01001','FDS012','Air NH3 sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(24,3,'01001','FDS013','Air NH3 sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(25,3,'01001','FDS014','Air NH3 sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(26,3,'01001','FDS015','Air NH3 sensor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(27,3,'01001','FDS016','Weather Station',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(28,2,'01001','BSD009','수위센서',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2022-10-19',1,'2022-10-19'),(29,3,'01001','FDS017','FAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2023-07-14',1,'2023-07-14'),(30,3,'01001','FDS018','FAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2023-07-14',1,'2023-07-14'),(31,3,'01001','FDS019','FAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2023-07-14',1,'2023-07-14'),(32,3,'01001','FDS020','DOOR',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Y','Y',1,'2023-07-14',1,'2023-07-14');
/*!40000 ALTER TABLE `sensor_base_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_metrics_info`
--

DROP TABLE IF EXISTS `sensor_metrics_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_metrics_info` (
  `metrics_info_id` int NOT NULL AUTO_INCREMENT,
  `sensor_id` int NOT NULL,
  `domain_id` int NOT NULL,
  `ko_metrics_nm` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `en_abbreviation` varchar(100) DEFAULT NULL,
  `metrics_identifier` varchar(20) NOT NULL,
  `notice_threshold` float DEFAULT NULL,
  `attention_threshold` float DEFAULT NULL,
  `warning_threshold` float DEFAULT NULL,
  `limit_threshold` float DEFAULT NULL,
  `use_status` varchar(1) NOT NULL,
  `metrics_unit` varchar(20) DEFAULT NULL,
  `metrics_desc` varchar(200) DEFAULT NULL,
  `create_date` date NOT NULL,
  `create_id` int NOT NULL,
  `update_id` int NOT NULL,
  `update_date` date NOT NULL,
  `metrics_master_id` int DEFAULT NULL,
  PRIMARY KEY (`metrics_info_id`,`sensor_id`,`domain_id`),
  KEY `sensor_metrics_info_idx1` (`sensor_id`,`domain_id`),
  KEY `sensor_metrics_info_idx2` (`metrics_master_id`),
  CONSTRAINT `sensor_metrics_info_ibfk_1` FOREIGN KEY (`sensor_id`, `domain_id`) REFERENCES `sensor_base_info` (`sensor_id`, `domain_id`),
  CONSTRAINT `sensor_metrics_info_ibfk_2` FOREIGN KEY (`metrics_master_id`) REFERENCES `sensor_metrics_master` (`metrics_master_id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_metrics_info`
--

LOCK TABLES `sensor_metrics_info` WRITE;
/*!40000 ALTER TABLE `sensor_metrics_info` DISABLE KEYS */;
INSERT INTO `sensor_metrics_info` VALUES (1,1,1,'황화수소','H2S','CDS001MT01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',1),(2,1,1,'암모니아','NH3','CDS001MT02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',2),(3,1,1,'총휘발성유기화합물','TVOC','CDS001MT03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',3),(4,1,1,'복합악취','OU','CDS001MT04',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',4),(5,1,1,'풍향','W-DIR','CDS001MT05',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(6,1,1,'풍속','W-SPD','CDS001MT06',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(7,2,1,'황화수소','H2S','CDS002MT01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',5),(8,2,1,'암모니아','NH3','CDS002MT02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',6),(9,2,1,'총휘발성유기화합물','TVOC','CDS002MT03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',7),(10,2,1,'복합악취','OU','CDS002MT04',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',8),(11,2,1,'온도','TEMP','CDS002MT05',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(12,2,1,'습도','HUMID','CDS002MT06',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(13,2,1,'풍향','W-DIR','CDS002MT07',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(14,2,1,'풍속','W-SPD','CDS002MT08',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(15,2,1,'기압','PRESS','CDS002MT09',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(16,2,1,'일사량','SOLAR','CDS002MT10',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(17,3,1,'황화수소','H2S','CDS003MT01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',9),(18,3,1,'암모니아','NH3','CDS003MT02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',10),(19,3,1,'총휘발성유기화합물','TVOC','CDS003MT03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',11),(20,3,1,'복합악취','OU','CDS003MT04',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',12),(21,3,1,'풍향','W-DIR','CDS003MT05',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(22,3,1,'풍속','W-SPD','CDS003MT06',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(23,4,2,'가속도','AC','BDS001MT01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(24,4,2,'RMS','RMS','BDS001MT02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(25,4,2,'P-P','PP','BDS001MT03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(26,4,2,'FFT','FFT','BDS001MT04',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(27,5,2,'가속도','AC','BDS002MT01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(28,5,2,'RMS','RMS','BDS002MT02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(29,5,2,'P-P','PP','BDS002MT03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(30,5,2,'FFT','FFT','BDS002MT04',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(31,6,2,'온도','TMP','BDS003MT01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(32,7,2,'온도','TMP','BDS004MT01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(33,8,2,'기울기(X)','DEG','BDS005MT01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(34,8,2,'기울기(Y)','DEG','BDS005MT02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(35,11,2,'기울기(X)','DEG','BDS006MT01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(36,11,2,'기울기(Y)','DEG','BDS006MT02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(37,9,2,'신축이음','ITV','BDS007MT01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(38,10,2,'신축이음','ITV','BDS008MT01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(39,12,3,'온도','TEMP','FDS001T01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(40,12,3,'습도','HUMID','FDS001H01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(41,12,3,'이산화탄소','CO2','FDS001C01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(42,13,3,'온도','TEMP','FDS001T02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(43,13,3,'습도','HUMID','FDS001H02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(44,13,3,'이산화탄소','CO2','FDS001C02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(45,14,3,'온도','TEMP','FDS001T03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(46,14,3,'습도','HUMID','FDS001H03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(47,14,3,'이산화탄소','CO2','FDS001C03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(48,15,3,'온도','TEMP','FDS001T04',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(49,15,3,'습도','HUMID','FDS001H04',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(50,15,3,'이산화탄소','CO2','FDS001C04',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(51,16,3,'온도','TEMP','FDS001T05',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(52,16,3,'습도','HUMID','FDS001H05',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(53,16,3,'이산화탄소','CO2','FDS001C05',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(54,17,3,'온도','TEMP','FDS001T06',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(55,17,3,'습도','HUMID','FDS001H06',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(56,17,3,'이산화탄소','CO2','FDS001C06',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(57,18,3,'온도','TEMP','FDS001T07',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(58,18,3,'습도','HUMID','FDS001H07',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(59,18,3,'이산화탄소','CO2','FDS001C07',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(60,19,3,'온도','TEMP','FDS001T08',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(61,19,3,'습도','HUMID','FDS001H08',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(62,19,3,'이산화탄소','CO2','FDS001C08',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(63,20,3,'온도','TEMP','FDS001T09',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(64,20,3,'습도','HUMID','FDS001H09',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(65,20,3,'이산화탄소','CO2','FDS001C09',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(66,21,3,'암모니아','NH3','FDS001N01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(67,22,3,'암모니아','NH3','FDS001N02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(68,23,3,'암모니아','NH3','FDS001N03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(69,24,3,'암모니아','NH3','FDS001N04',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(70,25,3,'암모니아','NH3','FDS001N05',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(71,26,3,'암모니아','NH3','FDS001N06',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(72,27,3,'외부온도','TEMP','FDS016W01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(73,27,3,'외부습도','HUMID','FDS016W02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(74,27,3,'외부 이산화 탄소','CO2','FDS016W03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(75,27,3,'풍속','WIND SPEED','FDS016W04',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(76,27,3,'풍향','WIND DIRECTION','FDS016W05',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(77,27,3,'일사량','INSOLATION','FDS016W06',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(78,27,3,'일일 강우량','RAINFALL_DAY','FDS016W07',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(79,27,3,'순시 강우량','RAINFALL_NOW','FDS016W08',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(80,27,3,'전일 강우량','RAINFALL_PREV','FDS016W09',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(81,27,3,'적산 강우량','RAINFALL_INTEGRATION','FDS016W10',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(82,27,3,'시간당 강우량','RAINFALL_HOUR','FDS016W11',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(83,28,2,'수위','WLV','BSD009MT01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2022-10-19',1,1,'2022-10-19',NULL),(89,29,3,'환기팬 구동률','FAN_RATE','FDS017F01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(90,29,3,'환기팬 RPM','FAN_RPM','FDS017R01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(91,29,3,'환기팬 전압','FAN_VOLT','FDS017V01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(92,29,3,'환기팬 전류','FAN_CURRENT','FDS017C01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(93,29,3,'환기팬 전력','FAN_POWER','FDS017P01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(94,30,3,'환기팬 구동률','FAN_RATE','FDS017F02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(95,30,3,'환기팬 RPM','FAN_RPM','FDS017R02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(96,30,3,'환기팬 전압','FAN_VOLT','FDS017V02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(97,30,3,'환기팬 전류','FAN_CURRENT','FDS017C02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(98,30,3,'환기팬 전력','FAN_POWER','FDS017P02',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(99,31,3,'환기팬 구동률','FAN_RATE','FDS017F03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(100,31,3,'환기팬 RPM','FAN_RPM','FDS017R03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(101,31,3,'환기팬 전압','FAN_VOLT','FDS017V03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(102,31,3,'환기팬 전류','FAN_CURRENT','FDS017C03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(103,31,3,'환기팬 전력','FAN_POWER','FDS017P03',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL),(104,32,3,'도어개폐상태','DOOR_STATE','FDS020D01',NULL,NULL,NULL,NULL,'Y',NULL,NULL,'2023-07-14',1,1,'2023-07-14',NULL);
/*!40000 ALTER TABLE `sensor_metrics_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_metrics_master`
--

DROP TABLE IF EXISTS `sensor_metrics_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_metrics_master` (
  `metrics_master_id` int NOT NULL AUTO_INCREMENT,
  `ko_metrics_nm` varchar(100) NOT NULL,
  `en_abbreviation` varchar(100) DEFAULT NULL,
  `notice_threshold` float DEFAULT NULL,
  `attention_threshold` float DEFAULT NULL,
  `warning_threshold` float DEFAULT NULL,
  `limit_threshold` float DEFAULT NULL,
  `use_status` varchar(1) NOT NULL,
  `metrics_unit` varchar(20) DEFAULT NULL,
  `metrics_master_desc` varchar(200) DEFAULT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  `update_id` int NOT NULL,
  `update_date` date NOT NULL,
  PRIMARY KEY (`metrics_master_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_metrics_master`
--

LOCK TABLES `sensor_metrics_master` WRITE;
/*!40000 ALTER TABLE `sensor_metrics_master` DISABLE KEYS */;
INSERT INTO `sensor_metrics_master` VALUES (1,'황화수소','H2S',500,700,1000,1000,'Y','ppb',NULL,1,'2022-10-19',1,'2022-10-19'),(2,'암모니아','NH3',1500,2000,2000,3000,'Y','ppb',NULL,1,'2022-10-19',1,'2022-10-19'),(3,'총휘발성유기화합물','TVOC',5000,7000,9000,10000,'Y','ppb',NULL,1,'2022-10-19',1,'2022-10-19'),(4,'복합악취','OU',100,150,250,300,'Y','',NULL,1,'2022-10-19',1,'2022-10-19'),(5,'황화수소','H2S',30,40,50,60,'Y','ppb',NULL,1,'2022-10-19',1,'2022-10-19'),(6,'암모니아','NH3',1400,1600,1800,2000,'Y','ppb',NULL,1,'2022-10-19',1,'2022-10-19'),(7,'총휘발성유기화합물','TVOC',1000,1200,1400,1500,'Y','ppb',NULL,1,'2022-10-19',1,'2022-10-19'),(8,'복합악취','OU',15,20,25,30,'Y','',NULL,1,'2022-10-19',1,'2022-10-19'),(9,'황화수소','H2S',30,40,50,60,'Y','ppb',NULL,1,'2022-10-19',1,'2022-10-19'),(10,'암모니아','NH3',1400,1600,1800,2000,'Y','ppb',NULL,1,'2022-10-19',1,'2022-10-19'),(11,'총휘발성유기화합물','TVOC',320,350,380,410,'Y','ppb',NULL,1,'2022-10-19',1,'2022-10-19'),(12,'복합악취','OU',15,20,25,30,'Y','',NULL,1,'2022-10-19',1,'2022-10-19');
/*!40000 ALTER TABLE `sensor_metrics_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_attatch_info`
--

DROP TABLE IF EXISTS `tb_attatch_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_attatch_info` (
  `boardId` varchar(25) NOT NULL,
  `attatchId` varchar(20) NOT NULL,
  `orgFileNm` varchar(200) NOT NULL,
  `saveFilePath` varchar(100) NOT NULL,
  `fileSize` varchar(10) DEFAULT NULL,
  `fileExt` varchar(20) DEFAULT NULL,
  `saveFileNm` varchar(200) NOT NULL,
  `createId` int NOT NULL,
  `createDate` varchar(25) NOT NULL,
  PRIMARY KEY (`boardId`,`attatchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_attatch_info`
--

LOCK TABLES `tb_attatch_info` WRITE;
/*!40000 ALTER TABLE `tb_attatch_info` DISABLE KEYS */;
INSERT INTO `tb_attatch_info` VALUES ('BD00007','AT00039','thomas-vimare-IZ01rjX0XQA-unsplash.jpg','/Users/to21comms/saveFolder/','596765',NULL,'1678259619514thomas-vimare-IZ01rjX0XQA-unsplash.jpg',1,'2023-03-08 16:13:39'),('BD00007','AT00041','DU54FF9.jpeg','/Users/to21comms/saveFolder/','1377628',NULL,'1678259619614DU54FF9.jpeg',1,'2023-03-08 16:13:39'),('BD00007','AT00059','yoal-desurmont-jqgsM3B9Fpo-unsplash.jpg','/Users/to21comms/saveFolder/','3550037',NULL,'1678696796720yoal-desurmont-jqgsM3B9Fpo-unsplash.jpg',1,'2023-03-13 17:39:56'),('BD00007','AT00061','silas-baisch-K785Da4A_JA-unsplash.jpg','/Users/to21comms/saveFolder/','1170354',NULL,'1678696796819silas-baisch-K785Da4A_JA-unsplash.jpg',1,'2023-03-13 17:39:56'),('BD00007','AT00066','daniel-leone-g30P1zcOzXo-unsplash.jpg','/Users/to21comms/saveFolder/','833978',NULL,'1678841646604daniel-leone-g30P1zcOzXo-unsplash.jpg',1,'2023-03-15 09:54:06'),('BD00016','AT00043','yoal-desurmont-jqgsM3B9Fpo-unsplash.jpg','/Users/to21comms/saveFolder/','3550037',NULL,'1678325018359yoal-desurmont-jqgsM3B9Fpo-unsplash.jpg',1,'2023-03-09 10:23:37'),('BD00016','AT00044','silas-baisch-K785Da4A_JA-unsplash.jpg','/Users/to21comms/saveFolder/','1170354',NULL,'1678325018428silas-baisch-K785Da4A_JA-unsplash.jpg',1,'2023-03-09 10:23:37'),('BD00020','AT00005','thomas-vimare-IZ01rjX0XQA-unsplash.jpg','/Users/to21comms/saveFolder/','596765',NULL,'/Users/to21comms/saveFolder/1678089602238thomas-vimare-IZ01rjX0XQA-unsplash.jpg',0,'2023-03-06 17:00:02'),('BD00020','AT00006','silas-baisch-K785Da4A_JA-unsplash.jpg','/Users/to21comms/saveFolder/','1170354',NULL,'/Users/to21comms/saveFolder/1678089602290silas-baisch-K785Da4A_JA-unsplash.jpg',0,'2023-03-06 17:00:02'),('BD00020','AT00007','christoffer-engstrom-wc9avd2RaN0-unsplash.jpg','/Users/to21comms/saveFolder/','4885952',NULL,'/Users/to21comms/saveFolder/1678089602343christoffer-engstrom-wc9avd2RaN0-unsplash.jpg',0,'2023-03-06 17:00:02'),('BD00020','AT00008','DU54FF9.jpeg','/Users/to21comms/saveFolder/','1377628',NULL,'/Users/to21comms/saveFolder/1678089602390DU54FF9.jpeg',0,'2023-03-06 17:00:02'),('BD00022','AT00009','silas-baisch-K785Da4A_JA-unsplash.jpg','/Users/to21comms/saveFolder/','1170354',NULL,'1678091906936silas-baisch-K785Da4A_JA-unsplash.jpg',0,'2023-03-06 17:38:26'),('BD00022','AT00010','christoffer-engstrom-wc9avd2RaN0-unsplash.jpg','/Users/to21comms/saveFolder/','4885952',NULL,'1678091906986christoffer-engstrom-wc9avd2RaN0-unsplash.jpg',0,'2023-03-06 17:38:26'),('BD00024','AT00011','pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg','/Users/to21comms/saveFolder/','1459369',NULL,'1678092068945pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg',0,'2023-03-06 17:41:08'),('BD00024','AT00012','silas-baisch-K785Da4A_JA-unsplash.jpg','/Users/to21comms/saveFolder/','1170354',NULL,'1678092069003silas-baisch-K785Da4A_JA-unsplash.jpg',0,'2023-03-06 17:41:08'),('BD00024','AT00013','DU54FF9.jpeg','/Users/to21comms/saveFolder/','1377628',NULL,'1678092069050DU54FF9.jpeg',0,'2023-03-06 17:41:08'),('BD00026','AT00014','pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg','/Users/to21comms/saveFolder/','1459369',NULL,'1678150192446pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg',0,'2023-03-07 09:49:52'),('BD00026','AT00015','thomas-vimare-IZ01rjX0XQA-unsplash.jpg','/Users/to21comms/saveFolder/','596765',NULL,'1678150192502thomas-vimare-IZ01rjX0XQA-unsplash.jpg',0,'2023-03-07 09:49:52'),('BD00027','AT00016','pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg','/Users/to21comms/saveFolder/','1459369',NULL,'1678150235751pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg',0,'2023-03-07 09:50:35'),('BD00027','AT00017','thomas-vimare-IZ01rjX0XQA-unsplash.jpg','/Users/to21comms/saveFolder/','596765',NULL,'1678150235798thomas-vimare-IZ01rjX0XQA-unsplash.jpg',0,'2023-03-07 09:50:35'),('BD00028','AT00018','pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg','/Users/to21comms/saveFolder/','1459369',NULL,'1678150268111pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg',0,'2023-03-07 09:51:07'),('BD00028','AT00019','thomas-vimare-IZ01rjX0XQA-unsplash.jpg','/Users/to21comms/saveFolder/','596765',NULL,'1678150268157thomas-vimare-IZ01rjX0XQA-unsplash.jpg',0,'2023-03-07 09:51:08'),('BD00028','AT00065','silas-baisch-K785Da4A_JA-unsplash.jpg','/Users/to21comms/saveFolder/','1170354',NULL,'1678841506859silas-baisch-K785Da4A_JA-unsplash.jpg',1,'2023-03-15 09:51:46'),('BD00029','AT00020','pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg','/Users/to21comms/saveFolder/','1459369',NULL,'1678150364745pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg',0,'2023-03-07 09:52:44'),('BD00029','AT00021','thomas-vimare-IZ01rjX0XQA-unsplash.jpg','/Users/to21comms/saveFolder/','596765',NULL,'1678150364792thomas-vimare-IZ01rjX0XQA-unsplash.jpg',0,'2023-03-07 09:52:44'),('BD00030','AT00024','christoffer-engstrom-wc9avd2RaN0-unsplash.jpg','/Users/to21comms/saveFolder/','4885952',NULL,'1678150803854christoffer-engstrom-wc9avd2RaN0-unsplash.jpg',0,'2023-03-07 10:00:03'),('BD00030','AT00050','silas-baisch-K785Da4A_JA-unsplash.jpg','/Users/to21comms/saveFolder/','1170354',NULL,'1678351526658silas-baisch-K785Da4A_JA-unsplash.jpg',1,'2023-03-09 17:45:26'),('BD00031','AT00025','thomas-vimare-IZ01rjX0XQA-unsplash.jpg','/Users/to21comms/saveFolder/','596765',NULL,'1678169823503thomas-vimare-IZ01rjX0XQA-unsplash.jpg',1,'2023-03-07 15:17:02'),('BD00031','AT00026','silas-baisch-K785Da4A_JA-unsplash.jpg','/Users/to21comms/saveFolder/','1170354',NULL,'1678169823559silas-baisch-K785Da4A_JA-unsplash.jpg',1,'2023-03-07 15:17:02'),('BD00031','AT00027','DU54FF9.jpeg','/Users/to21comms/saveFolder/','1377628',NULL,'1678169823607DU54FF9.jpeg',1,'2023-03-07 15:17:02'),('BD00032','AT00028','thomas-vimare-IZ01rjX0XQA-unsplash.jpg','/Users/to21comms/saveFolder/','596765',NULL,'167817thomas-vimare-IZ01rjX0XQA-unsplash.jpg',1,'2023-03-07 16:54:17'),('BD00032','AT00029','pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg','/Users/to21comms/saveFolder/','1459369',NULL,'167817pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg',1,'2023-03-07 16:54:17'),('BD00033','AT00046','silas-baisch-K785Da4A_JA-unsplash.jpg','/Users/to21comms/saveFolder/','1170354',NULL,'1678348943077silas-baisch-K785Da4A_JA-unsplash.jpg',1,'2023-03-09 17:02:23'),('BD00033','AT00047','christoffer-engstrom-wc9avd2RaN0-unsplash.jpg','/Users/to21comms/saveFolder/','4885952',NULL,'1678348943214christoffer-engstrom-wc9avd2RaN0-unsplash.jpg',1,'2023-03-09 17:02:23'),('BD00039','AT00033','Netty 정리하기.hwp','/Users/to21comms/saveFolder/','27136',NULL,'1678235046820Netty 정리하기.hwp',1,'2023-03-08 09:24:04'),('BD00056','AT00055','silas-baisch-K785Da4A_JA-unsplash.jpg','/Users/to21comms/saveFolder/','1170354',NULL,'1678684133527silas-baisch-K785Da4A_JA-unsplash.jpg',1,'2023-03-13 14:08:53'),('BD00073','AT00052','thomas-vimare-IZ01rjX0XQA-unsplash.jpg','/Users/to21comms/saveFolder/','596765',NULL,'1678683782600thomas-vimare-IZ01rjX0XQA-unsplash.jpg',1,'2023-03-13 14:03:02'),('BD00073','AT00054','pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg','/Users/to21comms/saveFolder/','1459369',NULL,'1678683782711pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg',1,'2023-03-13 14:03:02'),('BD00090','AT00067','daniel-leone-g30P1zcOzXo-unsplash.jpg','/Users/to21comms/saveFolder/','833978','jpg','1678861094033daniel-leone-g30P1zcOzXo-unsplash.jpg',1,'2023-03-15 15:18:13'),('BD00090','AT00068','DU54FF9.jpeg','/Users/to21comms/saveFolder/','1377628','jpeg','1678861094090DU54FF9.jpeg',1,'2023-03-15 15:18:14'),('BD00093','AT00069','thomas-vimare-IZ01rjX0XQA-unsplash.jpg','/Users/to21comms/saveFolder/','596765','jpg','1678869204576thomas-vimare-IZ01rjX0XQA-unsplash.jpg',1,'2023-03-15 17:33:23'),('BD00093','AT00070','pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg','/Users/to21comms/saveFolder/','1459369','jpg','1678869222725pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg',1,'2023-03-15 17:33:41'),('BD00096','AT00071','DU54FF9.jpeg','/Users/to21comms/saveFolder/','1377628','jpeg','1678927040945DU54FF9.jpeg',1,'2023-03-16 09:37:19'),('BD00096','AT00072','thomas-vimare-IZ01rjX0XQA-unsplash.jpg','/Users/to21comms/saveFolder/','596765','jpg','1678927053625thomas-vimare-IZ01rjX0XQA-unsplash.jpg',1,'2023-03-16 09:37:32'),('BD00098','AT00073','Welcome to Hwp.hwp','/Users/to21comms/saveFolder/','23552','hwp','1681189554883Welcome to Hwp.hwp',1,'2023-04-11 14:05:54'),('BD00098','AT00074','Netty 정리하기.hwp','/Users/to21comms/saveFolder/','27136','hwp','1681189554951Netty 정리하기.hwp',1,'2023-04-11 14:05:54'),('BD00099','AT00075','Netty 정리하기.hwp','/Users/to21comms/saveFolder/','27136','hwp','1681191613425Netty 정리하기.hwp',1,'2023-04-11 14:40:13'),('BD00100','AT00076','Netty 정리하기.hwp','/Users/to21comms/saveFolder/','27136','hwp','1681191615224Netty 정리하기.hwp',1,'2023-04-11 14:40:15'),('BD00101','AT00077','Netty 정리하기.hwp','/Users/to21comms/saveFolder/','27136','hwp','1681191615772Netty 정리하기.hwp',1,'2023-04-11 14:40:15'),('BD00102','AT00078','Netty 정리하기.hwp','/Users/to21comms/saveFolder/','27136','hwp','1681191616071Netty 정리하기.hwp',1,'2023-04-11 14:40:16'),('BD00103','AT00079','Netty 정리하기.hwp','/Users/to21comms/saveFolder/','27136','hwp','1681192983505Netty 정리하기.hwp',1,'2023-04-11 15:03:03'),('BD00104','AT00080','Netty 정리하기.hwp','/Users/to21comms/saveFolder/','27136','hwp','1681193022017Netty 정리하기.hwp',1,'2023-04-11 15:03:42'),('BD00106','AT00081','Netty 정리하기.hwp','/Users/to21comms/saveFolder/','27136','hwp','1681193259040Netty 정리하기.hwp',1,'2023-04-11 15:07:39'),('BD00107','AT00082','Netty 정리하기.hwp','/Users/to21comms/saveFolder/','27136','hwp','1681193745367Netty 정리하기.hwp',1,'2023-04-11 15:15:45'),('BD00108','AT00083','Netty 정리하기.hwp','C:\\ADVTS\\Attach','27136','hwp','1681193793943Netty 정리하기.hwp',1,'2023-04-11 15:16:34'),('BD00109','AT00084','search_img3.png','/Users/to21comms/saveFolder/','51633','png','1681193877069search_img3.png',1,'2023-04-11 15:17:57'),('BD00110','AT00085','search_img3.png','/Users/to21comms/saveFolder/','51633','png','1681194109373search_img3.png',1,'2023-04-11 15:21:49'),('BD00111','AT00086','search_img3.png','/Users/to21comms/saveFolder/','51633','png','1681194255683search_img3.png',1,'2023-04-11 15:24:16'),('BD00112','AT00087','리눅스 명령어 모음.txt','/Users/to21comms/saveFolder/','1447','txt','1681194457644리눅스 명령어 모음.txt',1,'2023-04-11 15:27:37'),('BD00113','AT00088','search_img3.png','/Users/to21comms/saveFolder/','51633','png','1681194499553search_img3.png',1,'2023-04-11 15:28:19'),('BD00114','AT00089','thomas-vimare-IZ01rjX0XQA-unsplash.jpg','/Users/to21comms/saveFolder/','596765','jpg','1681194577740thomas-vimare-IZ01rjX0XQA-unsplash.jpg',1,'2023-04-11 15:29:37'),('BD00115','AT00090','리눅스 명령어 모음.txt','C:\\Users\\to21comms\\saveFolder','1447','txt','1681194633457리눅스 명령어 모음.txt',1,'2023-04-11 15:30:33'),('BD00116','AT00091','search_img3.png','C:\\Users\\to21comms\\saveFolder','51633','png','1681194658700search_img3.png',1,'2023-04-11 15:30:58'),('BD00117','AT00092','search_img3.png','C:\\Users\\to21comms\\saveFolder','51633','png','1681194898486search_img3.png',1,'2023-04-11 15:34:58'),('BD00118','AT00093','search_img3.png','C:\\Users\\to21comms\\saveFolder','51633','png','1681195929909search_img3.png',1,'2023-04-11 15:52:10'),('BD00119','AT00094','search_img3.png','C:\\Users\\to21comms\\saveFolder','51633','png','1681200585661search_img3.png',1,'2023-04-11 17:09:45'),('BD00120','AT00095','search_img3.png','C:\\Users\\to21comms\\saveFolder\\','51633','png','1681201270879search_img3.png',1,'2023-04-11 17:21:11'),('BD00121','AT00096','search_img3.png','C:\\Users\\to21comms\\saveFolder\\','51633','png','1681202146346search_img3.png',1,'2023-04-11 17:35:46'),('BD00137','AT00118','주간보고서.txt','C:\\Users\\to21comms\\saveFolder\\','1585','txt','1687402402604주간보고서.txt',1,'2023-06-22 11:53:20'),('BD00139','AT00120','주간보고서.txt','C:\\Users\\to21comms\\saveFolder\\','1585','txt','1687402607031주간보고서.txt',1,'2023-06-22 11:56:45'),('BD00139','AT00122','pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg','/Users/to21comms/saveFolder/','1459369','jpg','1688690828941pawel-nolbert-xe-ss5Tg2mo-unsplash.jpg',1,'2023-07-07 09:47:08'),('BD00139','AT00123','silas-baisch-K785Da4A_JA-unsplash.jpg','/Users/to21comms/saveFolder/','1170354','jpg','1688690848498silas-baisch-K785Da4A_JA-unsplash.jpg',1,'2023-07-07 09:47:27');
/*!40000 ALTER TABLE `tb_attatch_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_board_info`
--

DROP TABLE IF EXISTS `tb_board_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_board_info` (
  `boardId` varchar(25) NOT NULL,
  `boardType` varchar(20) NOT NULL,
  `title` varchar(200) NOT NULL,
  `contents` text NOT NULL,
  `readCnt` int DEFAULT NULL,
  `createId` int NOT NULL,
  `createDate` varchar(25) NOT NULL,
  `updateId` int NOT NULL,
  `updateDate` varchar(25) NOT NULL,
  `useYn` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`boardId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_board_info`
--

LOCK TABLES `tb_board_info` WRITE;
/*!40000 ALTER TABLE `tb_board_info` DISABLE KEYS */;
INSERT INTO `tb_board_info` VALUES ('1','NOTICE','file','test tt',1,2,'2023-03-06 14:58:23',1,'2023-06-21 18:00:41','N'),('2','NOTICE','no file','test ',12,3,'2023-03-06 14:58:52',1,'2023-06-21 18:00:56','N'),('BD00000','NOTICE','test','test',1,1,'2021-01-14 17:47:28',1,'2023-03-07 14:50:43','N'),('BD00001','NOTICE','TEST','TEST',3,1,'2021-01-14 17:53:01',1,'2021-01-14 18:06:20','N'),('BD00002','NOTICE','TAVA 사업 관련 언론매체','안녕하세요.\n TAVA 사업관련해서 언론매체에 홍보된 자료입니다.\n 많이 많이 주변에 홍보 부탁드립니다.\n \n <교통경제>\n \n ‘티머니onda’ 택시 조수석 뒷면에 요금 단말기 설치\n \n http://tbnews.co.kr/news/view.php?idx=1396&mcode=m308jo7\n \n <연합뉴스>\n \n 택시 내부 승객용 단말기 시범사업 업무협약\n \n https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=102&oid=001&aid=0011938918\n \n <뉴시스>\n \n \'티머니onda\' 서울 택시, 뒷좌석에 요금 단말기 설치\n \n https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=101&oid=003&aid=0010123359\n \n <헤럴드경제>\n \n ‘티머니onda’는 택시 정보 뒷좌석에서도 본다\n \n https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=102&oid=016&aid=0001736630\n \n t머니 내부\n https://tmoney.co.kr/aeb/cmnctn/news/readNewsView.dev?bdSeqNo=1693\n \n 연합뉴스 유혜경 기자\n \n https://www.yna.co.kr/view/PYH20201013031400013?section=search\n \n 한국경제tv\n \n http://www.wowtv.co.kr/NewsCenter/News/Read?articleId=A202010130123&t=NN',13,1,'2021-03-29 15:30:18',1,'2023-09-25 14:13:35','Y'),('BD00003','NOTICE','TAVA 관련 보도자료','안녕하세요.\n TAVA 보도자료가 나와서 보내드립니다.\n 좋아요 버튼 눌러주시면 감사하겠습니다.\n \n - https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=101&oid=015&aid=0004482530\n \n - https://news.joins.com/article/23968653',9,3,'2021-03-30 13:35:05',1,'2023-03-28 12:13:35','Y'),('BD00004','NOTICE','TAVA 콘텐츠 홍보, 약사회와 업무협약','안녕하세요.\n TAVA 콘텐츠 홍보관련으로 대한 약사회와 업무협약을 맺었습니다.\n \n http://www.dailypharm.com/Users/News/NewsView.html?ID=272917',6,3,'2021-03-30 13:35:21',1,'2023-03-23 14:51:41','Y'),('BD00005','NOTICE','TAVA 매체 소개서','안녕하세요.\n저희 TAVA 소개 기획안이 나왔습니다.\n첨부된 파일을 다운받아 확인하시길 바랍니다.\n감사합니다.',3,3,'2021-03-30 13:36:02',1,'2023-03-09 13:38:43','Y'),('BD00006','NOTICE','TAVA  소개동영상','안녕하세요.\r\n저희 TAVA 동영상 매체소개서가 나와서 공유드립니다.\r\n첨부된 파일을 다운받아 보시길 바랍니다.\r\n감사합니다.',10,1,'2021-03-30 13:38:33',1,'2023-03-15 17:45:37','Y'),('BD00007','NOTICE','테스트 등록','테스트 등록입니다 !!',19,1,'2021-06-24 14:32:27',1,'2023-08-30 14:09:10','Y'),('BD00016','NOTICE','파일 테스트 ','파일 테스트 입니다. ',10,2,'2023-03-06 16:42:35',1,'2023-03-15 17:45:56','Y'),('BD00020','NOTICE','파일 테스트 ','파일 테스트 입니다. ',0,2,'2023-03-06 17:00:02',2,'2023-03-06 17:00:02','N'),('BD00021','NOTICE','filess','sasdf',0,2,'2023-03-06 17:38:02',2,'2023-03-06 17:38:02','N'),('BD00022','NOTICE','filessqwer','sasdf',6,2,'2023-03-06 17:38:26',2,'2023-03-15 13:42:09','Y'),('BD00026','NOTICE','ddd','qqqq',0,10,'2023-03-07 09:49:52',3,'2023-03-07 09:49:52','N'),('BD00027','NOTICE','ddd','qqqq',0,1,'2023-03-07 09:50:35',3,'2023-03-07 09:50:35','N'),('BD00028','NOTICE','ddd','qqqq',30,2,'2023-03-07 09:51:08',1,'2023-03-15 17:26:14','N'),('BD00029','NOTICE','ddd','qqqq',4,3,'2023-03-07 09:52:44',3,'2023-08-30 14:11:52','Y'),('BD00030','NOTICE','asdfret','qerqwrew',6,2,'2023-03-07 10:00:03',1,'2023-03-13 17:13:39','Y'),('BD00031','NOTICE','attch Test','첨부파일 상세 확인 테스트',8,1,'2023-03-07 15:17:02',1,'2023-03-13 13:25:44','Y'),('BD00032','NOTICE','123','123',4,1,'2023-03-07 16:54:17',1,'2023-03-13 13:25:48','N'),('BD00033','NOTICE','dd','aa aa !! ',4,1,'2023-03-07 17:26:36',1,'2023-03-09 17:40:49','N'),('BD00034','NOTICE','qqqwwer','wwere',0,1,'2023-03-07 17:32:10',1,'2023-03-07 17:32:10','N'),('BD00035','NOTICE','qqqwer','qwerqwerq',0,1,'2023-03-07 17:32:52',1,'2023-03-07 17:32:52','N'),('BD00036','NOTICE','qwerqwe','1qwerqw',0,1,'2023-03-07 17:33:31',1,'2023-03-07 17:33:31','N'),('BD00037','NOTICE','qwqqq','qqqwwqqq',0,1,'2023-03-07 17:34:11',1,'2023-03-07 17:34:11','N'),('BD00038','NOTICE','sqqdddd','werw수정테스트',9,1,'2023-03-07 17:34:55',1,'2023-03-15 13:43:35','N'),('BD00039','NOTICE','게시판 등록','게시판판판 추가',4,1,'2023-03-08 09:24:04',1,'2023-03-15 13:43:25','Y'),('BD00040','NOTICE','업데이투','테스트입니다 테스트 뭐지dddddddd',14,1,'2023-03-08 14:21:27',1,'2023-03-15 17:47:18','Y'),('BD00056','NOTICE','단일 테스트 ','단일 파일 테스트 입니다',20,1,'2023-03-08 20:07:48',1,'2023-07-04 16:24:31','Y'),('BD00057','NOTICE','빈파일 테스트','파일이 없을 때 ',6,1,'2023-03-08 20:14:23',1,'2023-03-15 17:47:03','Y'),('BD00073','NOTICE','삭제 테스트 ','삭제테으스트ㅡ',19,1,'2023-03-13 14:03:02',1,'2023-04-11 15:51:10','Y'),('BD00075','NOTICE','한글파일','테스트트',9,1,'2023-03-13 16:16:58',1,'2023-03-15 17:22:30','N'),('BD00090','NOTICE','asdfsadf','gdfsgd',2,1,'2023-03-15 15:18:00',1,'2023-03-15 15:18:20','N'),('BD00093','NOTICE','da','weq',3,1,'2023-03-15 17:33:13',1,'2023-03-15 17:33:46','Y'),('BD00096','NOTICE','sdafd','qrqwrq',3,1,'2023-03-16 09:37:20',1,'2023-06-21 17:27:20','Y'),('BD00098','NOTICE','테스트','테스트트트',3,1,'2023-04-11 14:05:54',1,'2023-04-11 15:49:00','Y'),('BD00112','NOTICE','ddddd','sssss',0,1,'2023-04-11 15:27:37',1,'2023-04-11 15:27:37','Y'),('BD00113','NOTICE','dsad','asdad',1,1,'2023-04-11 15:28:19',1,'2023-04-11 15:43:30','Y'),('BD00114','NOTICE','qwer','qwer',3,1,'2023-04-11 15:29:37',1,'2023-04-11 15:48:37','Y'),('BD00118','NOTICE','테스트으으으','ㄴㅇㅁㄴㅇㅇㄴㅁㅇㅁ',4,1,'2023-04-11 15:52:10',1,'2023-06-30 11:45:12','Y'),('BD00119','NOTICE','다운로드 테스트','다운로드 테스트',1,1,'2023-04-11 17:09:45',1,'2023-07-04 16:24:20','Y'),('BD00120','NOTICE','테스트 final','내용 입력',3,1,'2023-04-11 17:21:11',1,'2023-07-05 11:09:39','Y'),('BD00121','NOTICE','테스트도전','테스트도전',8,1,'2023-04-11 17:35:46',1,'2023-07-06 17:51:37','Y'),('BD00137','NOTICE','ㅁㅁㅁ','ㅁㅁㅁㅁ',2,1,'2023-06-22 11:53:20',1,'2023-07-04 17:18:57','Y'),('BD00139','NOTICE','ㅑ쇼ㅕ','ㅛ셔ㅛ셔쇼ㅕ',17,1,'2023-06-22 11:56:45',1,'2023-07-17 14:23:30','Y'),('BD0223123','NOTICE','test22222','test22222',2,2,'2023-09-25 16:25:08',2,'2023-09-25 16:25:08','Y'),('BD2333','NOTICE','test22222','test22222',2,1,'2023-09-25 16:23:58',1,'2023-09-25 16:23:58','Y'),('test','NOTICE','asdfd','qwe1212',39,1,'2023-02-16 11:06:22',1,'2023-06-23 10:26:43','N'),('test2','NOTICE','테스트입니다','안녕하세요 테스트입니다 ! ㅎㅎ',8,1,'2023-02-16 14:23:25',1,'2023-02-17 16:25:53','N');
/*!40000 ALTER TABLE `tb_board_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_book_info`
--

DROP TABLE IF EXISTS `tb_book_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_book_info` (
  `bookId` varchar(20) NOT NULL,
  `productCode` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `author` varchar(45) DEFAULT NULL,
  `publicDate` varchar(45) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `inStockYn` varchar(45) DEFAULT NULL COMMENT '재고여부',
  `inStockCnt` varchar(45) DEFAULT NULL COMMENT '재고개수',
  `category` varchar(45) DEFAULT NULL COMMENT '구분,분류',
  `price` varchar(10) DEFAULT NULL,
  `tagId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_book_info`
--

LOCK TABLES `tb_book_info` WRITE;
/*!40000 ALTER TABLE `tb_book_info` DISABLE KEYS */;
INSERT INTO `tb_book_info` VALUES ('2',NULL,'신데렐라','그림 동화','2022-01-10','어려서 부모를 잃고 계모와 언니들한테 구박 받는 인생을 살지만 요정이 마법으로 만든 호박마차와 유리구두 한 짝 덕분에 왕자와 결혼하여 왕자비로서 인생역전하는 여인의 이야기이다.','Y','23','어린이/동화','10,000',NULL),('4',NULL,'잭과콩나무222',NULL,'2022-02-13','영국 잉글랜드 지방의 대표적 민화로 \'재크와 콩나무\'라는 제목으로도 알려져 있다.','Y','42','어린이/동화','2,000',NULL),('5',NULL,'미녀와야수','월트 디즈니 피처 애니메이션','2022-01-22','사나운 마녀의 저주를 받아 야수의 모습이 된 성주인 왕자가 있었는데, 우연히 자신의 성에 들어온 상인을 하룻밤 재워주게 되었다. ','N','0','어린이/동화','3,000',NULL),('BK-0001',NULL,'자바의정석','자바의정석','2022-03-05','','Y','51','참고서','10,000',NULL),('BK-0002',NULL,'‘어차피‘라는 말 앞에 무너지지 말자고','이슬아의 첫 칼럼집','2023-02-14','이슬아의 첫 칼럼집','Y','23','소설/문학','23,000',NULL),('BK-0003',NULL,'신들은 죽임당하지 않을 것이다','켄리우','2017-06-27','『종이 동물원』의 작가 켄 리우의 한국판 두 번째 오리지널 SF 단편선','N','0','소설/문학','20,000',NULL),('BK-0004',NULL,'날씨와 얼굴','이슬아','2022-05-27','날씨와 얼굴','Y','23','소설/문학','23,000',NULL),('BK-0005',NULL,'asd','fasf','2023-02-06','faf','N','0','','2323',NULL),('BK-0006',NULL,'gagag','adgag','2023-02-02','fasf','N','0','','232',NULL),('BK-0007',NULL,'fafaf','sfaf','2023-02-07','sdadsad','Y','242','','23441',NULL),('BK-0008',NULL,'fffff','fffff','2023-02-09','afasf','Y','24','참고서','23444',NULL),('BK-0009',NULL,'ggggg','ggggg','2023-02-10','gasg','N','0','','3',NULL),('BK-0010',NULL,'sdasdad','sdadada','2023-02-15','asdad','N','0','','23441',NULL),('BK-0011',NULL,'afagaga','asgag','2023-02-15','dasda','N','0','','34343',NULL),('BK-0012',NULL,'ggsdgsg','sdgsg','2023-02-07','gsdgs','N','0','','232',NULL),('BK-0013',NULL,'fsdfs','gsdgs','2023-02-07','sdgs','N','0','','3434',NULL),('BK-0014',NULL,'fasfsaf','asfaf','2023-02-12','afaf','N','0','','3434',NULL),('BK-0015',NULL,'asfasfaa','asfa','2023-02-08','fasfas','N','0','','3434',NULL),('BK-0016',NULL,'affafaf','asfasfaf','2023-02-17','fasf','N','0','','3434',NULL),('BK-0017',NULL,'sdf','sgs','2023-02-06','gsg','N','0','','34',NULL),('BK-0018',NULL,'asf','safaf','2023-02-16','asfa','N','0','','20,000',NULL),('BK-0019',NULL,'fasfasf','agag','2023-02-15','agag','N','0','','232',NULL),('BK-0020',NULL,'fsafa','asfas','2023-02-09','asfaf','Y','4','','34',NULL),('BK-0021',NULL,'ㅁㄴㅁㄹ','ㅁㄴㄻㄹ','2023-02-16','ㄻㄹ','N','0','','20,000',NULL),('BK-0022',NULL,'ㅁㄴㄻㄴㄹ','ㅁㄴㄻㄹ','2023-02-08','ㄻㄴㄹ','N','0','','20,000',NULL),('BK-0023',NULL,'gagag','agag','2023-02-07','asfasf','N','0','','3434',NULL),('BK-0024',NULL,'asfaf','afas','2023-02-08','asfa','N','0','','sfasf',NULL),('BK-0025',NULL,'ㅎㅎㅎ','ㅎㅎㅎ','2023-01-31','ㄹㄴㄹ','N','0','','3232',NULL),('BK-0026',NULL,'ㄴㄴㄴㄴ','ㄴㄴㄴㄴ','2023-02-09','ㅇㄴㅇㄴ','N','0','','3434',NULL),('BK-0027',NULL,'ㄶㅇㅎㄴ','ㅇㅎㄴ','2023-02-09','ㅇㅎㄴ','N','0','','20,000',NULL),('BK-0028',NULL,'ㅁㄴㅇㅁㄴㅇㅁ','ㅁㄴㅇㅁㅇㄴ','2023-01-30','dasda','Y','32323','','20,000',NULL),('BK-0029',NULL,'fsfsfsfsf','fsfff','2023-02-21','asfa','Y','5','어린이/동화','23,000',NULL),('BK-0030',NULL,'sdsd','ssss','2023-02-21','asfa','N','0','','3434',NULL);
/*!40000 ALTER TABLE `tb_book_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_sequence_info`
--

DROP TABLE IF EXISTS `tb_sequence_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_sequence_info` (
  `seqId` varchar(20) NOT NULL,
  `prifixStr` varchar(10) DEFAULT NULL,
  `dateFormat` varchar(25) DEFAULT NULL,
  `curNum` int NOT NULL,
  `maxNum` int DEFAULT NULL,
  `seqDesc` varchar(500) DEFAULT NULL,
  `curNumSize` int NOT NULL,
  `connStr` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`seqId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_sequence_info`
--

LOCK TABLES `tb_sequence_info` WRITE;
/*!40000 ALTER TABLE `tb_sequence_info` DISABLE KEYS */;
INSERT INTO `tb_sequence_info` VALUES ('BOARD_ATTACH_ID','AT','',124,99999,'ATID',5,''),('BOARD_ID','BD','',144,99999,'BOARD_ID',5,'');
/*!40000 ALTER TABLE `tb_sequence_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `update_event_trigger_record`
--

DROP TABLE IF EXISTS `update_event_trigger_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `update_event_trigger_record` (
  `event_trugger_id` int NOT NULL,
  `event_trigger_time` timestamp(6) NOT NULL,
  `docker_image_id` int NOT NULL,
  `event_result_code` varchar(10) NOT NULL,
  `event_result_detail` varchar(200) NOT NULL,
  PRIMARY KEY (`event_trugger_id`),
  KEY `update_event_trigger_record_ibfk1_idx` (`docker_image_id`),
  CONSTRAINT `update_event_trigger_record_ibfk1` FOREIGN KEY (`docker_image_id`) REFERENCES `vs_docker_image_info` (`docker_image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `update_event_trigger_record`
--

LOCK TABLES `update_event_trigger_record` WRITE;
/*!40000 ALTER TABLE `update_event_trigger_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `update_event_trigger_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_auth_grant_mapping`
--

DROP TABLE IF EXISTS `user_auth_grant_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_auth_grant_mapping` (
  `auth_id` int NOT NULL,
  `user_id` int NOT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  PRIMARY KEY (`auth_id`,`user_id`),
  KEY `user_auth_grant_mapping_idx1` (`user_id`),
  CONSTRAINT `user_auth_grant_mapping_ibfk_1` FOREIGN KEY (`auth_id`) REFERENCES `auth_info` (`auth_id`),
  CONSTRAINT `user_auth_grant_mapping_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_auth_grant_mapping`
--

LOCK TABLES `user_auth_grant_mapping` WRITE;
/*!40000 ALTER TABLE `user_auth_grant_mapping` DISABLE KEYS */;
INSERT INTO `user_auth_grant_mapping` VALUES (1,45,10,'2023-07-12'),(3,44,10,'2023-07-12'),(3,46,44,'2023-07-14');
/*!40000 ALTER TABLE `user_auth_grant_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `login_id` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_num` varchar(15) DEFAULT NULL,
  `approv_Yn` varchar(1) NOT NULL DEFAULT 'N',
  `use_status` varchar(1) NOT NULL DEFAULT 'Y',
  `refresh_token` varchar(1000) DEFAULT NULL,
  `create_id` int NOT NULL,
  `create_date` date NOT NULL,
  `update_id` int NOT NULL,
  `update_date` date NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `login_id_UNIQUE` (`login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'admin@to21.co.kr','1234','관리자','admin@to21.co.kr',NULL,'Y','Y','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTU3Mjc4MDZ9.P-9POA7CP4NrMVsRuULH6mPULTfI5v6E6gXCDFdBTV57_aURC_EnuUqIj5VQgeiRyrW8GASEcceXxaOgrYyt_w',1,'2022-10-19',1,'2022-10-19'),(2,'test2@naver.com','3333','test2','test2@naver.com',NULL,'Y','Y','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTQ0Mjc2Nzh9.BXSHLqxrhuesh2Bqie_nm-5nFoZOztUs6EFXlAotiTUsMqrbV2rr8AZhUI5nCngTc7m-mlET6ysTpZY2KexG_A',1,'2022-10-19',1,'2022-10-19'),(3,'test3@naver.com','4556','test3','test3@naver.com',NULL,'N','Y',NULL,1,'2022-10-19',1,'2022-10-19'),(4,'AB222C@naver.com','1111','김경진','AB222C@naver.com',NULL,'N','Y',NULL,1,'2023-03-02',1,'2023-03-02'),(44,'user','1234','사용자권한','test4@naver.com','01011111111','N','Y',NULL,0,'2023-07-12',44,'2023-07-12'),(45,'manager','1234','관리자권한','test4@naver.com','01011111111','N','Y',NULL,0,'2023-07-12',0,'2023-07-12'),(46,'user1','1234','사용자테스트','test4@naver.com','01011111111','N','Y',NULL,0,'2023-07-14',0,'2023-07-14');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-26 17:56:41
