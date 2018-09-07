import api from "../api";
export const LOADING = "LOADING";
export const LOADED = "LOADED";
export const SET_SRC = "SET_SRC";

const loading = () => ({ type: LOADING });
const loaded = () => ({ type: LOADED });

const setGifSrc = src => ({ type: SET_SRC, src });

export const getGif = () => (dispatch, getState) => {
  dispatch(loading());

  api.getRandomGifUrl().then(url => dispatch(setGifSrc(url))).then(() => dispatch(loaded()));
};
