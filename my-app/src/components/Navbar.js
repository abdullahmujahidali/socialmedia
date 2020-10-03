import React, { Fragment } from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <Fragment>
    
      <nav>
        <div className="nav-wrapper black ">
          <Link to="/" className="brand-logo  ">Snap 4 Everyone</Link>
          <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/signin">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/create">Create Post</Link></li>
          </ul>
        </div>

      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/signin">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/create">Create Post</Link></li>
      </ul>
   
    </Fragment>
  )
}

export default NavBar