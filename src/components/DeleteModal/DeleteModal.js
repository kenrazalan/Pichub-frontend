import React from 'react'
import styled from "styled-components";
import {useHistory} from 'react-router-dom'

const ModalContentWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;
  span:last-child {
    border: none;
  }
  span {
    display: block;
    padding: 1rem 0;
    border-bottom: 1px solid #dbdbdb;
    cursor: pointer;
  }
`;

function DeleteModal({
    item,
    postId,
    closeModal,
    handleDeletePost,
    state,
  }) 
  
  {
    const history = useHistory()
    return (
        <div>
            <ModalContentWrapper>
      <span className="danger" onClick={() => {history.push(`/post/${item._id}`)}}>
        Go to Post
      </span>
      {item.postedBy?._id !== state?._id ? null : 
      
      <span
        className="danger"
        onClick={() => {handleDeletePost(postId);closeModal();history.push('/')}}>Delete Post
      </span>
      }
        <span
        className="danger"
        onClick={() =>closeModal()}>Report
      </span>
      <span className="danger" onClick={closeModal}>
        Cancel
      </span>

      {/* <DeletePost postId={postId} closeModal={closeModal} goToHome={true} /> */}
    </ModalContentWrapper>
            
        </div>
    )
}

export default DeleteModal
