import { WebSocket, WebSocketServer } from "ws";
import { MessageValidator } from "./utils/types/Message";
import RoomManager from './managers/RoomManager';
const wss = new WebSocketServer({
    port: 3000, 
});

const roomManager = new RoomManager();
const room = roomManager.create("default");

wss.on("connection", (ws: WebSocket) => {
    // @ts-expect-error
    room.join(ws);

    ws.on("message", (data) => {
        try {
            const serializedData = JSON.parse(data.toString());
            const { type, payload } = MessageValidator.parse(serializedData);
            if (type == "MSG") {
                room.broadcast({
                    type,
                    payload
                });
            }
        } catch (error: any) {
            console.log(error);
        }
    });

    ws.on("close", () => {
        // @ts-expect-error
        room.exit(ws);
    })
})

