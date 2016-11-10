import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import AddonRemove from "../components/AddonRemove.react";
import AddonWinner from "../components/AddonWinner.react";
import CardScore from "../components/CardScore.react";
import ToolCard from "../components/ToolCard.react";
import ToolCardWithAddon from "../components/ToolCardWithAddon.react";
import GardenActions from "../actions/GardenActions";
import GardenConstants from "../constants/GardenConstants";

export default class ScoreToolBox extends React.Component {
  constructor() {
    super();
    this._onAddPlayer = (color) => {
      GardenActions.addPlayer(color);
    };
    this._onRemovePlayer = (playerId) => {
      GardenActions.removePlayer(playerId);
    };
  }
  _findBestPlayerId(players) {
    let bestScore = 0;
    let bestPlayerId = 0;
    players.forEach((player, playerId) => {
      const score = player.get("score");
      if (bestScore < score) {
        bestScore = score;
        bestPlayerId = playerId;
      }
    });
    return bestPlayerId;
  }

  render() {
    const players = this.props.players;
    const bestPlayerId = this._findBestPlayerId(players);
    const elements = [];
    players.forEach((player, playerId) => {
      const color = player.get("color");
      const score = player.get("score");
      const key = `score-${color}`;
      const card = <CardScore color={color} score={score} />;
      let addon = undefined;
      let addonKey = undefined;
      let addonOnClick = undefined;
      if (!this.props.isGameStarted && players.size > 1) {
        addon = <AddonRemove />;
        addonKey = "remove";
        addonOnClick = () => {
          this._onRemovePlayer(playerId);
        };
      } else if (this.props.isGameOver && playerId === bestPlayerId) {
        addon = <AddonWinner />;
        addonKey = "winner";
      }
      elements.push(<ToolCardWithAddon
        key={key}
        direction="left"
        width="w2"
        order={players.size - playerId}
        content={card}
        addon={addon} addonKey={addonKey} addonOnClick={addonOnClick}
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
    if (players.size < 3 && !this.props.isGameStarted) {
      const allColors = [
        GardenConstants.PLAYER_COLOR_RED,
        GardenConstants.PLAYER_COLOR_PURPLE,
        GardenConstants.PLAYER_COLOR_YELLOW,
      ];
      const addPlayer = () => {
        const freeColor = allColors.find((color) => {
          const found = players.find((player) => {
            return player.get("color") === color;
          });
          return !found;
        });
        this._onAddPlayer(freeColor);
      };
      elements.push(<ToolCard
        key="add-player"
        direction="left"
        width="w1"
        order={-1}
        content={<div className="card--centered">+</div>} contentOnClick={addPlayer}
      />);
    }
    // Reverse the order so that the player that was added latest is at the top.
    elements.reverse();
    return (
      <div className="tool-box tool-box--score">
        <ReactCSSTransitionGroup
          className="tool-card-list"
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
