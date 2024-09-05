import React from "react";
import { ListUsers } from "../component/ListUsers.jsx";
import { Navbar } from "../component/navbar.js"
import "../../styles/usersList.css";


export const PageUsersList = () => {
    return(
        <div className="fondoUsersList">
            <Navbar/>
            <ListUsers/>
        </div>
    )
}