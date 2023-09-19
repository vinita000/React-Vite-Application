import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import { TextField, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const defaultValues = {
  loading: false,
  error: '',
  value: '',
};

const SearchContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 50,
});

const LoaderContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '4px',
});

const ErrorText = styled(Typography)({
  color: 'red',
  marginTop: '4px',
})


const SearchCountry: React.FC = () => {
  const [state, setState] = useState(defaultValues);
  const { loading, error, value } = state;
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));
  }

  const handleClick = async () => {
    // console.log(searchText?.current?.value);
    try {
      setState((prevSate) => ({
        ...prevSate,
        isDisabled: true,
        loading: true,
        error: ''
      }));
      const data = await fetch(`https://restcountries.com/v3.1/name/${value}`);

      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }
      const result = await data.json();
      // console.log("result", result)
      navigate('/details', { state: { countryDetails: result } });
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: 'Record not found or network error',
      }));
    } finally {
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  }

  return (
    <>
      <SearchContainer>
        <TextField
          id="outlined-basic"
          label="Search Country"
          variant="outlined"
          onChange={handleInputChange}
        />

        <Button
          onClick={handleClick}
          disabled={!value.length}
          variant="contained"
          color="primary"
        // style={{ marginLeft: '0.5rem', opacity: isDisabled ? 0.5 : 1, pointerEvents: isDisabled ? 'none' : 'auto' }}

        >
          SEARCH
        </Button>
      </SearchContainer>
      <LoaderContainer>
        {loading && <LoadingIndicator />}
        {error && <ErrorText>{error}</ErrorText>}
      </LoaderContainer>
    </>
  );

};

export default SearchCountry;
