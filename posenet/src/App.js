import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import { useNavigate } from "react-router-dom";

import "./App.css";



function App() {
  const navigate = useNavigate();

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [dotPosition, setDotPosition] = useState({ x: 50, y: 50 });

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
      </header>

    </div>
  );
}

export default App;
