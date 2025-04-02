import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as LeftKnife } from "./svgs/left_knife.svg";
import { ReactComponent as RightKnife } from "./svgs/right_knife.svg";

import './leaderboard.css';

function Leaderboard({setPlayer, playerList, setOverallScore, setOverallAccuracy, setOverallTime}) {
  const navigate = useNavigate();
  const [sortedPlayerList, setSortedPlayerList] = useState([]);

  useEffect(() => {
    // sort the list of players and their scores in descending order (ranked by score)
    const sortedList = ([...playerList].sort((a, b) => Number(b[1]) - Number(a[1]))).slice(0, 5);

    // add blank entries if the list has less than 5 recorded scores
    while (sortedList.length < 5) {
      sortedList.push(["---", "---"])
    }
    setSortedPlayerList(sortedList);
    
  }, [playerList] );

  const restart = () => {
    // reset all of the variables and navigate to start
    setPlayer(undefined);
    setOverallScore(0);
    setOverallAccuracy(0);
    setOverallTime(0);
    navigate("/");
  }

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <LeftKnife className="leaderboard-knife"></LeftKnife>
        <div className="leaderboard-title">TOP SCORES</div>
        <RightKnife className="leaderboard-knife"></RightKnife>
      </div>
      
      <div className="leaderboard-container">
     

        <table className="board-table">
          <thead>
            <tr className="board-title">
              <th>RANK</th>
              <th>NAME</th>
              <th>SCORE</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayerList.map((entry, index) => (
              <tr key={index} className="board-row">
                <td>🔪{index + 1}</td>
                <td>{entry[0]}</td>
                <td>{entry[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="play-again-button" onClick={restart}>
         Play Again?
      </button>
    </div>
  );
}

export default Leaderboard;