import React,{useState,useContext} from "react"
import {Link, useHistory} from "react-router-dom"
import {UserContext} from "../../App"
import M from "materialize-css"
const SignIn = () => {
    const {state,dispatch} =useContext(UserContext)
    const history=useHistory()
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const PostData =()=>{
        
        fetch('/signin',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html:data.error, classes:"#004d40 teal darken-4"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "signedin success", classes:"#03a9f4 light-blue"})
                history.push("/")
            }
         }).catch(err=>{
             console.log(err)
         })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Snap4Everyone</h2>
           
                <input type="text" placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)} ></input>
             <input type="password" placeholder="password"  value={password} onChange={(e)=>setPassword(e.target.value)}></input>
             <button className="btn waves-effect waves-light #b71c1c red darken-4"
              onClick={()=>PostData()}  
             >Login
             </button>
             <h5 >
                 <Link className="acc" to ="/signup">Don't have an account ?</Link>
             </h5>
             </div>
        </div>
    )
}

export default SignIn
