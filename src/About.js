import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { WrapAroundEnding } from "three";

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
// size images of equal area
// idle effect
// chromatic abberation hover effect


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

const environment = ENVIRONMENT_PRESETS[Math.floor(Math.random() * ENVIRONMENT_PRESETS.length)]
const background = BACKGROUND_COLORS[Math.floor(Math.random() * BACKGROUND_COLORS.length)]

export default function About() {
    const aboutRef = useRef()
    return (
        <div id="about" style={{backgroundColor: background}} ref={aboutRef}>
                <div id="about-text">
                    
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
                <div id="about-text-2">
                    
                    <h1></h1>
                </div>
            </div>
    )
}