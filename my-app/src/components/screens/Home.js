import React, { useState, useEffect,useContext } from "react"
import {UserContext} from "../../App"
const Home = () => {
    const [data, setData] = useState([])
    const {state,dispatch}=useContext(UserContext)
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
    const likePost=(id)=>{
        fetch("/like",{
            method:"put",
            headers:{
                "Content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData=data.map(item=>{
                if(item._id===result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    const unlikePost=(id)=>{
        fetch("/unlike",{
            method:"put",
            headers:{
                "Content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            const newData=data.map(item=>{
                if(item._id===result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img src={item.photo} alt="post"></img>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }}>whatshot</i>
                                {item.likes.includes(state._id)
                                ?  <i className="material-icons" onClick={()=>{unlikePost(item._id)}}>star</i>
                                :
                                <i className="material-icons" style={{color:"red"}} onClick={()=>{likePost(item._id)}}>star_border</i>
                                }
                                
                                <h6>{item.likes.length} stars</h6>
                                <h4>{item.title}</h4>
                                <p>{item.body}</p>
                                <input type="text" placeholder="Add a comment" />
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default Home
