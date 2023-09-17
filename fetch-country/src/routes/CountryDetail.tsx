
import React from 'react'
import { useLocation } from 'react-router-dom';
import DetailCard from '../components/DetailCard';
import { styled } from '@mui/system';


const DetailedContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
});


const CountryDetail: React.FC = () => {
  const location = useLocation();
  const { countryDetails } = location?.state || [];


  console.log("countryDetails", countryDetails)
  return(
    <DetailedContainer>
      {Array.isArray(countryDetails) &&
        countryDetails.map((detail, index) => (
          <DetailCard key={index} detail={detail} />
        ))}
    </DetailedContainer>
  )
}

export default CountryDetail;