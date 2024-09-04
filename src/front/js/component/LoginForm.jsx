import React from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const LoginForm = () => {
    const {store, actions} = useContext(Context)
    const [ dataLog, setDataLog ] = useState({
        email: "",
        password:""
    })

    const handleDataLog = (e) =>{
        let valor = e.target.value
        let type = e.target.name
        setDataLog({...dataLog, [type]:valor})
    }

    const sendDataLog = async (e) => {
        e.preventDefault()
        try{
            console.log("data enviada", dataLog)
            await actions.login(dataLog)
            setDataLog({
                email: "",
                password:""
            })
        }catch (e){
            console.error(e)
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <h1>Login</h1>
            <form onSubmit={sendDataLog}>
                {/* EMAIL */}
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input value={dataLog.email} name="email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={handleDataLog}/>
                </div>
                {/* PASSWORD */}
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={dataLog.password} name="password" type="password" className="form-control" id="exampleInputPassword1" onChange={handleDataLog}/>
                </div>
                {/* BUTTON SUBMIT */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

