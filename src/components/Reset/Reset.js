import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import navlogo from '../../assets/Untitled3.png';
import M from "materialize-css";
import styled from "styled-components";

const Wrapper = styled.div`
  .auth-card {
    border: 1px solid #dbdbdb !important;
    box-shadow: none !important;
  }
  .reset-input {
    border-radius: 4px !important;
    border: 1px solid #dbdbdb !important;
    padding: 0.1rem 0.5rem !important;
    width: 95% !important;
    height: 2rem !important;
  }
  .brand-logo {
    font-family: "Grand Hotel", cursive;
  }
  .no-account {
    color: #0095f6 !important;
    font-weight: 600;
  }
  button {
    font-weight: 600 !important;
    width: 100% !important;
    margin-bottom: 2em;
  }
`;
const Reset = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");

  const PostData = () => {
    const emailValidation = `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`;

    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Invalid Email", classes: "#e53935 red darken-1" });
      return;
    }
    fetch("/resetpassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#e53935 red darken-1" });
        } else {
          M.toast({ html: data.message, classes: "#66bb6a green lighten-1" });
          history.push("/signin");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <div className="mycard">
        <div className="card auth-card">
        <img className="nav-logo" src={navlogo} alt="logo" /> 
          <input
            className="reset-input"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <button
            className="btn waves-effect waves-light #64b5f6 blue darken-2"
            onClick={() => PostData()}
          >
            Reset Password
          </button>
          <div style={{ marginBottom: "2em" }}>
            Dont have account?{" "}
            <Link className="no-account" to="/signup">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Reset;
