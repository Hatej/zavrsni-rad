import { useRef } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar(props){

    const menuButton = useRef();

    function openMenu(){
        if (menuButton.current.className === "topnav") {
            menuButton.current.className += " responsive";
        } else {
            menuButton.current.className = "topnav";
        }
    }

    return(
        <div className="navbar">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div ref={menuButton} className="topnav" id="myTopnav">
                <NavLink to="/">Home</NavLink>
                {
                    props.currentUser ? (
                        <>
                            <NavLink to={"/user/".concat(props.currentUser.username)}>Profile</NavLink>
                            <NavLink to="/logout" onClick={props.logOut}>Logout</NavLink>
                            <NavLink to="/upload/">Upload</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/signup">Signup</NavLink>
                        </>
                    )
                }
                <NavLink to="#" className="icon" onClick={openMenu}>
                    <i className="fa fa-bars"></i>
                </NavLink>
            </div>
        </div>
    );

}

export default Navbar;