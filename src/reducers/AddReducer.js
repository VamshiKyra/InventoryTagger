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
  STATE,
  CITY
} from "../actions/types";

const INITIAL_STATE = {
  id: "",
  type: "",
  description: "",
  location_name: "",
  address: "",
  city: "",
  State: "",
  zip: "",
  latitude: "",
  longitude: "",
  phone: "",
  image: "",
  create_user: "",
  create_ts: "",
  modify_user: "",
  modify_ts: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPE:
      return { ...state, type: action.payload };
    case DESCRIPTION:
      return { ...state, description: action.payload };
    case LOCATION_NAME:
      return { ...state, location_name: action.payload };
    case ADDRESS:
      return { ...state, address: action.payload };
    case ZIP:
      return { ...state, zip: action.payload };
    case STATE:
      return { ...state, State: action.payload };
    case CITY:
      return { ...state, city: action.payload };
    case LATITUDE:
      return { ...state, latitude: action.payload };
    case LONGITUDE:
      return { ...state, longitude: action.payload };
    case PHONE:
      return { ...state, phone: action.payload };
    case IMAGE:
      return { ...state, image: action.payload };
    case CREATE_USER:
      return { ...state, create_user: action.payload };
    case CREATE_TS:
      return { ...state, create_ts: action.payload };
    case MODIFY_USER:
      return { ...state, modify_user: action.payload };
    case MODIFY_TS:
      return { ...state, modify_ts: action.payload };
    default:
      return state;
  }
};
