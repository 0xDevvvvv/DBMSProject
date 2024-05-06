import React, { useContext } from "react"; 
import { UserContext } from "../context/context";
import { useState ,useEffect} from "react";
import { BookRef,BookGenreRef } from "../context/DBContext";
import { getDocs,deleteDoc,doc,getCountFromServer,query,where,or, orderBy,updateDoc } from "firebase/firestore";
import Select from "react-dropdown-select";
import Popup from "reactjs-popup";
import AddBook from "./addBook";


import "../assets/css/books.css";


function EditBook(props){


    const [bookName,setBookName] = useState(props.BookName);
    const [authorName,setAuthorName] = useState(props.author);
    const [genre,setGenre] = useState("");
    const [availability,setAvailability] = useState(props.avail);
    const [BookID,setBookID] = useState(props.bookID);
    const [genreID,setGenreID] = useState("");
    const id = props.id;

    const getGenre = async()=>{
        const q = query(BookGenreRef,where("BookID","==",Number(BookID)));
        try{
            const data = await getDocs(q);
            data.forEach((doc)=>{
                setGenre(doc.data().Genre)
                setGenreID(doc.id);
            })
        }catch(err){
            console.log(err)
        }
    }   

    const updateBook = async (e) =>{
        e.preventDefault();
        const b = doc(BookRef,id);
        const g = doc(BookGenreRef,genreID);
        try{
            await updateDoc(b,{
                BookName : bookName,
                Author : authorName,
                BookAvailability : Number(availability)}
            )
            await updateDoc(g,{
                Genre : genre,
            })

            alert("Book Updated Successfully. Please Refresh to see changes")
        }catch(err){
            console.log(err)
        }

    }

    useEffect(()=>{
        getGenre();
    },[])

    return(
        <div class="book-form">
            <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
            />
            <h2>Book Information</h2>
            <form id="bookForm">
                <label for="bookName">Book Name:</label>
                <input type="text" id="bookName" placeholder="Enter Book Name" name="bookName" value={bookName} onChange={(e)=>{setBookName(e.target.value)}} required />
                
                <label for="author">Author:</label>
                <input type="text" id="author" placeholder="Enter Author Name" name="author" value={authorName} required onChange={(e)=>{setAuthorName(e.target.value)}} />
                
                <label for="genre">Genre:</label>
                <input type="text" id="genre" placeholder="Enter Genre" name="genre" value={genre} required onChange={(e)=>{setGenre(e.target.value)}} />
                
                <label for="availability">Availability:</label>
                <input type="number" id="availability" placeholder="Enter Availability" name="availability" value={availability} required onChange={(e)=>{setAvailability(e.target.value)}} />
                <input type="submit" onClick={(e)=>{updateBook(e)}} value="Submit"  />
            </form>
        </div>
    );
}


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
    return(genre);
}

function Books(){

    const options = [{value:"Author",label:"Author"},{value:"BookID",label:"BookID"},{value:"BookName",label:"Book Name"}]

    const [booksCount,setBooksCount] = useState(0);
    const [bookdetails, setBookDetails] = useState([]);
    const [searchParam,setSearchParam] = useState("");
    const [addBookForm,setAddBookForm] = useState(false);
    const [search,setSearch] = useState("BookName");
    const [genreID,setGenreID] = useState("");

    {/*const bookSearch = async () =>{
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
    }*/}

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
            setBooksCount(booksCount-1)
        }catch(err){
            console.log(err)
        }
    }


    useEffect(()=>{
        fetchBookCount();
        fetchBookDetails();
    },[booksCount])

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
                <Select placeholder="Search Filter (Default:BookName)" value = {searchParam}  options={options} onChange={(values)=>{(values.map((d)=>{setSearchParam(d.value)}))}} /> 
                    <div class="BOOKS-searchbox">
                        <i class="bx bx-search" /*onClick={bookSearch}*/></i>
                        <input type="text" placeholder="Search" onChange={(e)=>{setSearch(e.target.value)}} />
                    </div>
                </div>
                
            </div>
            <div class="BOOKS-add-button">
                <Popup trigger={<button type="submit">Add Book</button>} position="left center">
                    <AddBook/>
                </Popup>
                {/*<button type="submit">Edit Book</button>*/}
                <button type="submit" class="refresh-btn" onClick={()=>{fetchBookCount();fetchBookDetails();}}><i class='bx bx-refresh'></i></button>
            </div>
            <div class="BOOKS-Ttable">
                <h3 class="BOOKS-Ttitle">BOOKS DATA</h3>
                <div class="BOOKS-container">
                    <table class="BOOKS-table">
                        <thead class="BOOKS-thead">
                            <tr>
                                <th>Book ID</th>
                                <th>Book Name</th>
                                <th>Author Name</th>
                                <th>Genre</th>
                                <th>Availability</th>
                                 
                                {/*<th>Return Date</th>*/} 
                                <th></th>
                            </tr>
                        </thead>
        
                        <tbody>
                            {bookdetails
                            .filter((doc)=>{
                                return ((search.toLowerCase()===""?doc:(doc.BookName.toLowerCase().includes(search)&&searchParam==="BookName") || (doc.Author.toLowerCase().includes(search)&&searchParam==="Author") || (doc.BookID===Number(search)&&searchParam==="BookID")))
                            })
                            .map((doc)=>{
                                return(
                                <tr key={doc.BookID}>
                                    <td>{doc.BookID}</td>
                                    <td>{doc.BookName}</td>
                                    <td>{doc.Author}</td>
                                    <td><GetGenre BookID={doc.BookID}/></td>
                                    <td>{doc.BookAvailability}</td>
                                    
                                   {/*<td>{doc.ReturnBookDate&&doc.ReturnBookDate.toDate()&&doc.ReturnBookDate.toDate().toString()}</td>*/}
                                    <td id="fn-btn">
                                        <button class="delete-btn" onClick={()=>{deleteBooks(doc.id,doc.BookID)}}><i class='bx bxs-trash'></i></button>
                                        <Popup trigger={<button class="edit-btn"><i class='bx bxs-pencil'></i></button>} position="left"><EditBook id={doc.id} bookID={doc.BookID} author={doc.Author} avail={doc.BookAvailability} BookName={doc.BookName}  /></Popup>
                                    </td>
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