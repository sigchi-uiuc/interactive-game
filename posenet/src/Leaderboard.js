import React from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}> Go to Login </button>
    </div>
  );
}

export default Leaderboard;