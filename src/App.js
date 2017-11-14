import React, { Component } from "react";
import { connect } from "react-redux";
import RandomGif from "./RandomGif";
import RandomGifPair from "./RandomGifPair";
import RandomGifPairOfPairs from "./RandomGifPairOfPairs";
import { increment, toggleButton } from "./state/app";

class App extends Component {
  render() {
    const { count, increment, toggleButton, buttonEnabled } = this.props;

    return (
      <div>
        <h1>
          {count}
        </h1>
        <RandomGif onLoad={increment} />
        <RandomGifPair onLoad={increment} />
        <RandomGifPairOfPairs onLoad={increment} />
        <button style={{ background: buttonEnabled ? "green" : "red" }} onClick={toggleButton}>
          Toggle
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.app.count,
    buttonEnabled: state.app.buttonEnabled
  };
}

const mapDispatchToProps = {
  increment: increment,
  toggleButton: toggleButton
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
