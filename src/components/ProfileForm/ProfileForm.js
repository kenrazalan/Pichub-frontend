import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import Button from "../assets/Button";
import gif from '../assets/771.gif'

import { UserContext } from "../../App";
import M from "materialize-css";

export const Wrapper = styled.div`
  padding: 1rem !important;
  img {
    cursor: pointer !important;
    margin-right: 40px !important;
  }
  h2 {
    display: block !important;
    font-size: 1.5em !important;
    margin-block-start: 0.83em !important;
    margin-block-end: 0.83em !important;
    margin-inline-start: 0px !important;
    margin-inline-end: 0px !important;
    margin: 0 !important;
  }
  .input-group {
    margin-top: 1.5rem !important;
  }
  .input-group > label {
    display: inline-block !important;
    width: 100px !important;
  }
  input,
  textarea {
    padding: 0.4rem 1rem !important;
    font-family: "Fira Sans", sans-serif !important;
    font-size: 1rem !important;
    border-radius: 4px !important;
    border: 1px solid #dbdbdb !important;
    width: 335px !important;
    height: 1rem !important;
  }
  .textarea-group {
    display: flex !important;
  }
  .change-avatar {
    display: flex !important;
  }
  input[id="change-avatar"],
  input[id="change-avatar-link"] {
    display: none !important;
  }
  span {
    color: #0095f6 !important;
    cursor: pointer !important;
  }
  button {
    margin-top: 1.5rem !important;
    margin-left: 6.25rem !important;
    margin-bottom: 1rem !important;
  }
  @media screen and (max-width: 550px) {
    width: 98% !important;
    .input-group {
      display: flex !important;
      flex-direction: column !important;
    }
    label {
      padding-bottom: 0.5rem !important;
      font-size: 1rem !important;
    }
    button {
      margin-left: 0 !important;
    }
  }
  @media screen and (max-width: 430px) {
    input,
    textarea {
      width: 85% !important;
    }
  }
`;

const ProfileForm = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [newProfile, setNewProfile] = useState("");
  const [loader,setLoader] = useState(false)

  const name = useInput(state && state.name);
  const username = useInput(state && state.username);
  console.log(state);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setLoader(true)
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "instagram-clone");
      data.append("cloud_name", "dtwrzv0of");
      fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          
          setNewProfile(data.url);
          setLoader(false)
        })
        .catch((error) => {
          console.log(error);
        });
    };

  };

  const handleEditProfile = (e) => {
    e.preventDefault();

    const body = {
      name: name.value,
      username: username.value,
      pic: newProfile || state.pic,
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/editprofile`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        ...body,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          if (data.error.keyValue) {
            return M.toast({
              html: "Username taken",
              classes: "#e53935 red darken-1",
            });
          }
        }
        console.log(data);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...state,
            name: data.name,
            username: data.username,
            pic: data.pic,
          })
        );
        dispatch({
          type: "UPDATEPROFILE",
          payload: { name: data.name, username: data.username, pic: data.pic },
        });
        history.push(`/profile`);
      });
  };

  return (
    <Wrapper>
      <form onSubmit={handleEditProfile}>
        <div className="input-group change-avatar">
          <div>
            <label htmlFor="change-avatar">
              <img
                src={loader ? gif : newProfile ? newProfile : state && state.pic}
                style={{ width: "42px", height: "42px", borderRadius: "80px" }}
                alt="profile"
              />
            </label>
            <input
              id="change-avatar"
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
            />
          </div>
          <div className="change-avatar-meta">
            <h2 className="bold">{ state && state.username}</h2>
            <label htmlFor="change-avatar-link">
              <span>Change Profile Photo</span>
            </label>
            <input
              id="change-avatar-link"
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className="input-group">
          <label className="bold">Name</label>
          <input type="text" value={name.value} onChange={name.onChange} />
        </div>

        <div className="input-group">
          <label className="bold">Username</label>
          <input
            type="text"
            value={username.value.toLowerCase()}
            onChange={username.onChange}
          />
        </div>

        <Button>Submit</Button>
      </form>
    </Wrapper>
  );
};

export default ProfileForm;
