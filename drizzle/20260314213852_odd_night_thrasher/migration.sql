CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"userId" text NOT NULL,
	"actor_name" varchar(100) NOT NULL,
	"message" varchar(100) NOT NULL,
	"target" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"read" boolean DEFAULT false
);
