import { useEffect, useState } from "react";
import "../form.css";
import { BASE_URL } from "../baseURL";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { useAnimation,motion } from "framer-motion";
const getRandomValue = (min, max) => Math.random() * (max - min) + min;
export default function Register({setRegister}){
    const [makelink,setMakelink] = useState(true);
    const [isNameValid,setIsNameValid] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError]=useState("")
    const [state,setState]=useState({
        userName:'',
        email:'',
        password:''
    })
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handlelink = async(e)=>{
      setError("")
      setIsNameValid(true)
        try{
let response=await axios.get(`${BASE_URL}/validate-userName/${e.target.value}`)

setState({
    ...state,
    userName:e.target.value
})
        }catch(e){
         if(e?.response?.data?.error){
setError(e?.response?.data?.error)
         }
        }
      
    }
    let navigate=useNavigate();
const registerNow=async()=>{
    if(state.password.length==0){
        toast.error("Please enter password")
        return;
    }else if(state.password.length<3){
        toast.error("Please enter atleast 6 characters password")
        return;
    }
    try{
let response=await axios.post(`${BASE_URL}/register`,state)
console.log(response.data)
navigate(`/create-bento/${state.userName}`)
    }catch(e){
if(e?.response?.data?.error){
toast.error(e?.response?.data?.error)
}
    }
}

useEffect(() => {
    const initClient = () => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: '87856424688-nhil5aauafjgorqfrnt432sf2gg66a4k.apps.googleusercontent.com',
          scope: 'profile email',
          redirect_uri: 'https://bento-black.vercel.app'
        }).then(() => {
          console.log('GAPI client initialized');
        }).catch((error) => {
          console.error('Error initializing GAPI client:', error);
        });
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

const socialRegister=async()=>{
    try{
        const auth2 = gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      console.log('User signed in:', googleUser.getBasicProfile());
      console.log('ID Token:', googleUser.getAuthResponse().id_token);
    let email= googleUser?.getBasicProfile()?.cu
    const accessToken = googleUser.getAuthResponse().access_token;

    const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=photos', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      });
      const data = await response.json();
      const profilePic = data.photos?.[0]?.url; 


let responsetwo=await axios.post(`${BASE_URL}/socialRegister`,{email,userName:state.userName,profilePic})
navigate(`/create-bento/${state.userName}`)
}catch(e){
        if(e?.response?.data?.error){
            toast.error(e?.response?.data?.error)
            }else{
                toast.error("Client error please try again")
            }
    }
}

