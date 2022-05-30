import React, { useState, useContext, useEffect } from "react";
import ItemContext from "../Context/ItemContext/ItemContext"
import ItemCard from "./ItemCard"
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
    const Navigate = useNavigate()
    const { userItem, getUserItem } = useContext(ItemContext);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            Navigate("/login")
        }
        else {
            getUserItem();
            // console.log(items)
        }
    });


    return (
        <div className="container my-3">
        
          {userItem.map((item) => {
            //   const url = "https://cross-origin-web.herokuapp.com";
            const url = "https://cross-origin-web.herokuapp.com/" + item.img_address
            const first = item.creator.split(' ')[0]
            return (<ItemCard title={item.name} description={item.description} address={url} key={item._id} creator={first} date={item.creation_date} creator_mail={item.creatorMail}/>)
          })}
        
      </div>
    )
}


export default Profile;