import Calculator from "./Calculator";

const Logic = {
  canTakeFlower: (playerId, flowerId, players, flowers, connections) => {
    const flower = flowers.get(flowerId);
    if (flower.get("takenBy") !== undefined) {
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