const controls1 = useAnimation();
const controls2 = useAnimation();
const controls3 = useAnimation();
const controls4 = useAnimation();
const controls5 = useAnimation();
const controls6 = useAnimation();
const controls7 = useAnimation();
const controls8= useAnimation();
useEffect(() => {
    controls1.start({
        x: getRandomValue(-30, 30),
        y: getRandomValue(-20, 20),
        rotate: getRandomValue(-10, 10),
        transition: { duration: 3.5, repeat: Infinity, repeatType: "reverse" },
    });
    controls2.start({
        x: getRandomValue(-40, 40),
        y: getRandomValue(-30, 30),
        rotate: getRandomValue(-15, 15),
        transition: { duration:3.5, repeat: Infinity, repeatType: "reverse" },
    });
    controls3.start({
        x: getRandomValue(-35, 35),
        y: getRandomValue(-25, 25),
        rotate: getRandomValue(-12, 12),
        transition: { duration: 3.5, repeat: Infinity, repeatType: "reverse" },
    });
    controls4.start({
        x: getRandomValue(-45, 45),
        y: getRandomValue(-35, 35),
        rotate: getRandomValue(-18, 18),
        transition: { duration: 3.5, repeat: Infinity, repeatType: "reverse" },
    });
    controls5.start({
        x: getRandomValue(-30, 30),
        y: getRandomValue(-40, 40),
        rotate: getRandomValue(-14, 14),
        transition: { duration: 3.5, repeat: Infinity, repeatType: "reverse" },
    });
    controls6.start({
        x: getRandomValue(-40, 40),
        y: getRandomValue(-30, 30),
        rotate: getRandomValue(-16, 16),
        transition: { duration: 3.5, repeat: Infinity, repeatType: "reverse" },
    });
    controls7.start({
        x: getRandomValue(-35, 35),
        y: getRandomValue(-25, 25),
        rotate: getRandomValue(-13, 13),
        transition: { duration: 3.5, repeat: Infinity, repeatType: "reverse" },
    });
    
    controls8.start({
        x: getRandomValue(-15, 35),
        y: getRandomValue(-35, 25),
        rotate: getRandomValue(-13, 13),
        transition: { duration: 3.5, repeat: Infinity, repeatType: "reverse" },
    });
    
}, []);




    return (
        <>
        <ToastContainer/>
        <div className="lg:grid lg:grid-cols-2 flex w-full lg:p-[25px] gap-[60px]">
        <div style={{zIndex:10}} className="absolute cursor-pointer" >
          <svg onClick={()=>{
            setRegister(true)
          }} width={33} height={33} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 17L3 12M3 12L8 7M3 12H21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div> 
            {
                makelink ? <div className="py-10 flex flex-col lg:gap-10 gap-5">
                    <div className="flex flex-col">
                        <h1 className="text-[32px] font-semibold">First, claim your unique link</h1>
                        <h2 className="text-[20px] font-[400] mt-[10px] text-gray-500">The good ones are still available!</h2>
                    </div>
                    <div className="form flex flex-col gap-4">
                        <div className="inputfields grid grid-cols-1 gap-[20px] items-center">
                            <span className="inputfieldcontainer rounded-[8px] p-[12px] bg-[#f7f7f7]">
                                <span className="py-[5px] text-[14px] text-[#6c6c6c6c]">
                                    bento.me/
                                </span>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="py-[5px] w-[100%]"
                                    onChange={handlelink}
                                    />
                            </span>
                        </div>

                    {error?.length>0?<p>
                        {error}
                    </p>:<button
                            className={`w-full p-[10px] flex justify-center items-center text-white font-500 gap-[10px] rounded-[10px] shadow-md hover:cursor-pointer ${isNameValid
                                ? "bg-black"
                                : "bg-black opacity-60 cursor-not-allowed"
                            }`}
                         
                            style={{ pointerEvents: isNameValid ? "auto" : "none" }}
                            onClick={()=>{setMakelink(false)}}
                            >
                            Grab My Link
                        </button>}
                    </div>
                </div> : <div className="py-10 flex flex-col lg:gap-10 gap-5">
                    <div className="flex flex-col">
                        <h2 className="text-[20px] font-[400] mt-[10px] text-gray-500">Good to have you back!</h2>
                        <h1 className="text-[32px] font-semibold">bento.me/{state.userName} is yours!</h1>
                    </div>
                    <div className="form flex flex-col">
                        <div className="inputfields grid lg:grid-cols-2 grid-cols-1 gap-[20px] items-center">
                            <span className="inputfieldcontainer rounded-[8px] p-[12px] bg-[#f7f7f7]">
                                <input
                                required="true"
                                type="email"
                                placeholder="Email address"
                                className="py-[5px] w-[100%]"
                                value={state.email}
                                onChange={(e)=>{
                                    setState({
                                        ...state,
                                        email:e.target.value
                                    })
                                }}
                                />
                            </span>
                            <span className="inputfieldcontainer rounded-[8px] flex items-center justify-between p-[12px] bg-[#f7f7f7]">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="py-[5px] w-[100%]"
                                    value={state.password}
                                    onChange={(e)=>{
                                        setState({
                                            ...state,
                                            password:e.target.value
                                        })
                                    }}
                                    />
                                <span
                                    className="px-[10px] bg-white shadow-md font-[500] py-[5px] hover:cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                    >
                                    {showPassword ? "Hide" : "Show"}
                                </span>
                            </span>
                        </div>
                        <div className="my-[20px] font-bold text-[14px]">
                            OR
                        </div>
                       {state.email.length>0?<div onClick={registerNow} className="w-[full] p-[10px] flex justify-center items-center text-white font-500 gap-[10px] bg-[#000000] rounded-[10px] shadow-md hover:cursor-pointer">
                           
                            Create Account
                        </div>: <div onClick={socialRegister} className="w-[full] p-[10px] flex justify-center items-center text-white font-500 gap-[10px] bg-[#1d9bf0] rounded-[10px] shadow-md hover:cursor-pointer">
                            <svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 8.68348C16.5 8.15673 16.4523 7.65666 16.3706 7.16992H8.67383V10.177H13.0807C12.8832 11.1638 12.3042 11.9973 11.446 12.5641V14.5643H14.0752C15.6145 13.1708 16.5 11.1172 16.5 8.68348Z" fill="white"></path><path d="M8.6728 16.4997C10.8797 16.4997 12.7255 15.7796 14.0741 14.5594L11.445 12.5591C10.7094 13.0392 9.77623 13.3325 8.6728 13.3325C6.54087 13.3325 4.73589 11.9257 4.08882 10.0254H1.37793V12.0857C2.71975 14.6994 5.47831 16.4997 8.6728 16.4997Z" fill="white"></path><path d="M4.08954 10.0282C3.91926 9.54808 3.83071 9.03467 3.83071 8.50126C3.83071 7.96785 3.92607 7.45444 4.08954 6.97437V4.91406H1.37865C0.820129 5.99422 0.5 7.20773 0.5 8.50126C0.5 9.79478 0.820129 11.0083 1.37865 12.0885L4.08954 10.0282Z" fill="white"></path><path d="M8.6728 3.66714C9.8784 3.66714 10.9546 4.07386 11.806 4.86731L14.1354 2.58698C12.7255 1.29345 10.8797 0.5 8.6728 0.5C5.47831 0.5 2.71975 2.30027 1.37793 4.91399L4.08882 6.97429C4.73589 5.07401 6.54087 3.66714 8.6728 3.66714Z" fill="white"></path></svg>
                            Sign up with Google
                        </div>}
                        <span className="mt-[30px] text-[14px] hover:cursor-pointer" onClick={()=>{setRegister(true)}}>or signIn</span>
                    </div>
                </div>
            }
            <div className=" hidden xl:flex w-full justify-center">
                <div className="w-full gap-[10px] grid grid-cols-4 grid-rows-4">
                    <motion.div animate={controls1} className="first-img  row-span-2 col-span-2  rounded-[22px] border-[1px]">
                        <img src="https://bento.me/images/widgets/photo1.png" alt="" className="h-full w-full object-cover rounded-[22px]" />
                    </motion.div>
                    <motion.div animate={controls2} className="first-img    rounded-[22px] border-[1px] ">
                        <img src="https://bento.me/images/widgets/behance.png" alt="" className="h-full w-full object-cover rounded-[22px]" />
                    </motion.div>
                    <motion.div animate={controls3} className="first-img    rounded-[22px] border-[1px] ">
                        <img src="https://bento.me/images/widgets/linkedin.png" alt="" className="h-full w-full object-cover rounded-[22px]" />
                    </motion.div>
                   
                    <motion.div animate={controls4} className="first-img col-span-2 row-span-2 border-[1px]    rounded-[22px] ">
                        <img src="https://bento.me/images/widgets/dribbble.png" alt="" className="h-full w-full object-cover rounded-[22px]" />
                    </motion.div>
                    <motion.div animate={controls5} className="first-img    rounded-[22px] border-[1px] ">
                        <img src="https://bento.me/images/widgets/figma.png" alt="" className="h-full w-full object-cover rounded-[22px]" />
                    </motion.div>
                    <motion.div animate={controls6} className="first-img   row-span-2 rounded-[22px] border-[1px] ">
                        <img src="https://bento.me/images/widgets/insta.png" alt="" className="h-full w-full object-cover rounded-[22px]" />
                    </motion.div>
                    <motion.div animate={controls7} className="first-img    rounded-[22px] border-[1px] ">
                        <img src="https://bento.me/images/widgets/twitter.png" alt="" className="h-full w-full object-cover rounded-[22px]" />
                    </motion.div>
                    <motion.div animate={controls8} className="first-img col-span-2   rounded-[22px] border-[1px] ">
                        <img src="https://bento.me/images/widgets/github.png" alt="" className="h-full w-full object-cover rounded-[22px]" />
                    </motion.div>
                </div>
                
            </div>
        </div>
            </>
    );
}