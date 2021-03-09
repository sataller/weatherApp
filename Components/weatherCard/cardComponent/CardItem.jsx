import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import NavigationIcon from '@material-ui/icons/Navigation';
import styles from './cardItem.module.css';

const CardItem = (props) => {
    let temp = Math.round(props.temp - 273);

    let getWeather = () => {
        props.updateWeatherCard(props.id);
    };

    const getDate = (date) => {
        date = (`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}
                   ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        );
        return date
    };

    const wideDirection = (deg) => {
        let wideDirection = "";
        if (deg > 345 || deg <= 15) {
            wideDirection = "N"
        } else if (deg > 15 || deg <= 75) {
            wideDirection = "NW"
        } else if (deg > 75 || deg <= 105) {
            wideDirection = "W"
        } else if (deg > 105 || deg <= 165) {
            wideDirection = "WS"
        } else if (deg > 165 || deg <= 195) {
            wideDirection = "S"
        } else if (deg > 195 || deg <= 255) {
            wideDirection = "SE"
        } else if (deg > 255 || deg <= 285) {
            wideDirection = "E"
        } else if (deg > 285 || deg <= 345) {
            wideDirection = "EN"
        }
        return wideDirection
    };

    return (
        <div className={styles.content}>
            <div className={styles.buttons}>
                <div className={styles.name}>
                    <div className={styles.city}>{`${(props !== null) ? props.name : "Unknow"}`} </div>
                </div>
                <UpdateIcon className={styles.button} onClick={() => {
                    getWeather();
                }}/>
                <DeleteIcon className={styles.button} onClick={() => {
                    props.deleteCard(props.id);
                }}/>
            </div>
            <div>
                <div className={styles.item}>
                    <img alt={"weather icon"} className={styles.icon}
                         src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}/>
                    <span className={styles.temp}>
                        {`${(props !== null) ?
                            temp : "data"}`}
                        {(props !== null) ? <span> &deg;</span> : null}
                    </span>
                </div>
                <div className={styles.feelsLike}>{`Feels like: ${props.feelsLike}`} </div>
                <div className={styles.item}>{`Humidity : ${(props !== null) ?
                    props.humidity + "%" :
                    "data"}`}
                </div>
                <div
                    className={styles.item}> {`Atmospheric pressure : ${(props !== null) ?
                    props.pressure + "hPa" :
                    "data"}`}
                </div>
                <div
                    className={styles.item}>{
                    `Wind: ${(props !== null) ?
                        props.wind.speed + "m/s " + wideDirection(props.wind.deg) :
                        "data"}`}
                    {(props !== null) ?
                        <NavigationIcon style={{
                            fontSize: 15,
                            transform: `rotate(${180 + props.wind.deg}deg)`,
                            marginLeft: 10,
                        }}/>
                        : null}
                </div>
            </div>
            <div className={styles.item}>{`Latest data update : ${getDate(props.date)}`}</div>
        </div>
    )
};

export default CardItem;