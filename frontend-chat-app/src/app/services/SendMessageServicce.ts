import { WebSocketProvider } from "../providers/interfaces/WebSocketProvider";
import { emiters } from "../constants";

export default class SendMessageService {
    private webSocketProvider: WebSocketProvider;

    constructor(webSocketProvider: WebSocketProvider) {
        this.webSocketProvider = webSocketProvider;
    }

    execute(message: string) {
        this.webSocketProvider.emit(emiters.sendMessage, message);
    }
}