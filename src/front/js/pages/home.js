import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { RegisterForm } from "../component/RegisterForm.jsx";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../component/LoginForm.jsx";



export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()


	// function handleRegister(){
	// 	navigate("/register")
	// }

	return (
		<div className="fondoLogin">
			
			<LoginForm className="bg-primary"/>
			
			{/* <h1>Login</h1> */}
			
		</div>
	);
};
