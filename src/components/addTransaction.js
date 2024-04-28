import { useContext, useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { UserContext } from "../context/context";
import { addDoc,getDocs,orderBy,query,where,limit, setDoc } from "firebase/firestore";
import { BookGenreRef,BookRef, LibraryUsersRef, TransactionRef, UserPhoneRef, UsersRef } from "../context/DBContext";
import { useAuth } from "../context/AuthContext";

import "../assets/css/addBook.css";


function AddTransaction(){
    const options = [{value:"issue",label:"issue"},{value:"return",label:"return"}]
    
    const [type,setType] = useState("");
    const [userID,setUserID] = useState(0);
    const [bookID,setBookID] = useState(0);
    const [date,setDate] = useState(new Date());

    const clearStates = () =>{
        setType("")
        setUserID(0)
        setBookID(0)
    }

    const handleAddTransaction = async (e) => {
        e.preventDefault()
        try{
            if(type==="" || userID==0 || bookID==0 )
            {
                alert("Please fill all the fields")
                return
            }
            else{
                console.log(type)
                await addDoc(TransactionRef,{
                    BookID : Number(bookID),
                    UserID: Number(userID),
                    Type : type,
                    Date : new Date(),
                    
                    
                })
                clearStates()
                alert("Transaction Added Succesfully. Please Refresh to see changes");
            }
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
            <h2>Transaction Information</h2>
            <form id="bookForm">
                <label for="bookName">User ID:</label>
                <input type="number" id="bookName" placeholder="Enter User ID" name="bookName" onChange={(e)=>{setUserID(e.target.value)}}  required />
                
                <label for="author">Book ID:</label>
                <input type="number" id="author" placeholder="Enter BookID" name="author"  onChange={(e)=>{setBookID(e.target.value)}}/>
                
                <label for="genre">Type:</label>
                <Select options={options} onChange={(values)=>{(values.map((d)=>{setType(d.value)}))}} />  
                
                <label for="availability">Return/Returned Date:</label>
                <input type="date" id="availability" placeholder="Enter Email" name="availability"  onChange={(e)=>{setDate(e);console.log(date)}}/>
                <input type="submit" value="Submit" onClick={handleAddTransaction} />
            </form>
        </div>

    );
}
export default AddTransaction;