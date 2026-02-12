import React from 'react'

const ButtonGroup = ({ onSelectPC, onLoadFromWeb }) => {
  return (
    <div className='button-box'>
      <button className='green-btn' onClick={onSelectPC}>
        Select image from My PC
      </button>

      <span className='or-text'>--or--</span>

      <button className='green-btn' onClick={onLoadFromWeb}>
        Load Image from Website
      </button>
    </div>
  )
}

export default ButtonGroup
