import React, { useContext, useState, useEffect } from "react";
import { Skeleton } from "@material-ui/lab";
import styled from "styled-components";
import { UserContext } from "../../App";
import { OptionsIcon } from "../assets/Icons";
import Modal from "../Modal/Modal";
import LogoutModal from "../ProfileHeader.js/LogoutModal";
import { useHistory } from "react-router-dom";
import SideSuggestionsList from "./SideSuggestionsList";

const Wrapper = styled.div`
  .containers {
    display: flex;
    max-width: 320px;

    flex-direction: column;
    height: 100vh;
    position: fixed;
    margin-left: 50px;
    margin-top: 20px;
  }
  .profile-container {
    display: flex;
    flex-direction: row;
  }
  .profile-container-list {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
  }

  .profile {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-right: 12px;
    cursor: pointer;
  }
  .profile2 {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 19px;
    cursor: pointer;
  }
  h6 {
    font-size: 14px;
    text-align: left;
  }
  .list {
    margin-right: 19px;
    cursor: pointer;
  }
  .suggestion {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    margin: 20px 0 10px 0;
  }
  .seeall{
    margin: auto 0 auto auto;
    cursor: pointer;
  }
  .btns {
    min-width: 90px; 
    margin: auto 0 auto auto;
    cursor: pointer;
    font-size: 12px;
   
  }
   .following{
      border: 1px solid #dbdbdb !important;
      background: transparent !important;
      color: black;
    }
  .name {
    font-size: 14px;
    font-weight: 800;
  }
  .username {
    font-size: 14px;
    margin-top: 0;
  }
`;
let list = [];
for (var i = 0; i < 5; i++) {
  list.push(
    <div style={{ display: "flex" }}>
      <Skeleton
        style={{ marginBottom: "10px" }}
        animation="wave"
        variant="circle"
        width={40}
        height={40}
      />
      <Skeleton
        style={{
          alignSelf: "center",
          marginBottom: "10px",
          marginLeft: "10px",
        }}
        animation="wave"
        height={30}
        width="80%"
      />
    </div>
  );
}

function SideSuggestions() {
  const { state, dispatch } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const closeModal = () => {
    setShowModal(false);
  };

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


  const handleLogout = ()=>{
    localStorage.clear()
    dispatch({type:"CLEAR"})
    history.push('/signin')
  }

  return (
    <Wrapper>
      <div className="containers">
        <div className="profile-container">
          <img className="profile" src={state && state.pic} alt="profile" onClick={() => { history.push(`/profile`);}}/>

          <div className="list" onClick={() => { history.push(`/profile`);}}>
            <div className="name">
              <b>{state && state.name}</b>
            </div>
            <div className="username" style={{ color: "#8e8e8e" }}>
              {state && state.username}
            </div>
          </div>
          <span className="seeall"><OptionsIcon  onClick={()=>{
                  setShowModal(true);
                }}/></span>
        </div>
                 {showModal && (
                    <Modal>
                      <LogoutModal
                        handleLogout={handleLogout}
                        closeModal={closeModal}
                      />
                    </Modal>
                  )}
        <div className="suggestion">
          <div style={{ color: "#8e8e8e", fontWeight: 900 }}>
            Suggestions For You
          </div>
          <h6 className="seeall">
            <b onClick={() => {history.push('/suggestions')}}>See all</b>
          </h6>
        </div>

        <div>
          {loading ? (
            <>{list}</>
          ) : (
            users.slice(0, 5).map((user) => (
                <SideSuggestionsList user={user}/>
            ))
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default SideSuggestions;
