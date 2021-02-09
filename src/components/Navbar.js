import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () =>{
    return(
        <nav>
        <div className="nav-wrapper white z-depth-0" >
          <Link className="brand-logo left">
            LOGO
          </Link>
          <ul id="nav-mobile" className="right">
            <li  key="6"><Link to="/signin">Signin</Link></li>
            <li  key="7"><Link to="/signup">Signup</Link></li>
            <li  key="7"><Link to="/profile">Profile</Link></li>
          </ul>
        </div>
        </nav>
    )

}

export default Navbar