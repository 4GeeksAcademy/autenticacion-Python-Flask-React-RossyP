import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';



export const Navbar = () => {

	const logout = () => {
		//localStorage.removeItem("token")
		console.log("Sesión cerrada")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div className="navbar-brand mb-0 h1"><FontAwesomeIcon icon={faEarthAmericas} style={{color: "#e6b47a"}} /></div>
				<div className="ml-auto">
					<Link to="/">
						<button className="btn btn-primary" onClick={logout}>Log Out</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
