CREATE TABLE IF NOT EXISTS "loot_box" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"user_id" uuid NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"club_icon" text,
	"price_to_open" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"avatar" text NOT NULL,
	"username" text NOT NULL,
	"wallet_address" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'loot_box_user_id_user_id_fk'
    ) THEN
        ALTER TABLE "loot_box"
        ADD CONSTRAINT "loot_box_user_id_user_id_fk"
        FOREIGN KEY ("user_id")
        REFERENCES "public"."user"("id")
        ON DELETE CASCADE
        ON UPDATE NO ACTION;
    END IF;
END
$$;