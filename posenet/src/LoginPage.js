import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Grape } from "./LoginPageImages/logingrape.svg";
import { ReactComponent as Strawberry } from "./LoginPageImages/loginstrawberry.svg";
import { ReactComponent as Plum } from "./LoginPageImages/loginplum.svg";
import { ReactComponent as KnifeLeft } from "./LoginPageImages/loginknife2.svg";
import {ReactComponent as KnifeRight} from "./LoginPageImages/loginknife1.svg";

function LandingPage() {
  /*
  Keeping with our spy analogy, const navigate is the phoneline LandingPage will use to transfer missions to other agents. useNavigate() is the company they 
  have contracted to run these services.
  */
  const [player, setPlayer] = useState();
  const navigate = useNavigate();

  // handle button click (start game) - The function name can be changed
  const startGame = () => {
    if (player) {
      navigate("/practice", { state: { player } });
    } else {
      alert("Please enter a username to start the game.");
    }
  }

  // need to implement return part
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-600"> 
      <h1 className="text-6xl font-bold text-primary mb-8 text-white">
      Kitchen Ninja
      </h1>
      
      <div className="card bg-green-400 shadow-xl p-8 flex flex-col items-center gap-4">
        <input
          type="text"
          className="input input-bordered w-80 text-white"
          placeholder="Enter your username"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
        />

        <button className="btn btn-primary w-40 bg-green-500" onClick={startGame}> 
          Go to Practice
        </button>
      </div>
      <Plum width = "35vh" height= "35h" className="absolute top-30 left-40"></Plum>
      <Grape width = "25vh" height = "25vh" className="absolute bottom-25 right-40"></Grape>
      <Strawberry width = "25vh" height = "25vh" className="absolute bottom-5 right- 30"></Strawberry>
      <KnifeRight width="30vh" height="30vh" className="absolute top-10 right-110"></KnifeRight>     
      <KnifeLeft width = "30vh" height = "30vh" className="absolute top-10 left-110"></KnifeLeft>

    </div>
  );
}

/*
One thing you will see here is that instead of giving detailed styling for the button I gave it a class="btn". For this project, I've tried to implement a 
CSS system called DaisyUI. DaisyUI (like tailwind and other such things) is basically a set of css presets. Instead of defining everything about your button,
you can just simply as Daisy for how she likes to style her button by doing class="btn" (btn being the name of her preset). Here's a website listing all the 
things Daisy can help you with https://daisyui.com/components/. Either jsx or html should work - just use whichever one works, javascript is finnicky.
*/

export default LandingPage;
