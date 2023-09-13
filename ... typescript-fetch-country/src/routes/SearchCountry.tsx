import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';

const defaultValues = {
  isFocused: false,
  loading: false,
  error: '',
  isDisabled: false,
};

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
        loading: true,
        error: ''
      }));
    }
  };

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
        isDisabled: false,
      }));
    }
  }
  console.log("error", error)
  return (
    <>
      <div className='flex justify-center mt-8 '>
        <div className={`w-1/9 rounded-l relative border p-4 ${isFocused ? 'border-blue-500 border-2' : 'border-grey-300'}`}>
          <input
            ref={searchText}
            className={`w-full p-2 outline-none text-center ${isFocused ? 'cursor-pointer' : 'border-grey-300'}`}
            type="text"
            onFocus={() =>
              setState((prevState) => ({
                ...prevState,
                isFocused: true,
              }))
            }
            onBlur={handleBlur}
          />
          <label
            className={`absolute top-3 left-${isFocused ? '7' : '12'} transition-transform ${isFocused ? 'text-l font-bold -translate-y-6 text-blue-500' : ''
              }`}
            style={{ left: isFocused ? '7px' : '12px' }}
          >
            Search Country
          </label>
        </div>
        <button
          onClick={handleClick}
          disabled={isDisabled}
          className={`px-2 py-2 ml-0.5 text-blue-500 rounded-l border-t border-r border-b border-blue-500 ${isDisabled ? "opacity-50 pointer-events-none" : ""
            }`}
        >
          SEARCH
        </button>
      </div>
      <div className='flex flex-col items-center mt-4'>
        {loading && <LoadingIndicator />}
        {error && <p className="text-red-500 text-lg mt-2">{error}</p>}
      </div>

    </>
  );
};

export default SearchCountry;
