import React, { useState, useEffect,useContext } from "react";
import styled from "styled-components";
import Suggestions from "../Suggestions/Suggestions";
import Followingpost from "../Followingpost/Followingpost";
import Loader from "../../assets/Loader";
import {PostContext} from '../../context/PostContext'
import Welcome from "../Welcome/Welcome";

// const Wrapper = styled.div`
//   @media screen and (max-width: 1040px) {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// `;

const HomeTwo = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { stateFeed, dispatchFeed } = useContext(PostContext);



  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/followingpost`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //setFeed(result.posts);
        dispatchFeed({type:"FEED", payload:result.posts})
       setLoading(false);
      });
       
  }, [dispatchFeed]);

   if (stateFeed === undefined && loading) {
     return <Loader/>;
   }

    return <>{  stateFeed?.length === 0 ? <Welcome /> : <Followingpost />}</>;
};

export default HomeTwo;
