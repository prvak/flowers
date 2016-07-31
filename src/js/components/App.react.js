import React from "react";

import gardenStore from "../stores/GardenStore";
import Garden from "../components/Garden.react";
import GardenActions from "../actions/GardenActions";
import GardenConstants from "../constants/GardenConstants";
import HtmlUtils from "../HtmlUtils";

function getAppState() {
  return {
    flowers: gardenStore.getFlowers(),
    connections: gardenStore.getConnections(),
    players: gardenStore.getPlayers(),
    windowSize: HtmlUtils.getWindowSize(),
  };
}

class App extends React.Component {
  constructor() {
    super();
    this.state = getAppState();
    this._onChange = () => {
      this.setState(getAppState());
    };
    this._onResize = () => {
      this.setState(getAppState());
    };
    const createFlowers = (color, positions) => {
      const sizes = [
        GardenConstants.FLOWER_SIZE_4,
        GardenConstants.FLOWER_SIZE_5,
        GardenConstants.FLOWER_SIZE_6,
        GardenConstants.FLOWER_SIZE_7,
        GardenConstants.FLOWER_SIZE_8,
      ];
      for (let i = 0; i < positions.length; i++) {
        const position = positions[i];
        if (position === null) {
          continue;
        }
        const size = sizes[i];
        const flower = { color, position, size };
        GardenActions.addFlower(flower);
      }
    };
    createFlowers(GardenConstants.FLOWER_COLOR_WHITE, [
      { x: 0.3, y: 0.7 }, { x: 0.1, y: 0.3 }, { x: 0.9, y: 0.8 }, { x: 0.6, y: 0.2 }, null,
    ]);
    createFlowers(GardenConstants.FLOWER_COLOR_RED, [
      { x: 0.9, y: 0.6 }, { x: 0.5, y: 0.9 }, { x: 0.4, y: 0.4 }, null, { x: 0.1, y: 0.7 },
    ]);
    createFlowers(GardenConstants.FLOWER_COLOR_YELLOW, [
      { x: 0.6, y: 0.5 }, { x: 0.3, y: 0.1 }, { x: 0.3, y: 0.9 }, null, { x: 0.9, y: 0.3 },
    ]);
    createFlowers(GardenConstants.FLOWER_COLOR_PINK, [
      { x: 0.3, y: 0.3 }, { x: 0.1, y: 0.9 }, { x: 0.8, y: 0.1 }, { x: 0.6, y: 0.7 }, null,
    ]);
    createFlowers(GardenConstants.FLOWER_COLOR_PURPLE, [
      null, { x: 0.4, y: 0.8 }, { x: 0.2, y: 0.6 }, { x: 0.1, y: 0.1 }, { x: 0.8, y: 0.9 },
    ]);
    GardenActions.addPlayer({ color: GardenConstants.PLAYER_COLOR_BLUE });
    GardenActions.addPlayer({ color: GardenConstants.PLAYER_COLOR_GREEN });
    GardenActions.addConnection(0, 0);
    GardenActions.addConnection(0, 1);
    GardenActions.addConnection(0, 2);
  }

  componentDidMount() {
    gardenStore.addChangeListener(this._onChange);
    window.addEventListener("resize", this._onResize);
    this._onResize();
  }

  componentWillUnmount() {
    gardenStore.removeChangeListener(this._onChange);
    window.removeEventListener("resize", this._onResize);
  }

  render() {
    const garden = (<Garden
      flowers={this.state.flowers}
      connections={this.state.connections}
      players={this.state.players}
    />);
    return <div id="app">{garden}</div>;
  }
}

export default App;
