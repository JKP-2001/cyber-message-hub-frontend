import React,{useState} from 'react'

const ProfileCard = (props) => {
    const [user,setUser] = useState(props.user)
    return (
        <div class="container rounded bg-white mt-5 mb-5">
            <div class="row">
                <div class="col-md-3 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5 " width="150px" src={`https://cross-origin-web.herokuapp.com${user[0].img_address}`} /><span class="font-weight-bold my-1">{user[0].name}</span><span class="text-black-50 my-2">{user[0].id}</span><span> </span></div>
                </div>
                <div class="col-md-5 border-right">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 class="text-right">Profile</h4>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" placeholder="Name" value={user[0].name.split(" ",1)} /></div>
                            {/* <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" placeholder="Name" value={user[0].name.sp} /></div> */}
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control" placeholder="Email Address" value={user[0].email} /></div>


                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" value="India" /></div>
                        </div>
                        {/* <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfileCard
