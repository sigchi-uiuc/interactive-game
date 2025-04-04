import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Skull } from "./Images/skull_symbol.svg";
import { ReactComponent as Cleaver } from "./Images/cleaver_3D.svg";
import { ReactComponent as bananaPic} from "./fruitPics/banana.svg"
import { ReactComponent as strawPic} from "./fruitPics/strawberry.svg"
import { ReactComponent as grapesPic} from "./fruitPics/grapes.svg"


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
function App({player, setPlayer, overallScore, setOverallScore, overallAccuracy, setOverallAccuracy, overalltime, setOverallTime}) {
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

  const [fruits, setFruits] = useState([]);
  const fruitImages = [bananaPic,strawPic,grapesPic]
  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0);
  const [score,setScore] = useState(0);
  const [livesNum, setLivesNum] = useState(5);
  const [fruitnum, setFruitnum] = useState(0);
  const [accuracy,setAccuracy] = useState(0);


  //const banana = new Fruit(10, 0.5, bananaPic);
  //const grapes = new Fruit(20, 0.3, grapesPic);
  // const apple = new Fruit(5, 0.2, applePic);
  //const strawberry = new Fruit(2, 0.1, strawPic);

  //const fruits = [banana, grapes, strawberry]; // not const because fruits may be added as time goes on in the game (i.e better fruits w/ higher score)
  //const lives = 3;

  const decreaseHealth = () => {
    setLivesNum((prevLives) => {
      if (prevLives <= -3) {
        setTimeout(() => {
          navigate("/scoreboard");
        }, 200);
        return 0;
      } else {
        return prevLives - 1;
      }
    });
  };

  const setScoreAndUpdateOverall = (newScore) => {
    setScore(newScore);
    setOverallScore(newScore);
  };

  const setAccuracyAndUpdateOverall = (newAccuracy) => {
    setAccuracy(newAccuracy);
    setOverallAccuracy(newAccuracy);
  };

  const setTimeAndUpdateOverall = (newTime) => {
    setTimeSpentOnPage(newTime);
    setOverallTime(newTime);
  }; 

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
    console.log("in generateFruit")
    const tempFruit = {
      fruitid: Math.random(),
      x : Math.floor(Math.random()*50)+5,
      y : Math.floor(Math.random()*50)+5,
      fruitpic: fruitImages[Math.floor(Math.random() * 3)]
    }
    setFruits((prev) => [...prev, tempFruit])
    setTimeSpentOnPage(timeSpentOnPage+3)
    setOverallTime(timeSpentOnPage)
    setFruitnum(fruitnum+1);
    setTimeout(() => {
      setFruits((prevFruits) => {
        decreaseHealth();
        return prevFruits.filter((fruit) => fruit.fruitid !== tempFruit.fruitid);

      });
      console.log("removing self");
    }, 5000);
    
  }

  function removeFruit(fruits,dotPosition) {
    if (fruits.length != 0) {
      console.log("in array")
      const updatedFruits = fruits.filter(fruit => {
        const distance = Math.sqrt(
          Math.pow(dotPosition.x - fruit.x, 2) + Math.pow(dotPosition.y - fruit.y, 2)
        );
        if (distance < 15) {
          console.log("cut");
          setScoreAndUpdateOverall(score + 100);
          setAccuracyAndUpdateOverall((score / 100));

        }
        return distance > 15;
      });
      setFruits(updatedFruits); 
    }
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
    const interval = setInterval(generateFruit, 3000); 
    return () => {
      clearInterval(interval);   
    };
  }, []); 
  useEffect(() => {
    const dotCheckInterval = setInterval(() => {
      removeFruit(fruits, dotPosition);
    }, 3); 

    return () => {
      clearInterval(dotCheckInterval); 
    };
  }, [fruits, dotPosition]);

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
            transform: "scaleX(-1)", // Mirror the webcam feed
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
            transform: "scaleX(-1)",
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
          {fruits.map((fruit) => (
            <div
            style={{
              position: "absolute",
              top: `${fruit.y}%`,
              left: `${fruit.x}%`,
              zIndex: 12,
            }}
          >
            <fruit.fruitpic
              style={{
                width: "100px",
                height: "100px",
              }}
            />
          </div>
          ))}
        </div>
        <Canvas
          style={{
            position: "absolute",
            top: "25%",
            left: "30%",
            width: "640px",
            height: "480px",
            zIndex: 11,
            pointerEvents: "none", 
            }}
            gl={{ alpha: true, antialias: true }}
            camera={{ position: [0, 0, 5], fov: 75 }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
        >
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <Obj 
            position={[
              (dotPosition.x / 100) * 10 - 5, 
              -(dotPosition.y / 100) * 10 + 5, 
              0
            ]}  
            rotation={[0, 0, Math.PI / 4]}
            url="/models/hand.glb"
          />
        </Canvas>
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
            opacity: livesNum >= 1 ? "1" : "0.3",
            height: "105.26px" 
          }} />
          <Skull style={{
            position: "absolute",
            top: "3%", 
            left: "40%", 
            opacity: livesNum >= 3 ? "1" : "0.3",
            width: "100px", 
            height: "105.26px" 
          }} />
          <Skull style={{ 
            position: "absolute",
            top: "3%", 
            left: "70%",
            opacity: livesNum >= 5 ? "1" : "0.3",
            width: "100px", 
            height: "105.26px" 
          }} />
        </div>
        <Cleaver style={{ 
            position: "absolute",
            top: "5%", 
            left: "6%", 
            width: "172", 
            height: "193px" 
          }} />
        <div style={{ 
          position: "absolute",
          top: "6vh", 
          left: "17vw",
          fontSize: "120px",
          fontWeight: "400",
          color: "#2F6B48",
          textShadow: "3px 3px 0px #A6786E",
          fontFamily: "'Saira Stencil One', sans-serif",
        }}> {score}
        </div>
        </header>

      </div>
  );
}

export default App; 