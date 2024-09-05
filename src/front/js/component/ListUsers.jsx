import React from "react";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import userImage from "../../img/User1.png"

export const ListUsers = () => {

    const { store, actions } = useContext(Context)

    useEffect(()=>{
        let token = localStorage.getItem("token")
        if(token){
          actions.getUsers()  
        }
        
    },[])
    return(
        <div className="d-flex justify-content-center align-items-center min-vh-100 w-100">
            {/* <div className="d-flex flex-wrap justify-content-center align-items-center bg-primary p-3 gap-3"> */}
            <div class="card mb-3 p-5 mt-5 bg-transparent border-none" style={{maxWidth:"740px", border:"none", backdropFilter:"blur(100px)"}}>
            {store.dataUsers && store.dataUsers.length > 0 ?
                (store.dataUsers.map((user )=> (
                    // <div key={user.id} className="d-flex flex-row justify-content-center align-items-center gap-3 bg-warning ps-3 rounded" style={{minWidth:"80%"}}>
                    //     <div className="fs-1 bg-danger w-25 d-flex justify-content-center align-items-center">
                    //         <FontAwesomeIcon icon={faUser} />
                    //     </div>
                    //     <div className="d-flex flex-column justify-content-center align-items-start bg-white pt-3 px-3 w-100">
                    //         <h5>{user.name}</h5>
                    //         <p>{user.email}</p> 
                    //     </div>
                        
                    // </div>
                    <div class="row g-0 mb-4 bg-transparent border-none" style={{backdropFilter:"blur(10px)", border:"none", borderRadius:"10px"}}>
                        <div className="col-md-4 text-center" style={{backgroundColor:"pink"}}>
                            <img src={userImage} className="img-fluid rounded-start w-75"/>
                        </div>
                        <div className="col-md-8" style={{backgroundColor:"white"}}>
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <p className="card-text">{user.email}</p>
                            </div>
                        </div>
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