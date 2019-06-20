import React from "react";
import PropTypes from "prop-types";

export default class ToolCard extends React.Component {
  render() {
    let className = `card card-${this.props.width} card--content`;
    if (this.props.contentOnClick) {
      className += " clickable";
    }
    const style = {
      order: this.props.order || 0,
    };
    return (
      <div className="tool-card tool-card-left" style={style}>
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

ToolCard.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  width: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  contentOnClick: PropTypes.func,
  order: PropTypes.number,
};
