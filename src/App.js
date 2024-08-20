import React, { useState } from 'react';
import './App.css';

function App() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [team1Players, setTeam1Players] = useState(Array(11).fill(""));
  const [team2Players, setTeam2Players] = useState(Array(11).fill(""));
  const [currentBatsman, setCurrentBatsman] = useState("");
  const [currentBowler, setCurrentBowler] = useState("");
  const [score, setScore] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [overs, setOvers] = useState(0);
  const [balls, setBalls] = useState(0);
  const [matchDone, setMatchDone] = useState(false);

  const handleTeamNameChange = (e, team) => {
    const { value } = e.target;
    if (team === 1) setTeam1(value);
    if (team === 2) setTeam2(value);
  };

  const handlePlayerNameChange = (e, team, index) => {
    const { value } = e.target;
    if (team === 1) {
      const players = [...team1Players];
      players[index] = value;
      setTeam1Players(players);
    } else if (team === 2) {
      const players = [...team2Players];
      players[index] = value;
      setTeam2Players(players);
    }
  };

  const selectBatsman = (e) => {
    setCurrentBatsman(e.target.value);
  };

  const selectBowler = (e) => {
    setCurrentBowler(e.target.value);
  };

  const incrementScore = (value) => {
    setScore(score + value);
    nextBall();
  };

  const incrementWicket = () => {
    if (wickets < 10) {
      setWickets(wickets + 1);
      nextBall();
    }
    if (wickets === 9) {
      setMatchDone(true);
    }
  };

  const incrementWide = () => {
    setScore(score + 1);
    // Do not increment balls
  };

  const nextBall = () => {
    if (balls < 5) {
      setBalls(balls + 1);
    } else {
      setBalls(0);
      setOvers(overs + 1);
    }
  };

  const resetGame = () => {
    setScore(0);
    setWickets(0);
    setOvers(0);
    setBalls(0);
    setMatchDone(false);
    setCurrentBatsman("");
    setCurrentBowler("");
  };

  return (
    <div className="App">
      <header>
        <h1>Cricket Score Tracker</h1>
      </header>
      {!matchDone ? (
        <>
          <div>
            <h2>Enter Team Names:</h2>
            <input
              type="text"
              placeholder="Team 1"
              value={team1}
              onChange={(e) => handleTeamNameChange(e, 1)}
            />
            <input
              type="text"
              placeholder="Team 2"
              value={team2}
              onChange={(e) => handleTeamNameChange(e, 2)}
            />
          </div>

          <div>
            <h2>Enter Player Names for {team1}:</h2>
            {team1Players.map((player, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Player ${index + 1}`}
                value={player}
                onChange={(e) => handlePlayerNameChange(e, 1, index)}
              />
            ))}
          </div>

          <div>
            <h2>Enter Player Names for {team2}:</h2>
            {team2Players.map((player, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Player ${index + 1}`}
                value={player}
                onChange={(e) => handlePlayerNameChange(e, 2, index)}
              />
            ))}
          </div>

          <div>
            <h2>Select Batsman from {team1}:</h2>
            <select onChange={selectBatsman}>
              <option value="">Select Batsman</option>
              {team1Players.map((player, index) => (
                <option key={index} value={player}>
                  {player}
                </option>
              ))}
            </select>

            <h2>Select Bowler from {team2}:</h2>
            <select onChange={selectBowler}>
              <option value="">Select Bowler</option>
              {team2Players.map((player, index) => (
                <option key={index} value={player}>
                  {player}
                </option>
              ))}
            </select>
          </div>

          <h2>Score: {score}/{wickets} Overs: {overs}.{balls}</h2>
          <h3>Batsman: {currentBatsman} | Bowler: {currentBowler}</h3>

          <div>
            <button onClick={resetGame}>Reset</button>
            <button onClick={() => incrementScore(1)}>+1 Run</button>
            <button onClick={() => incrementScore(4)}>+4 (Boundary)</button>
            <button onClick={() => incrementScore(6)}>+6 (Six)</button>
            <button onClick={incrementWicket}>Wicket</button>
            <button onClick={incrementWide}>Wide</button>
          </div>
        </>
      ) : (
        <div>
          <h2>Match Done! Final Score: {score}/{wickets}</h2>
          <button onClick={resetGame}>Start New Match</button>
        </div>
      )}
    </div>
  );
}

export default App;
