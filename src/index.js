import { addRoom, db, getRoom } from "./firebase"
import Room from "./models/room"
import { initiateChat } from "./chat"

// Check if the usernam is valid
function isValidUsername() {
    let usernameField = document.querySelector(".username-field")
    let infoPara = document.querySelector(".info-para")

    // Check if the user has entered their name
    if (usernameField.value == "") {
        infoPara.innerHTML = "Username must not be empty"
        infoPara.style.color = "tomato"
        usernameField.focus()
    }

    // Check if the user has entered a valid name
    else if (usernameField.value.length < 3) {
        infoPara.innerHTML = "Username must contain atleast 3 letters"
        infoPara.style.color = "tomato"
        usernameField.focus()
    }
    else {
        infoPara.innerHTML = "Username is valid"
        infoPara.style.color = "var(--green)"
        return true
    }
}

// Check if the room name is valid
function isValidRoomName() {
    let roomNameField = document.querySelector(".room-name-field")
    let roomNameInfoPara = document.querySelector(".room-name-info-para")

    // Check if the user has entered a name
    if (roomNameField.value == "") {
        roomNameInfoPara.innerHTML = "Room name must not be empty"
        roomNameInfoPara.style.color = "tomato"
        roomNameField.focus()
    }

    // Check if the user has entered a valid name
    else if (roomNameField.value.length < 4) {
        roomNameInfoPara.innerHTML = "Username must contain atleast 4 letters"
        roomNameInfoPara.style.color = "tomato"
        roomNameField.focus()
    }
    else {
        roomNameInfoPara.innerHTML = "Room name available"
        roomNameInfoPara.style.color = "var(--green)"
        return true
    }
}

// Generate an id to create a room
function getRandomID(length = 6) {
    return Math.floor(
        Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
    );
}

function changeActive(target) {
    for (let child of document.body.children) {
        if (child.classList.contains("active")) {
            child.classList.remove("active");
            break;
        }
    }

    target.classList.add("active")
}

// Copy the rood id to the clipboard
export default function copyRoomId() {
    let id = document.querySelector(".id").innerHTML
    return navigator.clipboard.writeText(id);
};

// Create a new room
function showRoomCreationModel() {

    // Check if the username is valid
    if (!isValidUsername()) return;

    let roomCreationCard = document.querySelector(".room-creation-card")
    let roomId = document.querySelector(".id")

    // Activate the room creation card
    changeActive(roomCreationCard)

    // Generate a unique room id and add it to the website
    roomId.innerText = getRandomID()
}

async function generateRoom() {
    let roomNameField = document.querySelector(".room-name-field")
    let roomId = document.querySelector(".id").textContent

    // Check if the room name is valid
    if (!isValidRoomName()) return;
    const room = new Room(roomNameField.value, roomId)
    await addRoom(room)
    gotoChat(room);
}

// Join an existing room
function joinRoom() {
    let roomEntranceCard = document.querySelector(".joining-room-card")

    // Check if the username is valid
    if (!isValidUsername()) return;

    // Activate the room entrance card
    changeActive(roomEntranceCard)

}

async function enterExistingRoom() {
    let roomId = document.querySelector(".room-id-field").value
    const roomInfoPara = document.querySelector(".room-id-info-para");

    try {
        let room = await getRoom(roomId);
        roomInfoPara.style.color = "var(--green)"
        roomInfoPara.textContent = "Room exist! Joining...";
        gotoChat(room)
    } catch (e) {
        roomInfoPara.style.color = "red"
        roomInfoPara.textContent = "Room does not exist";
    }

}

function gotoChat(room) {
    const username = document.querySelector(".username-field").value;
    setTimeout(() => {
        changeActive(document.querySelector(".chat"))
        initiateChat(room, username)
    }, 1000);
}

// Room creation
const createRoomBtn = document.querySelector(".createRoomBtn")
createRoomBtn.addEventListener("click", showRoomCreationModel)

const generateRoomBtn = document.querySelector(".generateRoomBtn");
generateRoomBtn.addEventListener("click", generateRoom);

// Room enterance
const joinRoomBtn = document.querySelector(".joinRoomBtn");
joinRoomBtn.addEventListener("click", joinRoom);

const enterRoomBtn = document.querySelector(".enterRoomBtn");
enterRoomBtn.addEventListener("click", enterExistingRoom);

// Room id copy
const copyRoomIdBtn = document.querySelector(".copyRoomIdBtn");
copyRoomIdBtn.addEventListener("click", copyRoomId);

const roomName = document.querySelector(".roomName");
roomName.addEventListener("click", copyRoomId);
