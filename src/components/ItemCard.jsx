import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemContext from '../Context/ItemContext/ItemContext'
import Card from './Card'

const ItemCard = (props) => {
    const Navigate = useNavigate()
    const { likes } = useContext(ItemContext);
    const [nlike, setNLike] = useState(0);
    const [liked, setLiked] = useState(false);
    const [like, setLike] = useState([]);


    useEffect(() => {
        setLiked(props.isLiked);
        setLike(props.xy);
    }, [props.isLiked, props.xy])


    const handleClick = async () => {
        if (liked === true) {
            setLiked(false);
        }
        else {
            setLiked(true);
        }
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

                                <p className="likes" style={{ "cursor": "pointer" }} data-toggle="modal" data-target="#exampleModalLong">{props.likes} likes</p>

                                <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLongTitle">Likes</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            {/* {console.log(like)}  */}

                                            {like.map((abc) => {
                                                // console.log("abc = ", abc)
                                                return (
                                                    <div className="modal-body" key={abc}>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                {abc}
                                                                <button type="button" className="btn btn-outline-primary " style={{ "float": "right", "width": "25%" }}>Follow</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>







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



