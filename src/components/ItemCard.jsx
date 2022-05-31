import React, { useState } from 'react'

const ItemCard = (props) => {

    const handleClick = () => {

    }


    return (
        <>

<section className="main">
    <div className="wrapper">
        <div className="left-col">
            

            <div className="post">
                <div className="info">
                    <div className="user">
                        <div className="profile-pic"><img src="" alt=""/></div>
                        <p className="username">{props.creator}</p>
                    </div>
                    <img src="img/option.PNG" className="options" alt=""/>
                </div>
                <img src={props.address} className="post-image" alt=""/>
                <div className="post-content">
                    <div className="reaction-wrapper">
                        <img src="img/like.PNG" className="icon" alt=""/>
                        {/* <img src = "1.svg" alt="My Happy SVG"/> */}
                        {/* <i class="fa fa-heart-o mx-3" aria-hidden="true" /> */}
                        {/* <i class="fa fa-comment-o" aria-hidden="true"/> */}
                        <img src="img/comment.PNG" className="icon" alt=""/>
                        <img src="img/send.PNG" className="icon" alt=""/>
                        <img src="img/save.PNG" className="save icon" alt=""/>
                    </div>
                    <p className="likes">1,012 likes</p>
                    <p className="description"><span>{props.creator}:</span> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur tenetur veritatis placeat, molestiae impedit aut provident eum quo natus molestias?</p>
                    <p className="post-time">2 minutes ago</p>
                </div>
                <div className="comment-wrapper">
                    <img src="img/smile.PNG" className="icon mx-3" alt=""/>
                    <input type="text" className="comment-box" placeholder="Add a comment"/>
                    <button className="comment-btn">post</button>
                </div>
            </div>
        </div>
    </div>
</section>
</>
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






// <div className="card md-6 h-100 my-4 border-primary border-10" style={{ "width": "100%" }}>
//             <img src={props.address} className="card-img-top" alt="..." />
//             <div className="card-body">
//                 <h5 className="card-title">{props.title}</h5>
//                 <div className="container my-1">
//                     <div className="float-right"><h6>UserName: {props.creator}</h6></div>
//                 </div>
//                 <p className="card-text">{props.description.slice(0, 10)}...</p>
//                 <div className="container my-1">
//                     <div className="float-right"><h6>Email: {props.creator_mail}</h6></div>
//                 </div>
//                 <i className="fi fi-rs-thumbs-up mx-2" onClick={handleClick} ></i>
//                 <i className="fi fi-rs-comment-alt"></i>
//                 <div className="container my-1">
//                 <div className="float-right"><h6>Date: {props.date}</h6></div>
//                 </div>
//                 <p className="card-text"><small className="text-muted">Last updated 1 mins ago</small></p>
                
//             </div>
//         </div>