import React,{useState,useEffect}from 'react'
import {Link,useHistory} from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
.auth-card{
    border: 1px solid #DBDBDB !important;
    box-shadow: none !important;
}
.signup-input{
    border-radius: 4px !important;
    border: 1px solid #DBDBDB !important;
    padding: 0.1rem 0.5rem !important;
    width: 95% !important;
    height: 2rem !important;
}
.acc-already{
    color: #0095f6!important;
    font-weight: 600;
}
.brand-logo{
    font-family: 'Grand Hotel', cursive ;
  }
button{
    font-weight: 600 !important;
    width: 100% !important;
    margin-bottom: 2em;
}
`


const Signup = () =>{
    return(
        <Wrapper>
        <div className="mycard">
        <div className="card auth-card">
        <h2 className="brand-logo">Logo</h2>
                <input
                className="signup-input"
                 type="text"
                 placeholder="name"
                 />
                <input
                className="signup-input"
                 type="text"
                 placeholder="email"
                 />
                <input
                 className="signup-input"
                 type="text"
                 placeholder="username"
               />
                 <input
                 className="signup-input"
                 type="password"
                 placeholder="password"
                 />
                 <button className="btn waves-effect waves-light #64b5f6 blue darken-2" >
                     Signup
                </button>
        <div style={{marginTop:"1em"}}>
                  Already have an account? <Link className="acc-already" to="/signin">Sign in</Link>
        </div>
        </div>
        </div>
        </Wrapper>
    )

}

export default Signup