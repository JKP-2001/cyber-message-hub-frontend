import React, { useState, useEffect, useContext } from 'react'
import ItemContext from '../Context/ItemContext/ItemContext';
import AuthContext from "../Context/LoginContext/AuthContext"
import { useNavigate } from 'react-router-dom';
import About from "./About"
import ItemCard from './ItemCard';
import Loader from './Loader';

const SharedItem = (props) => {
  const Navigate = useNavigate();
  const {shared,email,getUser,getUserSharedPosts} = useContext(AuthContext)
//   const {} = useContext(AuthContext)
  const[loading,setLoading] = useState(false);
  const [shareLength,setSharedLength] = useState(0);
  // const [email,setEmail] = useState();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Navigate("/login")
    }
    else { 
      getUser();
      getUserSharedPosts();
      // console.log(items)
    }


  },[shareLength])

  useEffect(()=>{
    setSharedLength(shared.length)
  },[])

  const changeSharedLength = ()=>{
    setSharedLength(shareLength-1);
  }
   // console.log(localStorage.getItem('token'))
  // localStorage.removeItem('token');

  return (
    <>  
      <Loader loading={loading} message=""/>
      <div className="container my-2"><h1>Shared Posts</h1></div>
        {console.log(shared)}
        <div className="container my-3">
          {/* {console.log(shared)} */}
          {shared.map((item,i) => {
            // const url = "https://cross-origin-web.herokuapp.com/" + item.img_address
            const url = "http://localhost:5000/" + item.img_address[0]
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
            // console.log(y);
            const z = item.liked_by.indexOf(email);
            const pp = item.shared_by.indexOf(email);
            // console.log(z);
            // console.log(item.comments);
            // console.log(pp);
            console.log(pp);
            if(pp!==-1){
                return(<ItemCard title={item.name} description={item.description} address={url} key={i} creator={first} date={item.creation_date} creator_mail={item.creatorMail} likes={item.liked_by.length} idx={item._id} isLiked={z===-1?false:true} status={status} xy={item.liked_by} comments={item.comments} tag={item.tag} user_email={email} showAlert={props.showAlert} isShared={true} changeSharedLength={changeSharedLength}/>)
            }
          })}
        
      </div>
    </>
  )
}

export default SharedItem;
