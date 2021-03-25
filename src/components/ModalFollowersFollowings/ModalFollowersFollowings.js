import React from 'react'
import  {useHistory,Link} from 'react-router-dom'
import { OptionsIcon, PostIcon, SavedIcon, CloseIcon } from "../assets/Icons";
import styled from "styled-components";

const ModalContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  padding-right: 2rem;
  font-size: 0.9rem;
  width: 350px;
  img {
    width: 40px !important;
    object-fit: cover !important;
    height: 40px !important;
    border-radius: 20px !important;
    margin-right: 1rem !important;
  }
  .profile-info {
    display: flex !important;
  }
  span {
    color: #b2b2b2 !important;
  }
  button {
    font-size: 0.9rem !important;
    position: relative !important;
    top: -10px !important;
  }
  @media screen and (max-width: 480px) {
    width: 340px !important;
  }
`;

function ModalFollowersFollowings({
    loggedInUser,
    users,
    closeModal,
    title,
    follow,
    unfollow,
  }) {
    const history = useHistory();
        return (
            <div style={{ }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #DBDBDB",
                  padding: "1rem",
                }}
              >
                <div>{title}</div>
                <CloseIcon onClick={closeModal} />
              </div> 
               <div style={{ overflowY:"auto",maxHeight: "400px" }}>
              {users.map((user) => (
                <ModalContentWrapper key={user._id}>
                
                  <div className="profile-info" >
                    <img
                      className="pointer"
                      onClick={() => {
                        closeModal();
                        history.push(`/${user.username}`);
                      }}
                      // src={loggedInUser._id==user._id?loggedInUser.pic:user.pic}
                      src={user.pic}
                      alt="avatar"
                    />
                    <div className="user-info">
                      <div
                        className="pointer"
                        onClick={() => {
                          closeModal();
                        }}
                      >
                        <Link
                          to={
                            loggedInUser._id === user._id
                              ? `/profileheader`
                              : `/profile/${user._id}`
                          }
                        >
                          {user.username}
                        </Link>
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </div>
                  
                  {/* {loggedInUser._id!==user._id?
                  <div className="options">
                      {shFollow?
                        <Button onClick={()=>follow(user._id)}>Follow</Button>
                        :
                        <Button onClick={()=>unfollow(user._id)}>Unfollow</Button>
                        }
                      </div>: <div>You</div>} */}
                </ModalContentWrapper>
            
              ))}    </div>
            </div>
    )
}

export default ModalFollowersFollowings
