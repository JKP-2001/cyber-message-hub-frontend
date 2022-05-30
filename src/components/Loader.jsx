import React from 'react'


export default function Loader(props) {
    if (props.loading === true) {
        return (
            <div className="container text-center" >
                {/* <img src={Loading} alt="Loading" />
                 */}
                 <h3 style={{"color":"white"}} >{props.message} Please Wait ...</h3>
            </div>
        )
    }
}

