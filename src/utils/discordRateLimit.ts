export class DiscordRateLimit {
  static wasGloballyRateLimited = false;
  static readonly wasRateLimited = new Set<string>();

  static rateLimited(path: string, res: Response) {
    const retryAfter = res.headers.get("Retry-After");
    if (!retryAfter) return;
    const retryAfterInt = parseInt(retryAfter);
    if (isNaN(retryAfterInt)) return;
    if (res.headers.get("X-RateLimit-Global")) {
      this.wasGloballyRateLimited = true;
      setTimeout(() => {
        this.wasGloballyRateLimited = false;
      }, retryAfterInt * 1000);
    } else {
      this.wasRateLimited.add(path);
      setTimeout(() => {
        this.wasRateLimited.delete(path);
      }, retryAfterInt * 1000);
    }
  }

  static isRateLimited(path: string) {
    return this.wasGloballyRateLimited || this.wasRateLimited.has(path);
  }
}
