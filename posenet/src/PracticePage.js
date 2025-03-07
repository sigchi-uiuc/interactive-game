import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import REACTDOM from "react-router-dom";
import './practicepage.css';

function PracticePage() {
  const navigate = useNavigate();

  const [currentPage, nextPage] = useState ([true, false, false, false]);

  let current = 1;
  
  function changeIndict(current) {
    let n = [false, false, false, false];
    n[current] = true;
    nextPage(n);
  }

  const correctButton = function (isTrue) {
    if (isTrue) {
      return <button className="btn btn-xs btn-outline"></button>
    } else {
      return <button className="btn btn-xs btn-circle"></button>
    }
  }

  return (
    <div className="back">
  <span>
      <button className="home-button" onClick={() => navigate("/")}> Home </button>
    </span>

  <div className="carousel">
  
  <div id="item1" className="carousel-item div-test">
    <div className= "main-box">
      <h1>Welcome to the practice tutorial!</h1>
      <a href="#item2" onClick={() => changeIndict(2)}>
        <button className="login-button"> Begin </button>
    </a>
    </div>
  </div>

  <div id="item2" className="carousel-item div-test">
  <div className= "main-box">
    <h1>Step One: Slicing Fruit</h1>
  </div>
    <p>Slice fruit in half with</p>
    <p>vertical hand motions to gain points</p>
    <a href="#item3" onClick={() => changeIndict(3)}>
        <button className="login-button"> Next Step </button>
    </a>
  </div>

  <div id="item3" className="carousel-item div-test">
  <div className= "main-box">
    <h1>Step Two: Tips</h1>
  </div>
    <p>Vegetables immediately end the game</p>
    <p>Slicing fruit combos award extra points!</p>
    <a href="#item4" onClick={() => changeIndict(4)}>
        <button className="login-button"> Next Step </button>
    </a>
  </div>

  <div id="item4" className="carousel-item div-test">
  <div className= "main-box">
    <h1>Congratualations! You've completed the practice tutorial!</h1>
    <span>
      <button className="login-button" onClick={() => navigate("/game")}> Start Game </button>
    </span>
  </div>
  </div>

</div>
<div className="flex w-full justify-center gap-2 py-2 table-of-contents">
  <a href="#item1" onClick={() => changeIndict(1)}>
    { correctButton(currentPage[1]) }
  </a>
  <a href="#item2" onClick={() => changeIndict(2)}>
    { correctButton(currentPage[2]) }
  </a>
  <a href="#item3" onClick={() => changeIndict(3)}>
    { correctButton(currentPage[3]) }
  </a>
  <a href="#item4" onClick={() => changeIndict(4)}>
    { correctButton(currentPage[4]) }
  </a>
</div>

    </div>
    
    
  );
}

export default PracticePage;