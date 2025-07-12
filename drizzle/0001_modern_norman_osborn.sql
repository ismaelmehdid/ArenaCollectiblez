CREATE TYPE "public"."applicantSource" AS ENUM('BlazehartSC', 'StormfoxFC');--> statement-breakpoint
CREATE TABLE "loot_box_pending" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "loot_box" ADD COLUMN IF NOT EXISTS "type" "applicantSource" NOT NULL;--> statement-breakpoint
ALTER TABLE "loot_box_pending" ADD CONSTRAINT "loot_box_pending_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint