import { useContext, useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { UserContext } from "../context/context";
import { addDoc,getDoc,doc,getDocs,orderBy,query,where,limit, setDoc, updateDoc, getCountFromServer } from "firebase/firestore";
import { BookGenreRef,BookRef, LibraryUsersRef, TransactionRef, UserPhoneRef, UsersRef } from "../context/DBContext";
import { useAuth } from "../context/AuthContext";

import "../assets/css/addBook.css";
import { set } from "firebase/database";


function AddTransaction(){
    const options = [{value:"issue",label:"issue"},{value:"return",label:"return"}]

    const [bookData,setBookData] = useState([]);
    const [bookDetails,setBookDetails] = useState([]);
    const [userDetails,setUserDetails] = useState([]);
    const [docID,setDocID] = useState("");

    const details = async() =>{
        const book = await getDocs(BookRef);
        const user = await getDocs(UsersRef);
        const filteredbookdata = book.docs.map((doc)=>({
            ...doc.data(),
            id:doc.id,
        }))
        const filtereduserdata = user.docs.map((doc)=>({
            ...doc.data(),
            id:doc.id,
        }))
        setBookDetails(filteredbookdata);
        setUserDetails(filtereduserdata);
    }

   

    const [type,setType] = useState("");
    const [userID,setUserID] = useState(0);
    const [bookID,setBookID] = useState(0);
    const [date,setDate] = useState(new Date());
    const [avail,setAvail] = useState();

    const clearStates = () =>{
        setType("")
        setUserID(0)
        setBookID(0)
    }
    const queryFunction = async () =>{
        const q = query(BookRef,where("BookID","==",Number(bookID)),limit(1))
        const data = await getDocs(q);
        data.forEach((doc)=>{
            setBookData(doc.data())
            setDocID(doc.id)
        })
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
                const q = query(BookRef,where("BookID","==",Number(bookID)),limit(1))
                const userquery = query(UsersRef,where("UserID","==",Number(userID)),limit(1))
                const count = await getCountFromServer(q);
                const usercount = await getCountFromServer(userquery);
                try{
                    
                    const data = await getDocs(q);
                    data.forEach((doc)=>{
                        setBookData(doc.data())
                        setDocID(doc.id)
                        setAvail(doc.data().BookAvailability)
                    })
                }catch(err){console.log(err)}

                if(count.data().count==0)
                {
                        alert("Book Not Found");
                        return;
                }
                if(usercount.data().count==0)
                {
                        alert("User Not Found");
                        return;
                }
                else{
                    if(avail === 0 && type==="issue" )
                    {
                        alert("Book Not Available");
                        return;
                    }
                }

                await addDoc(TransactionRef,{
                    BookID : Number(bookID),
                    UserID: Number(userID),
                    Type : type,
                    Date : new Date(),
                    
                    
                })
                const u = doc(BookRef,docID)
                const d = await getDoc(u);
                if(type==="issue"){
                    
                    await updateDoc(u,{
                        BookAvailability : d.data().BookAvailability-1
                    })
                    setAvail(d.data().BookAvailability-1)

                }
                else{
                    await updateDoc(u,{
                        BookAvailability : d.data().BookAvailability+1
                    })
                    setAvail(d.data().BookAvailability+1)
                }
                clearStates()
                alert("Transaction Added Succesfully. Please Refresh to see changes");
            }
        }catch(err){
            console.log(err)
        }

    }

    useEffect(()=>{
        details();
    },[bookID])

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
                
                {userDetails.filter((doc)=>{
                    return(userID==Number(doc.UserID))
                }).map((doc)=>{
                    return(
                        <div>
                            <pre style={{fontFamily:"monospace",fontWeight:"bolder",fontSize:"large"}}>
                                User ID : {doc.UserID}<br/>
                                UserName : {doc.UserName}<br/>
                                Email : {doc.Email}
                            </pre>
                        </div>
                    );
                })}

                <label for="author">Book ID:</label>
                <input type="number" id="author" placeholder="Enter BookID" name="author"  onChange={(e)=>{setBookID(e.target.value)}}/>
                
                {bookDetails.filter((doc)=>{
                    return(bookID==Number(doc.BookID))
                }).map((doc)=>{
                    return(
                        <div>
                            <pre style={{fontFamily:"monospace",fontWeight:"bolder",fontSize:"large"}}>
                                Book Name: {doc.BookName}<br/>
                                Author : {doc.Author}<br/>
                                Availability : {doc.BookAvailability}
                            </pre>
                        </div>
                    );
                })}

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