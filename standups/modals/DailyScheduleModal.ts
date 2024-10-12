import {
    IModify,
    IUIKitInteractionParam,
} from "@rocket.chat/apps-engine/definition/accessors";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import {
    UIKitInteractionContext,
    UIKitSurfaceType,
    UIKitViewCloseInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";
import { StandupsApp } from "../StandupsApp";

export class DailyScheduleModal {
    public modify: IModify;
    public slashCommandContext: SlashCommandContext;
    public uiInteractionContext: UIKitInteractionContext;

    constructor(modify: IModify, slashCommandContext: SlashCommandContext) {
        this.modify = modify;
        this.slashCommandContext = slashCommandContext;
    }

    public async createDailyScheduleModal(): Promise<void> {
        this.modify.getUiController().openSurfaceView(
            {
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
                            appId: this.slashCommandContext.getSender().id,
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
                            appId: this.slashCommandContext.getSender().id,
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
                            appId: this.slashCommandContext.getSender().id,
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
                        type: "actions", // the action block contains the checkbox element definition
                        appId: this.slashCommandContext.getSender().id,
                        blockId: "action_block_4",
                        elements: [
                            {
                                type: "checkbox",
                                actionId: "checkbox_action_1",
                                appId: this.slashCommandContext.getSender().id,
                                blockId: "checkbox_action_block_1",
                                options: [
                                    {
                                        text: {
                                            type: "plain_text",
                                            text: "Schedule according to Time zone",
                                        },
                                        value: "timeZone",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "actions", // the action block contains the checkbox element definition
                        appId: this.slashCommandContext.getSender().id,
                        blockId: "action_block_4",
                        elements: [
                            {
                                type: "checkbox",
                                actionId: "checkbox_action_1",
                                appId: this.slashCommandContext.getSender().id,
                                blockId: "checkbox_action_block_1",
                                options: [
                                    {
                                        text: {
                                            type: "plain_text",
                                            text: "Add All Participants",
                                        },
                                        value: "allParticipants",
                                    },
                                ],
                            },
                        ],
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
                            appId: this.slashCommandContext.getSender().id,
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
                    appId: this.slashCommandContext.getSender().id,
                    blockId: "submit_block",
                    actionId: "submit_action",
                },
            },
            { triggerId: this.slashCommandContext.getTriggerId()! },
            this.slashCommandContext.getSender()
        );
    }
}
