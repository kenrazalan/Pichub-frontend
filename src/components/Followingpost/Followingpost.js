import React,{useState,useEffect, useContext} from 'react'
import {UserContext} from './../../App'
import {Link} from 'react-router-dom'
import Loader from "./../assets/Loader";
import styled from 'styled-components'
import {MoreIcon} from '../assets/Icons'
import Modal from '../Modal/Modal'
import {ModalContent} from '../Home/Home'

const Wrapper = styled.div`
.home-card{
    border: 1px solid #DBDBDB !important;
    box-shadow: none !important;
}
// .home-input{
//     border-radius: 4px !important;
//     border: 1px solid #DBDBDB !important;
//     padding: 0.1rem 0.5rem !important;
//     width: 100% !important;
//     margin-left: 0;
//     height: 2rem !important;
// }
`

const Followingpost = () =>{

    const [data,setData] = useState([])
    const [myPost,setMyPost] =useState([])
    const concat = myPost.concat(data)
    const {state,dispatch} = useContext(UserContext)
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const [del,setDelete]= useState("")

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
    },[state])
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/myposts`,{
            headers:{
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then((res)=>res.json())
        .then(result=>{
            console.log(result.myposts.length);
            setMyPost(result.myposts)
            setLoading(false)
        })
    },[state])

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
        fetch(`${process.env.REACT_APP_BACKEND_URL}/deletepost/${postid}`,{
            method:"delete",
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("jwt"),
                
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = myPost.filter(item=>{
                return item._id !== result._id
            })
            setMyPost(newData)
           
        })
    }  

    if (loading) {
        return <Loader />;
      }
    return(
        <>
         <Wrapper>
        {concat?
        <div className="home">
            {concat.map(item=>{
                return(
                    <div className="card home-card" key={item._id}>
                      
                      <div style={{padding:"10px",margin: "0"}}><Link to={item.postedBy._id === state._id 
                          ?`/profileheader`:`/profile/${item.postedBy._id}` }>
                          <span> 
                      <img src={item.postedBy.pic} style={{width: "42px",height: "42px", borderRadius:"80px",marginBottom: "-10px"}}
                      alt={item.name}/> </span>
                      <span style={{ 
                          fontSize: '17px',
                          fontWeight: '600',
                          verticalAlign: 'super',
                          paddingLeft: '10px'
  
                      }}>{item.postedBy.name}</span>
                      </Link>

                      {showModal && (
                        <Modal>
                            <ModalContent postId={del} handleDeletePost={deletePost} state={state}   closeModal={closeModal} />
                        </Modal>
                     )}
  
                      {item.postedBy._id===state._id 
                          
                          && 
                          <MoreIcon onClick={() =>{
                            setShowModal(true);
                            setDelete(item._id)
                            } } style={{float:"right"}} />}  </div>
                      
                     <div className="card-image">
                          <img src={item.photo} alt={item.name}/>
                     </div>
                    <div className="card-content">
                        {/* <i className="material-icons" >favorite</i> */}

                        {item.likes.includes(state._id)?
                          <i style={{marginTop: "-5px"}} className="material-icons" onClick={()=>unlikePost(item._id)}>thumb_down_off_alt</i>
                          :
                          <i style={{marginTop: "-5px"}} className="material-icons" onClick={()=>likePost(item._id)}>thumb_up_off_alt</i>
                        }
                      
                       
                         <div className="bold">{item.likes.length} likes</div>
                         <div>{item.title}</div>
                         <p style={{fontSize:"13px"}}>{item.body}</p>

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
            
            </div>  : <Loader/>
            }
            </Wrapper></>
    )

}

export default Followingpost