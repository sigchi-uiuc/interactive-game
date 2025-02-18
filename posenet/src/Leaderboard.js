import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [playerName, setPlayerName] = useState([""]);
  const [latestScore, setLatestScore] = useState(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setScores(storedScores);

    const lastScore = sessionStorage.getItem("latestScore");
    if (lastScore){ 
      setLatestScore(parseInt(lastScore, 10));

      const isHighScore = storedScores.length < 5 || lastScore > storedScores[4].score;
      setShowInput(isHighScore);
    }
  }, []);

  const handleSubmit = () => {
    if (!playerName) return;

    const newScores = [...scores, { name: playerName, score: latestScore}]
      .sort((a,b) => b.score - a.score)
      .slice(0,5)

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
        <table style={{borderCollapse: 'collapse', width: '50%', backgroundColor: '#2e4d2e', border: '2px solid white'}}>
          <thead>
            <tr>
              <th style={{padding: '10px', border: '1px solid white' }}>Rank</th>
              <th style={{padding: '10px', border: '1px solid white' }}>Name</th>
              <th style={{padding: '10px', border: '1px solid white' }}>Score</th>
            </tr>
            <tbody>
              {score.map((entry, index) => (

                
              ))}




            </tbody>


          </thead>

        </table>

        <button onClick={() => navigate("/")}> 
          Go to Login 
        </button>
        
    </div>
  );
}

export default Leaderboard;