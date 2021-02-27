import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory,Link } from "react-router-dom";
import Button from "../assets/Button";
import Loader from './../assets/Loader'
import { OptionsIcon ,PostIcon,SavedIcon,CloseIcon} from "../assets/Icons";
import {UserContext} from '../../App'
import Modal from '../Modal/Modal'

const WrapperPost = styled.div`
margin-top: 1rem;
cursor: pointer;
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-gap: 1.5rem;
img {
    border-radius: 4px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
    width: 300px;
    height: 300px;
    object-fit: cover;
}
.container-overlay {
    position: relative;
}
.container-overlay:hover .overlay {
    display: block;
}
.overlay {
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    width: 300px;
    height: 300px;
    z-index: 4;
    display: none;
}
.overlay-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #FFF;
    font-weight: 500;
    font-size: 1.1rem;
}
svg {
    fill: #FFF;
    position: relative;
    top: 4px;
}
span {
    display: flex;
    display: block;
    align-items: center;
    padding-right: 0.5rem;
}
span:first-child {
    margin-right: 1rem;
}
@media screen and (max-width: 1000px) {
    img, .overlay {
    width: 233px;
    height: 233px;
}
}
@media screen and (max-width: 800px) {
    img, .overlay {
    width: 200px;
    height: 200px;
}
}
@media screen and (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
    img, .overlay {
        height: 240px;
        width: 100%;
}
}
@media screen and (max-width: 500px) {
    grid-gap: 1rem;
    img, .overlay {
        height: 200px;
        width: 100%;
}
}
@media screen and (max-width: 400px) {
    img, .overlay {
        height: 170px;
        width: 100%;
}
}
`;

const Wrappers = styled.div`
  .profile-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.4rem 0;
  }
  .profile-tab div {
    display: flex;
    cursor: pointer;
    margin-right: 3rem;
  }
  .profile-tab span {
    padding-left: 0.3rem;
  }
  .profile-tab svg {
    height: 24px;
    width: 24px;
  }
  hr {
    border: 0.5px solid #DBDBDB;
  }
`;




const MobileWrapper = styled.div`
  margin: 1rem 0;
  font-size: 1rem;
  padding-left: 1rem;
  .mobile-profile-stats span {
    padding-right: 1rem;
  }
  .mobile-bio,
  .mobile-profile-stats {
    display: none;
  }
  @media screen and (max-width: 645px) {
    .mobile-bio {
      display: block;
    }
    .mobile-profile-stats {
      display: block;
      margin-bottom: 0.4rem;
    }
  }
  a {
    color: #0095F6;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 2rem;
 
  .avatar {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 90px;
    margin-right: 2rem;
  }
  .profile-meta {
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;
  }
  .profile-meta h2 {
    position: relative;
    top: 3px;
  }
  .profile-stats {
    display: flex;
    margin-bottom: 1rem;
  }
  .material-icons {
    position: relative;
    top: 7px;
    margin-left: 1rem;
  }
  span {
    padding-right: 1rem;
  }
  a {
    color: #0095F6;
  }
  @media screen and (max-width: 645px) {
    font-size: 1rem;
    .bio,
    .profile-stats {
      display: none;
    }
    .avatar {
      width: 140px;
      height: 140px;
    }
    .profile-meta {
      flex-direction: column;
    }
    button {
      margin-left: 0;
    }

  
  @media screen and (max-width: 420px) {
    font-size: 0.9rem;
    .avatar {
      width: 100px;
      height: 100px;
    }
  }
  }
`;

const modalHeaderStyle = {
  display: "flex" ,
  alignItems: "center" ,
  justifyContent: "space-between",
  borderBottom: "1px solid #DBDBDB",
  padding: "1rem",
};

const ModalContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem ;
  padding-right: 2rem ;
  font-size: 0.9rem ;
  width: 350px ;
  img {
    width: 40px !important;
    object-fit: cover !important;
    height: 40px !important;
    border-radius: 20px !important;
    margin-right: 1rem !important;
  }
  .profile-info {
    display: flex !important;
  }
  span {
    color: #B2B2B2 !important;
  }
  button {
    font-size: 0.9rem !important;
    position: relative !important;
    top: -10px !important;
  }
  @media screen and (max-width: 480px) {
    width: 340px !important;
  }
