import React from "react";
import { useNavigate } from "react-router-dom";

function PracticePage() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/game")}> Start Game </button>
    </div>
  );
}

export default PracticePage;