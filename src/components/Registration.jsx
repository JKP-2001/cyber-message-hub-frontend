import React, { useContext, useState } from 'react'
import AuthContext from "../Context/LoginContext/AuthContext";
import {useNavigate,Link} from "react-router-dom"
import EmailSentPage from './EmailSentPage';
import Loader from "./Loader";

const Register = (props) => {
  const Navigate =useNavigate();
  const { registerUser } = useContext(AuthContext);
  const [isDone,setDone] = useState(false);
  const [loading,setLoaing] = useState(false);

  const [user, setUser] = useState({ name: "", email: "" });

  const submit = async(e)=>{
    e.preventDefault();
    setLoaing(true);
    const x = await registerUser(user.name,user.email);
    setLoaing(false);
    if(user.name=="" || user.email==""){
      props.showAlert("danger","All Fields Are Mandatory.",5000)
    }
    else{
      if(x===400){
        props.showAlert("danger","Link Already Used",5000);
      }
      else if( x===401){
        props.showAlert("danger","Email Id Already Registered",5000);
      }
      else{
        props.showAlert("success","Confirmation Email Has Been Sent To Your Email Id",5000)
        setUser({name:"",email:""});
      }
    }
    setDone(true);
  }


  const change = (e)=>{
      setUser({...user,[e.target.name]:e.target.value});
  }

  // if(isDone){
  //   return(<EmailSentPage />)
  // }
  
  return (
    <>
    
    <div className="container my-2">
    <Loader loading={loading}/>
      <h1>Register Here</h1>
      <form className="my-2">
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Name*</label>
          <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={change} placeholder="Name" />
        </div>

        <div className="form-group ">
          <label htmlFor="exampleInputEmail1">Email address*</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={user.email} onChange={change} placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <button type="submit" className="btn btn-primary" onClick={submit} >Submit</button>

        <small id="emailHelp" className="form-text text-muted my-3">Already Have An Account?<Link className="mx-2" to="/login" role="button">Click Here</Link></small>

      </form>
    </div>
    </>
  )
}

export default Register;
