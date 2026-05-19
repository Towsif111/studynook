import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("studynook");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  },
   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_SECRET,
            overrideUserInfoOnSignIn: true,
            mapProfileToUser: (profile) => ({
              name: profile.name,
              email: profile.email,
              image: profile.picture,
              emailVerified: profile.email_verified
            })
        }
      }
});