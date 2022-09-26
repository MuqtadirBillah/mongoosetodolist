import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Navigation(){

    const navigate = useNavigate();

    function logout(){
        Cookies.remove("userCookie");
        navigate("/")
    }

    return(
        <div className="navigation">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="/folders">TodoList</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/folders">Folders</a>
                            </li>
                            {
                                (Cookies.get("userCookie")) &&
                                <li className="nav-item">
                                    <button className="nav-link logoutBut" onClick={()=>{logout()}}>Logout</button>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;