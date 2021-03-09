import React, {useContext, useCallback, useEffect, useState, useRef} from 'react';
import styles from './mainPage.module.css';
import SearchBlock from '../serarchBlock/SearchBlock'
import WeatherCards from "../weatherCard/WeatherCards";
import {WeatherContext} from "../../state/weatherCardState/weatherContex";

const MainPage = (props) => {
    const {
        weatherItems, deleteCard,
        updateAllCards, updateWeatherCard,
        getWeather, setSavedCards,
        switchAutoUpdate, autoUpdate,
        saveInLocal
    } = useContext(WeatherContext);

    const loadWeather = useCallback(async () => await setSavedCards(), [setSavedCards]);
    const [isRunning, setIsRunning] = useState(autoUpdate);
    const [delay, setDelay] = useState(60000);

    useEffect(() => {
        loadWeather();
    }, []);

    useInterval(() => {
        setSavedCards();
    }, isRunning ? delay : null);

    let handleIsRunningChange = (e) => {
        setIsRunning(e);
    };

    function handleDelayChange(e) {
        setDelay(Number(e * 1000));
    }

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    return (
        <div className={styles.content}>
            <SearchBlock autoUpdate={autoUpdate} switchAutoUpdate={switchAutoUpdate}
                         getWeather={getWeather} updateAllCards={updateAllCards}
                         saveInLocal={saveInLocal} handleIsRunningChange={handleIsRunningChange}
                         handleDelayChange={handleDelayChange} delay={delay}/>
            <WeatherCards weatherItems={weatherItems}
                          deleteCard={deleteCard}
                          updateWeatherCard={updateWeatherCard}/>
        </div>
    )
};

export default MainPage;