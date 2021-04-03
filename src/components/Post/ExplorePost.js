import React,{useContext,useEffect,useState} from 'react'
import Loader from '../assets/Loader';
import ExplorePostList from './ExplorePostList';


function ExplorePost() {
    const [post,setPost] = useState([])
    const [load, setLoad] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/allpost`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }).then((res) => res.json())
          .then((result) => {
          
            console.log(result.posts) 
            setPost(result.posts)       
            setLoad(false)
          });
      }, []);

    if(load){
      return <Loader/>
    }

    return (
        <div>
            <ExplorePostList posts={post}/>
        </div>
    )
}

export default ExplorePost
