import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./../../App";
import styled from "styled-components";
import SideSuggestions from "../SideSuggestions/SideSuggestions";
import Post from "../Post/Post";
import {PostContext} from '../../context/PostContext'
import { Link } from "react-router-dom";

const Wrapper = styled.div`
.verified{
  height: 14px;
  width: 27px;
  margin-bottom: 3px;

}
.rect{
  width: 600px
}
  .home-card {
    //margin-right: 10px;
    border: 1px solid #dbdbdb !important;
    box-shadow: none !important;
    min-width: 600px;
    max-width: 600px;
   height: max-content;
  }
  .home-input{
      // border-radius: 4px !important;
      border: 1px solid #DBDBDB !important;
      //padding-left: 0.1rem 0.5rem !important;
      text-align: left;
      //padding-left: 30px !important;
      width: 100% !important;
      margin: auto !important;
      //height: 2rem !important;
      outline: none;
      overflow: hidden !important;
      
  }
  .home-input::placeholder{
    padding: 20px !important;
  }
  input{
    width:85%;
    padding:20px;
    height: 2rem;
    outline: none;
    border: none;
  }

  hr{
    border: none;
    border-bottom:1px solid #DBDBDB;
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
  .card-image{
    min-height: 200px;
  }
  .postedby-img{
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-bottom: -10px;
    border: 1px solid #d6249f;

  }
  .border{
    position: relative;
  }
  @media (max-width: 646px){
    .rect{
      width: 330px ;
    }
    .home-card{
      width: 100vw;
      margin-left: calc(-53vw + 50%);
      max-width: unset;
      min-width: 300px;
    }
    .myday-container{
      width: 100vw;
      margin-left: calc(-53vw + 50%);
      margin-bottom: 0px !important;
     margin-top: 0px !important;
    }

  }
  .myday-container{
    width: 100%;
    height: 118px;
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid #dbdbdb;
    margin-bottom: 20px;
    margin-top: 20px;
    background: white !important;
  }
  .user-container{
        width: 100%;
    display: flex;
    position: absolute;
    overflow-y: hidden; ::-webkit-scrollbar{
      display: none
    }
  }
  .img-username{
    height: 84px;
    margin: 0 12px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .myday-img{
    border: 3px solid #d6249f;
    width: 64px;
    height: 64px;
    background: green;
    border-radius:50%;
    margin:0;
    object-fit: cover;
  }
  p{
    font-size: 12px;
  }
 
  
`;
const MWrapper = styled.div`
@media (max-width:1000px)  {
    .sideSuggestions{
     display: none;
    }
  }
`



const Followingpost = () => {
  const { state, dispatch } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const { stateFeed, dispatchFeed } = useContext(PostContext);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/followingpost`, {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("jwt"),
  //     },
  //   }).then((res) => res.json())
  //     .then((result) => {
      
  //       console.log(result.posts) 
  //       dispatchFeed({type:"FEED", payload:result.posts})
  //       //setFeed(result.posts)       
  //       setLoading(false)
  //     });
  // }, []);

  
    // if (loading) {
    //   return <Loader />;
    // }


  return (
     
       <div style={{display: "flex",position:"relative"}}>
      <Wrapper>
        <div className="myday-container">
        <div className="user-container">
        {/* <div style={{height:"84px",margin:"0 12px",display:"flex",alignItems:"center",flexDirection:"column"}} >
           <img alt="myday" src={state?.pic} style={{border: "3px solid #d6249f",width: "64px",height:"64px", background: "green" ,borderRadius:"50%",margin:"0"}}/>
           <p>{state?.username}</p>
        </div> */}

           {state?.following.map(user =>{
             return(
            <Link to={`/profile/${user?._id}`}>
           <div className="img-username pointer" >
           <img alt="myday" src={user.pic} className="myday-img"/>
          
           <p>{user.username}</p>
           </div>  
            </Link>
            )
           })}

      </div> 
        </div>
        <div className="home">
          
        {
        // loading ? 
        //  <> 
        //  <div style={{display: "flex"}}>
         
        //     <Skeleton style={{marginBottom: "10px"}} animation="wave" variant="circle" width={40} height={40} />
        //     <Skeleton style={{alignSelf: "center",marginBottom: "10px",
        //                      marginLeft: "10px"}} animation="wave" height={30} width="40%" />
        //  </div>
        //  <Skeleton className="rect" animation="wave" variant="rect"  height={500} /> 
        //  </>  

        //   :
          stateFeed.map((post) => {
            return (
              <Post item={post}/>
            )
          })
          }
        </div>
      </Wrapper>
      <MWrapper>
          <div className="sideSuggestions">
                  <SideSuggestions />
          </div>
     </MWrapper>   
     </div>
  );
};

export default Followingpost;
