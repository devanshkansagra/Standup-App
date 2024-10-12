import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger,
    IModify,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { HICommand } from "./commands/HICommand";
import { StandupCommand } from "./commands/StandupCommand";
import {
    UIKitInteractionContext,
    UIKitViewCloseInteractionContext,
    UIKitViewSubmitInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";
import { ExecuteViewSubmitHandler } from "./handler/ExecuteViewSubmitHandler";

export class StandupsApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }
    public async extendConfiguration(
        configuration: IConfigurationExtend
    ): Promise<void> {
        configuration.slashCommands.provideSlashCommand(new HICommand());
        configuration.slashCommands.provideSlashCommand(
            new StandupCommand(this)
        );
    }

    public async executeViewSubmitHandler(
        context: UIKitViewSubmitInteractionContext,
        read: IRead,
        modify: IModify
    ) {
        const handler = new ExecuteViewSubmitHandler(
            this,
            context,
            read,
            modify
        );
        return await handler.run(context);
    }
}
