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
import { ReactComponent as Skull } from "./PracticeImportFiles/Images/skull.svg";

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
  const correctImage = function (current) {
    if (current[0]) {
      return ImagesA;
    } 
    if (current[1]) {
      return ImagesB;
    }
    if (current[2]) {
      return ImagesC;
    } 
    if (current[3]) {
      return ImagesD;
    }
    if (current[4]) {
      return ImagesE;
    }
    return;
  }
  const ImagesA =
  <div className="image-container">
    <CleaverB className= "image small tenth4-h tenth8-w"></CleaverB>
    <CleaverB className= "image small tenth1-h tenth2-w rotate-90"></CleaverB>
    <Grape className= "image small tenth1-h tenth8-w"></Grape>
    <Banana className= "image medium tenth0-h tenth6-w"></Banana>
    <Strawberry className= "image small tenth2-h tenth1-w"></Strawberry>
    <HalfPeach className= "image small tenth7-h tenth1-w -rotate-45"></HalfPeach>
    <HalfApple className= "image medium tenth8-h tenth8-w rotate-45"></HalfApple>
    <Strawberry className= "image small tenth6-h tenth650-w rotate-45"></Strawberry>
    <Plum className= "image medium tenth7-h tenth3-w"></Plum>
    <Grape className= "image small tenth4-h tenth275-w -rotate-90"></Grape>
    <TomatoCarrot className= "image small tenth5-h tenth9-w"></TomatoCarrot>
    <Banana className= "image small tenth6-h tenth4-w -rotate-45"></Banana>
    <Radish className= "image small tenth0-h tenth4-w rotate-45"></Radish>
  </div>

  const ImagesB =
  <div className="image-container">
    <p className= "image line-tenth">---------------------</p>
    <p className="image tenth350-h tenth3-w">Slice fruit in half with</p>
    <p className="image tenth650-h tenth450-w">vertical hand motions to gain points.</p>
    <CleaverA className= "image small tenth5-h tenth4-w"></CleaverA>
    <Banana className= "image small tenth5-h tenth5-w"></Banana>
    <Hand className= "image large tenth250-h tenth6-w rotate-90"></Hand>
    <HalfPeach className= "image small tenth5-h tenth7-w"></HalfPeach>
    <Hand className= "image large tenth6-h tenth2-w"></Hand>
    <HalfApple className= "image medium tenth6-h tenth3-w"></HalfApple>
  </div>
/* STOP */
/* MAKE EDITS TO SCORING SYSTEM IN BLANKS*/
  const ImagesC =
  <div className="image-container">
    <div className= "image tenth4-h tenth2-w">
      <h2>*Scoring System*</h2>
      <ul>
        <li>Hit Fruits for points</li>
        <li>Missed fruits get no points!</li>
      </ul>
     </div>
    <div id="skully" className= "image main-box tenth5-h tenth5-w">
      <h2 id="scary">BEWARE!!</h2>
      <p id="scary">Missing a fruit three times results in a game over.</p>
     </div>
    <Plum className= "image small tenth1-h tenth2-w"></Plum>
    <Strawberry className= "image small tenth2-h tenth8-w"></Strawberry>
    <Skull className= "image micro tenth525-h tenth525-w"></Skull>
    <Skull className= "image micro tenth525-h tenth7-w"></Skull>
    <Radish className= "image small tenth3-h tenth650-w"></Radish>
    <Grape className= "image small tenth7-h tenth8-w"></Grape>
    <HalfApple className= "image small tenth6-h tenth4-w rotate-45"></HalfApple>
    <TomatoCarrot className= "image small tenth8-h tenth1-w -rotate-45"></TomatoCarrot>
  </div>

  const ImagesD =
    <div className="image-container">
      <div className= "main-box image tenth4-h tenth2-w">
        <p> (To be implemented!) Vegetables immediately end the game.</p>
      </div>
      <div className= "main-box image tenth6-h tenth5-w">
        <p>To be implemented!) Slicing fruit combos award extra points!</p>
      </div>
      <Radish className= "image medium tenth3-h tenth275-w"></Radish>
      <TomatoCarrot className= "image medium tenth3-h tenth3-w"></TomatoCarrot>
      <Plum className= "image medium tenth5-h tenth550-w"></Plum>
      <Banana className= "image medium tenth5-h tenth650-w"></Banana>
      <Strawberry className= "image small tenth525-h tenth6-w"></Strawberry>
    </div>

  const ImagesE =
    <div className="image-container">
        <Grape className= "image small tenth1-h tenth8-w"></Grape>
        <Banana className= "image medium tenth0-h tenth6-w"></Banana>
        <Strawberry className= "image small tenth2-h tenth1-w"></Strawberry>
        <HalfApple className= "image small tenth6-h tenth0-w"></HalfApple>
        <HalfApple className= "image medium tenth8-h tenth8-w rotate-45"></HalfApple>
        <Radish className= "image small tenth9-h tenth3-w"></Radish>
        <HalfPeach className= "image small tenth4-h tenth7-w"></HalfPeach>
        <Strawberry className= "image small tenth6-h tenth650-w rotate-45"></Strawberry>
        <Plum className= "image medium tenth7-h tenth450-w"></Plum>
        <Grape className= "image small tenth350-h tenth275-w -rotate-90"></Grape>
        <TomatoCarrot className= "image small tenth5-h tenth9-w"></TomatoCarrot>
        <Banana className= "image small tenth6-h tenth2-w -rotate-45"></Banana>
        <Radish className= "image small tenth0-h tenth4-w rotate-45"></Radish>
        <Banana className= "image small tenth7-h tenth7-w -rotate-90"></Banana>
    </div>

  return (
<div className="back">
  <button className="home-button" onClick={() => navigate("/")}> Home </button>
  <div position="absolute" width="100%">
        {correctImage(currentPage)}
  </div>
  <div className="carousel block-c">
  
    <div id="item1" className="carousel-item div-test">
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
      <div className= "more-space">
      <a href="#item3" onClick={() => changeIndict(2)}>
        <button className="login-button"> Next Step </button>
      </a>
      </div>
    </div>

    <div id="item3" className="carousel-item div-test">
     <div className= "main-box">
        <h1>Step Two: Scoring</h1>
     </div>
     <div className= "more-space">
      <a href="#item4" onClick={() => changeIndict(3)}>
        <button className="login-button"> Next Step </button>
      </a>
     </div>
    </div>

    <div id="item4" className="carousel-item div-test">
     <div className= "main-box">
        <h1>Step Three: Tips</h1>
     </div>
     <div className= "more-space">
      <a href="#item5" onClick={() => changeIndict(4)}>
        <button className="login-button"> Next Step </button>
      </a>
     </div>
    </div>

    <div id="item5" className="carousel-item div-test">
      <div className= "main-box">
        <h1>Congratulations! You've completed the practice tutorial!</h1>
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