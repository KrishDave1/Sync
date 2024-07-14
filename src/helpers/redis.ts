/** @format */

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const authtoken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Commands = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
  command: Commands,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed in executing Redis command ${commandUrl}`);
  }

  const data = await response.json();
  return data.result;
}
