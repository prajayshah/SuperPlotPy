// import React from 'react'
import React, { useState, useEffect } from "react";
// import { Interactive } from "https://vectorjs.org/interactive.js";
import logo from './logo.svg';

import './App.css'


// halk baked example of making rectangle with mouse

// const initMouse = {
//   lastMoveX:0,
//   lastMoveY:0,
//   width:0,
//   height:0,
//   offsetX:0,
//   offsetY:0,
//   startX:0,
//   startY:0,
//   isDrawing: false
// }



// const getElOffset = el => {
//   const rect = el.getBoundingClientRect();

//   return {
//     top: rect.top + window.pageYOffset,
//     left: rect.left + window.pageXOffset
//   };
// };

// const getCoords = e => {
//   if (e.pageX || e.pageY) {
//     return { x: e.pageX, y: e.pageY };
//   }
//   return {
//     x: e.clientX,
//     y: e.clientY
//   };
// };

// export default function App() {
//   const [drawings, setDrawings] = React.useState([]);
//   const [mouseState, setMouseState] = React.useState(initMouse);

//   const down = e => {
//     var mouseCoords = getCoords(e);
//     var offset = getElOffset(e.target.parentNode);
//     const startX = mouseCoords.x - offset.left;
//     const startY = mouseCoords.y - offset.top;

//     setMouseState({
//       ...mouseState,
//       isDrawing: true,
//       startX: startX,
//       startY: startY,
//       width: 5,
//       height: 5,
//       offsetX: offset.left,
//       offsetY: offset.top
//     });
//   };
//   const up = e => {
//     if (!mouseState.isDrawing) return;

//     var wid = mouseState.width;
//     var hei = mouseState.height;

//     if (wid < 10 || hei < 10) {
//       setMouseState({ ...initMouse });
//     } else {
//       setMouseState({ ...initMouse });
//       setDrawings([...drawings, ...[mouseState]]);
//     }
//   };
//   const move = e => {
//     if (!mouseState.isDrawing) return;

//     var currX = e.pageX - mouseState.offsetX;
//     var currY = e.pageY - mouseState.offsetY;

//     var wid = currX - mouseState.startX;
//     var hei = currY - mouseState.startY;
//     if (wid <= 0) {
//       wid = Math.abs(wid);
//     } else {
//       currX = mouseState.startX;
//     }
//     if (hei <= 0) {
//       hei = Math.abs(hei);
//     } else {
//       currY = mouseState.startY;
//     }

//     setMouseState({
//       ...mouseState,
//       startX: currX,
//       startY: currY,
//       width: wid,
//       height: hei
//     });
//   };
//   const leave = e => {
//     if (!mouseState.isDrawing) return;
//     setMouseState({ ...initMouse });
//   };
//   const renderManual = () => {
//     return drawings.length > 0 ? (
//       <>
//         {mouseState.isDrawing ? (
//           <rect
//             x={mouseState.startX}
//             y={mouseState.startY}
//             width={mouseState.width}
//             height={mouseState.height}
//             fill="none"
//             style={{ strokeWidth: 5, stroke: "black" }}
//           />
//         ) : null}
//         {drawings.map((a, index) => (
//           <g key={index} style={{ cursor: "pointer" }}>
//             <rect
//               x={a.startX}
//               y={a.startY}
//               width={a.width}
//               height={a.height}
//               fill="none"
//               style={{ strokeWidth: 5, stroke: "black" }}
//             />
//           </g>
//         ))}
//       </>
//     ) : (
//       <>
//         {mouseState.isDrawing ? (
//           <rect
//             x={mouseState.startX}
//             y={mouseState.startY}
//             width={mouseState.width}
//             height={mouseState.height}
//             fill="none"
//             style={{ strokeWidth: 5, stroke: "black" }}
//           />
//         ) : null}
//       </>
//     );
//   };
//   return (
//     <div class="container">
//       <div class="header" />
//       <div class="lhn" />
//       <div id="canvas">
//         <div class="image" id="image" />
//         <div
//           id="svgWrapper"
//           onMouseLeave={leave}
//           onMouseUp={up}
//           onMouseMove={move}
//           onMouseDown={down}
//         >
//           <svg width="800" height="500" style={{ border: "1px solid black" }}>
//             {renderManual()}
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }











// // working example of getting svg of plot from server below:

const imageUrl = "http://127.0.0.1:5000/dataplot.svg";

console.log(imageUrl)

console.log("data:image/svg+xml;base64," + imageUrl)


const App = () => {

  // function CallApi() {
  //   const [img, setImg] = useState();

  //   const fetchImage = async () => {
  //     const res = await fetch(imageUrl);
  //     console.log(imageUrl)
  //     const imageBlob = await res.blob();
  //     const imageObjectURL = URL.createObjectURL(imageBlob);
  //     setImg(imageObjectURL);
  //   };

  //   useEffect(() => {
  //     fetchImage();
  //   }, []);
  // }
  // const img = CallApi()
  // // console.log(img)
  // console.log("data:image/svg+xml;base64," + img)


 
  const [currentSVG, setCurrentSVG] = useState();
  // console.log('first')
  useEffect(() => {
    fetch('/dataplot.svg').then(res => res.json()).then(data => {
      // console.log('second')
      // console.log(data)
      setCurrentSVG(String(data.data));
    });
  }, []);

  // console.log(currentSVG)
  
  const imgData = "data:image/svg+xml;base64," + currentSVG
  console.log(imgData)

  return (
    <div>
      {/* <img src='https://python-sci-plotting.herokuapp.com/plots/breast_cancer_data/correlation_matrix'/> */}
      <div>
        <div>
        </div>
        svg from server:
        <div>
          <img src={imgData} alt = "SVG you are trying to load!!"/>
        </div>
        {/* <img src={logo} alt = "SVG you are trying to load!!"/> */}

        svg box:
        <div>
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
          <image src={logo} height="200" width="200"/>
          </svg>
        </div>

      </div>
      
      {/* <img
        src={"imageUrl"}
        style={{ width: 100, height: 100 }}
      ></img> */}
      {/* <button onClick={CallApi}>Update custom plot </button> */}
      {/* <div id="my-interactive"></div> */}


    </div>

  )
}

export default App




// // working example of very simple useFetch below:

// import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   const [currentTime, setCurrentTime] = useState(0);
//
//   useEffect(() => {
//     fetch('/time').then(res => res.json()).then(data => {
//       console.log('first')
//       console.log(data)
//       setCurrentTime(data.time);
//     });
//   }, []);
//
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <p>The current time is {currentTime}.</p>
//       </header>
//     </div>
//   );
// }
//
// export default App;
