import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () =>{
    return(
        <nav>
        <div className="nav-wrapper white z-depth-0" >
          <Link to="/" className="brand-logo left">
            LOGO
          </Link>
          <ul id="nav-mobile" className="right">
            <li  key="6"><Link to="/signin">Signin</Link></li>
            <li  key="7"><Link to="/signup">Signup</Link></li>
            <li  key="8"><Link to="/profile">Profile</Link></li>
            <li  key="9"><Link to="/create">Create Post</Link></li>
          </ul>
        </div>
        </nav>
    )

}

export default Navbar