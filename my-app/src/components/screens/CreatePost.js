import React,{useState} from "react"
import {useHistory} from "react-router-dom"
import M from "materialize-css"
const CreatePost = () => {
    const history=useHistory()
    const [title,setTitle]= useState("")
    const [body,setBody]= useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")
    const postDetails=()=>{
        const data=new FormData()
        
        data.append("file",image)
        data.append("upload_preset","snap-everyone")
        data.append("cloud_name","imagedirectory")
        fetch("https://api.cloudinary.com/v1_1/imagedirectory/image/upload",{
        method:"post",
        body:data
    })
    .then(res=>res.json())
    .then(data=>{
        setUrl(data.url)
    })
    .catch(err=>{
        console.log(err)
    })
    fetch('/createpost',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            title,
            body,
            pic:url
        })
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html:data.error, classes:"#004d40 teal darken-4"})
        }
        else{
            M.toast({html: "Post created", classes:"#03a9f4 light-blue"})
            history.push("/")
        }
     }).catch(err=>{
         console.log(err)
     })
}


    

    return (
        <div className="card input-field"
        style={{
            margin: "30px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
        }}
        >
            <input type="text" placeholder="Title" value ={title} onChange={(e)=>setTitle(e.target.value)}></input>
            <input type="text" placeholder="Body" value ={body} onChange={(e)=>setBody(e.target.value)}></input>
            <div className="file-field input-field">
                <div className="btn #b71c1c red darken-4">
                    <span>Upload image</span>
                    <input type="file"  onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #b71c1c red darken-4"
            onClick={()=>postDetails()}
            >Submit Post
             
            </button>
        </div>
    )
}

export default CreatePost