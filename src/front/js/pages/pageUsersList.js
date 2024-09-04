import React from "react";
import { ListUsers } from "../component/ListUsers.jsx";
import { Navbar } from "../component/navbar.js"

export const PageUsersList = () => {
    return(
        <div>
            <Navbar/>
            <ListUsers/>
        </div>
    )
}