`;

const ModalContent = ({ loggedInUser, users, closeModal, title,follow,unfollow }) => {
  const history = useHistory();
//   const[shFollow,setShFollow] = useState(true)
  // useEffect(()=>{
//     setShFollow(loggedInUser && !loggedInUser.following.includes(users._id))
 //},[users])
  console.log(loggedInUser)
  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <div style={{display: "flex", alignItems: "center" ,
  justifyContent: "space-between",
  borderBottom: "1px solid #DBDBDB",
  padding: "1rem"}}>
        <div>{title}</div>
        <CloseIcon onClick={closeModal} />
      </div>
      {users.map((user) => (

        <ModalContentWrapper key={user._id}>
          <div className="profile-info">
            <img
              className="pointer"
              onClick={() => {
                closeModal();
                history.push(`/${user.username}`);
              }}
              // src={loggedInUser._id==user._id?loggedInUser.pic:user.pic}
              src={user.pic}
              alt="avatar"
            />
            <div className="user-info">
              <div
                className="pointer"
                onClick={() => {
                  closeModal();

                }}
              >
                <Link to={loggedInUser._id===user._id?`/profileheader`:`/profile/${user._id}`}>{user.username}</Link>
              </div>
              <span>{user.name}</span>
            </div>
          </div>
          {/* {loggedInUser._id!==user._id?
          <div className="options">
              {shFollow?
                <Button onClick={()=>follow(user._id)}>Follow</Button>
                :
                <Button onClick={()=>unfollow(user._id)}>Unfollow</Button>
                }
              </div>: <div>You</div>} */}
        </ModalContentWrapper>
      ))}
    </div>
  );
};




const ProfileHeader = () => {

  const [mypics,setMypic] =useState([])
  const {state,dispatch}= useContext(UserContext)
  const history = useHistory()
  const [showFollowersModal, setFollowersModal] = useState(false);
  const [showFollowingModal, setFollowingModal] = useState(false);

  const closeModal = () => {
    setFollowersModal(false);
    setFollowingModal(false);
  };

console.log(state)
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BACKEND_URL}/myposts`,{
        headers:{
            "Authorization": "Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then((result)=>{
        console.log(result)
        setMypic(result.myposts) 
    })
},[])

  return (
    <>
    {mypics ?
    <Wrappers>
      <Wrapper>
        <img className="avatar" src={state?state.pic:"loading"} alt="avatar" />
        <div className="profile-info">
          <div className="profile-meta">
            <h5 className="pointer">@<span>{state?state.username:"loading"}</span></h5>
              <div className="options">
                <Button
                  secondary
                  onClick={() => history.push("/accounts/edit")}
                >
                  Edit Profile
                </Button>
                <i className="material-icons" 
                  onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/signin')}}>power_settings_new</i>
                {/* <OptionsIcon  onClick={()=>{
                   localStorage.clear()
                   dispatch({type:"CLEAR"})
                   history.push('/signin')}}/> */}
              </div>
          </div>

          <div className="profile-stats">
            <span>{mypics.length} posts</span>

            <span className="pointer" onClick={() => setFollowersModal(true)}>
              {state?state.followers.length: '0'} followers
            </span>

            <span className="pointer" onClick={() => setFollowingModal(true)}>
              {state?state.following.length :"0"} following
            </span>

          </div>
          {showFollowersModal && state.followers.length > 0 && (
              <Modal>
                <ModalContent
                //  setShFollow={setShowfollow}
                //   shFollow={showFollow}
                  // follow={followUser}
                  // unfollow={unfollowUser}
                  users={state.followers}
                  title="Followers"
                  closeModal={closeModal}
                  loggedInUser={state}
                />
              </Modal>
            )}
              {showFollowingModal && state.following.length > 0 && (
              <Modal>
                <ModalContent
                //  setShFollow={setShowfollow}
                //   shFollow={showFollow}
                  // follow={followUser}
                  // unfollow={unfollowUser}
                  users={state.following}
                  title="Followers"
                  closeModal={closeModal}
                  loggedInUser={state}
                />
              </Modal>
            )}
          <div className="bio">
            <span className="bold">{state?state.name:"loading"}</span>

          </div>

        </div>
      </Wrapper>
      <MobileWrapper>
        <div className="mobile-profile-stats" >
          <span>{state?mypics.length:"0"} posts</span>

          <span className="pointer" onClick={() => setFollowersModal(true)}>
            {state?state.followers.length: '0'} followers
          </span>

          <span className="pointer" onClick={() => setFollowingModal(true)}>
            {state?state.following.length: '0'} following
          </span>


        </div>
        {showFollowersModal && state.followers.length > 0 && (
              <Modal>
                <ModalContent
                //  setShFollow={setShowfollow}
                //   shFollow={showFollow}
                  // follow={followUser}
                  // unfollow={unfollowUser}
                  users={state.followers}
                  title="Followers"
                  closeModal={closeModal}
                  loggedInUser={state}
                />
              </Modal>
            )}
              {showFollowingModal && state.following.length > 0 && (
              <Modal>
                <ModalContent
                //  setShFollow={setShowfollow}
                //   shFollow={showFollow}
                  // follow={followUser}
                  // unfollow={unfollowUser}
                  users={state.following}
                  title="Followers"
                  closeModal={closeModal}
                  loggedInUser={state}
                />
              </Modal>
            )}
        <div className="mobile-bio">
          <span className="bold">{state?state.name:"loading"}</span>
        </div>
      </MobileWrapper>
      <hr />

      <div className="profile-tab">
        <div

        >
          <PostIcon />
          <span>Posts</span>
        </div>
        <div
        >
          <SavedIcon />
          <span>Saved</span>
        </div>
      </div>

    <WrapperPost>
      {mypics?.map((item) => (
        <div
          key={item._id}
          className="container-overlay"
        >
          <img src={item.photo} alt="post" />
        </div>
      ))}
    </WrapperPost>


      </Wrappers>
     : <Loader/>}
    </>
  );
};

export default ProfileHeader;