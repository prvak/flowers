import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class ToolCard extends React.Component {
  render() {
    return (
      <div className="tool-card tool-card-left">
        <ReactCSSTransitionGroup
          transitionName="tool-card-left-50"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          <div className="card-wrapper--outer">
            <div className="card-wrapper--inner">
              <div className="card--addon">{this.props.addon}</div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
        <div className="card-wrapper--outer">
          <div className="card-wrapper--inner">
            <div className="card--content">{this.props.content}</div>
          </div>
        </div>
      </div>
    );
  }
}

ToolCard.propTypes = {
  direction: React.PropTypes.oneOf(["left", "right"]).isRequired,
  content: React.PropTypes.element,
  addon: React.PropTypes.element,
};
