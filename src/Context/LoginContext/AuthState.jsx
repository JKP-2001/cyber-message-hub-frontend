import { useState } from "react";
import AuthContext from "./AuthContext";


const AuthState = (props) => {

    const [user, setUser] = useState([]);
    const [email,setemail] = useState("");
    const [shared,setShared] = useState([]);
    
    // const change = (value)=>{
    //     setUser(value);
    // }

    // const url = "";

    const url = "http://localhost:5000";
    // const url = "https://cross-origin-web.herokuapp.com"


    const registerUser = async (name, email) => {
        const response = await fetch(`${url}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email })
        });
        // const json = await response.json();
        return(response.status);
        // setUser(user.concat(json));
    }


    const setPassword = async (password,token) => {
        const response = await fetch(`${url}/api/auth/confirm-email/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({password})
        });
        // const json = await response.json();
        return (response.status);
    }

    const loginUser = async (email,password) => {
        const response = await fetch(`${url}/api/auth/loginuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,password})
        });
        const json = await response.json();
        localStorage.setItem("token", json.token);
        return (response.status);
    }


    const sendResetEmail = async(email)=>{
        const response = await fetch(`${url}/api/auth/resetpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email})
        });
        // const json = await response.json();
        return (response.status);
    }

    const resetPassword = async(password,token,id)=>{
        const response = await fetch(`${url}/api/auth/resetpassword/${id}/${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({password})
        });
        // const json = await response.json();
        return (response.status);
    }


    const getUser = async()=>{
        const response = await fetch(`${url}/api/auth/getemail`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setemail(json.mail);
        // console.log(json);
    }

    const getUserSharedPosts = async() =>{
        const response = await fetch(`${url}/api/auth/getshareditems`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setShared(json.reverse());
    }
    

    

    return (<AuthContext.Provider value={{email, shared,getUserSharedPosts,registerUser,setPassword, loginUser, sendResetEmail, resetPassword,getUser }}>
        {props.children}
    </AuthContext.Provider>
    )
}

export default AuthState;