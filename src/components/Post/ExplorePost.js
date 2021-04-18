import React,{useContext,useEffect,useState} from 'react'
import Loader from '../../assets/Loader';
import ExplorePostList from './ExplorePostList';
import {AllpostContext} from '../../context/AllpostContext'


function ExplorePost() {
    const [load, setLoad] = useState(true);
    const { stateAllpost, dispatchAllpost} = useContext(AllpostContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/allpost`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }).then((res) => res.json())
          .then((result) => {
          
            console.log(result.posts) 
            dispatchAllpost({type:"ALLPOST", payload:result.posts})     
            setLoad(false)
          });

      }, [dispatchAllpost]);

    if(load && stateAllpost.length === 0){
      return <Loader/>
    }

    return (
        <div>
            <h5 className="browser-default bold" style={{marginBottom: "0",textAlign:"center"}}>Explore</h5>
            <ExplorePostList posts={stateAllpost}/>
        </div>
    )
}

export default ExplorePost
