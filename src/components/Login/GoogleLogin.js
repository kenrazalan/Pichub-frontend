import React,{useContext} from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import {GoogleLogin} from 'react-google-login'
import styled from "styled-components";

function LoginGoogle() {

    const Wrapper = styled.div`
  .google-btn{
    border-radius: 999px !important;
    overflow: hidden;
    box-shadow: rgb(0 0 0 / 24%) 0px 0px 0px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px !important;
    border: 1px solid #e5e7eb !important;
    margin-top: 10px;
  }
`;

    const { state, dispatch } = useContext(UserContext);
    const history = useHistory()

    const googleSuccess = (res)=>{
        console.log(res)
        axios({
          method:"POST",
          url:`${process.env.REACT_APP_BACKEND_URL}/googlelogin`,
          data: {tokenId: res.tokenId}
        }).then(res=>{
          console.log(res.data)
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          dispatch({ type: "USER", payload: res.data.user });
          history.push("/");
        })
    
        
      }
      const googleFailure = (err)=>{
        console.log(err)
        console.log("Google Sign in was unsuccessfully")
      }
    return (    <Wrapper>
                <GoogleLogin 
                clientId="292368699085-jb2puctimlk06qjc65noft4bp2v574bu.apps.googleusercontent.com"
                className="google-btn"
                //buttonText="Google"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={"single_host_origin"}
                />
                </Wrapper>
            )
}

export default LoginGoogle
