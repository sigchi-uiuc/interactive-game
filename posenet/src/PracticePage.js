import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import REACTDOM from "react-router-dom";

import { ReactComponent as Grape } from "./PracticeImportFiles/Images/grape.svg";
import { ReactComponent as HalfApple } from "./PracticeImportFiles/Images/halfapple.svg";
import { ReactComponent as HalfPeach } from "./PracticeImportFiles/Images/halfpeach.svg";
import { ReactComponent as Plum } from "./PracticeImportFiles/Images/plum.svg";
import { ReactComponent as Radish } from "./PracticeImportFiles/Images/radish.svg";
import { ReactComponent as Strawberry } from "./PracticeImportFiles/Images/strawberry.svg";
import { ReactComponent as Banana } from "./PracticeImportFiles/Images/banana.svg";
import { ReactComponent as Hand } from "./PracticeImportFiles/Images/hand.svg";
import { ReactComponent as CleaverA } from "./PracticeImportFiles/Images/cleaver1.svg";
import { ReactComponent as CleaverB } from "./PracticeImportFiles/Images/cleaver2.svg";
import { ReactComponent as TomatoCarrot } from "./PracticeImportFiles/Images/tomatocarrot.svg";
import './practicepage.css';

function PracticePage() {
  const navigate = useNavigate();

  const [currentPage, nextPage] = useState ([true, false, false, false, false]);

  let current = 1;
  
  function changeIndict(current) {
    let n = [false, false, false, false, false];
    n[current] = true;
    nextPage(n);
  }

  const correctButton = function (isTrue) {
    if (isTrue) {
      return <button className="btn btn-xs" style={{
        color: '#198155',
      }}> </button>
    } else {
      return <button className="btn btn-xs" style={{
        color: '#198155',
        opacity: 0.4,
      }}> </button>
    }
  }

  return (
<div className="back">
       <button className="home-button" onClick={() => navigate("/")}> Home </button>

  <div className="carousel block-c">
  
    <div id="item1" className="carousel-item div-test">
    <Radish height= "50px" width = "50px"></Radish>
    <HalfApple width = "50px" height= "50px"></HalfApple>
      <div className= "main-box">
        <h1>Welcome to the practice tutorial!</h1>
        <a href="#item2" onClick={() => changeIndict(1)}>
          <button className="login-button"> Begin </button>
        </a>
      </div>
      <div>

      </div>
    </div>

    <div id="item2" className="carousel-item div-test">
      <div className= "main-box">
        <h1>Step One: Slicing Fruit</h1>
      </div>
      <Hand height= "50px" width = "50px"></Hand>
      <HalfApple width = "50px" height= "50px"></HalfApple>
      <div className= "body-para">
      <p>Slice fruit in half with</p>
      <p>vertical hand motions to gain points</p>
      <Hand height= "50px" width = "50px"></Hand>
      <HalfPeach width = "50px" height= "50px"></HalfPeach>
      <a href="#item3" onClick={() => changeIndict(2)}>
          <button className="login-button"> Next Step </button>
      </a>
      </div>
    </div>

    <div id="item3" className="carousel-item div-test">
     <div className= "main-box">
        <h1>Step Two: When To Slice</h1>
     </div>
     <Plum width = "50px" height= "50px" position= "fixed"></Plum>
     <Strawberry width = "50px" height= "50px"></Strawberry>
     <Radish width = "50px" height= "50px"></Radish>
     <Banana width = "50px" height= "50px"></Banana>
     <div className= "body-para">
      <p>Once the fruit passing the designated cutting area, slice the fruit!</p>
      <p>**Example: Slice Vertically Here**</p>
      <p>------------------------------------------------</p>
      <a href="#item4" onClick={() => changeIndict(3)}>
        <button className="login-button"> Next Step </button>
      </a>
      <HalfApple width = "50px" height= "50px"></HalfApple>
     </div>
    </div>

    <div id="item4" className="carousel-item div-test">
     <div className= "main-box">
        <h1>Step Three: Tips</h1>
     </div>
     <Radish width = "50px" height= "50px"></Radish>
     <TomatoCarrot width = "50px" height= "50px"></TomatoCarrot>
     <div className= "body-para">
     <div className= "main-box">
        <p>Vegetables immediately end the game</p>
      </div>
      <div className= "main-box">
        <p>Slicing fruit combos award extra points!</p>
      </div>
      <Plum width = "50px" height= "50px"></Plum>
      <Strawberry width = "50px" height= "50px"></Strawberry>
      <Banana width = "50px" height= "50px"></Banana>
      <a href="#item5" onClick={() => changeIndict(4)}>
        <button className="login-button"> Next Step </button>
      </a>
     </div>
    </div>

    <div id="item5" className="carousel-item div-test">
      <div className= "main-box">
        <h1>Congratualations! You've completed the practice tutorial!</h1>
        <span>
          <button className="login-button" onClick={() => navigate("/game")}> Start Game </button>
        </span>
      </div>
    </div>
  </div>

  <footer></footer>

  <div className="flex w-full justify-center gap-2 py-2 table-of-contents">
    <a href="#item1" onClick={() => changeIndict(0)}>
      { correctButton(currentPage[0]) }
    </a>
    <a href="#item2" onClick={() => changeIndict(1)}>
      { correctButton(currentPage[1]) }
    </a>
    <a href="#item3" onClick={() => changeIndict(2)}>
      { correctButton(currentPage[2]) }
    </a>
    <a href="#item4" onClick={() => changeIndict(3)}>
      { correctButton(currentPage[3]) }
    </a>
    <a href="#item5" onClick={() => changeIndict(4)}>
      { correctButton(currentPage[4]) }
    </a>
  </div>

</div>
  );
}

export default PracticePage;