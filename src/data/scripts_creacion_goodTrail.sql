DROP DATABASE IF EXISTS goodTrail_db;
CREATE DATABASE goodTrail_db;
USE goodTrail_db;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`user`
-- ---------cart_experience--------------------------------------------
DROP TABLE IF EXISTS `user`; 
CREATE TABLE `user` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT, 
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL, 
    `password` VARCHAR(100) NOT NULL,
    `image` VARCHAR(50) NOT NULL,
    `bio` VARCHAR(500),
    PRIMARY KEY(`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`experiences`
-- -----------------------------------------------------
DROP TABLE IF EXISTS experience;
CREATE TABLE experience (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT, 
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(500) 	NOT NULL,
    `category` VARCHAR(50) NOT NULL,
	`location` VARCHAR(100) NOT NULL,
	`people_quantity` int(10) unsigned NOT NULL,
    `duration` int unsigned NOT NULL,
    `duration_type` VARCHAR(10) NOT NULL,
    `currency` VARCHAR(10) NOT NULL, 
    `price` decimal(9,2) unsigned NOT NULL,
    `map_direction` VARCHAR(100) NOT NULL,
    `user_id` int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `experience_user_foreign` FOREIGN KEY(`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`experiece_image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `experience_image`; 
CREATE TABLE `experience_image` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT, 
    `url` VARCHAR(50) NOT NULL,
    `experience_id` int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `experience_image_experience_foreign` FOREIGN KEY(`experience_id`) REFERENCES `experience` (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`offer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `offer`; 
CREATE TABLE `offer` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT, 
    `status` tinyint unsigned NOT NULL,
    `discount` DECIMAL(3,1),
    `limit_date` date,
    `experience_id` int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `offer_experience_foreign` FOREIGN KEY(`experience_id`) REFERENCES `experience` (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`favourite_experience`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `favourite_experience`;
CREATE TABLE `favourite_experience` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT, 
    `user_id` int(10) unsigned NOT NULL,
    `experience_id` int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `favourite_experience_user_foreign` FOREIGN KEY(`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `favourite_experience_experience_foreign` FOREIGN KEY(`experience_id`) REFERENCES `experience` (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`cart_experience`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cart_experience`;
CREATE TABLE `cart_experience` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT, 
    `user_id` int(10) unsigned NOT NULL,
    `experience_id` int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `cart_experience_user_foreign` FOREIGN KEY(`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `cart_experience_experience_foreign` FOREIGN KEY(`experience_id`) REFERENCES `experience` (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT, 
    `rating` DECIMAL(2,1) unsigned NOT NULL,
    `experience_id` int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `rating_experience_foreign` FOREIGN KEY(`experience_id`) REFERENCES `experience` (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`user_rate`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_rating`;
CREATE TABLE `user_rating` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT, 
    `vote` int unsigned NOT NULL,
    `date` datetime NOT NULL,
    `rating_id` int(10) unsigned NOT NULL,
    `user_id`int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `user_rate_rating_foreign` FOREIGN KEY(`rating_id`) REFERENCES `rating` (`id`),
    CONSTRAINT `user_rate_user_foreign` FOREIGN KEY(`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB;


 
