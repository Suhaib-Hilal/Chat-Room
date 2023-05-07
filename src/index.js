function isValidUsername() {
    let usernameField = document.querySelector(".username-field")
    let infoPara = document.querySelector(".info-para")

    // Check if the user has entered their name
    if (usernameField.value == "") {
        infoPara.innerHTML = "Username must not be empty"
        usernameField.focus()
    }

    // Check if the user has entered a valid name
    else if (usernameField.value.length < 3) {
        infoPara.innerHTML = "Username must contain atleast 3 letters"
        usernameField.focus()
    }
    else {
        return true
    }
}

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

function joinRoom() {
    
    // Check if the username is valid
    if (isValidUsername()) {
        let roomEntranceCard = document.querySelector(".joining-room-card")

        // Activate the room entrance card
        changeActive(roomEntranceCard)
    }
}