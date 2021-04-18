import React from 'react'
import { CloseIcon } from '../../assets/Icons'
import Modal from '../Modal/Modal'
import sign from '../../assets/construction.jpg'

function Message({closeMessageModal}) {
    return (
   
        <Modal>
            <div>
            <div style={{ }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #DBDBDB",
                  padding: "1rem",
                }}
              >
                <div><p className="bold">Coming Soon</p></div>
                <CloseIcon  onClick={closeMessageModal}/>
              </div> 
                <img style={{margin:"10px 0 10px 0"}} src={sign} alt="sign"/>
                 
            </div>
           </div>
        </Modal>
            
    )
}

export default Message
