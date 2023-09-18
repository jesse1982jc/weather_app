import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=592de7b2a5c0e9334ea74c503adf5ab9`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLocation}
          type="text"
        />
      </div>

      {data.name ? (
        <div className="container">
          <div className="top">
            <div className="location">
              <h2>{data.name}</h2>
            </div>
            <div className="temp">
              {data.main ? <h1>{Math.floor(data.main.temp)}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name != undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{Math.floor(data.main.feels_like)}°C</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed} MPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="result">NO RESULT</p>
      )}
    </div>
  );
}

export default App;
