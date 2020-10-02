import React from "react"

const Profile =()=>{
return (
    <div style={{maxWidth: "550px", margin:"0px auto"}}>
        <div style={{
            display:"flex",
            justifyContent: "space-around",
            margin: "18px 0px",
            borderBottom: "1px solid grey"
        }}>
            <div>
                <img  style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://i.ibb.co/3sNys4h/abd.png" alt="profileImg"
                />
            </div>
            <div>
                <h4>Abdullah Mujahid</h4>
                <div style={{display:"flex", justifyContent: "space-between", width:"108%"}}>
                    <h6>40 posts</h6>
                    <h6>408 followers</h6>
                    <h6>40 followings</h6>

                </div>
            </div>
        </div>
   
        <div className="gallery">
            <img className="item" src="https://i.ibb.co/3sNys4h/abd.png" alt="profileImg" />
            <img className="item" src="https://i.ibb.co/3sNys4h/abd.png" alt="profileImg" />
            <img className="item" src="https://i.ibb.co/3sNys4h/abd.png" alt="profileImg" />
            <img className="item" src="https://i.ibb.co/3sNys4h/abd.png" alt="profileImg" />
            <img className="item" src="https://i.ibb.co/3sNys4h/abd.png" alt="profileImg" />
            <img className="item" src="https://i.ibb.co/3sNys4h/abd.png" alt="profileImg" />


        </div>
    </div>
)
}

export default Profile
