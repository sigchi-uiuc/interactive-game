// javascript
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './leaderboard.css';

function Leaderboard(player, setPlayer, playerList, setPlayerList) {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [latestScore, setLatestScore] = useState(null);
  const [showInput, setShowInput] = useState(false);

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
      <div className="leaderboard-title">🏆 TOP SCORES</div>
      <div className="leaderboard-container">
     

        <table className="board-table">
          <thead>
            <tr>
              <th className="board-title">RANK</th>
              <th className="board-title">NAME</th>
              <th className="board-title">SCORE</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((entry, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid white' }}>{index + 1}</td>
                <td style={{ padding: '10px', border: '1px solid white' }}>{entry.name}</td>
                <td style={{ padding: '10px', border: '1px solid white' }}>{entry.score}</td>
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
      <button className="login-button" onClick={() => navigate("/")}>
         Go to Login
      </button>
    </div>

  );
}

export default Leaderboard;