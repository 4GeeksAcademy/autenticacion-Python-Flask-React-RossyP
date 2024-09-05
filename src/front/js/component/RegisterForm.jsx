import React from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';


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
    
    const handleButtonLogin = () => {
        navigate("/")
    }

    console.log(data)

    return(
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="p-3 w-25 d-flex flex-column gap-3" style={{backdropFilter:"blur(50px)", minWidth:"350px"}}>
                <form onSubmit={sendData} className="bg-white p-3 d-flex flex-column">
                    {/* NAME */}
                    {/* <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input value={data.name} name="name" type="name" className="form-control" id="inputName" aria-describedby="nameHelp" onChange={handleData}/>
                    </div> */}

                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <div className="form-floating"  style={{width:"85%"}}>
                            <input value={data.name} name="name" type="text" className="form-control" id="floatingInputName" placeholder="name" onChange={handleData}/>
                            <label htmlFor="floatingInputName">Name</label>
                        </div>
                    </div>
                    {/* EMAIL */}
                    {/* <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input value={data.email} name="email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" onChange={handleData}/>
                    </div> */}

                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <div className="form-floating"  style={{width:"85%"}}>
                            <input value={data.email} name="email" type="text" className="form-control" id="floatingInputName" placeholder="email" onChange={handleData}/>
                            <label htmlFor="floatingInputEmail">Email</label>
                        </div>
                    </div>
                    {/* PASSWORD */}
                    {/* <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input value={data.password} name="password" type="password" className="form-control" id="exampleInputPassword1" onChange={handleData}/>
                    </div> */}

                    <div className="input-group mb-3">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faKey} />
                        </span>
                        <div className="form-floating" style={{width:"85%"}}>
                            <input value={data.password} name="password" type="text" className="form-control" id="floatingInputPassword" placeholder="password" onChange={handleData}/>
                            <label htmlFor="floatingInputPassword">Password</label>
                        </div>
                    </div>
                    {/* BUTTON SUBMIT */}
                    <button type="submit" className="btn btn-success">Register</button>
                </form>
                <div className="bg-white p-3 d-flex flex-column">
                    <p className="text-center">Already have an account?</p>
                    {/* <Link to="/register">Sign up</Link> */}
                    <button onClick={handleButtonLogin} type="button" class="btn btn-outline-primary">Login</button>
                </div>
            </div>
        </div>
    )
}