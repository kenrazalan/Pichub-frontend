import React from "react";
import styled from "styled-components";
import { CommentIcon, HeartIcon } from "../assets/Icons";

const Wrapper = styled.div`
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

function ExplorePostList({ posts }) {
  return (
    <Wrapper>
      {posts.map((post) => (
        <div className="grid-container">
          <img src={post.photo} alt={post._id} />
          <div className="overlay">
            <div className="overlay-content">
              <span>
                <HeartIcon /> {post.likes.length}
              </span>
              <span>
                <CommentIcon /> {post.comments.length}
              </span>
            </div>
          </div>
        </div>
      ))}
    </Wrapper>
  );
}

export default ExplorePostList;
