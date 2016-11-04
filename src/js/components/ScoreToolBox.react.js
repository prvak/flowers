import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import ScoreCard from "../components/ScoreCard.react";
import ToolCard from "../components/ToolCard.react";

export default class ScoreToolBox extends React.Component {
  render() {
    const players = this.props.players;
    const scores = [];
    players.forEach((player, playerId) => {
      const key = `score-${playerId}`;
      const score = player.get("score");
      //const scoreCard = <ScoreCard score={score} />;
      scores.push(<ToolCard key={key} content="C" addon="A" />);
      // const style = {
      // };
      // scores.push(<div
      //   style={style} key={key}
      //   className="tool-card tool-card-left tool-card--score"
      // >
      //   <ScoreCard score={score} />
      // </div>);
    });
    return (
      <div className="tool-box tool-box--score">
        <ReactCSSTransitionGroup
          transitionName="tool-card-left-50"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
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
