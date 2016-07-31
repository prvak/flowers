import React from "react";

class Connection extends React.Component {
  constructor() {
    super();
  }

  render() {
    const start = this.props.start.toJS();
    const end = this.props.end.toJS();
    const ux = end.x - start.x;
    const uy = end.y - start.y;
    const height = 0.025;
    const width = Math.sqrt(Math.pow(ux, 2) + Math.pow(uy, 2));
    const x = start.x;
    const y = start.y - height / 2;
    const rotation = -Math.atan2(ux, uy) + Math.PI / 2;
    const color = "red";
    const style = {
      width: `${width * 100}%`,
      height: `${height * 100}%`,
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      position: "absolute",
      transform: `rotate(${rotation}rad)`,
      transformOrigin: "left center",
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
};

export default Connection;
