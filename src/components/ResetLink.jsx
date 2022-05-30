import React, { useState, useContext } from 'react'
import AuthContext from "../Context/LoginContext/AuthContext"
import Loader from "./Loader"

const ResetLink = (props) => {
    const { sendResetEmail } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const change = (e) => {
        setEmail(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const x = await(sendResetEmail(email));
        setLoading(false);
        console.log(x);
        if(x===400){
            props.showAlert("danger","The email address you entered isn't connected to an account.",5000);
        }
        else if(x===200){
            props.showAlert("success","Password Reset Link has been successfully sent to the email id.",5000);
        }
        setEmail("");
    }

return (
    <div className="container my-2">
        <Loader loading={loading} message="Processing"/>
        <h1 style={{"color":"white"}}>Reset Password</h1>
        <form className="my-2">
            <div className="form-group ">
                <label htmlFor="exampleInputEmail1" style={{"color":"white"}}>Email address*</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={email} onChange={change} placeholder="Enter email" />
                <small id="emailHelp" className="form-text" style={{"color":"white"}}>We'll never share your email with anyone else.</small>
            </div>
            <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
        </form>
    </div>
)
}

export default ResetLink
