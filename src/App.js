import React, { Component } from "react";
import { connect } from "react-redux";
import RandomGif from "./RandomGif";
import { increment } from "./state/app";

class App extends Component {
  render() {
    return (
      <div>
        <h1>
          {this.props.count}
        </h1>
        <RandomGif onLoad={this.props.increment} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.app.count
  };
}

const mapDispatchToProps = {
  increment: increment
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
