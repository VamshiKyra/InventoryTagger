import {
  ID,
  TYPE,
  DESCRIPTION,
  LOCATION_NAME,
  ADDRESS,
  ZIP,
  LATITUDE,
  LONGITUDE,
  PHONE,
  IMAGE,
  CREATE_USER,
  CREATE_TS,
  MODIFY_USER,
  MODIFY_TS,
  CITY,
  STATE,
  EDIT_MODE,
  UID,
  LOADING,
  USER_ID
} from "./types";
import firebase from "react-native-firebase";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { StackActions, NavigationActions } from "react-navigation";
import * as Constant from "../common/Constants";
const GOOGLE_APIKEY = Constant.GOOGLE_MAP_KEY;
import moment from "moment";
export const addInventory = ({
  type,
  description,
  location_name,
  address,
  city,
  State,
  zip,
  latitude,
  longitude,
  phone,
  image
}) => {
  return dispatch => {
    const { currentUser } = firebase.auth();
    console.log(
      "firebase add inventory data",
      currentUser,
      type,
      description,
      location_name,
      address,
      State,
      zip,
      latitude,
      longitude,
      phone,
      image
    );
    // dispatch({ type: ID, payload: "123" });
    firebase
      .database()
      .ref(`/tagger/inventory/${currentUser.uid}/`)
      .push({
        type,
        description,
        location_name,
        address,
        city,
        State,
        zip,
        latitude,
        longitude,
        phone,
        image,
        create_user: currentUser.displayName,
        create_ts: moment().valueOf(),
        modify_user: "",
        modify_ts: ""
      })
      .then(res => {
        console.log("added to inventory", res);
        dispatch({ type: LOADING, payload: false });
        dispatch({ type: TYPE, payload: "" });
        dispatch({ type: DESCRIPTION, payload: "" });
        dispatch({ type: LOCATION_NAME, payload: "" });
        dispatch({ type: ADDRESS, payload: "" });
        dispatch({ type: PHONE, payload: "" });
        dispatch({ type: IMAGE, payload: "" });
        dispatch({ type: CREATE_USER, payload: "" });
        dispatch({ type: CREATE_TS, payload: "" });
        dispatch({ type: MODIFY_USER, payload: "" });
        dispatch({ type: MODIFY_TS, payload: "" });
        dispatch({ type: CITY, payload: "" });
        dispatch({ type: STATE, payload: "" });
        dispatch({ type: UID, payload: "" });
        dispatch({ type: USER_ID, payload: "" });
      })
      .catch(e => console.log(e));
  };
};
export const updateInventory = ({
  type,
  description,
  location_name,
  address,
  city,
  State,
  zip,
  latitude,
  longitude,
  phone,
  image,
  uid,
  create_user,
  create_ts,
  user_id
}, admin) => {
  return dispatch => {
    let user = '';
    console.log("admin", admin, type,
      description,
      location_name,
      address,
      city,
      State,
      zip,
      latitude,
      longitude,
      phone,
      image,
      uid,
      create_user,
      create_ts,
      user_id);
    const { currentUser } = firebase.auth();
    if (admin) {
      user = user_id;
    } else {
      user = currentUser.uid;
    }
    firebase
      .database()
      .ref(`/tagger/inventory/${user}/${uid}`)
      .set({
        type,
        description,
        location_name,
        address,
        city,
        State,
        zip,
        latitude,
        longitude,
        phone,
        image,
        create_user,
        create_ts,
        modify_user: currentUser.displayName,
        modify_ts: moment().valueOf()
      })
      .then(res => {
        console.log("update to inventory", res);
        dispatch({ type: LOADING, payload: false });
        dispatch({ type: TYPE, payload: "" });
        dispatch({ type: DESCRIPTION, payload: "" });
        dispatch({ type: LOCATION_NAME, payload: "" });
        dispatch({ type: ADDRESS, payload: "" });
        dispatch({ type: PHONE, payload: "" });
        dispatch({ type: IMAGE, payload: "" });
        dispatch({ type: CREATE_USER, payload: "" });
        dispatch({ type: CREATE_TS, payload: "" });
        dispatch({ type: MODIFY_USER, payload: "" });
        dispatch({ type: MODIFY_TS, payload: "" });
        dispatch({ type: CITY, payload: "" });
        dispatch({ type: STATE, payload: "" });
        dispatch({ type: UID, payload: "" });
        dispatch({ type: USER_ID, payload: "" });
      });
  };
};
export const getAddress = (latitude, longitude) => {
  return dispatch => {
    axios
      .get(
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        latitude +
        "," +
        longitude +
        "&key=" +
        GOOGLE_APIKEY,
        {}
      )
      .then(res => res.data)
      .then(data => {
        console.log(data);
        if (data && data.results[0] && data.results[0].address_components) {
          const results = data.results[0].address_components;
          let streetName = "";
          results.map(result => {
            const type = result.types;
            if (type.includes("street_number") || type.includes("route")) {
              console.log("longName", result.long_name);
              // streetName.concat(result.long_name);
              streetName += result.long_name + " ";
            }
            if (type.includes("locality")) {
              dispatch({
                type: CITY,
                payload: result.long_name
              });
            }
            if (type.includes("administrative_area_level_1")) {
              dispatch({
                type: STATE,
                payload: result.short_name
              });
            }
            if (type.includes("postal_code")) {
              dispatch({
                type: ZIP,
                payload: result.long_name
              });
            }
          });
          console.log("streetName", streetName);
          dispatch({
            type: ADDRESS,
            payload: streetName
          });
        }
      })
      .catch(e => console.log(e));
  };
};

