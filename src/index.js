document.getElementById('getWeather').addEventListener('click', async () => {
    const location = document.getElementById('location').value;
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const apiUrl = https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = <p>${error.message}</p>;
    }
});

function displayWeather(data) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let resultHtml = <h2>Weather in ${data.city.name}</h2>;

    days.forEach((day, index) => {
        const weather = data.list[index * 8]; // 8 data points per day
        const emoji = getWeatherEmoji(weather.weather[0].main);
        resultHtml += 
            <p>${day}: ${Math.round(weather.main.temp)}°C ${emoji}</p>
        ;
    });

    document.getElementById('weatherResult').innerHTML = resultHtml;
}

function getWeatherEmoji(weather) {
    if (weather.includes('Clouds')) return '☁️';
    if (weather.includes('Rain')) return '🌧️';
    if (weather.includes('Clear')) return '☀️';
    if (weather.includes('Snow')) return '❄️';
    return '🌈';
}
