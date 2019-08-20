import { EMAIL, PASSWORD, ERROR, JWT } from "./types";
import firebase from "react-native-firebase";
import { AsyncStorage } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
export const emailChange = text => {
  return {
    type: EMAIL,
    payload: text
  };
};
export const passwordChange = text => {
  return {
    type: PASSWORD,
    payload: text
  };
};

export const loginUser = ({ email, password, navigation }) => {
  return dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => res.user)
      .then(user => {
        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("jwtToken", user.uid);
        dispatch({ type: JWT, payload: user.uid });
        navigation.navigate("App");
      })
      .catch(error => {
        console.log(error);
      });
  };
};
