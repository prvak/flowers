import React from "react";

import Flower from "../components/Flower.react";
import Connection from "../components/Connection.react";
import Highlight from "../components/Highlight.react";
import Logic from "../Logic";

class Garden extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.flowers !== nextProps.flowers
        || this.props.connections !== nextProps.connections;
  }

  render() {
    const flowers = this.props.flowers;
    const connections = this.props.connections;
    const players = this.props.players;
    const activePlayerId = this.props.activePlayerId;
    const elements = [];
    flowers.forEach((flower, flowerId) => {
      if (Logic.canTakeFlower(activePlayerId, flowerId, players, flowers, connections)) {
        const key = `h-${flowerId}`;
        const position = flower.get("position");
        const player = players.get(activePlayerId);
        elements.push(<Highlight key={key} position={position} player={player} />);
      }
    });
    flowers.forEach((flower, flowerId) => {
      const key = `f-${flowerId}`;
      elements.push(<Flower key={key} flower={flower} flowerId={flowerId} />);
    });
    connections.forEach((playerConnections, playerId) => {
      let lastFlowerId = null;
      let connectionIndex = 0;
      const player = players.get(playerId);
      playerConnections.forEach((flowerId) => {
        if (lastFlowerId !== null) {
          const start = flowers.get(lastFlowerId).get("position");
          const end = flowers.get(flowerId).get("position");
          const key = `c-${playerId}-${lastFlowerId}-${flowerId}`;
          const zIndex = (((connectionIndex) % 2) * 2) - 1;
          elements.push(
            <Connection key={key} player={player} start={start} end={end} zIndex={zIndex} />
          );
        }
        lastFlowerId = flowerId;
        connectionIndex++;
      });
    });
    return <div className="garden">{elements}</div>;
  }
}

Garden.propTypes = {
  flowers: React.PropTypes.object.isRequired,
  connections: React.PropTypes.object.isRequired,
  players: React.PropTypes.object.isRequired,
  activePlayerId: React.PropTypes.number.isRequired,
};

export default Garden;
