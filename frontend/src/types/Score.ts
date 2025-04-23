import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import Timestamp = firebase.firestore.Timestamp;

export type Score = {
    userId: string;
    userEmail: string;
    score: number;
    difficulty: string;
    createdAt: Timestamp;
}