import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import User from "./models/user.model";
import dbConnect from "./lib/dbConnect";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try{
            await dbConnect();
            const { email, password } = credentials as { email: string, password: string };
            if (!email || !password) {
                throw new Error("Please provide email and password");
            }
            const user = await User.findOne({ email});
            if(!user){
                throw new Error("User not found");
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                throw new Error("Invalid password");
            }
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
              role: user.role
            };

        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({user, account}) {
      if(account?.provider == "google") {
        await dbConnect();

        let existingUser = await User.findOne({email:user?.email});
        if(!existingUser){
          existingUser = await User.create({
            name: user.name,
            email:user.email,
            image: user.image,
            role: "user"
          })
        }
        
        user.id = existingUser._id.toString();
        user.role = existingUser.role;

      }
      return true;
    },

    jwt({token, user}){
      if(user){
        token.id = user.id,
        token.name = user.name,
        token.email = user.email,
        token.role = user.role
      }
      return token;
    },

    session({session, token}){
      if(token){
        session.user.id = token.id as string,
        session.user.name = token.name as string,
        session.user.email = token.email as string,
        session.user.role = token.role as string
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
})
