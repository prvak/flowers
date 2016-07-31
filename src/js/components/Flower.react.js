import React from "react";
import GardenActions from "../actions/GardenActions";

class Flower extends React.Component {
  constructor() {
    super();
    this.onClick = (event) => {
      console.log(this.props.flowerId);
      GardenActions.addConnection(0, this.props.flowerId);
    }
  }

  render() {
    const flower = this.props.flower.toJS();
    const position = flower.position;
    const x = position.x;
    const y = position.y;
    const size = flower.size;
    const color = flower.color;
    const rotation = 0;
    const style = {
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      width: `${size}rem`,
      height: `${size}rem`,
      marginTop: `${-size / 2}rem`,
      marginLeft: `${-size / 2}rem`,
      transform: `rotate(${rotation}deg)`,
    };
    const classNames = `flower ${color}`;
    return (
      <div
        className={classNames}
        style={style}
        onClick={this.onClick}
      >
      </div>
    );
  }
}

Flower.propTypes = {
  flowerId: React.PropTypes.number.isRequired,
  flower: React.PropTypes.object.isRequired,
};

export default Flower;
