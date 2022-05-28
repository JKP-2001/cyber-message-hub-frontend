import React from 'react'
import Loading from "./2.gif"

export default function Loader(props) {
    if (props.loading === true) {
        return (
            <div className="container text-center" >
                <img src={Loading} alt="Loading" />
            </div>
        )
    }
}

