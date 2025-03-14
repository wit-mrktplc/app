import { AppState } from "react-native";

AppState.addEventListener("change", (state) => {
  console.log("AppState changed to", state);
  if (state === "active") {
    // start auto refresh
  } else {
    // stop auto refresh
  }
});
