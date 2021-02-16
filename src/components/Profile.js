import React,{useContext, useEffect, useState} from 'react'
import {UserContext} from '../App'

const Profile = () =>{
    const [pic,setPic] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('http://localhost:5000/myposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result)=>{
            console.log(result);
            setPic(result.myposts)
        })
    },[])
    return(
        <div style={{
            maxWidth:"550px",
            margin:"0 auto"
        }}>
            <div style={{
                display:'flex',
                justifyContent:"space-around",
                margin:"18px 0",
                borderBottom: "1px solid gray"
            }}>
                <div>
                    <img style={{
                    width:"160px",
                    height:"160px",
                    borderRadius:"80px"
                }} src={state?state.pic:"loading"}
                alt="profile"/>
                </div>
            <div>
                <h4>{state?state.name:"loading"}</h4>
                <div style={{
                    display: 'flex',
                    justifyContent:"space-between",
                    width:"108%"
                    
                }}
                alt={state?state.name:""}>
                    <h5>{pic.length}</h5>
                    <h5>{state?state.followers.length: "0"} followers</h5>
                    <h5>{state? state.following.length: "0"} following</h5>
                </div>
            </div>
            </div>
            <div className="gallery">
                {pic.map(item=>{
                    return(
                        <img className="item" src={item.photo} alt={item.name} key={item._id}/>
                    )
                })}
               
               
            </div>
        </div>
    )

}

export default Profile