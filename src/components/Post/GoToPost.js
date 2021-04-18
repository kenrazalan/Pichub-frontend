import React,{useEffect,useState,useContext} from 'react'
import { BookmarkIcon, CommentIcon, FilledBookmarkIcon, FilledHeartIcon, HeartIcon, InboxIcon, MoreIcon, SavedIcon } from '../../assets/Icons';
import { useParams, useHistory, Link } from "react-router-dom";
import styled from 'styled-components'
import { UserContext } from "../../App";
import moment from 'moment';
import Loader from '../../assets/Loader';
import {PostContext} from '../../context/PostContext'
import DeleteModal from '../DeleteModal/DeleteModal';
import Modal from '../Modal/Modal';
import Button from '../../assets/Button';
import Message from '../Message/Message';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 1fr;
  @media screen and (max-width: 840px) {
    display: flex;
    flex-direction: column;

     margin-bottom: 150px;
    .post-details{
      margin-bottom: 230px !important;
    }
    .comment-section {
      height: auto !important;
    }
    .comment-list{
      max-height: 150px;
    }
    .footer{
        border: 1px solid #dbdbdb
    }
    hr{
        border-bottom: none !important;
    }

    .imahe{
      min-height: unset !important;
      max-height: unset !important;
        /* min-height: 350px;
        max-height: 600px !important; */
        object-fit: contain;
    }
    /* .numLikes-container{
        display: none !important;
    } */
    /* .numLikes-container2{
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

   } */
  }

  .post-btn{
    border:none;
    color:#0095f6;
    font-weight: 500;
    font-size: 14px;
    background: none;
    margin-right: 20px;
  }
  .post-btn:disabled{
    opacity: 0.3;
  }
  hr{
    border: none;
    border-bottom:1px solid #DBDBDB;
  }
  .imahe {
    width: 100%;
    min-height: 500px;
    max-height: 500px;
    //object-fit: cover;
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
    object-fit: cover;

  }
  .postedby-name{
   font-size: 14px;
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
    object-fit: cover;
}
.comment-name{
    //font-family: 'Roboto', sans-serif;
    font-size: 12px;
    font-weight: 700;
    padding:0 5px 0 5px;
}
.comment-text{
    font-size: 12px;
    font-weight: 100;
    //font-family: 'Roboto', sans-serif;
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
  .btns{
    background: transparent;
    padding : 0;
    min-width: unset;
    width: fit-content ;
    color: black;
    border: none;
    margin-left: 3px;
    :focus{
      background-color: unset;
    }

  }
  .follow{
    color: #0095f6;
    //font-weight: bold;
}
.following{
  color: #262626;
}
`;

function GoToPost() {
    const  {id}  = useParams();
    const [post,setPost] = useState([])
    const { state, dispatch } = useContext(UserContext);
    const [text,setText] = useState("")
    const [loading,setLoading] = useState(true)
    const { feed, setFeed } = useContext(PostContext);
    const [isLike, setIsLike] = useState(true);
    const [likes,setLikes] = useState(null)
    const [comments,setComments] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [del, setDelete] = useState("");
    const closeModal = () => setShowModal(false);
    const [load,setLoad] = useState(false)
    const [showFollow,setShowfollow] = useState(true)
    const [showMessageModal, setShowMessageModal] = useState(false);
    const closeMessageModal = () => setShowMessageModal(false);
    const [isSave, setIsSave] = useState(false);

    useEffect(() => {
      setShowfollow(state && !state.following.some((i) => i._id === id));
      const saveposts = state?.savedPosts.map(save=> save._id)
      setIsSave(saveposts?.includes(post._id))
    }, [state,id,post._id]);
    
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/post/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((result) => {
            setPost(result.post)
            setLoading(false)
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

   const followUser = (userId) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setShowfollow(false);
        setLoad(false);
      }).catch(error=>console.log(error));
  };

  const unfollowUser = (userId) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/unfollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setLoad(false)
        setShowfollow(false);
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

    if(loading){
        return <Loader/>
    }

    return (
        <Wrapper>
        
           <img className="imahe" src={post && post.photo} alt={post?.name} />
        
        <div className="post-details">
        
        
      

          <div className="header-info">
        <div className="header-info-link">
          <Link to={post.postedBy?._id === state._id ? `/profile` : `/profile/${post.postedBy?._id}`}>
                <img src={post.postedBy?.pic} className="postedby-img" alt={post.name} />{" "}
          </Link>
         
                <div className="postedby-name">
                <Link to={post.postedBy?._id === state._id ? `/profile` : `/profile/${post.postedBy?._id}`}>
                    {post.postedBy?.username}
                </Link> 
                      { state._id === post.postedBy?._id ? null : <span>  •</span> }
                   
                </div>    
                    <span>
                     {
                       state._id === post.postedBy?._id ? null :
                     !state.following.some((i) => i._id === post.postedBy?._id) ? (
                      !load ? 
                      <Button className="btns follow" onClick={() => {followUser(post.postedBy?._id);setLoad(true);}}>Follow</Button>
                      : (
                        <Button className="btns">
                          <i className="fa fa-spinner fa-spin"></i>
                        </Button>
                      )
                    ) : ( !load ? 
                      <Button className="btns following" onClick={() => {unfollowUser(post.postedBy?._id); setLoad(true);}}>Following</Button>
                      :  (
                        <Button className="btns">
                          <i className="fa fa-spinner fa-spin"></i>
                        </Button>
                      )
                    )}
                      </span>    
          </div>
                <MoreIcon
                    onClick={() => {
                    setShowModal(true);
                    setDelete(post?._id);
                    }}
                    style={{ float: "right"}}
                />
                {" "}
        </div>
      
        {showModal && (
          <Modal>
            <DeleteModal
              item={post}
              postId={del}
              handleDeletePost={deletePost}
              state={state}
              closeModal={closeModal}
            />
          </Modal>
        )}

        <hr/>
        <div className="comment-footer">
        
        <div className="footer">
        <div className="comment-section"> 
            <div className="comment-list">
                {comments.map((comment)=>{
                    return(
                    <div className="comment-info">
                    <Link to={comment.postedBy?._id === state?._id ? `/profile` : `/profile/${comment.postedBy?._id}`}>   
                         <img src={comment.postedBy?.pic} className="comment-img" alt={comment.name} />{" "}
                    </Link>
                    <p>  
                        <Link to={comment.postedBy?._id === state?._id ? `/profile` : `/profile/${comment.postedBy?._id}`}>
                            <span className="comment-name">
                                {comment.postedBy?.username}{" "}
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
            <InboxIcon onClick={() => {setShowMessageModal(true);}}/>
            {
              isSave ?
              <FilledBookmarkIcon style={{float: "right"}} onClick={()=>{UnsavePost(post?._id);setIsSave(false)}}/>
              : <BookmarkIcon style={{float: "right"}} onClick={()=>{savePost(post?._id);setIsSave(true)}}/>
            }
        
            {
               showMessageModal && 
        
              <Message closeMessageModal={closeMessageModal}/>
          
            }
            {/* <div className="allowance" style={{height: "150px"}}>
                <p>.</p>
             </div> */}
            </div>
        </div>
        </div>
        </div>
      

      </Wrapper>
    )
}

export default GoToPost
