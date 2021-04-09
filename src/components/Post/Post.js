import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "../Modal/Modal";
import verified from "../assets/correct.svg";
import { BookmarkIcon, CommentIcon, FilledBookmarkIcon, InboxIcon, MoreIcon, SavedIcon } from "../assets/Icons";
import DeleteModal from "../DeleteModal/DeleteModal";
import { UserContext } from "./../../App";
import { Skeleton } from "@material-ui/lab";
import { HeartIcon, FilledHeartIcon } from "../assets/Icons";
import moment from "moment";
import {PostContext} from '../context/PostContext'
import styled from 'styled-components'
import Message from "../Message/Message";

const Wrapper = styled.div`
.postedby-img{
  object-fit: cover;
}
  .card-content{
    padding-top: 15px !important;
    padding-left: 15px !important;
  }
  .view-comments{
    color: #8e8e8e;
    cursor: pointer;
  }
  .comment-icon{  
    margin-left: 13px;

  }
  .inbox-icon{
    margin-left: 13px;
  }
  

`

function Post({ item }) {
  const { state, dispatch } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [del, setDelete] = useState("");
  const closeModal = () => setShowModal(false);
  const closeMessageModal = () => setShowMessageModal(false);
  const [isLike, setIsLike] = useState(true);
  const [likes,setLikes] = useState(null)
  const [comments,setComments] = useState([])
  const [text,setText] = useState("")
  const { feed, setFeed } = useContext(PostContext);
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    setIsLike(item.likes?.includes(state._id));
    setLikes(item.likes?.length)
    setComments(item.comments)
    setIsSave(state?.savedPosts.includes(item._id))
  }, [item.likes,item._id,item.comments,state]);

  const handleText=(e)=>{
        setText(e.target.value)
  }
  const history = useHistory()
  const incLikes = () => setLikes(likes + 1);
  const decLikes = () => setLikes(likes - 1);

  const likePost = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/like`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        
        const newData = feed.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        console.log(result)
        setFeed(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const savePost = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/save`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        saveId: id,
      }),
    }).then((res) => res.json())
      .then((result) => {
        dispatch({
          type: "UPDATESAVE",
          payload: { savedPosts: result.savedPosts },
        });
        localStorage.setItem("user", JSON.stringify(result));
        console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
  };

    const UnsavePost = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/unsave`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unSaveId: id,
      }),
    }).then((res) => res.json())
      .then((result) => {
        dispatch({
          type: "UPDATESAVE",
          payload: { savedPosts: result.savedPosts },
        });
        localStorage.setItem("user", JSON.stringify(result));
        console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
  };




  const unlikePost = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/unlike`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = feed.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        })
        console.log(newData)
        setFeed(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const makeComment = (text, postId) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/comment`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    }).then((res) => res.json())
      .then((result) => {
        
        console.log(result.comments);
        setComments(result.comments)
        // const newData = data.map((item) => {
        //   if (item._id === result._id) {
        //     return result;
        //   } else {
        //     return item;
        //   }
        // });
       
        // setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deletePost = (postid) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = feed.filter((item) => {
          return item._id !== result._id;
        });
        console.log(newData)
        setFeed(newData);
      }).catch((error=>{
        console.log(error)
      }));
  };
  return (
    <Wrapper>
    <div className="card home-card" key={item?._id}>
      <div style={{ padding: "10px", margin: "0" }}>
        <Link to={item.postedBy?._id === state._id
              ? `/profile`
              : `/profile/${item.postedBy?._id}`}>
          <span>
            <span className="border">
              <img src={item.postedBy?.pic} className="postedby-img" alt={item.name} />{" "}
          </span>
          </span>
          <span style={{fontWeight: "600",verticalAlign: "super",paddingLeft: "10px",}}>
            {item.postedBy?.username}
          </span>
        </Link>
        {item.postedBy?.followers.length >= 10 ? (
          <span>
            <img src={verified} className="verified" alt="verified" />
          </span>
        ) : null}
        {showModal && (
          <Modal>
            <DeleteModal
              item={item}
              postId={del}
              handleDeletePost={deletePost}
              state={state}
              closeModal={closeModal}
            />
          </Modal>
        )}

          <MoreIcon
            onClick={() => {
              setShowModal(true);
              setDelete(item._id);
            }}
            style={{ float: "right" }}
          />
        {" "}
      </div>

      <div className="card-image">
        <img src={item.photo} alt={item.name} />
      </div>
      <div className="card-content">
        <span>
        {isLike ? (
          <FilledHeartIcon
            onClick={() => {
              setIsLike(false);
              decLikes()
              unlikePost(item?._id);
            }}
          />
        ) : (
          <HeartIcon
            onClick={() => {
              incLikes()
              setIsLike(true);
              likePost(item?._id);
            }}
          />
        )}
        <CommentIcon onClick={() => history.push(`/post/${item._id}`)} className="comment-icon" />
        <InboxIcon onClick={() => {setShowMessageModal(true);}} className="inbox-icon"/>
        {
          isSave ?
          <FilledBookmarkIcon style={{float: "right"}} onClick={()=>{UnsavePost(item?._id);setIsSave(false)}}/>
          : <BookmarkIcon style={{float: "right"}} onClick={()=>{savePost(item?._id);setIsSave(true)}}/>
        }
        
        {
          showMessageModal && 
        
              <Message closeMessageModal={closeMessageModal}/>
          
        }
        </span>

        <div className="bold">
          {likes} {likes > 1 ? "likes" : "like"}
        </div>
        <div>{item.title}</div>
        <span style={{ color: "rgb(178, 178, 178)" }}>
          {moment(item.createdAt).fromNow()}
        </span>
        <p style={{ fontSize: "13px" }}>{item.body}</p>
        
        {comments.length > 2 && (
          <span
            onClick={() => history.push(`/post/${item._id}`)}
            style={{
                color:"#8e8e8e",
                cursor: "pointer"
              }}
            className="view-comments"
          >
            View all {comments.length} comments
          </span>
        )}
        {comments?.slice(-2).map((record) => {
          //console.log(record)
          return (
            <div key={record._id}>
              <span className="bold">{record.postedBy.name}</span>{" "}
              {record.text}
            </div>
          );
        })}
      </div>
      <hr />

      <form
        onSubmit={(e) => {
          e.preventDefault();      
          makeComment(text, item._id);
          setText("")
        }}>
        <input
          className="browser-default"
          type="text"
          value={text}
          onChange={handleText}
          placeholder="Add a comment"
        />
        <button disabled={!text} className="post-btn">Post</button>
      </form>
    </div>
    </Wrapper>
  );
}

export default Post;
