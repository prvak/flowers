import React from "react";
import PropTypes from "prop-types";

import Flower from "./Flower.react";
import Connection from "./Connection.react";
import Highlight from "./Highlight.react";
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
    const { flowers } = this.props;
    const { connections } = this.props;
    const { players } = this.props;
    const { activePlayerId } = this.props;
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
      playerConnections.forEach((connection) => {
        const flowerId = connection.get("flowerId");
        if (lastFlowerId !== null) {
          const takenAtTurn = connection.get("turn");
          const start = flowers.get(lastFlowerId).get("position");
          const end = flowers.get(flowerId).get("position");
          const key = `c-${playerId}-${lastFlowerId}-${flowerId}`;
          const zIndex = (((connectionIndex % 2) * 2) - 1) * takenAtTurn;
          elements.push(
            <Connection key={key} player={player} start={start} end={end} zIndex={zIndex} />,
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
      if (connectionIndex === 0) {
        // Player does not have any connections yet.
        return;
      }
      const lastConnection = playerConnections.last();
      const lastFlowerId = lastConnection.get("flowerId");
      const start = flowers.get(lastFlowerId).get("position");
      const key = `p-${playerId}`;
      const zIndex = (((connectionIndex % 2) * 2) - 1) * player.get("lastTurn");
      elements.push(
        <Connection key={key} player={player} start={start} end={end} zIndex={zIndex} />,
      );
    });
    return <div onMouseMove={this._onMouseMove} className="garden">{elements}</div>;
  }
}

Garden.propTypes = {
  flowers: PropTypes.object.isRequired,
  connections: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  activePlayerId: PropTypes.number.isRequired,
  turn: PropTypes.number.isRequired,
};

export default Garden;
