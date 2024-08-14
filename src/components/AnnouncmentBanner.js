import '../announcment.css';
import img from "../miniarrowwhite.svg"
export default function(){
    return(
        <a href='#' className="banner-container">
            <span className='text-banner'>
                Big news! Linktree acquired Bento
            </span>
            <img src={img} loading="lazy" alt='img' />
        </a>
    )
}