import React, { useContext, useState } from "react";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import { AddPost, NewPostIcon } from "../assets/Icons";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import Loader from "../assets/Loader";
import {PostContext} from '../../context/PostContext'

const NewPostWrapper = styled.div`
  .newpost-header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    margin: 0px;
    line-height: 1.7;
  }
  .newpost-header h3:first-child {
    color: #ed4956;
  }
  h3 {
    cursor: pointer;
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin: 0px;
  }
  .newpost-header h3:last-child {
    color: #0095f6;
  }
  textarea {
    height: 100%;
    width: 100%;
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    resize: none;
  }
  .modal-content {
    width: 700px;
  }
  .post-preview{
    max-height: 80vh;
    width: 100%;
  }
  @media screen and (max-width: 780px) {
    .modal-content {
      width: 90vw;
    }
  }
`;

const NewPost = () => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();
  const { stateFeed, dispatchFeed } = useContext(PostContext);

  const handleUploadImage = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreview(e.target.result);
        setShowModal(true);
      };
      reader.readAsDataURL(e.target.files[0]);

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
          console.log(url);

          setUrl(data.secure_url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSubmitPost = () => {
    setShowModal(false);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/createpost`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#e53935 red darken-1" });
        } else {
          console.log(data)
          dispatchFeed({type:"NEWPOST", payload:[data.post,...stateFeed]})
          //setFeed([data.post,...feed])
          // M.toast({ html: "Post Created", classes: "#66bb6a green lighten-1" });
          history.push("/");
          window.scrollTo(0, 0);
        }
      }).catch((error) => {
        console.log(error);
      });

  };

  return (
    <NewPostWrapper>
      <label htmlFor="upload-post">
        <AddPost />
      </label>
      <input
        id="upload-post"
        type="file"
        onChange={handleUploadImage}
        accept="image/*"
        style={{ display: "none" }}
      />
      {showModal && (
        <Modal>
          <div className="modal-content">
            <div className="newpost-header">
              <h3 onClick={() => setShowModal(false)}>Cancel</h3>
              <h3 onClick={() => handleSubmitPost()}>Share</h3>
            </div>
            {preview && url ? (
              <img className="post-preview" src={preview} alt="preview" />
            ) : (
              <Loader />
            )}
            <div>
              <textarea
                placeholder="Add caption"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      )}
    </NewPostWrapper>
  );
};

export default NewPost;
