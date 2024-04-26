import React from "react";
import { useState ,useEffect} from "react";
import Popup from "reactjs-popup";
import { query,getCountFromServer,getDocs } from "firebase/firestore";
import ReturnRecentBook from "./recentBookTrnsn";
import ReturnRecentUser from "./recentUserTrnsn";
import "../assets/css/books.css";
import { TransactionRef } from "../context/DBContext";
import AddTransaction from "./addTransaction";


function BookTransaction(){

    const [transactionCount,setTransactionCount] = useState(0);
    const [transactionDetails,setTransactionDetails] = useState([]);

    const fetchTCount =  async() =>{
        try{
            const q = await getCountFromServer(TransactionRef);
            setTransactionCount(q.data().count);
        }catch(err){
            console.log(err)
        }
    }
    const clearStates = () =>{
        setTransactionDetails([])
    }
    const fetchTDetails = async () =>{
        try{
            const data = await getDocs(TransactionRef);
            const filtereddata = data.docs.map((doc)=>({
                ...doc.data(),
                id:doc.id,
            }));
            setTransactionDetails(filtereddata);
        }catch(err){
            console.log(err);
        }

        
    }



    useEffect(()=>{
        fetchTCount();
        fetchTDetails();
        
    },[transactionCount])

    return(
        <div class="BOOKS-main">
            <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
            />
        <div class="BOOKS-header">
            <div class="TRtitle">
              <h1>BOOK TRANSACTIONS</h1>
              <h2>Total Transactions</h2>
              <h2>{transactionCount}</h2>
              
            </div>
           
           
            <div class="BOOKS-search">
              <div class="BOOKS-searchbox">
                <i class="bx bx-search"></i>
                <input type="text" placeholder="Search" />
              </div>
              
            </div>
          </div>
          <div class="BOOKS-add-button">
                <Popup trigger={<button type="submit">Add Transaction</button>} position="left top">
                    <AddTransaction/>
                </Popup>
                {/*<button type="submit">Edit Book</button>*/}
                <button type="submit" class="refresh-btn" onClick={()=>{fetchTCount();fetchTDetails();}}><i class='bx bx-refresh'></i></button>
        </div>
       
        <div class="BOOKS-Ttable">
            <h3 class="BOOKS-Ttitle">BOOK TRANSACTION DATA</h3>
            <div class="BOOKS-container">
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Book ID</th>
                            <th>Book Name</th>
                            <th>Publish Date</th>
                            <th>Return Date</th> 
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
                                            <td>{d.Date&&d.Date.toDate()&&d.Date.toDate().toString()}</td>
                                            <td>{d.Type}</td>
                                        </tr>
                                    )
                                    })}

                            

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
export default BookTransaction;;