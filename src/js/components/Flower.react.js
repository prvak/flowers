import React from "react";

class Flower extends React.Component {
  constructor() {
    super();
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
      backgroundColor: `${color}`,
    };
    return (
      <div
        className="flower"
        style={style}
      >
      </div>
    );
  }
}

Flower.propTypes = {
  flower: React.PropTypes.object.isRequired,
};

export default Flower;
