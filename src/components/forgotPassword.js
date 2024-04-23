
import React from "react";
import { useState } from "react";
import { LibraryUsersRef } from "../context/DBContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { query,where,getCountFromServer,getDoc} from "firebase/firestore";

import "../assets/css/forgotPassword.css";



function ForgotPassword(){
    

    const style= {
        font: "Arial, sans-serif",
        margin: "0",
        padding: "0"
    }

    const [adminEmail , setAdminEmail] = useState("");
    const [ID, setID] = useState(0);
    const [ username, setUsername] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            const q = query(LibraryUsersRef,where("LibEmail","==",adminEmail),where("LibUsername","==",username),where("LibID","==",Number(ID)));
            const count = await getCountFromServer(q);

            if(count.data().count==0 ){
                alert("Wrong Details Provided ");
            }
            else{
                await sendPasswordResetEmail(auth,adminEmail).then(()=>{
                    alert("Password Reset Link Sent to Email");
                    navigate("/");
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }catch(err){
            console.log(err);
        }
    }


    return(
    <body style={{style}}>
    <div class="Forgetmain">
        <div class="Forgetcontainer">
            <form class="Forgetpassword-form" id="ForgetpasswordForm">
                <h2>Admin Verification</h2>
                <p>Please enter your admin email and the ID and AdminName to reset the password.</p>
                <div class="Forgetform-group">
                    <label for="adminEmail">Admin Email:</label>
                    <input type="email" id="adminEmail" name="adminEmail" placeholder="Enter admin email" onChange={(e)=>{setAdminEmail(e.target.value)}} required/>
                </div>
                {/*<div class="Forgetform-group">
                    <label for="adminPassword">Email Password:</label>
                    <input type="password" id="adminPassword" name="adminPassword" placeholder="Enter email password" onChange={(e)=>{setPassword(e.target.value)}} required/>
                </div>*/}
                <div class="Forgetform-group">
                    <label for="adminID">Admin ID:</label>
                    <input type="number" id="adminID" name="adminID" placeholder="Enter AdminID" onChange={(e)=>{setID(e.target.value)}} required/>
                </div>
                <div class="Forgetform-group">
                    <label for="adminUsername">Admin Username:</label>
                    <input type="text" id="adminUsername" name="adminUsername" placeholder="Enter Admin Username" onChange={(e)=>{setUsername(e.target.value)}} required/>
                </div>
                <button type="submit" onClick={handleSubmit}>Reset Password</button>
                <a href="/" >Login</a>
            </form>
        </div>
    </div>
    </body>

    );

}
export default ForgotPassword;