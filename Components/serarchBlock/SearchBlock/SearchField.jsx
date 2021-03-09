import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import citys from "../../../state/city";
// import citys from "../../../state/city.list";

export default function SearchField(props) {
    const getWeather = (value) => {
        citys.map(item => {
            if (item.name === value) {
                // props.getWeather(item.id);
                props.saveInLocal(item.id);
            }
        });
    };
    return (
        <div style={{width: 300}}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={citys.map((option) => option.name)}
                onChange={(e, value) => {
                    getWeather(value);
                }}
                clearOnBlur={false}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search city"
                        margin="normal"
                        variant="outlined"
                        InputProps={{...params.InputProps, type: 'search'}}
                    />
                )}
            />
        </div>
    );
}

