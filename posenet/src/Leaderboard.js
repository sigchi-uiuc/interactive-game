```javascript
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
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
    <div style={{
      backgroundColor: "#ECFCE5",
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: "sans-serif",
    }}>
      <h1>🏆 Top Scores</h1>
      <table style={{ borderCollapse: 'collapse', width: '50%', backgroundColor: '#2e4d2e', border: '2px solid white' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid white' }}>Rank</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Score</th>
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
      <button onClick={() => navigate("/")}>
        Go to Login
      </button>
    </div>
  );
}

export default Leaderboard;
```