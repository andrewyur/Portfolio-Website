import React, { useLayoutEffect, useState, useEffect, useRef, Suspense } from "react";
import About from './About.js'
import Projects from './Projects.js'

export default function App() {
    const appRef = useRef();
    let layer1;
    let layer2;
    let divOffset = 0;
    let divOffset2 = 0;
    let scrollPosition = 0;
  
    function linearInterpolation(x1, x2, easingValue) {
        return (1 - easingValue) * x1 + easingValue * x2;
    }

    useLayoutEffect(() => {
        layer1 = document.querySelectorAll(".layer1");
        layer2 = document.querySelectorAll(".layer2");
        const main = document.getElementById("main");
        document.body.style.height = main.clientHeight + "px";
        window.requestAnimationFrame(render);
    });

    console.log("here")

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    });

    const handleScroll = (event) => {
        scrollPosition = window.scrollY;
    };
    
    const render = () => {
        
        divOffset =
          Math.floor(linearInterpolation(divOffset, scrollPosition, 0.07) * 100) /
          100;
        divOffset2 =
          Math.floor(linearInterpolation(divOffset2, scrollPosition, 0.05) * 100) /
          100;
        if(appRef.current != null){
            appRef.current.style.transform = `translateY(-${divOffset}px)`; 
            layer1.forEach((e) => {
                e.style.transform = `translateY(-${divOffset * 0.5}px)`;
            })
            layer2.forEach((e) => {
                e.style.transform = `translateY(-${divOffset2 * 0.8}px)`;
            })
        }
        window.requestAnimationFrame(render);
    };


    // theme
    // gallery of pictures, interactive borders and filters, moving/flowing
    // random 3d models and textures rotate and flow from side to side
    // projects are pictures in the gallery, stationary and flowing
    

    return (
            <>
                <nav id="nav">
                    <a onClick={() => {window.scroll(0, 0)}}>ABOUT</a>
                    <a onClick={() => {window.scroll(0, document.getElementById("projects").offsetTop)}}>PROJECTS</a>
                    <a>CONTACT</a>
                </nav>
                <div id="main" ref={appRef}>
                    <About/>
                    <Projects/>
                </div>
            </>
    )
}