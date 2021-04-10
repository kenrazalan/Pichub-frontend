import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import M from "materialize-css";
import navlogo from "../../components/assets/Untitled3.png";
import LoginGoogle from "../Login/GoogleLogin";

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
  .signup-input {
    border: 1px solid #dbdbdb !important;
    padding: 0.1rem 0.5rem !important;
    background: #fafafa;
    max-width: 258px !important;
    width: 258px !important;
    height: 36px;
    margin-bottom: 4px;
    border-radius: 3px;
  }
  .acc-already {
    color: #0095f6 !important;
    font-weight: 600;
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
    border-radius: 3px;
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
    margin-top: 10px;
    color:#ed4956;
  }
  .signin{
    margin-bottom: 20px;
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

const Signup = () => {
  const history = useHistory();
  const [load, setLoad] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const [data,setData] = useState("")

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram-clone");
    data.append("cloud_name", "dtwrzv0of");
    fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);

        setUrl(data.secure_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadFields = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url,
        username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setData(data.error)
          setLoad(true);
        } else {
          M.toast({ html: data.message, classes: "#66bb6a green lighten-1" });
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PostData = () => {
    if (image) {
      uploadImage();
    } else {
      uploadFields();
    }
  };

  return (
    <Wrapper>
      <div className="main">
      <div className="mycard">
        <div className="card auth-card">
        <img className="nav-logo" src={navlogo} alt="logo" /> 
        <div>
          <input className="signup-input browser-default"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => { setName(e.target.value); }} />
          <input className="signup-input browser-default"
            type="text"
            placeholder="Email"
            value={email.toLowerCase()}
            onChange={(e) => { setEmail(e.target.value); }} />
          <input
            className="signup-input browser-default"
            type="text"
            placeholder="Username"
            value={username.toLowerCase()}
            onChange={(e) => { setUsername(e.target.value); }} />
          <input
            className="signup-input browser-default"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); }} />
            </div>
          <button
               disabled={!email || !password || !name || !username  ? true : false}
              className="btn"
              onClick={() => { PostData(); setLoad(false); }}  >
              {load? "Signup" : "loading..."}
            </button>
            <hr class="hr-text" data-content="OR"></hr>
            <LoginGoogle/>

            <p className="error">{data}</p>


          <div className="signin">
            Already have an account?{" "}
            <Link className="acc-already" to="/signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      </div>
    </Wrapper>
  );
};

export default Signup;
