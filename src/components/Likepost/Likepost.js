import React, { useEffect, useState } from "react";
import { HeartIcon, FilledHeartIcon } from "../assets/Icons";

const LikePost = ({ isLiked, postId, incLikes, decLikes }) => {
  const [likedState, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleToggleLike = () => {
    if (likedState) {
      setLiked(false);
      decLikes();
      fetch(`${process.env.REACT_APP_BACKEND_URL}/like`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId,
        }),
      });
    } else {
      setLiked(true);
      incLikes();
      fetch(`${process.env.REACT_APP_BACKEND_URL}/like`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId,
        }),
      });
    }
  };

  if (likedState) {
    return <FilledHeartIcon onClick={handleToggleLike} />;
  }

  if (!likedState) {
    return <HeartIcon onClick={handleToggleLike} />;
  }
};

export default LikePost;
