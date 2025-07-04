function getWeather() {
    const apiKey = "45b0effcb06345cd282e08625b8f9170";
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    // Fetch Current Weather
    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch((error) => {
            console.error("Error fetching current weather data:", error);
            alert("Error fetching current weather data. Please try again later.");
        });

    // Fetch Hourly Forecast
    fetch(forecastUrl)
        .then((response) => response.json())
        .then((data) => displayHourlyForecast(data.list))
        .catch((error) => {
            console.error("Error fetching hourly forecast data:", error);
            alert("Error fetching hourly forecast data. Please try again later.");
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById("temp-div");
    const weatherInfoDiv = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("weather-icon");

    if (data.cod === "404") {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        weatherIcon.style.display = "none";
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
        weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        weatherIcon.style.display = "block";
    }
}


function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById("hourly-forecast");
    const next24Hours = hourlyData.slice(0, 8); // Show only the next 8 data points (3-hour intervals)

    hourlyForecastDiv.innerHTML = ""; // Clear previous hourly forecast
    next24Hours.forEach((item) => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class='hourly-item'>
                <span>${hour}:00</span>
                <img src='${iconUrl}' alt='Hourly Weather Icon'>
                <span>${temperature}°C</span>
            </div>`;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display = "block";
}
