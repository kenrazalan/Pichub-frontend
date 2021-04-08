import React,{useState,useContext,useEffect} from 'react'
import { useHistory } from 'react-router';
import verified from '../assets/correct.svg'
import Button from "../assets/Button";
import { UserContext } from "../../App";

function SuggestionList({user}) {
    const [load,setLoad] = useState(false)
    const history = useHistory()
    const { state, dispatch } = useContext(UserContext);
    const [showFollow, setShowfollow] = useState(true);

    useEffect(() => {
      setShowfollow(state && !state.following.some((i) => i._id === user._id));
    }, [state,user]);
 
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
    return (
        <div key={user._id} className="suggestion">
            <div className="user-info">
              <img
                className="pointer"
                onClick={() => {
                  history.push(`/profile/${user._id}`);
                }}
                src={user.pic}
                alt="avatar"
              />

              <div className="user-meta">
                <h4
                  className="username"
                  onClick={() => history.push(`/profile/${user._id}`)}
                >
                  {user.username}
                 {user.followers.length >= 10 ? 
                    <span><img src={verified} className="verified" alt="verified"/></span> 
                    : null}
                </h4>
                 
                <span className="secondary">{user.name}</span>
              </div>
            </div>
            {!state.following.some((i) => i._id === user._id) ? (
              !load ? 
              <Button className="btns" onClick={() => {followUser(user._id);setLoad(true);}}>Follow</Button>
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
          </div>
    )
}

export default SuggestionList
