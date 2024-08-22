import { data } from "autoprefixer";
import { json } from "react-router-dom";

export const setLocalStorage = (key, value) => {
  const localString = JSON.stringify(value);
  localStorage.setItem(key, localString);
};
export const getLocalStorage = (key) => {
  const dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
};
