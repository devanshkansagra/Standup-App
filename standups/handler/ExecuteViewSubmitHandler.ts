import { UIKitViewSubmitInteractionContext } from "@rocket.chat/apps-engine/definition/uikit";
import { StandupsApp } from "../StandupsApp";
import { IModify, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";

export class ExecuteViewSubmitHandler {
    constructor(
        private readonly app: StandupsApp,
        private readonly context: UIKitViewSubmitInteractionContext,
        private readonly read: IRead,
        private readonly modify: IModify
    ) {}

    public async run(context: UIKitViewSubmitInteractionContext) {
        const { user, view } = context.getInteractionData();
        const state = view.state;

        console.log(state);

    }
}
