import React, { useContext, useState } from 'react'
import AuthContext from "../Context/LoginContext/AuthContext";
import {Link} from "react-router-dom";
import Loader from './Loader';

const Login = (props) => {
  const {loginUser} = useContext(AuthContext);

  const[cred,setCred] = useState({email:"",password:""});
  const[loading,setLoading] = useState(false);

  const change = (e)=>{
    setCred({...cred,[e.target.name]: e.target.value})
  }

  const submit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    const x = await(loginUser(cred.email,cred.password));
    setLoading(false);
    if(x===400){
      props.showAlert("danger","The email address you entered isn't connected to an account.",5000);
    }
    else if(x===401){
      props.showAlert("danger","The password that you've entered is incorrect.",5000);
      setCred({email:cred.email,password:""});
    }
    else{
      props.showAlert("success","Successfully Logged In",5000);
      setCred({email:"",password:""});
    }
  }

  return (
    <div className="container my-2">
      <Loader loading={loading}/>
      <h1>Login Here</h1>
      <form className="my-2">
        <div className="form-group ">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={cred.email} onChange={change} placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={change} value={cred.password} placeholder="Password" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your Password with anyone else.</small>
        </div>

        <button type="submit" className="btn btn-primary" onClick={submit} disabled={cred.email.length == 0 || cred.password.length <8 ?true:false }>Submit</button>
        <small id="emailHelp" className="form-text text-muted my-3">Have No Account?<Link className="mx-2" to="/register" role="button">Click Here</Link></small>
      </form>
    </div>
  )
}

export default Login
