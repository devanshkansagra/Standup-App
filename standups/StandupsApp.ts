import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { HICommand } from "./commands/HICommand";
import { StandupCommand } from "./commands/StandupCommand";
import { UIKitInteractionContext } from "@rocket.chat/apps-engine/definition/uikit";

export class StandupsApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async extendConfiguration(
        configuration: IConfigurationExtend
    ): Promise<void> {
        configuration.slashCommands.provideSlashCommand(new HICommand());
        configuration.slashCommands.provideSlashCommand(new StandupCommand());
    }
}
