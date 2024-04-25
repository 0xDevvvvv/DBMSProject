import React from "react"; 

import { useState ,useEffect} from "react";
import { BookRef,BookGenreRef } from "../context/DBContext";
import { getDocs,deleteDoc,doc,getCountFromServer,query,where,or, orderBy } from "firebase/firestore";
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
    const [genreID,setGenreID] = useState("");

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
            const q = query(BookRef,orderBy("BookID","desc"));
            const data = await getDocs(q)
            const filtereddata = data.docs.map((doc)=>({
                ...doc.data(),
                id:doc.id,
            }));
            setBookDetails(filtereddata);
        }catch(err){
            console.log(err)
        }
        
    }
    const deleteBooks = async (id,bookID) => {
        try{
            
            const d = doc(BookRef,id);
            const genre = query(BookGenreRef,where("BookID","==",bookID))
            const genredata = await getDocs(genre);
            genredata.forEach(async (d)=>{
                const genredoc = doc(BookGenreRef,d.id)
                await deleteDoc(genredoc);
            })
            await deleteDoc(d);
            alert("Book Deleted Successfully");
            fetchBookDetails();
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
                        <i class="bx bx-search" ></i>
                        <input type="text" placeholder="Search" onChange={(e)=>{setSearchParam(e.target.value)}} />
                    </div>
                </div>
                
            </div>
            <div class="BOOKS-add-button">
                <Popup trigger={<button type="submit">Add Book</button>} position="right center">
                    <AddBook/>
                </Popup>
                <button type="submit">Edit Book</button>
                <button type="submit" onClick={fetchBookDetails}>Refresh</button>
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
                                {/*<th>Return Date</th>*/} 
                                <th></th>
                            </tr>
                        </thead>
        
                        <tbody>
                            {bookdetails
                            .filter((doc)=>{
                                return ((searchParam.toLowerCase()===""?doc:doc.BookName.toLowerCase().includes(searchParam) ))
                            })
                            .map((doc)=>{
                                return(
                                <tr key={doc.BookID}>
                                    <td>{doc.BookID}</td>
                                    <td>{doc.BookName}</td>
                                    <td>{doc.LibID}</td>
                                    <td>{doc.BookAvailability}</td>
                                    <GetGenre BookID={doc.BookID}/>
                                   {/*<td>{doc.ReturnBookDate&&doc.ReturnBookDate.toDate()&&doc.ReturnBookDate.toDate().toString()}</td>*/}
                                    <td><button class="delete-btn" onClick={()=>{deleteBooks(doc.id,doc.BookID)}}><i class='bx bxs-trash'></i>Delete</button></td>
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
                                {/*<td></td>*/}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        
        </div>
    );
}
export default Books;