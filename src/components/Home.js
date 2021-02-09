import React from 'react'

const Home = () =>{
    return(
        <div className="home">
            <div className="card home-card">
                <h5>qwerty</h5>
                <div className="card-image">
                     <img src={"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"}/>
                </div>
                <div className="card-content">
                <i class="material-icons">favorite</i>
                    <h6>Title</h6>
                    <p>This is amazing post</p>
                    <input type="text" placeholder="add comment"/>
                </div>
            </div>

            <div className="card home-card">
                <h5>qwerty</h5>
                <div className="card-image">
                     <img src={"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"}/>
                </div>
                <div className="card-content">
                <i class="material-icons">favorite</i>
                    <h6>Title</h6>
                    <p>This is amazing post</p>
                    <input type="text" placeholder="add comment"/>
                </div>
            </div>
            
        </div>
    )

}

export default Home