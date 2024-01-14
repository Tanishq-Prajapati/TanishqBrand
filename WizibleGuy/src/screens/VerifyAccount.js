import React, { useEffect, useState } from 'react'
import './VerifyAccount.css'
import NavBar from './NavBar/NavBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { BiKey, BiUser } from 'react-icons/bi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { BackendValues } from '../utility/BackendConstants'

const VerifyAccount = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [signupButtonLoader, setSignupButtonLoader] = useState(false);
  const [resendButtonLoader, setResendButtonLoader] = useState(false);
  const [otpMessage, setOtpMessage] = useState('please enter otp here')

  const [
    cookies,
    setCookies,
    removeCookies
  ] = useCookies(['auth']);

  // creating all reaquest functions here
  const resendOtp = async()=>{
    setOtpError(null)
    setResendButtonLoader(true)
    await axios.post(
      `${BackendValues.host}/api/resendOTP`,
      {},{
        headers:{
          Authorization: `Bearer ${location.state.token}`
        }
      }
    ).then(res=>{
      let result = res.data;
      if(result.error){
        setOtpError(result.message);
      }
      else{
        setOtpError(null);
      }
      setResendButtonLoader(false)
      setOtpMessage("OTP resended, please enter otp here")
    }).catch(e=>{
      setResendButtonLoader(false)
    })
  }
  const verifyMe = async () => {
    setOtpError(null)
    setSignupButtonLoader(true)
    await axios.post(
      `${BackendValues.host}/api/verifyAccount`,
      {
        otp:otp
      },{
        headers:{
          Authorization:`Bearer ${location.state.token}`
        }
      }
    ).then((res)=>{
      let result = res.data;
      if(result.error){
        setOtpError(result.message);
      }
      else{
        setOtpError(null)
      }
      setSignupButtonLoader(false)
      // now navigate to login
      navigation('/login');
    }).catch(e=>{
      setSignupButtonLoader(false)
    })
  }

  useEffect(() => {
    if(cookies.auth){
      navigation('/');
    }
    if(!location.state || !location.state.email || !location.state.token){
      navigation('/login');
    }
  });

  return (
    <div id='verify_mainer'>
      <div id='mainDiv'>
        <NavBar></NavBar>
        <div id='verifyPanel'>
          <div id='verifyPanelWrapper'>
            <div id='verifyHead'>
              <div>
                VerifyAccount
              </div>
              <div id='verify_account_cap'>
                verification OTP is sended to {(location.state) && location.state.email} for authentication.
              </div>
            </div>
            <div id='verify_inputs'>
              <div className='verify_input_wrapment'>  
                <div className='verify_input_wrapper'>
                  <input onChange={(e)=>setOtp(e.target.value)} type='number' className='verify_input_area' placeholder='OTP here'></input>
                </div>
                <div className={(otpError) ? 'verify_input_error' : 'verify_input_helper'}>
                  {(otpError) ? otpError : otpMessage}
                </div>
              </div>
            </div>
            <div id='verify_buttons'>
              <button className='session_button' onClick={async()=>{
                if(signupButtonLoader || resendButtonLoader) return;
                await verifyMe();
              }}>
                {(signupButtonLoader) ? <div className='loader'></div> :"verify"}
              </button>
              <button className='session_button' onClick={async()=>{
                if(resendButtonLoader || signupButtonLoader) return;
                await resendOtp()
              }}>
                {(resendButtonLoader) ? <div className='loader'></div> : "resend OTP"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyAccount