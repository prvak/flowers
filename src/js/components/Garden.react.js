import React from "react";

import Flower from "../components/Flower.react";
import Connection from "../components/Connection.react";

class Garden extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.flowers !== nextProps.flowers
        || this.props.connections !== nextProps.connections;
  }

  render() {
    const flowers = this.props.flowers;
    const connections = this.props.connections;
    const elements = [];
    flowers.forEach((flower, index) => {
      const key = `f${index}`;
      elements.push(<Flower key={key} flower={flower} />);
    });
    connections.forEach((flower, index) => {
      const key = `c${index}`;
      const player = connections.get("player");
      const start = flowers.get(connections.get("from")).get("position");
      const end = flowers.get(connections.get("from")).get("position");
      elements.push(<Connection key={key} player={player} start={start} end={end} />);
    });
    return <div className="garden">{elements}</div>;
  }
}

Garden.propTypes = {
  flowers: React.PropTypes.object.isRequired,
  connections: React.PropTypes.object.isRequired,
};

export default Garden;
