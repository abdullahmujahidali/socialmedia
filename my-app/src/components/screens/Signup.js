import React,{useState} from "react"
import {Link, useHistory} from "react-router-dom"
import M from "materialize-css"
const SignUp = () => {
    const history=useHistory()
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const PostData =()=>{
        
        fetch('/signup',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email
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
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Snap4Everyone</h2>
            <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}
            ></input>
            <input type="text" placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)} ></input>
            <input type="password" placeholder="password"  value={password} onChange={(e)=>setPassword(e.target.value)}></input>
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
