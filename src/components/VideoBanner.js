import React from 'react';
import "../videobanner.css"
export default function VideoBanner() {
    return (
        <div className='video-section'>
            <div className="desktop-video">
                <div
                    data-poster-url="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ea5abefbeb7e96b8d77a3f_desktop%20video%20small-poster-00001.jpg"
                    data-video-urls="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ea5abefbeb7e96b8d77a3f_desktop%20video%20small-transcode.mp4,https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ea5abefbeb7e96b8d77a3f_desktop%20video%20small-transcode.webm"
                    data-autoplay="true"
                    data-loop="true"
                    data-wf-ignore="true"
                    className="desktopvideo w-background-video w-background-video-atom"
                >
                    <video
                        id="5361fad7-d974-b635-d6ab-1988351b15a3-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ backgroundImage: 'url("https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ea5abefbeb7e96b8d77a3f_desktop%20video%20small-poster-00001.jpg")' }}
                        data-wf-ignore="true"
                        data-object-fit="cover"
                    >
                        <source src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ea5abefbeb7e96b8d77a3f_desktop%20video%20small-transcode.mp4" data-wf-ignore="true" />
                        <source src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ea5abefbeb7e96b8d77a3f_desktop%20video%20small-transcode.webm" data-wf-ignore="true" />
                    </video>
                </div>
                <div
                    data-poster-url="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e929e3f16d3f57b9b25ae5_mobilebentovideo2-poster-00001.jpg"
                    data-video-urls="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e929e3f16d3f57b9b25ae5_mobilebentovideo2-transcode.mp4,https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e929e3f16d3f57b9b25ae5_mobilebentovideo2-transcode.webm"
                    data-autoplay="true"
                    data-loop="true"
                    data-wf-ignore="true"
                    className="desktopvideomobile w-background-video w-background-video-atom"
                >
                    <video
                        id="3609dc64-27a8-2546-10c8-87e9fcd41a84-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ backgroundImage: 'url("https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e929e3f16d3f57b9b25ae5_mobilebentovideo2-poster-00001.jpg")' }}
                        data-wf-ignore="true"
                        data-object-fit="cover"
                    >
                        <source src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e929e3f16d3f57b9b25ae5_mobilebentovideo2-transcode.mp4" data-wf-ignore="true" />
                        <source src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e929e3f16d3f57b9b25ae5_mobilebentovideo2-transcode.webm" data-wf-ignore="true" />
                    </video>
                </div>
            </div>
        </div>
    );
}
