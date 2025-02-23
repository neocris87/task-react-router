CREATE TABLE `tareas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tarea` varchar(255) NOT NULL,
	`obs` text,
	`estado` enum('Pendiente','Ejecutada') NOT NULL DEFAULT 'Pendiente',
	`user_id` int NOT NULL,
	`updated_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `tareas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(50) NOT NULL,
	`password` varchar(255) NOT NULL,
	`usuario` varchar(50) NOT NULL,
	`updated_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `tareas` ADD CONSTRAINT `tareas_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;