import Calculator from "./Calculator";

const Logic = {
  isFlowerTaken: (flowerId, players, flowers, connections) => {
    return connections.some((playerConnections) => {
      return playerConnections.some((connection) => {
        const takenFlowerId = connection.get("flowerId");
        return takenFlowerId === flowerId;
      });
    });
  },

  canTakeFlower: (playerId, flowerId, players, flowers, connections) => {
    let distance = 0;
    if (playerId >= players.size) {
      // Player does not exist.
      return false;
    }

    const flower = flowers.get(flowerId);
    if (Logic.isFlowerTaken(flowerId, players, flowers, connections)) {
      // Flower is already taken.
      return false;
    }

    const lastConnection = connections.get(playerId).last();
    if (!lastConnection) {
      // Player does not have any connections yet.
      return { distance };
    }
    const lastFlowerId = lastConnection.get("flowerId");
    const lastFlower = flowers.get(lastFlowerId);
    if (lastFlower) {
      const player = players.get(playerId);
      distance = Calculator.getDistanceBetweenFlowers(flower, lastFlower);
      if (distance > player.get("remainingLength")) {
        // Player does not have enough rope.
        return false;
      }
    }
    return { distance };
  },

  canPlay: (playerId, players, flowers, connections) => {
    return flowers.some((flower, flowerId) => {
      return Logic.canTakeFlower(playerId, flowerId, players, flowers, connections);
    });
  },

  countScore: (playerId, players, flowers, connections) => {
    let score = 0;
    const playerConnections = connections.get(playerId);
    let lastFlowerId = null;
    playerConnections.forEach((connection, connectionIndex) => {
      const flowerId = connection.get("flowerId");
      const flower = flowers.get(flowerId);
      score += flower.get("size");
      if (lastFlowerId !== null && connectionIndex % 2 !== 0) {
        const lastFlower = flowers.get(lastFlowerId);
        if (lastFlower.get("color") === flower.get("color")) {
          // Bonus if two flowers of the same color are connected visibly.
          score += 2;
        }
      }
      lastFlowerId = flowerId;
    });
    return score;
  },
};

export default Logic;
