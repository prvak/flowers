import React from "react";

export default class CardScore extends React.Component {
  render() {
    const color = this.props.color;
    const score = this.props.score;
    const className = `score ${color}`;
    return (<div className="card-score card--centered">
      <span className={className}>{score}</span>
    </div>);
  }
}

CardScore.propTypes = {
  color: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
};
