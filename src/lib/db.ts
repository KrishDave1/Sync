/** @format */

//lib folder is for all the code that is not directly related to the application logic. This includes database connections, external API calls, and other utility functions.

import { Redis } from "@upstash/redis";

export const db = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
