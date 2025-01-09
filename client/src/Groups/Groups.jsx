import React from 'react'
import Navbar from '../components/Navbar/Navbar'

const Groups = () => {
  return (
    <div className="groups-page">
    <Navbar />
    <div className="chatter">
      <div className="chat-and-groups">

        <Contacts setChat={setChat}/>
        {
          chat ? <Chat contact={chat}/> : <Welcome />
        }
      </div>
    </div>
  </div>
  )
}

export default Groups