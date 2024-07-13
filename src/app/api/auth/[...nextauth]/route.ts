import NextAuth from "next-auth/next";
import { authOptions } from './options';
import { NextApiHandler } from "next";

const handler : NextApiHandler = NextAuth(authOptions);

export { handler as GET , handler as POST }