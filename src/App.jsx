import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  // data: 存放 API 抓回來的 json 資料，型態是 object
  const [data, setData] = useState({});

  // location: 存放 搜尋框輸入的城市名稱，型態是 string
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=592de7b2a5c0e9334ea74c503adf5ab9`;

  // useEffect(() => {
  //   console.log("Rendering...");
  // }, [data]);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data); // 更新 setData 資料內容狀態 (api 回應成功的話)
          console.log(response.data);
          console.log(response.data.name);
        })
        .catch((e) => {
          // setData(e);
          // 如果 API 回應失敗，跑到 catch 的話，是不會 setData 的，所以 data 的資料並沒有更新
          console.log("ERROR", e);
          console.log(e.data);
          console.log(e.name);
        });

      // 清空輸入框欄位的值
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)} // onChange 事件，執行 setLocation() 函式，改變狀態
          placeholder="Enter Location"
          onKeyDown={searchLocation} // 鍵盤 keydonw 事件，執行 searchLocation() 函式
          type="text"
        />
      </div>
      {data.cod == 200 ? (
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
                  <p className="bold">{Math.floor(data.wind.speed)} MPH</p>
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
