import React, { useEffect } from 'react'
import '../css/components_css/ClaimCard.css'

export const ClaimCard = (claims) => {

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const claim = claims.claim

  const getStatusClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  return (
    <div className='claim-card'>
      <div className='claim-card-header'>
        <div className='claim-type'>
          <span className='type-icon'>
            {claim.type === 'health' ? '🏥' : claim.type === 'vehicle' ? '🚗' : '✈️'}
          </span>
          <span className='type-text'>{claim.type?.toUpperCase()}</span>
        </div>
        <span className={`claim-status ${getStatusClass(claim.status)}`}>
          {claim.status || 'Pending'}
        </span>
      </div>

      <div className='claim-card-body'>
        <div className='claim-detail'>
          <span className='detail-label'>Company</span>
          <span className='detail-value'>{claim.company}</span>
        </div>

        <div className='claim-detail'>
          <span className='detail-label'>Policy Number</span>
          <span className='detail-value'>{claim.policy_no}</span>
        </div>

        <div className='claim-detail'>
          <span className='detail-label'>Claim Date</span>
          <span className='detail-value'>{formatDate(claim.createdAt)}</span>
        </div>

        {claim.admin_comment && (
          <div className='admin-comment'>
            <span className='comment-label'>Admin Comment:</span>
            <p className='comment-text'>{claim.admin_comment}</p>
          </div>
        )}
      </div>
    </div>
  )
}
