import React from "react";

export default class ScoreCard extends React.Component {
  render() {
    const score = this.props.score;
    return <div>{score}</div>;
  }
}

ScoreCard.propTypes = {
  score: React.PropTypes.number.isRequired,
};
