import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";


import { useAuth } from "../context/AuthContext";



import "../assets/css/login.css"


function LoginForm(){

    const navigate = useNavigate();
    const dashboardNavigate = () => {
        navigate("/dashboard");
    }

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const { login }  = useAuth();

    async function LoginUser(e){
        e.preventDefault();
        try{

            await login(email,password);
            dashboardNavigate();
        }
        catch(err)
        {
            console.log(err);
        }
    }

    return(
        <body>
            <div class="main">
                <div class="box">
                    <div class="title">
                        <h1>Library Management System</h1>
                    </div>
                    <div class="login">
                        <h2>Login</h2>
                      
                        <form>
                            <div class="inputc">
                                <input type="text" placeholder="Username" onChange={(e)=>{setEmail(e.target.value)}} required />
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
    </body>
    );
}
export default LoginForm;