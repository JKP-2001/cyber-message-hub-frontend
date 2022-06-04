import React from 'react'
import ItemCard from './ItemCard';
import Loader from './Loader';


const HomeItem = async (props) => {
    var sum=0;
    
    return (
            <div className="container" style={{"color":"white"}}><h1>New Items</h1></div>
    )
}

export default HomeItem

















{/* 
<div className="container my-3">

                {props.items.map((item) => {
                    // const url = "https://cross-origin-web.herokuapp.com/" + item.img_address
                    const url = "http://localhost:5000/" + item.img_address
                    var today = new Date();
                    var dt = new Date(item.getFull);
                    var currHour = today.getHours(); var hour = dt.getHours();
                    var currMin = today.getMinutes(); var min = dt.getMinutes();
                    var currSec = today.getSeconds(); var sec = dt.getSeconds();

                    var currdate = today.getDate(); var date = dt.getDate();
                    var currmonth = today.getMonth() + 1; var month = dt.getMonth() + 1;
                    var curryear = today.getFullYear(); var year = dt.getFullYear();

                    var datex = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                    var status;
                    if (datex === item.creation_date) {
                        if (hour === currHour) {
                            if (min === currMin) {
                                status = String(currSec - sec) + " Seconds Ago"
                            }
                            else {
                                status = String(currMin - min) + " Minutes Ago"
                            }
                        }
                        else {
                            status = String(currHour - hour) + " Hours Ago"
                        }
                    }
                    else {
                        if (currdate - date <= 10) {
                            status = String(currdate - date) + " Days Ago"
                        }
                        else {
                            status = date + "/" + month + "/" + year
                        }
                    }
                    const first = item.creator
                    // const y = getUser();
                    // console.log(y);
                    const z = item.liked_by.indexOf(props.email);
                    const pp = item.shared_by.indexOf(props.email);
                    const mmm = item.liked_by.length;
                    sum = sum+mmm;
                    // console.log
                    // console.log(z);
                    // console.log(item.comments);
                    // console.log(item.liked_by)
                    return (<ItemCard title={item.name} description={item.description} address={url} key={item._id} creator={first} date={item.creation_date} creator_mail={item.creatorMail} likes={item.liked_by.length} idx={item._id} isLiked={z === -1 ? false : true} status={status} xy={item.liked_by} comments={item.comments} isShared={pp === -1 ? false : true} setAlert={props.showAlert} getItem={props.getItem}/>)
                })}

            </div>
        </> */}

