import React from "react";
import styled, { keyframes } from "styled-components";
import { LoaderIcon } from "../assets/Icons";


// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  //animation: 2s linear infinite;
  svg {
    height: 50px;
    width: 50px;
    fill: #B2B2B2;
  }
  @media screen and (max-width: 500px) {
    img {
      height: 40px;
      width: 40px;
    }
  }
`;

const Loader = () => {
  return (
     <Wrapper>
     <LoaderIcon/>
     {/* <img src={load} alt="loader" /> */}
     </Wrapper>
   
  );
};

export default Loader;