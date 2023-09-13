import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchCountry from './routes/SearchCountry';
import CountryDetail from './routes/CountryDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SearchCountry />} />
        <Route path='/details' element={<CountryDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
