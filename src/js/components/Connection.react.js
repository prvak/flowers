import React from "react";

class SpaceObject extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div></div>;
  }
}

SpaceObject.propTypes = {
  position: React.PropTypes.object.isRequired,
  hull: React.PropTypes.object.isRequired,
  addShadows: React.PropTypes.bool.isRequired,
};

export default SpaceObject;
