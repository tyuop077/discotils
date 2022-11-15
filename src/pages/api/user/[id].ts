import {NextApiRequest, NextApiResponse} from "next";
import {restForwarder} from "@utils/restForwarder";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return restForwarder(req, res, {
    path: id => `users/${id}`,
    rateLimitBucket: "users",
    entityName: "User"
  })
}
