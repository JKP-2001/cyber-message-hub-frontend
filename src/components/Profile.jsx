import React, { useState, useContext, useEffect } from "react";
import ItemContext from "../Context/ItemContext/ItemContext"
import ItemCardForProf from "./ItemCardForProf"
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import AuthContext from "../Context/LoginContext/AuthContext"

const Profile = (props) => {
    const Navigate = useNavigate()
    const { userItem, getUserItem } = useContext(ItemContext);
    const [loading,setLoading] = useState(false);
    const {email,getUser} = useContext(AuthContext)
    const [userItemLength,setLength] = useState(0);
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            Navigate("/login")
        }
        else {
            setLoading(true)
            getUser();
            getUserItem();
            setLoading(false)
            // console.log(items)
        }
    },[userItemLength]);


    useEffect(() => {
      setLength(userItem.length);
    })


    const changeLength = ()=>{
      setLength(userItemLength-1);
    }

    if(userItem.length>0){
        return (
            <>
            <div className="container my-3">
            <Loader loading={loading} message=""/>
              {userItem.map((item) => {
                  // const url = "http://localhost:5000/" + item.img_address
                    const url = "https://cross-origin-web.herokuapp.com" + item.img_address;
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
                  // const z = item.liked_by.indexOf(email);
      
                  // console.log(z);
                  const z = item.liked_by.indexOf(email);

            // console.log(z);
            // console.log(item.comments);
            return (<ItemCardForProf title={item.name} description={item.description} tag={item.tag} address={url} key={item._id} creator={first} date={item.creation_date} creator_mail={item.creatorMail} likes={item.liked_by.length} idx={item._id} isLiked={z===-1?false:true} status={status} xy = {item.liked_by} comments={item.comments} user_email={email} showAlert={props.showAlert} userItem={userItem} changeLength={changeLength}/>)
            
                
              })}
            
            </div>
            </>
        )
    }
    else{
        return(
            <div className="container mx-50">
                <h1 style={{"color":"white","leftMargin":"100"}}>No Post Yet</h1>
            </div>
        )
    }
    
}


export default Profile;

// const url = "http://localhost:5000/" + item.img_address
// const first = item.creator.split(' ')[0]
// return (<ItemCard title={item.name} description={item.description} address={url} key={item._id} creator={item.} date={item.creation_date} creator_mail={item.creatorMail}/>)