import React,{useState,useEffect, useContext, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import ItemContext from '../Context/ItemContext/ItemContext'
import Card from './Card'
import EditPost from './EditPost'
import axios from "axios"
import AuthContext from "../Context/LoginContext/AuthContext"

const ItemCardForProf = (props) => {
    const Navigate = useNavigate()
    const { likes, deleteItem,getUserItem,userItem} = useContext(ItemContext);
    
    const [nlike, setNLike] = useState(props.likes);
    const [liked, setLiked] = useState(false);
    const [like, setLike] = useState([]);
    const [openSetting, setOpenSetting] = useState(false)
    // const [pike, setpi]
    const [data, setData] = useState();
    const [modal_name, setName] = useState();
    const [edit, setEdit] = useState(false);
    const [seeImages, setSeeImages] = useState(false);


    const [itemData,setItemData] = useState({title:props.title,description:props.description, tag:props.tag, address:props.address})

    const [item, setItem] = useState({ title: props.title, description: props.description, tag: props.tag,address:props.address })
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState(props.address);

    let formData = new FormData();

    const submit = (e) => {
        e.preventDefault();
        formData.append('name', item.title);
        formData.append('description', item.description);
        formData.append('tag', item.tag);
        formData.append('Image', img);

        setLoading(true);
        axios({
            method: "patch",
            url: (`http://localhost:5000/api/item/uploads/edit/${props.idx}`),
            data: formData,
            headers: { "Content-Type": "multipart/form-data", 'auth-token': localStorage.getItem('token') },
        })
            .then(function (response) {
                //handle success
                console.log(response);
                setLoading(false);
                setItemData({title:item.title,description:item.description,tag:item.tag,address:response.data.url})
                submitClose.current.click();
                props.showAlert("success","Item Updated Successfully",3000);
                
            })
            .catch(function (response) {
                //handle error
                console.log(response);
                
                submitClose.current.click();
                props.showAlert("danger","Something Went Wrong, Please try again.",4000);
            });
    }


    const change = (e) => {
        e.preventDefault();
        setItem({ ...item, [e.target.name]: e.target.value })

    }

    const imgChange = (e) => {
        e.preventDefault();
        // setImg(e.target.files[0]);
        console.log(e.target.files[0]);
        setImg(e.target.files[0])
    }


    const expandImageModal = () => {
        // setSelectedItem(like);
        setSeeImages(true);
    }

    const closeImageModal = () => {
        // setSelectedItem([]);
        setSeeImages(false);
    }

    

    useEffect(() => {
        setLike(props.xy);

    })

    useEffect(() => {
        setLiked(props.isLiked);
    }, [like])

    useEffect(()=>{
        getUserItem();
    },[userItem.length])


    const [selectedItem, setSelectedItem] = useState([])
    const [show, setShow] = useState(false);

    const expandModal = () => {
        setSelectedItem(like);
        setShow(true);
    }

    const closeModal = () => {
        setSelectedItem([]);
        setShow(false);
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


    const handleOption = () => {
        setOpenSetting(true);
        setTimeout(() => {
            closeRef.current.click();
        }, "10000")
    }


    const handleDelete = async () => {
        const y = await (deleteItem(props.idx));
        if (y === 200) {
            // for(let i=0;i<props.userItem.length;i++){
            //     if(props.userItem[i]._id === props.idx){
            //         props.userItem.slice(i,1);
            //     }
            // 
            props.changeLength();
            props.showAlert("success", "Item Deleted Successfully.", 3000);
        }
        else if (y === 400) {
            props.showAlert("danger", "This Item Doesn't Belonged To You.", 3000);
        }
        else {
            props.showAlert("danger", "No Such Item Exist.", 3000);
        }
        closeRef.current.click();
    }

    // const [style,setStyle] = useState({""});


    const ref = useRef(null);
    const closeRef = useRef(null);
    const click = useRef(null);
    const editRef = useRef(null);
    const submitClose = useRef(null);

    const handleEdit = () => {
        setEdit(true);
        closeRef.current.click();
        setTimeout(() => {
            editRef.current.click();
        }, "100")
    }



    return (
        <>


            <section className="main" ref={click}>
                <div className="wrapper">
                    <div className="left-col">


                        <div className="post">
                            <div className="info">
                                <div className="user">
                                <img className="my-2" src={props.address} style={{ "width": "40px", "height": "40px", borderRadius: "50%", padding: '0' }} alt="" />
                                    <p className="username">{props.creator}</p>
                                </div>



                                <img src="img/option.PNG" class="options " style={{ visibility: "hidden" }} data-toggle="modal" ref={editRef} data-target="#exampleModal2" />
                                {edit && <div class="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel2">Options</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form  >
                                                    <div className="form-group my-2">
                                                        <label htmlFor="text" style={{ "color": "black" }}>Title*</label>
                                                        <input type="text" className="form-control" style={{ "color": "black" }} id="name" name="title" value={item.title} onChange={change} placeholder="Title" />
                                                    </div>



                                                    <div className="form-group">
                                                        <label htmlFor="exampleFormControlTextarea1" style={{ "color": "black" }}>Decription*</label>
                                                        <textarea className="form-control" style={{ "color": "black" }} id="exampleFormControlTextarea1" rows="3" name="description" value={item.description} onChange={change} placeholder="Decription"></textarea>
                                                    </div>

                                                    <div className="form-group my-2">
                                                        <label htmlFor="text" style={{ "color": "black" }}>Location*</label>
                                                        <input type="text" className="form-control" style={{ "color": "black" }} id="name" name="tag" value={item.tag} onChange={change} placeholder="Tag" />
                                                    </div>

                                                    <div className="form-group my-2">
                                                        <div className="mb-3">
                                                            <label htmlFor="formFile" className="form-label" style={{ "color": "black" }}>Choose Image*</label>
                                                            <input className="form-control" type="file" style={{ "color": "black" }} id="formFile" name="image"  onChange={imgChange} />
                                                        </div>
                                                    </div>
                                                    {/* <small id="emailHelp" className="form-text my-3" style={{"color":"black"}}>Already Have An Account?<Link className="mx-2" to="/login" role="button">Click Here</Link></small> */}

                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal" ref={submitClose}>Close</button>
                                                <button class="btn btn-primary" type="submit"  onClick={submit}>Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>}



                                <img src="img/option.PNG" class="options " data-toggle="modal" ref={ref} data-target="#exampleModal" onClick={handleOption} />
                                {openSetting && <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Options</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <div className="card my-2">
                                                    <div className="card-body text-center">
                                                        <button type="button" className="btn btn-outline-primary " style={{ "float": "", "width": "75%" }} onClick={handleEdit}>Edit Post</button>

                                                    </div>
                                                </div>
                                                <div className="card my-2">
                                                    <div className="card-body text-center">
                                                        <button type="button" className="btn btn-outline-primary " style={{ "float": "", "width": "75%" }} onClick={handleDelete}>Delete Post</button>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal" ref={closeRef}>Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>}


                            </div>
                            <img src={itemData.address} className="post-image" alt="" style={{ "cursor": "pointer" }} data-toggle="modal" data-target="#staticBackdrop3" onClick={expandImageModal} />
                            {seeImages && <div className="modal fade" id="staticBackdrop3" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-xl" style={{ "max-width": "1000px;" }} role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title mx-2" id="staticBackdropLabel">Content</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                        <img src={itemData.address} className="post-image" alt="" style={{ "cursor": "pointer" }} data-toggle="modal" data-target="#staticBackdrop3" onClick={expandImageModal}  />
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
                                    <i className="bi bi-chat mx-3" style={{ "fontSize": "25px", "cursor": "pointer" }} ></i>
                                    <i className="bi bi-share" style={{ "fontSize": "25px" }}></i>
                                    {/* <i class="bi bi-trash-fill save icon" style={{ "fontSize": "25px", "cursor": "pointer" }} onClick={handleDelete}></i> */}

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
                                                            <div className="card-body" key={i + nlike}>
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








                                <p className="description"><span style={{ "cursor": "pointer" }}>{props.creator}</span>{itemData.description}</p>
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

export default ItemCardForProf;



