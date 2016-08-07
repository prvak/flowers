import React from "react";
import Calculator from "../Calculator";

class Connection extends React.Component {
  constructor() {
    super();
  }

  render() {
    const player = this.props.player.toJS();
    let start = this.props.start.toJS();
    let end = this.props.end.toJS();
    const height = 0.03;
    start = Calculator.getPositionAtDistance(start, end, -height / 3);
    end = Calculator.getPositionAtDistance(end, start, -height / 3);
    const ux = start.x - end.x;
    const uy = start.y - end.y;
    const width = Math.sqrt(Math.pow(ux, 2) + Math.pow(uy, 2));
    const x = end.x;
    const y = end.y - height / 2;
    const rotation = -Math.atan2(ux, uy) + Math.PI / 2;
    const color = player.color;
    const style = {
      width: `${width * 100}%`,
      height: `${height * 100}%`,
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      position: "absolute",
      transform: `rotate(${rotation}rad)`,
      transformOrigin: "left center",
      zIndex: this.props.zIndex,
    };
    const classNames = `connection ${color}`;
    return (
      <div className={classNames} style={style}></div>
    );
  }
}

Connection.propTypes = {
  player: React.PropTypes.object.isRequired,
  start: React.PropTypes.object.isRequired,
  end: React.PropTypes.object.isRequired,
  zIndex: React.PropTypes.number.isRequired,
};

export default Connection;
