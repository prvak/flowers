import React from "react";

export default class CardScore extends React.Component {
  render() {
    const color = this.props.color;
    const score = this.props.score;
    return <div className="card-score">{color} {score}</div>;
  }
}

CardScore.propTypes = {
  color: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
};
