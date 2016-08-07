import React from "react";

import StartGameButton from "../components/StartGameButton.react";
import GardenConstants from "../constants/GardenConstants";

export default class MessageBox extends React.Component {
  constructor() {
    super();
  }

  render() {
    const onePlayerColor = [
      GardenConstants.PLAYER_COLOR_RED,
    ];
    const onePlayer = (<StartGameButton playerColors={onePlayerColor} />);
    const twoPlayersColors = [
      GardenConstants.PLAYER_COLOR_RED,
      GardenConstants.PLAYER_COLOR_PURPLE,
    ];
    const twoPlayers = (<StartGameButton playerColors={twoPlayersColors} />);
    return (
      <div className="message-box">
        <div>
          <h2>New game</h2>
          {onePlayer}
          {twoPlayers}
        </div>
      </div>
    );
  }
}

MessageBox.propTypes = {
  isGameOver: React.PropTypes.bool.isRequired,
  isGameStarted: React.PropTypes.bool.isRequired,
  players: React.PropTypes.object.isRequired,
};
