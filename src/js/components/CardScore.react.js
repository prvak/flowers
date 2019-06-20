import React from "react";
import PropTypes from "prop-types";

export default class CardScore extends React.Component {
  render() {
    const { color } = this.props;
    const { score } = this.props;
    const className = `score ${color}`;
    return (
      <div className="card-score card--centered">
        <div className={className}><div className="score--value">{score}</div></div>
      </div>
    );
  }
}

CardScore.propTypes = {
  color: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
