import { IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export class HICommand implements ISlashCommand {
    public command = "hi";
    public i18nParamsExample: string = "status_update_command_params_example";
    public i18nDescription: string = "status_update_command_description";
    public providesPreview: boolean = false;

    public async executor(
        context: SlashCommandContext,
        read: IRead
    ): Promise<void> {
        const user = context.getSender();
        const room: IRoom = context.getRoom();

        await this.notifyMessage(room, read, user, "Hello " + user.username);
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
