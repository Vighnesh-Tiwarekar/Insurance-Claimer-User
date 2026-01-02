import { useClaims } from '../hooks/useClaims'
import { LoadingPage } from './LoadingPage.jsx'
import { ClaimCard } from '../components/ClaimCard.jsx';
import {  useNavigate } from "react-router-dom";

export const Home = () => {

    const { data, isLoading, isError, error } = useClaims();

    const navigate = useNavigate();

    if (isLoading) {
        return (
            <LoadingPage></LoadingPage>
        )
    }

    const newClaim = () => {
        navigate('/select')
    }

    const claimsList = data?.claims || [];

    return (
        <>
            <div>
                <div>My Claims History</div>

                {claimsList.length === 0 ? (
                    <div>No claims found.</div>
                ) : (
                    <div>
                        {claimsList.map((claim) => (
                            <ClaimCard key={claim._id} claim={claim} />
                        ))}
                    </div>
                )}
            </div>

            <button className='submit-btn' onClick={newClaim}>
                Make A New Claim
            </button>
        </>
    )
}

