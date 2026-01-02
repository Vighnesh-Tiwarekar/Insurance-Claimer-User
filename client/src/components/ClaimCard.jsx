import React, { useEffect } from 'react'

export const ClaimCard = (claims) => {

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const claim = claims.claim

  return (
    <>
      <div className='mx-[100px] bg-yellow-300'>

        <div>Type: {claim.type}</div>

        <div>Company: {claim.company}</div>

        <div>Policy No: {claim.policy_no}</div>

        <div>Status: {claim.status}</div>

        {claim.admin_comment && <div>Admin Comment: {claim.admin_comment}</div>}

        <div>Claim Date: {formatDate(claim.createdAt)}</div>

      </div>
    </>
  )
}
