import React, { useState, useEffect, useContext } from 'react'
import ItemContext from '../Context/ItemContext/ItemContext';
import { useNavigate } from 'react-router-dom';
import About from "./About"
import ItemCard from './ItemCard';
import Loader from './Loader';

const Home = () => {
  const Navigate = useNavigate();
  const { items, getItem } = useContext(ItemContext);
  const[loading,setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Navigate("/login")
    }
    else { 
      setLoading(true);
      const x = getItem();
      setLoading(false);
      // console.log(items)
    }


  })
  // console.log(localStorage.getItem('token'))
  // localStorage.removeItem('token');

  return (
    <>
      <Loader loading={loading} message=""/>
      <div className="container my-2"><h1>New Items</h1></div>
      
        <div className="container my-3">
        
          {items.map((item) => {
            const url = "https://cross-origin-web.herokuapp.com/" + item.img_address
            // var today = new Date();
            // var hour = today.getHours(); var min = today.getMinutes(); var sec = today.getSeconds();
            // var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            // if(date === items.creation_date){
            //   if(hour === parseInt(items.creation_date))
            // }

            const first = item.creator
            return (<ItemCard title={item.name} description={item.description} address={url} key={item._id} creator={first} date={item.creation_date} creator_mail={item.creatorMail}/>)
          })}
        
      </div>
    </>
  )
}

export default Home;
