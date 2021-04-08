import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../App";
import navlogo from "../../components/assets/logo.png";
import LoginGoogle from "./GoogleLogin";


const Wrapper = styled.div`
  .mycard{
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
}
  .auth-card {
    padding:0;
    display: flex;
    flex-direction: column;
    justify-content: center !important;
    align-items: center;
    background: rgba(var(--d87,255,255,255),1);
    max-width: 350px;
    //min-height: 379px;
    border: 1px solid #dbdbdb !important;
    box-shadow: none !important;
  }

  .login-input {
    //border-radius: 999px !important;
    border: 1px solid #dbdbdb !important;
    padding: 0.1rem 0.5rem !important;
    background: #fafafa;
    max-width: 258px !important;
    width: 258px !important;
    height: 36px;
    margin-bottom: 4px;
  }
  .no-account {
    color: #0095f6 !important;
    font-weight: 600;
  }
  .reset {
    margin-bottom: 15px;
    font-size: 12px;
    color: #00376b !important;
  }
  .nav-logo {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 175px;
    height: 70px;
  }
  .btn {
    margin-top: 10px;
    font-weight: 600 !important;
    width: 258px !important;
    margin-bottom: 1em;
    background: #0095f6 !important;
    box-shadow: none;
    //border-radius: 999px !important;
  }
  .btn:disabled{
    color: white !important;
    opacity: 0.3;
  }
 
  .google-btn{
    border-radius: 999px !important;
    overflow: hidden;
    box-shadow: rgb(0 0 0 / 24%) 0px 0px 0px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px !important;
    border: 1px solid red;
    margin-top: 10px;
    height: 35px;
    margin-bottom: 1em;
  }
  .error{
    color:#ed4956;
  }
  .footer-noacct{
    background: rgba(var(--d87,255,255,255),1);
    max-width: 350px;
    padding: 15px;
    width: 100%;
    border: 1px solid #dbdbdb !important;
    box-shadow: none !important;
    text-align: center;
    color: #262626;
    font-weight: bold;
  }
  .hr-text {
    width: 258px;
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: .5;
  &:before {
    content: '';
    background: linear-gradient(to right, transparent, #818078, transparent);
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;

    padding: 0 .5em;
    line-height: 1.5em;
    color: #818078;
    background-color: #fcfcfa;
  }
  }
`;

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [url, setUrl] = useState(undefined);
  const [load, setLoad] = useState(true);
  const [data,setData] = useState("")

  const PostData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          // M.toast({ html: data.error, classes: "#e53935 red darken-1" });
          setData(data)
          setLoad(true);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          //M.toast({html:"signed in success",classes:"#66bb6a green lighten-1"})
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      PostData();
      setLoad(false)
    }
  }


  return (
    <Wrapper>
      <div className="main">
        <div className="mycard">
        <div className="auth-card">
            <img className="nav-logo" src={navlogo} alt="logo" /> 
            <div >
            <input className="login-input browser-default" type="text"
              placeholder="Email"
              value={email.toLowerCase()}
              onKeyPress={handleKeyPress}
              onChange={(e) => { setEmail(e.target.value); }} />

              <input className="login-input browser-default"
              type="password"
              placeholder="Password"
              value={password}
              onKeyPress={handleKeyPress}
              onChange={(e) => { setPassword(e.target.value); }} />
              </div>
       
              <button className="browser-default btn" disabled={!email || !password ? true : false}
               onClick={() => {PostData(); setLoad(false);}}>{load? "Login" : "loading..."}</button>
              <hr class="hr-text" data-content="OR"></hr>

              <LoginGoogle/>
          
              <p className="error">{data.error}</p>
              
                <Link className="reset" to="/reset"> Forgot password? </Link>
              
          </div>
              <div className="footer-noacct"> 
               <span className="footer-span">Dont have an account?{" "} 
               <Link  className="no-account" to="/signup"> Sign up </Link></span>
              </div>


              </div>
      </div>
    </Wrapper>
  );
};

export default Login;
