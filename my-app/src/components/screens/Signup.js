import React,{useState,useEffect} from "react"
import {Link, useHistory} from "react-router-dom"
import M from "materialize-css"

const SignUp = () => {
    const history=useHistory()
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    })
const uploadPic=()=>{
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
}
const uploadFields=()=>{
    fetch('/signup',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name,
            password,
            email,
            pic:url
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html:data.error, classes:"#004d40 teal darken-4"})
        }
        else{
            M.toast({html: data.message, classes:"#03a9f4 light-blue"})
            history.push("/signin")
        }
     }).catch(err=>{
         console.log(err)
     })
}
    const PostData =()=>{
        if(image){
            uploadPic()
        }
        else{
            uploadFields()
        }
      
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Snap4Everyone</h2>
            <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}
            ></input>
            <input type="text" placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)} ></input>
            <input type="password" placeholder="password"  value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <div className="file-field input-field">
                <div className="btn #b71c1c red darken-4">
                    <span>Upload Profile Picture</span>
                    <input type="file"  onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #b71c1c red darken-4" onClick={()=>PostData()}>Sign UP
            
             </button>
             <h5 >
                 <Link  className="acc" to ="/signin">Already have an account ?</Link>
             </h5>
             </div>
        </div>
    )
}

export default SignUp
