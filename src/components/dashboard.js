import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardMain from "./dashboard-main";
import "../assets/css/dashboard.css";


function Dashboard(){

    const {logout} = useAuth();
    const handleLogout = async () =>{
        try{
            await logout();
        }catch(error){
            console.log(error);
        }
    }
    const [ section,setSection ] = useState(true);
    const style = {
        display:"flex",
    }

    return(
    <div style={style}>
        <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
        />
        <div class="sidebar">
            <div class="logo"></div>
            <ul class="menu">
            <li>
            <a onClick={()=>{setSection(true)}} href="">
                <i class="bx bxs-dashboard"></i>
                <span class="title">Dashboard</span>
            </a>
            </li>
            <li>
            <a onClick={()=>{setSection(false)}} href="#admin-settings">
                <i class="bx bxs-cog"></i>
                <span class="title">Admin Settings</span>
            </a>
            </li>
            <li class="logout">
            <a onClick={handleLogout}>
                <i class="bx bxs-log-out-circle"></i>
                <span class="title">LogOut</span>
            </a>
            </li>
        </ul>
        </div>
        {section ?
            <DashboardMain/> :
            <div>Hello</div>
        }
    </div>
    );
}
export default Dashboard;