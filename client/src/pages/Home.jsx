import { useClaims } from '../hooks/useClaims'
import { LoadingPage } from './LoadingPage.jsx'
import { ClaimCard } from '../components/ClaimCard.jsx';
import {  useNavigate } from "react-router-dom";
import '../css/pages_css/Home.css';

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
        <div className='home-container'>
            <div className='home-content'>
                <div className='home-header'>
                    <div className='header-text'>
                        <h1 className='page-title'>My Claims</h1>
                        <p className='page-subtitle'>View and manage your insurance claims</p>
                    </div>
                    <button className='new-claim-btn' onClick={newClaim}>
                        <span className='btn-icon'>+</span>
                        New Claim
                    </button>
                </div>

                <div className='claims-section'>
                    {claimsList.length === 0 ? (
                        <div className='empty-state'>
                            <div className='empty-icon'>📋</div>
                            <h3>No Claims Yet</h3>
                            <p>You haven't submitted any insurance claims. Click the button above to get started.</p>
                        </div>
                    ) : (
                        <div className='claims-grid'>
                            {claimsList.map((claim) => (
                                <ClaimCard key={claim._id} claim={claim} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

