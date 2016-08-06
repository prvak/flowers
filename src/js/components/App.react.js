import React from "react";

import gardenStore from "../stores/GardenStore";
import Garden from "../components/Garden.react";
import GardenActions from "../actions/GardenActions";
import GardenConstants from "../constants/GardenConstants";
import HtmlUtils from "../HtmlUtils";

class App extends React.Component {
  constructor() {
    super();
    this._lastMousePosition = { x: 0, y: 0 };
    this.state = this._getAppState();
    this._onChange = () => {
      this.setState(this._getAppState());
    };
    this._onResize = () => {
      this.setState(this._getAppState());
    };
    const createFlowers = (color, positions) => {
      const SIZE = 1494;
      const sizes = [
        GardenConstants.FLOWER_SIZE_4,
        GardenConstants.FLOWER_SIZE_5,
        GardenConstants.FLOWER_SIZE_6,
        GardenConstants.FLOWER_SIZE_7,
        GardenConstants.FLOWER_SIZE_8,
      ];
      for (let i = 0; i < positions.length; i++) {
        const positionPixels = positions[i];
        if (positionPixels === null) {
          continue;
        }
        const position = {
          x: positionPixels.x / SIZE,
          y: positionPixels.y / SIZE,
        };
        const size = sizes[i];
        const flower = { color, position, size };
        GardenActions.addFlower(flower);
      }
    };
    createFlowers(GardenConstants.FLOWER_COLOR_WHITE, [
      { x: 568, y: 1036 }, { x: 184, y: 570 }, { x: 1304, y: 1134 }, { x: 852, y: 290 }, null,
    ]);
    createFlowers(GardenConstants.FLOWER_COLOR_RED, [
      { x: 1290, y: 868 }, { x: 828, y: 1288 }, { x: 690, y: 590 }, null, { x: 222, y: 1044 },
    ]);
    createFlowers(GardenConstants.FLOWER_COLOR_YELLOW, [
      { x: 868, y: 748 }, { x: 566, y: 202 }, { x: 516, y: 1330 }, null, { x: 1262, y: 430 },
    ]);
    createFlowers(GardenConstants.FLOWER_COLOR_PINK, [
      { x: 472, y: 452 }, { x: 214, y: 1326 }, { x: 1128, y: 172 }, { x: 822, y: 944 }, null,
    ]);
    createFlowers(GardenConstants.FLOWER_COLOR_PURPLE, [
      null, { x: 1150, y: 656 }, { x: 384, y: 812 }, { x: 204, y: 196 }, { x: 1112, y: 1312 },
    ]);
    GardenActions.addPlayer({ color: GardenConstants.PLAYER_COLOR_RED, maxLength: 1 });
    GardenActions.addPlayer({ color: GardenConstants.PLAYER_COLOR_PURPLE, maxLength: 1 });
    GardenActions.addConnection(1);
    GardenActions.addConnection(2);
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

  _getAppState() {
    return {
      flowers: gardenStore.getFlowers(),
      connections: gardenStore.getConnections(),
      players: gardenStore.getPlayers(),
      activePlayerId: gardenStore.getActivePlayerId(),
      windowSize: HtmlUtils.getWindowSize(),
      mousePosition: this._lastMousePosition,
    };
  }

  render() {
    const garden = (<Garden
      flowers={this.state.flowers}
      connections={this.state.connections}
      players={this.state.players}
      activePlayerId={this.state.activePlayerId}
    />);
    // const activePlayer = this.state.activePlayer;
    // if (activePlayer) {
    //   const color = activePlayer.get("color");
    //   return <div className={color} id="app">{garden}</div>;
    // }
    return <div id="app">{garden}</div>;
  }
}

export default App;
