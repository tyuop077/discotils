export interface ICommand {
  id: string;
  type?: number;
  application_id: string;
  guild_id?: string;
  name: string;
  name_localizations?: Record<string, string>;
  description: string;
  description_localizations?: Record<string, string>;
  options?: ICommandOption[];
  default_member_permissions?: string;
  dm_permission?: boolean;
  default_permission?: boolean;
  version: string;
}

export interface ICommandOption {
  type: number;
  name: string;
  name_localizations?: Record<string, string>;
  description: string;
  description_localizations?: Record<string, string>;
  required?: boolean;
  choices?: ICommandOptionChoice[];
  options?: ICommandOption[];
  channel_types?: number[];
  min_value?: number;
  max_value?: number;
  min_length?: number;
  max_length?: number;
  autocomplete?: boolean;
}

export interface ICommandOptionChoice {
  name: string;
  name_localizations?: Record<string, string>;
  value: string | number;
}

export default class Command implements ICommand {
  id!: string;
  type?: number;
  application_id!: string;
  guild_id?: string;
  name!: string;
  name_localizations?: Record<string, string>;
  description!: string;
  description_localizations?: Record<string, string>;
  options?: ICommandOption[];
  default_member_permissions?: string;
  dm_permission?: boolean;
  default_permission?: boolean;
  version!: string;
  constructor(data: ICommand) {
    Object.assign(this, data);
  }
}
