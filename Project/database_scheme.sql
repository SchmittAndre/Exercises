CREATE TABLE `studentAvatar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatarId` int(11) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `imageUrlInactive` varchar(255) DEFAULT NULL,
  `imageUrlBig` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `avatarId` (`avatarId`)
)

CREATE TABLE `studentToken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) NOT NULL,
  `token` varchar(255) NOT NULL DEFAULT '',
  `type` enum('registration','passwordRecovery','emailChange') NOT NULL,
  `isRedeemed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_token_student1_idx` (`studentId`),
  CONSTRAINT `fk_token_student1` FOREIGN KEY (`studentId`) REFERENCES `student` (`studentId`) ON DELETE NO ACTION ON UPDATE NO ACTION
)

CREATE TABLE `studentLogin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) NOT NULL,
  `tokenId` bigint(20) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_studentLoginToken_student1` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
)

CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) NOT NULL,
  `schoolId` int(11) NOT NULL,
  `forename` varchar(255) NOT NULL DEFAULT '',
  `surname` varchar(255) NOT NULL DEFAULT '',
   `avatarId` INT NOT NULL DEFAULT 2,
   `studentLoginname` varchar(255) NOT NULL DEFAULT '',
   `email` varchar(255) DEFAULT NULL,
   `password` varchar(255) DEFAULT NULL,
   `isActive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_student_school1` FOREIGN KEY (`schoolId`) REFERENCES `school` (`schoolId`) ON DELETE NO ACTION ON UPDATE NO ACTION
)

CREATE TABLE `school` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `schoolId` int(11) NOT NULL,
  `addressId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_school_address1` FOREIGN KEY (`addressId`) REFERENCES `address` (`addressId`) ON DELETE NO ACTION ON UPDATE NO ACTION
)

CREATE TABLE `chapter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chapterId` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
)

CREATE TABLE `competence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `competenceId` int(11) NOT NULL,
  `number` varchar(255) NOT NULL DEFAULT '',
  `version` int(11) NOT NULL DEFAULT '1',
  `teacherText` text NOT NULL,
  `studentText` text NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_chapter_competence` FOREIGN KEY (`chapterId`) REFERENCES `chapter` (`chapterId`) ON DELETE NO ACTION ON UPDATE NO ACTION
)

CREATE TABLE `chapterHasCompetence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chapterId` int(11) NOT NULL,
  `competenceId` int(11) NOT NULL,
  `order` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_chapter_has_expertise_chapter1` FOREIGN KEY (`chapterId`) REFERENCES `chapter` (`chapterId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_chapter_has_expertise_expertise1` FOREIGN KEY (`competenceId`) REFERENCES `competence` (`competenceId`) ON DELETE NO ACTION ON UPDATE NO ACTION
)
