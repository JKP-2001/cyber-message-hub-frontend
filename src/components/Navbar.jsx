import React, { useState, useEffect,useRef,useContext } from 'react'
import ItemContext from '../Context/ItemContext/ItemContext';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";

import axios from "axios";



const Navbar = (props) => {

    const add = useRef();
    const {items,getItem} = useContext(ItemContext);
    const [newPost, setNewPost] = useState(false);
    const [item, setItem] = useState({ title: "", description: "", tag: "" })
    const [img, setImg] = useState(null);
    const [loading,setLoading] = useState(false);
    let formData = new FormData();


    useEffect(() => {
        if (!localStorage.getItem('token')) {
          Navigate("/login")
        }
        else { 
          getItem();
    
        }
    
    
      },[newPost])


    const handleAdd = ()=>{
        setNewPost(true);
    }
    const submit = (e) => {
        e.preventDefault();
        formData.append('name', item.title);
        formData.append('description', item.description);
        formData.append('tag', item.tag);
        formData.append('Image', img);

        setLoading(true);
        axios({
            method: "post",
            url: "http://localhost:5000/api/item/uploads/newItem",
            data: formData,
            headers: { "Content-Type": "multipart/form-data", 'auth-token': localStorage.getItem('token') },
        })
            .then(function (response) {
                //handle success
                console.log(response);
                setLoading(false);
                add.current.click();
                setNewPost(false)
                props.showAlert("success","Posted Successfully, You Can See The Post On The New Feed And Profile Section. ",5000);
                
            })
            .catch(function (response) {
                //handle error
                console.log(response);
                add.current.click();
                setNewPost(false)
                props.showAlert("danger","Something Went Wrong, Please try again.",5000);
            });
    }


    const change = (e) => {
        e.preventDefault();
        setItem({ ...item, [e.target.name]: e.target.value })

    }

    const Navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        Navigate("/login");
    }

    const imgChange = (e) => {
        e.preventDefault();
        setImg(e.target.files[0]);
        console.log(e.target.files);
        // setImg([...]);
    }

    let location = useLocation();
    useEffect(() => {
        // console.log(location.pathname);
    }, [location])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">SocialHub</Link>


            {localStorage.getItem('token') ?
                <>
                    {newPost && <div class="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel2">Options</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref={add}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form  >
                                        <div className="form-group my-2">
                                            <label htmlFor="text" style={{ "color": "black" }}>Title*</label>
                                            <input type="text" className="form-control" style={{ "color": "black" }} id="name" name="title" value={item.title} onChange={change} placeholder="Title" />
                                        </div>



                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlTextarea1" style={{ "color": "black" }}>Decription*</label>
                                            <textarea className="form-control" style={{ "color": "black" }} id="exampleFormControlTextarea1" rows="3" name="description" value={item.description} onChange={change} placeholder="Decription"></textarea>
                                        </div>

                                        <div className="form-group my-2">
                                            <label htmlFor="text" style={{ "color": "black" }}>Location*</label>
                                            <input type="text" className="form-control" style={{ "color": "black" }} id="name" name="tag" value={item.tag} onChange={change} placeholder="Tag" />
                                        </div>

                                        <div className="form-group my-2">
                                            <div className="mb-3">
                                                <label htmlFor="formFile" className="form-label" style={{ "color": "black" }}>Choose Image*</label>
                                                <input className="form-control" type="file" style={{ "color": "black" }} id="formFile" name="image" onChange={imgChange} />
                                            </div>
                                        </div>
                                        {/* <small id="emailHelp" className="form-text my-3" style={{"color":"black"}}>Already Have An Account?<Link className="mx-2" to="/login" role="button">Click Here</Link></small> */}

                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal" ref={add}>Close</button>
                                    <button class="btn btn-primary" type="submit" onClick={submit} >Add Post</button>
                                </div>
                            </div>
                        </div>
                    </div>}

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
                                    <Link class="dropdown-item" to="/sharedposts">Saved Posts</Link>
                                </div>
                            </li>

                        </ul>
                        <button type="button" className="btn btn-primary mx-2" onClick={handleAdd} data-toggle="modal" data-target="#exampleModal2">New Post</button>
                        <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
                    </div></> : <form className="form-inline my-2 my-lg-0">
                    <Link className="btn btn-primary mx-10" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-2" to="/register" role="button">Register</Link>
                </form>}
        </nav>

    )
}

export default Navbar
