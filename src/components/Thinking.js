import React from 'react'
import { MdComputer } from 'react-icons/md'

const Thinking = () => {
  return (
    <div className='message'>
      <div className='message__wrapper flex justify-center'>
        <div className='text-left message__createdAt'>
          <div className="message__thinking mr-12">
          <div className="lds-ellipsis message__thinking mr-12"><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thinking