import { useState,useEffect } from "react";
import { UsersRef } from "../context/DBContext";
import { getDocs,where,query,limit } from "firebase/firestore";

function ReturnRecentUser (props) {
    const [userDetails,setUserDetails] = useState([]);
    const fetchUserDetails = async () =>{
        try{
                const data = await getDocs(query(UsersRef,where("UserID","==",props.UserID)),limit(1))
                data.forEach((doc)=>{
                    setUserDetails(doc.data())

                })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchUserDetails()
    },[])
    return(<td>{userDetails.UserName}</td>);
}
export default ReturnRecentUser;