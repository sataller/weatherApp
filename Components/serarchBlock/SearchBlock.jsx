import React from 'react';
import styles from './searchBlock.module.css'
import SearchField from "./SearchBlock/SearchField";
import Checkbox from "./CheckBox";

const SearchBlock = (props) => {
    let handleClick = (e) => {
        props.switchAutoUpdate(e);
        props.handleIsRunningChange(e);
    };
    let setTime = (e) => {
        props.handleDelayChange(e.target.value);
    };

    return (
        <div className={styles.content}>
            <div className={styles.searchField}>
                <SearchField saveInLocal={props.saveInLocal} getWeather={props.getWeather}/>
                <Checkbox autoUpdate={props.autoUpdate} handleClick={handleClick}
                          setTime={setTime} delay={props.delay}/>
            </div>
        </div>
    )
};

export default SearchBlock;