import Calculator from "./Calculator";

const Logic = {
  isFlowerTaken: (flowerId, players, flowers, connections) => {
    return connections.some((playerConnections) => {
      return playerConnections.some((takenFlowerId) => {
        return takenFlowerId === flowerId;
      });
    });
  },

  canTakeFlower: (playerId, flowerId, players, flowers, connections) => {
    if (playerId >= players.size) {
      // Player does not exist.
      return false;
    }

    const flower = flowers.get(flowerId);
    if (Logic.isFlowerTaken(flowerId, players, flowers, connections)) {
      // Flower is already taken.
      return false;
    }

    const lastFlowerId = connections.get(playerId).last();
    const lastFlower = flowers.get(lastFlowerId);
    let distance = 0;
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
};

export default Logic;
