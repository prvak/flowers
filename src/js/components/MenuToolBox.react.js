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
    const logoCard = (<ToolCard
      key="logo"
      direction="left"
      width="w3"
      content={<span className="logo">"Flowers"</span>}
      contentOnClick={this._onNewGame}
    />);
    elements.push(logoCard);

    if (this.props.isGameStarted && !this.props.isGameOver) {
      const newGameCard = (<ToolCard
        key="new-game"
        direction="left"
        width="w3"
        content={<div>"New Game"</div>}
        contentOnClick={this._onNewGame}
      />);
      elements.push(newGameCard);
    } else if (!this.props.isGameStarted || this.props.isGameOver) {
      const startGameCard = (<ToolCard
        key="start-game"
        direction="left"
        width="w3"
        content={<div>"Start Game"</div>}
        contentOnClick={this._onStartGame}
      />);
      elements.push(startGameCard);
    }

    return (
      <div className="tool-box tool-box--menu">
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

MenuToolBox.propTypes = {
  isGameOver: React.PropTypes.bool.isRequired,
  isGameStarted: React.PropTypes.bool.isRequired,
};
