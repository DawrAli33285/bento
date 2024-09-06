import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import "./widgetcreator.css"
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { v4 as uuidv4 } from 'uuid';
import "react-resizable/css/styles.css";
import axios from 'axios';
import Linkcomponent from './components/Linkcomponent';
import { BASE_URL } from './baseURL';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence,motion } from 'framer-motion';
import html2canvas from 'html2canvas';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
export default function CreateBento() {
    const dropdownRef = useRef(null);
    const popupRef = useRef(null);
    const [pageTitle, setPageTitle] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [pageType, setPageType] = useState('');
    const [showsub, setShowSub] = useState(false);
    const [counter, setCounter] = useState(0);
    const [image, setImage] = useState()
    const [showPopup, setShowPopup] = useState({ type: null, visible: false });
    const [linkInput, setLinkInput] = useState('');
    const [titleInput, setTitleInput] = useState('');
    const [layout, setLayout] = useState([]);
    const [user, setUser] = useState()
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [popupType, setPopupType] = useState(null); // 'name', 'email', or 'password'
    const [popupValue, setPopupValue] = useState('');
    const [uploadedMedia, setUploadedMedia] = useState(null);
    const [screenshot, setScreenshot] = useState('');
    const [invalidUserName,setInValidUserName]=useState(false)
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: async (acceptedFiles) => {
            try {
                const file = acceptedFiles[0];
                let formdata = new FormData();
                formdata.append('image', file)
                let token = JSON.parse(localStorage.getItem('user'))
                console.log(token?.token)
                let headers = {
                    headers: {
                        authorization: `Bearer ${token?.token}`
                    }
                };
                let response = await axios.patch(`${BASE_URL}/update-profilepic`, formdata, headers)
                const reader = new FileReader();
                reader.onload = () => {
                    setImage(reader.result);
                };
                reader.readAsDataURL(file);
            } catch (e) {

            }
        }
    });
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(1200);
    const [sharePopup, setSharePopup] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const emojiTexts = [
        "Just made some major changes to my Bento and I have to say, I’m feeling pretty awesome about it. I’m sure everyone else is gonna be super jealous because I’m taking my link-in-bio game to the next level.",
        "Just updated my Bento profile and it’s so cool! Life is all about stepping out of our comfort zone, trying something new and taking a chance to make tomorrow better than today.",
        "Just updated my Bento profile and it’s so cool! Life is all about stepping out of our comfort zone, trying something new and taking a chance to make tomorrow better than today."
    ];
    const togglePopup = () => {
        setSharePopup(!sharePopup);

    };
    const handleEmojiClick = (index) => {
        setSelectedEmoji(index);
    };
    useEffect(() => {
        // Update width when the component mounts or the window resizes
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        window.addEventListener('resize', updateWidth);
        updateWidth(); // Initial call

        return () => window.removeEventListener('resize', updateWidth);
    }, []);


    const addWidget = async (type, content = null) => {

        try {
            const gridWidth = 6;


            const occupiedSpaces = layout.reduce((acc, widget) => {
                const widgetArea = [];
                for (let x = widget.x; x < widget.x + widget.w; x++) {
                    for (let y = widget.y; y < widget.y + widget.h; y++) {
                        widgetArea.push({ x, y });
                    }
                }
                return [...acc, ...widgetArea];
            }, []);


            let nextPosition = { x: 0, y: 0 };
            let found = false;

            for (let y = 0; !found; y++) {
                for (let x = 0; x < gridWidth; x++) {
                    if (!occupiedSpaces.some(space => space.x === x && space.y === y)) {
                        nextPosition = { x, y };
                        found = true;
                        break;
                    }
                }
            }

            // Set widget size based on its type
            let newWidget = {
                i: `widget-${counter}-${uuidv4()}`,
                x: nextPosition.x,
                y: nextPosition.y,
                w: type === 'text' ? 2 : 1,
                h: type === 'map' ? 10 : (type === 'image' || type === 'video' || type === 'link') ? 4 : 2,
                type: type,
                content: content,
                caption: null,
                link: '#'
            };

            console.log("Adding new widget at position:", newWidget);
            let token = JSON.parse(localStorage.getItem('user'))
            console.log(token?.token)
            let headers = {
                headers: {
                    authorization: `Bearer ${token?.token}`
                }
            };
            if (type == "link") {
                let logo = getLinkLogo(content)
                newWidget = {
                    ...newWidget,
                    logo
                }
            }

            let response = await axios.post(`${BASE_URL}/create-bento`, newWidget, headers);
            console.log("new widget")
            console.log(newWidget)
            setLayout([...layout, newWidget]);
            setCounter(counter + 1);

        } catch (error) {
            console.log(error.message)
            if (error?.response?.data?.error) {
                toast.error(error?.response?.data?.error)
            } else {
                toast.error("Clinet error please try again")
            }
        }
    };
    let navigate = useNavigate()


    const removeWidget = async (i) => {
        console.log("clicked", i)

        try {
            let response = await axios.delete(`${BASE_URL}/deleteWidget/${i}`)
            setLayout(layout.filter((item) => item.i !== i));

        } catch (e) {
            if (e?.response?.data?.error) {
                toast.error(e?.response?.data?.error)
            } else {
                toast.error("Client error please try again")
            }
        }
    };

    const handleWidgetAdd = (type) => {
        setShowPopup({ type, visible: true });
    };

    const handleLinkAdd = () => {
        if (linkInput) {
            addWidget('link', linkInput);
            setLinkInput('');
            setShowPopup({ type: null, visible: false });
        }
    };

    const handleTitleAdd = () => {
        if (titleInput) {
            addWidget('title', titleInput);
            setTitleInput('');
            setShowPopup({ type: null, visible: false });
        }
    };
    const handleTextAdd = () => {
        if (titleInput) {
            addWidget('text', titleInput);
            setTitleInput('');
            setShowPopup({ type: null, visible: false });
        }
    };
    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (file.type.startsWith('image/')) {
                    addWidget('image', reader.result);
                } else if (file.type.startsWith('video/')) {
                    addWidget('video', reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleLayoutChange = (newLayout) => {
        const updatedLayout = newLayout.map((newItem) => {
            const originalItem = layout.find(item => item.i === newItem.i);
            if (originalItem?.type === 'image' || originalItem?.type === 'video') {
                updateWidgetHeight(newItem.i);
            }
            return {
                ...newItem,
                type: originalItem?.type || null,
                content: originalItem?.content || null,
                caption: originalItem?.caption || null,

            };
        });

        setLayout(updatedLayout);
        console.log("Updated layout is", updatedLayout);
    };


    function getLinkLogo(content) {
        // Add https:// if not already present
        if (!/^https?:\/\//i.test(content)) {
            content = `https://${content}`;
        }

        try {

            const domain = new URL(content).hostname;

            return `https://www.google.com/s2/favicons?domain=${domain}`;
        } catch (error) {
            // If the URL is invalid, return the fallback SVG
            return (
                `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M14.1625 18.4876L13.4417 19.2084C11.053 21.5971 7.18019 21.5971 4.79151 19.2084C2.40283 16.8198 2.40283 12.9469 4.79151 10.5583L5.51236 9.8374" stroke="#010204" stroke-width="1.5" stroke-linecap="round"></path>
                <path d="M9.8374 14.1625L14.1625 9.8374" stroke="#010204" stroke-width="1.5" stroke-linecap="round"></path>
                <path d="M9.8374 5.51236L10.5583 4.79151C12.9469 2.40283 16.8198 2.40283 19.2084 4.79151M18.4876 14.1625L19.2084 13.4417C20.4324 12.2177 21.0292 10.604 20.9988 9" stroke="#010204" stroke-width="1.5" stroke-linecap="round"></path>
              </g>
            </svg>`
            );
        }
    }



    

    useEffect(() => {
        const fetchMyBento = async () => {
            try {
                let token = JSON.parse(localStorage.getItem('user'))

                let headers = {
                    headers: {
                        authorization: `Bearer ${token?.token}`
                    }
                };

                let response = await axios.get(`${BASE_URL}/get-bento`, headers)
                console.log("GET BENTO")
                setLayout(response.data.bento)
                console.log(response.data)
            } catch (e) {
                if (e?.response?.data?.error) {
                    toast.error(e?.response?.data?.error)
                } else {
                    toast.error("Client error please try again")
                }
            }
        }
        const fetchUserProfile = async () => {
            try {
                let token = JSON.parse(localStorage.getItem('user'))

                let headers = {
                    headers: {
                        authorization: `Bearer ${token?.token}`
                    }
                };


                let response = await axios.get(`${BASE_URL}/getProfile`, headers)

                setUser(response.data.user)
                console.log("user data is", response.data.user)
            } catch (e) {
                if (e?.response?.data?.error) {
                    toast.error(e?.response?.data?.error)
                } else {
                    toast.error("Client error please try again")
                }
            }
        }

        fetchMyBento()
        fetchUserProfile()
    }, [])



    useEffect(() => {
        const updateLayout = async () => {
            try {
                let response = await axios.patch(`${BASE_URL}/update-layout`, layout)
            } catch (e) {
                if (e?.response?.data?.error) {
                    toast.error(e?.response?.data?.error)
                } else {
                    toast.error("Client error please try again")
                }
            }
        }
        console.log("the layout is", layout)
        updateLayout();
    }, [layout])

    const handleChange = (i, newContent) => {

        setLayout(prevLayout =>
            prevLayout.map(widget =>
                widget.i === i ? { ...widget, content: newContent } : widget
            )
        );
    };

    const updateWidgetHeight = (i, scrollHeight) => {
        setLayout(prevLayout =>
            prevLayout.map(widget => {
                if (widget.i === i) {
                    const minHeight = widget.h * 30; // Minimum widget height (don't shrink below initial height)
                    const newHeight = Math.max(minHeight, scrollHeight + 20); // Ensure it never decreases
                    const updatedHeight = Math.ceil(newHeight / 30); // Convert to grid units
                    return { ...widget, h: updatedHeight };
                }
                return widget;
            })
        );
    };

    const handleCaptionChange = (i, newCaption) => {
        setLayout(prevLayout =>
            prevLayout.map(widget =>
                widget.i === i ? { ...widget, caption: newCaption } : widget
            )
        );

        // Adjust textarea and widget height immediately after content changes
        setTimeout(() => {
            const textarea = document.querySelector(`textarea[data-id='${i}']`);
            if (textarea) {
                textarea.style.height = 'auto'; // Reset height to auto to measure correctly
                textarea.style.height = `${textarea.scrollHeight}px`; // Adjust textarea height to its scroll height

                // Ensure the widget height changes as soon as the textarea exceeds one row
                updateWidgetHeight(i, textarea.scrollHeight);
            }
        }, 0);
    };

    const handleClickOutside = (event) => {
        if (
            (dropdownRef.current && !dropdownRef.current.contains(event.target) && showsub) ||
            (popupRef.current && !popupRef.current.contains(event.target) && showProfilePopup)
        ) {
            if (showsub) setShowSub(false);
            if (showProfilePopup) setShowProfilePopup(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showsub, showProfilePopup]);
    const openPopup = (type) => {
        console.log("fucking type", type)
        if (type === 'name') {
            setPopupValue(user?.userName)
        }
        else {
            setPopupValue('');
        }
        setPopupType(type);

        setShowProfilePopup(true);
    };

    const handlePopupSave =async() => {
        
        console.log(`Saving ${popupType} with value: ${popupValue}`);
     
const mouseDownEvent = new MouseEvent('mousedown', {
    bubbles: true, // Event bubbles up through the DOM
    cancelable: true, // Event can be canceled
    view: window, // The window that created the event
    clientX: 100, // X-coordinate relative to the viewport (optional)
    clientY: 200, 
  });
  
 
  document.dispatchEvent(mouseDownEvent);
        setShowProfilePopup(false);
        setShowSub(false)
      try{
        let validateUser=await axios.get(`${BASE_URL}/validate-userName/${popupValue}`)

        let token = JSON.parse(localStorage.getItem('user'))
        console.log(token?.token)
        let headers = {
            headers: {
                authorization: `Bearer ${token?.token}`
            }
        };
  
        let response=await axios.patch(`${BASE_URL}/updateProfile`,{userName:popupValue},headers)
console.log("UPDATE")
window.location.href=`/create-bento/${popupValue}`
      
      }catch(e){
if(e?.response?.data?.error){
setInValidUserName(true)
}else{
    setInValidUserName(false)
}
      }
    };
    const takeScreenshot = () => {
        html2canvas(document.documentElement).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            setScreenshot(imgData);
           
        });
    };
    useEffect(() => {
        takeScreenshot();
    }, [])

    const updateBio=async(e)=>{
try{
    let bio=e.target.value
    setUser((prev)=>{
        let old={...prev}
        return {...old,bio:e.target.value}
    })
    let token = JSON.parse(localStorage.getItem('user'))
    console.log(token?.token)
    let headers = {
        headers: {
            authorization: `Bearer ${token?.token}`
        }
    };
let response=await axios.patch(`${BASE_URL}/updateProfile`,{bio},headers)

}catch(e){
    console.log(e.message)
}
    }
    return (
        <>
            <ToastContainer />
            <div className="flex lg:flex-row flex-col gap-[20px] p-[20px] lg:p-[60px] relative h-full">
                <div className="w-full lg:w-[30%] flex-col lg:items-start items-center ">
                    <div
                        {...getRootProps()}
                        className={`hover:cursor-pointer dropzone w-[184px] h-[184px] rounded-full border-dashed border-[4px] border-[#00000014] flex items-center justify-center overflow-hidden`}
                    >
                        <input {...getInputProps()} />
                        {image || user?.picURL ? (
                            <img
                                src={image ? image : user.picURL}
                                alt="Uploaded Avatar"
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (

                            <div className="flex flex-col items-center">
                                <svg
                                    className="mb-3"
                                    width="34"
                                    height="34"
                                    viewBox="0 0 34 34"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M17 30.2222C9.69757 30.2222 3.77778 24.3024 3.77778 17C3.77778 9.69757 9.69757 3.77778 17 3.77778C24.3024 3.77778 30.2222 9.69757 30.2222 17C30.2222 24.3024 24.3024 30.2222 17 30.2222ZM0 17C0 7.61116 7.61116 0 17 0C26.3888 0 34 7.61116 34 17C34 26.3888 26.3888 34 17 34C7.61116 34 0 26.3888 0 17ZM17 9.44444C17.5316 9.44444 18.0119 9.66402 18.3551 10.0174L24.0023 15.6646C24.74 16.4023 24.74 17.5983 24.0023 18.3359C23.2647 19.0736 22.0687 19.0736 21.331 18.3359L18.8889 15.8938V22.6667C18.8889 23.7099 18.0432 24.5556 17 24.5556C15.9568 24.5556 15.1111 23.7099 15.1111 22.6667V15.8938L12.669 18.3359C11.9313 19.0736 10.7353 19.0736 9.99769 18.3359C9.26003 17.5983 9.26003 16.4023 9.99769 15.6646L15.6449 10.0174C15.9882 9.66402 16.4684 9.44444 17 9.44444Z"
                                        fill="black"
                                        fillOpacity="0.1"
                                    ></path>
                                </svg>
                                <p className="text-gray-500 font-bold">Add Avatar</p>
                            </div>
                        )}
                    </div>

                    <h1 className="text-[32px] lg:text-[44px] text-center lg:text-start font-bold mt-5">{user?.userName}</h1>
                    <input
                        type="text"
                        placeholder="Your Bio..."
                        value={user?.bio}
                        className="text-[18px] p-[10px] w-full mt-3 border border-gray-300 rounded-md lg:w-[60%] outline-none border-none"
                        onChange={updateBio}
                  />
                    <div className='flex items-center w-full lg:w-[80%]'>
                        <span onClick={() => { setShowSub(!showsub) }} ref={dropdownRef} className='relative flex items-center hover:cursor-pointer hover:bg-[#f6f6f6] rounded-[100%] p-[10px]'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="15" height="2" rx="1" fill="#ada9a9"></rect><rect y="11" width="15" height="2" rx="1" fill="#ada9a9"></rect><circle cx="10" cy="4" r="2" fill="white" stroke="#ada9a9" stroke-width="2"></circle><circle cx="6" cy="12" r="2" fill="white" stroke="#ada9a9" stroke-width="2"></circle></svg>
                            <AnimatePresence >

{showsub &&(
    <motion.span initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.3,ease:"easeInOut"}} exit={{opacity:0,scale:0}} className={` bg-white w-[200px] rounded-[20px]  flex-col gap-[6px] shadow-md p-[10px] absolute top-[-800%]`}>
    <span onClick={(e) => { e.stopPropagation(); openPopup("name") }} className='flex flex-col p-[10px] hover:cursor-pointer hover:bg-[#EFEFEF]'>
        <p className='text-[14px]'>Change UserName</p>
        <p className='text-[14px]'>{user?.userName}</p>
    </span>
    <span onClick={(e) => { e.stopPropagation(); !user?.signUpWithGoogle && openPopup("email") }} className='flex flex-col p-[10px] hover:cursor-pointer hover:bg-[#EFEFEF]'>
        <p className='text-[14px]'>Change Email</p>
        <p className='text-[14px]'>{
            user?.signUpWithGoogle ? "Signed In With google " : user?.email
        }</p>
    </span>
    <span onClick={(e) => { e.stopPropagation(); !user?.signUpWithGoogle && openPopup("password") }} className='flex flex-col p-[10px] hover:cursor-pointer hover:bg-[#EFEFEF]'>
        <p className='text-[14px]'>Change Password</p>
        <p className='text-[14px]'>
            {
                user?.signUpWithGoogle ? "Signed In With google " : "*****"
            }
        </p>
    </span>
    <span className='border-t-[1px] p-[20px] border-[#EFEFEF] hover:cursor-pointer hover:bg-[#EFEFEF]'>
        <p onClick={() => {
            localStorage.removeItem('user')
            navigate('/')
        }} className='text-[14px]'>Log Out</p>
    </span>
</motion.span>
)}
 </AnimatePresence>
 <AnimatePresence>
                           {showProfilePopup && (
                                <motion.div initial={{opacity:0,rotate:-3,x:-15}} animate={{opacity:1,x:0,rotate:0}} transition={{duration:0.3,ease:"easeInOut"}} exit={{opacity:0,scale:0}} ref={popupRef} className="z-[99999] absolute top-[-800%] left-[600%] bg-white border rounded-lg shadow-lg p-4 lg:w-[300px] w-[200px] h-[286px]">
                                    <h2 className="text-[18px] font-bold mb-2">
                                        {popupType === 'name' ? 'Change Username' : popupType === 'email' ? 'Change Email' : 'Change Password'}
                                    </h2>
                                    <p className='text-[14px]'>
                                        {popupType === 'name' ? 'Choose Username for your Bento' : popupType === 'email' ? 'Change Email' : 'Change Password'}
                                    </p>
                                    <input
                                        type={popupType === 'password' ? 'password' : 'text'}
                                        value={popupValue}
                                        onChange={(e) => {setPopupValue(e.target.value)


                                        }}
                                        className="w-full border rounded-lg p-2 mb-2"
                                        placeholder={popupType === 'password' ? 'New Password' : popupType === 'email' ? 'New Email' : 'New Username'}
                                    />
                                    <button
                                        onClick={handlePopupSave}
                                        className="bg-blue-500 text-white p-2 rounded-lg w-full mt-[20px]"
                                    >
                                        Update My User Name
                                    </button>

                                </motion.div>
                            )}
                           </AnimatePresence>
                        </span>
                        <a href='#' className='flex items-center hover:cursor-pointer hover:bg-[#f6f6f6] rounded-[100%] p-[10px]'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6" stroke="#8E8E8E" stroke-width="2"></circle><path d="M6.22695 6.84827L5.68089 9.57858C5.59287 10.0187 5.98088 10.4067 6.42096 10.3187L9.15128 9.7726C9.4625 9.71035 9.70577 9.46708 9.76801 9.15587L10.3141 6.42555C10.4021 5.98546 10.0141 5.59746 9.574 5.68547L6.84368 6.23154C6.53246 6.29378 6.28919 6.53705 6.22695 6.84827Z" fill="#8E8E8E"></path></svg>
                        </a>
                        <a href='#' className='flex items-center hover:cursor-pointer hover:bg-[#f6f6f6] rounded-[100%] p-[10px]'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5535 3.03729C12.5178 2.55271 11.4104 2.20053 10.2526 2C10.1104 2.25707 9.94428 2.60284 9.82974 2.8779C8.599 2.69281 7.37956 2.69281 6.17144 2.8779C6.05693 2.60284 5.88704 2.25707 5.74358 2C4.58454 2.20053 3.47584 2.554 2.44013 3.03985C0.351096 6.19666 -0.215208 9.27505 0.0679444 12.3098C1.45351 13.3444 2.79627 13.973 4.11639 14.3843C4.44232 13.9357 4.73303 13.4588 4.98345 12.9563C4.5065 12.7751 4.04969 12.5514 3.61805 12.2918C3.73256 12.2069 3.84457 12.1182 3.95279 12.0269C6.58546 13.2583 9.44593 13.2583 12.0472 12.0269C12.1566 12.1182 12.2686 12.2069 12.3819 12.2918C11.949 12.5527 11.4909 12.7763 11.0139 12.9576C11.2644 13.4588 11.5539 13.937 11.881 14.3855C13.2024 13.9742 14.5464 13.3457 15.932 12.3098C16.2642 8.79176 15.3644 5.74164 13.5535 3.03729ZM5.34212 10.4434C4.55181 10.4434 3.9037 9.70562 3.9037 8.80718C3.9037 7.90872 4.53798 7.16966 5.34212 7.16966C6.14628 7.16966 6.79437 7.90743 6.78054 8.80718C6.78178 9.70562 6.14628 10.4434 5.34212 10.4434ZM10.6578 10.4434C9.86748 10.4434 9.21941 9.70562 9.21941 8.80718C9.21941 7.90872 9.85365 7.16966 10.6578 7.16966C11.4619 7.16966 12.1101 7.90743 12.0963 8.80718C12.0963 9.70562 11.4619 10.4434 10.6578 10.4434Z" fill="#969696"></path></svg>
                        </a>
                        <p className='text-[#969696] my-0'>|</p>
                        <p className='my-0 ml-[10px] text-[14px] text-[#969696]'>No Views Yesterday</p>
                    </div>


                </div>
                <div className='lg:w-[70%] w-full '>
                <ResponsiveReactGridLayout
                        className="layout"
                        layout={layout}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        rowHeight={30}
                        width={containerWidth}
                        compactType="null"
                        preventCollision={false}
                        onLayoutChange={handleLayoutChange}
                    >

                        {

                            layout.map(widget => {
                                console.log("WIDGET")
                                console.log(widget)
                                console.log(layout)

                                const { i, x, y, w, h, type, content,  logo, title, caption, link } = widget;
                                console.log("Rendering widget with type:", type, "and content:", content, caption, link);
                                return (
                                    <div
                                        key={i}
                                        data-grid={{ i, x, y, w, h }}
                                        className={`box relative border rounded-[10px] overflow-visible ${(type === 'image' || type === 'video') ? 'p-0' : 'p-[12px]'}`}

                                    >
                                        {type === 'image' && content && (
                                            <div className='image-widget relative w-full h-full'>
                                                <img
                                                    src={content}
                                                    alt="User uploaded"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div
                                                    className={`absolute bottom-0 p-[10px] w-full ${caption ? 'opacity-100' : 'opacity-0 hover:opacity-100'} transition-opacity duration-300`}
                                                >
                                                    <textarea
                                                        className="w-full rounded-[20px] border-[1px] border-[#F0F0F0] p-[6px]  resize-none overflow-hidden"
                                                        onChange={(e) => handleCaptionChange(i, e.target.value)}
                                                        value={caption}
                                                        rows={1}
                                                        data-id={i}
                                                        placeholder="Add caption"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {type === 'video' && content && (
                                            <div className='image-widget relative w-full h-full'>

                                                <video
                                                    src={content}
                                                    controls
                                                    className="w-full h-full object-cover rounded-[10px]"
                                                />
                                                <div
                                                    className={`absolute bottom-0 p-[10px] w-full ${caption ? 'opacity-100' : 'opacity-0 hover:opacity-100'} transition-opacity duration-300`}
                                                >
                                                    <textarea
                                                        className="w-full rounded-[20px] border-[1px] border-[#F0F0F0] p-[6px]  resize-none overflow-hidden"
                                                        onChange={(e) => handleCaptionChange(i, e.target.value)}
                                                        value={caption}
                                                        rows={1}
                                                        data-id={i}
                                                        placeholder="Add caption"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {type === 'map' && (
                                            <div className="w-full h-full bg-gray-200">
                                                <iframe
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019692186117!2d144.96328!3d-37.816206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf0727f760fe18b0!2sFederation%20Square%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1623934389094!5m2!1sen!2sus"
                                                    width="100%"
                                                    height="100%"
                                                    style={{ border: 0 }}
                                                    allowFullScreen=""
                                                    loading="lazy"
                                                ></iframe>
                                            </div>
                                        )}
                                        {type === 'link' && (
                                            <Linkcomponent screenshot={widget?.screenshot} getLinkLogo={getLinkLogo} logo={logo} title={title} content={content} />
                                        )}
                                        {type === 'title' && (
                                            <div
                                                className={`z-[9999] w-full h-full rounded-[20px] font-bold bg-white hover:bg-[#f0f0f0]`}

                                            >
                                                <textarea
                                                    value={content}
                                                    onChange={(e) => handleChange(i, e.target.value)}
                                                    autoFocus
                                                    className="w-full h-full p-[10px] rounded-[20px] border-none bg-[#f0f0f0] outline-none resize-none"
                                                />
                                            </div>
                                        )}
                                        {type === 'text' && content && (
                                            <div
                                                className={`z-[9999] w-full h-full rounded-[20px] font-bold bg-white hover:bg-[#f0f0f0]`}

                                            >
                                                <textarea
                                                    value={content}
                                                    onChange={(e) => handleChange(i, e.target.value)}
                                                    autoFocus
                                                    className="w-full h-full p-[10px] rounded-[20px] border-none bg-[#f0f0f0] outline-none resize-none"
                                                />
                                            </div>
                                        )}


                                        <button
                                            className="remove-widget absolute top-[-20px] w-[30px] h-[30px]  justify-center items-center rounded-[100%] shadow-lg hover:bg-[#EFEFEFEF]  right-0  p-[6px] bg-white z-[9999]"
                                            onClick={() => removeWidget(i)}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 1C5.44772 1 5 1.44772 5 2C5 2.55228 5.44772 3 6 3H12C12.5523 3 13 2.55228 13 2C13 1.44772 12.5523 1 12 1H6ZM2 4C1.44772 4 1 4.44772 1 5C1 5.55228 1.44772 6 2 6H3V14C3 15.6569 4.34315 17 6 17H12C13.6569 17 15 15.6569 15 14V6H16C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H2ZM5 14V6H13V14C13 14.5523 12.5523 15 12 15H6C5.44772 15 5 14.5523 5 14Z" fill="currentColor"></path></svg>

                                        </button>
                                    </div>
                                );
                            })}

                    </ResponsiveReactGridLayout>


                </div>
                <div className='create-widget rounded-[10px] w-full shadow-2xl max-w-[500px] fixed bg-white flex p-[10px] z-[9]'>
                <div className="relative inline-block">
      <a
        href="#"
        onClick={(e) => {
            e.preventDefault();
            togglePopup();
        }}
        className="relative text-white px-[10px] rounded-[10px] py-[6px] flex justify-center text-[14px] font-bold bg-[#4fdd77] overflow-hidden"
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
          onClick={togglePopup}
        />
        Share My Bento
      </a>
    </div>
                    <p className='mx-[10px] my-0 text-[#EFEFEF]'>|</p>
                    <div className='flex gap-[6px] items-center'>
                        <span onClick={() => handleWidgetAdd("link")} className='widget-create-thumb hover:cursor-pointer link rounded-[10px] flex justify-center items-center p-[6px] bg-[#f3f3f3] relative'>
                            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.95034 13.8492C5.12191 15.0208 7.02141 15.0208 8.19298 13.8492L9.6072 12.435C9.99772 12.0445 10.6309 12.0445 11.0214 12.435C11.4119 12.8256 11.4119 13.4587 11.0214 13.8492L9.6072 15.2635C7.65457 17.2161 4.48875 17.2161 2.53613 15.2635C0.583506 13.3108 0.583507 10.145 2.53613 8.19239L3.95034 6.77817C4.34087 6.38765 4.97403 6.38765 5.36455 6.77817C5.75508 7.1687 5.75508 7.80186 5.36455 8.19239L3.95034 9.6066C2.77877 10.7782 2.77877 12.6777 3.95034 13.8492ZM12.4356 9.6066L13.8498 8.19239C15.0214 7.02082 15.0214 5.12132 13.8498 3.94975C12.6783 2.77817 10.7788 2.77817 9.6072 3.94975L8.19298 5.36396C7.80246 5.75449 7.16929 5.75449 6.77877 5.36396C6.38824 4.97344 6.38824 4.34027 6.77877 3.94975L8.19298 2.53553C10.1456 0.582913 13.3114 0.582913 15.264 2.53553C17.2167 4.48816 17.2167 7.65398 15.264 9.6066L13.8498 11.0208C13.4593 11.4113 12.8261 11.4113 12.4356 11.0208C12.0451 10.6303 12.0451 9.99713 12.4356 9.6066ZM11.7285 7.48528C12.119 7.09476 12.119 6.46159 11.7285 6.07107C11.338 5.68054 10.7048 5.68054 10.3143 6.07107L6.07166 10.3137C5.68114 10.7042 5.68114 11.3374 6.07166 11.7279C6.46219 12.1184 7.09535 12.1184 7.48588 11.7279L11.7285 7.48528Z" fill="currentColor"></path></svg>
                            <span className=' w-[50px] text-center shadow-lg p-[2px] text-[8px] bg-white rounded-[20px] absolute top-[-120%] left-[-10px] '> Add Link</span>
                        </span>
                        <span
                            onClick={() => document.getElementById('mediaInput').click()}
                            className='widget-create-thumb relative hover:cursor-pointer images-videos rounded-[10px] flex justify-center items-center  bg-[#f3f3f3]'
                        >
                            <img src="https://bento.me/images/illustrations/image.png" alt="" width="24" height="24" className='rounded-[10px]' />
                            <span className=' w-[50px] text-center shadow-lg p-[2px] text-[8px] bg-white rounded-[20px] absolute top-[-120%] left-[-10px] '> Add Media</span>

                        </span>

                        <input
                            id="mediaInput"
                            type="file"
                            accept="image/*, video/*"
                            style={{ display: 'none' }}
                            onChange={handleMediaChange}
                        />

                        <span onClick={() => handleWidgetAdd("text")} className='widget-create-thumb relative hover:cursor-pointer text rounded-[10px] flex justify-center items-center  bg-[#f3f3f3]'>
                            <img src="https://bento.me/images/illustrations/text.png" alt="" width="24" height="24" className='rounded-[10px]'></img>
                            <span className=' w-[50px] text-center shadow-lg p-[2px] text-[8px] bg-white rounded-[20px] absolute top-[-120%] left-[-10px] '> Add Text</span>
                        </span>
                        <span onClick={() => { addWidget('map') }} className='widget-create-thumb relative hover:cursor-pointer map rounded-[10px] flex justify-center items-center  bg-[#f3f3f3]'>
                            <img src="https://bento.me/images/illustrations/map.png" alt="" width="24" height="24" className='rounded-[10px]'></img>
                            <span className=' w-[50px] text-center shadow-lg p-[2px] text-[8px] bg-white rounded-[20px] absolute top-[-120%] left-[-10px] '> Map</span>

                        </span>
                        <span onClick={() => handleWidgetAdd("title")} className='widget-create-thumb relative hover:cursor-pointer sectiontitle rounded-[10px] flex justify-center items-center p-[6px] bg-[#f3f3f3]'>
                            <svg width="18" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="12" width="7" height="8" rx="3" fill="#E3E3E3"></rect><rect x="4.5" y="12.5" width="6" height="7" rx="2.5" stroke="black" stroke-opacity="0.08"></rect><rect x="13" y="12" width="7" height="8" rx="3" fill="#E3E3E3"></rect><rect x="13.5" y="12.5" width="6" height="7" rx="2.5" stroke="black" stroke-opacity="0.08"></rect><rect x="4" y="4" width="12" height="5" rx="2.5" fill="url(#paint0_linear_7289_21481)"></rect><defs><linearGradient id="paint0_linear_7289_21481" x1="10" y1="4" x2="10" y2="9" gradientUnits="userSpaceOnUse"><stop stop-color="#5B5B5B"></stop><stop offset="1"></stop></linearGradient></defs></svg>
                            <span className=' w-[50px] text-center shadow-lg p-[2px] text-[8px] bg-white rounded-[20px] absolute top-[-120%] left-[-10px] '> Add Title</span>
                        </span>
                    </div>
                    <p className='mx-[10px] my-0 text-[#EFEFEF]'>|</p>

                </div>
                {showPopup.visible && (
                    <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg z-50">
                        <h2 className="text-xl mb-4">{showPopup.type === 'link' ? 'Add Link' : showPopup.type === 'title' ? 'Add Title' : ''}</h2>
                        {showPopup.type === 'link' && (
                            <div>
                                <input
                                    type="text"
                                    value={linkInput}
                                    onChange={(e) => setLinkInput(e.target.value)}
                                    placeholder="Enter link"
                                    className="w-full mb-2 border border-gray-300 rounded p-2"
                                />
                                <button onClick={handleLinkAdd} className="w-full bg-blue-500 text-white p-2 rounded">Add Link</button>
                            </div>
                        )}
                        {showPopup.type === 'title' && (
                            <div>
                                <input
                                    type="text"
                                    value={titleInput}
                                    onChange={(e) => setTitleInput(e.target.value)}
                                    placeholder="Enter title"
                                    className="w-full mb-2 border border-gray-300 rounded p-2"
                                />
                                <button onClick={handleTitleAdd} className="w-full bg-blue-500 text-white p-2 rounded">Add Title</button>
                            </div>
                        )}
                        {showPopup.type === 'text' && (
                            <div>
                                <input
                                    type="text"
                                    value={titleInput}
                                    onChange={(e) => setTitleInput(e.target.value)}
                                    placeholder="Enter text"
                                    className="w-full mb-2 border border-gray-300 rounded p-2"
                                />
                                <button onClick={handleTextAdd} className="w-full bg-blue-500 text-white p-2 rounded">Add Text</button>
                            </div>
                        )}
                        <button
                            onClick={() => setShowPopup({ type: null, visible: false })}
                            className="absolute top-2 right-2 text-gray-500"
                        >
                            &#10005;
                        </button>
                    </div>
                )}
                {sharePopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Black Overlay */}
                        <div
                            className="fixed inset-0 bg-black opacity-50"
                            onClick={togglePopup}
                        ></div>

                        {/* Popup */}
                        <div className="relative shadow-lg p-6 rounded-[30px] z-[9999] w-full h-[90vh] overflow-auto  bg-[#ebe6e6] max-w-[450px]  mx-auto">
                            <span className='flex justify-between w-full'>
                                <h2 className="text-xl font-bold mb-4">Share Bento</h2>
                                <span onClick={togglePopup} className='bg-[#00000005] w-[32px] h-[32px] rounded-[100%] p-[6px] flex justify-center items-center hover:cursor-pointer'>
                                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.36569 2.23431C3.05327 1.9219 2.54673 1.9219 2.23431 2.23431C1.9219 2.54673 1.9219 3.05327 2.23431 3.36569L6.06274 7.19411L2.23431 11.0225C1.9219 11.335 1.9219 11.8415 2.23431 12.1539C2.54673 12.4663 3.05327 12.4663 3.36569 12.1539L7.19411 8.32548L11.0225 12.1539C11.335 12.4663 11.8415 12.4663 12.1539 12.1539C12.4663 11.8415 12.4663 11.335 12.1539 11.0225L8.32548 7.19411L12.1539 3.36569C12.4663 3.05327 12.4663 2.54673 12.1539 2.23431C11.8415 1.9219 11.335 1.92189 11.0225 2.23431L7.19411 6.06274L3.36569 2.23431Z" fill="currentColor"></path></svg>
                                </span>
                            </span>
                            <div className='w-full rounded-[20px] flex flex-col p-[24px] border-[1px] border-[#c7c2c2ef] bg-white'>
                                <span className=' text-[#00000099] text-[14px]'>Make tweet Sound:</span>
                                <span className='flex gap-[6px] items-center mt-[10px]'>
                                    <span onClick={() => handleEmojiClick(0)}
                                        className={`bg-white hover:bg-[#0000000a] hover:cursor-pointer flex items-center justify-center rounded-[100%] w-[44px] h-[44px] p-[6px] ${selectedEmoji === 0 ? 'border-2 border-black' : ''}`}>
                                        <img src='https://bento.me/images/dazzling.png' alt="emoji" />
                                    </span>
                                    <span onClick={() => handleEmojiClick(1)}
                                        className={`bg-white hover:bg-[#0000000a] hover:cursor-pointer flex items-center justify-center rounded-[100%] w-[44px] h-[44px] p-[6px] ${selectedEmoji === 1 ? 'border-2 border-black' : ''}`}>
                                        <img src='https://bento.me/images/shakespeare.png' alt="emoji" />
                                    </span>

                                    <span onClick={() => handleEmojiClick(2)}
                                        className={`bg-white hover:bg-[#0000000a] hover:cursor-pointer flex items-center justify-center rounded-[100%] w-[44px] h-[44px] p-[6px] ${selectedEmoji === 2 ? 'border-2 border-black' : ''}`}>
                                        <img src='	https://bento.me/images/deep.png' alt="emoji" />
                                    </span>
                                </span>
                                <div className="my-4 h-[2px] w-full rounded-[1px] bg-black/[0.02]"></div>
                                <div className='flex items-center w-full gap-[6px]'>
                                    <span className='w-[36px] rounded-[100%]'>
                                        <img src='https://bento.me/images/twitter-avatar.png' alt='avatar' className='rounded-[100%] w-full' />
                                    </span>
                                    <span className='flex flex-col'>
                                        <h2 className='font-bold text-[14px] m-0'>Your Name</h2>
                                        <p className='text-[12px] m-0'>@{user?.userName}</p>
                                    </span>
                                </div>
                                <div className="my-4 h-[2px] w-full rounded-[1px] bg-black/[0.02]"></div>
                                <p className='text-[16px]'>
                                    {selectedEmoji !== null ? emojiTexts[selectedEmoji] : "Select an emoji to add text"}

                                </p>
                                <div className="my-4 h-[2px] w-full rounded-[1px] bg-black/[0.02]"></div>
                                <span className="text-[#1F43FF] text-[16px]">create-bento/{user?.userName}</span>
                                {screenshot && (
                                    <div className="w-full mt-4">
                                        <img src={screenshot} alt="Screenshot" className="w-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <span className=' mt-[10px] flex gap-[10px] p-[10px] rounded-[20px] justify-center items-center bg-[#55acee] text-white'> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M19.9417 3.91813C19.2081 4.24354 18.4195 4.46337 17.592 4.56226C18.4366 4.05601 19.0854 3.25436 19.3909 2.29909C18.6002 2.76796 17.7247 3.10831 16.7927 3.29175C16.0465 2.49668 14.9833 2 13.8064 2C11.547 2 9.71509 3.83149 9.71509 6.09059C9.71509 6.41122 9.75129 6.72345 9.82109 7.02284C6.42081 6.85227 3.40622 5.22364 1.38831 2.74871C1.03614 3.35287 0.83433 4.05551 0.83433 4.80523C0.83433 6.22448 1.55661 7.47655 2.65441 8.21011C1.98377 8.18887 1.35291 8.00484 0.801325 7.69848C0.80086 7.71552 0.80086 7.73267 0.80086 7.74991C0.80086 9.73186 2.21115 11.3851 4.08277 11.7612C3.73948 11.8547 3.37803 11.9047 3.00492 11.9047C2.74129 11.9047 2.48504 11.8789 2.23517 11.8312C2.75585 13.4564 4.26674 14.6391 6.05711 14.672C4.6569 15.7692 2.89285 16.4232 0.97595 16.4232C0.645714 16.4232 0.320066 16.4038 0 16.366C1.81062 17.5267 3.96113 18.2039 6.27159 18.2039C13.7969 18.2039 17.9122 11.9707 17.9122 6.56484C17.9122 6.38749 17.9082 6.21112 17.9004 6.03556C18.6996 5.45892 19.3932 4.73852 19.9417 3.91813Z" fill="white"></path></svg>Tweet</span>

                            
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
