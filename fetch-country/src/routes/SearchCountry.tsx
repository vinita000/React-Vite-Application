import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

const defaultValues = {
  isFocused: false,
  loading: false,
  error: '',
  isDisabled: true,
};

const SearchContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '50px',
});

const LoaderContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '4px',
});

const ErrorText = styled('p')({
  color: 'red',
  marginTop: '4px',
})


const SearchCountry: React.FC = () => {
  const [state, setState] = useState(defaultValues);
  const { isFocused, loading, error, isDisabled } = state;
  const searchText = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value.trim()) {
      setState((prevState) => ({
        ...prevState,
        isFocused: false,
        isDisabled: true,
        loading: false,
        error: ''
      }));
    }
  };

  const handleInputChange = () => {
    const hasValue = searchText?.current?.value?.trim() !== '';
    setState((prevState) => ({
      ...prevState,
      isDisabled: !hasValue
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
      const data = await fetch(`https://restcountries.com/v3.1/name/${searchText?.current?.value}`);

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
        isDisabled: true,
      }));
    }
  }
  console.log("error", error)
  return (
    <>
      <SearchContainer>
        <TextField
          id="outlined-basic"
          label="Search Country"
          variant="outlined"
          inputRef={searchText}
          onFocus={() =>
            setState((prevState) => ({
              ...prevState,
              isFocused: true,
            }))
          }
          onBlur={handleBlur}
          onChange={handleInputChange}
          style={{
            cursor: isFocused ? 'pointer' : 'default',
          }}
        />
        <Button
          onClick={handleClick}
          disabled={isDisabled}
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
