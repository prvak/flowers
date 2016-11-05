import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import ScoreCard from "../components/ScoreCard.react";
import ToolCard from "../components/ToolCard.react";
import GardenActions from "../actions/GardenActions";

export default class ScoreToolBox extends React.Component {
  constructor() {
    super();
    this._onRemovePlayer = (playerId) => {
      GardenActions.removePlayer(playerId);
    };
  }
  render() {
    const players = this.props.players;
    const scores = [];
    players.forEach((player, playerId) => {
      const color = player.get("color");
      const key = `score-${color}`;
      // const score = player.get("score");
      // const scoreCard = <ScoreCard score={score} />;
      const removePlayer = () => {
        this._onRemovePlayer(playerId);
      };
      scores.push(<ToolCard
        key={key}
        direction="left"
        content="C"
        addon="A" addonOnClick={removePlayer}
      />);
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
          transitionName="tool-card-left-90"
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
