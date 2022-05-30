import React, { useState, useEffect, useContext } from 'react'
import ItemContext from '../Context/ItemContext/ItemContext';
import { useNavigate } from 'react-router-dom';
import About from "./About"
import ItemCard from './ItemCard';

const Home = () => {
  const Navigate = useNavigate();
  const { items, getItem } = useContext(ItemContext);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      Navigate("/login")
    }
    else {
      getItem();
      // console.log(items)
    }


  })
  // console.log(localStorage.getItem('token'))
  // localStorage.removeItem('token');

  return (
    <>
      <div className="container my-2"><h1>New Items</h1></div>
      
        <div className="container my-3">
        
          {items.map((item) => {
            const url = "http://localhost:5000/" + item.img_address
            return (<ItemCard title={item.name} description={item.description} address={url} key={item._id} />)
          })}
        
      </div>
    </>
  )
}

export default Home;
