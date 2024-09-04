import React from "react";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const ListUsers = () => {

    const { store, actions } = useContext(Context)

    useEffect(()=>{
        let token = localStorage.getItem("token")
        if(token){
          actions.getUsers()  
        }
        
    },[])
    return(
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="d-flex flex-wrap">
            {store.dataUsers && store.dataUsers.length > 0 ?
                (store.dataUsers.map((user )=> (
                    <div key={user.id}>
                        <h5>{user.name}</h5>
                        <p>{user.email}</p>
                    </div>
                    ))
                ):(
                <div>
                    <h1>No hay datos que mostrar</h1>
                </div>
                )
            }
            </div>
        </div>
    )
}