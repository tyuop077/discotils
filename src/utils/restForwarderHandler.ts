export interface RestForwarderError {
  error: string;
  side?: "client" | "server";
}

export const CodeToLine: Record<number, (e: RestForwarderError, entity: string) => string> = {
  404: (_, entity) => `${entity} you were looking for doesn't exist`,
  429: (e) => `${e.side ? "You are being" : "Server was"} rate limited, please try again later`,
  500: () => "Looks like there's an issue on our end, please report this to the developer",
}
