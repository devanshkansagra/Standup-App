import {
    IRead,
    IModify,
    IHttp,
    IPersistence,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { IUser } from "@rocket.chat/apps-engine/definition/users";
import { CommandEnum } from "../enums/commandEnum";
import { UIKitSurfaceType } from "@rocket.chat/apps-engine/definition/uikit";
import { DailyScheduleModal } from "../modals/DailyScheduleModal";
import { StandupsApp } from "../StandupsApp";

export class StandupCommand implements ISlashCommand {
    i18nParamsExample: string = "";
    i18nDescription: string =
        "Organize Standup meetings for better productivity";
    providesPreview: boolean = false;
    public command = "standup";

    async executor(
        slashCommandContext: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const user = slashCommandContext.getSender();
        const room = slashCommandContext.getRoom();
        const params = slashCommandContext.getArguments();

        if (params.length == 0 || params.includes(CommandEnum.HELP)) {
            let message =
                "Help:\n1. `/standup schedule daily` for scheduling daily standup meeting\n2. `/standup schedule weekly` for weekling standup meeting";
            return await this.notifyMessage(room, read, user, message);
        }

        if (params[0] === CommandEnum.SCHEDULE && params[1] === "daily") {
            const dailyScheduleModal = new DailyScheduleModal(
                modify,
                slashCommandContext,

            ).createDailyScheduleModal();
            console.log(dailyScheduleModal);
        }
    }

    private async notifyMessage(
        room: IRoom,
        read: IRead,
        sender: IUser,
        message: string
    ): Promise<void> {
        const notifier = read.getNotifier();
        const messageBuilder = notifier.getMessageBuilder();
        messageBuilder.setText(message);
        messageBuilder.setRoom(room);
        return notifier.notifyUser(sender, messageBuilder.getMessage());
    }
}
