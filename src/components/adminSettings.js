import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {query,orderBy,limit,getDocs, addDoc } from "firebase/firestore";
import "../assets/css/adminSettings.css";
import { LibraryUsersRef } from "../context/DBContext";


function AdminSettings(){

    const [adminName, setAdminName] = useState("");
    const [adminEmail,setAdminEmail] = useState("");
    const [adminPass,setAdminPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [id,setID] = useState(0);
    const {createAdmin} = useAuth();
    const addAdmin = async () => {
        if(adminName==="" || adminEmail==="" || adminPass==="" || confirmPass==="")
        {
            alert("Please fill all the fields");
        }
        else{
            if(adminPass === confirmPass){
                try{
                    const q = query(LibraryUsersRef,orderBy("LibID","desc"),limit(1));
                    const data = await getDocs(q);
                    data.forEach((doc)=>{
                        setID((doc.data().LibID));
                    })
                    setID(id+1);
                    
                    await createAdmin(adminEmail,adminPass);
                    await addDoc(LibraryUsersRef,{
                        LibUsername: adminName,
                        LibEmail: adminEmail,
                        LibID: id,
                    })
                    alert("Admin added successfully");;
                }catch(error){
                    alert(error.message);
                }
            }
            else{
                alert("Passwords do not match");
            }
        }
        }

    return(

    <div class="BOOKS-main">
        <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />
        <div class="header">
            <div class="TRtitle">
                <h1>Admin Settings</h1>
            </div>
        </div>
    
        <div class="admin-details">
           {/* <div class="input-group">
                <label for="admin-name">Admin ID:</label>
                <input type="text" placeholder="Enter ID" id="admin-name" name="admin-name"/>
    </div>*/}

            <div class="input-group">
              <label for="admin-name">Admin Name:</label>
              <input type="text" placeholder="Enter Name" id="admin-name" name="admin-name" onChange={(e)=>{setAdminName(e.target.value)}}/>
          </div>

          <div class="input-group">
            <label for="admin-email">Email:</label>
            <input type="email" placeholder="Enter Email" id="admin-email" name="admin-email" onChange={(e)=>{setAdminEmail(e.target.value)}}/>
        </div>
    
            <div class="input-group">
                <label for="admin-password">Admin Password:</label>
                <input type="password" placeholder="Enter Password" id="admin-password" name="admin-password" onChange={(e)=>{setAdminPass(e.target.value)}}/>
            </div>

            <div class="input-group">
              <label for="admin-password">Confirm Password:</label>
              <input type="password" placeholder="Enter Password" id="admin-password" name="admin-password" onChange={(e)=>{setConfirmPass(e.target.value)}}/>
          </div>
    
           
    
            <div class="add-button">
                <button type="submit" onClick={addAdmin}>Create Admin</button>
            </div>
        </div>
    
    </div>
    );

}

export default AdminSettings;