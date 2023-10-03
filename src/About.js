import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import { MeshStandardMaterial, WrapAroundEnding } from "three";

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
// random texture/uvs/normal map etc


const Torso = function(props){
    const [active, setActive] = useState(false)
    const torsoRef = useRef()
    const gltf = useGLTF('/4 arm torso.glb');

    function linearInterpolation(x1, x2, easingValue) {
        return (1 - easingValue) * x1 + easingValue * x2;
    }

    useFrame(() => {
        if(!active && window.scrollY > 0){
            torsoRef.current.rotation.z += 0.001;
            torsoRef.current.rotation.y += 0.002;
        }else if(!active && window.scrollY == 0){
            torsoRef.current.rotation.z = linearInterpolation(torsoRef.current.rotation.z, -0.5, 0.05);
            torsoRef.current.rotation.y = linearInterpolation(torsoRef.current.rotation.y, 0, 0.05);
            torsoRef.current.rotation.x = linearInterpolation(torsoRef.current.rotation.x, -0.25, 0.05);
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
    return <primitive 
        ref={torsoRef}
        position={[0.3,-0.2,0]} 
        rotation={[-0.25, 0, -0.5]} 
        scale={0.225} 
        object={gltf.scene}
        material={gltf.material}

    />
}

const environment = ENVIRONMENT_PRESETS[Math.floor(Math.random() * ENVIRONMENT_PRESETS.length)]
const background = BACKGROUND_COLORS[Math.floor(Math.random() * BACKGROUND_COLORS.length)]

export default function About() {
    return (
        <div id="about" style={{backgroundColor: background}}>
            <h1 id="about-background-text">ABOUT ME</h1>
            <Canvas id="canvas" camera={{ position: [-2.5,1.5,4], fov: 10}}>
                <ambientLight intensity={0.5} />
                <Torso/>
                <Environment preset={environment} />
            </Canvas>
            <div className="layer1">
                <div id="about-text">
                    <h1>Andrew Yurovchak</h1>
                    <p>I am a sophomore CS student at Stevens Institute of Technology</p>
                </div>
                <div id="about-scroll">
                    <p>Scroll + Drag</p>
                    <hr/>
                </div>
                <div id="about-text-2"></div>
            </div>
            <div className="layer2" id="mix">
                <div className="about-text-2-text" id="mixtext">
                    <h1>Aspiring Web + Software Designer</h1>
                </div>
            </div>
            <div className="layer2">
                <div className="about-text-2-text">
                    <img src="/IMG_1687.jpeg"/>
                    <p>I enjoy coding, 3d modelling, drawing, video games, and listening to music.
                        I am a starting member of the Stevens fencing team, a designer for the Stevens Blueprint Organization,
                        and a brother of Alpha Xi of Chi Psi.
                    </p>
                </div>
            </div>
        </div>
    )
}