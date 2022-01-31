import React from "react";
import "./App.css";
import Form from "./Form";
import Weather from "./Weather";

function App() {
  const [weather, setWeather] = React.useState([]);

  const APIKEY = "405855903dc2f4be317b25c5607f62cb";

  async function fetchData(e) {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    const apiData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${APIKEY}`
    )
      .then((res) => res.json())
      .then((data) => data);
    if (city && country) {
      setWeather({
        data: apiData,
        city: apiData.city,
        country: apiData.sys.country,
        description: apiData.weather[0].description,
        temperature: Math.round(apiData.main.temp - 273.15),
        error: "",
      });
    } else {
      setWeather({
        data: "",
        city: "",
        country: "",
        description: "",
        temperature: "",
        error: "First Enter a City & Country",
      });
    }
  }

  return (
    <div className="App">
      <h3>Weather App</h3>
      <Form getWeather={fetchData} />
      <Weather
        city={weather.city}
        country={weather.country}
        description={weather.description}
        temperature={weather.temperature}
        error={weather.error}
      />
    </div>
  );
}

export default App;
