import React, { useEffect, useState } from 'react'
import './Signup.css'
import NavBar from './NavBar/NavBar'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { BiKey, BiUser } from 'react-icons/bi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from "axios";
import { BackendValues } from '../utility/BackendConstants'

const Signup = () => {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupButtonLoader, setSignupButtonLoader] = useState(false)

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    cpassword: ""
  });
  const [signupErrors, setSignupErrors] = useState({
    emailError: null,
    passwordError: null,
    cpasswordError: null
  })

  const makeNullErrors = () => {
    setSignupErrors({
      emailError: null,
      passwordError: null,
      cpasswordError: null
    })
  }

  const signup = async()=>{
    makeNullErrors()
    setSignupButtonLoader(true)
    await axios.post(
      `${BackendValues.host}/api/signup`,
      userData
    ).then((resp)=>{
      let result = resp.data;
      let signupErrs = signupErrors;
      
      console.log(result.message);
      if(result.error){
        if(result.message.emailError){
          signupErrs.emailError = result.message.emailError;
        }
        else{
          signupErrs.emailError = null
        }

        if(result.message.passwordError){
          signupErrs.passwordError = result.message.passwordError;
        }
        else{
          signupErrs.passwordError = null
        }

        if(result.message.cpasswordError){
          signupErrs.cpasswordError = result.message.cpasswordError;
        }
        else{
          signupErrs.cpasswordError = null
        }
        setSignupErrors(signupErrs);
      }
      else{
        makeNullErrors();
        navigation('/verifyAccount', {
          state:{
            email:userData.email,
            token:result.data
          }
        })
      }
      setSignupButtonLoader(false)
    }).catch((e)=>{
      setSignupButtonLoader(false)
    })
  }
  
  const [
    cookies,
    setCookies,
    removeCookies
  ] = useCookies(['auth']);

  useEffect(() => {
    if(cookies.auth){
      navigation('/')
    }
  },[]);

  return (
    <div id='signup_mainer'>
      <div id='mainDiv'>
        <NavBar></NavBar>
        <div id='signupPanel'>
          <div id='signupPanelWrapper'>
            <div id='signupHead'>
              Signup
            </div>
            <div id='signup_inputs'>
              <div className='signup_input_wrapment'>  
                <div className='signup_input_wrapper'>
                  <BiUser color='white' size={27} ></BiUser>
                  <input 
                    type='email' 
                    className='signup_input_area' 
                    placeholder='email'
                    onChange={(e)=>{
                      setUserData({
                        ...userData,
                        email: e.target.value
                      })
                    }}
                  ></input>
                </div>
                <div className={(signupErrors.emailError) ? 'signup_input_error' : 'signup_input_helper'}>
                  {(signupErrors.emailError) ? `${signupErrors.emailError}` : "please enter email here"}
                </div>
              </div>
              <div className='signup_input_wrapment'>
                <div className='signup_input_wrapper'>
                  <BiKey color='white' size={27}></BiKey>
                  <input 
                    type={(showPassword) ? 'text' : 'password'} 
                    className='signup_input_area' 
                    placeholder='password'
                    onChange={(e)=>{
                      setUserData({
                        ...userData,
                        password: e.target.value
                      });
                    }}
                  ></input>
                  {(showPassword) ? 
                  <FaEyeSlash size={27} color='white' onClick={()=>setShowPassword(!showPassword)}></FaEyeSlash> : 
                  <FaEye size={27} color='white' onClick={()=>setShowPassword(!showPassword)}></FaEye>}
                </div>
                <div className={(signupErrors.passwordError) ? 'signup_input_error' : 'signup_input_helper'}>
                  {(signupErrors.passwordError) ? `${signupErrors.passwordError}` : "please enter password here"}
                </div>
              </div>
              <div className='signup_input_wrapment'>
                <div className='signup_input_wrapper'>
                  <BiKey color='white' size={27}></BiKey>
                  <input 
                    type={(showConfirmPassword) ? 'text' : 'password'} 
                    className='signup_input_area' 
                    placeholder='confirm password'
                    onChange={(e)=>{
                      setUserData({
                        ...userData,
                        cpassword: e.target.value
                      });
                    }}
                  ></input>
                  {(showConfirmPassword) ? 
                  <FaEyeSlash size={27} color='white' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}></FaEyeSlash> : 
                  <FaEye size={27} color='white' onClick={()=>setShowConfirmPassword(!showConfirmPassword)}></FaEye>}
                </div>
                <div className={(signupErrors.cpasswordError) ? 'signup_input_error' : 'signup_input_helper'}>
                  {(signupErrors.cpasswordError) ? `${signupErrors.cpasswordError}` : "please confirm password here"}
                </div>
              </div>
            </div>
            <div id='signup_buttons'>
              <button className='session_button' onClick={async()=>{
                signup()
              }}>
                {(signupButtonLoader) ? <div className='loader'></div> : "signup"}
              </button>
              <div style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
              }}>
                <div style={{
                  flex:1,
                  height:'1px',
                  backgroundColor:'white'
                }}></div>
                <div style={{
                  fontFamily:'Poppins,sans-serif',
                  color:'white',
                  letterSpacing:'0px',
                  padding:'10px'
                }}>Already have an account ?</div>
                <div style={{
                  flex:1,
                  height:'1px',
                  backgroundColor:'white'
                }}></div>
              </div>
              <button className='session_button' onClick={()=>{
                navigation("/verifyAccount")
              }}>
                verify account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup