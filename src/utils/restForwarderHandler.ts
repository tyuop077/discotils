import {WithStatus} from "@utils/fetcher";

export interface RestForwarderError {
  error: string;
}

export interface DiscordError {
  code: number;
  message: string;
}

const ServerStatusToString: Record<number, (e: RestForwarderError, entity: string) => string> = {
  404: (_, entity) => `${entity} you were looking for doesn't exist`,
  429: () => `You are being rate limited, please try again later`,
  500: () => "Looks like there's an issue on our end, please report this to the developer",
  509: () => "Server was rate limited, please try again later",
}

const DiscordStatusToString: Record<number, (e: DiscordError, entity: string) => string> = {
  404: (_, entity) => `${entity} you were looking for doesn't exist`,
  429: () => "You are being rate limited, please try again later",
  500: () => "Looks like there's an issue on our or Discord's end, please report this to the developer",
  400: (e) => `${JSON.stringify(e)}`
}

export const stringifyServerStatus = (data: WithStatus<RestForwarderError>, entity: string) => {
  return ServerStatusToString[data.status]?.(data.body as RestForwarderError, entity) ??
    `${data.status}: ${(data.body as RestForwarderError).error}`;
}

export const stringifyDiscordStatus = (data: WithStatus<DiscordError>, entity: string) => {
  return DiscordStatusToString[data.status]?.(data.body as DiscordError, entity) ??
    `${data.status}: ${(data.body as DiscordError).message ?? JSON.stringify(data.body)}`;
}
