import React from "react";
import { useNavigate } from "react-router-dom";

const cleaverIconURL = "https://zh.wikipedia.org/wiki/%E5%BB%9A%E5%88%80#/media/File:Cucina_012.jpg"

function Scoreboard(player, setPlayer, playerList, setPlayerList) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        <button onClick={() => navigate("/leaderboard")}> Go to Leaderboard </button>
      </h1>

      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* left Cleaver */}
        <img
            src={cleaverIconURL}
            alt="Cleaver Icon"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(50%)",
              width: "50px",
              height: "50px",
        }} />
            {/* Right Cleaver */}
        <img
              src={cleaverIconURL}
              alt="Cleaver Icon"
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translateY(50%)",
                width: "50px",
                height: "50px",
          }} />

        <div style={{ backgroundColor: 'green', height: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <div style={{ backgroundColor: 'white', height: '50%', width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>

            <h1 style={{ color: 'black', fontSize: '2rem', marginBottom: '10px', textAlign: 'center' }}>
              Score
            </h1>
            <p style={{ color: 'black', fontSize: '1rem', textAlign: 'center' }}>
              Best Score: 1530
            </p>

          </div>
        </div>

        <div style={{ backgroundColor: 'blue', height: '65%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ color: 'white' }}> </h1>
          
          <div style={ {display: 'grid', gridTemplateColumns: 'repeat(1, 4fr)', gap: '10px', width: '80%', height: '80%' } } >

            <div style={{ backgroundColor: 'lightpink', padding: '20px'}}>
              <strong>Ranking:</strong> 10
            </div>

            <div style={{ backgroundColor: 'lightpink', padding: '20px'}}>
              <strong>Slice Accuracy:</strong> 65%
            </div>

            <div style={{ backgroundColor: 'lightpink', padding: '20px'}}>
              <strong>Level:</strong> 8
            </div>

            <div style={{ backgroundColor: 'lightpink', padding: '20px'}}>
              <strong>Combo:</strong> 40
            </div>

            <div style={{ backgroundColor: 'lightpink', padding: '20px'}}>
              <strong>Overall Time Played:</strong> 4h
            </div>
            
          </div>
        </div>

      </div>
      
    </div>
  );
  
}

export default Scoreboard;