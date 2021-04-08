import React,{useState,useContext} from 'react'
import { useHistory } from 'react-router';
import verified from '../assets/correct.svg'
import Button from "../assets/Button";
import { UserContext } from "../../App";

function SideSuggestionsList({user}) {
    const { state, dispatch } = useContext(UserContext);
    const [load,setLoad] = useState(false)
    const [showFollow, setShowfollow] = useState(true);
    const history = useHistory();

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
        <div className="profile-container-list">
        <img className="profile2" src={user.pic} alt="profile" onClick={() => { history.push(`/profile/${user._id}`);}} />
        <div className="list" onClick={() => { history.push(`/profile/${user._id}`);}}>
          <div className="name">
            <b>{user.name}</b>
          </div>
          <div className="username">{user.username}</div>
        </div>
        
        {!state.following.some((i) => i._id === user._id) ? (
      !load ? 
      <Button className="btns btn-follow" onClick={() => {followUser(user._id);setLoad(true);}}>Follow</Button>
      : (
        <Button className="btns btn-follow">
          <i className="fa fa-spinner fa-spin"></i>
        </Button>
      )
    ) : ( !load ? 
      <Button className="btns following" onClick={() => {unfollowUser(user._id); setLoad(true);}}>Following</Button>
      :  (
        <Button className="btns following">
          <i className="fa fa-spinner fa-spin"></i>
        </Button>
      )
    )}
      </div>
    )
}

export default SideSuggestionsList
