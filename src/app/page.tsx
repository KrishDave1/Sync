/** @format */

import { db } from "@/lib/db";
import Head from "next/head";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Image src='/favicon.ico' alt='Vercel Logo' width={72} height={16} />
    </div>
  );
}
