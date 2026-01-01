import { useQuery } from '@tanstack/react-query';
import { get_profile } from '../functions/profile_functions';

export const useProfile = () => {

    return useQuery({

        queryKey: ['profile'],

        queryFn: get_profile,
        
        refetchOnWindowFocus: false,

    })

}