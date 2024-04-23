import React from "react";
import "../assets/css/forgotPassword.css";



function ForgotPassword(){
    
    const style= {
        font: "Arial, sans-serif",
        margin: "0",
        padding: "0"
    }
    return(
    <body style={{style}}>
    <div class="Forgetmain">
        <div class="Forgetcontainer">
            <form class="Forgetpassword-form" id="ForgetpasswordForm">
                <h2>Admin Verification</h2>
                <p>Please enter your admin email and the email password to reset the password.</p>
                <div class="Forgetform-group">
                    <label for="adminEmail">Admin Email:</label>
                    <input type="email" id="adminEmail" name="adminEmail" placeholder="Enter admin email" required/>
                </div>
                <div class="Forgetform-group">
                    <label for="adminPassword">Email Password:</label>
                    <input type="password" id="adminPassword" name="adminPassword" placeholder="Enter email password" required/>
                </div>
                <div class="Forgetform-group">
                    <label for="adminPassword">New Password:</label>
                    <input type="password" id="adminPassword" name="adminPassword" placeholder="Enter new password" required/>
                </div>
                <div class="Forgetform-group">
                    <label for="adminPassword">Confirm Password:</label>
                    <input type="password" id="adminPassword" name="adminPassword" placeholder="Enter confirm password" required/>
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    </div>
    </body>

    );

}
export default ForgotPassword;