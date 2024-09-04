import React from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [ data, setData ] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleData = (e) => {
        let valor = e.target.value
        let type = e.target.name
        setData({...data, [type]:valor})
        // console.log(valor)
        // console.log(type)
    }

    const sendData = async (e) => {
        e.preventDefault()
        try{
            await actions.register(data)
            setData({
                name: "",
                email: "",
                password: ""
            })
            navigate("/")
        }catch (error){
            console.error(error)
        }
    }
    
    console.log(data)
    return(
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <h1>Register</h1>
            <form onSubmit={sendData}>
                {/* NAME */}
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input value={data.name} name="name" type="name" className="form-control" id="inputName" aria-describedby="nameHelp" onChange={handleData}/>
                </div>
                {/* EMAIL */}
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input value={data.email} name="email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={handleData}/>
                </div>
                {/* PASSWORD */}
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={data.password} name="password" type="password" className="form-control" id="exampleInputPassword1" onChange={handleData}/>
                </div>
                {/* BUTTON SUBMIT */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}