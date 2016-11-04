import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class MenuToolBox extends React.Component {
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
      const newGameCard = (
        <div key="new-game" className="tool-card tool-card-left tool-card--button">New Game</div>
      );
      elements.push(newGameCard);
    } else if (!this.props.isGameStarted || this.props.isGameOver) {
      const restartGameCard = (
        <div key="restart-game" className="tool-card tool-card-left tool-card--button">Start</div>
      );
      elements.push(restartGameCard);
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
