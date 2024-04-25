import React from "react"; 

import { useState ,useEffect} from "react";
import { BookRef,BookGenreRef } from "../context/DBContext";
import { getDocs,getCountFromServer,query,where,or } from "firebase/firestore";
import Popup from "reactjs-popup";
import AddBook from "./addBook";


import "../assets/css/books.css";



function GetGenre(props){
    const [genre,setGenre] = useState("");
    const fetchGenre = async () =>{
        const q = query(BookGenreRef,where("BookID","==",Number(props.BookID)))
        const data = await getDocs(q);
        data.forEach((doc)=>{
            setGenre(doc.data().Genre);
        })
    }
    useEffect(()=>{
        fetchGenre();
    },[])
    return(<td>{genre}</td>);
}

function Books(){
    const [booksCount,setBooksCount] = useState(0);
    const [bookdetails, setBookDetails] = useState([]);
    const [searchParam,setSearchParam] = useState("");
    const [addBookForm,setAddBookForm] = useState(false);

    const bookSearch = async () =>{
        if(searchParam=="")
        {
            fetchBookDetails();
        }
        else{
            try{
                const q = query(BookRef,or(where("BookName","==",searchParam),where("BookID","==",Number(searchParam))));
                const data = await getDocs(q);
                const filtereddata = data.docs.map((doc)=>({
                    ...doc.data(),
                    id:doc.id,
                }));
                setBookDetails(filtereddata);
            }
            catch(err){
                console.log(err);
            }
        }
    }

    const fetchBookCount =  async() =>{
        try{
            const q = await getCountFromServer(BookRef);
            setBooksCount(q.data().count);
        }catch(err){
            console.log(err)
        }
    }
    const fetchBookDetails = async () =>{
        try{
            const data = await getDocs(BookRef)
            const filtereddata = data.docs.map((doc)=>({
                ...doc.data(),
                id:doc.id,
            }));
            setBookDetails(filtereddata);
        }catch(err){
            console.log(err)
        }
        
    }

    useEffect(()=>{
        fetchBookCount();
        fetchBookDetails();
    },[])

    return(

        
        <div class="BOOKS-main">
            <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"  rel="stylesheet"/>
            <div class="BOOKS-header">
                <div class="BOOKS-title">
                    <h1>BOOKS</h1>
                    <h2>Total Books</h2>
                    <h2>{booksCount}</h2>
                </div>
                <div class="BOOKS-search">
                    <div class="BOOKS-searchbox">
                        <i class="bx bx-search" onClick={bookSearch}></i>
                        <input type="text" placeholder="Search" onChange={(e)=>{setSearchParam(e.target.value)}} />
                    </div>
                </div>
                
            </div>
            <div class="BOOKS-add-button">
                <Popup trigger={<button type="submit">Add Book</button>} position="right center">
                    <AddBook/>
                </Popup>
            </div>
            <div class="BOOKS-Ttable">
                <h3 class="BOOKS-Ttitle">BOOKS DATA</h3>
                <div class="BOOKS-container">
                    <table class="BOOKS-table">
                        <thead class="BOOKS-thead">
                            <tr>
                                <th>Book ID</th>
                                <th>Book Name</th>
                                <th>Lib ID</th>
                                <th>Availability</th>
                                <th>Genre</th> 
                                <th>Return Date</th> 
                            </tr>
                        </thead>
        
                        <tbody>
                            {bookdetails.map((doc)=>{
                                return(
                                <tr>
                                    <td>{doc.BookID}</td>
                                    <td>{doc.BookName}</td>
                                    <td>{doc.LibID}</td>
                                    <td>{doc.BookAvailability}</td>
                                    <GetGenre BookID={doc.BookID}/>
                                    <td>{doc.ReturnBookDate&&doc.ReturnBookDate.toDate()&&doc.ReturnBookDate.toDate().toString()}</td>
                                </tr>

                                );
                            })
                                
                            }
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
export default Books;