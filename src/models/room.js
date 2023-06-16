export default class Room {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    toMap() {
        return {
            name: this.name,
            id: this.id,
        }
    }

    static fromMap(map) {
        console.log(map)
        return new Room(map.name, map.id);
    }
}