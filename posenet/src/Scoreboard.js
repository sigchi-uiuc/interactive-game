import React from "react";
import { useNavigate } from "react-router-dom";

function Scoreboard() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/leaderboard")}> Go to Leaderboard </button>
    </div>
  );
}

export default Scoreboard;