import React from 'react'

const Card = (props) => {
    console.log(props.text)
    return (
        <div className="card">
            <div className="card-body">
                {props.text}
                <button type="button" className="btn btn-outline-primary " style={{ "float": "right", "width": "25%" }}>{props.func}</button>
            </div>

        </div>
    )
}

export default Card