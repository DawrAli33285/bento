import "../hero.css";
import { useScroll,motion,useMotionValueEvent,useTransform,useSpring} from "framer-motion";
import { cubicBezier, circOut,easeIn,animate} from "framer-motion"
import { useEffect, useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin,Flip } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin); 
export default function HeroSection() {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const useCreateSpring = (scrollY, inputRange, outputRange, ease, springConfig) => {
        const transform = useTransform(scrollY, inputRange, outputRange, { ease });
        return useSpring(transform, springConfig);
      };
      
        const springConfig = {
            stiffness: 150,
            damping: 120,
           
          
        };
      
      let { scrollY } = useScroll();
      
      const negativeMargintwo = useCreateSpring(scrollY, [30, 350], [0, -100], easeIn, springConfig);
      const firstRotatetwo = useCreateSpring(scrollY, [50, 350], [0, 48], easeIn, springConfig);
      const secondRotatetwo = useCreateSpring(scrollY, [100, 350], [-2, -5], easeIn, springConfig);
      const secondMarginXtwo = useCreateSpring(scrollY, [50, 350], [-120, -200], easeIn, springConfig);
      const secondMarginytwo = useCreateSpring(scrollY, [50, 350], [0, -200], easeIn, springConfig);
      const opaictyChangetwo = useCreateSpring(scrollY, [50, 300], [1, 0], easeIn, springConfig);
      const thirdCardtwo = useCreateSpring(scrollY, [80, 450], [0, 90], easeIn, springConfig);
      const thirdMargintwo = useCreateSpring(scrollY, [80, 350], [120, 200], easeIn, springConfig);
      const thirdXMargintwo = useCreateSpring(scrollY, [100, 350], [0, -150], easeIn, springConfig);
      const fourthCardXMargintwo = useCreateSpring(scrollY, [0, 350], [0, -200], easeIn, springConfig);
      const fourthCardYMargintwo = useCreateSpring(scrollY, [0, 350], [0, 200], easeIn, springConfig);
      const fourthCardRotatetwo = useCreateSpring(scrollY, [50, 350], [0, 48], easeIn, springConfig);
      const fifthCardXMargintwo = useCreateSpring(scrollY, [0, 350], [0, -200], easeIn, springConfig);
      const fifthCardYMargintwo = useCreateSpring(scrollY, [0, 350], [0, -200], easeIn, springConfig);
      const fifthCardRotatetwo = useCreateSpring(scrollY, [50, 350], [0, -48], easeIn, springConfig);
      const navigate=useNavigate();
      useEffect(()=>{
let widgetparent2=document.querySelector(".widget-parent-2")

gsap.to(widgetparent2, {
    rotate: -5,        
    x: -200,            
    y: -200,            
    opacity: 0,        
    duration: 1,       
    ease: "power1.inOut",  
    scrollTrigger: {
      trigger: ".hero-section", 
      start: "top top",     
      end: "350px top",        
      scrub: 1,                 
   
    }
  });


  gsap.to('.widget-parent-1', {
    rotate: 48,
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "350px top",
      scrub: 1,
     
    }
  });



  gsap.to('.widget-parent-3', {
    rotate: 90,        
    y: 200,     
    opacity:0,        
    x: -150,            
    duration: 1,        
    ease: "power1.inOut", 
    scrollTrigger: {
      trigger: ".hero-section", 
      start: "top top",         
      end: "450px top",         
      scrub: 1,                 
           
    }
  });


  gsap.to('.widget-parent-4', {
    rotate: -48,
    x: -200,
    opacity:0,
    y: -200,
    duration: 1,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "350px top",
      scrub: 1,
   
    }
  });


  gsap.to('.widget-parent-5', {
    rotate: 48,
    x: -200,
    y: 200,
    opacity:0,
    duration: 1,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "350px top",
      scrub: 1,
      
    }
  });
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill()); 
  };
      },[])
// const [animationValue,setAnimationValue]=useState(0)
// useMotionValueEvent(scrollYProgress,'change',(value)=>{
// setAnimationValue((prev)=>{
//     return prev+5
// }) 
// })
    return (
        <div  className="hero-section">
            <div
             
                data-w-id="83a845c0-47bc-de00-f286-0c82adad98ce"
                style={{
                  
                    transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(3deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d',
                   
                   
                   
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
            </div>
            <div
                    
                data-w-id="468c03c8-c19e-776f-4a11-465a0ac15831"
                style={{
       
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
            </div>
            <div
                     
                data-w-id="ffcce45d-359e-ae0e-38aa-f1cca78af502"
                style={{
                    transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(3deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d',
              
                }}
                className="widget-parent-3"
            >
                <img
                    src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63ebce23e53ac60a7fa7bd43_hero%20youtube.png"
                    loading="lazy"
                    alt=""
                    className="image-square"
                />
            </div>
            <div
                   
                data-w-id="3d305a87-cbde-ab14-700d-7b9983e2c8cf"
                style={{
                    transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(-3deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d',
            
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
            </div>
            <div
              
                data-w-id="aac193d9-2d8c-1142-e67a-d6d27cd478ac"
                style={{
                    transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(3deg) skew(0deg, 0deg)',
                    transformStyle: 'preserve-3d',

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
            </div>
            <motion.div
            style={{ opacity: !isMobile ? opaictyChangetwo: 1 }} 
            className="hero-content"
        >
                <motion.div   initial={{opacity:0,rotate:-30,filter:'blur(4px)'}} 
                   animate={{opacity:1,rotate:0,filter:'blur(0px)'}} 
                   transition={{ duration: 0.5 ,ease:'linear',delay:1}} 
                   style={{ position: 'relative',marginTop:'5rem'}} >
                    <img width={90} height={95} src="https://cdn.prod.website-files.com/6335b33630f88833a92915fc/63e501246a370e0d4462f2ed_herologo.png"></img>
                </motion.div>
                <motion.h2 
                  initial={{opacity:0,filter:'blur(4px)'}} 
                  animate={{opacity:1,filter:'blur(0px)'}} 
                  transition={{ duration: 1 ,ease:'linear',delay:1.3}} 
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
                    <a onClick={()=>{
                      navigate('/login')  
                    }} className="create-bento" href="#">
                        <span>Create Your Bento</span>
                    </a>
                </motion.div>
                <a className="hero-login" href="#">Log In</a>
            </motion.div>
        </div>
    );
}
