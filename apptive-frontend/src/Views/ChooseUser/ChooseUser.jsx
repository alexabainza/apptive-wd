import React from 'react'
import { Person } from "react-bootstrap-icons"

const ChooseUser = () => {
  return (
    <div className='choose-user-page d-flex flex-column justify-content-between align-items-center'>
    <h3 className='text-white'>Sign in as</h3>
    <div className='choose-user-options d-flex justify-content-between align-items-center'>
        <button className="choose-user-has-account d-flex flex-column p-3">
            <Person size={200}></Person>
            <small className='text-center'>I have an account</small>
            
            </button>
        <button className="choose-user-guest">Guest</button>

    </div>
    </div>

  )
}

export default ChooseUser