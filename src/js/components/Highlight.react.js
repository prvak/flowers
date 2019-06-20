import React from "react";
import PropTypes from "prop-types";

import GardenConstants from "../constants/GardenConstants";

export default class Highlight extends React.Component {
  render() {
    const position = this.props.position.toJS();
    const { x } = position;
    const { y } = position;
    const size = GardenConstants.FLOWER_CLICK_AREA;
    const color = this.props.player.get("color");
    const style = {
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      width: `${size * 100}%`,
      height: `${size * 100}%`,
      marginTop: `${(-size / 2) * 100}%`,
      marginLeft: `${(-size / 2) * 100}%`,
      background: "none",
    };
    const classNames = `highlight ${color}`;
    return (
      <div className={classNames} style={style} />
    );
  }
}

Highlight.propTypes = {
  position: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
};
