import React from "react";
import styled from 'styled-components'
import ProfileForm from "../ProfileForm/ProfileForm";

const Wrappers = styled.div`
   width: 930px;
   border: 1px solid #DBDBDB;
  display: grid;
  background: #FFF;
  
  // .tabs {
  //   border-right: 1px solid #DBDBDB;
  //   padding: 1rem;
  // }
  .profile-form-container {
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 970px) {
    width: 90%;
  }
  @media screen and (max-width: 700px) {
    width: 98%;
  }
  @media screen and (max-width: 550px) {
    width: 99%;
  }
`;

const EditProfile = () => {
  return (
    <Wrappers>
      <div className="profile-form-container">
        <ProfileForm />
      </div>
    </Wrappers>
  );
};

export default EditProfile; 