import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
const Linkcomponent = ({ content, getLinkLogo,logo,title,getMetaData }) => {
    const [metadata, setMetadata] = useState({ title: '', description: '' });
    useEffect(() => {

        const fetchMeta = async () => {

            try {
              
                const response = await axios.get(`http://localhost:5000/metadata`, {
                    params: {
                        url: content
                    }
                });
                
                setMetadata({
                    title: response?.data?.title,

                })

            } catch (e) {
                console.log(e.message)
            }
        }

        fetchMeta();
    }, [content])

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
                {title?title:metadata?.title}
            </p>
          
        </div>
    )
}


export default Linkcomponent;