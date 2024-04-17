import React from "react";

function LoginForm(){
    return(<div><!DOCTYPE html>
        <html lang="en">
        <head>
            <link href="login2.CSS" rel="stylesheet" type="text/CSS" />
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Library Management System</title>
        </head>
        <body>
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
        </body>
        </html></div>);
}
export default LoginForm;