import React, { useContext } from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import{getDocs,query,where,limit,orderBy,getCountFromServer} from "firebase/firestore";
import { LibraryUsersRef } from "../context/DBContext";
import { UserContext } from "../context/context";
import { useAuth } from "../context/AuthContext";

import "../assets/css/login.css"


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
    
    const [user,setUser] = useContext(UserContext);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const { login }  = useAuth();

    const LoginUser = async (e)=>{
        e.preventDefault();
        const q = query(LibraryUsersRef,where("LibUsername","==",username.toString()),limit(1),orderBy("LibUsername","asc"));
        const count = await getCountFromServer(q);

        try{
            
            if(count.data().count == 0){
                alert("Wrong Email/Password")
            }
            else{
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc)=>{
                    console.log(doc.data().LibEmail)
                    login(doc.data().LibEmail,password).then(()=>{
                        dashboardNavigate();
                    }).catch((err)=>{
                        console.log(err);
                    })
                })
                
                
            }
        }
        catch(err){
            console.log(err)
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
                            <a href="/forgot-password" class="forget">Forgot password</a>
                            <button  onClick={LoginUser} >Log In</button>
                        </form>
                        
                    </div>
                </div>
            </div>
    </div>
    );
}
export default LoginForm;