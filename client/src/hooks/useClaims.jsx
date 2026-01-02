import { useQuery } from '@tanstack/react-query';
import { get_claimform } from '../functions/claim_functions';

export const useClaims = () => {

    return useQuery({

        queryKey: ['claims'],

        queryFn: get_claimform,
        
        refetchOnWindowFocus: false,

    })

}