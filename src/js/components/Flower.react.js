import React from "react";
import PropTypes from "prop-types";

import GardenActions from "../actions/GardenActions";
import GardenConstants from "../constants/GardenConstants";

class Flower extends React.Component {
  constructor() {
    super();
    this.onClick = () => {
      GardenActions.addConnection(this.props.flowerId);
    };
  }

  render() {
    const flower = this.props.flower.toJS();
    const { position } = flower;
    const { x } = position;
    const { y } = position;
    const size = GardenConstants.FLOWER_CLICK_AREA;
    const { color } = flower;
    const rotation = 0;
    const style = {
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      width: `${size * 100}%`,
      height: `${size * 100}%`,
      marginTop: `${(-size / 2) * 100}%`,
      marginLeft: `${(-size / 2) * 100}%`,
      transform: `rotate(${rotation}deg)`,
      background: "none",
    };
    const classNames = `flower ${color}`;
    return (
      <div
        className={classNames}
        style={style}
        onClick={this.onClick}
      />
    );
  }
}

Flower.propTypes = {
  flowerId: PropTypes.number.isRequired,
  flower: PropTypes.object.isRequired,
};

export default Flower;
