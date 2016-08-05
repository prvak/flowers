const Calculator = {
  getDistanceBetweenFlowers: (flower1, flower2) => {
    const position1 = flower1.get("position");
    const position2 = flower2.get("position");
    const x1 = position1.get("x");
    const y1 = position1.get("y");
    const x2 = position2.get("x");
    const y2 = position2.get("y");
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  },
};

export default Calculator;
