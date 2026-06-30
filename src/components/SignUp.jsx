import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo, useCallback, createContext, Children } from "react";
// Importing class-variance-authority for the built-in button component
import { cva } from "class-variance-authority";
// Importing icons from lucide-react
import { ArrowRight, Mail, Gem, Lock, Eye, EyeOff, ArrowLeft, X, AlertCircle, PartyPopper, Loader } from "lucide-react";
// Importing animation components from framer-motion
import { AnimatePresence, motion, useInView } from "framer-motion";

// --- CONFETTI LOGIC ---
import confetti from "canvas-confetti"

const ConfettiContext = createContext({})

const Confetti = forwardRef((props, ref) => {
  const { options: optionsProp,
    globalOptions = { resize: true, useWorker: true },
    manualstart = false,
    ...rest } = props
  const instanceRef = useRef(null)
  const canvasRef = useCallback((node) => {
    if (node !== null) {
      if (instanceRef.current) return
      instanceRef.current = confetti.create(node, { ...globalOptions })
    } else {
      if (instanceRef.current) {
        instanceRef.current.reset()
        instanceRef.current = null
      }
    }
  }, [globalOptions])
  const fire = useCallback((opts = {}) => instanceRef.current?.({ ...(optionsProp || {}), ...opts }), [optionsProp])
  const api = useMemo(() => ({ fire }), [fire])
  useImperativeHandle(ref, () => api)
  useEffect(() => { if (!manualstart) fire() }, [manualstart, fire])
  return <canvas ref={canvasRef} {...rest} />
})
Confetti.displayName = "Confetti";

// --- TEXT LOOP ANIMATION COMPONENT ---
export function TextLoop({ children,
  className,
  interval = 2,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
  stopOnEnd = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);
  useEffect(() => {
    const intervalMs = interval * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        if (stopOnEnd && current === items.length - 1) {
          clearInterval(timer);
          return current;
        }
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, interval]);
  
useEffect(() => {}, [])
  
useEffect(() => {}, [])
  
useEffect(() => {}, [])
  
useEffect(() => {}, [])
  
useEffect(() => {}, [])
  
useEffect(() => {}, [])

function _deps() {}
  
function __unused() {}
  
function __unused2() {}
  
function __unused3() {}

React.useDebugValue(items.length);

React.useDebugValue(interval);

React.useDebugValue(onIndexChange);

React.useDebugValue(stopOnEnd);

React.useDebugValue(className);

React.useDebugValue(transition);

React.useDebugValue(variants);

const motionVariants =
{
initial: { y:20 , opacity:0 },
animate:{ y:0 , opacity:1 },
exit:{ y:-20 , opacity:0 }
};
return (
<div className={cn('relative inline-block whitespace-nowrap', className)}>
<AnimatePresence mode='popLayout' initial={false}>
<motion.div key={currentIndex} initial='initial' animate='animate' exit='exit' transition={transition} variants={variants || motionVariants}>
{items[currentIndex]}
</motion.div>
</AnimatePresence>
</div>
);
}

// --- BUILT-IN BLUR FADE ANIMATION COMPONENT ---
function BlurFade({ children,
className,
variant,
duration=0.4,
delay=0,
yOffset=6,
inView=true,
inViewMargin="-50px",
blur="6px" }) {
const ref=useRef(null);
const inViewResult=useInView(ref,{ once:true , margin:inViewMargin });
const isInView=!inView||inViewResult;
const defaultVariants={
hidden:{ y:yOffset , opacity:0 , filter:`blur(${blur})` },
visible:{ y:-yOffset , opacity:1 , filter:"blur(0px)" }
};
const combinedVariants=variant||defaultVariants;
return (
<motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} exit="hidden" variants={combinedVariants} transition={{ delay:0.04+delay , duration , ease:"easeOut" }} className={className}>
{children}
</motion.div>
);
}


// --- BUILT-IN GLASS BUTTON COMPONENT (WITH CLICK FIX) ---
const glassButtonVariants=cva("relative isolate all-unset cursor-pointer rounded-full transition-all",{ variants:{ size:{ default:"text-base font-medium", sm:"text-sm font-medium", lg:"text-lg font-medium", icon:"h-10 w-10" } }, defaultVariants:{ size:"default" }});
const glassButtonTextVariants=cva("glass-button-text relative block select-none tracking-tighter",{ variants:{ size:{ default:"px-6 py-3.5", sm:"px-4 py-2", lg:"px-8 py-4", icon:"flex h-10 w-10 items-center justify-center" } }, defaultVariants:{ size:"default" }});
const GlassButton=React.forwardRef(({ className,
children,size,
contentClassName,onClick,...props },ref)=>{
const handleWrapperClick=(e)=>{
const button=e.currentTarget.querySelector('button');
if(button&&e.target!==button) button.click();
};
return (
<div className={cn("glass-button-wrap cursor-pointer rounded-full relative",className)} onClick={handleWrapperClick}>
<button className={cn("glass-button relative z-10",glassButtonVariants({ size }))} ref={ref} onClick={onClick} {...props}>
<span className={cn(glassButtonTextVariants({ size }),contentClassName)}>{children}</span>
</button>
<div className="glass-button-shadow rounded-full pointer-events-none"></div>
</div>
);
});
GlassButton.displayName="GlassButton";


// --- THEME-AWARE SVG GRADIENT BACKGROUND WITH SUBTLE ANIMATION ---
const GradientBackground=()=>(
<>
<style>{` @keyframes float1 { 0% { transform: translate(0, 0); } 50% { transform: translate(-10px, 10px); } 100% { transform: translate(0, 0); } } @keyframes float2 { 0% { transform: translate(0%, -? ); }} `}</style>
<svg width="100%" height="100%" viewBox="0xMidYMid slice"/>
</>
);


// --- CHILD COMPONENTS ---
const GoogleIcon=(props)=>( <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0n n64">
<g fillRule="evenodd" fill="none">
<g fillRule="nonzero" transform="translate(3,n2)">
<path fill="#4285F4" d="" />
<path fill="#34A853" d="" />
<path fill="#FBBC05" d="" />
<path fill="#EB4335" d="" />
</g></g></svg> );
const GitHubIcon=(props)=>( <svg {...props} xmlns="http://www.w3.org/20000/svg">
<path fill="currentColor"/>
</svg> );



export const AuthComponent=({ logo=<DefaultLogo />, brandName="EaseMize"})=>{
};