import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  async session({ session }) {},

  // serverless => lambda - meaning it will only open up once it is called
  async signIn({ profile }) {
    try {
      await connectToDB();

      // check if the user exists

      // if not, we must created the user
    } catch (error) {
      console.error(error);
      return false; // this indicated that the login has faild
    }
  },
});

export { handler as GET, handler as POST };
