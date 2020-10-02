import React from "react"
import {Link} from "react-router-dom"
const SignIn = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Snap4Everyone</h2>
           
            <input type="text" placeholder="email"></input>
            <input type="password" placeholder="password"></input>
            <button className="btn waves-effect waves-light #b71c1c red darken-4">Login
             </button>
             <h5 >
                 <Link className="acc" to ="/signup">Don't have an account ?</Link>
             </h5>
             </div>
        </div>
    )
}

export default SignIn
