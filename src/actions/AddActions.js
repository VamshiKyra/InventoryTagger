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
  EDIT_MODE
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
        create_ts: moment().unix(),
        modify_user: "",
        modify_ts: ""
      })
      .then(res => {
        console.log("added to inventory", res);
      })
      .catch(e => console.log(e));
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
export const editMode = text => {
  return {
    type: EDIT_MODE,
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
