import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import{getDocs,query,where,collection} from "firebase/firestore";
import {db} from "../config/firebase";

import { useAuth } from "../context/AuthContext";

import "../assets/css/login.css"

const LibraryUsersRef = collection(db,"LibraryUsers"); 

function LoginForm(){

    const myStyle = {
        backgroundImage:
            "url('https://wallpapercave.com/wp/wp9764009.jpg')",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };

    const navigate = useNavigate();
    const dashboardNavigate = () => {
        navigate("/dashboard");
    }
    
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const { login }  = useAuth();

    async function LoginUser(e){
        e.preventDefault();

        const q = query(LibraryUsersRef,where("LibUsername","==",username));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            setEmail(doc.data().LibEmail);
        })

        try{

            await login(email,password);
            dashboardNavigate();
        }
        catch(err)
        {
            alert("Invalid Email or password");
        }
    }

    return(
        <div class="bg-image" style={myStyle}>
            <div class="main" >
        
                <div class="box">
                    <div class="title">
                        <h1>Library Management System</h1>
                    </div>
                    <div class="login">
                        <h2>Login</h2>
                      
                        <form>
                            <div class="inputc">
                                <input type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} required />
                            </div>
                            <div class="inputc">
                                <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}required />
                            </div>
                            <a href="#" class="forget">Forget password</a>
                            <button type="submit" onClick={LoginUser}>Log In</button>
                        </form>
                        
                    </div>
                </div>
                
            </div>
    </div>
    );
}
export default LoginForm;