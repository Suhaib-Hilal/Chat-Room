function checkRequirements() {
    let username = document.querySelector(".username")
    
    // Check if the user has entered their name
    if (username.value == "") {
        let info = document.querySelector(".info")
        info.innerHTML = "Username must not be empty"
        username.focus()
    }
    else if (username.value.length < 3) {
        let info = document.querySelector(".info")
        info.innerHTML = "Username must contain atleast 3 letters"
        username.focus()
    }
    else {
        return "Requirement's Satisfied"
    }
}

function createRoom() {
    if (checkRequirements() == "Requirement's Satisfied") {
        window.location.assign("/public/pages/room_creation.html")
    }
}