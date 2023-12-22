import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';


// so basically this is a handy function where its gonna check that if we have a user with that email if the user exists were gonna return him back otherwise were gonna throw an error;

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
     
    return user.rows[0];
  } catch(error) {
    console.error("Failed to fetch the user", error);
    throw new Error("Failed to fetch the user");
  }
}

export const {
    auth,
    handlers,
    signIn,
    signOut,
    update
} = NextAuth({
    ...authConfig,
    providers: [
        credentials({
            async authorize(credentials){
                const parsedCredentials = z.object({
                    email: z.string().email(),
                    password: z.string().min(6)
                })
                .safeParse(credentials);

                if(parsedCredentials.success) {
                    const {
                        email,
                        password
                    } = parsedCredentials.data;

                    const user = await getUser(email);
                    if(!user) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if(passwordMatch) return user;
                }

                console.log("Invalid credentials");
                return null;
            }
        })
    ]
});

