import { APP_LOADED } from "./actionTypes";

export function loadApp() {
  return {
    type: APP_LOADED,
    payload: true
  };
}
