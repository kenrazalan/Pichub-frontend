import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    .auth-card{
        border: 1px solid #DBDBDB !important;
        box-shadow: none !important;
    }
    .login-input{
  
        border-radius: 4px !important;
        border: 1px solid #DBDBDB !important;
        padding: 0.1rem 0.5rem !important;
        width: 95% !important;
        height: 2rem !important;
    }
    .no-account{
    
       color: #0095f6!important;
       font-weight: 600;
    }
    .reset{
        font-size: 0.8em;
        
        font-weight: 100 !important;
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

const Login = () =>{
    const history = useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [load,setLoad] = useState(true)

    // const PostData =()=>{
    //     fetch("http://localhost:5000/signin",{
    //         method:"post",
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body:{
    //             name:"",
                

    //         }
    //     })
    // }

    return(
        <Wrapper>
        <div className="mycard">
             <div className="card auth-card">
                <h2 className="brand-logo">Logo</h2>
                <input
                className="login-input"
                 type="text"
                 placeholder="email"
                 value={email.toLowerCase()}
                 onChange={(e)=>{
                     setEmail(e.target.value)
                 }}
                 
                />
                 <input
                   className="login-input"
                 type="password"
                 placeholder="password"
                 value={password}
                 onChange={(e)=>{
                     setPassword(e.target.value)
                 }}
                 
                />
                  <button className="btn waves-effect waves-light #64b5f6 blue darken-2" >
                   Login
                </button>
                 <div style={{marginTop: "1em"}}>
                   Dont have an account? <Link className="no-account" to="/signup">Sign up</Link>
                </div>
                <div>
                    <Link className="reset" to="/reset">Forgot password?</Link>
                </div>
             </div>
        </div>
        </Wrapper>
    )

}

export default Login