import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import M from "materialize-css";
import navlogo from "../../components/assets/logo.png";
import LoginGoogle from "../Login/GoogleLogin";

const Wrapper = styled.div`
  .auth-card {
    border: 1px solid #dbdbdb !important;
    box-shadow: none !important;
  }
  .signup-input {
    border-radius: 999px !important;
    border: 1px solid #dbdbdb !important;
    padding: 0.1rem 0.5rem !important;
    width: 95% !important;
    height: 2rem !important;
  }
  .acc-already {
    color: #0095f6 !important;
    font-weight: 600;
  }
  .nav-logo {
    margin-bottom: 30px;
    margin-top: 30px;
  }
  .btn {
    margin-top:10px;
    font-weight: 600 !important;
    width: 100% !important;
    margin-bottom: 2em;
    border-radius: 999px !important;
  }
  .error{
    margin-top: 10px;
    color:#ed4956;
  }
  .hr-text {
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
      <div className="mycard">
        <div className="card auth-card">
        <img className="nav-logo" src={navlogo} alt="logo" /> 
          {/* <h2 className="brand-logo">Instagram</h2> */}
          <input
            className="signup-input"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="signup-input"
            type="text"
            placeholder="email"
            value={email.toLowerCase()}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="signup-input"
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            className="signup-input"
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {/* <div className="file-field input-field">
                    <div className="btn #64b5f6 blue darken-2">
                    <span>Upload Picture</span>
                    <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                        </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
                </div> */}
          <button
              className="btn waves-effect waves-light #64b5f6 blue darken-2"
              onClick={() => {
                PostData();
                setLoad(false);
              }}
            >
              {load? "Signup" : "loading..."}
            </button>
            <hr class="hr-text" data-content="OR"></hr>
            <LoginGoogle/>

            <p className="error">{data}</p>


          <div style={{ marginTop: "1em" }}>
            Already have an account?{" "}
            <Link className="acc-already" to="/signin">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Signup;
