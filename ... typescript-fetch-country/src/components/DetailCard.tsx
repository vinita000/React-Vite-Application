import React, { useState } from 'react';

const defaultWeatherValue = {
  showWeather: false,
  weather: '',
  error: '',
}

const API_KEY = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

const DetailCard: React.FC<IPROPS> = ({ detail }) => {
  const [state, setState] = useState(defaultWeatherValue);
  const { capital, name, flags, latlng } = detail
  console.log("latlng", latlng)
  const handleWeather = () => {
    showWeatherData();
  }

  const showWeatherData = async () => {
    try {
      const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${API_KEY}`)
      const json = await data.json();
      console.log("json", json?.main?.temp)

      if (!json.main || !json.main.temp) {
        throw new Error('Temperature not found');
      }

      setState((prevSate) => ({
        ...prevSate,
        showWeather: true,
        weather: json?.main?.temp,
        error: ''
      }));
    } catch (error) {
      setState((prevSate) => ({
        ...prevSate,
        error: 'Tempretur not found'
      }));
    }
  }
  return (
    <div className="">
      <div className="bg-white w-72 h-60 rounded-lg p-4 m-2 shadow-xl">
        <img
          src={flags?.png}
          alt="Flag"
          className="w-1/2 h-16 mx-auto mb-2"
        />
        <div className="text-center">
          <h1 className="font-bold">{name?.common}</h1>
          <h1 className="font-bold p-2">Capital: {capital}</h1>
          {!state.showWeather && (
            <button
              onClick={handleWeather}
              className={`p-4 border border-blue-300 text-blue-500 hover:bg-gray-200 cursor-pointer`}
            >
              Check Capital Weather
            </button>
          )}

          {state.showWeather && !state.error && (
            <div>
              <p className='font-bold text-red-500 p-2'>Weather: {state.weather}</p>
            </div>
          )}

          {state.error && (
            <div>
              <p>Error: {state.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
