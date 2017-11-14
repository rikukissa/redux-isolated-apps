import React from "react";
import RandomGif from "../RandomGif";

export default ({ onLoad }) =>
  <div>
    <RandomGif onLoad={onLoad} />
    <RandomGif onLoad={onLoad} />
  </div>;
