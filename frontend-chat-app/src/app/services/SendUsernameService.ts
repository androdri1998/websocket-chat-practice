import { WebSocketProvider } from "../providers/interfaces/WebSocketProvider";
import { emiters } from "../constants";

export default class SendUsernameService {
    private webSocketProvider: WebSocketProvider;

    constructor(webSocketProvider: WebSocketProvider) {
        this.webSocketProvider = webSocketProvider;
    }

    execute(username: string) {
        this.webSocketProvider.emit(emiters.setUsername, username);
    }
}