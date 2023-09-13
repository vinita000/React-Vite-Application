

import React from 'react'
import { useLocation } from 'react-router-dom';
import DetailCard from '../components/DetailCard';

const CountryDetail: React.FC = () => {
  const location = useLocation();
  const { countryDetails } = location?.state || [];


  console.log("countryDetails", countryDetails)
  return(
    <div className='flex flex-wrap justify-center'>
      {Array.isArray(countryDetails) &&
        countryDetails.map((detail, index) => (
          <DetailCard key={index} detail={detail} />
        ))}
    </div>
  )
}

export default CountryDetail;