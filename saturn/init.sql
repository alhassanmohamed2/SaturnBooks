CREATE DATABASE IF NOT EXISTS saturn_books;
USE saturn_books;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `imgpath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `Section` varchar(100) NOT NULL,
  `author` varchar(255) NOT NULL,
  `pdfpath` varchar(255) DEFAULT NULL,
  `imgpath` varchar(255) DEFAULT NULL,
  `pages` varchar(50) DEFAULT NULL,
  `buylink` varchar(255) DEFAULT NULL,
  `brief` text DEFAULT NULL,
  `user` varchar(100) DEFAULT NULL,
  `lang` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `visitors` (
  `visitor` int(11) NOT NULL AUTO_INCREMENT,
  `time` time DEFAULT NULL,
  PRIMARY KEY (`visitor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `visitors` (`time`) VALUES (CURRENT_TIME());
INSERT INTO `books` (`name`, `Section`, `author`, `pdfpath`, `imgpath`, `pages`, `buylink`, `brief`, `user`, `lang`) VALUES 
('Example Book', 'Classics', 'Jane Doe', 'books/example.pdf', 'books/images/13bc4258f89bbca754b8ea331d6f5de2-d.gif', '100', '#', 'A great book to read.', 'admin', 'English');
