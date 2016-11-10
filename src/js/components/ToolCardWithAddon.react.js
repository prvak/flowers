import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class ToolCardWithAddon extends React.Component {
  render() {
    const addons = [];
    if (this.props.addon) {
      addons.push(
        <div
          key={this.props.addonKey}
          className="card card--addon"
          onClick={this.props.addonOnClick}
        >
          {this.props.addon}
        </div>
      );
    }
    const className = `card card-${this.props.width} card--content`;
    const style = {
      order: this.props.order || 0,
    };
    return (
      <div className="tool-card tool-card-left" style={style}>
        <div className="card-wrapper--outer">
          <div className="card-wrapper--inner">
            <ReactCSSTransitionGroup
              transitionName="addon-left-w2"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
            >
              {addons}
            </ReactCSSTransitionGroup>
          </div>
        </div>
        <div className="card-wrapper--outer">
          <div className="card-wrapper--inner">
            <div className={className} onClick={this.props.contentOnClick}>
              {this.props.content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ToolCardWithAddon.propTypes = {
  direction: React.PropTypes.oneOf(["left", "right"]).isRequired,
  width: React.PropTypes.string.isRequired,
  content: React.PropTypes.element.isRequired,
  contentOnClick: React.PropTypes.func,
  addon: React.PropTypes.element,
  addonKey: React.PropTypes.string,
  addonOnClick: React.PropTypes.func,
  order: React.PropTypes.number,
};
