import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import ScoreCard from "../components/ScoreCard.react";

export default class ScoreToolBox extends React.Component {
  render() {
    const players = this.props.players;
    const scores = [];
    players.forEach((player, playerId) => {
      const key = `score-${playerId}`;
      const score = player.get("score");
      const style = {
      };
      scores.push(<div
        style={style} key={key}
        className="tool-card tool-card--score"
      >
        <ScoreCard score={score} />
      </div>);
    });
    return (
      <div className="tool-box tool-box--score">
        <ReactCSSTransitionGroup
          transitionName="tool-card--score"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {scores}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

ScoreToolBox.propTypes = {
  players: React.PropTypes.object.isRequired,
};
