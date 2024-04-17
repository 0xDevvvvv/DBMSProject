import React from "react";
import "../assets/css/login.css"

function LoginForm(){
    return(
            <div class="main">
                <div class="box">
                    <div class="title">
                        <h1>Library Management System</h1>
                    </div>
                    <div class="login">
                        <h2>Login</h2>
                        <form action="#">
                            <div class="inputc">
                                <input type="text" placeholder="Username" required />
                                
                            </div>
                            <div class="inputc">
                                <input type="password" placeholder="Password" required />
                            </div>
                            <a href="#" class="forget">Forget password</a>
                            <button type="submit">Log In</button>
                        </form>
                        
                    </div>
                </div>
                
            </div>
    );
}
export default LoginForm;