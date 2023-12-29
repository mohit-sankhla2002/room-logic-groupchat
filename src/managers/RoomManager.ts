import Room from "./Room";

class RoomManager {
    private rooms: Map<string, Room>;

    constructor() {
        this.rooms = new Map<string, Room>();
    }

    create(id: string): Room {
        const room = new Room();
        this.rooms.set(id, room);
        return room;
    }

    get(id: string): Room {
        const room = this.rooms.get(id);
        if (!room) {
            throw new Error("Room Does not Exist");
        }

        return room;
    }

    destroy(id: string) {
        const room = this.rooms.get(id);
        if (!room) {
            throw new Error("Room Does not Exist");
        }

        room.broadcast({
            type: "DESTROY", 
            payload: "This room is going down, join another one"
        });

        this.rooms.delete(id);
    }
}

export default RoomManager;