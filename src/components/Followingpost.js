import React,{useState,useEffect, useContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'

const Followingpost = () =>{

    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/followingpost`,{
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result);
            setData(result.posts)
        })
    },[])

    const likePost = (id)=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/like`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("jwt")},
            body:JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err);
        })
    }
    
    const unlikePost = (id)=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/unlike`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")},
            body:JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(error=>{
            console.log(error)
        })
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text 
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
              
            })
            setData(newData)
        }).catch(error=>{
            console.log(error)
        })
    }
    const deletePost= (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("jwt"),
                
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
           
        })
    }  
    return(
        <div className="home">
            {data.map(item=>{
                return(
                    <div className="card home-card" key={item._id}>
                      
                      <h5><Link to={item.postedBy._id === state._id 
                      ? `/profile`
                    : `/profile/${item.postedBy._id}`
                    }>
                          
                          {item.postedBy.name} </Link>{item.postedBy._id===state._id && 
                      <i className="material-icons" onClick={()=>deletePost(item._id)}
                      style={{float:"right"}}>delete</i>}  </h5>
                     <div className="card-image">
                          <img src={item.photo} alt={item.name}/>
                     </div>
                    <div className="card-content">
                        <i className="material-icons" >favorite</i>

                        {item.likes.includes(state._id)?
                          <i className="material-icons" onClick={()=>unlikePost(item._id)}>thumb_down</i>
                          :
                          <i className="material-icons" onClick={()=>likePost(item._id)}>thumb_up</i>
                        }
                      
                       
                        <h6>{item.likes.length} likes</h6>
                        <h6>{item.title}</h6>
                        <p>{item.body}</p>

                        {
                           item.comments.map(record=>{
                           //console.log(record)
                           return(
                           <div key={record._id}><span style={{fontWeight:"600"}}>{record.postedBy.name}</span> {record.text}</div>
                           )
                       })
                      }
                    <form onSubmit={(e)=>{
                       e.preventDefault()
                       makeComment(e.target[0].value,item._id)
                       e.target[0].value= ""
                   }}>
                        <input className="home-input" type="text" placeholder="add a comment"/>
                   </form>
                    </div>
                    </div>
                )
            })}
            
        </div>
    )

}

export default Followingpost