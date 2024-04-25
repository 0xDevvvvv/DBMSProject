import { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/context";
import { addDoc,getDocs,orderBy,query,where,limit, setDoc } from "firebase/firestore";
import { BookGenreRef,BookRef, LibraryUsersRef } from "../context/DBContext";
import { useAuth } from "../context/AuthContext";

import "../assets/css/addBook.css";


function AddBook(){
    
    const [bookName,setBookName] = useState("");
    const [authorName,setAuthorName] = useState("");
    const [genre,setGenre] = useState("");
    const [availability,setAvailability] = useState(0);
    const [LibID,setLibID] = useState();
    const [BookID,setBookID] = useState(0);
    const {user,setUser} = useContext(UserContext);
    const {currentUser} = useAuth();

    const clearStates = () =>{
        setAuthorName("")
        setBookName("")
        setAvailability(0)
        setGenre("")
    }
    const getLastID = async() =>{
        try{
            const q = query(BookRef,orderBy("BookID","desc"),limit(1));
            const data = await getDocs(q);
            data.forEach((doc)=>{
                setBookID(Number(doc.data().BookID));
            })

            const l = query(LibraryUsersRef,where("LibEmail","==",currentUser.email.toString().trim()))
            const LibData = await getDocs(l);
            LibData.forEach((doc)=>{
                setLibID((doc.data().LibID));
            })
        }catch(err){
            console.log(err)
        }
    }
    const handleAddBook = async (e) => {
        getLastID();
        e.preventDefault()
        try{
            if(bookName=="" || authorName=="" || genre=="")
            {
                alert("Please fill all the fields")
                return
            }
            else{
                setBookID((id)=>(id+1));
                await addDoc(BookRef,{
                    BookName : bookName,
                    Author : authorName,
                    BookAvailability : Number(availability),
                    BookID : BookID+1,
                    LibID:(LibID)
                    
                })
                await addDoc(BookGenreRef,{
                    BookID : Number(BookID)+1,
                    Genre : genre
                })
                clearStates()
                alert("Book Added Succesfully");
            }
        }catch(err){
            console.log(err)
        }

    }
    useEffect(()=>{
        getLastID();
    },[])
    return(

        <div class="book-form">
            <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
            />
            <h2>Book Information</h2>
            <form id="bookForm">
                <label for="bookName">Book Name:</label>
                <input type="text" id="bookName" placeholder="Enter Book Name" name="bookName" value={bookName} onChange={(e)=>{setBookName(e.target.value)}} required />
                
                <label for="author">Author:</label>
                <input type="text" id="author" placeholder="Enter Author Name" name="author" value={authorName} required onChange={(e)=>{setAuthorName(e.target.value)}} />
                
                <label for="genre">Genre:</label>
                <input type="text" id="genre" placeholder="Enter Genre" name="genre" value={genre} required onChange={(e)=>{setGenre(e.target.value)}} />
                
                <label for="availability">Availability:</label>
                <input type="number" id="availability" placeholder="Enter Availability" name="availability" value={availability} required onChange={(e)=>{setAvailability(e.target.value)}} />
                <input type="submit" value="Submit" onClick={handleAddBook} />
            </form>
        </div>

    );
}
export default AddBook;