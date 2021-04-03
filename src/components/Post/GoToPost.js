import React,{useEffect,useState,useContext} from 'react'
import { CommentIcon, FilledHeartIcon, HeartIcon, MoreIcon, SavedIcon } from '../assets/Icons';
import { useParams, useHistory, Link } from "react-router-dom";
import styled from 'styled-components'
import { UserContext } from "../../App";
import moment from 'moment';
import Loader from '../assets/Loader';
import {PostContext} from '../context/PostContext'
import DeleteModal from '../DeleteModal/DeleteModal';
import Modal from '../Modal/Modal';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 1fr;
  @media screen and (max-width: 840px) {
    display: flex;
    flex-direction: column;
    .post-details{
        margin-bottom: 150px;
    }
    .comment-section {
      height: auto !important;
    }
    .footer{
        border: 1px solid #dbdbdb
    }
    hr{
        border-bottom: none !important;
    }
    /* .imahe{
        min-height: 350px;
        max-height: 700px;
    } */
    .numLikes-container{
        display: none !important;
    }
    .numLikes-container2{
      display: flex !important;
      border-top: none !important;
      flex-direction: column;
      justify-content: center;
      height: 70px;
      border-top: 1px solid #DBDBDB;
    .createdAt{
        font-size: 12px;
        color: rgb(178, 178, 178);
        padding-left: 12px;
    }
    .numLikes{
        padding-left: 12px;
        font-weight: bolder;
        color: #8e8e8e;
    }

   }
  }

  
  hr{
    border: none;
    border-bottom:1px solid #DBDBDB;
  }
  .imahe {
    width: 100%;
    min-height: 500px;
    max-height: 500px;
    object-fit: cover;
    border: 1px solid #DBDBDB;
    border-right: none;
  }
  .post-details {
    border: 1px solid #DBDBDB;
    position: relative;
  }
  .postedby-img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-bottom: -10px;
    border: 2px solid #DBDBDB;

  }
  .postedby-name{
   font-size: 15px;
   font-weight: 600;
   vertical-align: super;
   padding-left: 10px;
   margin-top: 10px;
  }
  .header-info{
      display: flex;
      justify-content: space-between;
      align-items: center;
     /*  padding: 10px;
      margin-bottom: 10px; */
  }
  .header-info-link{
    display: flex;
      align-items: center;
      padding: 10px;
      margin-bottom: 10px;
  }
  .comment-section{

      height: 266px;
      
      overflow-y: scroll;

      ::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
  }
svg{
    margin-right: 12px;   
}
  
.comment-info{
          display: flex;
          flex-direction: row;
          margin-left: 12px;
          min-height: 40px;
          padding: 10px;
}
.comment-img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-bottom: -10px;
    margin-right: 3px;
    border: 2px solid #DBDBDB;
}
.comment-name{
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: bolder;
    padding:0 5px 0 5px;
}
.comment-text{
    font-size: 14px;
    font-weight: 100;
    font-family: 'Roboto', sans-serif;
}
.comment-footer{
    position: relative;
}
  .footer{
    width: 100%;
    position: absolute;
    top: 0;
    
  }
   .numLikes-container2{
       display: none;
   }
  .numLikes-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 70px;
      border-top: 1px solid #DBDBDB;
    .createdAt{
        font-size: 12px;
        color: rgb(178, 178, 178);
        padding-left: 12px;

    }
    .numLikes{
        padding-left: 12px;
        font-weight: bolder;
        color: #8e8e8e;
    }
  }
  .input-container{
      display: flex;
      justify-content: space-around;
      border-top: 1px solid #DBDBDB;
  }
  input{
    width:78%;
    padding:20px 20px 20px 0;
    height: 2rem;
    outline: none;
    border: none;
    
  }
  .post-btn{
    border:none;
    color:#0095f6;
    font-weight: 500;
    font-size: 14px;
    background: none;
   
  }
  .reacts{
      display: flex;
      align-items: center;
      padding-left: 12px;
      height: 50px;
      width: 100%;
      border-top: 1px solid #DBDBDB;
      svg{
          margin-left: 15px;
      }
  }
