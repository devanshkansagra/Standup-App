import { UIKitViewSubmitInteractionContext } from "@rocket.chat/apps-engine/definition/uikit";
import { StandupsApp } from "../StandupsApp";
import {
    IModify,
    IPersistence,
    IPersistenceRead,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";

interface DailyScheduleState {
    fromTimeBlockId: {
        fromTimeActionId: string;
    };
    toTimeBlockId: {
        toTimeActionId: string;
    };
    channelBlockId: {
        channelActionId: string;
    };
    usersBlockId: {
        usersActionId: Array<string>;
    };
}

export class ExecuteViewSubmitHandler {
    constructor(
        private readonly app: StandupsApp,
        private readonly context: UIKitViewSubmitInteractionContext,
        private readonly read: IRead,
        private readonly modify: IModify,
        private readonly persistence: IPersistence,
        private readonly persistenceRead: IPersistenceRead
    ) {}

    public async run(context: UIKitViewSubmitInteractionContext) {
        const { user, view } = context.getInteractionData();

        if (view.id == "daily-schedule-modal") {
            const state = view.state as DailyScheduleState;
            
        }
        return this.context.getInteractionResponder().successResponse();
    }
}
