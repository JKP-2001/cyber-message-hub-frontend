import React, { useState } from 'react'

const ItemCard = (props) => {

    const handleClick = () => {

    }


    return (

        <div className="card md-6 h-100 my-4 border-primary border-10" style={{ "width": "100%" }}>
            <img src={props.address} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <div className="container my-1">
                    <div className="float-right"><h6>UserName: {props.creator}</h6></div>
                </div>
                <p className="card-text">{props.description.slice(0, 10)}...</p>
                <div className="container my-1">
                    <div className="float-right"><h6>Email: {props.creator_mail}</h6></div>
                </div>
                <i className="fi fi-rs-thumbs-up mx-2" onClick={handleClick} ></i>
                <i className="fi fi-rs-comment-alt"></i>
                <div className="container my-1">
                <div className="float-right"><h6>Date: {props.date}</h6></div>
                </div>
                <p className="card-text"><small className="text-muted">Last updated 1 mins ago</small></p>
                
            </div>
        </div>
    )
}

export default ItemCard


// {/* <div className="card" style={{ width: "18rem" }}>
//                     <img className="card-img-top" src={props.address} alt="Card image cap" />
//                     <div className="card-body">
//                         <h5 className="card-title">{props.title}</h5>
//                         <p className="card-text">{props.description}</p>
//                         <a href="#" className="btn btn-primary">Go somewhere</a>
//                     </div>
//                 </div> */}