import { useQuery } from 'react-query';
import { getBublicRestroomRequest } from '../api/mapService';

const useRestroom = () => {
  const { data: locationData } = useQuery(
    ['location'],
    getBublicRestroomRequest,
    { staleTime: 1000 * 60 * 5 }
  );

  return { locationData };
};

export default useRestroom;
