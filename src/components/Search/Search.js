import React from 'react'
import styled from "styled-components";


const Wrapper = styled.input`
  padding: 0.3rem 0.6rem;
  margin-right: 150px;
  background: #FAFAFA;
  border: 1px solid #DBDBDB;
  font-family: "Fira Sans", sans-serif;
  font-size: 1rem;
  border-radius: 4px;
`;
const Search = () => {
    return (
      <Wrapper
        className="browser-default"
        type="text"
        placeholder="Search"
      />
    );
  };
  
  export default Search;
