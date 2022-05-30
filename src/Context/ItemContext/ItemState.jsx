import React, { useState } from 'react'
import ItemContext from "./ItemContext"

const ItemState = (props) => {

    // const url = "http://localhost:5000/api/item/uploads"
    const url = "https://cross-origin-web.herokuapp.com/api/item/uploads";

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
        setItems(json);
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
        setUserItem(json);
    }

    return (<ItemContext.Provider value={{items,userItem,getUserItem,getItem}} >
        {props.children}
    </ItemContext.Provider>)
}

export default ItemState;