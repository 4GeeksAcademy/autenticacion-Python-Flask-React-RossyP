import React from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';



export const LoginForm = () => {
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
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
            navigate("/list-users")
        }catch (e){
            console.error(e)
        }
    }

    const handleButtonCreate = () => {
        navigate("/register")
    }

    return(
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="p-3 w-25 d-flex flex-column gap-3" style={{backdropFilter:"blur(50px)", minWidth:"350px"}}>
                <form onSubmit={sendDataLog} className="bg-white p-3 d-flex flex-column">
                    {/* EMAIL */}
                    {/* <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input value={dataLog.email} name="email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={handleDataLog}/>
                    </div> */}

                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <div className="form-floating"  style={{width:"85%"}}>
                            <input value={dataLog.email} name="email" type="text" className="form-control" id="floatingInputEmail" placeholder="email" onChange={handleDataLog}/>
                            <label htmlFor="floatingInputEmail">Email</label>
                        </div>
                    </div>
                    {/* PASSWORD */}
                    {/* <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input value={dataLog.password} name="password" type="password" className="form-control" id="exampleInputPassword1" onChange={handleDataLog}/>
                    </div> */}

                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faKey} />
                        </span>
                        <div className="form-floating" style={{width:"85%"}}>
                            <input value={dataLog.password} name="password" type="text" className="form-control" id="floatingInputPassword" placeholder="password" onChange={handleDataLog}/>
                            <label htmlFor="floatingInputPassword">Password</label>
                        </div>
                    </div>
                    {/* BUTTON SUBMIT */}
                    <button type="submit" className="btn btn-primary">Login</button>
                    
                </form>

                <div className="bg-white p-3 d-flex flex-column">
                    <p className="text-center">Don't have an account?</p>
                    {/* <Link to="/register">Sign up</Link> */}
                    <button onClick={handleButtonCreate} type="button" class="btn btn-outline-success">Create Account</button>
                </div>
            </div>
        </div>
    )
}

