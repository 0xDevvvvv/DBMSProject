import React from "react";
import "../assets/css/dashboard.css";


function Dashboard(){


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
            <a href="#">
                <i class="bx bxs-dashboard"></i>
                <span class="title">Dashboard</span>
            </a>
            </li>
            <li>
            <a href="#">
                <i class="bx bxs-cog"></i>
                <span class="title">Admin Settings</span>
            </a>
            </li>
            <li class="logout">
            <a href="#">
                <i class="bx bxs-log-out-circle"></i>
                <span class="title">LogOut</span>
            </a>
            </li>
        </ul>
        </div>
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
                                <span class="bvalue">500</span>
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
                                <span class="bvalue">500</span>
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
                                <span class="bvalue">100</span>
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
                                {/*<span class="bvalue">500</span>*/}
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
                                <tr>
                                    <td>1</td>
                                    <td>dev</td>
                                    <td>jungle book</td>
                                    <td>2</td>
                                    <td>19-04-2024</td>
                                    <td>2-05-2024</td>
                                </tr>

                                <tr>
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
                                </tr>
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
    </div>
    );
}
export default Dashboard;