import React from "react";
import About from './About.js'

// TODO:
// nav banner

// INSPIRATIONS:
// https://robbowen.digital/
// https://brittanychiang.com/
// https://yuta-abe.com/


export default class App extends React.Component {
    render() {
        return (
            <>
                <nav id="nav">
                    <a href="#about">ABOUT</a>
                    <a href="#about">ABOUT</a>
                    <a href="#about">ABOUT</a>
                </nav>
                <About/>
            </>
        )
    }
}