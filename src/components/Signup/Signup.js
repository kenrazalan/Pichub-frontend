import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import M from "materialize-css";

const Wrapper = styled.div`
  .auth-card {
    border: 1px solid #dbdbdb !important;
    box-shadow: none !important;
  }
  .signup-input {
    border-radius: 4px !important;
    border: 1px solid #dbdbdb !important;
    padding: 0.1rem 0.5rem !important;
    width: 95% !important;
    height: 2rem !important;
  }
  .acc-already {
    color: #0095f6 !important;
    font-weight: 600;
  }
  .brand-logo {
    font-family: "Grand Hotel", cursive;
  }
  button {
    font-weight: 600 !important;
    width: 100% !important;
    margin-bottom: 2em;
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
          M.toast({ html: data.error, classes: "#e53935 red darken-1" });
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
          <h2 className="brand-logo">Instagram</h2>
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
          {load ? (
            <button
              className="btn waves-effect waves-light #64b5f6 blue darken-2"
              onClick={() => {
                PostData();
                setLoad(false);
              }}
            >
              Signup
            </button>
          ) : (
            <button className="buttonload">
              <i className="fa fa-spinner fa-spin"></i>Loading
            </button>
          )}

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
