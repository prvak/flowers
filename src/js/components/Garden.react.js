import React from "react";

import Flower from "../components/Flower.react";
import Connection from "../components/Connection.react";
import Highlight from "../components/Highlight.react";
import GardenActions from "../actions/GardenActions";
import Logic from "../Logic";
import HtmlUtils from "../HtmlUtils";

class Garden extends React.Component {
  constructor() {
    super();
    this._onMouseMove = (event) => {
      const position = HtmlUtils.getRelativeMousePosition(event);
      GardenActions.setHalfConnection(this.props.activePlayerId, position);
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.flowers !== nextProps.flowers
        || this.props.connections !== nextProps.connections
        || this.props.players !== nextProps.players
        || this.props.activePlayerId !== nextProps.activePlayerId;
  }

  render() {
    const flowers = this.props.flowers;
    const connections = this.props.connections;
    const players = this.props.players;
    const activePlayerId = this.props.activePlayerId;
    const activePlayer = players.get(activePlayerId);
    const elements = [];
    flowers.forEach((flower, flowerId) => {
      if (Logic.canTakeFlower(activePlayerId, flowerId, players, flowers, connections)) {
        const key = `h-${flowerId}`;
        const position = flower.get("position");
        elements.push(<Highlight key={key} position={position} player={activePlayer} />);
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
          const zIndex = ((connectionIndex % 2) * 2) - 1;
          elements.push(
            <Connection key={key} player={player} start={start} end={end} zIndex={zIndex} />
          );
        }
        lastFlowerId = flowerId;
        connectionIndex++;
      });
    });
    players.forEach((player, playerId) => {
      const playerConnections = connections.get(playerId);
      if (playerConnections.size <= 0) {
        return;
      }
      const end = player.get("position");
      if (!end) {
        return;
      }
      const connectionIndex = playerConnections.size;
      const start = flowers.get(playerConnections.last()).get("position");
      const key = `p-${playerId}`;
      const zIndex = ((connectionIndex % 2) * 2) - 1;
      elements.push(
        <Connection key={key} player={player} start={start} end={end} zIndex={zIndex} />
      );
    });
    return <div onMouseMove={this._onMouseMove} className="garden">{elements}</div>;
  }
}

Garden.propTypes = {
  flowers: React.PropTypes.object.isRequired,
  connections: React.PropTypes.object.isRequired,
  players: React.PropTypes.object.isRequired,
  activePlayerId: React.PropTypes.number.isRequired,
};

export default Garden;
