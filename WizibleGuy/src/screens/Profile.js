import React from 'react'
import "./Profile.css"
import { BiSolidUserCircle } from 'react-icons/bi'

const Profile = () => {
  return (
    <div id='profileMainDiv'>
      <div id='profileContainer'>
        <BiSolidUserCircle id='accountPageLogo'></BiSolidUserCircle>
        <div id='profileContainerMail'>
          fireeyes634@gmail.com
        </div>
        <div id='profilePanel'>
          <div className='profilePanelSingle'>
            Joined at 20-08-23
          </div>
          <div className='profilePanelSingle' style={{
            cursor: 'pointer'
          }}>
            Forgot Password
          </div>
          <div className='profilePanelSingle' style={{
            color:'tomato',
            border: 'none',
            cursor: 'pointer'
          }}>
            Logout from Account
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile