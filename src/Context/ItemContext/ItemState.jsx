import React, { useState } from 'react'
import ItemContext from "./ItemContext"

const ItemState = (props) => {

    const url = "http://localhost:5000/api/item/uploads"
    // const url = "https://cross-origin-web.herokuapp.com/api/item/uploads";

    const initialItem = [];
    const [items, setItems] = useState(initialItem);
    const [userItem,setUserItem] = useState(initialItem);

    const getItem = async () => {
        const response = await fetch(`${url}/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        const x = json.reverse();
        setItems(x);
        // return(response.status)
    }

    const getUserItem = async () => {
        const response = await fetch(`${url}/allitem`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                
                'auth-token': localStorage.getItem('token')
            },
            
        });
        const json = await response.json();
        const x = json.reverse();
        setUserItem(x);
    }


    const likes = async (id)=>{
        const response = await fetch(`${url}/likeanote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
    }


    const shareItem = async (id)=>{
        const response = await fetch(`${url}/share/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        return(response.status)
    }


    const unshareItem = async (id)=>{
        const response = await fetch(`${url}/unshare/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        return(response.status)
    }

    

    const deleteItem = async(id)=>{
        const response = await fetch(`${url}/delete-item/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                
                'auth-token': localStorage.getItem('token')
            },
        });
        return(response.status);
    }


    const postComment = async(comment,id)=>{
        const response = await fetch(`${url}/comment/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({comment})
        });
    }

   

    return (<ItemContext.Provider value={{items,userItem,getUserItem,getItem,likes,shareItem,unshareItem,deleteItem,postComment}} >
        {props.children}
    </ItemContext.Provider>)
}

export default ItemState;