import {NextApiRequest, NextApiResponse} from "next";
import {Snowflake} from "@utils/snowflake";
import rateLimit from "@utils/rateLimit";

const token = process.env.DISCORD_BOT_TOKEN!;

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500, // max users per second
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  const query = req.query, id = query.id;

  if (Object.keys(query).length !== 1 || typeof id !== "string" || !/^\d{17,20}$/.test(id)) {
    return res.status(400).json({error: "Bad request"});
  }

  const timestamp = Snowflake.toTimestamp(id);

  if (timestamp + BigInt(10000) > Date.now()) {
    return res.status(404).json({error: "Bad request"});
  }

  let rateLimited = false;

  await limiter.check(res, 15, req.headers["x-forwarded-for"] as string) // requests per minute
    .catch(() => rateLimited = true);

  if (rateLimited) {
    return res.status(429).json({error: "Too many requests", side: "client"});
  }

  const userRes = await fetch(`https://discord.com/api/v10/users/${id}`, {
    headers: {
      Authorization: `Bot ${token}`,
    }
  });
  if (userRes.status !== 200) {
    switch (userRes.status) {
      case 404:
        return res.status(404).json({error: "User not found"});
      case 429:
        return res.status(429).json({
          error: "Server was rate limited",
          retryAfter: userRes.headers.get("Retry-After"),
          side: "server"
        });
      case 401:
        return res.status(401).json({error: "Unauthorized"});
      default:
        return res.status(500).json({error: "Internal server error"});
    }
  }
  res.setHeader("Cache-Control", "max-age=0, s-maxage=10, stale-if-error=86400");
  return res.status(200).json(await userRes.json());
}
