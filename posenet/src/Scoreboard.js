import React from "react";
import { useNavigate } from "react-router-dom";

function Scoreboard(player, setPlayer, playerList, setPlayerList) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        <button onClick={() => navigate("/leaderboard")}> Go to Leaderboard </button>
      </h1>

      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ backgroundColor: 'green', height: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', height: '50%', width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <h1 style={{ color: 'black', fontSize: '2rem', marginBottom: '10px', textAlign: 'center' }}>
              Score
            </h1>
            <p style={{ color: 'black', fontSize: '1rem', textAlign: 'center' }}>
              Best Score
            </p>
          </div>
        </div>
      <div style={{ backgroundColor: 'blue', height: '65%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ color: 'white' }}>Bottom Section </h1>
      </div>
    </div>
  );
      
    </div>
  );
}

export default Scoreboard;