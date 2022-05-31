import React,{useState,useContext} from 'react'
import ItemContext from '../Context/ItemContext/ItemContext';
import Loader from './Loader';
import axios from 'axios'
const AddNewPost = () => {

    // const {addItem} = useContext(ItemContext);
    const [item,setItem] = useState({title:"",description:"",tag:""})
    const [loading,setLoading] = useState(false);
    const [img,setImg] = useState(null);
    let formData = new FormData();

    const submit = (e)=>{
        e.preventDefault();
        formData.append('name',item.title);
        formData.append('description',item.description);
        formData.append('tag',item.tag);
        formData.append('Image',img);
        
        setLoading(true);
        console.log(formData.get('name'));
        axios({
            method: "post",
            url: "https://cross-origin-web.herokuapp.com/api/item/uploads/newItem",
            data: formData,
            headers: { "Content-Type": "multipart/form-data", 'auth-token': localStorage.getItem('token')},
          })
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });
          
        setLoading(false);
    }

    
    const change = (e)=>{
        e.preventDefault();
        setItem({...item,[e.target.name]:e.target.value})
        
    }

    const imgChange = (e)=>{
        e.preventDefault();
        // setImg(e.target.files[0]);
        console.log(e.target.files[0]);
        setImg(e.target.files[0])
    }

    


    return (
        <div className="container my-2">
            <Loader loading={loading}message="Posting"/>
            <h1 style={{ "color": "white" }}>Create New Post</h1>
            <form className="my-3" >
            <div className="form-group my-2">
                    <div class="mb-3">
                        <label for="formFile" class="form-label" style={{ "color": "white" }}>Choose Image*</label>
                        <input class="form-control" type="file" id="formFile" name="image" onChange={imgChange} />
                    </div>
                </div>

                <div className="form-group my-2">
                    <label htmlFor="text" style={{ "color": "white" }}>Title*</label>
                    <input type="text" className="form-control" id="name" name="title" value={item.title} onChange={change} placeholder="Title"  />
                </div>

                <div className="form-group my-2">
                    <label htmlFor="text" style={{ "color": "white" }}>Decription*</label>
                    <input type="text" className="form-control" id="name" name="description" value={item.description} onChange={change} placeholder="Decription"/>
                </div>

                <div className="form-group my-2">
                    <label htmlFor="text" style={{ "color": "white" }}>Tag*</label>
                    <input type="text" className="form-control" id="name" name="tag" value={item.tag} onChange={change} placeholder="Tag"  />
                </div>

                <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>

                {/* <small id="emailHelp" className="form-text my-3" style={{"color":"white"}}>Already Have An Account?<Link className="mx-2" to="/login" role="button">Click Here</Link></small> */}

            </form>
        </div>
    )
}

export default AddNewPost
