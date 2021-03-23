import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Loader from "../assets/Loader";
import Button from "../assets/Button";
import { UserContext } from "../../App";
import verified from '../assets/correct.svg'
import SuggestionList from '../SuggestionList.js/SuggestionList'

const Wrapper = styled.div`
  background: #fff;
  border: 1px solid #dbdbdb;
  width: 600px;
  padding: 1rem;
  justify-self: center;
  font-size: 0.9rem;
  h3 {
    font-size: 0.9rem;
  }
  .verified{
  height: 14px;
  width: 30px;
  margin-bottom: -3px;
}
  .pointer {
   
     width: 40px !important;
    object-fit: cover !important;
    height: 40px !important;
    border-radius: 20px !important;
    margin-right: 1rem !important;
  }
  .username{
    font-size: 0.9rem;
    font-weight: 900;
    margin: 0;
  }
  .secondary{
    margin-top:0;
  }
  .suggestion {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  button {
    font-size: 0.9rem;
    position: relative;
    top: -5px;
  }

  @media screen and (max-width: 660px) {
    width: 500px;
  }

  @media screen and (max-width: 530px) {
    width: 450px;
  }

  @media screen and (max-width: 480px) {
    width: 380px;
  }

  @media screen and (max-width: 400px) {
    width: 340px;

    button {
      font-size: 0.8rem;
    }
  }

`;

const Suggestions = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [showFollow, setShowfollow] = useState(true);
  const [load,setLoad] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/allusers`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((user) => user.json())
      .then((result) => {
        setLoading(false);
        setUsers(result);
        console.log(state);
      });
  }, [state]);

  const followUser = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setLoad(false)
        setShowfollow(false);
      });
  };

  const unfollowUser = (id) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/unfollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: id,
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
        setLoad(false);
        setShowfollow(true);
      });
  };

   if (loading) {
     return <Loader />;
   }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h4>Explore</h4>
      <h3 style={{ marginBottom: "0.7rem", fontSize: "1.3rem" }}>
        Suggestions for you
      </h3>
      <Wrapper>
        {users.map((user) => (
          // <div key={user._id} className="suggestion">
          //   <div className="user-info">
          //     <img
          //       className="pointer"
          //       onClick={() => {
          //         history.push(`/profile/${user._id}`);
          //       }}
          //       src={user.pic}
          //       alt="avatar"
          //     />

          //     <div className="user-meta">
          //       <h4
          //         className="username"
          //         onClick={() => history.push(`/profile/${user._id}`)}
          //       >
          //         {user.username}
          //        {user.followers.length >= 10 ? 
          //           <span><img src={verified} className="verified" alt="verified"/></span> 
          //           : null}
          //       </h4>
                 
          //       <span className="secondary">{user.name}</span>
          //     </div>
          //   </div>
          //   {!state.following.some((i) => i._id === user._id) ? (
          //     !load ? 
          //     <Button onClick={() => {followUser(user._id);setLoad(true);}}>Follow</Button>
          //     : (
          //       <Button>
          //         <i className="fa fa-spinner fa-spin"></i>
          //       </Button>
          //     )
          //   ) : ( !load ? 
          //     <Button onClick={() => {unfollowUser(user._id); setLoad(true);}}>Unfollow</Button>
          //     :  (
          //       <Button>
          //         <i className="fa fa-spinner fa-spin"></i>
          //       </Button>
          //     )
          //   )}
         
          // </div>
          <SuggestionList user={user}/>
        ))}
      </Wrapper>
    </div>
  );
};

export default Suggestions;
