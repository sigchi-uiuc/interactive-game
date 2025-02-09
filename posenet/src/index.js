import React from 'react';
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
root.render(
  <React.StrictMode>
    {/*Here we are setting up the routers, or if we wanna keep our spy motifs, the different agents and their specialties. If a "/" url (or mission in our spy analogy)
    we send it to the code the landing page code (or the agent with the codename LandingPage).*/}
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/practice" element={<PracticePage/>} />
        <Route path="/game" element={<App />} />
        <Route path="/scoreboard" element={<Scoreboard/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
      </Routes>
    </Router>
    {/*Go to LoginPage.js to learn more about navigation between pages of a website*/}
  </React.StrictMode>
);


/*NOT COMMENTS WRITTEN BY ADITI*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
