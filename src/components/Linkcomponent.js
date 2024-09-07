import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../baseURL";
const  Linkcomponent = ({ content, getLinkLogo,logo,title,screenshot}) => {
    const [metadata, setMetadata] = useState({ title: '', description: '',screenshot:'' });
    const [loading, setLoading] = useState(false); 
    const screenshotRef=useRef()
    const titleRef=useRef()
   if(title){
    titleRef.current=title
   }
 
if(screenshot){
    screenshotRef.current=screenshot
}
    // useEffect(() => {
    //     const fetchMeta = async () => {
    //        if(!screenshotRef?.current){
    //         setLoading(true);
    //        } // Set loading to true before fetching data
    //         try {
    //             if(!screenshotRef?.current){
    //                 const response = await axios.get(`${BASE_URL}/metadata`, {
    //                     params: { url: content }
    //                 });
    
    //                 setMetadata({
    //                     title: response?.data?.title,
    //                     screenshot: response?.data?.screenshot
    //                 });
    //             }
    //         } catch (e) {
    //             console.log(e.message);
    //         } finally {
    //             setLoading(false); // Set loading to false after fetching data
    //         }
    //     };

    //     fetchMeta();
    // }, [content]);


    return (
        <div

            className="w-full h-full flex flex-col gap-[10px] rounded-[20px] bg-white  text-[#b4b2b2] overflow-hidden"

            rel="noopener noreferrer"
        >
            <a href={content} target="_blank" rel="noreferrer" className="linkimg" >
                <img src={logo?logo:getLinkLogo(content)} className="h-full w-full" />
            </a>

            
            {content}
            <p>
                {titleRef.current?titleRef.current:metadata?.title}
            </p>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="spinner-border animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
                </div>
            ) : (
                screenshotRef?.current?.length>0?<img src={screenshotRef?.current} alt="Screenshot" />:<img src={metadata.screenshot}></img>
            )}
        </div>
    )
}


export default Linkcomponent;