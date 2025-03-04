import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Skull } from "./Images/skull_symbol.svg";
import { ReactComponent as Cleaver } from "./Images/cleaver_3D.svg";

import "./App.css";


// function encopasses a singular page and all the logic required in it
function App(player, setPlayer) {
  /* 
  This portion outside the return function is all the logic. calling functions, apis and other things are done over here. Let's assume that our page code is a spy team.
  The code outside of the return function is like the cool tech guy who speaks into the spy's earpiece and tells it what to do.
  */
  const navigate = useNavigate();
  
  // webcamRef sets up the variable that we will use to refer to the webcam and canvasRef sets the reference for the space that will show us what the webcam is capturing.
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  /*
  This is the variable that stores the position of our dot. An ~interesting~ quirk of javascript/react is that if you want to set a variable that you directly change, you 
  set it up with the following format: const [varName, setVarName] = useState(*insert base state of variable*). When you want to change it you call setVarName(*insert 
  what you want to change the varible to*). Sometimes it may not work and you might have to do something else, but thats what our lord and savior stackOverflow is for.
  */
  /*
  Another tidbit is that useState() is what enables any changes to variables to be made (shoutout React), so if you want to set something to be able to change, use useState
  */
  const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });

  /*
  This function sets up our posenet model. Basically what we're doing is yelling at poseNet and wherever it is stored and telling them yo we want this specific model of 
  posenet, that give us an output of this rate, takes an input of *inputresolution* resolution and is *multiplier* big (with setting up net) The set interval function 
  within this const basically runs the detect function on the net const every 5 milliseconds.
  */
  const runPosenet = async () => {
    const net = await posenet.load({
      architecture: "MobileNetV1",
      outputStride: 16,
      inputResolution: 513,
      multiplier: 0.75,
    });
    setInterval(() => {
      detect(net);
    }, 5); 
  };

  /*
  This detect function is called by runPosenet everytime it runs. Running through this function, if it detects any webcamera input, it stores a reference to that video input and its width and height.
  The pose variable calls the posenet ml model and feeds it the video capture it got. The model does it's things and returns a list of estimated positions of all sorts of body parts and that is stored
  in const pose. There are many body parts it estimates, but for the sake of this project, rightWrist (and leftWrist) is what we care about. As such, we use the find function to look for the position 
  of the rightWrist. 
  Once we find that position, we do some ~math~ to make it fit the confines of our canvas. Then we set our dot position using our handy dandy setDotPosition function. Now that we've done that, we call
  the drawCanvas function to draw the image with the dot.
  */
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

   
      video.width = videoWidth;
      video.height = videoHeight;

      const pose = await net.estimateSinglePose(video);
      console.log(pose);

      const rightWrist = pose.keypoints.find(
        (keypoint) => keypoint.part === "rightWrist"
      );


      const normalizedX = (rightWrist.position.x / videoWidth) * 100;
      const normalizedY = (rightWrist.position.y / videoHeight) * 100;

      setDotPosition({
        x: Math.min(Math.max(normalizedX, 0), 100), 
        y: Math.min(Math.max(normalizedY, 0), 100), 
      });
    

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };


  /*
  This function is so important to spit out everything to the user. Basically, it sets the canvas as a 2d surface with the video width and height. It then draws the keypoints that we told it to
  on the canvas.
  */
  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx); 
    drawSkeleton(pose["keypoints"], 0.6, ctx);
  };

  /*Use effect is the love of React/js shenangins. It's job is to call a function everytime it detects the slightest change. So everytime the person moves, useEffect yells at runPosenet
  to do something (rude ._.)
  */
  useEffect(() => {
    runPosenet();
  }, []);

  /*This is the return function which puts all our logic into action. If you know html/css, a lot of this may look familiar. This is setting up what the user sees. We set up the Webcam 
  by creating a Webcam object. To reference it in the rest of the code, we will set it to webcamRef we set up earlier. We also give it some styling. Then we set up the canvas which
  displays our webcam input. We then make a dot and superimpose it on the canvas.*/ 
  return (
    <div className="App">
      <header className="App-header">
        <Webcam   /* Nithin's notes: THE WEBCAM WINDOW (?) */
          ref={webcamRef}
          style={{
            position: "absolute",
            top: "25%",
            left: "30%",
            width: "640px",
            height: "480px",
            border: "2px solid red",
            zIndex: 10,
          }}
        />
        <canvas   
          ref={canvasRef}
          style={{  /* Nithin's notes: THE WEBCAM WINDOW (?) */
            position: "absolute",
            top: "25%",
            left: "30%",
            width: "640px",
            height: "480px",
            zIndex: 9,
          }}
        />
        <div
          style={{  /* Nithin's notes: THE WEBCAM BORDER */
            position: "absolute",
            top: "25%",
            left: "30%",
            width: "640px",
            height: "480px",
            border: "10px solid black",
            zIndex: 15,
          }}
        > 
          <div /* Nithin's notes: THE WEBCAM DOT */
            style={{
              position: "absolute",
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
              left: `${dotPosition.x}%`,
              top: `${dotPosition.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      </header>
      <div id="rectangle"
        style={{
          position: "absolute",
          top: "8vh",
          left: "62vw",
          width: "30vw",
          height: "14vh",
          backgroundColor: "#C29F8C",
          border: "8px solid black",
          borderRadius: "26px",
          zIndex: 9,
      }}>
        <Skull style={{ 
          position: "absolute",
          top: "3%", 
          left: "10%", 
          width: "100px", 
          height: "105.26px" 
        }} />
        <Skull style={{ 
          position: "absolute",
          top: "3%", 
          left: "40%", 
          opacity: "0.3",
          width: "100px", 
          height: "105.26px" 
        }} />
        <Skull style={{ 
          position: "absolute",
          top: "3%", 
          left: "70%",
          opacity: "0.3",
          width: "100px", 
          height: "105.26px" 
        }} />
      </div>
      <Cleaver style={{ 
          position: "absolute",
          top: "5vh", 
          left: "6vw", 
          width: "172", 
          height: "193px" 
        }} />
      <div style={{ 
        position: "absolute",
        top: "8vh", 
        left: "17vw",
        fontSize: "100px",
        fontWeight: "bold",
        color: "#2F6B48",
        textShadow: "3px 3px 0px #A6786E",
        fontFamily: "'Bungee', sans-serif",
      }}> 000
      </div>
    </div>
  );
}

// Our code doesn't matter if we don't display it, so we package it into a nice little thing that when we say "App, it refers to all this code"
// (look at index.js to look at more info regarding display and routing)
export default App;
