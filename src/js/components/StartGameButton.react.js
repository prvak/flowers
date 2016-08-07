import React from "react";
import GardenActions from "../actions/GardenActions";

export default class StartGameButton extends React.Component {
  constructor() {
    super();
    this._onClick = () => {
      GardenActions.startGame(this.props.playerColors);
    };
  }

  render() {
    const elements = [];
    this.props.playerColors.forEach((playerColor) => {
      const style = {
        width: "90%",
        height: "1.5em",
        margin: "auto",
      };
      const classNames = `connection ${playerColor}`;
      elements.push(<div key={playerColor} className={classNames} style={style}></div>);
    });
    return (
      <div className="start-game button" onClick={this._onClick}>
        <div>
          {elements}
        </div>
      </div>
    );
  }
}

StartGameButton.propTypes = {
  playerColors: React.PropTypes.array.isRequired,
};
