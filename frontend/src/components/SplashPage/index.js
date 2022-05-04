import React, { useState, useEffect } from 'react';
import "./SplashPage.css";

function importAll(r) {
  return r.keys().map(r);
}
const bgPaths = importAll(require.context("../../static/bgImgs/", false, /\.(png|jpe?g|svg)$/));
const bgImgs = [];
for (let el of bgPaths) {
  console.log(el);
  bgImgs.push(el);
  // bgImgs.push(require('../../../..'+el));
}

const SplashPage = () => {
  const [bgNum, setBgNum] = useState(0);
  console.log("new bg img", bgImgs[bgNum])
  
  useEffect(() => {
    console.log("bgImgs:", bgImgs);
    // let i = 0;
    const bgInterval = setInterval(() => {
      // i = (i + 1) % bgImgs.length;
      setBgNum(prev => ++prev % bgImgs.length)
    }, 7000);

    return () => clearInterval(bgInterval);
  }, []);

  return (
    <div
      className={`splashBody bg${bgNum}`}
      style={{
        // backgroundColor: '#030303',
        // backgroundImage: bgImgs[bgNum],
        transition: 'background-image 2s',
        height: "100vw",
        width: "100%",
        // zIndex: 0
      }}
    >
      <h1>Splash Page</h1>
      <p>Background:
        {bgNum}
        {bgImgs[bgNum]}
      </p>
    </div>
  );
};

export default SplashPage;