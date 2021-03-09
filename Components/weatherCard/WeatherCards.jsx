import React from 'react';
import styles from './weatherCard.module.css';
import CardItem from "./cardComponent/CardItem";

const WeatherCards = (props) => {
    let items = null;

    if (props.weatherItems.length > 0) {
        items = props.weatherItems.map(item => <CardItem key={String(item.id)} id={item.id}
                                                         icon={item.weather[0].icon}
                                                         temp={item.main.temp}
                                                         name={item.name}
                                                         humidity={item.main.humidity}
                                                         pressure={item.main.pressure}
                                                         wind={item.wind}
                                                         deleteCard={props.deleteCard}
                                                         updateWeatherCard={props.updateWeatherCard}
                                                         date={item.latestUpdate}
                                                         feelsLike={item.main.feels_like}/>);
    }

    return (
        <div className={styles.content}>
            {items}
        </div>
    )
};

export default WeatherCards;