import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Loader from "../assets/Loader";

const Wrapper = styled.div`
  background: #FFF;
  border: 1px solid #DBDBDB;
  width: 600px;
  padding: 1rem;
  justify-self: center;
  font-size: 0.9rem ;
  img {
    width: 40px !important;
    object-fit: cover !important;
    height: 40px !important;
    border-radius: 20px !important;
    margin-right: 1rem !important;
  }
  .pointer{
    font-size: 0.9rem ;
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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/allusers`,{
        headers:{
            "Authorization":"Bearer "+ localStorage.getItem("jwt")
        }
    }).then(user=>user.json())
    .then(result=>{
        setLoading(false)
        setUsers(result)
    })
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3 style={{ marginBottom: "0.7rem" }}>Suggestions for you</h3>
      <Wrapper>
        {users.map((user) => (
          <div key={user._id} className="suggestion">
            <div className="user-info">
          
            <img
              className="pointer"
              onClick={() => {
              history.push(`/profile/${user._id}`);
              }}
               src={user.pic}
               alt="avatar"/>

              <div className="user-meta">
                <h4
                  className="pointer"
                  onClick={() => history.push(`/profile/${user._id}`)}
                >
                  {user.username}
                </h4>
                <span className="secondary">{user.name}</span>
              </div>
            </div>
            {/* <Follow isFollowing={user.isFollowing} userId={user._id} /> */}
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default Suggestions;
