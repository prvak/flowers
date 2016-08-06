import React from "react";

class Highlight extends React.Component {
  render() {
    const position = this.props.position.toJS();
    const x = position.x;
    const y = position.y;
    const size = 5;
    const color = this.props.player.get("color");
    const style = {
      left: `${x * 100}%`,
      top: `${y * 100}%`,
      width: `${size}rem`,
      height: `${size}rem`,
      marginTop: `${-size / 2}rem`,
      marginLeft: `${-size / 2}rem`,
    };
    const classNames = `highlight ${color}`;
    return (
      <div className={classNames} style={style}></div>
    );
  }
}

Highlight.propTypes = {
  position: React.PropTypes.object.isRequired,
  player: React.PropTypes.object.isRequired,
};

export default Highlight;
