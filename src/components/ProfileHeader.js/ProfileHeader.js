import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import Button from "../assets/Button";
import Loader from "./../assets/Loader";
import { OptionsIcon, PostIcon, SavedIcon, CloseIcon, CommentIcon, HeartIcon } from "../assets/Icons";
import { UserContext } from "../../App";
import Modal from "../Modal/Modal";
import LogoutModal from './LogoutModal'
import verified from '../assets/correct.svg'
import ModalFollowersFollowings from '../ModalFollowersFollowings/ModalFollowersFollowings'
import { Skeleton } from "@material-ui/lab";

const WrapperPost = styled.div`
   display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  //row-gap: 0;
  margin-top: 5rem;
  img {
    border-radius: 4px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
    width: 300px;
    height: 300px;
    object-fit: cover;
    padding: 0;
  }
  .grid-container {
    position: relative;
  }
  .grid-container:hover .overlay {
    display: block;
    cursor: pointer;
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
    color: #fff;
    font-weight: 500;
    font-size: 1.1rem;
  }

  svg {
    fill: #fff;
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
    img,
    .overlay {
      width: 98%;
      height: 233px;
    }
  }
  @media screen and (max-width: 800px) {
    grid-gap: 0rem;
    img,
    .overlay {
      width: 98%;
      height: 200px;
    }
  }

  @media screen and (max-width: 700px) {
    grid-gap: 0rem;
    font-size: 0.5rem;
    img,
    .overlay {
      height: 180px;
      width: 98%;
    }
    .overlay-content{
        display: none;
    }
  }
  @media screen and (max-width: 500px) {
    grid-gap: 0rem;

    img,
    .overlay {
      height: 150px;
      width: 98%;
    }

  }
  @media screen and (max-width: 400px) {
    grid-gap: 0rem;
    row-gap: 5 !important;
    img,
    .overlay {
      height: 120px;
      width: 98%;
    }
  }
`;

const Wrappers = styled.div`
.verified{
  height: 17px;
  width: 17px;
  margin-bottom: -3px;
  margin-left:-12px;

}
.edit-button{
      border: 1px solid #dbdbdb !important;
      background: transparent !important;
      color: black;
      font-weight: bold;

    }
.username{
  font-weight: 300;
  font-size: 1.5 rem;
}
.numberOf{
  font-weight: 900;
  padding-right: 0 !important;
}
.texts{
  font-weight: 400;
  padding-left: 2px;
}
.profile-hr2{
  display: none;
}
.mobile-bio{
  margin-bottom: 8px;
  padding-top:0
}
@media screen and (max-width: 645px) {
    .texts {
      padding-right: 0 !important;
    }
    .profile-hr{
      display: none;
  }
  .profile-hr2{
      display: block;
  }
    .profile-tab{
      margin: -6px 0 12px 0 !important;
      padding-bottom: 0;
    }
  }
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

    border: none; 
    border-bottom: 1px solid #dbdbdb;
  }
  .pointers {
    font-size: 1.5rem;
  }
`;

