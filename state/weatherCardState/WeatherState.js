import React, {useReducer} from 'react';
import {WeatherContext} from './weatherContex';
import {initialState, weatherReducer} from "./weatherReducer";
import api from "../../API/api"
import {
    GET_WEATHER, DELETE_CARD,
    LOADING, SWITCH_AUTO_UPDATE,
    UPDATE_ALL_CARDS, UPDATE_WEATHER_CARD,
} from "./weatherReducer"

export const WeatherState = ({children}) => {
    const [state, dispatch] = useReducer(weatherReducer, initialState);

    const getWeather = async id => {
        let data = await api.getWeather(id);
        data.latestUpdate = new Date();
        dispatch({type: GET_WEATHER, payload: data});
        let savedCards = JSON.parse(localStorage.getItem("savedCards"));
        if (savedCards === null) {
            localStorage.setItem("savedCards", JSON.stringify([data]));
        } else {
            localStorage.setItem("savedCards", JSON.stringify([...savedCards, data]));
        }
    };

    const saveInLocal = (id) => {
        if (localStorage.getItem("savedId") === null) {
            localStorage.setItem("savedId", JSON.stringify([id]));
            getWeather(id);
        } else {
            let savedId = JSON.parse(localStorage.getItem("savedId"));
            let save = true;
            savedId = savedId.map(item => {
                if (item === id) {
                    save = false;
                }
                return item
            });
            if (save) {
                getWeather(id);
                localStorage.setItem("savedId", JSON.stringify([...savedId, id]));
            } else {
                console.log("already added")
            }
        }
    };
    const deleteInLocal = (id) => {
        let savedId = JSON.parse(localStorage.getItem("savedId"));
        let savedCards = JSON.parse(localStorage.getItem("savedCards"));
        savedId = savedId.filter(item => item !== id);
        localStorage.setItem("savedId", JSON.stringify(savedId));
        savedCards = savedCards.filter(item => item.id !== id);
        localStorage.setItem("savedCards", JSON.stringify(savedCards));
    };

    const setSavedCards = () => {
        let savedId = JSON.parse(localStorage.getItem("savedId"));
        let autoUpdate = JSON.parse(localStorage.getItem("autoUpdate"));
        if (savedId !== null) {
            let requests = savedId.map(id => api.updateWeather(id));
            Promise.all(requests)
                .then(responses => {
                    return responses;
                })
                .then(responses => Promise.all(responses.map(r => r.json())))
                .then(items => {
                    items.map( item =>{
                        item.latestUpdate = new Date();
                        return item
                    });

                    dispatch({type: UPDATE_ALL_CARDS, payload: items});
                })
                .catch(err => {
                    console.log(err);
                    let savedCards = JSON.parse(localStorage.getItem("savedCards"));
                    dispatch({type: UPDATE_ALL_CARDS, payload: savedCards});
                });
        }
        dispatch({type: SWITCH_AUTO_UPDATE, payload: autoUpdate});
    };

    const deleteCard = id => {
        deleteInLocal(id);
        dispatch({type: DELETE_CARD, payload: id});
    };

    const updateWeatherCard = async id => {
        const data = await api.getWeather(id);
        data.latestUpdate = new Date();
        dispatch({type: UPDATE_WEATHER_CARD, id, data});
    };
    const switchAutoUpdate = (data) => {
        dispatch({type: SWITCH_AUTO_UPDATE, payload: data});
    };
    const startLoading = () => {
        dispatch({type: LOADING, payload: true});
    };
    const closeLoading = () => {
        dispatch({type: LOADING, payload: false});
    };

    return (
        <WeatherContext.Provider value={{
            weatherItems: state.weatherItems,
            autoUpdate: state.autoUpdate,
            getWeather,
            deleteCard,
            setSavedCards,
            updateWeatherCard,
            switchAutoUpdate,
            saveInLocal,
        }}>
            {children}
        </WeatherContext.Provider>
    )
};
