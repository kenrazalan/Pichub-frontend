import React,{useContext,useEffect,useState} from 'react'
import ExplorePostList from './ExplorePostList';


function ExplorePost() {
    const [post,setPost] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/allpost`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }).then((res) => res.json())
          .then((result) => {
          
            console.log(result.posts) 
            setPost(result.posts)       
            //setLoading(false)
          });
      }, []);

    return (
        <div>
            <ExplorePostList posts={post}/>
        </div>
    )
}

export default ExplorePost
