import React, { useRef, useState } from 'react'
import WDlogo from "../../images/wd_logo_2.png"
import WDNav from "../../images/wd_logo.png"
import './NavBar.css'
import { BiLogoGmail, BiUser } from 'react-icons/bi'
import { useCookies } from 'react-cookie'
import { redirect, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const [navLogo, setNavLogo] = useState(WDNav);
    const navDeepRef = useRef();
    const navDeepRefTwo = useRef();
    const [cookies, setCookies, removeCookies] = useCookies(['auth']);
    const navigation = useNavigate();

    return (
        <div>
            <div id='mainNav' onMouseEnter={() => {
                setNavLogo(WDlogo)
            }} onMouseLeave={() => {
                setNavLogo(WDNav)
            }}>
                <div id='mainNavFirst'>
                    <div>
                        <img src={navLogo} style={{
                            width: '120px',
                            height: '50px',
                            transition: 'inherit',
                            transitionDuration: '2s'
                        }}></img>
                    </div>
                    <div 
                        id='mainNavSecond'
                    >
                        <BiLogoGmail 
                            size={30} 
                            id='bilogomail'
                            onClick={()=>{
                                window.location = "mailto:fireeyes634@gmail.com"
                            }}
                        ></BiLogoGmail>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default NavBar