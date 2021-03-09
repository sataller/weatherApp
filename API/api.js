// http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=c864a647bdf8d901d8656856f66cd1cd
//625143
//`http://api.openweathermap.org/data/2.5/weather?id=$625143&appid=c864a647bdf8d901d8656856f66cd1cd`
const api = {
    getWeather: async (id) => {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=c864a647bdf8d901d8656856f66cd1cd`,
        );
        return await response.json();
    },
    updateWeather: (id) => {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=c864a647bdf8d901d8656856f66cd1cd`);
    }
};

export default api;