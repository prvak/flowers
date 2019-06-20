import React from "react";
import PropTypes from "prop-types";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import GardenActions from "../actions/GardenActions";
import ToolCard from "./ToolCard.react";

export default class MenuToolBox extends React.Component {
  constructor() {
    super();
    this._onNewGame = () => {
      GardenActions.newGame();
    };
    this._onStartGame = () => {
      GardenActions.startGame();
    };
  }

  render() {
    const elements = [];
    const logoCard = (
      <ToolCard
        key="logo"
        direction="left"
        width="w3"
        content={<div className="logo card--centered">Flowers</div>}
      />
    );
    elements.push(logoCard);

    if (this.props.isGameStarted || this.props.isGameOver) {
      const newGameCard = (
        <ToolCard
          key="new-game"
          direction="left"
          width="w3"
          content={<div className="card--centered">New Game</div>}
          contentOnClick={this._onNewGame}
        />
      );
      elements.push(newGameCard);
    } else if (!this.props.isGameStarted || this.props.isGameOver) {
      const startGameCard = (
        <ToolCard
          key="start-game"
          direction="left"
          width="w3"
          content={<div className="card--centered">Start Game</div>}
          contentOnClick={this._onStartGame}
        />
      );
      elements.push(startGameCard);
    }

    return (
      <div className="tool-box tool-box--menu">
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

MenuToolBox.propTypes = {
  isGameOver: PropTypes.bool.isRequired,
  isGameStarted: PropTypes.bool.isRequired,
};
