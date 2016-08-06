const Calculator = {
  getDistanceBetweenFlowers: (flower1, flower2) => {
    const position1 = flower1.get("position").toJS();
    const position2 = flower2.get("position").toJS();
    return Calculator.getDistanceBetweenPositions(position1, position2);
  },

  getDistanceBetweenPositions: (position1, position2) => {
    const vector = Calculator._getVector(position1, position2);
    return Calculator._getVectorLenght(vector);
  },

  getPositionAtDistance: (position1, position2, distance) => {
    const vector = Calculator._getVector(position1, position2);
    const length = Calculator._getVectorLenght(vector);
    if (length === 0) {
      return position1;
    }
    const ratio = distance / length;
    const x = position1.x + ratio * vector.x;
    const y = position1.y + ratio * vector.y;
    return { x, y };
  },

  _getVector: (position1, position2) => {
    const x1 = position1.x;
    const y1 = position1.y;
    const x2 = position2.x;
    const y2 = position2.y;
    const x = x2 - x1;
    const y = y2 - y1;
    return { x, y };
  },

  _getVectorLenght: (vector) => {
    const x = vector.x;
    const y = vector.y;
    return Math.sqrt(x * x + y * y);
  },
};

export default Calculator;
