import React from "react";

export default class ToolCard extends React.Component {
  render() {
    const className = `card card-${this.props.width} card--content`;
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
  direction: React.PropTypes.oneOf(["left", "right"]).isRequired,
  width: React.PropTypes.string.isRequired,
  content: React.PropTypes.element.isRequired,
  contentOnClick: React.PropTypes.func,
  order: React.PropTypes.number,
};
