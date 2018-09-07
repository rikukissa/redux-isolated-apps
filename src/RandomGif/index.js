import React from "react";
import { connect } from "react-redux";
import { getGif, LOADED } from "./actions";
import reducer from "./reducer";
import isolate from "../utils/isolate";

const RandomGif = ({ loading, src, getGif }) =>
  <div style={{ width: "100px" }}>
    <button onClick={getGif} disabled={loading}>
      {loading ? "Loading..." : "Get Gif"}
    </button>
    {src &&
      <div>
        <img alt="Gif" src={src} style={{ marginTop: "5px" }} />
      </div>}
  </div>;

const mapStateToProps = state => ({
  loading: state.loading,
  src: state.src
});

const actionCreators = { getGif };

export default isolate(reducer, {
  [LOADED]: (action, props, getState) => props.onLoad()
})(connect(mapStateToProps, actionCreators)(RandomGif));
