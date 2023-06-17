// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection, query, orderBy } from "firebase/firestore";
import Room from "./models/room"

const firebaseConfig = {
    apiKey: "AIzaSyBvRJKUkLFwpLxUYq25A5Sl_iuJd1fWWlE",
    authDomain: "chat-cord-57e91.firebaseapp.com",
    projectId: "chat-cord-57e91",
    storageBucket: "chat-cord-57e91.appspot.com",
    messagingSenderId: "775718425980",
    appId: "1:775718425980:web:674fb7827590de70d6c0f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export async function addRoom(room) {
    await setDoc(doc(db, "rooms", room.id), room.toMap());
}

export async function getRoom(roomId) {
    const docSnap = await getDoc(doc(db, "rooms", roomId));

    if (!docSnap.exists()) {
        throw "Room does not exist";
    }

    return Room.fromMap(docSnap.data());
}

export async function subscribeToMessages(roomId, callback) {
    const unsub = onSnapshot(query(collection(db, "rooms", roomId, "messages"), orderBy("id")), callback);

    return unsub;
}

export async function sendMessageToFirebase(roomId, message) {
    await setDoc(doc(db, "rooms", roomId, "messages", message.id), message.toMap());
}