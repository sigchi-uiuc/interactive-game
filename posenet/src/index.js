import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LoginPage';
import PracticePage from './PracticePage';
import Scoreboard from './Scoreboard';
import Leaderboard from './Leaderboard';
import App from './App';

/* 
index is the control center for our spy operation. By setting it as root, we're telling react that this is our home base. This is where we call the agents and teams.
*/
const root = ReactDOM.createRoot(document.getElementById('root'));

function Main() {
  // State needs to be inside a function, so we move it here
  const [playerList, setPlayerList] = useState([]);
  const [player, setPlayer] = useState();
  const [overallScore, setOverallScore] = useState(0);
  const [overallAccuracy, setOverallAccuracy] = useState(0);
  const [overalltime, setOverallTime] = useState(0);
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage player={player} setPlayer={setPlayer} />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/game" element={<App player={player} setPlayer={setPlayer} overallScore={overallScore} setOverallScore={setOverallScore} overallAccuracy={overallAccuracy} setOverallAccuracy={setOverallAccuracy} overalltime={overalltime} setOverallTime={setOverallTime}/>} />
          <Route path="/scoreboard" element={<Scoreboard  player={player} playerList={playerList} setPlayerList={setPlayerList} overallScore={overallScore} overallAccuracy={overallAccuracy} overalltime={overalltime} /> } />
          <Route path="/leaderboard" element={<Leaderboard setPlayer={setPlayer} playerList={playerList} setOverallScore={setOverallScore} setOverallAccuracy={setOverallAccuracy} setOverallTime={setOverallTime}/>} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}

// Render everything properly
root.render(<Main />);



/*NOT COMMENTS WRITTEN BY ADITI*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
