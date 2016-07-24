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
    const f1 = {
      position: {
        x: 0.3,
        y: 0.5,
      },
      color: GardenConstants.FLOWER_COLOR_WHITE,
      size: GardenConstants.FLOWER_SIZE_4,
    };
    GardenActions.addFlower(f1);
    const f2 = {
      position: {
        x: 0.6,
        y: 0.5,
      },
      color: GardenConstants.FLOWER_COLOR_RED,
      size: GardenConstants.FLOWER_SIZE_5,
    };
    GardenActions.addFlower(f2);
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
    />);
    return <div id="app">{garden}</div>;
  }
}

export default App;
