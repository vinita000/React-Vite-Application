import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const defaultWeatherValue = {
  showWeather: false,
  weather: '',
  error: '',
}

const useStyles = makeStyles(() => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  detailCardStyle: {
    background: 'white',
    width: '250px',
    height: '300px',
    padding: '4px',
    margin: '4px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  },

  imageStyle: {
    width: '100%',
    height: '100px',
    marginBottom: '4px',
    margin: '0 auto',
  },

  weatherButton: {
    padding: '4px',
    border: '1px solid #2196F3',
    color: '#2196F3',
    '&:hover': {
      backgroundColor: 'lightgray',
      cursor: 'pointer',
    },
    backgroundColor: '#lightgray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  weatherText: {
    fontWeight: 'bold',
    color: 'red',
    padding: '2px',
  },

  errorText: {
    color: 'red',
  },
  
}));


const API_KEY = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

const DetailCard: React.FC<IPROPS> = ({ detail }) => {
  const classes = useStyles();
  const [state, setState] = useState(defaultWeatherValue);
  const { capital, name, flags, latlng } = detail
  console.log("latlng", latlng)
  const handleWeather = () => {
    showWeatherData();
  }

  console.log("API_KEY", API_KEY)
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
    <div className={classes.cardContainer}>
      <Card className={classes.detailCardStyle}>
        <img
          src={flags?.png}
          alt="Flag"
          className={classes.imageStyle}
        />
        <CardContent>
          <Typography variant="h6">{name?.common}</Typography>
          <Typography variant="subtitle1">Capital: {capital}</Typography>
          {!state.showWeather && (
            <Button
              onClick={handleWeather}
              className={classes.weatherButton}
            >
              Check Capital Weather
            </Button>
          )}
          {state.showWeather && !state.error && (
            <Typography className={classes.weatherText}>
              Weather: {state.weather}
            </Typography>
          )}
          {state.error && (
            <Typography className={classes.errorText}>
              Error: {state.error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailCard;
