import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemContext from '../Context/ItemContext/ItemContext'
import Card from './Card'

const ItemCard = (props) => {
    const Navigate = useNavigate()
    const { likes } = useContext(ItemContext);
    const [nlike, setNLike] = useState(props.likes);
    const [liked, setLiked] = useState(props.isLiked);
    const [like, setLike] = useState(props.xy);
    // const [pike, setpi]

    const [selectedItem,setSelectedItem] = useState([])
    const [show,setShow] = useState(false);

    const expandModal = () => {
        setSelectedItem(like);
        setShow(true);
    }

    const closeModal = () => {
        setSelectedItem([]);
        setShow(false);
    }



    const handleClick = async () => {
        const y = like;
        if (liked === true) {
            setLiked(false);
            setNLike(nlike - 1);
            y.pop()
            
        }
        else {
            setLiked(true);
            setNLike(nlike + 1);
            y.push(props.user_email)
            
        }
        setLike(y);
        likes(props.idx);
    }

    // const [style,setStyle] = useState({""});



    return (
        <>


            <section className="main">
                <div className="wrapper">
                    <div className="left-col">


                        <div className="post">
                            <div className="info">
                                <div className="user">
                                    <div className="profile-pic"><img src="" alt="" /></div>
                                    <p className="username">{props.creator}</p>
                                </div>
                                <img src="img/option.PNG" className="options" alt="" />
                            </div>
                            <img src={props.address} className="post-image" alt="" />
                            <div className="post-content">
                                <div className="reaction-wrapper">
                                    {/* <i className="fa-duotone fa-heart"></i> */}
                                    {/* <i className="fa fa-heart" style={{"fontSize":"48px","color":"black"}}></i> */}
                                    {/* <i className="fa-regular fa-heart fa-2x red-color"></i> */}
                                    {/* <i className='fa fa-heart red-color icon-3x'></i> */}
                                    {/* <img src="img/1.svg " style={{"background":"red"}} onClick={handleClick} className="icon" alt=""/> */}
                                    <span className={`bi ${liked ? "bi-heart-fill red-color" : "bi-heart"}`} style={{ "fontSize": "25px", "cursor": "pointer" }} onClick={handleClick}> </span>
                                    <i className="bi bi-chat mx-3" style={{ "fontSize": "25px", "cursor": "pointer" }} ></i>
                                    <i className="bi bi-share" style={{ "fontSize": "25px" }}></i>
                                </div>



                                
                                <p className="likes" style={{ "cursor": "pointer" }} data-toggle="modal" data-target="#staticBackdrop" onClick={expandModal}>
                                    {nlike} likes
                                </p>
                                


                                {show &&<div class="modal fade" id="staticBackdrop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="staticBackdropLabel">{props.creator_mail}</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>

                                            <div class="modal-body">
                                                {selectedItem.map((item, i) => {
                                                    return (

                                                        <div className="card-body" key={i}>
                                                            {item}
                                                            <button type="button" className="btn btn-outline-primary " style={{ "float": "right", "width": "25%" }}>Follow</button>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div class="modal-footer" >
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={closeModal} >Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                







                                <p className="description"><span style={{ "cursor": "pointer" }}>{props.creator}</span>{props.description}</p>
                                <p className="post-time">{props.status}</p>
                            </div>

                            <div className="comment-wrapper">
                                <img src="img/smile.PNG" className="icon mx-3" alt="" />
                                <input type="text" className="comment-box" placeholder="Add a comment" />
                                <button className="comment-btn">post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ItemCard;



