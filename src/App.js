import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
//import About from './About.js'
import Test from './test';
import Test2 from './test2';

export default function App() {
    const appRef = useRef();
    let layer1;
    let divOffset = 0;
    let scrollPosition = 0;
  
    function linearInterpolation(x1, x2, easingValue) {
        return (1 - easingValue) * x1 + easingValue * x2;
    }

    useLayoutEffect(() => {
        const main = document.getElementById("main");
        layer1 = document.querySelectorAll(".layer1");
        document.body.style.height = main.clientHeight + "px";
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
        appRef.current.style.transform = `translateY(-${divOffset}px)`; 
        layer1.forEach((e) => {
            e.style.transform = `translateY(-${divOffset * 0.5}px)`;
        })   
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
                    <Test divOffset={divOffset}/>
                    <Test2 divOffset={divOffset}/>
                </div>
            </>
    )
}