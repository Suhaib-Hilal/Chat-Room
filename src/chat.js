import { sendMessageToFirebase, subscribeToMessages } from "./firebase";
import Message from "./models/message"

let room;
let username;

const namePara = document.querySelector(".roomName");

const messageView = document.querySelector(".messageView");
const sendBtn = document.querySelector(".sendBtn");
sendBtn.addEventListener("click", sendMessage)

let messages = []

export async function initiateChat(_room, _username) {
    room = _room;
    username = _username;
    namePara.innerText = `#${room.name}`

    const unsub = await subscribeToMessages(room.id, (snap) => {
        messages = []
        snap.forEach((messageDoc) => {
            const message = Message.fromMap(messageDoc.data());
            messages.push(message);
        })

        updateMessages();
    });
}

function updateMessages() {
    let html = ""
    for (const message of messages) {
        html += `<div class="message">
                    <p class="message-head">
                        <span class="author">${message.author}</span>
                        :
                    </p>
                    <p class="message-content">${message.content}</p>
                </div>`
    }

    messageView.innerHTML = html;
}

function sendMessage() {
    const message = new Message(
        username,
        document.querySelector(".messageField").value
    );

    sendMessageToFirebase(room.id, message);
}