import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { firebaseConfig } from "./firebaseConfig";

export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);