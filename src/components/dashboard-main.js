import "../assets/css/dashboard.css";

import ReturnRecentUser from "./recentUserTrnsn";
import ReturnRecentBook from "./recentBookTrnsn";

import { BookRef,UsersRef,TransactionRef } from "../context/DBContext";


import { query,where,getDocs,orderBy,limit } from "firebase/firestore";
import { useState,useEffect, useContext } from "react";
import { getCountFromServer } from "firebase/firestore";
import { SectionContext, UserContext } from "../context/context";

export default function DashboardMain(){
    const [section,setSection] = useContext(SectionContext);
    const [user,setUser] = useContext(UserContext)
    const [count,setCount ] = useState([]);
    const [transactionDetails, setTransactionDetails] = useState([]);

    const clearStates = () =>{
        setTransactionDetails([])
    }
    
    const fetchRecentTrnsnDetails = async () =>{
        
        try{
            const trnsndetails = await getDocs(query(TransactionRef,orderBy('Date','desc'),limit(5)));
            clearStates();
            {trnsndetails.forEach((doc)=>{
                setTransactionDetails((olddata)=>[...olddata,doc.data()])
                
            })}
            
        }catch(err){
            console.log(err);
        }

    }
    const fetchCountDetails = async () =>{
        try{
            
            const bookCount = await getCountFromServer(BookRef);
            const userCount = await getCountFromServer(UsersRef);
            const transactionCount = await getCountFromServer(TransactionRef);
            const returnQuery = query(TransactionRef,where("Type","==","return"));
            const returnCount = await getCountFromServer(returnQuery);
            setCount([bookCount.data().count,userCount.data().count,transactionCount.data().count,returnCount.data().count]);


        }catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        fetchCountDetails();
        fetchRecentTrnsnDetails();   
        
    },[])

    return(
        <div class="main-dashboard">
            <div class="main-header">
                <div class="main-title">
                <h1>Admin Page</h1>
                <h2>DashBoard</h2>
                </div>
                <div class="user-info">
                    <img src="https://imgs.search.brave.com/smjCUH9YjsYX8YcdogEEaLav6FnMKkm8LMZnGDO6Guo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC82Mi81OS9k/ZWZhdWx0LWF2YXRh/ci1waG90by1wbGFj/ZWhvbGRlci1wcm9m/aWxlLWljb24tdmVj/dG9yLTIxNjY2MjU5/LmpwZw" width="20%"/>
                    <h3>Welcome,{user}</h3>  
                </div>
                {/*<div class="db-search">
                    <div class="db-searchbox">
                        <i class="bx bx-search"></i>
                        <input type="text" placeholder="Search" />
                    </div>
                    
    </div>*/}
            </div>
            <div class="Lbox">
                <h3 class="Ltitle">Library Info</h3>
                <div class="Lwrap">
                    {/*book box*/}
                    <div class="book light-red" onClick={()=>{setSection(2)}}>
                        <div class="box-header">
                            <div class="bnumber">
                                <span class="booktitle" >
                                    BOOKS
                                </span>
                                <span class="btitle">
                                    Total Books
                                </span>
                                <span class="bvalue">{count[0]}</span>
                            </div>
                            {/*icon*/}
                            <i class='bx bxs-book'></i>
                        </div>
                    </div>
                    {/*user box*/}
                    <div class="book light-purple" >
                        <div class="box-header">
                            <div class="bnumber" onClick={()=>{setSection(3)}}>
                                <span class="booktitle">
                                        USERS
                                </span>
                                <span class="btitle">
                                    Total Users
                                </span>
                                <span class="bvalue">{count[1]}</span>
                            </div>
                            {/*icon*/}
                            <i class='bx bxs-user'></i>
                        </div>
                    </div>
                    {/*book transactions*/}
                    <div class="book light-green" >
                        <div class="box-header">
                            <div class="bnumber" onClick={()=>{setSection(4)}}>
                                <span class="booktitle">
                                        BOOK TRANSACTIONS
                                </span>
                                <span class="btitle">
                                    Total Transactions
                                </span>
                                <span class="bvalue">{count[2]}</span>
                            </div>
                            {/*icon*/}
                            <i class='bx bxs-book'></i>
                        </div>
                    </div>
                    <div class="book light-blue" >
                        <div class="box-header">
                            <div class="bnumber">
                                <span class="booktitle">
                                        RETURN BOOKS
                                </span>
                                <span class="btitle">
                                    Details
                                </span>
                                <span class="bvalue">{count[3]}</span>
                            </div>
                            <i class='bx bxs-book'></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="Ttable">
                <h3 class="Ttitle">RECENT BOOK TRANSACTION</h3>
                <div class="container">
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>Book Name</th>
                                <th>Book ID</th>
                                <th>Date</th>
                                <th>Type</th> 
                            </tr>
                        </thead>
                            <tbody>
                                
                                {transactionDetails.map((d)=>{
                                        return(
                                        <tr>
                                            <td>{d.UserID}</td>
                                            <ReturnRecentUser UserID={d.UserID}/>
                                            <ReturnRecentBook BookID={d.BookID}/>
                                            <td>{d.BookID}</td>
                                            <td>{d.Date.toString()}</td>{/*&&d.Date.toDate()&&d.Date.toDate().toString()*/}
                                            <td>{d.Type}</td>
                                        </tr>
                                    )
                                    })}
                                        {/*<tr>
                                            
                                        </tr>*/}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}