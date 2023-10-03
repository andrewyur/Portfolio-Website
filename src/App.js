import React, { useLayoutEffect, useState, useEffect, useRef, Suspense } from "react";
import About from './About.js'
import Projects from './Projects.js'

export default function App() {
    const appRef = useRef();
    let layer1;
    let layer2;
    let layer21;
    let divOffset = 0;
    let divOffset2 = 0;
    let scrollPosition = 0;
  
    function linearInterpolation(x1, x2, easingValue) {
        return (1 - easingValue) * x1 + easingValue * x2;
    }

    useLayoutEffect(() => {

        layer1 = document.querySelectorAll(".layer1");
        layer2 = document.querySelectorAll(".layer2");
        layer21 = document.querySelectorAll(".layer21");
        const main = document.getElementById("main");
        document.body.style.height = main.clientHeight + "px";
        console.log(main.clientHeight)
        window.requestAnimationFrame(render);
    });

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
          Math.floor(linearInterpolation(divOffset2, scrollPosition, 0.04) * 100) /
          100;
        if(appRef.current != null){
            appRef.current.style.transform = `translateY(-${divOffset * 0.5}px)`; 
            layer1.forEach((e) => {
                e.style.transform = `translateY(-${divOffset * 0.5}px)`;
            })
            layer2.forEach((e) => {
                e.style.transform = `translateY(-${divOffset2 * 0.8}px)`;
            })
            layer21.forEach((e) => {
                e.style.transform = `translateY(-${divOffset2 * 0.8}px)`;
            })   
        }
        window.requestAnimationFrame(render);
    };


    return (
            <>
                <nav id="nav">
                    <a href="#about">ABOUT</a>
                    <a href="#about">ABOUT</a>
                    <a href="#about">ABOUT</a>
                </nav>
                <div id="main" ref={appRef}>
                    <About/>
                    <Projects/>
                </div>
            </>
    )
}