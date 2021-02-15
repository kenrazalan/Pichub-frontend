import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../App'
import {useParams} from 'react-router-dom'

const UserProfile = () =>{
    const [userProfile,setProfile] =useState(null)
 
    const {state,dispatch}= useContext(UserContext)
    const {userid}= useParams()

    console.log(userid);
    //   const [showFollow,setShowfollow] =useState(state?!state.following.includes(userid):true)

    // const [showFollow,setShowfollow] =useState(true)
    // useEffect(()=>{
    //     setShowfollow(state && !state.following.includes(userid))
    // },state)

    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result)=>{
            console.log(result);
            setProfile(result)
        })
    },[])

        const followUser = ()=>{
        fetch("/follow",{
            method:"put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId: userid
            })
        }).then(res=>res.json())
        .then(data=>{
           
            dispatch({type:"UPDATE",payload: {following:data.following, followers: data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
     
            setProfile(prevState=>{
            
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                       }
                }
            })
             setShowfollow(false)
        })
    }




    const unfollowUser = ()=>{
        fetch("/unfollow",{
            method:"put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId: userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload: {following:data.following, followers: data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            
            setProfile(prevState=>{
                const newFollower  = prevState.user.followers.filter(item=>item!== data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                       }
                }
            })
            setShowfollow(true)
        })
    }

  



    


    return(
        <>
        {userProfile?
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
                }} src={"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"}/>
                </div>
            <div>
                <h4>{userProfile.user.name}</h4>
                {/* <h4>{userProfile.user.email}</h4> */}
                <div style={{
                    display: 'flex',
                    justifyContent:"space-between",
                    width:"108%"
                }}>
                    <h6>{userProfile.posts.length} posts</h6>
                    {/* <h6>{userProfile? userProfile.user.followers.length: "loading"} followers</h6>
                    <h6>{userProfile? userProfile.user.following.length: "loading .."} following</h6> */}
             
                </div>
                                 {showFollow?
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
                 onClick={()=>followUser()}
                  style={{
                      margin:"10px"
                  }}>
                      Follow
                 </button>:
                 <button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
                  onClick={()=>unfollowUser()}
                  style={{
                     margin:"10px"
                }}>
                     Unfollow
                 </button>
                 }
            </div>
            </div>
            <div className="gallery">
                {userProfile.posts.map(item=>{
                    return(
                        <img className="item" src={item.photo}/>
                    )
                })}
               
               
            </div>
        </div>
        :
        <h2>Loading</h2>
        }
     </>
    )
}

export default UserProfile