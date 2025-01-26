import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/practice")}> Go to Practice </button>
    </div>
  );
}

export default LandingPage;
