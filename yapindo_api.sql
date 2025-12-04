CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Studio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studio_number` int NOT NULL,
  `seat_capacity` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `studio_number` (`studio_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `duration_minutes` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Showtime` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movie_id` int NOT NULL,
  `studio_id` int NOT NULL,
  `start_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_id` (`movie_id`),
  KEY `studio_id` (`studio_id`),
  CONSTRAINT `Showtime_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `Movie` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Showtime_ibfk_2` FOREIGN KEY (`studio_id`) REFERENCES `Studio` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `showtime_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `showtime_id` (`showtime_id`),
  CONSTRAINT `Booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Booking_ibfk_2` FOREIGN KEY (`showtime_id`) REFERENCES `Showtime` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `BookedSeat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `seat_number` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `BookedSeat_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `Booking` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;