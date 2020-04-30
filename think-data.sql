/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 8.0.19 : Database - thinkdata
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`thinkdata` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `thinkdata`;

/*Table structure for table `thinkface_uface` */

DROP TABLE IF EXISTS `thinkface_uface`;

CREATE TABLE `thinkface_uface` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nickname` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `group` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `uid` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `register_date` int unsigned NOT NULL,
  `update_date` int unsigned NOT NULL,
  `wechat_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `thinkface_uface` */

insert  into `thinkface_uface`(`id`,`username`,`nickname`,`group`,`uid`,`register_date`,`update_date`,`wechat_id`,`token`) values (5,'a88ced97-f9e6-4dd5-8e5a-39bf07625cbd','Something for Nothing','c037838c','2542586c',1586414147,1587866892,NULL,'d760c5e2184a9b55663210b37ea91a19;037942cf0c7301cbd8b5719a2768a2b2;95b35f2ae665f139cbb0e97f90a63b31;d7516f521b041e3ef4d00671b63a558e;29fb006fffae3a6f0961121d846c1eaa;afa65d37688a4c04e4db69edc7081d69;834ffcf61b59830cdd98dcee6d19e15a;dc9ae940c1128b82d6f854689e14b461;');

/*Table structure for table `thinkface_user` */

DROP TABLE IF EXISTS `thinkface_user`;

CREATE TABLE `thinkface_user` (
  `id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `gender` tinyint unsigned NOT NULL DEFAULT '0',
  `birthday` int unsigned NOT NULL DEFAULT '0',
  `register_time` int unsigned NOT NULL DEFAULT '0',
  `last_login_time` int unsigned NOT NULL DEFAULT '0',
  `last_login_ip` varchar(255) NOT NULL DEFAULT '',
  `user_level_id` tinyint unsigned NOT NULL DEFAULT '0',
  `nickname` varchar(60) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `register_ip` varchar(255) NOT NULL DEFAULT '',
  `avatar` varchar(255) NOT NULL DEFAULT '',
  `weixin_openid` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `thinkface_user` */

insert  into `thinkface_user`(`id`,`username`,`password`,`gender`,`birthday`,`register_time`,`last_login_time`,`last_login_ip`,`user_level_id`,`nickname`,`mobile`,`register_ip`,`avatar`,`weixin_openid`) values (4,'a88ced97-f9e6-4dd5-8e5a-39bf07625cbd','',1,0,1586413671,1586490605,'::ffff:192.168.5.123',0,'Something for Nothing','','::ffff:127.0.0.1','https://wx.qlogo.cn/mmopen/vi_32/AZttEFRicvuRRhNaW7tpdiaICA2icItEh6HODn3yMeLw7OEEAMccahYEpicXVHvja3gWq7qSpXKgYOUiaibSgXKcqqGw/132','oKOT25T7p2geC2JzRWi941IyBwK8');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
