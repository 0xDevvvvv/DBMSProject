import "../assets/css/dashboard.css";

import { query,where,getDocs, orderBy,limit } from "firebase/firestore";
import { useState,useEffect } from "react";
import { BookRef,UsersRef,TransactionRef } from "../context/DBContext";
import { getCountFromServer } from "firebase/firestore";

export default function DashboardMain(){
    
    const [count,setCount ] = useState([]);
    const [transactionDetails, setTransactinDetails] = useState([]);

    const fetchRecentTrnsnDetails = async () =>{
        try{
            const trnsndetails = await getDocs(query(TransactionRef,orderBy('Date','asc'),limit(5)));
            const filtereddata = trnsndetails.docs.map((doc)=>({
                ...doc.data(),
                id:doc.id,
            }));
            setTransactinDetails(filtereddata);
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
                <div class="db-search">
                    <div class="db-searchbox">
                        <i class="bx bx-search"></i>
                        <input type="text" placeholder="Search" />
                    </div>
                    {/*img*/}
                </div>
            </div>
            <div class="Lbox">
                <h3 class="Ltitle">Library Info</h3>
                <div class="Lwrap">
                    {/*book box*/}
                    <div class="book light-red" >
                        <div class="box-header">
                            <div class="bnumber">
                                <span class="booktitle">
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
                            <div class="bnumber">
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
                            <div class="bnumber">
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
                                <th>Return Date</th> 
                            </tr>
                        </thead>
                            <tbody>
                                {transactionDetails.map((doc)=>{
                                    return(
                                        <tr>
                                            <td>{doc.UserID}</td>
                                            <td>dev</td>
                                            <td>{doc.Type}</td>
                                            <td>{doc.BookID}</td>
                                            <td>19-04-2024</td>
                                            <td>2-05-2024</td>
                                        </tr>

                                    )
                                })                                }

                                {/*<tr>
                                    <td>1</td>
                                    <td>nadana</td>
                                    <td>jungle book</td>
                                    <td>2</td>
                                    <td>19-04-2024</td>
                                    <td>2-05-2024</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>adwaid</td>
                                    <td>jungle book</td>
                                    <td>2</td>
                                    <td>19-04-2024</td>
                                    <td>2-05-2024</td>
                                </tr>

                                <tr>
                                    <td>1</td>
                                    <td>dhil</td>
                                    <td>jungle book</td>
                                    <td>2</td>
                                    <td>19-04-2024</td>
                                    <td>2-05-2024</td>
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