import React, { useEffect, useState } from 'react'
import './Login.css'
import NavBar from './NavBar/NavBar'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { BiKey, BiUser } from 'react-icons/bi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { BackendValues } from '../utility/BackendConstants'

const Login = () => {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail]= useState("")
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState(null)
  const [showLoginLoader, setLoginLoader] = useState(false)

  const [
    cookies, 
    setCookies, 
    removeCookies
  ] = useCookies(['auth']);

  const login = async() => {
    setLoginError(null)
    setLoginLoader(true)
    await axios.post(
      `${BackendValues.host}/api/login`,
      {
        email: email,
        password: password
      }
    ).then(res => {
      let result = res.data;
      if(result.error){
        setLoginError(result.message);
      }
      else{
        setLoginError(null);
        setCookies(
          "auth",
          result.data,
          {path: '/'}
        );
        navigation("/")
      }
      setLoginLoader(false);
    }).catch(e=>{
      setLoginLoader(false)
    })
  }

  useEffect(() => {
    if(cookies.auth){
      navigation('/')
    }
  });

  return (
    <div id='login_mainer'>
      <div id='mainDiv'>
        <NavBar></NavBar>
        <div id='loginPanel'>
          <div id='loginPanelWrapper'>
            <div id='loginHead'>
              Login
            </div>
            <div id='login_inputs'>
              <div className='login_input_wrapment'>
                <div className='login_input_wrapper'>
                  <BiUser color='white' size={27} ></BiUser>
                  <input 
                    className='login_input_area' 
                    placeholder='email'
                    onChange={(ele)=>{
                      setEmail(ele.target.value);
                    }}
                  ></input>
                </div>
              </div>
              <div className='login_input_wrapment'>
                <div className='login_input_wrapper'>
                  <BiKey color='white' size={27}></BiKey>
                  <input 
                    type={(showPassword) ? 'text' : 'password'} 
                    className='login_input_area' 
                    placeholder='password'
                    onChange={(e)=>{
                      setPassword(e.target.value);
                    }}
                  ></input>
                  {(showPassword) ? 
                  <FaEyeSlash size={27} color='white' onClick={()=>setShowPassword(!showPassword)}></FaEyeSlash> : 
                  <FaEye size={27} color='white' onClick={()=>setShowPassword(!showPassword)}></FaEye>}
                </div>
              </div>
            </div>
            <div id='login_buttons'>
              {(loginError) && 
              <div className='login_input_error'>
                {loginError}
              </div>}
              <button className='session_button' onClick={async()=>{
                if(showLoginLoader) return null;
                await login()
              }}>
                {(showLoginLoader) 
                ? <div className='loader'></div> : "Login"}
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
                }}>Not have an account ?</div>
                <div style={{
                  flex:1,
                  height:'1px',
                  backgroundColor:'white'
                }}></div>
              </div>
              <button className='session_button' onClick={()=>{
                navigation("/signup")
              }}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login