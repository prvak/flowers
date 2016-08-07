import React from "react";

import ScoreBox from "../components/ScoreBox.react";
import StartGameBox from "../components/StartGameBox.react";
import GardenConstants from "../constants/GardenConstants";

export default class MessageBox extends React.Component {
  constructor() {
    super();
  }

  render() {
    const elements = [];
    if (this.props.isGameOver) {
      elements.push(<ScoreBox key="score" players={this.props.players} />);
    }
    elements.push(<StartGameBox key="new-game" />);
    return (
      <div className="message-box">
        {elements}
      </div>
    );
  }
}

MessageBox.propTypes = {
  isGameOver: React.PropTypes.bool.isRequired,
  isGameStarted: React.PropTypes.bool.isRequired,
  players: React.PropTypes.object.isRequired,
};
