import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ItemContext from '../Context/ItemContext/ItemContext'
import Card from './Card'

const ItemCard = (props) => {
    const Navigate = useNavigate()
    const { likes, postComment, shareItem, unshareItem } = useContext(ItemContext);
    const [nlike, setNLike] = useState(props.likes);
    const [liked, setLiked] = useState(false);
    const [shared, setShared] = useState(false);
    const [like, setLike] = useState([]);
    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState([]);
    const [ncomment, setnComment] = useState();
    const [opacity, setOpacity] = useState(0.5);
    const [commentText, setCommentText] = useState("");
    const [seeImages, setSeeImages] = useState(false);
    // const [pike, setpi]


    useEffect(() => {
        setLike(props.xy);
        setComment(props.comments);
        setnComment(props.comments.length)

    })

    useEffect(() => {
        setLiked(props.isLiked);
        setShared(props.isShared)
    }, [like])



    const [selectedItem, setSelectedItem] = useState([])
    const [selectedCommentItem, setSelectedCommentItem] = useState([])
    const [show, setShow] = useState(false);

    const expandModal = () => {
        setSelectedItem(like);
        setShow(true);
    }

    const closeModal = () => {
        setSelectedItem([]);
        setShow(false);
    }

    const expandcommentModal = () => {
        setSelectedCommentItem(comment);
        setShowComment(true);
    }

    const closecommentModal = () => {
        setSelectedCommentItem([]);
        setShowComment(false);
    }


    const expandImageModal = () => {
        // setSelectedItem(like);
        setSeeImages(true);
    }

    const closeImageModal = () => {
        // setSelectedItem([]);
        setSeeImages(false);
    }




    const handleClick = async () => {
        if (liked === true) {
            setLiked(false);
            setNLike(nlike - 1);
            for (let i = 0; i < like.length; i++) {
                if (props.user_email === like[i]) {
                    like.splice(i, 1);
                    setLike(like);
                    break;
                }
            }

        }
        else {
            setLiked(true);
            setNLike(nlike + 1);
            like.push(props.user_email)
            setLike(like);

        }
        likes(props.idx);
    }

    const changeComment = (e) => {
        setOpacity(1);
        setCommentText(e.target.value);
    }


    const handleSaved = async () => {
        const x = await shareItem(props.idx);
        if (x === 200) {
            setShared(true);
            props.showAlert("success", "Post Saved Successfully", 3000);
        }
        else if (x === 406) {
            props.showAlert("danger", "Can't Share Your Own Posts.", 3000);
        }
    }


    const handleUnSaved = async () => {
        const x = await unshareItem(props.idx);
        if (x === 200) {
            setShared(false);
            props.changeSharedLength()
            props.showAlert("success", "Post UnSaved Successfully", 3000);

        }
    }


    const postComments = () => {
        setCommentText("");
        const x = {
            "user_name": props.user_email,
            "message": commentText,
        }
        comment.push(x);
        setComment(comment);
        setnComment(ncomment + 1);
        postComment(commentText, props.idx);
        props.showAlert("success", "Comment Added Successfully", 3000);
    }
    // const [style,setStyle] = useState({""});



    return (
        <>


            <section className="main">
                <div className="wrapper">
                    <div className="left-col">


                        <div className="post">
                            <div className="info">
                                < div className="user">
                                    <img className="my-2" src={props.address} style={{ "width": "40px", "height": "40px", borderRadius: "50%", padding: '0' }} alt="" />
                                    <p className="username my-2">{props.creator}</p>
                                </div>
                                <img src="img/option.PNG" className="options" alt="" />
                            </div>
                            <img src={props.address} className="post-image" alt="" style={{ "cursor": "pointer" }} data-toggle="modal" data-target="#staticBackdrop3" onClick={expandImageModal} />
                            {seeImages && <div className="modal fade" id="staticBackdrop3" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl" style={{"width":"1250px;"}} role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title mx-2" id="staticBackdropLabel">Likes</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>

                                        <div className="modal-body">
                                            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                                                <div class="carousel-inner">
                                                    <div class="carousel-item active">
                                                        <img class="d-block w-100" src={props.address} alt="First slide"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer" >
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeImageModal} >Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>}


                            <div className="post-content">
                                <div className="reaction-wrapper">
                                    {/* <i className="fa-duotone fa-heart"></i> */}
                                    {/* <i className="fa fa-heart" style={{"fontSize":"48px","color":"black"}}></i> */}
                                    {/* <i className="fa-regular fa-heart fa-2x red-color"></i> */}
                                    {/* <i className='fa fa-heart red-color icon-3x'></i> */}
                                    {/* <img src="img/1.svg " style={{"background":"red"}} onClick={handleClick} className="icon" alt=""/> */}
                                    <span className={`bi ${liked ? "bi-heart-fill red-color" : "bi-heart"}`} style={{ "fontSize": "25px", "cursor": "pointer" }} onClick={handleClick}> </span>
                                    <i className="bi bi-chat mx-3" style={{ "fontSize": "25px", "cursor": "pointer" }} data-toggle="modal" data-target="#staticBackdrop2" onClick={expandcommentModal}></i>
                                    <i className="bi bi-share" style={{ "fontSize": "25px" }}></i>
                                    <i class={`bi ${shared ? "bi-save-fill black-color  save icon" : "bi-save save icon"}`} style={{ "fontSize": "20px", "cursor": "pointer" }} onClick={!shared ? handleSaved : handleUnSaved}></i>
                                </div>




                                <p className="likes" style={{ "cursor": "pointer" }} data-toggle="modal" data-target="#staticBackdrop" onClick={expandModal}>
                                    {nlike} likes
                                </p>



                                {show && <div className="modal fade" id="staticBackdrop" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title mx-2" id="staticBackdropLabel">Likes</h4>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>

                                            <div className="modal-body">
                                                {selectedItem.map((item, i) => {
                                                    return (
                                                        <div className="card my-2">
                                                            <div className="card-body" key={i + nlike} style={{ "color": "black" }}>
                                                                {item}
                                                                <button type="button" className="btn btn-outline-primary " style={{ "float": "right", "width": "25%" }}>Follow</button>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="modal-footer" >
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal} >Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>}







                                <p style={{ "cursor": "pointer" }} data-toggle="modal" data-target="#staticBackdrop2" onClick={expandcommentModal}>
                                    View All {ncomment} comments
                                </p>
                                {showComment && <div className="modal fade" id="staticBackdrop2" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title mx-2" id="staticBackdropLabel1">Comments</h4>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closecommentModal}>
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>

                                            <div className="modal-body">
                                                {selectedCommentItem.map((item, i) => {
                                                    return (
                                                        <div className="card my-3" style={{ "width": "100%" }}>
                                                            <div className="card-body">
                                                                <button type="button" className="btn btn-outline-primary " style={{ "float": "right", "width": "25%" }}>Follow</button>
                                                                <h5 className="card-title">{item.user_name}</h5>
                                                                <p className="card-text">{item.message}.</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="modal-footer" >
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closecommentModal} >Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>}








                                <p className="description"><span style={{ "cursor": "pointer" }}>{props.creator}</span>{props.description}</p>
                                <p className="post-time">{props.status}</p>
                            </div>

                            <div className="comment-wrapper">
                                <img src="img/smile.PNG" className="icon mx-3" alt="" />
                                <input type="text" className="comment-box" name="comment" value={commentText} placeholder="Add a comment" onChange={changeComment} />
                                <button className="comment-btn" style={{ "opacity": opacity }} onClick={postComments}>post</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ItemCard;



