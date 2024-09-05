import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';




export const Navbar = () => {

	const navigate = useNavigate()
	const logout = () => {
		//localStorage.removeItem("token")
		localStorage.clear();
		console.log("Sesión cerrada")
		navigate("/")
	}

	const nameUser = localStorage.getItem("name")

	return (
		<nav className="navbar navbar-light w-100 bg-black" style={{ zIndex: 100, backdropFilter:"blur(200px)"}}>
			<div className="container">
				<div className="navbar-brand mb-0 fs-1 text-white d-flex flex-row justify-content-center align-items-center">
					<FontAwesomeIcon icon={faCaretRight} />
					<h1 className="text-white pt-2 ps-2">Bienvenid@ {nameUser}</h1>
				</div>
				
				<div className="ml-auto">
					<Link to="/">
						<button className="btn btn-danger" onClick={logout}>Log Out</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
