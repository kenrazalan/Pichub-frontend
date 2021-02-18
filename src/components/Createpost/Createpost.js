import React,{useEffect,useState} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const Createpost = ()=>{
    const history = useHistory()
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

     useEffect(()=>{
         if(url){
            
        
        fetch(`${process.env.REACT_APP_BACKEND_URL}/createpost`,{
            method: "post",
            headers:{
                 "Authorization": "Bearer "+ localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },body:JSON.stringify({
                body,
                pic: url
            })
        }).then(res => res.json()).then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#e53935 red darken-1"})
            }else{
                M.toast({html: "Post Created",classes:"#66bb6a green lighten-1"})
                             history.push('/')
            }
        }).catch((error)=>{
            console.log(error)
        })
         }

     },[url])

    const postDetails =() =>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","instagram-clone")
        data.append("cloud_name","dtwrzv0of")
        fetch(process.env.REACT_APP_CLOUDINARY_URL,{
            method:"post",
            body: data
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.url)
    
            setUrl(data.url)
        }).catch(error=>{
            console.log(error)
        })
    }
    
    return(
        <div className="card input-field"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" placeholder="body" onChange={(e)=>setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn">
                    <span>UPLOAD</span>
                    <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
              onClick={()=>postDetails()} >
                     CREATE POST
                </button>
        </div>
    )
}

export default Createpost