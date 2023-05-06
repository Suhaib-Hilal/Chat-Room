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

function createRoom() {

    // Check if the username is valid
    if (isValidUsername()) {
        let homeCard = document.querySelector(".home-card")
        let roomCreationCard = document.querySelector(".room-creation-card")
        let roomId = document.querySelector(".room-id > .id")

        // Activate the room creation card
        homeCard.classList.remove("active")
        roomCreationCard.classList.add("active")

        // Generate a unique room id and add it to the website
        id = randomNumber()
        roomId.innerHTML = id
    }
}