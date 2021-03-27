import React,{useContext, useState,useEffect} from 'react'
import iii from '../assets/correct.svg'
import styled from "styled-components";
import { UserContext } from "../../App";

const Wrapper = styled.div`
.containers{
    display: flex;
    max-width: 320px;
    
    flex-direction: column;
    height: 100vh;
    position: fixed;
    margin-left: 50px;
    margin-top: 20px;
}
.profile-container{
    display: flex;
    flex-direction: row;

    
}
.profile-container-list{
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    
}

.profile{
    width: 66px;
    height: 66px;
    border-radius: 50%;
    margin-right: 12px;
    border: 3px solid #d6249f;
}
.profile2{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 19px;
}
h6{
    font-size: 14px;
    text-align: left;
}
.list{
    margin-right: 19px;
}
.suggestion{
    display: flex;
    flex-direction: row;
    justify-content:  stretch;
    margin: 20px 0 10px 0;
}
.btns{
  margin: auto 0 auto auto;
}
.name{
    font-size: 14px;
    font-weight: 800
}
.username{
    font-size: 14px;
    margin-top: 0
  
}

`

function SideSuggestions() {
    const {state,dispatch} = useContext(UserContext)
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/allusers`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((user) => user.json())
          .then((result) => {
            //setLoading(false);
            setUsers(result);
            console.log(state);
          });
      }, [state]);
    return (
        <Wrapper>
        <div className="containers">
            <div className="profile-container">
                <img className="profile" src={state && state.pic} alt="asas"/>
                <div className="list">
                      <div className="name"><b>{state && state.name}</b></div>
                      <div className="username" style={{color:"#8e8e8e"}}>{state && state.username}</div>
                </div>
                <span className="btns">Logout</span>
            </div>

            <div className="suggestion">
                <div style={{color: "#8e8e8e",fontWeight: 900}}>Suggestions For You</div>
                <h6 className="btns"><b>See all</b></h6>
            </div>

            <div >
                {users.slice(0,5).map(user=>(
                 <div className="profile-container-list">
                <img className="profile2" src={user.pic} alt="asas"/>
                <div className="list">
                      <div className="name"><b>{user.name}</b></div>
                      <div className="username">{user.username}</div>
                     
                </div>
                <span className="btns">Follow</span>
            </div>


                ))}
         
             </div>
        </div>
        </Wrapper>
    )
}

export default SideSuggestions
