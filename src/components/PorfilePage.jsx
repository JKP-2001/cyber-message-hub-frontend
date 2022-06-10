import React, { useEffect, useContext, useState } from 'react'
import AuthContext from "../Context/LoginContext/AuthContext"
import ProfileCard from './ProfileCard';


const PorfilePage = () => {
    const { userId, getUserId } = useContext(AuthContext);

    useEffect(() => {
        getUserId();
    }, []);

    console.log(userId);

    if(userId.length === 0){
        <h1>Nothing To Show</h1>
    }
    else{
        return (
            <ProfileCard user={userId} />
        )
    }
}

export default PorfilePage