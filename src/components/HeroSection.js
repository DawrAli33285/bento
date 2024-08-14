import "../hero.css";
import { useScroll,motion,useMotionValueEvent,useTransform} from "framer-motion";
import { cubicBezier, circOut,easeIn} from "framer-motion"
import { useEffect, useRef,useState } from "react";
export default function HeroSection() {


let {scrollY}=useScroll()
let negativeMargin = useTransform(scrollY, [30, 350], [0, -100], { ease: easeIn });
let firstRotate= useTransform(scrollY, [50, 350], [0, 48],{ease:easeIn});
let secondRotate=useTransform(scrollY,[100,350],[-2,-5],{ease:easeIn})
let secondMarginX=useTransform(scrollY,[50,350],[-120,-200],{ease:easeIn})
let secondMarginy=useTransform(scrollY,[50,350],[0,-200],{ease:easeIn})
let opaictyChange=useTransform(scrollY,[50,300],[1,0],{ease:easeIn})
let thirdCard=useTransform(scrollY,[80,450],[0,90],{ease:easeIn})
let thirdMargin = useTransform(scrollY, [80, 350], [120, 200],{ease:easeIn});
let thirdXMargin= useTransform(scrollY, [100, 350], [0, -150],{ease:easeIn});
let fourthCardXMargin=useTransform(scrollY, [0, 350], [0, -200],{ease:easeIn});
let fourthCardYMargin=useTransform(scrollY, [0, 350], [0, 200],{ease:easeIn});
let fourthCardRotate=useTransform(scrollY, [50, 350], [0, 48],{ease:easeIn});
let fifthCardXMargin=useTransform(scrollY, [0, 350], [0, -200],{ease:easeIn});
let fifthCardYMargin=useTransform(scrollY, [0, 350], [0, -200],{ease:easeIn});
let fifthCardRotate=useTransform(scrollY, [50, 350], [0, -48],{ease:easeIn});
// const [animationValue,setAnimationValue]=useState(0)
// useMotionValueEvent(scrollYProgress,'change',(value)=>{
// setAnimationValue((prev)=>{
//     return prev+5
// }) 
// })
    return (
        <div  className="hero-section">
            <motion.div
              initial={{scale:0}} 
              animate={{scale:1}}
              transition={{ duration: 0.5 ,ease:'linear',delay:2}} 
            
                data-w-id="83a845c0-47bc-de00-f286-0c82adad98ce"
                style={{
                    margin:negativeMargin,
                    rotate:firstRotate,
                    transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(3deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d',
                    opacity:opaictyChange,
                   
                   
                }}
               

                className="widget-parent-1"
            >
                <img
                    src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ea7d42d96b453e6c24c20f_hero%20buymeacoffee.png"
                    loading="lazy"
                    sizes="(max-width: 479px) 100vw, 183.9189453125px"
                    srcSet="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ea7d42d96b453e6c24c20f_hero%20buymeacoffee-p-500.png 500w, https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ea7d42d96b453e6c24c20f_hero%20buymeacoffee.png 525w"
                    alt=""
                    className="image-square"
                />
            </motion.div>
            <motion.div
                     initial={{scale:0}} 
                     animate={{scale:1}}
                     transition={{ duration: 0.5 ,ease:'linear',delay:2}} 
                   
                data-w-id="468c03c8-c19e-776f-4a11-465a0ac15831"
                style={{
                   rotate:secondRotate,
                   opacity:opaictyChange,
                   marginLeft:secondMarginX,
                   marginTop:secondMarginy,
                    transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-2deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d',
                  
                }}
                className="widget-parent-2"
            >
                <img
                    src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e5079c2efbf624bd00d1e3_hero%20verge.png"
                    loading="lazy"
                    sizes="(max-width: 479px) 100vw, (max-width: 991px) 395.869873046875px, 40vw"
                    srcSet="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e5079c2efbf624bd00d1e3_hero%20verge-p-500.png 500w, https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e5079c2efbf624bd00d1e3_hero%20verge-p-800.png 800w, https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e5079c2efbf624bd00d1e3_hero%20verge-p-1080.png 1080w, https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e5079c2efbf624bd00d1e3_hero%20verge.png 1170w"
                    alt=""
                    className="image-wide"
                />
            </motion.div>
            <motion.div
                     initial={{scale:0}} 
                     animate={{scale:1}}
                     transition={{ duration: 0.5,ease:'linear',delay:2}} 
                   
                data-w-id="ffcce45d-359e-ae0e-38aa-f1cca78af502"
                style={{
                    transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(3deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d',
                    opacity: opaictyChange,
                    rotate:thirdCard,
                    marginTop:thirdMargin,
                    marginLeft:thirdXMargin
                }}
                className="widget-parent-3"
            >
                <img
                    src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebce23e53ac60a7fa7bd43_hero%20youtube.png"
                    loading="lazy"
                    alt=""
                    className="image-square"
                />
            </motion.div>
            <motion.div
                     initial={{scale:0}} 
                     animate={{scale:1}}
                     transition={{ duration: 0.5 ,ease:'linear',delay:2}} 
                   
                data-w-id="3d305a87-cbde-ab14-700d-7b9983e2c8cf"
                style={{
                    transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-3deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d',
                    opacity: opaictyChange,
                    rotate:fifthCardRotate,
                    marginTop:fifthCardYMargin,
                    marginRight:fifthCardXMargin
                }}
                className="widget-parent-4"
            >
                <img
                    src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e5097d8203b5520ba10809_hero%20substack.png"
                    loading="lazy"
                    sizes="(max-width: 479px) 100vw, (max-width: 991px) 195.171142578125px, 20vw"
                    srcSet="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e5097d8203b5520ba10809_hero%20substack-p-500.png 500w, https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e5097d8203b5520ba10809_hero%20substack.png 525w"
                    alt=""
                    className="image-tall"
                />
            </motion.div>
            <motion.div
                     initial={{scale:0}} 
                     animate={{scale:1}}
                     transition={{ duration: 0.5 ,ease:'linear',delay:2}} 
                   
                data-w-id="aac193d9-2d8c-1142-e67a-d6d27cd478ac"
                style={{
                    transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(3deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d',
                    opacity: opaictyChange,
                    rotate:fourthCardRotate,
                    marginRight:fourthCardXMargin,
                    marginTop:fourthCardYMargin
                }}
                className="widget-parent-5"
            >
                <img
                    src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebce230b9edded60bf0d84_hero%20twitter.png"
                    loading="lazy"
                    sizes="(max-width: 479px) 100vw, 183.9189453125px"
                    srcSet="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebce230b9edded60bf0d84_hero%20twitter-p-500.png 500w, https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebce230b9edded60bf0d84_hero%20twitter.png 525w"
                    alt=""
                    className="image-square"
                />
            </motion.div>
            <motion.div style={{opacity:opaictyChange}} className="hero-content">
                <motion.div   initial={{opacity:0,rotate:-30,filter:'blur(4px)'}} 
                   animate={{opacity:1,rotate:0,filter:'blur(0px)'}} 
                   transition={{ duration: 1 ,ease:'linear',delay:1}} 
                   style={{ position: 'relative',marginTop:'5rem'}} >
                    <img width={90} height={95} src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e501246a370e0d4462f2ed_herologo.png"></img>
                </motion.div>
                <motion.h2 
                  initial={{opacity:0,filter:'blur(4px)'}} 
                  animate={{opacity:1,filter:'blur(0px)'}} 
                  transition={{ duration: 1 ,ease:'linear',delay:2}} 
                  style={{ position: 'relative'}} 
                >Bento</motion.h2>
                <motion.div
    initial={{ top: 50,opacity:0,filter:'blur(4px)'}} 
    animate={{ top: 1 ,opacity:1,filter:'blur(0px)'}} 
    transition={{ duration: 1 ,ease:'linear'}} 
    style={{ position: 'relative' }} 
>
    <h1>A Link in Bio. <br />But Rich and Beautiful.</h1>
    <h3>Your personal page to show everything you are and create.</h3>
</motion.div>
                <motion.div 
                   initial={{opacity:0}} 
                   animate={{opacity:1}} 
                   transition={{ duration: 1 ,ease:'linear',delay:2}} 
                   style={{ position: 'relative' }} 
                
                className="mt-[64px]">
                    <a className="create-bento" href="#">
                        <span>Create Your Bento</span>
                    </a>
                </motion.div>
                <a className="hero-login" href="#">Log In</a>
            </motion.div>
        </div>
    );
}
