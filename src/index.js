let rooms = {}

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

    // Check if the room name is alreay taken
    else if (rooms[roomNameField.value] != undefined) {
        roomNameInfoPara.innerHTML = "Room name already taken"
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

function isValidRoomId() {
    let roomIdField = document.querySelector(".room-id-field")
    let roomIdInfoPara = document.querySelector(".room-id-info-para")

    // Check if the user has entered an id
    if (roomIdField.value == "") {
        roomIdInfoPara.innerHTML = "Room ID is invalid"
        roomIdInfoPara.style.color = "tomato"
        roomIdField.focus()
    }

    // Check if the room name is alreay taken
    else if (Object.values(rooms).includes(roomIdField.value)) {
        roomIdInfoPara.innerHTML = "Room ID is valid"
        roomIdInfoPara.style.color = "var(--green)"
        return true
    }
    else {
        console.log(Object.entries(rooms))
        roomIdInfoPara.innerHTML = "Room ID is invalid"
        roomIdInfoPara.style.color = "tomato"
        roomIdField.focus()
    }
}

// Generate an id to create a room
function randomNumber(length = 6) {
    return Math.floor(
        Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1)
    );
}

function changeActive(target) {
    let children = document.body.children
    for (let index = 0; index <= children.length; index++) {
        let child = children[index];
        if (child.classList.contains("active")) {
            child.classList.remove("active")
            target.classList.add("active")
            return
        }
    }
}

// Copy the rood id to the clipboard
function copyRoomId() {
    let id = document.querySelector(".id").innerHTML

    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(id);
    return Promise.reject('The Clipboard API is not available.');
};

function createRoom() {

    // Check if the username is valid
    if (isValidUsername()) {
        let roomCreationCard = document.querySelector(".room-creation-card")
        let roomId = document.querySelector(".room-id > .id")

        // Activate the room creation card
        changeActive(roomCreationCard)

        // Generate a unique room id and add it to the website
        id = randomNumber()
        roomId.innerHTML = id
    }
}

function generateRoom() {
    let roomNameField = document.querySelector(".room-name-field")
    let roomId = document.querySelector(".room-id > .id")

    // Check if the room name is valid
    if (isValidRoomName()) {

        // Add the room data to the rooms object
        rooms[roomNameField.value] = roomId.innerHTML.toString()
    }
}

function joinRoom() {
    let roomEntranceCard = document.querySelector(".joining-room-card")

    // Check if the username is valid
    if (isValidUsername()) {

        // Activate the room entrance card
        changeActive(roomEntranceCard)
    }
}

function enterRoom() {
    let roomId = document.querySelector(".room-id > .id")
    console.log(Object.values(rooms))

    // Check if the room id is valid
    if (isValidRoomId()) {

    }
}