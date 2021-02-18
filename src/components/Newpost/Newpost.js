import React, { useContext, useState } from "react";
import styled from 'styled-components'
import Modal from '../Modal/Modal'
import {NewPostIcon} from '../assets/Icons'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const NewPostWrapper = styled.div`
  .newpost-header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }
  .newpost-header h3:first-child {
    color: #ED4956;
  }
  h3 {
    cursor: pointer;
  }
  .newpost-header h3:last-child {
    color: #0095F6;
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
  @media screen and (max-width: 780px) {
    .modal-content {
      width: 90vw;
    }
  }
`;



const NewPost = () => {
    const [showModal, setShowModal] = useState(false);
    const [preview, setPreview] = useState("");
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const history = useHistory()


    const handleUploadImage = (e) => {
      if (e.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
          setPreview(e.target.result);
          setShowModal(true);
        };
        reader.readAsDataURL(e.target.files[0]);

        // uploadImage(e.target.files[0]).then((res) => {
        //   setPostImage(res.secure_url);
        // });

        const data = new FormData()
        data.append("file",e.target.files[0])
        data.append("upload_preset","instagram-clone")
        data.append("cloud_name","dtwrzv0of")
        fetch(process.env.REACT_APP_CLOUDINARY_URL,{
            method:"post",
            body: data
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.url)

            setUrl(data.url)
        }).catch(error=>{
            console.log(error)
        })

      }
    };



    const handleSubmitPost = () => {


        setShowModal(false);



        // const cleanedCaption = body.value
        //   .split(" ")
        //   .filter((caption) => !caption.startsWith("#"))
        //   .join(" ");

        // body.setValue("");

        // const newPost = {
        //   body: body,
        //   pic: url,

        // };

        // client(`/posts`, { body: newPost }).then((res) => {
        //   const post = res.data;
        //   post.isLiked = false;
        //   post.isSaved = false;
        //   post.isMine = true;
        //   setFeed([post, ...feed]);
        //   window.scrollTo(0, 0);
        //   toast.success("Your post has been submitted successfully");
        // });


        fetch(`${process.env.REACT_APP_BACKEND_URL}/createpost`,{
            method: "post",
            headers:{
                "Authorization": "Bearer "+ localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },body:JSON.stringify({
                body,
                pic:url
            })
        }).then(res => res.json()).then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#e53935 red darken-1"})
            }else{
                M.toast({html: "Post Created",classes:"#66bb6a green lighten-1"})
                             history.push('/')
            }
        }).catch((error)=>{
            console.log(error)
        })
    }











    return (
      <NewPostWrapper>
        <label htmlFor="upload-post">
          <NewPostIcon />
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
                <h3 onClick={()=>handleSubmitPost()}>Share</h3>
              </div>
              {preview && (
                <img className="post-preview" src={preview} alt="preview" />
              )}
              <div>
                <textarea
                  placeholder="Add caption"
                  value={body}
                  onChange={(e)=>setBody(e.target.value)}
                />
              </div>
            </div>
          </Modal>
        )}
      </NewPostWrapper>
    );
  };

  export default NewPost;