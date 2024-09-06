import { useEffect, useState } from "react";
import "../form.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import { animate, motion ,useAnimation} from "framer-motion";
const getRandomValue = (min, max) => Math.random() * (max - min) + min;
export default function LoginForm({setRegister}) {
    const [showPassword, setShowPassword] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [state,setState]=useState({
        email:'',
        password:''
    })

    let navigate=useNavigate();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const isEmailValid = email.trim() !== "";
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const ResetPasword = () => {
        setResetPassword(true)
    }
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();
    const controls4 = useAnimation();
    const controls5 = useAnimation();
    const controls6 = useAnimation();
    const controls7 = useAnimation();
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
        
    }, []);

const loginNow=async()=>{
    if(state.password.length==0){
        toast.error("Please enter password")
        return;
    }
try{
let response=await axios.post(`${BASE_URL}/login`,state)
localStorage.setItem('user',JSON.stringify(response.data))
navigate(`/create-bento/${response?.data?.userName}`)
}catch(e){
if(e?.response?.data?.error){
toast.error(e?.response?.data?.error)
}else{
    toast.error("Client error please try again")
}
}
}

useEffect(() => {
    const initClient = () => {
      gapi.load('client:auth2', () => {
        gapi.client.init({
          clientId: '87856424688-nhil5aauafjgorqfrnt432sf2gg66a4k.apps.googleusercontent.com',
          scope: 'profile email'
        }).then(() => {
          console.log('GAPI client initialized');
        }).catch((error) => {
          console.error('Error initializing GAPI client:', error);
        });
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);


  const handleSocial = async () => {
    
    try {
      const auth2 = gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      console.log('User signed in:', googleUser.getBasicProfile());
      console.log('ID Token:', googleUser.getAuthResponse().id_token);
    let email= googleUser?.getBasicProfile()?.cu
  
    let response=await axios.post(`${BASE_URL}/socialLogin`,{email})
  
    localStorage.setItem('user',JSON.stringify(response.data))
    navigate(`/create-bento/${response?.data?.userName}`)
    } catch (error) {
        console.log("ERROR")
        console.log(error.response.data.error)
    if(error?.response?.data?.error){
      
        toast.error(error?.response?.data?.error)
    }else{
        toast.error('Client error please try again')
    }
    }
  };


  const sendReset=async(req,res)=>{
    try{
let response=await axios.post(`${BASE_URL}/resetPassword`,{email})
toast.success("Reset password link sent")
        setEmail("")
    }catch(e){
if(e?.response?.data?.error){
    toast.error(e?.response?.data?.error)
}else{
    toast.error("Server error please try again")
}
console.log(e.message)
    }
  }

    return (
        <>
              <ToastContainer />
        <div className="lg:grid lg:grid-cols-2 flex w-full lg:p-[25px]">
        <div style={{zIndex:10}} className="absolute cursor-pointer" >
          <svg onClick={()=>{
      resetPassword? setResetPassword(false):navigate(-1)
          }} width={33} height={33} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 17L3 12M3 12L8 7M3 12H21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div> 
           
            {
                resetPassword ? <div className="flex py-10 flex-col lg:gap-10 gap-5">
                    <div className="flex flex-col">
                        <h1 className="text-[32px] font-semibold">Reset Your Password</h1>
                        <h2 className="text-[20px] font-[400] mt-[10px] text-gray-500">To which email should we send the reset link?</h2>
                    </div>
                    <div className="form flex flex-col gap-4">
                        <div className="inputfields grid grid-cols-1 gap-[20px] items-center">
                            <span className="inputfieldcontainer rounded-[8px] p-[12px] bg-[#f7f7f7]">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="py-[5px] w-[100%] resetemail w-[100%]"
                                    value={email}
                                    onChange={handleEmailChange}
                                    />
                            </span>
                        </div>

                        <div
                            className={`w-full p-[10px] flex justify-center items-center text-white font-500 gap-[10px] rounded-[10px] shadow-md hover:cursor-pointer ${isEmailValid
                                ? "bg-black"
                                : "bg-black opacity-60 cursor-not-allowed"
                            }`}
                            onClick={sendReset}
                            style={{ pointerEvents: isEmailValid ? "auto" : "none" }}
                            >
                            Send Reset Link
                        </div>
                    </div>
                </div> : <div className="flex py-10 flex-col lg:gap-10 gap-5">
                    <div className="flex flex-col">
                        <h1 className="text-[32px] font-semibold">Log in to your Bento</h1>
                        <h2 className="text-[20px] font-[400] mt-[10px] text-gray-500">Good to have you back!</h2>
                    </div>
                    <div className="form flex flex-col">
                        <div className="inputfields grid lg:grid-cols-2 grid-cols-1 gap-[20px] items-center">
                            <span className="inputfieldcontainer rounded-[8px] p-[12px] bg-[#f7f7f7]">
                                <input
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
                            <span className="text-[#1d9bf0] hover:cursor-pointer underline text-[12px]" onClick={ResetPasword}>Reset Password</span>
                        </div>
                        <div className="my-[20px] font-bold text-[14px]">
                            OR
                        </div>
                  {state.email.length>0?<div onClick={loginNow} className="w-[full] p-[10px] flex justify-center items-center text-white font-500 gap-[10px] bg-[#000000] rounded-[10px] shadow-md hover:cursor-pointer">
                          Log In
                        </div>:<div onClick={handleSocial} className="w-[full] p-[10px] flex justify-center items-center text-white font-500 gap-[10px] bg-[#1d9bf0] rounded-[10px] shadow-md hover:cursor-pointer">
                            <svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 8.68348C16.5 8.15673 16.4523 7.65666 16.3706 7.16992H8.67383V10.177H13.0807C12.8832 11.1638 12.3042 11.9973 11.446 12.5641V14.5643H14.0752C15.6145 13.1708 16.5 11.1172 16.5 8.68348Z" fill="white"></path><path d="M8.6728 16.4997C10.8797 16.4997 12.7255 15.7796 14.0741 14.5594L11.445 12.5591C10.7094 13.0392 9.77623 13.3325 8.6728 13.3325C6.54087 13.3325 4.73589 11.9257 4.08882 10.0254H1.37793V12.0857C2.71975 14.6994 5.47831 16.4997 8.6728 16.4997Z" fill="white"></path><path d="M4.08954 10.0282C3.91926 9.54808 3.83071 9.03467 3.83071 8.50126C3.83071 7.96785 3.92607 7.45444 4.08954 6.97437V4.91406H1.37865C0.820129 5.99422 0.5 7.20773 0.5 8.50126C0.5 9.79478 0.820129 11.0083 1.37865 12.0885L4.08954 10.0282Z" fill="white"></path><path d="M8.6728 3.66714C9.8784 3.66714 10.9546 4.07386 11.806 4.86731L14.1354 2.58698C12.7255 1.29345 10.8797 0.5 8.6728 0.5C5.47831 0.5 2.71975 2.30027 1.37793 4.91399L4.08882 6.97429C4.73589 5.07401 6.54087 3.66714 8.6728 3.66714Z" fill="white"></path></svg>
                            Sign in with Google
                        </div>}
                        <span className="mt-[30px] text-[14px] hover:cursor-pointer" onClick={()=>{setRegister(false)}}>or signup</span>
                    </div>
                </div>
            }
            <div className=" hidden xl:flex w-full justify-center">
                <div className="max-w-[384px] gap-[10px] grid grid-cols-3 grid-rows-4">
                    <motion.div animate={controls1} className="first-img p-[22px] row-span-2 bg-[#55acee] rounded-[22px]">
                        <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="10" fill="#55ACEE"></rect><mask id="mask0_920_2751" maskUnits="userSpaceOnUse" x="8" y="10" width="24" height="20"><path d="M31.9309 10.2326H8V29.6807H31.9309V10.2326Z" fill="white"></path></mask><g mask="url(#mask0_920_2751)"><path d="M31.9309 12.5347C31.0506 12.9253 30.1043 13.1891 29.1112 13.3078C30.1248 12.7002 30.9034 11.7381 31.27 10.5915C30.3211 11.1543 29.2704 11.5628 28.152 11.7829C27.2565 10.8287 25.9806 10.2326 24.5684 10.2326C21.857 10.2326 19.6586 12.4307 19.6586 15.1421C19.6586 15.5269 19.702 15.9017 19.7858 16.261C15.7053 16.0563 12.0876 14.1016 9.66603 11.1312C9.24342 11.8563 9.00123 12.6996 9.00123 13.5994C9.00123 15.3028 9.86801 16.8056 11.1854 17.686C10.3806 17.6605 9.62356 17.4396 8.96163 17.0719C8.96107 17.0924 8.96107 17.113 8.96107 17.1337C8.96107 19.5124 10.6535 21.4967 12.8995 21.948C12.4876 22.0602 12.0538 22.1202 11.606 22.1202C11.2897 22.1202 10.9822 22.0893 10.6823 22.032C11.3071 23.9826 13.1203 25.4021 15.2688 25.4416C13.5885 26.7585 11.4716 27.5434 9.17118 27.5434C8.77489 27.5434 8.38409 27.5201 8 27.4747C10.1728 28.8679 12.7535 29.6807 15.5262 29.6807C24.5569 29.6807 29.4955 22.1995 29.4955 15.7113C29.4955 15.4985 29.4906 15.2868 29.4813 15.0761C30.4404 14.384 31.2727 13.5194 31.9309 12.5347Z" fill="white"></path></g></svg>
                    </motion.div>
                    <motion.div   animate={controls2} className="first-img p-[22px]   rounded-[22px] bg-[#ff0000]">
                        <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="10" fill="#FF0000"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M29.3766 12.5016C30.4093 12.7775 31.2225 13.5907 31.4986 14.6233L31.4985 14.6234C32 16.495 32 20.4001 32 20.4001C32 20.4001 32 24.305 31.4985 26.1768C31.2224 27.2094 30.4092 28.0225 29.3765 28.2986C27.505 28.8 19.9999 28.8 19.9999 28.8C19.9999 28.8 12.4949 28.8 10.6233 28.2986C9.59065 28.0224 8.77727 27.2094 8.50144 26.1767C8 24.3049 8 20.4 8 20.4C8 20.4 8 16.4949 8.50144 14.6233C8.77727 13.5907 9.59065 12.7775 10.6234 12.5016C12.495 12 20 12 20 12C20 12 27.5051 12 29.3766 12.5016ZM24.4429 20.6931L17.6001 24.5857V16.8L24.4429 20.6931Z" fill="white"></path></svg>
                    </motion.div>
                    <motion.div   animate={controls3} className="first-img p-[22px]   rounded-[22px] bg-[#ff90e8]">
                        <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="10" fill="#FF90E8"></rect><g clip-path="url(#clip0_920_2744)"><path d="M22.0129 32C27.5285 32 31.9998 27.5542 31.9998 22.07C31.9998 16.5857 27.5285 12.1399 22.0129 12.1399C16.4972 12.1399 12.0259 16.5857 12.0259 22.07C12.0259 27.5542 16.4972 32 22.0129 32Z" fill="black"></path><path d="M19.4355 29.9196C25.2366 29.9196 29.973 25.2387 29.973 19.4224C29.973 13.6061 25.2366 8.92513 19.4355 8.92513C13.6344 8.92513 8.89795 13.6061 8.89795 19.4224C8.89795 25.2387 13.6344 29.9196 19.4355 29.9196Z" fill="#FF90E8"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8 19.4224C8 13.0642 13.1692 8 19.4357 8C25.7023 8 30.8715 13.0642 30.8715 19.4224C30.8715 25.7807 25.7023 30.8448 19.4357 30.8448C13.1692 30.8448 8 25.7807 8 19.4224ZM19.4357 9.85033C14.1001 9.85033 9.79642 14.1481 9.79642 19.4224C9.79642 24.6968 14.1001 28.9945 19.4357 28.9945C24.7714 28.9945 29.0751 24.6968 29.0751 19.4224C29.0751 14.1481 24.7714 9.85033 19.4357 9.85033Z" fill="black"></path><path d="M18.6438 24.7183C15.6947 24.7183 13.96 22.264 13.96 19.211C13.96 16.0383 15.8682 13.4642 19.5111 13.4642C23.2698 13.4642 24.5418 16.0982 24.5997 17.5947H21.8819C21.8242 16.7566 21.1302 15.4996 19.4533 15.4996C17.6608 15.4996 16.5043 17.1158 16.5043 19.0913C16.5043 21.0667 17.6608 22.6829 19.4533 22.6829C21.0724 22.6829 21.7663 21.366 22.0555 20.0491H19.4533V18.9716H24.9134V24.4788H22.518V21.0068C22.3445 22.264 21.5928 24.7183 18.6438 24.7183Z" fill="black"></path></g><defs><clipPath id="clip0_920_2744"><rect width="24" height="24" fill="white" transform="translate(8 8)"></rect></clipPath></defs></svg>
                    </motion.div>
                    <motion.div   animate={controls4} className="first-img p-[22px] col-span-2 rounded-[22px] bg-[#ffabe7]">

                        <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="10" fill="#FFABE7"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M8 19.9978C8 13.3749 13.371 8 20 8C26.6295 8 32 13.3797 32 20.0022C32 26.6251 26.629 32 20 32H19.0266V31.9567C12.857 31.4609 8 26.2934 8 19.9978ZM20.2985 30.0493C25.7136 29.8914 30.0533 25.4509 30.0533 20.0022C30.0533 14.4532 25.5528 9.9464 20 9.9464C14.4467 9.9464 9.94675 14.4494 9.94675 19.9978C9.94675 25.5461 14.4508 30.0493 20 30.0493H20.2985Z" fill="#B8509A"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.1415 11.2064C15.0081 11.1644 14.8697 11.1208 14.7256 11.072L15.3511 9.22876C15.4085 9.24826 15.512 9.28124 15.6328 9.31976C15.8498 9.38896 16.1227 9.47599 16.2853 9.53461L16.294 9.53775L16.3027 9.54106C16.3472 9.55807 16.3948 9.5761 16.4448 9.595C16.6966 9.69024 17.0073 9.80774 17.2668 9.92909L17.2783 9.93448L17.3297 9.96018C17.4518 10.0171 17.6352 10.1045 17.7879 10.1773C17.8737 10.2182 17.9498 10.2544 17.9999 10.2781L18.0231 10.2891L18.0458 10.3013C18.051 10.3041 18.0572 10.3074 18.0642 10.3111C18.1168 10.3393 18.2149 10.3918 18.3091 10.4493L18.3349 10.4651L18.3422 10.4702C18.3528 10.4764 18.3674 10.4847 18.3854 10.4947C18.4011 10.5034 18.4162 10.5118 18.4313 10.5201C18.4343 10.5217 18.4373 10.5233 18.4402 10.525C18.4485 10.5296 18.458 10.5348 18.4665 10.5395L18.4671 10.5398C18.4714 10.5423 18.4824 10.5484 18.4952 10.5558C18.5066 10.5624 18.5243 10.5725 18.5465 10.5851C18.6141 10.6238 18.7235 10.6862 18.8251 10.7457C18.9297 10.8069 19.0894 10.9013 19.2075 10.9841C19.3341 11.0619 19.4733 11.1583 19.566 11.2225C19.5827 11.234 19.5978 11.2445 19.6112 11.2537C19.6824 11.2971 19.7522 11.3463 19.8007 11.3811C19.8701 11.4308 19.9457 11.4872 20.0147 11.539C20.0465 11.563 20.0756 11.5849 20.1031 11.6057C20.1397 11.6333 20.1735 11.6588 20.2071 11.684C20.2349 11.7047 20.258 11.7219 20.2767 11.7354C20.2859 11.7421 20.2931 11.7473 20.2985 11.7511C20.3031 11.7544 20.3053 11.7558 20.3054 11.7559L20.3307 11.7728L20.3552 11.7914C21.4295 12.6098 22.3862 13.5712 23.2028 14.6428L23.2035 14.6438L23.2043 14.6448C24.107 15.8358 24.8197 17.1579 25.314 18.5648C26.7867 22.6782 26.3536 27.4303 24.039 31.1815L22.3821 30.1596C24.3768 26.9268 24.7609 22.7929 23.4803 19.2183L23.4792 19.2154L23.4782 19.2124C23.0516 17.9972 22.4355 16.8533 21.6534 15.8213C20.9459 14.8931 20.1196 14.0618 19.195 13.3546C19.1438 13.3192 19.0871 13.2771 19.0408 13.2424C19.0057 13.2161 18.9644 13.185 18.9237 13.1543C18.8964 13.1337 18.8694 13.1133 18.8446 13.0947C18.7778 13.0444 18.7171 12.9992 18.6668 12.9632C18.622 12.9311 18.6033 12.9193 18.6035 12.9191C18.6033 12.919 18.6035 12.9191 18.6035 12.9191L18.5747 12.9029L18.5409 12.88C18.4912 12.8462 18.4469 12.8156 18.4064 12.7875C18.3173 12.7258 18.2459 12.6765 18.1735 12.6335L18.1261 12.6053L18.0821 12.572C18.0849 12.5741 18.0847 12.574 18.0808 12.5714C18.0736 12.5666 18.0536 12.5533 18.0161 12.53C17.9666 12.4993 17.906 12.4632 17.8413 12.4252C17.7494 12.3714 17.6657 12.3237 17.5995 12.2859C17.5687 12.2683 17.5416 12.2529 17.5193 12.24L17.5173 12.2388C17.5139 12.237 17.5088 12.2341 17.5013 12.23C17.4989 12.2287 17.4964 12.2273 17.4937 12.2258C17.4786 12.2176 17.4586 12.2065 17.4381 12.1951C17.4142 12.1818 17.3852 12.1655 17.357 12.1489C17.3415 12.1399 17.3127 12.123 17.2805 12.102C17.2408 12.0784 17.1983 12.0556 17.1477 12.0284C17.1469 12.028 17.1462 12.0276 17.1454 12.0271C17.0849 11.9985 17.0095 11.9626 16.9295 11.9244C16.779 11.8526 16.6119 11.773 16.496 11.7191L16.4835 11.7133L16.4312 11.6871C16.2474 11.6019 16.0273 11.5185 15.7809 11.425C15.7273 11.4047 15.6725 11.3839 15.6165 11.3626C15.4646 11.308 15.3068 11.2584 15.1415 11.2064ZM17.5193 12.24C17.5203 12.2406 17.521 12.2409 17.521 12.2409L17.5193 12.24ZM17.5193 12.24C17.5203 12.2406 17.521 12.2409 17.521 12.2409L17.5193 12.24Z" fill="#B8509A"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19.2406 15.8388C22.1784 15.3083 24.8895 13.6605 26.7437 11.3149L28.271 12.5219C26.1282 15.2325 23.0002 17.1379 19.5863 17.7542C17.8864 18.0607 16.1397 18.0711 14.4349 17.7585C12.7347 17.4555 11.0942 16.8451 9.61035 15.9541L10.6127 14.2855C11.8913 15.0534 13.3084 15.5809 14.7789 15.8427L14.7814 15.8432L14.784 15.8437C16.2499 16.1127 17.7611 16.1055 19.2406 15.8388Z" fill="#B8509A"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.0396 29.8665C15.7016 21.3858 24.3443 16.7022 31.4127 18.6287L30.9007 20.5066C24.9005 18.8712 17.39 22.8926 15.95 30.2408L14.0396 29.8665Z" fill="#B8509A"></path></svg>
                    </motion.div>
                    <motion.div   animate={controls5} className="first-img p-[22px] col-span-2 row-span-2 rounded-[22px] bg-[#ff6719] flex justify-center items-center">
                        <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="10" fill="#FF6719"></rect><path d="M9.38623 8.15842V10.9703H30.3367V8.15842H9.38623ZM9.38623 13.505V16.3564H30.3367V13.505H9.38623ZM9.38623 18.8515V31.9604C10.2425 31.7133 11.1028 31.0427 11.8813 30.6083L17.109 27.6887C17.7563 27.3276 18.4053 26.969 19.0496 26.6027C19.2602 26.483 19.6164 26.185 19.8645 26.1895C20.1089 26.194 20.4639 26.4941 20.6734 26.6138C21.2768 26.9587 21.8858 27.2968 22.4951 27.6314C24.3372 28.6431 26.158 29.6935 28.0001 30.7052C28.7124 31.0964 29.5445 31.7791 30.3367 31.9604V18.8515H9.38623Z" fill="white"></path></svg>
                    </motion.div>
                    <motion.div   animate={controls6} className="first-img p-[22px]  rounded-[22px] bg-black flex justify-center items-center">
                        <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="10" fill="black"></rect><g clip-path="url(#clip0_920_2749)"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 8C13.37 8 8 13.37 8 20C8 25.31 11.435 29.795 16.205 31.385C16.805 31.49 17.03 31.13 17.03 30.815C17.03 30.53 17.015 29.585 17.015 28.58C14 29.135 13.22 27.845 12.98 27.17C12.845 26.825 12.26 25.76 11.75 25.475C11.33 25.25 10.73 24.695 11.735 24.68C12.68 24.665 13.355 25.55 13.58 25.91C14.66 27.725 16.385 27.215 17.075 26.9C17.18 26.12 17.495 25.595 17.84 25.295C15.17 24.995 12.38 23.96 12.38 19.37C12.38 18.065 12.845 16.985 13.61 16.145C13.49 15.845 13.07 14.615 13.73 12.965C13.73 12.965 14.735 12.65 17.03 14.195C17.99 13.925 19.01 13.79 20.03 13.79C21.05 13.79 22.07 13.925 23.03 14.195C25.325 12.635 26.33 12.965 26.33 12.965C26.99 14.615 26.57 15.845 26.45 16.145C27.215 16.985 27.68 18.05 27.68 19.37C27.68 23.975 24.875 24.995 22.205 25.295C22.64 25.67 23.015 26.39 23.015 27.515C23.015 29.12 23 30.41 23 30.815C23 31.13 23.225 31.505 23.825 31.385C28.565 29.795 32 25.295 32 20C32 13.37 26.63 8 20 8Z" fill="white"></path></g><defs><clipPath id="clip0_920_2749"><rect width="24" height="24" fill="white" transform="translate(8 8)"></rect></clipPath></defs></svg>
                    </motion.div>
                    <motion.div   animate={controls7} className="first-img p-[22px]  rounded-[22px] bg-[#ffdd00] flex justify-center items-center">
                        <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="10" fill="#FFDD06"></rect><path d="M26.8709 13.5812L26.8562 13.5738L26.8195 13.5592C26.8268 13.5738 26.8489 13.5812 26.8709 13.5812Z" fill="#010202"></path><path d="M26.8712 13.574C26.864 13.574 26.864 13.574 26.8712 13.574V13.574Z" fill="#010202"></path><path d="M27.0902 15.2877L27.1196 15.273L27.1343 15.2583C27.1196 15.2657 27.1049 15.2804 27.0902 15.2877Z" fill="#010202"></path><path d="M26.9156 13.6183L26.8862 13.5889L26.8642 13.5816C26.8789 13.5963 26.8936 13.6109 26.9156 13.6183Z" fill="#010202"></path><path d="M20.0688 30.273C20.0467 30.2804 20.0247 30.295 20.01 30.3171L20.0247 30.3024C20.0467 30.2877 20.0614 30.2804 20.0688 30.273Z" fill="#010202"></path><path d="M24.0514 29.4858C24.0514 29.4638 24.0367 29.4638 24.044 29.5518C24.044 29.5445 24.044 29.5372 24.0514 29.5298C24.044 29.5225 24.044 29.5078 24.0514 29.4858Z" fill="#010202"></path><path d="M23.6343 30.273C23.6122 30.2803 23.5902 30.295 23.5755 30.317L23.5902 30.3023C23.6122 30.2876 23.6269 30.2803 23.6343 30.273Z" fill="#010202"></path><path d="M17.2708 30.4555C17.2562 30.4408 17.2341 30.4335 17.2121 30.4262C17.2267 30.4335 17.2488 30.4408 17.2561 30.4482L17.2708 30.4555Z" fill="#010202"></path><path d="M16.6496 29.8578C16.6496 29.8358 16.6422 29.8065 16.6275 29.7845C16.6349 29.8065 16.6422 29.8285 16.6496 29.8578Z" fill="#010202"></path><path d="M20.8732 19.087C20.0111 19.4589 19.0247 19.8746 17.7534 19.8746C17.22 19.8746 16.694 19.8017 16.1825 19.6558L17.0593 28.6689C17.0885 29.048 17.2639 29.3981 17.5415 29.6533C17.8192 29.9085 18.1845 30.0544 18.5644 30.0544C18.5644 30.0544 19.8138 30.12 20.2303 30.12C20.676 30.12 22.0203 30.0544 22.0203 30.0544C22.4003 30.0544 22.7656 29.9158 23.0432 29.6533C23.3209 29.3981 23.4962 29.048 23.5254 28.6689L24.468 18.7151C24.0442 18.5693 23.6204 18.4745 23.1455 18.4745C22.3126 18.4745 21.6477 18.7589 20.8732 19.087Z" fill="white"></path><path d="M13.4574 15.2514L13.4802 15.2741C13.4802 15.259 13.4726 15.2514 13.4574 15.2514Z" fill="#010202"></path><path d="M28.5297 14.4126L28.3982 13.7491C28.2813 13.1511 28.011 12.5823 27.3973 12.3708C27.2 12.3052 26.9735 12.2688 26.8274 12.1302C26.6739 11.9844 26.6301 11.7656 26.5936 11.5614C26.5278 11.1822 26.4693 10.803 26.4036 10.4238C26.3451 10.0957 26.3013 9.7311 26.1552 9.43941C25.9579 9.03835 25.5561 8.805 25.1542 8.65186C24.9496 8.57894 24.7377 8.51331 24.5259 8.45498C23.5249 8.19246 22.4728 8.09766 21.4426 8.03933C20.2078 7.9737 18.9657 7.98828 17.7309 8.09766C16.8103 8.17788 15.8459 8.27997 14.9764 8.60082C14.655 8.71749 14.3262 8.85604 14.0851 9.10397C13.7855 9.40295 13.6905 9.87694 13.9097 10.2488C14.0632 10.5186 14.3262 10.7082 14.6038 10.8322C14.9618 10.9926 15.3418 11.1166 15.729 11.1968C16.8103 11.4375 17.9209 11.525 19.0242 11.5687C20.2443 11.6198 21.4645 11.576 22.6847 11.452C22.9842 11.4156 23.2838 11.3791 23.5833 11.3354C23.934 11.2843 24.1605 10.8176 24.0582 10.5041C23.934 10.1176 23.5979 9.97174 23.2253 10.0301C23.1669 10.0374 23.1157 10.0447 23.0573 10.0519L23.0207 10.0592C22.8892 10.0738 22.765 10.0884 22.6335 10.103C22.3705 10.1322 22.1075 10.154 21.8371 10.1759C21.2453 10.2197 20.6462 10.2343 20.0471 10.2343C19.4626 10.2343 18.878 10.2197 18.2935 10.1759C18.0232 10.1613 17.7602 10.1395 17.4971 10.1103C17.3729 10.0957 17.256 10.0811 17.1391 10.0665L17.0222 10.0519H17.0003L16.8834 10.0374C16.6423 10.0009 16.4012 9.95715 16.1601 9.90611C16.1382 9.89882 16.1162 9.88423 16.1016 9.86965C16.087 9.85506 16.0797 9.82589 16.0797 9.80402C16.0797 9.78214 16.087 9.75297 16.1016 9.73839C16.1162 9.7238 16.1382 9.70922 16.1601 9.70193H16.1674C16.372 9.65817 16.5838 9.62171 16.7957 9.58525C16.8688 9.57067 16.9346 9.56338 17.0076 9.55609C17.1391 9.54879 17.2706 9.52692 17.4022 9.50504C18.5419 9.38837 19.689 9.34461 20.8361 9.38107C21.3914 9.39566 21.9467 9.43212 22.502 9.48316C22.6189 9.49775 22.7431 9.50504 22.86 9.51962C22.9038 9.52692 22.9477 9.53421 22.9988 9.53421L23.0938 9.54879C23.3641 9.58525 23.6272 9.6363 23.8975 9.69464C24.2921 9.78214 24.7962 9.81131 24.9715 10.2343C25.03 10.3728 25.0519 10.5186 25.0811 10.6645L25.1177 10.8468V10.8541C25.2127 11.2843 25.3003 11.7146 25.3953 12.1448C25.4026 12.174 25.4026 12.2104 25.3953 12.2396C25.388 12.2688 25.3734 12.3052 25.3588 12.3271C25.3369 12.3563 25.3149 12.3781 25.2857 12.3927C25.2565 12.4073 25.2273 12.4219 25.198 12.4219L25.0811 12.4365C24.9058 12.4583 24.7231 12.4802 24.5478 12.5021C24.1971 12.5386 23.8464 12.575 23.4957 12.6042C22.7942 12.6625 22.1001 12.699 21.3987 12.7209C21.0407 12.7282 20.6827 12.7354 20.3247 12.7354C18.9 12.7354 17.4825 12.6552 16.0724 12.4875C15.919 12.4729 15.7655 12.4511 15.6121 12.4292C15.729 12.4438 15.5244 12.4146 15.4879 12.4146C15.3929 12.4 15.2906 12.3854 15.1956 12.3708C14.8669 12.3198 14.5454 12.2615 14.2166 12.2104C13.822 12.1448 13.4494 12.1812 13.0914 12.3708C12.7992 12.5313 12.5653 12.7719 12.4119 13.0709C12.2585 13.3844 12.2146 13.7345 12.1416 14.0699C12.0758 14.4126 11.9662 14.7772 12.0101 15.1273C12.0977 15.8783 12.6238 16.4909 13.3837 16.6294C14.0997 16.7607 14.8157 16.8628 15.539 16.9503C18.3666 17.293 21.2307 17.3368 24.0656 17.0743C24.2994 17.0524 24.5259 17.0305 24.7597 17.0013C24.8327 16.994 24.9058 17.0013 24.9715 17.0232C25.0373 17.0451 25.1031 17.0888 25.1542 17.1399C25.2053 17.1909 25.2419 17.2493 25.2711 17.3222C25.293 17.3878 25.3076 17.4607 25.3003 17.5337L25.2273 18.2337C25.0811 19.6411 24.935 21.0485 24.7962 22.4631C24.6428 23.9434 24.4966 25.4237 24.3432 26.904C24.2994 27.3197 24.2555 27.7353 24.2117 28.151C24.1678 28.5593 24.1678 28.9823 24.0875 29.3906C23.9633 30.0251 23.5322 30.4188 22.9038 30.5647C22.3266 30.6959 21.7348 30.7616 21.143 30.7688C20.4854 30.7688 19.8279 30.747 19.1703 30.747C18.4689 30.7543 17.6067 30.6886 17.0661 30.1636C16.5912 29.7042 16.5254 28.9896 16.4596 28.3697C16.372 27.553 16.2843 26.729 16.2039 25.9123L15.4221 18.4014C15.4148 18.3504 15.4148 18.3066 15.4075 18.2556C15.371 17.9056 15.1226 17.5628 14.728 17.5774C14.3919 17.592 14.012 17.8764 14.0485 18.2556L14.275 20.4432L14.75 24.9643C14.8815 26.2477 15.0203 27.5311 15.1518 28.8218C15.181 29.0698 15.2029 29.3177 15.2322 29.5584C15.3783 30.9074 16.4085 31.6293 17.6871 31.8335C18.4324 31.9502 19.1922 31.9793 19.9521 31.9866C20.9238 32.0012 21.9029 32.0377 22.8527 31.8627C24.2628 31.6074 25.3222 30.6668 25.4757 29.201C25.5195 28.7781 25.5634 28.3552 25.6072 27.9395C25.7533 26.5467 25.8921 25.1539 26.0383 23.7538L26.7178 17.1107C26.7251 17.0086 26.7689 16.9065 26.842 16.8336C26.915 16.7607 27.0027 16.7024 27.105 16.6878C27.5068 16.6076 27.8941 16.4763 28.179 16.17C28.6028 15.6888 28.6905 15.0543 28.5297 14.4126ZM13.3471 14.8647C13.3544 14.8647 13.3398 14.9158 13.3398 14.9377C13.3325 14.9012 13.3325 14.8647 13.3471 14.8647ZM13.3837 15.1637C13.3837 15.1637 13.3983 15.171 13.4056 15.1929C13.391 15.1783 13.3837 15.1637 13.3837 15.1637ZM13.4202 15.2148C13.4421 15.2585 13.4348 15.2439 13.4202 15.2148V15.2148ZM27.0465 15.1856C26.9004 15.3241 26.6812 15.3898 26.4693 15.4189C24.0509 15.7763 21.5887 15.9586 19.1411 15.8783C17.3875 15.82 15.6559 15.6231 13.917 15.3825C13.749 15.3606 13.5663 15.3241 13.4494 15.2002C13.2302 14.9668 13.3398 14.4928 13.3983 14.2012C13.4494 13.9386 13.5517 13.5886 13.8659 13.5522C14.3481 13.4938 14.918 13.698 15.3929 13.7709C15.9701 13.8584 16.5546 13.9314 17.1318 13.9824C19.616 14.2085 22.1513 14.172 24.6208 13.8438C25.0738 13.7855 25.5195 13.7126 25.9725 13.6324C26.3744 13.5595 26.8127 13.4282 27.0539 13.8366C27.2219 14.1209 27.2438 14.4928 27.2146 14.8137C27.2146 14.9595 27.1488 15.0908 27.0465 15.1856Z" fill="#010202"></path></svg>
                    </motion.div>
                </div>

            </div>
        </div>
            </>
    );
}
