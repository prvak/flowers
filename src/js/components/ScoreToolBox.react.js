import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import AddonRemove from "../components/AddonRemove.react";
import CardScore from "../components/CardScore.react";
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
    const elements = [];
    players.forEach((player, playerId) => {
      const color = player.get("color");
      const score = player.get("score");
      const key = `score-${color}`;
      const card = <CardScore color={color} score={score} />;
      let addon = undefined;
      if (!this.props.isGameStarted) {
        addon = <AddonRemove />;
      }
      const removePlayer = () => {
        this._onRemovePlayer(playerId);
      };
      elements.push(<ToolCard
        key={key}
        direction="left"
        content={card}
        addon={addon} addonOnClick={removePlayer}
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
          {elements}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

ScoreToolBox.propTypes = {
  isGameOver: React.PropTypes.bool.isRequired,
  isGameStarted: React.PropTypes.bool.isRequired,
  players: React.PropTypes.object.isRequired,
};
