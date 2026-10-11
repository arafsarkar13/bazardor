import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is missing. Add it to your .env file.");
}

// Keep one MongoDB connection, even when the dev server reloads files
const client = (globalThis.bazardorMongo ??= new MongoClient(
  process.env.MONGODB_URI,
));

// "bazardor" is the database name; MongoDB creates it automatically
const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    // After sign up, do NOT log the user in: send them to the sign in page
    autoSignIn: false,
  },

  // nextCookies must be the LAST plugin in this list
  plugins: [nextCookies()],
});
