// javascript
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as LeftKnife } from "./svgs/left_knife.svg";
import { ReactComponent as RightKnife } from "./svgs/right_knife.svg";

import './leaderboard.css';



function Leaderboard({player, setPlayer, playerList, setPlayerList}) {
  const navigate = useNavigate();
  const [sortedPlayerList, setSortedPlayerList] = useState([]);



  // useEffect(() => {
  //   setPlayerList([["newPlayer", "50"]]);
  // }, [setPlayerList]);

  useEffect(() => {
    // sort the list of players and their scores in descending order (ranked by score)
    const sortedList = ([...playerList].sort((a, b) => Number(b[1]) - Number(a[1]))).slice(0, 5);
    setSortedPlayerList(sortedList);
  }, [playerList] );

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (!playerName) return;

  //   const newScores = [...scores, { name: playerName, score: latestScore }]
  //     .sort((a, b) => b.score - a.score)
  //     .slice(0, 5)

  //   setScores(newScores);
  //   localStorage.setItem("leaderboard", JSON.stringify(newScores));
  //   setShowInput(false);
  // };

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
                <td>{index + 1}</td>
                <td>{entry[0]}</td>
                <td>{entry[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* {showInput && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              placeholder="Enter your name"
            />
            <button type="submit">Submit</button>
          </form>
        )} */}
      </div>
      <button className="play-again-button" onClick={() => navigate("/")}>
         Play Again?
      </button>
    </div>
  );
}

export default Leaderboard;