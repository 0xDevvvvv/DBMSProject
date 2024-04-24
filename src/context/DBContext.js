import { db } from "../config/firebase";
import { collection,doc } from "firebase/firestore";

export const BookRef = collection(db,"Book");
export const BookGenreRef = collection(db,"BookGenre");
export const TotalRef = doc(db,"Total","TotalDetails");
export const TransactionRef = collection(db,"Transaction");
export const UserPhoneRef = collection(db,"UserPhone");
export const UsersRef = collection(db,"Users");
export const LibraryUsersRef = collection(db,"LibraryUsers");


