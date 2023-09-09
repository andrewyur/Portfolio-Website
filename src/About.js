import React from "react";
import { useState, useEffect, useRef } from "react";
import { Canvas, act, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls } from '@react-three/drei'

const ENVIRONMENT_PRESETS = ["dawn"]
const BACKGROUND_COLORS = ["#cdbaba"]
const MOUSE_SENSITIVITY = 600;

// TODO: 
// remesh and touch up torso model
// loading animation
// shaders
// rotation limiting/easing
// refine background colors and environment presets
// color transitions?
// passive mouse rotation
// content for about section
// styling
// add more photos
// style photos to encourage mouseover
// photos interact with mesh
// link mesh rotation to document scroll position
// camera fov : find relationship between fov and scale to make mesh appear the same size each time fov is changed

const Torso = function(props){
    const [active, setActive] = useState(false)
    const torsoRef = useRef()
    useFrame(() => {
        if(!active && window.scrollY > 1000){
            torsoRef.current.rotation.z += 0.001;
            torsoRef.current.rotation.y += 0.002;
        }
    })
    useEffect(()=>{
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mousemove', handleMouseMove)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)}
    })

    const handleMouseMove = (event) => {
        if(active){
            torsoRef.current.rotation.x += event.movementY/MOUSE_SENSITIVITY
            torsoRef.current.rotation.y += event.movementX/MOUSE_SENSITIVITY
        }
    }
    const handleMouseDown = () => {
        setActive(true)
    }
    const handleMouseUp = () => {
        setActive(false)
    }

    console.log(props.offsetX)
    return <primitive 
        ref={torsoRef}
        position={[0.3,-0.2,0]} 
        rotation={[-0.25, 0, -0.5]} 
        scale={0.225} 
        object={useGLTF('/4 arm torso.glb').scene}
    />
}

/* <p>The allure of creation, the </p>


                    <p>As a kid, I was obsessed with LEGO and origami, enthralled by my ability to create, and the skill and precision necessary to do so.</p>
                    <p>Now, I am a sophomore at Stevens Institute of Technology, pursuing a career in web design and software development.</p>
                    <p></p>
                    <p>Aside from my schoolwork, I am starter on the Stevens Fencing Team, and member of the Stevens CS Club, Stevens Blueprint Organization, 
                        and Stevens Badminton Clubs.</p> */

const environment = ENVIRONMENT_PRESETS[Math.floor(Math.random() * ENVIRONMENT_PRESETS.length)]
const background = BACKGROUND_COLORS[Math.floor(Math.random() * BACKGROUND_COLORS.length)]

const HoverImg = function(props) {
    const imgRef = useRef()
    const wrapperRef = useRef()
    const IMG_TRANSFORMS = {"img1":"translate(-25%, -25%) scale(1.2)", "img2":"translate(-25%, -25%) scale(1.2)", "img3":"translate(-25%, -25%) scale(1.2)"}

    const handleMouseOver = function(){
        console.log(IMG_TRANSFORMS[props.id])
        imgRef.current.style.transform =  IMG_TRANSFORMS[props.id]
        imgRef.current.classList.remove("blurme")
        props.callback.fadeStart()
    }

    const handleMouseLeave = function(){
        imgRef.current.style.transform = "none"
        imgRef.current.classList.add("blurme")
        props.callback.fadeEnd()
    }

    return <div id={props.id + "Wrapper"} className="animationWrapper" ref={wrapperRef} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <img src={props.src} id={props.id} className="hoverImg blurme" ref={imgRef}/>
        </div>
}


export default function About() {

    const fadeStart = function(){
        document.querySelectorAll(".blurme").forEach((d) => {d.style.filter = "blur(3px)"; d.style.transform = "scale(0.75)"})
    }

    const fadeEnd = function(){
        document.querySelectorAll(".hoverImg").forEach((d) => {d.style.filter = "none"; d.style.transform = "none"})
    }

    const aboutRef = useRef()
    return (
        <div id="about" style={{backgroundColor: background}} ref={aboutRef}>
                <div id="about-text">
                    <h1>Hi, I'm Andrew Yurovchak.</h1>
                    <h2>I'm a sophomore at Stevens Institute of Technology.</h2>
                </div>
                <div id="about-scroll">
                    <p>Scroll</p>
                    <hr/>
                </div>
                <h1 id="about-background-text">ABOUT ME</h1>
                <Canvas id="canvas" camera={{ position: [-2.5,1.5,4], fov: 10}}>
                    <ambientLight intensity={0.5} />
                    <Torso/>
                    <Environment preset={environment} />
                </Canvas>
                <div id="pictures">
                    <HoverImg id="img1" src="/IMG-0189.jpg" callback={{fadeEnd, fadeStart}}/>
                    <HoverImg id="img2" src="/IMG-0618.jpg" callback={{fadeEnd, fadeStart}}/>
                    <HoverImg id="img3" src="/IMG-3064.JPEG" callback={{fadeEnd, fadeStart}}/>

                    <HoverImg id="img4" src="/evil mickey mouse copy.png" callback={{fadeEnd, fadeStart}}/>
                    <HoverImg id="img5" src="/IMG_0499.jpeg" callback={{fadeEnd, fadeStart}}/>
                    <HoverImg id="img6" src="/IMG_1151.jpeg" callback={{fadeEnd, fadeStart}}/>

                    <HoverImg id="img7" src="/IMG_1687.jpeg" callback={{fadeEnd, fadeStart}}/>
                    <HoverImg id="img8" src="/IMG_2919.jpeg" callback={{fadeEnd, fadeStart}}/>
                    <HoverImg id="img9" src="/little friend.png" callback={{fadeEnd, fadeStart}}/>
                </div>
            </div>
    )
}