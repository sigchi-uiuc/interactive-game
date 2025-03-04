// javascript
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as LeftKnife } from "./svgs/left_knife.svg";
import { ReactComponent as RightKnife } from "./svgs/right_knife.svg";

import './leaderboard.css';



function Leaderboard({player, setPlayer, playerList, setPlayerList}) {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [latestScore, setLatestScore] = useState(null);
  const [showInput, setShowInput] = useState(false);



  const [scores, setScores] = useState([
    { name: 'Alice', score: 8500},
    { name: 'Bob', score: 9200},
    { name: 'Charlie', score: 7800},
    { name: 'David', score: 10200},
    { name: 'Eve', score: 8600}
  ]);
  
  
  const [newName, setNewName] = useState("");
  const [newScore, setNewScore] = useState("");
  
  const addPlayer = () => {
    if (!newName || isNaN(newScore) || newScore.trim() === "") return; // Prevent invalid inputs
  
    const updatedScores = [...scores, { name: newName, score: parseInt(newScore, 10) }];
    
    // Sort players by highest score first
    updatedScores.sort((a, b) => b.score - a.score);
  
    setScores(updatedScores); // Update state to reflect changes
  
    // Reset input fields after submission
    setNewName("");
    setNewScore("");
  };



  // useEffect(() => {
  //   setPlayerList([["newPlayer", "50"]]);
  // }, [setPlayerList]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setScores(storedScores);

    const lastScore = sessionStorage.getItem("latestScore");
    if (lastScore) {
      setLatestScore(parseInt(lastScore, 10));

      const isHighScore = storedScores.length < 5 || lastScore > storedScores[4]?.score;
      setShowInput(isHighScore);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!playerName) return;

    const newScores = [...scores, { name: playerName, score: latestScore }]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)

    setScores(newScores);
    localStorage.setItem("leaderboard", JSON.stringify(newScores));
    setShowInput(false);
  };

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
            {playerList.map((entry, index) => (
              <tr key={index} className="board-row">
                <td>{index + 1}</td>
                <td>{entry[0]}</td>
                <td>{entry[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {showInput && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              placeholder="Enter your name"
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      <button className="play-again-button" onClick={() => navigate("/")}>
         Play Again?
      </button>
    </div>

  );

  
}

export default Leaderboard;