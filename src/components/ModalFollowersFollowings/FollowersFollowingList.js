import React,{useState,useEffect,useContext} from 'react'
import { UserContext } from "../../App";
import Button from "../assets/Button";
import { useHistory,Link } from 'react-router-dom';

function FollowersFollowingList({user,loggedInUser,closeModal}) {
    const [load,setLoad] = useState(false);
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext);

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
          });
      };
      
    
    return (
        <>
                   <div className="profile-info" >
                    <img
                      className="pointer"
                      onClick={() => {
                        closeModal();
                        history.push(loggedInUser._id === user._id ? `/profileheader` : `/profile/${user._id}`);
                      }}
                      src={user.pic}
                      alt="avatar"
                    />
                    <div className="user-info">
                      <Link to={loggedInUser._id === user._id ? `/profileheader` : `/profile/${user._id}`}>
                      <div className="pointer" onClick={() => { closeModal(); }} >
                          {user.username}
                      </div>
                      <span>{user.name}</span>
                        </Link>
                    </div>
                  </div>
                  {!loggedInUser.following.some((i) => i._id === user._id) ? (
                  !load ? 
                  <Button onClick={() => {followUser(user._id);setLoad(true);}}>Follow</Button>
                  : (
                    <Button>
                      <i className="fa fa-spinner fa-spin"></i>
                    </Button>
                  )
                ) : ( !load ? 
                  <Button className="following" onClick={() => {unfollowUser(user._id); setLoad(true);}}>Following</Button>
                  :  (
                    <Button>
                      <i className="fa fa-spinner fa-spin"></i>
                    </Button>
                  )
                )}
        </>
    )
}

export default FollowersFollowingList
