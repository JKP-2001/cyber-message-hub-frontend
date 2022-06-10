import React, { useState, useEffect, useContext } from 'react'
import ItemContext from '../Context/ItemContext/ItemContext';
import AuthContext from '../Context/LoginContext/AuthContext';
import SingleItemCard from './SingleItemCard';
import {useParams} from "react-router-dom"
import ItemCard from './ItemCard';

const SingleItem = (props) => {
    const params  = useParams();
    const { item, getParticularItem } = useContext(ItemContext);
    const {getUser,email} = useContext(AuthContext)

    useEffect(() => {
        getParticularItem(params.id);
        getUser();
    },[])

    if (item.length === 0) {
        return (
            <h1>No Post</h1>
        )
    }

    else{
        return (
            item.map((item) => {
                // const url = "https://cross-origin-web.herokuapp.com/" + item.img_address
                // const url = "https://cross-origin-web.herokuapp.com/" + item.img_address;
                const url = "http://localhost:5000/" + item.img_address;
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
                const m = item.shared_by.indexOf(email);
    
                // console.log(z);
                // console.log(item.comments);
                console.log(item.img_address)
                return (<SingleItemCard title={item.name} description={item.description} address={url} key={item._id} creator={first} date={item.creation_date} creator_mail={item.creatorMail} likes={item.liked_by.length} idx={item._id} isLiked={z===-1?false:true} status={status} xy={item.liked_by} comments={item.comments} tag={item.tag} user_email={email} showAlert={props.showAlert} shared_by={item.shared_by} isShared={m===-1?false:true} isLoggedIn={email===""?false:true}/>)
        })
    )
}}

export default SingleItem
