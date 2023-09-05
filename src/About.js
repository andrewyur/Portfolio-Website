import React from "react";
import { useState, useEffect, useRef } from "react";
import { Canvas, act, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls } from '@react-three/drei'

// interactivity variable ideas:
// environment preset : apartment, city, dawn, forest, studio, sunset, 
// background color : #fff, #808080, #cdbaba, #697b56, #a39a8e, #373137
// mesh shader? 
// mesh rotation : drag/click
// camera fov : find relationship between fov and scale to make mesh appear the same size each time fov is changed

const ENVIRONMENT_PRESETS = ["city", "dawn", "forest", "sunset"]
const BACKGROUND_COLORS = ["#cdbaba"]
const MOUSE_SENSITIVITY = 600;

// TODO: 
// remesh and touch up torso model
// loading animation
// shaders
// text + text colors
// rotation limiting/easing
// refine background colors and environment presets
// color transitions?
// autorotate / passive mouse rotation
// content for about section
// styling
// add photos

const Torso = function(props){
    const [active, setActive] = useState(false)
    const torsoRef = useRef()
    useFrame(() => {
        if(!active){
            torsoRef.current.rotation.y += 0.003;
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
        rotation={[0.25, 0, 0.5]} 
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
                    <p>I am a sophomore Computer Science student at Stevens Institute of Technology.</p>
                    <p>I know how to use Java and Python reasonably well, and am learning C++ through my school classes</p>
                    <p>I also taught myself html/css and Javascript, as well some other web development tools like React, Node, and MongoDB</p>
                    <p>Aside from my schoolwork, I am starter on the Stevens Fencing Team, and member of the Stevens CS Club, Stevens Blueprint Organization, 
                        and Stevens Badminton Clubs.</p>
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
            </div>
    )
}