import React from "react";

export default class MenuToolBox extends React.Component {
  render() {
    return (
      <div className="tool-box tool-box--menu">
        <div className="tool-card tool-card--menu">
          <div className="">
            <h1 className="menu--logo">Flowers</h1>
            <div className="menu--content">New Game</div>
          </div>
        </div>
      </div>
    );
  }
}

MenuToolBox.propTypes = {
};
