CREATE TABLE `buy` (
	`id` text PRIMARY KEY NOT NULL,
	`card_id` text NOT NULL,
	`category_id` integer NOT NULL,
	`description` text NOT NULL,
	`total_value` real NOT NULL,
	`number_installments` integer DEFAULT 1 NOT NULL,
	`purchase_date` integer,
	FOREIGN KEY (`card_id`) REFERENCES `credit_card`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `credit_card` (
	`id` text PRIMARY KEY NOT NULL,
	`bank` text NOT NULL,
	`closing_day` integer,
	`due_date` integer
);
--> statement-breakpoint
CREATE TABLE `entry` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`origin_type` text NOT NULL,
	`origin_id` text,
	`category_id` integer NOT NULL,
	`payment_method` text,
	`value` real NOT NULL,
	`due_date` integer NOT NULL,
	`payment_date` integer,
	`status` text NOT NULL,
	`competence` text NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `installment` (
	`id` text PRIMARY KEY NOT NULL,
	`buy_id` text NOT NULL,
	`invoice_id` text,
	`number` integer NOT NULL,
	`value` real NOT NULL,
	FOREIGN KEY (`buy_id`) REFERENCES `buy`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`invoice_id`) REFERENCES `invoice`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `invoice` (
	`id` text PRIMARY KEY NOT NULL,
	`card_id` text NOT NULL,
	`competence` text NOT NULL,
	`total_value` real NOT NULL,
	`status` text NOT NULL,
	FOREIGN KEY (`card_id`) REFERENCES `credit_card`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `recurring_account` (
	`id` text PRIMARY KEY NOT NULL,
	`category_id` integer NOT NULL,
	`name` text NOT NULL,
	`frequency` text NOT NULL,
	`due_date` integer,
	`estimated_value` real NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `revenue_source` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL
);
