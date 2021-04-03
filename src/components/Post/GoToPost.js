import React,{useEffect,useState,useContext} from 'react'
import { CommentIcon, FilledHeartIcon, HeartIcon, SavedIcon } from '../assets/Icons';
import { useParams, useHistory, Link } from "react-router-dom";
import styled from 'styled-components'
import { UserContext } from "../../App";
import moment from 'moment';
import Loader from '../assets/Loader';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 1fr;
  @media screen and (max-width: 840px) {
    display: flex;
    flex-direction: column;
    .post-details{
        margin-bottom: 100px;
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
.comment-list{
       
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

      const handleText=(e)=>{
        setText(e.target.value)
  }
    if(load){
        return <Loader/>
    }

    return (
        <Wrapper>
        {/* <div className="card home-card" key={post?._id}>

        <div className="card-image">
          <img src={post && post.photo} alt={post?.name} />
        </div>
        <div className="card">
            
        <div className="card-image">
          
        </div>

        </div>
       
      </div> */}
        <img className="imahe" src={post && post.photo} alt={post?.name} />
        <div className="post-details">
        
        <Link>
          <div className="header-info">
            <img src={post.postedBy?.pic} className="postedby-img" alt={post.name} />{" "}
        
            <div className="postedby-name">
                 {post.postedBy?.name}<span>  •</span>
            </div>
        </div>
        </Link>
        <hr/>
            <div className="numLikes-container2">
                <div className="numLikes">  {post.likes?.length} {post.likes?.length > 1 ? "likes" : "like"} </div>
                <div className="createdAt"> {moment(post?.createdAt).fromNow()} </div>
            </div>
        <div className="comment-footer">
            
        <div className="footer">
        <div className="comment-section"> 
            <div className="comment-list">
                {post?.comments.map((comment)=>{
                    return(
                             <div className="comment-info">
                    <img src={comment.postedBy?.pic} className="comment-img" alt={comment.name} />{" "}
                    <p>
                        <span className="comment-name">
                            {comment.postedBy?.name}{" "}
                        </span>
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
                <div className="numLikes">  {post.likes?.length} {post.likes?.length > 1 ? "likes" : "like"} </div>
                <div className="createdAt"> {moment(post?.createdAt).fromNow()} </div>
            </div>
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
            <div className="reacts">
            <HeartIcon/>
            <CommentIcon/>

            </div>
        </div>
        </div>
        </div>
      </Wrapper>
    )
}

export default GoToPost
