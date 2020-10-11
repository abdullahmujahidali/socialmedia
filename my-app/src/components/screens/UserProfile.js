import React, { useEffect, useState, useContext } from "react"
import { UserContext } from "../../App"
import Spinner from "./Spinner"
import { useParams } from "react-router-dom"
const Profile = () => {
    const [userProfile, setProfile] = useState(null)
    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()
    const [showfollow,setShowFollow]= useState(state?!state.following.includes(userid):true)
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setProfile(result)
                // setPics(result.mypost)
            })
    }, [userid])
    const followUser = () => {
        fetch("/follow", {
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]
                        }
                    }
                })
                setShowFollow(false)
            })
    }
    const unfollowUser = () => {
        fetch("/unfollow", {
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {
    
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                
                setProfile((prevState) => {
                    const newFollower=prevState.user.followers.filter(item=>item !== data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower
                        }
                    }
                })
                setShowFollow(true)
            })
    }
    return (

        <>
            {userProfile ?
                <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "18px 0px",
                        borderBottom: "1px solid grey"
                    }}>
                        <div>
                            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                               src={userProfile.user.pic} alt="profileImg"
                            />
                        </div>
                        <div>
                            <h4>{userProfile.user.name}</h4>
                            <h5>{userProfile.user.email}</h5>

                            <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                                <h6>{userProfile.posts.length} posts</h6>
                                <h6>{userProfile.user.followers.length} followers</h6>
                                <h6>{userProfile.user.following.length} following</h6>
                            </div>
                            {showfollow?
                                <button style={{
                                    margin:"10px"
                                }} className="btn waves-effect waves-light #b71c1c red darken-4"
                                onClick={() => followUser()}
                            >Follow </button>
                            :
                            <button style={{
                                    margin:"10px"
                                }} className="btn waves-effect waves-light #b71c1c red darken-4"
                                onClick={() => unfollowUser()}
                            >Un Follow</button>
                            }
                           
                        </div>
                    </div>

                    <div className="gallery" style={{ maxWidth: "550px", margin: "0px auto" }}>
                        {
                            userProfile.posts.map(item => {
                                return (
                                    <img key={item._id} className="item" src={item.photo} alt={item.title} />
                                )
                            })
                        }


                    </div>
                </div>
                : <Spinner />}
                      </>
    )
}

export default Profile
