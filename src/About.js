import React from "react";
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls } from '@react-three/drei'

function Torso(props) {
    const {scene} = useGLTF('/4 arm torso.glb')
    return <primitive object={scene} {...props} />
}

// interactivity variable ideas:
// environment preset : apartment, city, dawn, forest, studio, sunset, 
// background color : #fff, #808080, #cdbaba, #697b56, #a39a8e, #373137
// mesh shader? 
// mesh rotation : drag/click
// camera fov : find relationship between fov and scale to make mesh appear the same size each time fov is changed

const ENVIRONMENT_PRESETS = ["city", "dawn", "forest", "studio", "sunset"]
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

export default class About extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xRotation: 0,
            yRotation: 0,
            zRotation: 0, 
            environment: ENVIRONMENT_PRESETS[Math.floor(Math.random() * ENVIRONMENT_PRESETS.length)],
            background: BACKGROUND_COLORS[Math.floor(Math.random() * BACKGROUND_COLORS.length)],
            dragging: false,
        }
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    handleMouseDown(event){
        this.setState({dragging: true})
    }
    handleMouseMove(event){
        if(this.state.dragging){
            this.setState((prevstate) => ({
                yRotation: prevstate.yRotation + event.movementX/MOUSE_SENSITIVITY,
                xRotation: prevstate.xRotation + event.movementY/MOUSE_SENSITIVITY
            }))
        }
    }
    handleMouseUp(event){
        this.setState({dragging: false})
    }
    componentDidMount(){
        document.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }
    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }
    render(){
        console.log(this.state.background);
        return (
            <div id="about" style={{backgroundColor: this.state.background}}>
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
                <Canvas id="canvas" camera={{ position: [-2.5,1.5,4], fov: 10 }} >
                    <ambientLight intensity={0.5} />
                    <Torso position={[0.3,-0.2,0]} rotation={[this.state.xRotation, this.state.yRotation, this.state.zRotation]} scale={0.225} />
                    <Environment preset={this.state.environment} />
                </Canvas>
            </div>
        )
    }
}