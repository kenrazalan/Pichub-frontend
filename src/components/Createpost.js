import React from 'react'


const Createpost = ()=>{
    return(
        <div className="card input-field"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" placeholder="title"/>
            <input type="text" placeholder="body"/>
            <div className="file-field input-field">
                <div className="btn">
                    <span>UPLOAD</span>
                    <input type="file"/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-2" 
               >
                     CREATE POST
                </button>
        </div>
    )
}

export default Createpost