import React from "react";

export default class ScoreBox extends React.Component {
  constructor() {
    super();
  }

  render() {
    let maxScore = 1; // To prevent division by zero.
    this.props.players.forEach((player) => {
      const score = player.get("score");
      maxScore = Math.max(score, maxScore);
    });
    const elements = [];
    this.props.players.forEach((player, playerId) => {
      const score = player.get("score");
      const color = player.get("color");
      const classNames = `connection ${color}`;
      const style = {
        width: `${(score / maxScore) * 100}%`,
        height: "1.5rem",
      };
      elements.push(
        <div key={playerId} className="score-line">
          <div style={style} className={classNames}></div>
          <div>{score}</div>
        </div>
      );
    });
    return (
      <div className="score-box">
        <h2>Score</h2>
        <div>{elements}</div>
      </div>
    );
  }
}

ScoreBox.propTypes = {
  players: React.PropTypes.object.isRequired,
};
