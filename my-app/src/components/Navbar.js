import React from "react"
import {Link} from "react-router-dom"
const NavBar = ()=>{
    return (
        <nav>
        <div className="nav-wrapper black ">
          <Link to="/" className="brand-logo left ">Snap 4 Everyone</Link>
          <ul id="nav-mobile" className="right">
            <li><Link to="/signin">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>
      </nav>
    )
}

export default NavBar