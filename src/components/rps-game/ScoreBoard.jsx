import React from 'react';

export const ScoreBoard = ({ score }) => {
  return (
    <div className="score-row rps-score-card">
      <div className="score-item">
        <span className="label">Player</span>
        <strong className="value" id="score-player">{score.player}</strong>
      </div>
      <div className="score-divider"></div>
      <div className="score-item">
        <span className="label">CPU</span>
        <strong className="value" id="score-cpu">{score.cpu}</strong>
      </div>
      <div className="score-divider"></div>
      <div className="score-item">
        <span className="label">Ties</span>
        <strong className="value" id="score-ties">{score.ties}</strong>
      </div>
    </div>
  );
};