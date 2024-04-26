import React, { useEffect } from "react";
import {SectionContext} from "../context/context";
import { useState } from "react";
import Users from "./users";
import { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import Books from "./books";
import DashboardMain from "./dashboard-main";
import AdminSettings from "./adminSettings";
import BookTransaction from "./bookTransaction";
import "../assets/css/dashboard.css";


function Dashboard(){
    const [section,setSection] = useContext(SectionContext);
    const {logout} = useAuth();
    const handleLogout = async () =>{
        try{
            await logout();
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        setSection(0);
    },[])
    
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
            <a onClick={()=>{setSection(0)}} href="#" >
                <i class="bx bxs-dashboard"></i>
                <span class="title">Dashboard</span>
            </a>
            </li>
            <li>
            <a onClick={()=>{setSection(1)}} href="#admin-settings">
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
        {
            {
                0:<DashboardMain/>,
                1:<AdminSettings/>,
                2:<Books/>,
                3:<Users/>,
                4:<BookTransaction/>
            }[section]
        }
    </div>
    );
}
export default Dashboard;