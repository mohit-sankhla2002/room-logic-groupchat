import * as WebSocket from 'ws';
import { Message } from '../utils/types/Message';


class Room {
    private clients: Set<WebSocket>;

    constructor() {
        this.clients = new Set<WebSocket>();
    }
    
    join(cl: WebSocket) {
        this.clients.add(cl);
        this.broadcast({type: "JOIN", payload: "A user has joined!"}, cl);
    }

    exit(cl: WebSocket) {
        this.clients.delete(cl);
        this.broadcast({
            type: "EXIT", 
            payload: "A user has left the room"
        }, cl);
    }

    broadcast(message: Message, excludeClient ?: WebSocket) {
        const serializedMessage = JSON.stringify(message);
        this.clients.forEach((client) => {
            if (excludeClient) {
                if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
                    client.send(serializedMessage);
                }
            } else {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(serializedMessage);
                }
            }
        })
    }
};

export default Room;
