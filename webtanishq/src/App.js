import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import colors from './utility/colors';
import constants from './utility/constants';
import WDlogo from "./images/wd_logo_2.png";
import Design1 from "./images/important_design1.PNG";
import Design2 from "./images/important_design2.PNG";
import Design3 from "./images/important_design3.PNG";
import Design4 from "./images/important_design4.png";
import Des1 from "./images/design1.png";
import Des2 from "./images/design2.png";
import Des3 from "./images/design3.png";
import { BiMessage } from "react-icons/bi";
import { AiFillMessage, AiOutlineAntDesign } from "react-icons/ai";
import { IoIosCreate, IoLogoFacebook, IoLogoInstagram, IoMdChatboxes, IoMdPhonePortrait } from "react-icons/io";
import { AiOutlineTwitter, AiFillMail } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import NavBar from './screens/NavBar/NavBar';


function App() {
  const [chatBoxState, setChatBoxState] = useState(false);
  const [chatButtonHead, setChatButtonHead] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({
    top: 0,
    left: 0,
    isMouseDown: false
  });

  // setting the color-ball STYLE and cursor-outline STYLE
  const [cursorBallColor, setCursorBallColor] = useState(colors.yellow);
  const [cursorOutlineColor, setCursorOutlineColor] = useState(colors.lightYellow);

  // now adding some more things here for creating a CHAT-BOX

  const handleMouseMove = (e) => {
    setCursorPosition({
      top: e.pageY + 'px',
      left: e.pageX + 'px'
    })
  }

  const handleMouseClicked = (e) => {
    setCursorPosition({
      ...cursorPosition,
      isMouseDown: true
    })
  }

  const handleMouseUp = (e) => {
    setCursorPosition({
      ...cursorPosition,
      isMouseDown: false
    })
  }

  const [mailData, setMailData] = useState({
    subject: "",
    message: ""
  })

  // setting the color using the DOM Manipulation
  useEffect(() => {
    document.body.style.backgroundColor = '#222222';
    document.title = constants.homePageTitle;
  }, []);

  window.onscroll = function () { myFunction() };

  // function to get the height of the Body
  const getPageHeight = () => {
    let body = document.body,
      html = document.documentElement;

    let height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    return height;
  }

  function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById('myBar').style.width = scrolled + '%';
  }

  const sendMail = () => {
    // we will get the data from the states and send it from here
    console.log(mailData);
    window.location.href = `mailto:fireeyes634@gmail.com?subject=${mailData.subject}&message=${mailData.message}`
  }

  return (
    <div id='main' style={{
      filter: 'blur(0px)'
    }} onMouseMove={(e) => {
      handleMouseMove(e)
    }} onMouseDown={handleMouseClicked}>
      <div class="cursor-ball" style={{
        backgroundColor: cursorBallColor,
        top: cursorPosition.top,
        left: cursorPosition.left,
        filter: `drop-shadow(0 0 10px ${cursorBallColor}) brightness(1.5)`
      }}></div>
      <div class={
        (cursorPosition.isMouseDown) ? "cursor-outline cursor-mousedown" :
          "cursor-outline"
      } style={{
        top: cursorPosition.top,
        left: cursorPosition.left,
        backgroundColor: cursorOutlineColor
      }}></div>
      {/* <div id='chatboxWrapper'>
        <div id='chat_box' style={{
          'opacity': (chatBoxState) ? '1' : '0',
          borderRadius: (chatBoxState) ? '20px' : '100%',
          width: (chatBoxState) ? '370px' : '0px',
          height: (chatBoxState) ? '490px' : '0px'
        }} onMouseEnter={() => {
          setCursorBallColor(colors.black)
          setCursorOutlineColor(colors.lightBlack)
        }} onMouseLeave={() => {
          setCursorBallColor(colors.yellow)
          setCursorOutlineColor(colors.lightYellow)
        }}>
          <div id='chatboxhead'>
            <div id='chatboxhead_wrapper'>
              <AiFillMessage size={30}></AiFillMessage>
              <div id='chatboxhead_text'>
                <div id='chatbox_head_first'>
                  Tanishq Prajapati
                </div>
                <div id='chatbox_head_second' style={{
                  fontSize: '10px'
                }}>
                  Direct Message
                </div>
              </div>
            </div>
          </div>
          <div id='chatboxfooter'>
            <div id='chatboxfooter_wrapper'>
              <div id='chatInputWrapper'>
                <BiSolidMessageSquareDots color='white' size={20}></BiSolidMessageSquareDots>
                <textarea placeholder='Message to tanishq' type='text' id='chatInput'></textarea>
              </div>
              <button id='sendButton'>
                <IoIosSend size={30} color='white' onMouseEnter={(e) => {
                  e.target.style.color = 'black'
                }} onMouseLeave={(e) => {
                  e.target.style.color = 'white'
                }}></IoIosSend>
              </button>
            </div>
          </div>
        </div>
        <div id='chat_box_button' style={{
          gap: (chatButtonHead) ? '10px' : '0'
        }} onMouseEnter={() => {
          setChatButtonHead(true)
        }} onMouseLeave={() => {
          setChatButtonHead(false)
        }} onClick={() => {
          setChatBoxState(!chatBoxState)
        }}>
          {(!chatBoxState) ? <BiMessage size={24}></BiMessage> : <RxCross2 size={24}></RxCross2>}
          <div id='chatButtonHead' style={{
            opacity: (chatButtonHead) ? '1' : '0',
            width: (chatButtonHead) ? '100px' : '0%'
          }}>
            {(!chatBoxState) ? "START" : "CLOSE"} CHAT
          </div>
        </div>
      </div> */}
      <div id='mainDiv'>
        <div class="background-animation"></div>
        <div aria-hidden="true">
          <NavBar></NavBar>
          {/* <div id='mainDivFirst'>
            <div id='mainDivContext'>
              <div id='mainDivHead'>
                Creating the best user experiences for everyone every brand.
              </div>
              <div id='mainDivHeadSubhead'>
                A strategic experience agency crafting the brand the product the digital OutCome anybody would always going to want
              </div>
              <button className='but_global'>contact us</button>
            </div>
            <img src={WDUtil} style={{
              width:'400px',
              height:'400px'
            }}></img>
          </div>
          <div id='mainDivSecond'>
            <div id='services_back'>
              <div id='services_head'>Services</div>
            </div>
            <div id='mainDivSecondContext'>
              <div className='mainDivSecondSub'>
                <div className='mainDivSecondSubHead'>
                  <div className='mainDivSecondSubHeadLogo'>
                    <AiOutlineAntDesign size={37} color={colors.yellow} style={{
                      backgroundColor:'black',
                      marginLeft:'20px',
                      padding:'15px',
                      borderBottomLeftRadius:'10px',
                      borderBottomRightRadius:'10px'
                    }}></AiOutlineAntDesign>
                  </div>
                  <div className='mainDivSecondSubHeadText'>
                      Web Desgining
                  </div>
                </div>
                <div className='mainDivSecondSubData'>
                  Web Design is the process of creating, making, and developing websites. It includes many different features such as webpage layout, webpage content, and also graphic designs. In general web design and web development work together, but the term web design is an actual category of web development.
                </div>
              </div>
              <div className='mainDivSecondSub'>
                <div className='mainDivSecondSubHead'>
                    <div className='mainDivSecondSubHeadLogo'>
                      <IoIosCreate size={37} color={colors.yellow} style={{
                        backgroundColor:'black',
                        marginLeft:'20px',
                        padding:'15px',
                        borderBottomLeftRadius:'10px',
                        borderBottomRightRadius:'10px'
                      }}></IoIosCreate>
                    </div>
                    <div className='mainDivSecondSubHeadText'>
                        Web Development
                    </div>
                  </div>
                  <div className='mainDivSecondSubData'>
                  Web development is the work involved in developing a website for the Internet (World Wide Web) or an intranet (a private network). Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services.
                  </div>
                </div>
            </div>
          </div> */}
          <div id='mainDivThird'>
            {/* <div id='about_back'>
              <div id='about_head'>About Us</div>
            </div> */}
            <div id='about_context'>
              <div id='about_text'>
                <div id='about_head_text' style={{
                  filter: 'drop-shadow(0 0 100px #FFDE59) brightness(1)'
                }}>
                  Hello folks, i am<br></br>
                  <span>
                    Tanishq Prajapati
                  </span>
                </div>
                <div id='about_head_data'>
                  <div id='about_head_data_styler'>
                  </div>
                  <div id='about_data_para'>
                    Hello i am a proffesional experienced Web Designer and Developer
                    that has already worked on like couple of projects.
                  </div>
                </div>
              </div>
              <div id='about_contact'>
                <div className='about_contact_single'>
                  <div className='about_contact_single_first'>
                    <IoLogoFacebook
                      size={30}
                    ></IoLogoFacebook>
                  </div>
                  <div className='about_contact_single_second'>
                    <div className='about_contact_single_second_first'>
                      WEB.TANISHQ.DEV
                    </div>
                    <div className='about_contact_single_second_second'>
                      Follow me on the Facebook
                    </div>
                  </div>
                </div>
                <div className='about_contact_single'>
                  <div className='about_contact_single_first'>
                    <IoLogoInstagram
                      size={30}
                    ></IoLogoInstagram>
                  </div>
                  <div className='about_contact_single_second'>
                    <div className='about_contact_single_second_first'>
                      WEB.TANISHQ.DEV
                    </div>
                    <div className='about_contact_single_second_second'>
                      Follow me on the Instagram
                    </div>
                  </div>
                </div>
                <div className='about_contact_single'>
                  <div className='about_contact_single_first'>
                    <AiOutlineTwitter
                      size={30}
                    ></AiOutlineTwitter>
                  </div>
                  <div className='about_contact_single_second'>
                    <div className='about_contact_single_second_first'>
                      WEB.TANISHQ.DEV
                    </div>
                    <div className='about_contact_single_second_second'>
                      Follow me on the Twitter
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id='mainDivSecond'>
            <div id='services_back'>
              <div id='services_head'>Services</div>
            </div>
            <div id='services_context'>
              <div id='services_main'>
                <div id='services_main_two_head'>
                  <div style={{
                    fontSize: '90px'
                  }}>WEB</div>
                  <div>DESIGN</div>
                </div>
                <div id='services_main_wrapper'>
                  <div id='servies_main_recur_wrapper'>
                    <div id='service_main_head'>
                      Web design
                    </div>
                    <div id='service_main_data'>
                      Welcome to our web design agency, where creativity meets functionality. At our core, we specialize in crafting visually compelling and user-friendly websites that not only showcase your brand but also engage your audience effectively. With a focus on cutting-edge UI/UX design, we ensure seamless navigation and a captivating user experience. Our team of experts goes beyond aesthetics, incorporating innovative interaction design and responsive elements for a dynamic online presence.
                    </div>
                  </div>
                </div>
              </div>
              <div className='services'>
                <div className='a_service'>
                  <div className='a_service_head'>
                    UI
                  </div>
                  <div className='a_service_data'>
                    User Interface (UI) is the visual component of a website or application, encompassing design elements like buttons, menus, and navigation.
                  </div>
                </div>
                <div className='a_service'>
                  <div className='a_service_head'>
                    UX
                  </div>
                  <div className='a_service_data'>
                    User Experience (UX) extends beyond the visual aspects, delving into the overall interaction and satisfaction users derive from a website or application.                    </div>
                </div>
              </div>
            </div>
          </div>
          <div id='mainDivFive'>
            <div id='designs_back'>
              <div id='designs_head'>Designs</div>
            </div>
            <div id='designs_context'>
              <div className='designs_div_horizontal'>
                <img 
                  src={Design1} 
                  className='designs_img_hori'
                ></img>
                <div className='designs_div_horizontal_data'>
                  <div className='designs_div_horizontal_data_head'>
                    Topic Listing
                  </div>
                  <div className='designs_div_horizontal_data_para'>
                    Our web designs prioritize user experience, ensuring an interface that is both engaging and easy to navigate. Explore topics effortlessly with a design that puts your audience first.
                    Foster easy topic discovery with our thoughtfully designed interfaces. Our websites empower users to explore and engage with content effortlessly.
                  </div>
                  <div className='designs_div_horizontal_data_buts'>
                    <button 
                      className='designbutton'
                      onClick={()=>{
                        window.location = "https://tanishq-prajapati.github.io/design1"
                      }}
                    >view on browser</button>
                  </div>
                </div>
              </div>
              <div className='designs_div_vertical_wrapper'>
                <div className='designs_div_vertical'>
                  <img 
                    src={Design2} 
                    className='designs_img'
                    style={{
                      width:'100%'
                    }}
                  ></img>
                  <div className='designs_div_vertical_data'>
                    <div className='designs_div_vertical_data_head'>
                      Course Selling
                    </div>
                    <div className='designs_div_vertical_data_para'>
                      Experience the simplicity of our web design, where learners effortlessly navigate through courses, making education accessible and enjoyable.
                      Our design prioritizes an engaging visual hierarchy.
                    </div>
                    <div className='designs_div_vertical_data_buts'>
                      <button 
                        className='designbutton'
                        onClick={()=>{
                          window.location = "https://tanishq-prajapati.github.io/design2"
                        }}
                      >view on browser</button>
                    </div>
                  </div>
                </div>
                <div className='designs_div_vertical'>
                  <img 
                    src={Design3} 
                    className='designs_img'
                    style={{
                      width:'100%'
                    }}
                  ></img>
                  <div className='designs_div_vertical_data'>
                    <div className='designs_div_vertical_data_head'>
                      Portfolio
                    </div>
                    <div className='designs_div_vertical_data_para'>
                      Immerse your audience in a world of captivating visual storytelling. Our portfolio showcases designs that not only speak but resonate with your brand's unique narrative.
                      Experience the perfect blend of elegance and intuitiveness.
                    </div>
                    <div className='designs_div_vertical_data_buts'>
                      <button 
                        className='designbutton'
                        onClick={()=>{
                          window.location = "https://tanishq-prajapati.github.io/design3"
                        }}
                      >view on browser</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='designs_div_horizontal_reverse'>
                <img 
                  src={Design4} 
                  style={{
                    borderRadius:'0',
                    borderTopRightRadius:'20px',
                    borderBottomRightRadius:'20px'
                  }}
                  className='designs_img_hori'
                ></img>
                <div className='designs_div_horizontal_data'>
                  <div className='designs_div_horizontal_data_head'>
                    Topic Listing
                  </div>
                  <div className='designs_div_horizontal_data_para'>
                    Our web designs prioritize user experience, ensuring an interface that is both engaging and easy to navigate. Explore topics effortlessly with a design that puts your audience first.
                    Foster easy topic discovery with our thoughtfully designed interfaces. Our websites empower users to explore and engage with content effortlessly.
                  </div>
                  <div className='designs_div_horizontal_data_buts'>
                    <button 
                      className='designbutton'
                      onClick={()=>{
                        window.location = "https://tanishq-prajapati.github.io/design1"
                      }}
                    >view on browser</button>
                  </div>
                </div>
              </div>
            </div>
            <div id='full_view_designs' style={{
              marginTop:'100px',
              backgroundColor:'black',
              padding:'50px'
            }}>
              <div>
                <div id='main_des_text'>
                  <div id='main_des_head'>
                    Full Page Designs
                  </div>
                  <div id='main_des_para'>
                    so here are some of the full page screenshots of the above mentioned website
                    designs you can click on this Screenshots to view the full websites also
                    these stunning designs will give you the expectation of the work.
                  </div>
                </div>
              </div>
              <div style={{
                display:'flex',
                flexDirection:'row',
                gap:'40px',
                justifyContent:'center',
              }}>
                <img 
                  className='full_des' 
                  src={Des1}
                  onClick={()=>{
                    window.location = "https://tanishq-prajapati.github.io/design1"
                  }}
                ></img>
                <img className='full_des' src={Des2}></img>
                <img className='full_des' src={Des3}></img>
              </div>
            </div>
          </div>
          <div id='mainDivFour'>
            <div id='contact_back'>
              <div id='contact_head'>Contact me</div>
            </div>
            <div id='contact_context'>
              <div className='contact_div'>
                <div className='contact_div_logo'>
                  <IoMdPhonePortrait size={45}></IoMdPhonePortrait>
                </div>
                <div className='contact_div_head'>
                  BY PHONE
                </div>
                <div className='contact_div_data'>
                  <div>
                    Here is my contact number for the phone call.
                  </div>
                  <div style={{
                    color: 'yellow',
                    marginTop: '15px'
                  }}>
                    +91 93432 01630
                  </div>
                  <div style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'yellow',
                    marginBottom: '20px',
                    marginTop: '20px'
                  }}></div>
                  <div>
                    Here is my contact number for the whatsapp messaging.
                  </div>
                  <div style={{
                    color: 'yellow',
                    marginTop: '15px'
                  }}>
                    +91 93432 01630
                  </div>
                </div>
              </div>
              <div className='contact_div'>
                <div className='contact_div_logo'>
                  <AiFillMail size={45}></AiFillMail>
                </div>
                <div className='contact_div_head'>
                  SENT A MAIL
                </div>
                <div className='contact_div_data'>
                  <div>
                    Here is my gmail you can send me a mail specifying the subject as "have something to design" and in
                    the message specify the condition needs than we will set a call with you.
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: '20px',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      textTransform: 'uppercase',
                      fontFamily: 'Poppins,sans-serif',
                      marginBottom: '5px'
                    }}>
                      Email me on below gmail
                    </div>
                    <div style={{
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'yellow',
                      marginBottom: '5px'
                    }}></div>
                    <div>
                      fireeyes634@gmail.com
                    </div>
                    <button style={{
                      width: '100%',
                      height: '40px',
                      backgroundColor: 'white',
                      outline: 'none',
                      border: 'none',
                      fontFamily: 'Poppins',
                      fontWeight: '600',
                      marginTop: '20px',
                      cursor: 'pointer'
                    }} onClick={()=>{
                      window.location = "mailto:fireeyes634@gmail.com"
                    }}>
                      OR CLICK HERE
                    </button>
                  </div>
                </div>
              </div>
              <div className='contact_div'>
                <div className='contact_div_logo'>
                  <BiMessage size={45}></BiMessage>
                </div>
                <div className='contact_div_head'>
                  BY SOCIAL MEDIA
                </div>
                <div className='contact_div_data'>
                  You can message me on social media directly for the desired web designing you want from me just message me
                  on twitter, instagram, facebook.
                </div>
                <div style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'yellow',
                  marginBottom: '5px'
                }}></div>
                <div style={{
                  display: 'flex',
                  color: 'yellow',
                  width: '80%',
                  justifyContent: 'space-around'
                }}>
                  <IoLogoInstagram
                    size={40}
                    style={{
                      cursor: 'pointer'
                    }}
                  ></IoLogoInstagram>
                  <IoLogoFacebook
                    size={40}
                    style={{
                      cursor: 'pointer'
                    }}
                  ></IoLogoFacebook>
                  <AiOutlineTwitter
                    size={40}
                    style={{
                      cursor: 'pointer'
                    }}
                  ></AiOutlineTwitter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='footer_wrapper'>
        <div className='footer_data'>
          Copyright © 2024 webdevtanishq.<br></br>
          All rights reserved.
        </div>
        <div className='footer_data'>
          <div style={{
            display: 'flex',
            color: 'yellow',
            width: '80%',
            gap:'20px',
            justifyContent: 'space-around'
          }}>
            <IoLogoInstagram
              size={40}
              style={{
                cursor: 'pointer'
              }}
            ></IoLogoInstagram>
            <IoLogoFacebook
              size={40}
              style={{
                cursor: 'pointer'
              }}
            ></IoLogoFacebook>
            <AiOutlineTwitter
              size={40}
              style={{
                cursor: 'pointer'
              }}
            ></AiOutlineTwitter>
          </div>
        </div>
      </div>
      <div id='mybarBackWrapper'>
        <div id='mybarBack' style={{
          height: `5px`
        }}>
          <div id='myBar'></div>
        </div>
      </div>
    </div>
  );
}

export default App;