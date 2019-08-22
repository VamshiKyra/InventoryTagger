import { LIST } from "./types";
import firebase from "react-native-firebase";
import { AsyncStorage } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import _ from "lodash";
export const getInventory = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase
      .database()
      .ref(`/tagger/inventory/${currentUser.uid}`)
      .on("value", function(snapshot) {
        console.log(snapshot.val());
        if (snapshot.val()) {
          const pay = snapshot.val();
          let snap = _.map(pay, (val, uid) => {
            return { ...val, uid };
          });
          console.log(snap, "ALL");
          dispatch({ type: LIST, payload: snap });
        }
      });
  };
};
