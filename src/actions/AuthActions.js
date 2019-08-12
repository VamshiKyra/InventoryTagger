import {
  EMAIL,
} from "./types";

export const emailChanged = text => {
  return {
    type: EMAIL,
    payload: text
  };
};