const MobileWrapper = styled.div`
  margin: 1rem 0;
  font-size: 1rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column-reverse;

  hr{
  margin-left: -24px;
  margin-right: -10px;
  //padding-left: 300vw;
  //margin-right: -300vw;
  //adding-right: 300vw;
  //padding-top: 15px;
  //padding-bottom: 15px;
  }
  .mobile-info-container{
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
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
    color: #0095f6;
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
    border-radius: 50%;
    margin-right: 2rem;
    border: 3px solid #d6249f;
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
    color: #0095f6;
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
    .pointers {
      font-size: 1.5rem;
      font-weight: 100 !important;
    }
    .edit-button{
      margin-top:0;
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




const ProfileHeader = () => {
  const [mypics, setMypic] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [showFollowersModal, setFollowersModal] = useState(false);
  const [showFollowingModal, setFollowingModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [load,setLoad] = useState(false)
  const [showModal, setShowModal] = useState(false);


  const closeModal = () => {
    setFollowersModal(false);
    setFollowingModal(false);
    setShowModal(false);
  };

 
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/myposts`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLoading(false)
        setMypic(result.myposts);
      });
  }, [state]);

  const handleLogout = ()=>{
    localStorage.clear()
    dispatch({type:"CLEAR"})
    history.push('/signin')
  }
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
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setLoad(false);
        // setProfile((prevState) => {
        //   return {
        //     ...prevState,
        //     user: {
        //       ...prevState.user,
        //       followers: [...prevState.user.followers, data],
        //     },
        //   };
        // });
        setLoading(true);
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
        // setProfile((prevState) => {
        //   const newFollower = prevState.user.followers.filter(
        //     (item) => item._id !== data._id
        //   );
        //   return {
        //     ...prevState,
        //     user: {
        //       ...prevState.user,
        //       followers: newFollower,
        //     },
        //   };
        // });
        setLoading(true);
      });
  };
  

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <>
      {mypics ? (
        <Wrappers>
          <Wrapper>
            <img
              className="avatar"
              src={state ? state.pic : "loading"}
              alt="avatar"
            />
            <div className="profile-info">
              <div className="profile-meta">
                <div className="pointers">
                  <span className="username">{state ? state.username : "loading"}</span>
                  {state && state.followers.length >= 10 ? 
                    <span><img src={verified} className="verified" alt="verified"/></span> 
                    : null}
                </div>
                <div className="options">
                  <Button
                    secondary
                    className="edit-button"
                    onClick={() => history.push("/accounts/edit")}
                  >
                    Edit Profile
                  </Button>

                  <OptionsIcon 
                  className="material-icons"
                   onClick={()=>{
                  setShowModal(true);
                }}/>
                    
                </div>
              </div>
              {showModal && (
                    <Modal>
                      <LogoutModal
                        handleLogout={handleLogout}
                        closeModal={closeModal}
                      />
                    </Modal>
                  )}

              <div className="profile-stats">
                <span><span className="numberOf">{mypics.length}<span className="texts"> posts</span> </span></span>

                <span
                  className="pointer"
                  onClick={() => setFollowersModal(true)}
                >
                  <span className="numberOf">{state ? state.followers.length : "0"}<span className="texts"> followers</span> </span>
                </span>

                <span
                  className="pointer"
                  onClick={() => setFollowingModal(true)}
                >
                <span className="numberOf">{state ? state.following.length : "0"}<span className="texts"> following</span> </span>
                </span>
              </div>
              {showFollowersModal && state.followers.length > 0 && (
                <Modal>
                  <ModalFollowersFollowings
                    //  setShFollow={setShowfollow}
                    //   shFollow={showFollow}
                    // follow={followUser}
                    // unfollow={unfollowUser}
                    followUser={followUser}
                    unfollowUser={unfollowUser}
                    load={load}
                    setLoad={setLoad}
                    users={state.followers}
                    title="Followers"
                    closeModal={closeModal}
                    loggedInUser={state}
                  />
                </Modal>
              )}
              {showFollowingModal && state.following.length > 0 && (
                <Modal>
                  <ModalFollowersFollowings
                    //  setShFollow={setShowfollow}
                    //   shFollow={showFollow}
                    // follow={followUser}
                    // unfollow={unfollowUser}
                    followUser={followUser}
                    unfollowUser={unfollowUser}
                    load={load}
                    setLoad={setLoad}
                    users={state.following}
                    title="Followers"
                    closeModal={closeModal}
                    loggedInUser={state}
                  />
                </Modal>
              )}
              <div className="bio">
                <span className="bold">{state ? state.name : "loading"}</span>
               
              </div>
            </div>
          </Wrapper>
          <MobileWrapper>
            <div className="mobile-profile-stats">
              <hr/>
              <div className="mobile-info-container">
              <span><span className="numberOf">{state ? mypics.length : "0"}<span className="texts"> posts</span> </span></span>

              <span className="pointer" onClick={() => setFollowersModal(true)}>
              <span className="numberOf">{state ? state.followers.length : "0"} <span className="texts"> followers</span></span>
              </span>

              <span className="pointer" onClick={() => setFollowingModal(true)}>
              <span className="numberOf">{state ? state.following.length : "0"} <span className="texts"> following</span></span>
              </span>
              </div>
              <hr/>
            </div>
            {showFollowersModal && state.followers.length > 0 && (
              <Modal>
                <ModalFollowersFollowings
                  //  setShFollow={setShowfollow}
                  //   shFollow={showFollow}
                  // follow={followUser}
                  // unfollow={unfollowUser}
                  followUser={followUser}
                  unfollowUser={unfollowUser}
                  load={load}
                  setLoad={setLoad}
                  users={state.followers}
                  title="Followers"
                  closeModal={closeModal}
                  loggedInUser={state}
                />
              </Modal>
            )}
            {showFollowingModal && state.following.length > 0 && (
              <Modal>
                <ModalFollowersFollowings
                  //  setShFollow={setShowfollow}
                  //   shFollow={showFollow}
                  // follow={followUser}
                  // unfollow={unfollowUser}
                  followUser={followUser}
                  unfollowUser={unfollowUser}
                  load={load}
                  setLoad={setLoad}
                  users={state.following}
                  title="Following"
                  closeModal={closeModal}
                  loggedInUser={state}
                />
              </Modal>
            )}
            <div className="mobile-bio">
              <span className="bold">{state ? state.name : "loading"}</span>
            </div>
          </MobileWrapper>
          <hr className="profile-hr"/>

          <div className="profile-tab">
            <div>
              <PostIcon />
              <span>Posts</span>
            </div>
            <div>
              <SavedIcon />
              <span>Saved</span>
            </div>
          </div>
          <hr className="profile-hr2"/>

          <WrapperPost>
            {!loading ?
            mypics?.map((item) => (
              <div key={item._id} className="grid-container" onClick={() => history.push(`/post/${item._id}`)}>
                <img src={item.photo} alt="post" />
                <div className="overlay">
                <div className="overlay-content">
                    <span>
                      <HeartIcon /> {item.likes.length}
                    </span>
                    <span>
                      <CommentIcon/>  {item.comments.length}
                    </span>
                  </div>
                </div>
              </div>
            )) :
            <>
            <Skeleton className="rect" animation="wave" variant="rect"  height={200} />
            <Skeleton className="rect" animation="wave" variant="rect"  height={200} />
            </>
            }
          </WrapperPost>
        </Wrappers>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProfileHeader;
