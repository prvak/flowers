import React from "react";

export default class ToolCard extends React.Component {
  render() {
    const className = `card--content card-${this.props.width}`;
    return (
      <div className="tool-card tool-card-left">
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
  direction: React.PropTypes.oneOf(["left", "right"]).isRequired,
  width: React.PropTypes.string.isRequired,
  content: React.PropTypes.element.isRequired,
  contentOnClick: React.PropTypes.func,
};
