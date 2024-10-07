import { IModify, IRead } from "@rocket.chat/apps-engine/definition/accessors";
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
        read: IRead,
        modify: IModify
    ): Promise<void> {
        const user = context.getSender();
        const room: IRoom = context.getRoom();

        await this.sendMessage(room, user, modify, "Hello "+user.username);
    }

    private async sendMessage(room: IRoom, sender: IUser ,modify: IModify, message: string) {
        let messageStructure = modify.getCreator().startMessage();
        messageStructure.setRoom(room);
        messageStructure.setText(message);
        await modify.getCreator().finish(messageStructure)
    }
}
