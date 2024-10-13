import {
    IAppAccessors,
    IConfigurationExtend,
    ILogger,
    IModify,
    IPersistence,
    IPersistenceRead,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { HICommand } from "./commands/HICommand";
import { StandupCommand } from "./commands/StandupCommand";
import { UIKitViewSubmitInteractionContext } from "@rocket.chat/apps-engine/definition/uikit";
import { ExecuteViewSubmitHandler } from "./handler/ExecuteViewSubmitHandler";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export class StandupsApp extends App {

    public botUser:IUser;
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
        modify: IModify,
        persistence: IPersistence,
        persistenceRead: IPersistenceRead
    ) {
        const handler = new ExecuteViewSubmitHandler(
            this,
            context,
            read,
            modify,
            persistence,
            persistenceRead
        );
        return await handler.run(context);
    }
}
