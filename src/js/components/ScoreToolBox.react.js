import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import AddonRemove from "../components/AddonRemove.react";
import CardScore from "../components/CardScore.react";
import ToolCardWithAddon from "../components/ToolCardWithAddon.react";
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
      if (!this.props.isGameStarted && players.size > 1) {
        addon = <AddonRemove />;
      }
      const removePlayer = () => {
        this._onRemovePlayer(playerId);
      };
      elements.push(<ToolCardWithAddon
        key={key}
        direction="left"
        width="w2"
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
          transitionName="card-left-w3"
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
