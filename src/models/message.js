export default class Message {
    constructor(author, content, id) {
        this.author = author;
        this.content = content;
        this.id = id
    }

    static fromMap(map) {
        return new Message(map.author, map.content, map.id);
    }

    toMap() {
        return {
            author: this.author,
            content: this.content,
            id: this.id,
        }
    }
}