`;

function GoToPost() {
    const  {id}  = useParams();
    const [post,setPost] = useState([])
    const { state, dispatch } = useContext(UserContext);
    const [text,setText] = useState("")
    const [load,setLoad] = useState(true)
    const { feed, setFeed } = useContext(PostContext);
    const [isLike, setIsLike] = useState(true);
    const [likes,setLikes] = useState(null)
    const [comments,setComments] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [del, setDelete] = useState("");
    const closeModal = () => setShowModal(false);
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/post/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((result) => {
            setPost(result.post)
            setLoad(false)
            console.log(result.post)
          });
      }, [id]);

      useEffect(() => {
        setIsLike(post.likes?.includes(state._id));
        setLikes(post.likes?.length)
        setComments(post?.comments)
      }, [post,state]);
      

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
        
        const newData = feed.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        console.log(newData)
        setFeed(newData);
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
        //console.log(newData)
        setFeed(newData);
      }).catch((error=>{
        console.log(error)
      }));
  };


    if(load){
        return <Loader/>
    }

    return (
        <Wrapper>
        <img className="imahe" src={post && post.photo} alt={post?.name} />
        <div className="post-details">
        
        
      

          <div className="header-info">
        <div className="header-info-link">
          <Link to={post.postedBy?._id === state._id ? `/profileheader` : `/profile/${post.postedBy?._id}`}>
                <img src={post.postedBy?.pic} className="postedby-img" alt={post.name} />{" "}
          </Link>
          <Link to={post.postedBy?._id === state._id ? `/profileheader` : `/profile/${post.postedBy?._id}`}>
                <div className="postedby-name">
                    {post.postedBy?.name}<span>  •</span>
                </div>
          </Link> 
          </div>
            {post.postedBy?._id === state._id && (
                <MoreIcon
                    onClick={() => {
                    setShowModal(true);
                    setDelete(post?._id);
                    }}
                    style={{ float: "right"}}
                />
                )}{" "}
        </div>
      
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

        <hr/>
            <div className="numLikes-container2">
                <div className="numLikes">   {likes} {likes > 1 ? "likes" : "like"} </div>
                <div className="createdAt"> {moment(post?.createdAt).fromNow()} </div>
            </div>
        <div className="comment-footer">
            
        <div className="footer">
        <div className="comment-section"> 
            <div className="comment-list">
                {comments.map((comment)=>{
                    return(
                    <div className="comment-info">
                    <Link to={comment.postedBy?._id === state?._id ? `/profileheader` : `/profile/${comment.postedBy?._id}`}>   
                         <img src={comment.postedBy?.pic} className="comment-img" alt={comment.name} />{" "}
                    </Link>
                    <p>  
                        <Link to={comment.postedBy?._id === state?._id ? `/profileheader` : `/profile/${comment.postedBy?._id}`}>
                            <span className="comment-name">
                                {comment.postedBy?.name}{" "}
                            </span>
                        </Link>
            
                        <span className="comment-text">
                          {comment.text}
                        </span>
                    </p>
                </div>
                    )
                })}
           
                
            </div> 

        </div>
      
            <div className="numLikes-container">
                <div className="numLikes">   {likes} {likes > 1 ? "likes" : "like"}</div>
                <div className="createdAt"> {moment(post?.createdAt).fromNow()} </div>
            </div>
            
                <form
                onSubmit={(e) => {
                e.preventDefault();      
                makeComment(text, post?._id);
                setText("")
                }}>
                <div className="input-container">
                <input
                className="browser-default"
                type="text"
                value={text}
                onChange={handleText}
                placeholder="Add a comment"
                />
                <button disabled={!text} className="post-btn">Post</button>
                 </div>
                </form>
           
            <div className="reacts">

             {isLike ? (
             <FilledHeartIcon
                onClick={() => {
                setIsLike(false);
                decLikes()
                unlikePost(post?._id);
                    }}
                />
                  ) : (
              <HeartIcon
              onClick={() => {
              incLikes()
              setIsLike(true);
              likePost(post?._id);
                }}
              />
             )}
            <CommentIcon/>

            </div>
        </div>
        </div>
        </div>
      </Wrapper>
    )
}

export default GoToPost
