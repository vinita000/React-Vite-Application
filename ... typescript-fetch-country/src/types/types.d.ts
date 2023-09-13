interface ISTATE {
  isFocused: boolean;
  loading: boolean;
  error: string;
  isDisabled: boolean;
}

interface IPROPS {
  detail: {
    flags: {
      png: string
    },
    name: {
      common: srting
    },
    capital: Array,
    latlng: Array
  }
  
}

interface IWEATHERSTATE {
  showWeather: boolean;
  weather: string;
}