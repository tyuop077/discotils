import AccountManager from "@utils/accountManager";

export const fetcher = async (path: string, token: string, method = "GET", options: RequestInit = {}) => {
  const res = await fetch(`https://discord.com/api/v10/${path}`, {
    method,
    ...options,
    headers: {
      Authorization: `Bot ${token}`,
      ...options.headers
    }
  });
  if (res.status === 401) {
    AccountManager
      .accounts[Buffer.from(token.split(".")[0], "base64").toString("ascii")]
      .update({active: false});
    throw new Error("Invalid session");
  }
  return res;
}
