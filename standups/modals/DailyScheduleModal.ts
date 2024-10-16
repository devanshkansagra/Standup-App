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
            id: "daily-schedule-modal",
            type: UIKitSurfaceType.MODAL,
            title: {
                text: "Schedule Daily Standup Meeting",
                type: "plain_text",
            },
            blocks: [
                {
                    type: "actions", // the action block
                    blockId: "action_block_5",
                    elements: [
                        // the elements parameter contains the date picker block element definition
                        {
                            type: "datepicker",
                            appId: id,
                            blockId: "date_block_1",
                            actionId: "date_action_1",
                        },
                    ],
                },
                {
                    type: "input",
                    label: {
                        type: "plain_text",
                        text: "Time of Standup meeting",
                    },
                    element: {
                        type: "time_picker",
                        actionId: "fromTimeActionId",
                        appId: id,
                        blockId: "fromTimeBlockId",
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
                        actionId: "toTimeActionId",
                        appId: id,
                        blockId: "toTimeBlockId",
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
                        actionId: "channelActionId",
                        blockId: "channelBlockId",
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
                        actionId: "usersActionId",
                        appId: id,
                        blockId: "usersBlockId",
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
