import { SEARCH_LIST, SEARCH_TEXT, FILTER_TYPE, FILTER_USER, FILTER_DATE, SEARCH_LIST_COUNT } from "../actions/types";

const INITIAL_STATE = {
    search_list: [],
    search_text: "",
    filter_type: "",
    filter_user: "",
    filter_date: "",
    search_count: "0"
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_LIST:
            return { ...state, search_list: action.payload };
        case SEARCH_TEXT:
            return { ...state, search_text: action.payload };
        case FILTER_TYPE:
            return { ...state, filter_type: action.payload };
        case FILTER_USER:
            return { ...state, filter_user: action.payload };
        case FILTER_DATE:
            return { ...state, filter_date: action.payload };
        case SEARCH_LIST_COUNT:
            return { ...state, search_count: action.payload };
        default:
            return state;
    }
};
