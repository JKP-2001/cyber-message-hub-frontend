import React from 'react'

const ItemCard = (props) => {
    return (
        // <div className="co1l">
        <>
            {/* <div className="col-md-4 mx-5">
                <div className="card my-5 card border-primary mb-3" >
                    <img src={props.address} className="card-img-top" alt="..." />
                    <div className="card-body text-primary">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text">{props.description}</p>

                        <i class="fa-solid fa-thumbs-up"></i>
                    </div>
                </div>
            </div> */}

            <div class="card md-6 h-100 my-4 border-dark" style={{"width":"75%"}}>
                <img src={props.address} class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">{props.description.slice(0,10)}...</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
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