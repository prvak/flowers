import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import GardenActions from "../actions/GardenActions";
import ToolCard from "../components/ToolCard.react";

export default class MenuToolBox extends React.Component {
  constructor() {
    super();
    this._onNewGame = () => {
      console.log("Not implemented yet.");
    };
    this._onStartGame = () => {
      GardenActions.startGame();
    };
  }
  render() {
    const elements = [];
    const logoCard = (
      <div key="logo" className="tool-card tool-card-left tool-card--logo">
        <span className="logo">
          Flowers
        </span>
      </div>
    );
    elements.push(logoCard);

    if (this.props.isGameStarted && !this.props.isGameOver) {
      const newGameCard = (<ToolCard
        key="new-game"
        direction="left"
        content={<div>"New Game"</div>}
        contentOnClick={this._onNewGame}
      />);
      elements.push(newGameCard);
    } else if (!this.props.isGameStarted || this.props.isGameOver) {
      const startGameCard = (<ToolCard
        key="start-game"
        direction="left"
        content={<div>"Start Game"</div>}
        contentOnClick={this._onStartGame}
      />);
      elements.push(startGameCard);
    }

    return (
      <div className="tool-box tool-box--menu">
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

MenuToolBox.propTypes = {
  isGameOver: React.PropTypes.bool.isRequired,
  isGameStarted: React.PropTypes.bool.isRequired,
};
