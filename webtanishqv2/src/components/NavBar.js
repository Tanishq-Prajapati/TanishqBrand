import "./NavBar.css"
import {BiLogoGmail} from "react-icons/bi"

const NavBar = ()=>{
    return (
        <div id="navBarWrapper">
            <div id="logo">
                Tanishq
            </div>
            <div id="navBarComps">
                <div className="navBarNavigs">
                    Home
                </div>
                <div className="navBarNavigsDot">
                ●
                </div>
                <div className="navBarNavigs">
                    About
                </div>
                <div className="navBarNavigsDot">
                ●
                </div>
                <div className="navBarNavigs">
                    Services
                </div>
                <div className="navBarNavigsDot">
                ●
                </div>
                <div className="navBarNavigs">
                    contact us
                </div>
            </div>
            <div id="nav_mail">
                <button className="gbutton">
                    <BiLogoGmail style={{
                        marginRight:'7px',
                        marginLeft:'7px'
                    }} size={30}>
                    </BiLogoGmail>
                </button>
            </div>
        </div>
    )
}

export {
    NavBar
}