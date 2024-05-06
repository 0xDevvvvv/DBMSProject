import React from "react";
import Popup from "reactjs-popup";
import { UserPhoneRef, UsersRef } from "../context/DBContext";
import { where,getCountFromServer,query,getDocs,orderBy ,updateDoc,deleteDoc,doc} from "firebase/firestore";
import { useEffect,useState } from "react";
import Select from "react-dropdown-select";
import AddUser from "./addUser";
import "../assets/css/books.css";



function EditUser(props){


    const [userName,setUserName] = useState(props.UserName);
    const [UserAddress,setUserAddress] = useState(props.UserAddress);
    const [phone,setPhone] = useState("");
    const [email,setEmail] = useState(props.email);
    const [UserID,setUserID] = useState(props.UserID);
    const [phoneID,setPhoneID] = useState("");
    const id = props.id;

    
    const getPhone = async()=>{
        const q = query(UserPhoneRef,where("UserID","==",Number(UserID)));
        try{
            const data = await getDocs(q);
            data.forEach((doc)=>{
                setPhone(doc.data().UserPhoneNo)
                setPhoneID(doc.id);
            })
        }catch(err){
            console.log(err)
        }
    }   

    const updateUser = async (e) =>{
        e.preventDefault();
        const b = doc(UsersRef,id);
        const g = doc(UserPhoneRef,phoneID);
        try{
            await updateDoc(b,{
                UserName : userName,
                UserAddress : UserAddress,
                Email : email
            }
            )
            await updateDoc(g,{
                UserPhoneNo :phone,
            })

            alert("User Updated Successfully. Please Refresh to see changes")
        }catch(err){
            console.log(err)
        }

    }

    useEffect(()=>{
        getPhone();
    },[])

    return(
        <div class="book-form">
            <link
            href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
            rel="stylesheet"
            />
            <h2>User Information</h2>
            <form id="bookForm">
                <label for="bookName">User Name:</label>
                <input type="text" id="bookName" placeholder="Enter User Name" name="bookName" value={userName} onChange={(e)=>{setUserName(e.target.value)}} required />
                
                <label for="author">Address:</label>
                <input type="text" id="author" placeholder="Enter Address" name="author" value={UserAddress} required onChange={(e)=>{setUserAddress(e.target.value)}} />
                
                <label for="genre">Genre:</label>
                <input type="text" id="genre" placeholder="Enter phone" name="genre" value={phone} required onChange={(e)=>{setPhone(e.target.value)}} />
                
                <label for="availability">Email:</label>
                <input type="email" id="availability" placeholder="Enter Email" name="availability" value={email} required onChange={(e)=>{setEmail(e.target.value)}} />
                <input type="submit" onClick={(e)=>{updateUser(e)}} value="Submit"  />
            </form>
        </div>
    );
}


function GetPhone(props){
    const [phone,setPhone] = useState("");
    const fetchPhone = async () =>{
        const q = query(UserPhoneRef,where("UserID","==",Number(props.UserID)))
        const data = await getDocs(q);
        data.forEach((doc)=>{
            setPhone(doc.data().UserPhoneNo);
        })
    }
    useEffect(()=>{
        fetchPhone();
    },[])
    return(phone);
}


function Users(){
    const [userCount,setUserCount] = useState(0);
    const [search,setSearch] = useState("");
    const [userdetails, setUserDetails] = useState([]);
    const [searchParam,setSearchParam] = useState("UserName");
    const options = [{value:"Email",label:"Email"},{value:"UserID",label:"UserID"},{value:"Place",label:"Place"},{value:"UserName",label:"UserName"}]


    const fetchUserCount =  async() =>{
        try{
            const q = await getCountFromServer(UsersRef);
            setUserCount(q.data().count);
        }catch(err){
            console.log(err)
        }
    }
    const fetchUserDetails = async () =>{
        try{
            const q = query(UsersRef,orderBy("UserID","desc"));
            const data = await getDocs(q)
            const filtereddata = data.docs.map((doc)=>({
                ...doc.data(),
                id:doc.id,
            }));
            setUserDetails(filtereddata);
        }catch(err){
            console.log(err)
        }
        
    }
    const deleteUsers = async (id,UserID) => {
        try{
            
            const d = doc(UsersRef,id);
            const phone = query(UserPhoneRef,where("UserID","==",UserID))
            const phonedata = await getDocs(phone);
            phonedata.forEach(async (d)=>{
                const phonedoc = doc(UserPhoneRef,d.id)
                await deleteDoc(phonedoc);
            })
            await deleteDoc(d);
            alert("User Deleted Successfully");
            fetchUserDetails();
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchUserCount();
        fetchUserDetails();
    },[])


    return(
    <div class="BOOKS-main">
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"  rel="stylesheet"/>
        <div class="BOOKS-header">
            <div class="BOOKS-title">
              <h1>USERS</h1>
              <h2>Total Users</h2>
              <h2>{userCount}</h2>
              
            </div>
           
           
            <div class="BOOKS-search">
            <Select placeholder="Search Filter (Default:UserName)" value = {searchParam}  options={options} onChange={(values)=>{(values.map((d)=>{setSearchParam(d.value)}))}} /> 
              <div class="BOOKS-searchbox">
                <i class="bx bx-search"></i>
    
                <input type="text" placeholder="Search" onChange={(e)=>{setSearch(e.target.value)}}/>
              </div>
              
            </div>
          </div>
          <div class="BOOKS-add-button">
            <Popup trigger={<button type="submit">Add User</button>} position="left"><AddUser/> </Popup>
            <button type="submit" class="refresh-btn" onClick={()=>{fetchUserDetails();fetchUserCount();}}><i class='bx bx-refresh'></i></button>
        </div>
        <div class="BOOKS-Ttable">
            <h3 class="BOOKS-Ttitle">USERS DATA</h3>
            <div class="BOOKS-container">
                <table class="BOOKS-table">
                    <thead class="BOOKS-thead">
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>place</th>
                            <th>Email</th>
                            <th>Phone Number</th> 
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                            {userdetails
                                .filter((doc)=>{
                                    return ((search.toLowerCase()===""?doc:(doc.UserName.toLowerCase().includes(search) && searchParam==="UserName") || (doc.UserAddress.toLowerCase().includes(search) && searchParam==="Place") || (doc.Email.toLowerCase().includes(search) && searchParam==="Email") || (doc.UserID==Number(search) && searchParam==="UserID") ))
                                })
                                .map((doc)=>{
                                    return(
                                    <tr key={doc.UserID}>
                                        <td>{doc.UserID}</td>
                                        <td>{doc.UserName}</td>
                                        <td>{doc.UserAddress}</td>
                                        <td>{doc.Email}</td>
                                        <td><GetPhone UserID={doc.UserID}/></td>
                                    {/*<td>{doc.ReturnBookDate&&doc.ReturnBookDate.toDate()&&doc.ReturnBookDate.toDate().toString()}</td>*/}
                                        <td id="fn-btn">
                                            <button class="delete-btn" onClick={()=>{deleteUsers(doc.id,doc.UserID)}}><i class='bx bxs-trash'></i></button>
                                            <Popup trigger={<button class="edit-btn"><i class='bx bxs-pencil'></i></button>} position="left"><EditUser id={doc.id} UserID={doc.UserID} UserAddress={doc.UserAddress} email={doc.Email} UserName={doc.UserName}  /></Popup>
                                        </td>
                                    </tr>
                                    );
                                })   
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="6"></td>
                                
                            </tr>
                        </tfoot>
                    
                </table>
            </div>
         </div>
    </div>


    );
}

export default Users;