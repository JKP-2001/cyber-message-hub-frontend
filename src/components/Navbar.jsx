import React, { useState, useEffect } from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";




const Navbar = () => {

    const Navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        Navigate("/login");
    }

    let location = useLocation();
    useEffect(() => {
        // console.log(location.pathname);
    }, [location])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">SocialHub</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">Profile</Link>
                    </li>

                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/newPost" ? "active" : ""}`} to="/newPost">NewPost</Link>
                    </li>

                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                    <li class="nav-item dropdown ">
                        <a class={`nav-link ${location.pathname === "/your_posts" || location.pathname === "/sharedposts" ? "active" : ""} dropdown-toggle`} href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Posts
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <span class="dropdown-item">Select Below </span>
                            
                            <div class="dropdown-divider"></div>
                            <Link class="dropdown-item" to="/your-posts">Own Posts</Link>
                            <Link class="dropdown-item" to="/sharedpost">Saved Posts</Link>
                        </div>
                    </li>

                </ul>
                {localStorage.getItem('token') ?
                    <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button> : <form className="form-inline my-2 my-lg-0">
                        <Link className="btn btn-primary mx-10" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-2" to="/register" role="button">Register</Link>
                    </form>}
            </div>
        </nav>

    )
}

export default Navbar
