import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Suggestions from "../Suggestions/Suggestions";
import Followingpost from "../Followingpost/Followingpost";
import Loader from "../assets/Loader";

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
  const [myPost, setMyPost] = useState([]);

  // useEffect(()=>{
  //     fetch(`${process.env.REACT_APP_BACKEND_URL}/myposts`,{
  //         headers:{
  //             "Authorization":"Bearer "+ localStorage.getItem("jwt")
  //         }
  //     }).then((res)=>res.json())
  //     .then(result=>{
  //         console.log(result.myposts.length);
  //         setMyPost(result.myposts)
  //         setLoading(false)
  //     })
  // },[])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/followingpost`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
        setLoading(false);
      });
  }, []);

   if (loading) {
     return <Loader />;
   }

   return <>{  data.length > 0 ? <Followingpost /> : <Suggestions />}</>;
  // return <Followingpost/>
};

export default HomeTwo;
