import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as LeftKnife } from "./svgs/left_knife.svg";
import { ReactComponent as RightKnife } from "./svgs/right_knife.svg";

import './scoreboard.css';

// const cleaverIconURL = "https://zh.wikipedia.org/wiki/%E5%BB%9A%E5%88%80#/media/File:Cucina_012.jpg"

function Scoreboard(player, setPlayer, playerList, setPlayerList) {
  const navigate = useNavigate();
  return (
    <div className="scoreboard-page">
      <div className="scoreboard-header">
        <LeftKnife className="scoreboard-knife-left"></LeftKnife>
        <div className="scoreboard-title-container">
          <div className="scoreboard-title">Your score:</div>
          <div className="scoreboard-score">1530</div>
        </div>
        <RightKnife className="scoreboard-knife-right"></RightKnife>
      </div>

      <div className="scoreboard-container">
        <table class="scoreboard-table">
          <tr>
            <td class="left">Rank</td>
            <td class="right">4th</td>
          </tr>
          <tr>
            <td class="left">Accuracy</td>
            <td class="right">78%</td>
          </tr>
          <tr>
            <td class="left">Time Played</td>
            <td class="right">5 min 12 sec</td>
          </tr>
        </table>
      </div>
    
      <button className="next-button" onClick={() => navigate("/leaderboard")}>
          Next
      </button>
    </div>
  );
  
}

export default Scoreboard;