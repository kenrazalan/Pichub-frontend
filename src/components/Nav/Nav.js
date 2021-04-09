import React, { useContext, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { ExploreIcon, HomeIcon, InboxIcon, SearchIcon,AddPost, HeartIcon } from "../assets/Icons";
import addpost from '../assets/addpost.svg'
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import navlogo from "../../components/assets/logo1.png";
import NewPost from "../../components/Newpost/Newpost";
import M from "materialize-css";
import Search from "../Search/Search";

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
  //padding: 1rem 0;
  z-index: 10;
  @media only screen and (max-width: 600px) {
    top: unset;
    bottom:0;
    .brand-logo{
        display: none;
    }
    #nav-mobile{
      width: 100% !important;
      justify-content: space-between;
    } 
    .nav2{
      display: unset !important;

  }
  }
  .nav2{
    display: none;
    top: 0 !important;
    position: fixed;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #dbdbdb;
    left: 0%;
  }
 

  .nav-logo2{
    position: relative;
    top: 6px;
   
    height: 29px;
    margin:5px 0 5px 0;
  }

  .nav-logo {
    position: relative;
    top: 6px;
    height: 29px;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 930px;
  }

  ul {
    display: flex;
    position: relative;
    top: 3px;
    list-style-type: none;
  }

  li {
    margin-left: 1.5rem;
    font-weight: 400;
  }
  .search-mobile{
    display: none;
  }
  .input{
    display: flex;
    width: 100%;
    padding: 10px;
    border: 1px solid #DBDBDB;
  }
  .modal-footer{
    position: absolute;
    bottom: 0;
  }
  .collection{
    max-height: 50vh;
    min-height: 50vh;
    overflow: scroll;
  }
  @media screen and (max-width: 970px) {
    .nav {
      width: 90%;
    }
    .search{
      margin-right: -150px;
      
    }
    li{
      margin-left: 1rem;
    }
  }

  @media screen and (max-width: 600px) {
    .search {
      display: none;
    }
    .search-mobile{
      display: block;
    }
  }
  @media screen and (max-width: 600px) {
    .heart-icon{
      display: none;
    }
  }

`;

const Nav = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  const renderList = () => {
    if (state) {
      return [
        // <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
        <li className="search" style={{marginBottom:"10px",marginTop: "10px"}} key="1">
        <Link >
        <div data-target="modal1" className="modal-trigger">
          <Search />
          </div>
        </Link>
      </li>,
        <li key="1">
          <Link to="/">
            <HomeIcon />
          </Link>
        </li>,
        <li className="search-mobile" style={{ margin: "auto !important" }} key="3">
          <Link>
            <div data-target="modal1" className="modal-trigger">
              <SearchIcon />
            </div>
          </Link>
        </li>,
        <li className="heart-icon"  style={{marginBottom:"10px",marginTop: "10px"}} key="12">
        <HeartIcon />
         </li>,
        <li key="12">
          <NewPost/>
        </li>,
        <li key="4">
          <Link to="/explore">
            <ExploreIcon />
          </Link>
        </li>,
        <li key="2">
          <Link to="/profile">
            <img
              style={{
                marginBottom: "-15px",
                width: "24px",
                height: "24px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
              src={state.pic}
              alt="avatar"
            />
          </Link>
        </li>,
        //    <li key="5">
        //    <h5  style={{color:'black',padding:"8px 15px 0 15px",fontSize:"15px",}}
        //            onClick={()=>{
        //              localStorage.clear()
        //              dispatch({type:"CLEAR"})
        //              history.push('/signin')
        //            }}>Logout</h5>

        //  </li>
      ];
    }

    // else{
    //   return[
    //     <li  key="6"><Link to="/signin">Signin</Link></li>,
    //     <li  key="7"><Link to="/signup">Signup</Link></li>

    //   ]
    // }
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/searchusers`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUserDetails(result.user);
      });
  };

  return (
    <NavWrapper>
      <div className="nav">

      <div className="nav2 center">
        <Link to={state ? "/" : "/signin"} className="brand-logo2">
          <img className="nav-logo2" src={navlogo} alt="logo" />
        </Link>
      </div>

        <Link to={state ? "/" : "/signin"} className="brand-logo left">
          <img className="nav-logo" src={navlogo} alt="logo" />
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
        <div
          id="modal1"
          class="modal"
          ref={searchModal}
          style={{ color: "black"}}
        >
          <div className="modal-content">
            <input
              style={{ display: "flex" ,width: "100%"}}
              className="browser-default input"
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                fetchUsers(e.target.value);
              }}
            />

            <ul
              className="collection"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {userDetails.map((item) => {
                return (
                  <Link
                    to={
                      item._id !== state._id
                        ? `/profile/${item._id}`
                        : "/profile"
                    }
                    onClick={() => {
                      M.Modal.getInstance(searchModal.current).close();
                      setSearch("");
                      setUserDetails([]);
                    }}
                  >
                    <li className="collection-item">{item.name}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="modal-footer">
            <button
              className="modal-close waves-effect waves-green btn-flat fixed"
              onClick={() => setSearch("")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </NavWrapper>
  );
};

export default Nav;