export const deleteInventory = (uid, user_id) => {
  return dispatch => {
    const { currentUser } = firebase.auth();
    let user = user_id ? user_id : currentUser.uid;
    firebase
      .database()
      .ref(`/tagger/inventory/${user}`)
      .child(uid)
      .remove();
  };
};
export const clearSelection = () => {
  return dispatch => {
    dispatch({ type: LOADING, payload: false });
    dispatch({ type: TYPE, payload: "" });
    dispatch({ type: DESCRIPTION, payload: "" });
    dispatch({ type: LOCATION_NAME, payload: "" });
    dispatch({ type: ADDRESS, payload: "" });
    dispatch({ type: PHONE, payload: "" });
    dispatch({ type: IMAGE, payload: "" });
    dispatch({ type: CREATE_USER, payload: "" });
    dispatch({ type: CREATE_TS, payload: "" });
    dispatch({ type: MODIFY_USER, payload: "" });
    dispatch({ type: MODIFY_TS, payload: "" });
    dispatch({ type: CITY, payload: "" });
    dispatch({ type: STATE, payload: "" });
    dispatch({ type: UID, payload: "" });
    dispatch({ type: USER_ID, payload: "" });
  };
};
export const editMode = text => {
  return {
    type: EDIT_MODE,
    payload: text
  };
};
export const uidChange = text => {
  return {
    type: UID,
    payload: text
  };
};
export const userId = text => {
  return {
    type: USER_ID,
    payload: text
  };
};
export const typeChange = text => {
  return {
    type: TYPE,
    payload: text
  };
};
export const descriptionChange = text => {
  return {
    type: DESCRIPTION,
    payload: text
  };
};
export const locationChange = text => {
  return {
    type: LOCATION_NAME,
    payload: text
  };
};
export const addressChange = text => {
  return {
    type: ADDRESS,
    payload: text
  };
};
export const cityChange = text => {
  return {
    type: CITY,
    payload: text
  };
};
export const stateChange = text => {
  return {
    type: STATE,
    payload: text
  };
};
export const zipChange = text => {
  return {
    type: ZIP,
    payload: text
  };
};
export const latitudeChange = text => {
  return {
    type: LATITUDE,
    payload: text
  };
};
export const longitudeChange = text => {
  return {
    type: LONGITUDE,
    payload: text
  };
};
export const phoneChange = text => {
  return {
    type: PHONE,
    payload: text
  };
};
export const imageChange = text => {
  return {
    type: IMAGE,
    payload: text
  };
};
export const createUser = text => {
  return {
    type: CREATE_USER,
    payload: text
  };
};
export const createTs = text => {
  return {
    type: CREATE_TS,
    payload: text
  };
};
export const modifyUser = text => {
  return {
    type: MODIFY_USER,
    payload: text
  };
};
export const modifyTs = text => {
  return {
    type: MODIFY_TS,
    payload: text
  };
};
export const adminPush = ({ uid, name, role, office, county }) => {
  return dispatch => {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`/tagger/users/${currentUser.uid}`)
      .push({ uid, name, role, office, county })
      .then(res => {
        console.log("admin push");
        dispatch({ type: LOADING, payload: false });
      }).catch(e => console.log("Error", e));
  };
};