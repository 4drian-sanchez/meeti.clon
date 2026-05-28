CREATE TABLE "meetiAttendes" (
	"meeti_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meetiAttendes" ADD CONSTRAINT "meetiAttendes_meeti_id_meetis_id_fkey" FOREIGN KEY ("meeti_id") REFERENCES "meetis"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "meetiAttendes" ADD CONSTRAINT "meetiAttendes_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;