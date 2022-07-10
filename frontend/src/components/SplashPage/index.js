import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./SplashPage.css";

function importAll(r) {
  return r.keys().map(r);
}
const bgPaths = importAll(require.context("../../static/bgImgs/", false, /\.(png|jpe?g|svg)$/));
const bgImgs = [];
for (let el of bgPaths) {
  // console.log(el);
  bgImgs.push(el);
  // bgImgs.push(require('../../../..'+el));
}

const SplashPage = () => {
  const history = useHistory();
  
  const [bgNum, setBgNum] = useState(0);
  // console.log("new bg img", bgImgs[bgNum])
  const [q, setQ] = useState("");
  
  const handleSearch = e => {
    e.preventDefault();
    history.push(`/search?q=${encodeURIComponent(q)}`);
  }
  
  useEffect(() => {
    // console.log("bgImgs:", bgImgs); 
    // let i = 0;
    const bgInterval = setInterval(() => {
      // i = (i + 1) % bgImgs.length;
      setBgNum(prev => ++prev % bgImgs.length)
    }, 8000);

    return () => clearInterval(bgInterval);
  }, []);

  return (
    <div
      className={`splashBody bg${bgNum}`}
      // style={{
      //   // backgroundColor: '#030303',
      //   // backgroundImage: bgImgs[bgNum],
      //   transition: 'background-image 2s',
      //   height: "100vw",
      //   width: "100%",
      //   // zIndex: 0
      // }}
    >
      <div className="splashContent">
        <Link to="/business" className="logo splashLogo">kelp🌿</Link>
        <div className="searchbar">
          <form onSubmit={handleSearch}>
            Find
            <input
              type="text"
              name="q"
              value={q}
              onChange={e => setQ(e.target.value)}
              style={{backgroundColor: "red"}}
              />
            <button type="submit">🔍</button>
          </form>
        </div><br />
        <Link to="/business">Check out our businesses!</Link>
        {/* <h1>Splash Page</h1> */}
        {/* <p>Background:
          {bgNum}
          {bgImgs[bgNum]}
        </p> */}
      </div>
    </div>
  );
};

export default SplashPage;