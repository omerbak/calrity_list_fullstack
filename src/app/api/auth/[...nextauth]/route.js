import connectDB from "@/config/database";
import NextAuth from "next-auth";
//import GithubProvider from "next-auth/providers/github";
import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require("bcrypt");

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();

        try {
          const user = await User.findOne({ email: credentials.email });
          console.log("use found");
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (err) {}
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
  },
  /*  session: {
  
  } */
});

export { handler as GET, handler as POST };
