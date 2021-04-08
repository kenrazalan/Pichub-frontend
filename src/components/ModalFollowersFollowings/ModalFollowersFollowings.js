import React from 'react'
import { CloseIcon } from "../assets/Icons";
import styled from "styled-components";
import FollowersFollowingList from './FollowersFollowingList';

const ModalContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  padding-right: 2rem;
  font-size: 0.9rem;
  width: 350px;
  //min-height: 450px;
  img {
    width: 40px !important;
    object-fit: cover !important;
    height: 40px !important;
    border-radius: 20px !important;
    margin-right: 1rem !important;
  }
  .following{
     border: 1px solid #dbdbdb !important;
      background: transparent !important;
      color: black;
      :focus{
      background-color: unset;
    }
  }
  .profile-info {
    display: flex !important;
  }
  span {
    color: #b2b2b2 !important;
  }
  button {
    font-size: 0.9rem !important;
    position: relative !important;
    top: -10px !important;
  }
  .btns{
    margin-right: 42px;
    background: transparent;
    padding : 0;
    min-width: unset;
    width: fit-content ;
    color: black;
    border: none;
    //margin-left: 6px;
    color: #0095f6;
    :focus{
      background-color: unset !important;
    }
  }
  @media screen and (max-width: 480px) {
    width: 340px !important;
  }
`;

function ModalFollowersFollowings({
    loggedInUser,
    users,
    closeModal,
    title,
    load,
    setLoad,
    followUser,
    unfollowUser,
  }) {
        return (
            <div style={{ }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #DBDBDB",
                  padding: "1rem",
                }}
              >
                <div>{title}</div>
                <CloseIcon onClick={closeModal} />
              </div> 
               <div style={{ overflowY:"auto",maxHeight: "400px" }}>
              {users.map((user) => (
                <ModalContentWrapper key={user._id}>
                  <FollowersFollowingList user={user}
                                          loggedInUser={loggedInUser}
                                          closeModal={closeModal}
                                          unfollowUser={unfollowUser}
                                          followUser={followUser}
                                          load={load}
                                          setLoad={setLoad} />
                </ModalContentWrapper>
            
              ))}    </div>
            </div>
    )
}

export default ModalFollowersFollowings
