import React, { useState, useEffect, useContext, Fragment } from "react"
import { UserContext } from "../../App"
import {Link} from "react-router-dom"
const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch("/allpost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                
                setData(result)
            })
    }, [])
    const likePost = (id) => {
        fetch("/like", {
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const unlikePost = (id) => {
        fetch("/unlike", {
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }
    const makeComment = (text, postId) => {
        fetch("/comment", {
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    }
                    else {
                        return item
                    }

                })
                setData(newData)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
            })

    }
    const deleteComment = (postid, commentid) => {
        fetch(`/deletecomment/${postid}/${commentid}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((item) => {
                    if (item._id === result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
                 window.location.reload()
            });
    };  return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                        <h5 className="brand-logo" style={{padding: "5px",textAlign:"center"}}><Link to ={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id:"/profile/"}>{item.title}</Link>
                              </h5>
                            
                            <div className="card-image">
                                <img src={item.photo} alt="post"></img>
                            </div>
                            <div className="card-content">
                            <h5 style={{ marginTop:"5" }}><Link style={{marginTop: "10px" }} to ={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id:"/profile/"}> {item.postedBy.name}    </Link> <img style={{   float: "left",width:"35px",height:"35px",borderRadius:"80px",marginRight:"2px"  }} src={item.postedBy.pic} ></img>
                            {item.postedBy._id === state._id &&
                                <i className="material-icons" style={{
                                    float: "right"
                                }}
                                 
                                    onClick={() => deletePost(item._id)}
                                >delete</i>
                            
                            }
                            <i className="material-icons" style={{ color: "red" }}>whatshot</i>
                                {item.likes.includes(state._id)
                                    ? <i className="material-icons" onClick={() => { unlikePost(item._id) }}>star</i>
                                    :
                                    <i className="material-icons" style={{ color: "red" }} onClick={() => { likePost(item._id) }}>star_border</i>
                                }
                               
                                <h6 style={{   float: "right",marginRight:"2px"  }}>{item.likes.length} stars</h6>         
                                <p>{item.body}</p>
                            </h5>
                                
                                {
                                    item.comments.map(record => {
                                        return (
                                            <Fragment>
                                               
                                                    <h6 key={record._id}>
                                                        <span style={{ fontWeight: "500" }}>
                                                            {record.postedBy.name}
                                                        </span>{" "}
                                                        {record.text}
                                                        {(item.postedBy._id  ) === state._id && (
                                                            <i
                                                                className="material-icons"
                                                                style={{
                                                                    float: "right",
                                                                }}
                                                                onClick={() => deleteComment(item._id, record._id)}
                                                            >
                                                                delete
                                                            </i>
                                                        )}
                                                        {(record.postedBy._id ) === state._id && (
                                                            <i
                                                                className="material-icons"
                                                                style={{
                                                                    float: "right",
                                                                }}
                                                    
                                                                onClick={() => deleteComment(item._id, record._id)}
                                                            >
                                                                delete

                                                            </i>
                                                        )}
                                                    </h6>
                                               
                                            </Fragment>
                                        )

                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input type="text" placeholder="Add a comment" />
                                </form>
                            </div>
                        </div>
                    )
                })

            }
        </div>
    )
}

export default Home
