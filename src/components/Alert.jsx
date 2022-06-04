import React from 'react'

function Alert(props) {
    const capitalize = (word)=>{
        if(word==="danger"){
          word="error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height: '50px'}} className="sticky-top">
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
           <strong className="sticky-top" >{capitalize(props.alert.type)}</strong>: {props.alert.msg}</div>
        }
        </div>
    )
}

export default Alert