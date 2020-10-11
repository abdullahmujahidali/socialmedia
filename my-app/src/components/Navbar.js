import React, { useContext,Fragment } from "react"
import { Link ,useHistory} from "react-router-dom"
import {UserContext} from "../App"
const NavBar = () => {
  const {state,dispatch}=useContext(UserContext)
  const history=useHistory()
  const renderList=()=>{
    if(state){
      return [
        <Fragment>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/create">Create Post</Link></li>
        <li><Link to="/myfollowingpost">Explore Followings</Link></li>

        <button className="btn waves-effect waves-light #b71c1c red darken-4 yell"
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push("/MainPage")
              }}  
             >LOG OUT
             </button>
        
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
          <Link to={state ? "/": "/MainPage"} className="brand-logo  ">Paparazzo</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>

      </nav>
    
    </Fragment>
  )
}

export default NavBar