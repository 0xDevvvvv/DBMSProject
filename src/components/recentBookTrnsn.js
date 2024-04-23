import { useState,useEffect } from "react";
import { BookRef } from "../context/DBContext";
import { getDocs,where,query,limit } from "firebase/firestore";

function ReturnRecentBook (props) {
    const [bookDetails,setBookDetails] = useState([]);
    const fetchBookDetails = async () =>{
        try{
                const data = await getDocs(query(BookRef,where("BookID","==",props.BookID)),limit(1))
                data.forEach((doc)=>{
                    setBookDetails(doc.data())

                })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchBookDetails()
    },[])
    return(<td>{bookDetails.BookName}</td>);
}
export default ReturnRecentBook;