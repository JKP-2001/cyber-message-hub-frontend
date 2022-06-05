import React, { useState, useEffect, useContext } from 'react'
import ItemContext from '../Context/ItemContext/ItemContext';
import AuthContext from "../Context/LoginContext/AuthContext"
import { useNavigate } from 'react-router-dom';
import About from "./About"
import ItemCard from './ItemCard';
import Loader from './Loader';

const Home = (props) => {
  const Navigate = useNavigate();
  const { items, getItem} = useContext(ItemContext);
  const {email,getUser} = useContext(AuthContext)
  const[loading,setLoading] = useState(false);
  // const [email,setEmail] = useState();
  

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Navigate("/login")
    }
    else { 
      setLoading(true);
      getUser();
      getItem();
      setLoading(false);
      // console.log(items)
    }


  },[])
  // console.log(localStorage.getItem('token'))
  // localStorage.removeItem('token');
  
  return (
    <>
      <Loader loading={loading} message=""/>
      <div className="container my-2"><h1>New Items</h1></div>
      
        <div className="container my-3">

          {items.map((item) => {
            // const url = "https://cross-origin-web.herokuapp.com/" + item.img_address
            const url = "http://localhost:5000/" + item.img_address
            var today = new Date();
            var dt = new Date(item.getFull);
            var currHour = today.getHours(); var hour = dt.getHours();
            var currMin =  today.getMinutes(); var min = dt.getMinutes();
            var currSec =  today.getSeconds(); var sec = dt.getSeconds();

            var currdate = today.getDate(); var date = dt.getDate();
            var currmonth = today.getMonth()+1; var month = dt.getMonth()+1;
            var curryear = today.getFullYear(); var year = dt.getFullYear();

            var datex = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            var status;
            if(datex === item.creation_date){
              if(hour===currHour){
                if(min===currMin){
                  status = String(currSec-sec)+" Seconds Ago"
                }
                else{
                  status = String(currMin-min)+" Minutes Ago"
                }
              }
              else{
                status = String(currHour-hour)+" Hours Ago"
              }
            }
            else{
              if(currdate-date<=10){
                status = String(currdate-date)+" Days Ago"
              }
              else{
                status = date+"/"+month+"/"+year
              }
            }
            const first = item.creator
            // const y = getUser();
            console.log(email);
            const z = item.liked_by.indexOf(email);

            // console.log(z);
            // console.log(item.comments);
            return (<ItemCard title={item.name} description={item.description} address={url} key={item._id} creator={first} date={item.creation_date} creator_mail={item.creatorMail} likes={item.liked_by.length} idx={item._id} isLiked={z===-1?false:true} status={status} xy={item.liked_by} comments={item.comments} user_email={email} showAlert={props.showAlert}/>)
          })}
        
      </div>
    </>
  )
}

export default Home;
