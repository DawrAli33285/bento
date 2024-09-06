import { useEffect ,useState} from "react";
import chnglog from "./images/chnglog.png"
import clog from "./images/clog.png"
import bentoupdate from "./images/bentoupdate.png"
import { useNavigate } from "react-router-dom";
export default function ChangeLog() {
    let [currentUSer,setCurrentUser]=useState("")
    let navigate=useNavigate();
    useEffect(() => {
        const videoElement = document.getElementById('myVideo');
        if (videoElement) {
            videoElement.muted = true;
            videoElement.autoplay = true;
        }
    }, []);
    useEffect(()=>{
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
setCurrentUser(JSON.parse(localStorage.getItem('user')))
    },[])
    return (
        <div className="w-full flex lg:flex-row h-full flex-col lg:p-[64px] p-[24px] lg:gap-[10rem] overflow-auto">
           
             <div style={{zIndex:10}} className="absolute cursor-pointer" >
          <svg onClick={()=>{
            navigate(-1)
          }} width={33} height={33} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 17L3 12M3 12L8 7M3 12H21" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div> 
           
            <div  className="py-10 lg:w-[40%] w-full h-full flex flex-col gap-[10px] justify-between lg:sticky lg:top-0">
                <div>
                    <div className="w-[120px] h-[120px] rounded-[100%] lg:w-[184px] lg:h-[184px]">
                        <img src="https://creatorspace.imgix.net/users/clb3hlg1o0006l308teslae6x/2Lj9qx6f5z9kdXtM-avatar.png?w=300&h=300" className="w-full h-full object-cover rounded-[100%]" />
                    </div>
                    <p className="font-bold lg:text-[36px] text-[24px]">Changelog </p>
                    <p className="text-[16px] text-[#565656]">New updates and improvements to Bento ✨🥳</p>
                    <p className="text-[16px] text-[#565656]">🔎 Search: Use CTRL+F</p>
                    <p className="text-[16px] text-[#565656]">💌 Help? support@bento.me</p>
                </div>
                <div className="flex gap-[6px] items-center">
                {localStorage?.getItem('user')? <div className="flex gap-[6px] items-center">
  <div
    onClick={() => {
      navigate(`/create-bento/${currentUSer?.userName}`);
    }}
    style={{ borderRadius: '50%' }}
    className="flex space-x-2 cursor-pointer"
  >
    <img
      style={{ borderRadius: '50%' }}
      className="w-[2rem] h-[2rem]"
      src={currentUSer?.picURL}
    />
    <span className="flex items-center justify-center text-center">My Bento</span>
  </div>

  {/* Create div here */}
  <div className="flex space-x-2">
  <span>|</span>
  <a href="https://bento.me/explore">
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.87868 9.87869L15.5355 8.46448L14.1213 14.1213L8.46446 15.5355L9.87868 9.87869Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

  </a>
   <a href="https://discord.com/invite/8rJvDWaSz7">
    <svg width="25" height="25" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="m68 138-8 16c-10.19-4.246-20.742-8.492-31.96-15.8-3.912-2.549-6.284-6.88-6.378-11.548-.488-23.964 5.134-48.056 19.369-73.528 1.863-3.334 4.967-5.778 8.567-7.056C58.186 43.02 64.016 40.664 74 39l6 11s6-2 16-2 16 2 16 2l6-11c9.984 1.664 15.814 4.02 24.402 7.068 3.6 1.278 6.704 3.722 8.567 7.056 14.235 25.472 19.857 49.564 19.37 73.528-.095 4.668-2.467 8.999-6.379 11.548-11.218 7.308-21.769 11.554-31.96 15.8l-8-16m-68-8s20 10 40 10 40-10 40-10"></path><ellipse cx="71" cy="101" fill="#000000" rx="13" ry="15"></ellipse><ellipse cx="121" cy="101" fill="#000000" rx="13" ry="15"></ellipse></g></svg>

   </a>
  </div>
</div>
:<div className="flex gap-[6px] items-center">
                    <a href="/create-bento/:userName" className="font-bold text-white text-[12px] rounded-[6px] flex items-center py-[8px] px-[10px] bg-[#768CFF]">
                        <svg width="16" height="16" className="mr-2 s-[20px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.24789 16.2975C1.0066 15.326 0.38595 14.8403 0.153411 14.2802C0.0510949 14.0338 -4.199e-05 13.7778 2.587e-08 13.5218V10.3914H0.782609V11.9467C1.12511 11.6256 1.60265 11.2518 2.24789 10.7469L8.45378 5.89008C9.69507 4.91863 10.3157 4.43291 11.0314 4.25092C11.6609 4.09084 12.3391 4.09084 12.9686 4.25092C13.6843 4.43291 14.3049 4.91863 15.5462 5.89007L15.5462 5.89008L21.7521 10.7469L21.7521 10.7469L21.7521 10.7469C22.3974 11.2519 22.8749 11.6256 23.2174 11.9467V10.3914H24V13.5218H24C24 13.7778 23.9489 14.0338 23.8466 14.2802C23.614 14.8403 22.9934 15.326 21.7521 16.2974L21.7521 16.2975L15.5462 21.1542C14.3049 22.1257 13.6843 22.6114 12.9686 22.7934C12.3391 22.9535 11.6609 22.9535 11.0314 22.7934C10.3157 22.6114 9.69507 22.1257 8.45378 21.1542L2.24789 16.2975Z" fill="#DBDBDB"></path><path d="M2.24789 13.1666C1.0066 12.1952 0.38595 11.7094 0.153411 11.1493C-0.0511369 10.6567 -0.0511369 10.1259 0.153411 9.63327C0.38595 9.07317 1.0066 8.58745 2.24789 7.616L8.45378 2.75922C9.69507 1.78777 10.3157 1.30205 11.0314 1.12006C11.6609 0.95998 12.3391 0.95998 12.9686 1.12006C13.6843 1.30205 14.3049 1.78777 15.5462 2.75922L21.7521 7.616C22.9934 8.58745 23.614 9.07317 23.8466 9.63327C24.0511 10.1259 24.0511 10.6567 23.8466 11.1493C23.614 11.7094 22.9934 12.1952 21.7521 13.1666L15.5462 18.0234C14.3049 18.9948 13.6843 19.4806 12.9686 19.6625C12.3391 19.8226 11.6609 19.8226 11.0314 19.6625C10.3157 19.4806 9.69507 18.9948 8.45378 18.0234L2.24789 13.1666Z" fill="white"></path><path d="M9.34033 7.15345C8.71969 6.66772 8.40936 6.42486 8.29309 6.14481C8.19082 5.89847 8.19082 5.63312 8.29309 5.38678C8.40936 5.10673 8.71969 4.86387 9.34033 4.37814L10.2269 3.68432C10.8475 3.1986 11.1579 2.95573 11.5157 2.86474C11.8305 2.7847 12.1695 2.7847 12.4843 2.86474C12.8421 2.95573 13.1525 3.1986 13.7731 3.68432L14.6597 4.37814C15.2803 4.86387 15.5906 5.10673 15.7069 5.38678C15.8092 5.63312 15.8092 5.89847 15.7069 6.14481C15.5906 6.42486 15.2803 6.66772 14.6597 7.15345L13.7731 7.84727C13.1525 8.333 12.8421 8.57586 12.4843 8.66685C12.1695 8.74689 11.8305 8.74689 11.5157 8.66685C11.1579 8.57586 10.8475 8.333 10.2269 7.84727L9.34033 7.15345Z" fill="#FF8686"></path><path d="M15.2507 11.779C14.6301 11.2932 14.3197 11.0504 14.2035 10.7703C14.1012 10.524 14.1012 10.2586 14.2035 10.0123C14.3197 9.73224 14.6301 9.48937 15.2507 9.00365L16.1373 8.30982C16.7579 7.8241 17.0682 7.58124 17.4261 7.49025C17.7408 7.4102 18.0799 7.4102 18.3947 7.49025C18.7525 7.58124 19.0628 7.8241 19.6835 8.30982L20.57 9.00365C21.1907 9.48937 21.501 9.73224 21.6173 10.0123C21.7195 10.2586 21.7195 10.524 21.6173 10.7703C21.501 11.0504 21.1907 11.2932 20.57 11.779L19.6835 12.4728C19.0628 12.9585 18.7525 13.2014 18.3947 13.2924C18.0799 13.3724 17.7408 13.3724 17.4261 13.2924C17.0682 13.2014 16.7579 12.9585 16.1373 12.4728L15.2507 11.779Z" fill="#5AFF88"></path><path d="M3.42996 11.779C2.80932 11.2932 2.49899 11.0504 2.38272 10.7703C2.28045 10.524 2.28045 10.2586 2.38272 10.0123C2.49899 9.73224 2.80932 9.48937 3.42996 9.00365L4.31652 8.30982C4.93717 7.8241 5.24749 7.58124 5.60533 7.49025C5.9201 7.4102 6.25916 7.4102 6.57393 7.49025C6.93177 7.58124 7.24209 7.8241 7.86274 8.30982L14.6597 13.6292C15.2803 14.1149 15.5906 14.3577 15.7069 14.6378C15.8092 14.8841 15.8092 15.1495 15.7069 15.3958C15.5906 15.6759 15.2803 15.9187 14.6597 16.4045L13.7731 17.0983C13.1525 17.584 12.8421 17.8269 12.4843 17.9179C12.1695 17.9979 11.8305 17.9979 11.5157 17.9179C11.1579 17.8269 10.8475 17.584 10.2269 17.0983L3.42996 11.779Z" fill="#768CFF"></path></svg>
                        Create Your Bento</a>
                    <a href="/login" className=" text-[#565656] text-[12px] rounded-[6px] flex items-center py-[8px] px-[10px] ">
                        Login</a>
                    <span className="flex items-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6" stroke="#8E8E8E" stroke-width="2"></circle><path d="M6.22695 6.84827L5.68089 9.57858C5.59287 10.0187 5.98088 10.4067 6.42096 10.3187L9.15128 9.7726C9.4625 9.71035 9.70577 9.46708 9.76801 9.15587L10.3141 6.42555C10.4021 5.98546 10.0141 5.59746 9.574 5.68547L6.84368 6.23154C6.53246 6.29378 6.28919 6.53705 6.22695 6.84827Z" fill="#8E8E8E"></path></svg>
                    </span>
                </div>}

                </div>

            </div>
            <div className="w-full h-full lg:w-[60%] flex flex-col">
                <div className="w-full flex flex-col gap-[20px]">
                    <h2 className="font-bold text-[14px]">May 16th: Widget Suggestions 🌟</h2>
                    <div className="w-full flex lg:flex-row flex-col gap-[20px]">
                        <div className="w-full lg:w-[50%] rounded-[20px] shadow-md">
                            <video className="rounded-[20px]" id="myVideo" src="https://storage.googleapis.com/creatorspace-public/users%2Fcle4l1e9c0003i20yqkr46lwf%2FhwEyWlOtmQ5vS8DL-widgetsuggestionsvideo.mp4" muted />
                        </div>
                        <div className="w-full lg:w-[50%] grid grid-cols-2 gap-[10px]">
                            <div className="w-full h-full">
                                <img src="https://creatorspace.imgix.net/users/cle4l1e9c0003i20yqkr46lwf/uiyD9rK0uVEKPZi9-Photo%25201x1-3.png?w=750&h=750" className="w-full h-full" />
                            </div>
                            <div className="w-full h-full">
                                <img src="https://creatorspace.imgix.net/users/cle4l1e9c0003i20yqkr46lwf/5zmrtUfPfwd8W8xc-Photo%25201x1-1.png?w=750&h=750" className="w-full h-full" />
                            </div>
                            <div className="w-full h-full">
                                <img src="https://creatorspace.imgix.net/users/cle4l1e9c0003i20yqkr46lwf/u0wfWbnksXBb0Ywj-Photo%25201x1-2.png?w=750&h=750" className="w-full h-full" />
                            </div>
                            <div className="w-full h-full">
                                <img src="https://creatorspace.imgix.net/users/cle4l1e9c0003i20yqkr46lwf/dmrlZEQTqWixtFKH-Photo%25201x1.png?w=750&h=750" className="w-full h-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[20px] mt-[40px]">
                    <h2 className="font-bold text-[14px]">May 9th: Image and Video Cropping 🖼 🎥 ✂️</h2>
                    <div className="w-full flex lg:flex-row flex-col gap-[20px]">
                        <div className="w-full lg:w-[50%] h-full">
                            <img src={chnglog} className="w-full h-full" />
                        </div>
                        <div className="w-full lg:w-[50%] h-full">
                            <span className="bg-white w-full h-full rounded-[20px] shadow-md hover:cursor-pointer block border-[1px] border-[#CFCFCF]">

                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[20px] mt-[40px]">
                    <h2 className="font-bold text-[14px]">May 2nd: Bento Profile Views 👀🔎 </h2>
                    <div className="w-full flex lg:flex-row flex-col gap-[20px]">
                        <div className="w-full lg:w-[50%] h-full">
                            <span className="bg-white w-full h-full rounded-[20px] shadow-md hover:cursor-pointer block border-[1px] border-[#CFCFCF]">

                            </span>
                        </div>
                        <div className="w-full lg:w-[50%] h-full">
                            <img src={clog} className="w-full h-full" alt="img" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[20px] mt-[40px]">
                    <h2 className="font-bold text-[14px]">April 25th: Upgraded Adding Experience ✨ RIP little Add-Button 🪦</h2>
                    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-[20px]">
                        <div className="w-full  h-full flex flex-col justify-center items-center gap-[30px] text-white bg-[#f9aa3a] rounded-[20px] p-[20px]">
                            <p>😍👋🏻🔗🌅📝🗺✨</p>
                            <p><strong>Say hi to our shiny new widget bar</strong></p>

                        </div>
                        <div className="w-full  flex flex-col gap-[40px] ">
                            <div className="w-full h-[175px] rounded-[20px] p-[20px] shadow-md border-[1px] flex flex-col border-[#CFCFCF] gap-[20px]">
                                <p>But we didn't stop there 🥳 </p>
                                <p>New widgets will now get added where you see them 👇🏼</p>

                            </div>
                            <div className="w-full h-[175px] rounded-[20px] p-[20px] shadow-md border-[1px] flex flex-col border-[#CFCFCF] gap-[20px] hover:cursor-pointer">


                            </div>
                        </div>
                        <div className="w-full h-[175px] rounded-[20px] p-[20px] shadow-md border-[1px] flex flex-col border-[#CFCFCF] gap-[20px] hover:cursor-pointer">


                        </div>
                        <div className="grid grid-cols-2 gap-[20px]">
                            <div className="flex flex-col rounded-[20px]  gap-[20px] items-center justify-center p-[20px] bg-[#4bc1aa]">
                                <p className="text-white font-bold">Before 😮‍💨 ⤴️</p>
                            </div>
                            <div className="flex flex-col rounded-[20px]  gap-[20px] items-center justify-center p-[20px] bg-[#70bce9]">
                                <p className="text-white font-bold">After 🥳 ⤴️</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[20px] mt-[40px]">
                    <h2 className="font-bold text-[14px]">April 20th 2023: Bento Community Resources 🎨 🙌🏼</h2>
                    <div className="w-full flex lg:flex-row flex-col gap-[20px]">
                        <div className="w-full lg:w-[50%]">
                            <div className="w-full  flex flex-col gap-[40px] ">
                                <div className="w-full h-[175px] rounded-[20px]  shadow-md border-[1px] flex flex-col border-[#CFCFCF] gap-[20px]">

                                    <img src="https://creatorspace.imgix.net/users/cle4l1e9c0003i20yqkr46lwf/URqSedOd2pJD8Oiu-launch%2520image.jpg?w=750&h=750" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-full bg-[#e487d7] h-[175px] rounded-[20px] p-[20px] shadow-md border-[1px] flex flex-col border-[#CFCFCF] gap-[20px] hover:cursor-pointer">
                                    <p className="text-white font-bold">👆🏼 Use beautiful custom widgets created by the Bento community  </p>


                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-[50%] h-full">
                            <div className="w-full h-full hover:cursor-pointer rounded-[20px] p-[20px]  shadow-md border-[1px] flex flex-col border-[#CFCFCF] gap-[20px]">
                                <img src={bentoupdate} className="w-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[20px] mt-[40px]">
                    <h2 className="font-bold text-[14px]">April 18th 2023: Linkable Media Widgets 🤩🔗</h2>
                    <div className="w-full flex lg:flex-row flex-col gap-[20px]">

                        <div className="w-full lg:w-[50%]">
                            <div className="w-full lg:h-[60%] hover:cursor-pointer rounded-[20px]   shadow-md border-[1px] flex flex-col border-[#CFCFCF] gap-[20px]">
                                <img src="https://creatorspace.imgix.net/users/cle4l1e9c0003i20yqkr46lwf/weTogpIizjnsmLFS-IG%2520Launch%2520Post.jpg?w=750&h=750" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="w-full lg:w-[50%]">
                            <div className="w-full  flex flex-col gap-[40px] ">
                                <div className="w-full h-[175px] rounded-[20px]  shadow-md border-[1px] flex flex-col border-[#CFCFCF] gap-[20px]">

                                </div>
                                <div className="w-full bg-[#2768b1] rounded-[20px] p-[20px] justify-center items-center shadow-md border-[1px] flex flex-col border-[#CFCFCF] gap-[20px] ">
                                    <p className="text-white font-bold text-center">Images, videos, GIFs, and notes can now link out to your favorite sites 🤩🔗</p>
                                    <p className="text-white font-bold text-center">You can take your Bento to the next level and make it truly unique. </p>
                                    <p className="text-white font-bold text-center">The possibilities are now limitless - unleash your creativity!</p>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-[20px] my-[40px] pb-[40px]">
                    <h2 className="font-bold text-[14px]">Get to know us! 😍👋🏻🍱</h2>
                    <div className="w-full lg:w-[50%] hover:bg-[#cfcfcf88] p-[20px] hover:cursor-pointer rounded-[20px]   shadow-md border-[1px] flex flex-col border-[#CFCFCF]">
                        <div className="w-full h-[50%] flex flex-col gap-[2px]">
                            <img src="https://storage.googleapis.com/creatorspace-public/sites%2Ffavicons%2FaHR0cHM6Ly9jcmVhdG9yc3BhY2UuaW1naXgubmV0L3VzZXJzL2NsYjNobGcxbzAwMDZsMzA4dGVzbGFlNngvMkxqOXF4NmY1ejlrZFh0TS1hdmF0YXIucG5nP3c9MjAwJmg9MjAwJmZpdD1jcm9w.jpeg" className="rounded-[10px] w-[40px] h-[40px]" />
                            <p className="text-[14px]">About Us</p>
                            <p className="text-[12px] text-[#CFCFCF]">bento.me</p>
                        </div>
                        <div className="w-full h-[50%]">
                            <img src="https://creatorspace.imgix.net/sites/ogimages/aHR0cHM6Ly9hcGkuYmVudG8ubWUvdjEvb2cvYWJvdXR1cz92PTQ3OTIxOA==.jpeg?width=600&height=600" className="w-full h-full object-cover rounded-[20px] border border-[#CFCFCF]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}