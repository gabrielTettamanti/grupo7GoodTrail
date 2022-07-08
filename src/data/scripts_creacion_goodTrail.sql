DROP DATABASE IF EXISTS goodTrail_db;
CREATE DATABASE goodTrail_db;
USE goodTrail_db;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user`; 
CREATE TABLE `user` (
	`id` int(10) unsigned NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL, 
    `password` VARCHAR(50) NOT NULL,
    `image` VARCHAR(50) NOT NULL,
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
    `map` VARCHAR(100) NOT NULL,
    `user` int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `experience_user_foreign` FOREIGN KEY(`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`experiece_image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `experiece_image`; 
CREATE TABLE `experiece_image` (
	`id` int(10) unsigned NOT NULL,
    `url` VARCHAR(50) NOT NULL,
    `experience` int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `experience_image_experience_foreign` FOREIGN KEY(`experience`) REFERENCES `experience` (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`offer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `offer`; 
CREATE TABLE `offer` (
	`id` int(10) unsigned NOT NULL,
    `status` tinyint unsigned NOT NULL,
    `discount` DECIMAL(3,1) NOT NULL,
    `time` int NOT NULL,
    `experience` int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `offer_experience_foreign` FOREIGN KEY(`experience`) REFERENCES `experience` (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`favourite_experience`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `favourite_experience`;
CREATE TABLE `favourite_experience` (
	`id` int(10) unsigned NOT NULL,
    `user` int(10) unsigned NOT NULL,
    `experience` int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `favourite_experience_user_foreign` FOREIGN KEY(`user`) REFERENCES `user` (`id`),
    CONSTRAINT `favourite_experience_experience_foreign` FOREIGN KEY(`experience`) REFERENCES `experience` (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`cart_experience`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cart_experience`;
CREATE TABLE `cart_experience` (
	`id` int(10) unsigned NOT NULL,
    `user` int(10) unsigned NOT NULL,
    `experience` int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `cart_experience_user_foreign` FOREIGN KEY(`user`) REFERENCES `user` (`id`),
    CONSTRAINT `cart_experience_experience_foreign` FOREIGN KEY(`experience`) REFERENCES `experience` (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
	`id` int(10) unsigned NOT NULL,
    `rating` DECIMAL(2,1) unsigned NOT NULL,
    `experience` int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `rating_experience_foreign` FOREIGN KEY(`experience`) REFERENCES `experience` (`id`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `goodTrail_db`.`user_rate`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_rate`;
CREATE TABLE `user_rate` (
	`id` int(10) unsigned NOT NULL,
    `vote` int unsigned NOT NULL,
    `date` datetime NOT NULL,
    `rating` int(10) unsigned NOT NULL,
    `user`int(10) unsigned NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `user_rate_rating_foreign` FOREIGN KEY(`rating`) REFERENCES `rating` (`id`),
    CONSTRAINT `user_rate_user_foreign` FOREIGN KEY(`user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB;


 
