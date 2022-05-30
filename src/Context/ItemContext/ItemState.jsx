import React, { useState } from 'react'
import ItemContext from "./ItemContext"

const ItemState = (props) => {

    const url = "http://localhost:5000/api/item/uploads"

    const initialItem = [];
    const [items, setItems] = useState(initialItem);

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

    return (<ItemContext.Provider value={{items,getItem}} >
        {props.children}
    </ItemContext.Provider>)
}

export default ItemState;