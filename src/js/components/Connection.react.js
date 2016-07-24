import React from "react";

class Connection extends React.Component {
  constructor() {
    super();
  }

  render() {
    const start = this.props.start.toJS();
    const end = this.props.end.toJS();
    const x = (start.x + end.x) / 2;
    const y = (start.y + end.y) / 2;
    const length = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
    const rotation = 45;
    const color = "red";
    console.log(length);
    const style = {
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      width: `${length * 100}%`,
      height: `${1}rem`,
      marginTop: `${-(start.y - end.y) * 100 / 2}%`,
      marginLeft: `${-(start.x - end.x) * 100 / 2}%`,
      transform: `rotate(${rotation}deg)`,
    };
    const classNames = `connection ${color}`;
    return (
      <div
        className={classNames}
        style={style}
      >
      </div>
    );
  }
}

Connection.propTypes = {
  player: React.PropTypes.object.isRequired,
  start: React.PropTypes.object.isRequired,
  end: React.PropTypes.object.isRequired,
};

export default Connection;
