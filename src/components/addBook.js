import { useEffect, useState } from "react";
import { addDoc,getDocs,orderBy,query,where,limit } from "firebase/firestore";
import { BookGenreRef,BookRef } from "../context/DBContext";

import "../assets/css/addBook.css";

function AddBook(){
    
    const [bookName,setBookName] = useState("");
    const [authorName,setAuthorName] = useState("");
    const [genre,setGenre] = useState("");
    const [availability,setAvailability] = useState(0);
    const [BookID,setBookID] = useState(0);



    const getLastID = async() =>{
        try{
            const q = query(BookRef,limit(1),orderBy("BookID","desc"));
            const data = await getDocs(q);
            data.forEach((doc)=>{
                setBookID(doc.data().BookID);
            })
        }catch(err){
            console.log(err)
        }
    }
    const handleAddBook = async (e) => {
        getLastID();
        e.preventDefault()
        try{
            await addDoc(BookRef,{
                BookName : bookName,
                Author : authorName,
                Genre : genre,
                BookAvailability : Number(availability),
                BookID : Number(BookID)+1
            })
        }catch(err){
            console.log(err)
        }

    }
    



    return(

        <div class="book-form">
            <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
            />
            <h2>Book Information</h2>
            <form id="bookForm">
                <label for="bookName">Book Name:</label>
                <input type="text" id="bookName" placeholder="Enter Book Name" name="bookName" onChange={(e)=>{setBookName(e.target.value)}} required />
                
                <label for="author">Author:</label>
                <input type="text" id="author" placeholder="Enter Author Name" name="author" required onChange={(e)=>{setAuthorName(e.target.value)}} />
                
                <label for="genre">Genre:</label>
                <input type="text" id="genre" placeholder="Enter Genre" name="genre" required onChange={(e)=>{setGenre(e.target.value)}} />
                
                <label for="availability">Availability:</label>
                <input type="number" id="availability" placeholder="Enter Availability" name="avilability" required onChange={(e)=>{setAvailability(e.target.value)}} />
                
                <input type="submit" value="Submit" onClick={handleAddBook} />
            </form>
        </div>

    );
}
export default AddBook;