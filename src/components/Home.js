import React,{useState,useEffect} from 'react'

const Home = () =>{

    const [data,setData] = useState([])
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
                        <i className="material-icons" onClick={()=>likePost(item._id)}>thumb_up</i>
                        <i className="material-icons" onClick={()=>unlikePost(item._id)}>thumb_down</i>
                            <h6>{item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <input type="text" placeholder="add comment"/>
                    </div>
                     </div>
                )
            })}
            
        </div>
    )

}

export default Home