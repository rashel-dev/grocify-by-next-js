import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import User from "./models/user.model";
import dbConnect from "./lib/dbConnect";
import bcrypt from "bcryptjs";
 
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
              id: user._id,
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
  ],
})
