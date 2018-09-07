import React from "react";
import RandomGifPair from "../RandomGifPair";

export default ({ onLoad }) =>
  <div>
    <RandomGifPair onLoad={onLoad} />
    <RandomGifPair onLoad={onLoad} />
  </div>;
