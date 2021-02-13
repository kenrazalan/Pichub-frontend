import React,{useState,useEffect, useContext} from 'react'
import {UserContext} from '../App'

const Home = () =>{

    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch("http://localhost:5000/allpost",{
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
        fetch('http://localhost:5000/like',{
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
                if(item._id==result._id){
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
        fetch('http://localhost:5000/unlike',{
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
                if(item._id==result._id){
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
                if(item._id==result._id){
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
    return(
        <div className="home">
            {data.map(item=>{
                return(
                    <div className="card home-card" key={item._id}>
                      <h5>{item.postedBy.name}</h5>
                     <div className="card-image">
                          <img src={item.photo}/>
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
                           console.log(record)
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

export default Home