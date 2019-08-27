/**
 * @format
 */

import { AppRegistry, YellowBox } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
YellowBox.ignoreWarnings(["Warning: ", "Require ", "Possible ", "Remote ", ""]);
AppRegistry.registerComponent(appName, () => App);
