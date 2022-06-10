import React, { useEffect,useContext,useState, } from "react"
import { useParams } from "react-router-dom";
import ItemContext from "../Context/ItemContext/ItemContext";
import ItemCardParticular from "./ItemCardParticular";

const ParticularItem = ()=>{
    const {getParticularItem,item} = useContext(ItemContext);
    // const [items,setItems] = useState([{liked_by:[],img_address:"",description:"",creator:""}])
    const params = useParams();
    // const [item,setItem] = useState({});

    useEffect(()=>{
        (getParticularItem(params.id))
    },[])


    

    if(item.length === 0) {
        return(<h1>Post</h1>)
    }

    else{
        {console.log(item[0])}
        return(
            <ItemCardParticular item={item[0]} />
        )
    }
}

export default ParticularItem;