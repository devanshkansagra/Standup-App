import {
    IUIKitResponse,
    UIKitInteractionContext,
    UIKitViewSubmitInteractionContext,
    UIKitViewCloseInteractionContext,
} from "@rocket.chat/apps-engine/definition/uikit";

export class DailyScheduleInteractionHandler {
    public async executeViewSubmitHandler(
        context: UIKitInteractionContext,
        interaction: UIKitViewSubmitInteractionContext
    ): Promise<IUIKitResponse> {
        const { view } = interaction.getInteractionData();
        const { state } = view as {
            state: {
                plain_text_input_block_1?: {
                    plain_text_input_action_1?: string;
                };
            };
        };

        // Extract the value from the state
        const inputValue =
            state?.plain_text_input_block_1?.plain_text_input_action_1;

        console.log("Submitted value:", inputValue);

        // Process the value as needed
        // ...

        return context.getInteractionResponder().successResponse();
    }

    public async executeViewClosedHandler(
        context: UIKitInteractionContext,
        interaction: UIKitViewCloseInteractionContext
    ): Promise<IUIKitResponse> {
        console.log("Modal was closed");

        // Handle the modal close event as needed
        // ...

        return context.getInteractionResponder().successResponse();
    }
}
