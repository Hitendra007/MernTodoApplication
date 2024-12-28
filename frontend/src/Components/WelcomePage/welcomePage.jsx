import React from 'react'
import './welcomePage.css'
import Logo from '../../assets/Logo.jpeg'
function welcomePage() {
  return (
    <div id='main-divv'>
      <div id='flex-item-1'>
        <h1 className='text-2xl font-bold text-center mt-4'>Welcome to To-Do App</h1>
      </div>
      <div id='flex-item-2'>
        <img src={Logo} id='logo-img' alt='Todo logo ' />
      </div>
    </div>
  )
}

export default welcomePage
