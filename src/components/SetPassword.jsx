import React, { useState, useContext } from 'react'
import AuthContext from "../Context/LoginContext/AuthContext"
import { useParams } from "react-router-dom";
import Loader from "./Loader"

const SetPassword = (props) => {
    const { setPassword } = useContext(AuthContext);
    const params = useParams();
    const [loading,setLoading] = useState(false)
    const [password, setpassword] = useState({ password: "", Cpassword: "" });
    const [ismatch, setIsMatch] = useState(false);
    const submit = async (e) => {
            e.preventDefault();
            setLoading(true)
            const x = await setPassword(password.password, params.token);
            setLoading(false)
            if(x===200){
                props.showAlert("success","Your Password Has Been Successfully Setted.",5000)
            }
            if(x==400){
                props.showAlert("danger","Link Already Used",5000)
            }
            
            setpassword({ password: "", Cpassword: "" });
        
    }

    const change = (e) => {
        setpassword({ ...password, [e.target.name]: e.target.value });
    }

    
    

    return (
        <div className="container my-3">
            <Loader loading={loading}/>
            <h1>{props.message}</h1>
            <form className="my-2">
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={password.password} placeholder="Password" onChange={change} />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="Cpassword" value={password.Cpassword} placeholder="Confirm Password" onChange={change} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={submit} disabled={password.password.length>=8 & password.password === password.Cpassword?false:true}>Submit</button>
                <div className="my-3">
                <small id="emailHelp2" className="form-text text-muted">Button will be disabled until password doesn't matched. </small>
                <small id="emailHelp" className="form-text text-muted">Button will be disabled until password length is less than 8. </small>

                </div>
            </form>
        </div>
    )
}

export default SetPassword
