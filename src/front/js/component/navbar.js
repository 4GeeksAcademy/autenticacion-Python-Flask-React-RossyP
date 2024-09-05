import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';




export const Navbar = () => {

	const navigate = useNavigate()
	const logout = () => {
		//localStorage.removeItem("token")
		localStorage.clear();
		console.log("Sesión cerrada")
		navigate("/")
	}

	return (
		<nav className="navbar navbar-light w-100 bg-transparent" style={{ zIndex: 100, backdropFilter:"blur(200px)" }}>
			<div className="container">
				<div className="navbar-brand mb-0 fs-1 text-transparent"><FontAwesomeIcon icon={faSun} /></div>
				<div className="ml-auto">
					<Link to="/">
						<button className="btn btn-danger" onClick={logout}>Log Out</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
