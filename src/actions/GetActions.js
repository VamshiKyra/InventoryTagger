import { LIST, USER, ADMIN, ADMIN_LIST, LIST_COUNT, ADMIN_LIST_COUNT, TOTAL_COUNT } from "./types";
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
      .on("value", function (snapshot) {
        console.log(snapshot.val());
        if (snapshot.val()) {
          const pay = snapshot.val();
          let snap = _.map(pay, (val, uid) => {
            return { ...val, uid };
          });
          console.log(snap.length, "ALL");
          dispatch({ type: LIST, payload: snap });
          dispatch({ type: LIST_COUNT, payload: snap.length });
        }
      });
  };
};

export const adminUsers = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase
      .database()
      .ref(`/tagger/users/${currentUser.uid}`)
      .on("value", function (snapshot) {
        if (snapshot.val()) {
          const pay = snapshot.val();
          let snap = _.map(pay, (val, uid) => {
            return { ...val, uid };
          });
          console.log("snap", snap);
          dispatch({ type: USER, payload: snap });
          dispatch({ type: ADMIN, payload: true });
        } else {
          dispatch({ type: USER, payload: [] });
          dispatch({ type: ADMIN, payload: false });
        }
      });
  };
};
export const usersInventory = (users) => {
  return dispatch => {
    console.log("usersInventory", users)
    if (users && users.length > 0) {
      firebase
        .database()
        .ref(`/tagger/inventory`)
        .on("value", function (snapshot) {

          if (snapshot.val()) {
            let allItems = [];
            const pay = snapshot.val();
            let snap = _.map(pay, (val, uid) => {
              return { ...val, user_id: uid };
            });
            console.log("Admin", snap);
            snap.map((item) => {
              // const ObjectKeys = Object.keys(item);
              // ObjectKeys.map(key =>{
              //   allItems.push()
              // });
              let user_id = item.user_id;
              delete item.user_id;
              let userItems = _.map(item, (val, uid) => {
                return { ...val, uid, user_id };
              });
              allItems = [...allItems, ...userItems];
            });
            console.log("allItem", allItems.length)
            dispatch({ type: ADMIN_LIST, payload: allItems });
            dispatch({ type: ADMIN_LIST_COUNT, payload: allItems.length });
          }
        });
    }
  }
}
// export const usersInventory = ({ id }, index) => {
//   return dispatch => {
//     firebase
//       .database()
//       .ref(`/tagger/inventory/${id}`)
//       .on("value", function (snapshot) {
//         console.log("Admin", snapshot.val());
//         if (index == 0) {
//           dispatch({ type: ADMIN_LIST, payload: [] });
//         }
//         if (snapshot.val()) {
//           const pay = snapshot.val();
//           let snap = _.map(pay, (val, uid) => {
//             return { ...val, uid };
//           });
//           dispatch({ type: ADMIN_LIST, payload: snap });
//         }
//       });
//   }
// }
// const allInventory = (dispatch, { id }) => {
//   firebase
//     .database()
//     .ref(`/tagger/inventory/${id}`)
//     .on("value", function (snapshot) {
//       console.log("Admin", snapshot.val());
//       if (snapshot.val()) {
//         const pay = snapshot.val();
//         let snap = _.map(pay, (val, uid) => {
//           return { ...val, uid };
//         });
//         dispatch({ type: ADMIN_LIST, payload: snap });
//       }
//     });
// }