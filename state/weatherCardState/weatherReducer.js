export const GET_WEATHER = "weather/GET_WEATHER";
export const ADD_WEATHER_CARD = "weather/ADD_WEATHER_CARD";
export const DELETE_CARD = "weather/DELETE_CARD";
export const UPDATE_WEATHER_CARD = "weather/UPDATE_WEATHER_CARD";
export const UPDATE_ALL_CARDS = "weather/UPDATE_ALL_CARDS";
export const SWITCH_AUTO_UPDATE = "weather/SWITCH_AUTO_UPDATE";
export const LOADING = "weather/START_LOADING";

export const initialState = {
    loading: false,
    weatherItems: [],
    autoUpdate:false,
};

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WEATHER:
            return {
                ...state,
                weatherItems: [...state.weatherItems, action.payload],
            };
        case DELETE_CARD:
            return {
                ...state,
                weatherItems: state.weatherItems.filter(item => item.id !== action.payload),
            };
        case UPDATE_WEATHER_CARD:
            return {
                ...state,
                weatherItems: state.weatherItems.map(item => {
                    if (item.id === action.id) {
                        return action.data
                    } else {
                        return item
                    }
                })
            };
        case ADD_WEATHER_CARD:
            return {
                ...state,
                weatherItems: [...state.weatherItems, action.payload],
            };
        case UPDATE_ALL_CARDS:
            return {
                ...state,
                weatherItems: action.payload,
            };
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            };
            case SWITCH_AUTO_UPDATE:
            return {
                ...state,
                autoUpdate: action.payload,
            };

        default:
            return state;
    }
};