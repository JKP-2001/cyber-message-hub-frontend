import Navbar from "./components/Navbar";
import AuthState from "./Context/LoginContext/AuthState";
import React,{useState} from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Home from "./components/Home"
import About from './components/About'
import Login from "./components/Login"
import Register from "./components/Registration";
import EmailSentPage from './components/EmailSentPage';
import SetPassword from './components/SetPassword';
import Alert from "./components/Alert";
import ResetLink from "./components/ResetLink";
import ResetPassword from "./components/ResetPassword"

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (type, message, time) =>
    setAlert({
      msg: message,
      type: type
    },
      setTimeout(() => {
        setAlert(null);
      }, time));


  return (
    <AuthState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <Routes>
          <Route path="/about" element={<About showAlert={showAlert}/>} />
          <Route path="/" element={<Home showAlert={showAlert}/>} />
          <Route path="/login" element={<Login showAlert={showAlert}/>} />
          <Route path="/register" element={<Register isDone={false} showAlert={showAlert}/>} />
          <Route path="/confirmation" element={<EmailSentPage showAlert={showAlert}/>} />
          <Route path="/setPassword/:token" element={<SetPassword message="Set Password" showAlert={showAlert}/>} />
          <Route path="/resetpassword/" element={<ResetLink showAlert={showAlert}/>} />
          <Route path="/resettingpassword/:id/:token" element = {<ResetPassword showAlert={showAlert} message="Reset Password"/>} />
        </Routes>
      </Router >
    </AuthState>
  )
}

export default App;
