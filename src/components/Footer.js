import "../footer.css"
import { useNavigate } from "react-router-dom"
export default function Footer() {
    let navigate=useNavigate()
    return (
        <div className="footer">
            <img src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63860225045ce50e33d20eb3_Logo.svg" loading="eager" width="44" alt=""></img>
            <h1 className="footer-text">Designed in Berlin. Built for Creatives.</h1>
            <div className="link-container-area">
                <a href="http://bento.me/login" target="_blank" className="link-3">Log In</a>
                <a href="http://bento.me/aboutus" target="_blank" className="link-3">About us</a>
                <a href="http://bento.me/changelog" target="_blank" className="link-3">Changelog</a>
                <a href="http://bento.me/jointheteam" className="link-3">Join the team</a>
                <a href="/home/explore" className="link-3">Explore</a>
                <a href="https://drive.google.com/file/d/1Eenoisg9iO5oUQ19LhbSnP5aqgquJBSi/view?usp=share_link" target="_blank" className="link-3">Download Brand Assets</a>
            </div>
            <img src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ee477e4688e939cf07c4c3_phbadge.svg" loading="lazy" alt="" className="image-127"></img>
        </div>
    )
}