import React from "react";
import styles from "./searchBlock.module.css"

const Checkbox = (props) => {
    let updateCheckbox = (e) => {
        if (props.handleClick) {
            props.handleClick(e.target.checked);
            localStorage.setItem("autoUpdate", JSON.stringify(e.target.checked));
        }
    };
    return (
        <div className={styles.checkboxWrapper}>
            <input onChange={(e) => {
                updateCheckbox(e)
            }}
                   type="checkbox" id={"search"} label="Checkbox" checked={props.autoUpdate}></input>
            <label htmlFor={"search"}> Auto update in seconds
                <input className={styles.delay} value={props.delay/1000} onChange={props.setTime}/>
            </label>
        </div>
    );
};

export default Checkbox;