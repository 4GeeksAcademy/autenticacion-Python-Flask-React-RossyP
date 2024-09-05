import React from "react";
import { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import userImage from "../../img/User1.png"
import { Loader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';



export const ListUsers = () => {

    const { store, actions } = useContext(Context)
    // const nameUser = localStorage.getItem("name")

    useEffect(()=>{
        let token = localStorage.getItem("token")
        if(token){
          actions.getUsers()  
        }
        
    },[])

    const handleClickDelete = (id) => {
        actions.deleteUser(id)
        console.log("Elemento borrado "+id)
    }

    return(
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 w-100">
            {/* <div className="d-flex flex-wrap justify-content-center align-items-center bg-primary p-3 gap-3"> */}

            <div className="card mb-3 p-5 bg-transparent border-none" style={{maxWidth:"740px", border:"none", marginTop:"10px"}}>
            {store.dataUsers && store.dataUsers.length > 0 ?
                (store.dataUsers.map((user )=> (
                    <div>
                        <div class="row g-0 mb-4 bg-transparent border-none" style={{backdropFilter:"blur(10px)", border:"none", borderRadius:"10px"}}>
                            <div className="col-md-4 text-center" style={{backgroundColor:"pink"}}>
                                <img src={userImage} className="img-fluid rounded-start w-50"/>
                            </div>
                            <div className="col-md-8" style={{backgroundColor:"white"}}>
                                <div className="card-body">
                                    <h5 className="card-title">{user.name}</h5>
                                    <p className="card-text">{user.email}</p>
                                </div>
                            </div>

                            <div className="col-12 d-flex justify-content-end position-absolute pt-2 pe-2">
                                <button id={user.id} className="bg-transparent border-0" data-bs-toggle="modal" data-bs-target={`#deleteModal${user.id}`}><FontAwesomeIcon icon={faTrash} className="text-danger"/></button>
                            </div>
                        </div>

                        <div className="modal fade" id={`deleteModal${user.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false" style={{ zIndex: 1055}}>
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Are you sure you want to delete?</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <h3 classNameName="text-danger text-center fw-bold">{user.name}</h3> 
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={()=> handleClickDelete(user.id)} >Delete</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    ))
                ):(
                <div className="d-flex justify-content-center align-items-center">
                    <Loader size="lg" />
                </div>
                )
            }
            </div>
        </div>
    )
}