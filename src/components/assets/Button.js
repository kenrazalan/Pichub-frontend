import styled, { css } from "styled-components";

const Button = styled.button`
  min-width: 100px; 
  background-color: #0095f6;
  //background-color: transparent;
  border: 1px solid #dbdbdb;
  padding: 0.4rem 1rem;
  color: #fff;
  border-radius: 4px;
  margin-top: 1rem;
  margin-left: 1rem;
  font-family: "Fira Sans", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  :focus{
    background-color: #0095f6;
  }

`;

export default Button;