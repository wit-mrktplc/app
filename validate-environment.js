import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  EXPO_PUBLIC_SUPABASE_URL: z.string().url(),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

function validateEnv() {
  try {
    // Validate the environment variables
    envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        console.error(`- ${err.path.join(".")}: ${err.message}`);
      });
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

export const env = validateEnv();
