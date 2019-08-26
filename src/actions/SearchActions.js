import { SEARCH_LIST, SEARCH_TEXT, FILTER_TYPE, FILTER_USER, FILTER_DATE, SEARCH_LIST_COUNT } from "./types";
import firebase from "react-native-firebase";
import { AsyncStorage } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import _ from "lodash";

export const searchInventory = (list, admin_list, event) => {
    return dispatch => {
        if (event && event.length > 2) {
            const allItems = [...list, ...admin_list];
            let filteredArr = [];
            dispatch({ type: SEARCH_LIST, payload: [] });
            allItems.forEach((obj) => {
                const keys = Object.keys(obj);
                keys.forEach((key) => {
                    if (obj[key] && obj[key].toString().toUpperCase().includes(event.toUpperCase())) {
                        filteredArr.push(obj);
                    }
                });
            });
            console.log("filteredArr", filteredArr)
            dispatch({ type: SEARCH_LIST, payload: filteredArr });
            dispatch({ type: SEARCH_LIST_COUNT, payload: filteredArr.length });
        } else {
            dispatch({ type: SEARCH_LIST, payload: [] });
            dispatch({ type: SEARCH_LIST_COUNT, payload: 0 });
        }
    };
};

export const searchText = (text) => {
    return {
        type: SEARCH_TEXT,
        payload: text
    };
};
export const clearSearchList = () => {
    return dispatch => {
        dispatch({
            type: SEARCH_LIST,
            payload: []
        });
        dispatch({
            type: SEARCH_TEXT,
            payload: ""
        });
    };
};
export const filterType = (text) => {
    return {
        type: FILTER_TYPE,
        payload: text
    };
};