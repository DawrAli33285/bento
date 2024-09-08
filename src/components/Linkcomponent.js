import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../baseURL";
const Linkcomponent = ({ followers,content, getLinkLogo, logo, title, screenshot, spotify }) => {
    const [metadata, setMetadata] = useState({ title: '', description: '', screenshot: '' });
    const [loading, setLoading] = useState(false);
    const screenshotRef = useRef()
    let spotifyRef = useRef()
    let followersRef=useRef();
    const titleRef = useRef()
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackUri, setCurrentTrackUri] = useState(null);
    const audioRef = useRef(null);

    if (title) {
        titleRef.current = title
    }

    if (screenshot) {
        screenshotRef.current = screenshot
    }
    if (spotify) {
        spotifyRef.current = spotify
    }
if(followers){
  
    followersRef.current=followers
}


    function formatNumber(num) {
        num=parseInt(num)
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M'; 
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString(); 
    }


    const handleButtonClick = () => {

        const url = content.toLowerCase();

        // Check if it's a YouTube channel link
        if (/youtube\.com\/(c\/|@)/.test(url)) {
          
            window.location.href = `${content}?sub_confirmation=1`;
        } else {
           
            window.location.href = content;
        }
    };
    const getActionButton = () => {
        const url = content.toLowerCase();


        const actions = {
         youtube: /youtube\.com\/(c\/|@|results|user|channel)/,
            instagram: /instagram\.com\//,
            twitter: /x\.com\//,
            github: /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/,
            spotify: /spotify\.com\//,
            linkedin: /linkedin\.com\//,
            facebook: /facebook\.com\//,
            reddit: /reddit\.com\/r\//,
            pinterest: /pinterest\.com\//,
            tiktok: /tiktok\.com\//,
            tumblr: /tumblr\.com\//,
            snapchat: /snapchat\.com\//,
            twitch: /twitch\.tv\//,
            vimeo: /vimeo\.com\//,
            medium: /medium\.com\//,
            stackoverflow: /stackoverflow\.com\//,
            devto: /dev\.to\//,
            dribbble: /dribbble\.com\//,
            behance: /behance\.net\//,
        };


        for (const [key, regex] of Object.entries(actions)) {

            if (regex.test(url)) {
                switch (key) {

                    case 'youtube':
                        return (
                            <button onClick={handleButtonClick} className="action-button youtube-btn">
 
                                Subscribe ({formatNumber(followersRef?.current)})
                            </button>
                        );
                    case 'instagram':
                        return (
                            <button onClick={handleButtonClick} className="action-button instagram-btn">

                                Follow ({formatNumber(followersRef?.current)})
                            </button>
                        );
                    case 'spotify':
                        return (
                            <button onClick={handleButtonClick} className="action-button font-bold text-xs text-white py-[7px] px-[14px]  rounded-[8px] bg-green-600">

                                Play
                            </button>
                        );
                    case 'github':
                        return (
                            <button onClick={handleButtonClick} className="action-button font-bold text-xs text-white py-[7px] px-[14px]  rounded-[8px] bg-green-600">

                                Follow
                            </button>
                        );
                  
                    default:
                        return (
                       ''
                        );
                }
            }
        }

        return null;
    };
    useEffect(() => {
        if (spotify) {
            console.log("Spotify is passed:", spotifyRef?.current);
        } else {
            console.log("Spotify is not passed.");
        }
    }, [spotifyRef?.current]);


    const togglePlayPause = (uri) => {
        if (currentTrackUri === uri && isPlaying) {
            
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
        
            const embedUrl = `https://open.spotify.com/embed/track/${uri.split(':').pop()}`;

            setCurrentTrackUri(uri);
            if (audioRef.current) {
                audioRef.current.src = uri;
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const formatDuration = (totalMilliseconds) => {
        const minutes = Math.floor(totalMilliseconds / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div

            className="w-full h-full flex flex-col gap-[10px] rounded-[20px] bg-white  text-[#b4b2b2] overflow-hidden"

            rel="noopener noreferrer"
        >
            <div className="w-full grid grid-cols-2 justify-between">
                <a href={content} target="_blank" rel="noreferrer" className="linkimg w-[50px] flex" >
                    <img src={logo ? logo : getLinkLogo(content)} />
                </a>
                <div className="flex justify-end items-center">
                    {getActionButton()}
                </div>
            </div>
            <p>
                {titleRef.current ? titleRef.current : metadata?.title}
            </p>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="spinner-border animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
                </div>
            ) : (
                <div className={`grid ${screenshotRef.current?.includes(',')?'grid-cols-2':'grid-cols-1'} gap-[6px]`}>
                    {screenshotRef?.current?.length > 0 ? (
                        screenshotRef?.current?.split(',')?.map((val, i) => {
                            console.log("SCREENSHOT");
                            console.log(val);
                            return (
                                <div
                                    key={i.toString()}
                                    className="w-full h-[100px] rounded-[20px] overflow-hidden" 
                                >
                                    <img
                                        onError={() => console.log(`Failed to load image: ${val}`)}
                                        src={val}
                                        alt={`Screenshot ${i}`}
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            );
                        })
                    ) : ''}
                </div>
            )}
            {spotify && spotify.length > 0 ? (
                <div className="flex flex-col gap-[6px] p-4">
                    {spotify.map((track, index) => {
                        console.log("Track Data:", track);

                        const { itemV2 } = track;
                        if (!itemV2 || !itemV2.data) {
                            console.warn(`Invalid track data at index ${index}:`, track);
                            return null;
                        }

                        const { data } = itemV2;
                        const albumCover = data.albumOfTrack?.coverArt?.sources?.[0]?.url;
                        const trackName = data.name;
                        const artists = data.artists?.items || [];
                        const duration = data.trackDuration?.totalMilliseconds;
                        const trackUri = data.uri; 

                        return (
                            <div key={index} className="flex items-center gap-[10px]">
                                <iframe
                                    src={`https://open.spotify.com/embed/track/${trackUri.split(':').pop()}`}
                                    frameBorder="0"
                                    allow="encrypted-media"
                                    title={trackName}
                                    className="mt-2 w-full h-[80px]"
                                ></iframe>
                            </div>
                        );
                    })}
                    <div className="text-sm text-gray-500 mt-2">
                        {isPlaying ? "Playing..." : "Paused"}
                    </div>
                </div>
            ) : null}


        </div>
    )
}


export default Linkcomponent;