import React, { useContext,Fragment } from "react"
import { Link } from "react-router-dom"
import {UserContext} from "../App"
const NavBar = () => {
  const {state,dispatch}=useContext(UserContext)
  const renderList=()=>{
    if(state){
      return [
        <Fragment>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/create">Create Post</Link></li>
        </Fragment>
      ]
    }
    else{
      return[
      <Fragment>
      <li><Link to="/signin">Login</Link></li>
      <li><Link to="/signup">Sign Up</Link></li>
      </Fragment>
      ]
    }
  }
  return (

    <Fragment>
    
      <nav>
        <div className="nav-wrapper black ">
          <Link to={state ? "/": "/signin"} className="brand-logo  ">Paparazzo</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>

      </nav>
    
    </Fragment>
  )
}

export default NavBar