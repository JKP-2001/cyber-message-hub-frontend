import React, { useState, useContext } from 'react'
import AuthContext from "../Context/LoginContext/AuthContext"
import { useParams } from "react-router-dom";
import Loader from "./Loader"
import {Link} from "react-router-dom"

const SetPassword = (props) => {
    const { resetPassword } = useContext(AuthContext);
    const params = useParams();
    const [password, setpassword] = useState({ password: "", Cpassword: "" });
    const [ismatch, setIsMatch] = useState(false);
    
    const submit = async (e) => {
            e.preventDefault();
            setIsMatch(true)
            const x = await resetPassword(password.password, params.token, params.id);
            setIsMatch(false);
            if(x===200){
                props.showAlert("success","Your Password Has Been Successfully Changed. You Can Login Now",5000)
            }
            else if(x==401 || x===402){
                props.showAlert("danger","Unexpected Error Occur, Please try again.",5000)
            }

            else if(x===400){
                props.showAlert("danger","Sorry, The Link Has Been Expired.",5000)
            }
            else if(x===300){
                props.showAlert("danger","This might be similar or exact to your previous password. Try again with a different password.",5000)
            }
            
            setpassword({ password: "", Cpassword: "" });
        
    }

    const change = (e) => {
        setpassword({ ...password, [e.target.name]: e.target.value });
    }

    
    

    return (
        <div className="container my-3">
            <Loader loading={ismatch} message="Loaing"/>
            <h1 style={{"color":"white"}}>{props.message}</h1>
            <form className="my-2">
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" style={{"color":"white"}}>Password*</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={password.password} placeholder="Password" onChange={change} />
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" style={{"color":"white"}}>Confirm Password*</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="Cpassword" value={password.Cpassword} placeholder="Confirm Password" onChange={change} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={submit} disabled={password.password.length>=8 & password.password === password.Cpassword?false:true}>Submit</button>
                <div className="my-3">
                <small id="emailHelp2" className="form-text " style={{"color":"white"}}>Button will be disabled until password doesn't matched. </small>
                <small id="emailHelp" className="form-text " style={{"color":"white"}}>Button will be disabled until password length is less than 8. </small>
                
                <small id="emailHelp" className="form-text my-1" style={{"color":"white"}}>*After Re-Setting The Password, You Can Log In By<Link className="mx-2" to="/login" role="button">Click Here</Link></small>
                </div>
            </form>
        </div>
    )
}

export default SetPassword
