import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'

import Spinner from "./Spinner"
const Profile  = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
 
    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setPics(result.mypost)
       })
    
    },[])
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","snap-everyone")
        data.append("cloud_name","imagedirectory")
        fetch("https://api.cloudinary.com/v1_1/imagedirectory/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{   
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
       
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }
    return (
        <>
            <div style={{ maxWidth: "550px", margin: "0px auto" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "18px 0px",
                    borderBottom: "1px solid grey"
                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={state ? state.pic :<Spinner />} alt="profileImg"
                        />
                    </div>
                    <div>
                        <h4>{state ? state.name :<Spinner />}</h4>
                        <h5>{state ? state.email :<Spinner />}</h5>
                        <div style={{ display: "flex", width: "108%" }}>
                            <h6 style={{paddingRight:"10px"}}>{mypics.length} posts</h6><br/>
                            <h6 style={{paddingRight:"10px"}}>{state? state.followers.length : "0"} followers</h6>
                            <h6 >{state? state.following.length : "0"} following</h6>
                        </div>

                        <div style={{ marginLeft:"0px",margin: "10px" }} className="file-field input-field" >
                            <div className="btn #b71c1c red darken-4">
                                <span>Update-Pic</span>
                                <input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
                            </div>
                            <div style={{ margin: "010px 0 0px 100px" }} className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="gallery" style={{ maxWidth: "550px", margin: "0px auto" }}>
                {
                    mypics.map(item => {
                        return (
                            <img style={{ margin: "5px" }} key={item._id} className="item" src={item.photo} alt={item.title} />
                        )
                    })
                }


            </div>
        </>
    )

}

export default Profile
