import React from 'react'

const Profile = () =>{
    return(
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
                <h4>Knnth asdas</h4>
                <div style={{
                    display: 'flex',
                    justifyContent:"space-between",
                    width:"108%"
                }}>
                    <h5>40 followers</h5>
                    <h5>40 post</h5>
                    <h5>40 following</h5>
                </div>
            </div>
            </div>
            <div className="gallery">
                <img className="item" src={"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"}/>
                <img className="item" src={"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"}/>
                <img className="item" src={"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"}/>
                <img className="item" src={"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"}/>
            </div>
        </div>
    )

}

export default Profile