import React from "react";
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls } from '@react-three/drei'

function Torso(props) {
    const {scene} = useGLTF('/4 arm torso.glb')
    return <primitive object={scene} {...props} />
}

export default class About extends React.Component {
    render(){
        return (
            <Canvas camera={{ position: [5, 5, -5], fov: 25 }}>
                <ambientLight intensity={0.5} />
                <Torso position={[-0.1, -0.2, 0]} rotation={[0, Math.PI / 2, 0]} scale={0.2} />
                <Environment preset="city" />
                <OrbitControls minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
            </Canvas>
        )
    }
}