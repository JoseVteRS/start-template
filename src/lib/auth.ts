import { db } from "@/db";
import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

if (!process.env.DATABASE_URL || process.env.DATABASE_URL === "") {
  throw new Error("DATABASE_URL is not set in the environment variables");
}

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  /**
   * Uncoment this to enable social providers if you have them
   */
  // socialProviders: {
  //   github: {
  //     clientId: "",
  //     clientSecret: "",
  //   },
  //   google: {
  //       clientId: "",
  //       clientSecret: "",
  //   }
  // },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema
    }
  }),
});
