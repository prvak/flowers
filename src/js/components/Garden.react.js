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
    const players = this.props.players;
    const elements = [];
    flowers.forEach((flower, flowerId) => {
      const key = `f-${flowerId}`;
      elements.push(<Flower key={key} flower={flower} />);
    });
    connections.forEach((playerConnections, playerId) => {
      let lastFlowerId = null;
      const player = players.get(playerId);
      playerConnections.forEach((flowerId) => {
        if (lastFlowerId === null) {
          lastFlowerId = flowerId;
        } else {
          const start = flowers.get(lastFlowerId).get("position");
          const end = flowers.get(flowerId).get("position");
          const key = `c-${playerId}-${lastFlowerId}-${flowerId}`;
          elements.push(<Connection key={key} player={player} start={start} end={end} />);
          lastFlowerId = flowerId;
        }
      });
    });
    return <div className="garden">{elements}</div>;
  }
}

Garden.propTypes = {
  flowers: React.PropTypes.object.isRequired,
  connections: React.PropTypes.object.isRequired,
  players: React.PropTypes.object.isRequired,
};

export default Garden;
