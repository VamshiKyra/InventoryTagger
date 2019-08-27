import { SEARCH_STATUS, SEARCH_LIST, SEARCH_TEXT, FILTER_COUNT, FILTER_TYPE, FILTER_USER, FILTER_DATE, SEARCH_LIST_COUNT } from "./types";
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
            dispatch({ type: SEARCH_STATUS, payload: true });
        } else {
            dispatch({ type: SEARCH_LIST, payload: [] });
            dispatch({ type: SEARCH_LIST_COUNT, payload: 0 });
            dispatch({ type: SEARCH_STATUS, payload: false });
        }
    };
};

export const filterSearch = (list, admin_list, filters, search_text, navigation) => {
    return dispatch => {
        const allItems = [...list, ...admin_list];
        dispatch({ type: SEARCH_LIST, payload: [] });
        const filteredArr = allItems.filter(function (item) {
            for (var key in filters) {
                if (item[key] === undefined || item[key] != filters[key])
                    return false;
            }
            return true;
        });
        console.log("filteredArr", filteredArr)
        const filter_count = Object.keys(filters).length;
        if (search_text && search_text.length > 2) {
            let search_filter = [];
            filteredArr.forEach((obj) => {
                const keys = Object.keys(obj);
                keys.forEach((key) => {
                    if (obj[key] && obj[key].toString().toUpperCase().includes(search_text.toUpperCase())) {
                        search_filter.push(obj);
                    }
                });
            });
            console.log("search_filter", search_filter)
            dispatch({ type: SEARCH_LIST, payload: search_filter });
            dispatch({ type: SEARCH_LIST_COUNT, payload: search_filter.length });
            dispatch({ type: SEARCH_STATUS, payload: true });
            dispatch({ type: FILTER_COUNT, payload: filter_count });
            navigation.navigate("Inventory");
        } else {
            dispatch({ type: SEARCH_LIST, payload: filteredArr });
            dispatch({ type: SEARCH_LIST_COUNT, payload: filteredArr.length });
            dispatch({ type: SEARCH_STATUS, payload: true });
            dispatch({ type: FILTER_COUNT, payload: filter_count });
            navigation.navigate("Inventory");
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
        dispatch({ type: SEARCH_LIST_COUNT, payload: 0 });
        dispatch({ type: SEARCH_STATUS, payload: false });
        dispatch({ type: FILTER_TYPE, payload: '' });
        dispatch({ type: FILTER_USER, payload: '' });
        dispatch({ type: FILTER_COUNT, payload: "0" });
        // dispatch({ type: FILTER_DATE, payload: false });
    };
};
export const filterType = (text) => {
    return {
        type: FILTER_TYPE,
        payload: text
    };
};

export const filterBy = (text) => {
    return {
        type: FILTER_USER,
        payload: text
    };
};
export const filterDate = (text) => {
    return {
        type: FILTER_DATE,
        payload: text
    };
};