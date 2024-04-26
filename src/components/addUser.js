import { useContext, useEffect, useState } from "react";

import { UserContext } from "../context/context";
import { addDoc,getDocs,orderBy,query,where,limit, setDoc } from "firebase/firestore";
import { BookGenreRef,BookRef, LibraryUsersRef, UserPhoneRef, UsersRef } from "../context/DBContext";
import { useAuth } from "../context/AuthContext";

import "../assets/css/addBook.css";


function AddUser(){
    
    const [UserName,setUserName] = useState("");
    const [UserAddress,setUserAddress] = useState("");
    const [phone,setPhone] = useState("");
    const [email,setEmail] = useState("");
    const [userID,setUserID] = useState(0);


    const clearStates = () =>{
        setUserName("")
        setUserAddress("")
        setPhone("")
        setEmail("")
    }
    const getLastID = async() =>{
        try{
            const q = query(UsersRef,orderBy("UserID","desc"),limit(1));
            const data = await getDocs(q);
            data.forEach((doc)=>{
                setUserID(Number(doc.data().UserID));
            })
        }catch(err){
            console.log(err)
        }
    }
    const handleAddUser = async (e) => {
        getLastID();
        e.preventDefault()
        try{
            if(UserName=="" || email=="" || UserAddress=="" || phone=="")
            {
                alert("Please fill all the fields")
                return
            }
            else{
                setUserID((id)=>(id+1));
                await addDoc(UsersRef,{
                    UserName : UserName,
                    UserAddress: UserAddress,
                    Email : email,
                    UserID : userID+1,
                    
                    
                })
                await addDoc(UserPhoneRef,{
                    UserID : Number(userID)+1,
                    UserPhoneNo:phone
                })
                clearStates()
                alert("User Added Succesfully. Please Refresh to see changes");
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
            <h2>User Information</h2>
            <form id="bookForm">
                <label for="bookName">User Name:</label>
                <input type="text" id="bookName" placeholder="Enter User Name" name="bookName" value={UserName} onChange={(e)=>{setUserName(e.target.value)}} required />
                
                <label for="author">Address:</label>
                <input type="text" id="author" placeholder="Enter Address" name="author" value={UserAddress} required onChange={(e)=>{setUserAddress(e.target.value)}} />
                
                <label for="genre">Phone No:</label>
                <input type="text" id="genre" placeholder="Enter Phone" name="genre" value={phone} required onChange={(e)=>{setPhone(e.target.value)}} />
                
                <label for="availability">Email:</label>
                <input type="email" id="availability" placeholder="Enter Email" name="availability" value={email} required onChange={(e)=>{setEmail(e.target.value)}} />
                <input type="submit" value="Submit" onClick={handleAddUser} />
            </form>
        </div>

    );
}
export default AddUser;