import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import { useNavigate } from "react-router-dom";
//import bananaPic from "./fruitPics./banana.svg";
//import strawPic from "./fruitPics./strawberry.svg";
//import grapesPic from "./fruitPics./grapes.svg";
//import applePic from "./fruitPics./apple.svg";

import * as THREE from "three"; // Import Three.js
import "./App.css";
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Obj({ position, url ,rotation }) {
  const gltf = useLoader(GLTFLoader, url); // Load the model
  return (
    <primitive object={gltf.scene} position={position} rotation={rotation} scale={[1, 1, 1]} />
  );
}
function App(player, setPlayer) {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });

  /*
  Fruit object: stores size (how big the fruit is/difficulty of slicing it) and probability (chance of getting this fruit). 
  Have the score depend on size and probability (fruitPts = (100/size * probability) * 100)
  */
  function Fruit(size, probability) {
    this.radius = size;
    this.probability = probability;
    this.pic = null;
    this.location = {x: null, y: null} ; // pair for location
  }

  //const banana = new Fruit(10, 0.5, bananaPic);
  //const grapes = new Fruit(20, 0.3, grapesPic);
  // const apple = new Fruit(5, 0.2, applePic);
  //const strawberry = new Fruit(2, 0.1, strawPic);

  //const fruits = [banana, grapes, strawberry]; // not const because fruits may be added as time goes on in the game (i.e better fruits w/ higher score)
  //const lives = 3;

  function checkDot() {
    /*
    for each fruit on canvas, 
      if dotPosition is in fruit'sPosition +/- radius, fruit disappear
      score += 100/fruitSize
    */
  }

  function generateFruit() {
    //genFruit = fruits[Math.floor(Math.random() * 4)]; // choose fruit from (0, 3)
    //genFruit.location = {x: Math.floor(Math.random() * 50) + 25, y: Math.floor(Math.random() * 50) + 25}; // choose location from (25, 75)
    /*
    render fruit on canvas
    checkDot()
    disappear after 3-4 seconds - lose life if fruit disappears 
    */
    
  }

// Note: wherever dot is rendering, we can also render the fruit
  
  // PoseNet setup
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

      const rightWrist = pose.keypoints.find(
        (keypoint) => keypoint.part === "rightWrist"
      );

      const normalizedX = (rightWrist.position.x / videoWidth) * 100;
      const normalizedY = (rightWrist.position.y / videoHeight) * 100;
      const mirroredX=100-normalizedX;
      setDotPosition({
        x: Math.min(Math.max(mirroredX, 0), 100),
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

  useEffect(() => {
    runPosenet();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            top: "5%",
            left: "5%",
            width: "640px",
            height: "480px",
            border: "2px solid red",
            zIndex: 10,
            transform: "scaleX(-1)", // Mirror the webcam feed
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: "5%",
            left: "5%",
            width: "640px",
            height: "480px",
            zIndex: 9,
            transform: "scaleX(-1)", // Mirror the canvas
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "5%",
            width: "640px",
            height: "480px",
            border: "2px solid black",
            zIndex: 15,
          }}
        >
          <div
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
          <Canvas style={{ //
            position: "absolute",
            width: "640px",
            height: "480px",
            left: "5%",
            top: "50%",
            }}
            gl={{alpha: false, antialias: true, }} 
            camera={{ position: [0, 0, 5], fov: 75 }} 
            onCreated={({ gl }) => {gl.setClearColor(0xffffff); }}>
            
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} />
            <Obj 
              position={[(dotPosition.x / 100) * 10 - 5,-(dotPosition.y / 100) * 10 + 5,0]}  
              rotation={[0, 0, Math.PI / 4]}
              url="/models/hand.glb"/>
          </Canvas>
      </header>
    </div>
  );
}

export default App; 