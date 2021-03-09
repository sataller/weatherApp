import './App.css';
import MainPage from "./Components/mainPage/MainPage";
import {WeatherState} from "./state/weatherCardState/WeatherState";

function App() {
    return (
        <div className="App">
            <WeatherState>
                <MainPage/>
            </WeatherState>
        </div>
    );
}

export default App;
