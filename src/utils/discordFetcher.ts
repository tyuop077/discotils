import AccountManager from "@utils/accountManager";

export const discordFetcher = async (path: string, authString: string, method = "GET", options: RequestInit = {}): Promise<any> => {
  const res = await fetch(`https://discord.com/api/v10/${path}`, {
    method,
    ...options,
    headers: {
      Authorization: authString,
      ...options.headers
    }
  });
  if (res.status === 401) {
    if (authString.startsWith("Bearer ")) {
      const account = AccountManager._cache[authString.slice(7)];
      if (account) {
        await AccountManager.addBearer(account.id, account.secret!);
        return discordFetcher(path, `Bearer ${account.tokens.bearer}`, method, options);
      }
      throw new Error("Invalid bearer token (and account no longer exists in cache)");

    } else {
      AccountManager
        .accounts[Buffer.from(authString.slice(4).split(".")[0], "base64").toString("ascii")]
        .update({active: false});
      throw new Error("Invalid session");
    }
  }
  if (!res.ok) throw new Error(`Discord API returned ${res.status} ${res.statusText}`);
  return res.json();
}
