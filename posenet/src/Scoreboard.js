import React from "react";
import { useNavigate } from "react-router-dom";

function Scoreboard(player, setPlayer, playerList, setPlayerList) {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/leaderboard")}> Go to Leaderboard </button>
    </div>
  );
}

export default Scoreboard;