import React from 'react'
import io from 'socket.io-client'

const socket = io('/')
const socketio = () => {
  return (
    <div>socket</div>
  )
}

export default socketio