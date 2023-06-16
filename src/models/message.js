export default class Message {
    constructor(author, content) {
        this.author = author;
        this.content = content;
    }

    static fromMap(map) {
        return new Message(map.author, map.content);
    }

    toMap() {
        return {
            author: this.author,
            content: this.content,
        }
    }
}