import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import verified from "../assets/correct.svg";
import { MoreIcon } from "../assets/Icons";
import DeleteModal from "../DeleteModal/DeleteModal";
import { UserContext } from "./../../App";
import { Skeleton } from "@material-ui/lab";
import { HeartIcon, FilledHeartIcon } from "../assets/Icons";
import moment from "moment";

function Post({ item }) {
  const { state, dispatch } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [del, setDelete] = useState("");
  const closeModal = () => setShowModal(false);
  const [isLike, setIsLike] = useState(true);
  const [loading, setLoading] = useState(true);
  const [likes,setLikes] = useState(null)
  const [comments,setComments] = useState([])
  const [text,setText] = useState("")

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/followingpost`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result.posts.map(item=>item.likes.length))
        setData(result.posts);
        setLoading(false);
      });
  }, [state, data]);

  useEffect(() => {
    setIsLike(item.likes.includes(state._id));
    setLikes(item.likes.length)
    setComments(item.comments)
  }, [item,state]);

  const handleText=(e)=>{
        setText(e.target.value)
  }

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
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
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
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
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
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };
  return (
    <div className="card home-card" key={item._id}>
      <div style={{ padding: "10px", margin: "0" }}>
        <Link
          to={
            item.postedBy._id === state._id
              ? `/profileheader`
              : `/profile/${item.postedBy._id}`
          }
        >
          <span>
            <span className="border">
              <img
                src={item.postedBy.pic}
                className="postedby-img"
                alt={item.name}
              />{" "}
            </span>
          </span>
          <span
            style={{
              fontSize: "17px",
              fontWeight: "600",
              verticalAlign: "super",
              paddingLeft: "10px",
            }}
          >
            {item.postedBy.name}
          </span>
        </Link>
        {item.postedBy.followers.length >= 10 ? (
          <span>
            <img src={verified} className="verified" alt="verified" />
          </span>
        ) : null}
        {showModal && (
          <Modal>
            <DeleteModal
              postId={del}
              handleDeletePost={deletePost}
              state={state}
              closeModal={closeModal}
            />
          </Modal>
        )}
        {item.postedBy._id === state._id && (
          <MoreIcon
            onClick={() => {
              setShowModal(true);
              setDelete(item._id);
            }}
            style={{ float: "right" }}
          />
        )}{" "}
      </div>

      <div className="card-image">
        <img src={item.photo} alt={item.name} />
      </div>
      <div className="card-content">
        {isLike ? (
          <FilledHeartIcon
            onClick={() => {
              setIsLike(false);
              decLikes()
              unlikePost(item._id);
            }}
          />
        ) : (
          <HeartIcon
            onClick={() => {
              incLikes()
              setIsLike(true);
              likePost(item._id);
            }}
          />
        )}

        <div className="bold">
          {likes} {likes > 1 ? "likes" : "like"}
        </div>
        <div>{item.title}</div>
        <span style={{ color: "rgb(178, 178, 178)" }}>
          {moment(item.createdAt).fromNow()}
        </span>
        <p style={{ fontSize: "13px" }}>{item.body}</p>
        {comments.map((record) => {
          //console.log(record)
          return (
            <div key={record._id}>
              <span style={{ fontWeight: "600" }}>{record.postedBy.name}</span>{" "}
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
  );
}

export default Post;
