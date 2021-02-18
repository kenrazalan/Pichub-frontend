import React,{useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import NewPost from '../Newpost/Newpost'
const Navbar = () =>{
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const renderList = ()=>{
    if(state){
      return[
         <li  key="8"><Link to="/profile">Profile</Link></li>,
         <li key ="9"><NewPost /></li>,
         <li  key="10"><Link to="/followingpost">Following Post</Link></li>,
         <li key="11">
           <h5  style={{color:'black',padding:"8px 15px 0 15px",fontSize:"15px",}}
           onClick={()=>{
             localStorage.clear()
             dispatch({type:"CLEAR"})
             history.push('/signin')
           }}>
             Logout
           </h5>
         </li>]
        }else{
          return[
            <li  key="6"><Link to="/signin">Signin</Link></li>,
            <li  key="7"><Link to="/signup">Signup</Link></li>
          ]
        }

  }


    return(
        <nav>
        <div className="nav-wrapper white z-depth-0" >
          <Link  to={state?"/":"/signin"} className="brand-logo left">
            LOGO
          </Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          
          </ul>
        </div>
        </nav>
    )

}

export default Navbar