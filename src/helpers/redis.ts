/** @format */

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const authtoken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Commands = "zrange" | "sismember" | "get" | "smembers";
// zrange -> it is a sorted set, so we search for the value in the sorted set and return the value if it exists, null otherwise
// sismember -> it is set, so we search for the value in the set and return true if it exists, false otherwise
// get -> it is a list, so we search for the value in the list and return the value if it exists, null otherwise
// smembers -> it is a set, so we return all the values in the set

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
