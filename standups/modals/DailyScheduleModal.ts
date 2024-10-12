import {
    IModify,
    IUIKitInteractionParam,
    IUIKitSurfaceViewParam,
} from "@rocket.chat/apps-engine/definition/accessors";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import {
    UIKitInteractionContext,
    UIKitSurfaceType,
    UIKitViewCloseInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";

export class DailyScheduleModal {
    public modify: IModify;
    public slashCommandContext: SlashCommandContext;
    public uiInteractionContext: UIKitInteractionContext;

    constructor(modify: IModify, slashCommandContext: SlashCommandContext) {
        this.modify = modify;
        this.slashCommandContext = slashCommandContext;
    }

    public async createDailyScheduleModal(
        id: string
    ): Promise<IUIKitSurfaceViewParam> {
        const modal: IUIKitSurfaceViewParam = {
            type: UIKitSurfaceType.MODAL,
            title: {
                text: "Schedule Daily Standup Meeting",
                type: "plain_text",
            },
            blocks: [
                {
                    type: "input",
                    label: {
                        type: "plain_text",
                        text: "Time of Standup meeting",
                    },
                    element: {
                        type: "time_picker",
                        actionId: "time_picker_action_1",
                        appId: id,
                        blockId: "time_picker_action_block_1",
                    },
                },
                {
                    type: "input",
                    label: {
                        type: "plain_text",
                        text: "How long this meeting could be?",
                    },
                    element: {
                        type: "time_picker",
                        actionId: "time_picker_action_2",
                        appId: id,
                        blockId: "time_picker_action_block_2",
                    },
                },
                {
                    type: "input",
                    label: {
                        type: "plain_text",
                        text: "Which channel will be organizing it?",
                    },
                    element: {
                        // the definition of the plain text input element
                        type: "plain_text_input",
                        appId: id,
                        actionId: "plain_text_input_action_1",
                        blockId: "plain_text_input_block_1",
                        placeholder: {
                            type: "plain_text",
                            text: "Enter the Room Id",
                        },
                        multiline: false,
                    },
                },
                {
                    type: "input",
                    label: {
                        type: "plain_text",
                        text: "Select Users",
                    },
                    element: {
                        type: "multi_users_select",
                        actionId: "multi_users_select_action_1",
                        appId: id,
                        blockId: "multi_users_select_block_1",
                    },
                },
            ],
            submit: {
                type: "button",
                text: {
                    type: "plain_text",
                    text: "Submit",
                },
                appId: id,
                blockId: "submit_block",
                actionId: "submit_action",
            },
        };

        await this.modify
            .getUiController()
            .openSurfaceView(
                modal,
                { triggerId: this.slashCommandContext.getTriggerId()! },
                this.slashCommandContext.getSender()
            );

        return modal;
    }
}
