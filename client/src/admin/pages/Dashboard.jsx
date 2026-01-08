import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/pages_css/AdminDashboard.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminComment, setAdminComment] = useState('');
  const [updating, setUpdating] = useState(false);

  // Fetch claims on component mount and when filters change
  useEffect(() => {
    fetchClaims();
  }, [activeTab, statusFilter]);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const typeParam = activeTab !== 'all' ? `type=${activeTab}` : '';
      const statusParam = statusFilter !== 'all' ? `status=${statusFilter}` : '';
      const queryString = [typeParam, statusParam].filter(Boolean).join('&');
      
      const response = await fetch(`http://localhost:5000/apis/insur-claimer/admin/claims?${queryString}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setClaims(data.claims);
      } else {
        console.error('Failed to fetch claims');
      }
    } catch (error) {
      console.error('Error fetching claims:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (claim) => {
    setSelectedClaim(claim);
    setAdminComment(claim.admin_comment || '');
    setShowModal(true);
  };

  const handleUpdateStatus = async (status) => {
    if (!selectedClaim) return;

    setUpdating(true);
    try {
      const response = await fetch(
        `http://localhost:5000/apis/insur-claimer/admin/claims/update?type=${selectedClaim.type}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            claimId: selectedClaim._id,
            status: status,
            admin_comment: adminComment,
          }),
        }
      );

      if (response.ok) {
        alert(`Claim ${status.toLowerCase()} successfully!`);
        setShowModal(false);
        fetchClaims(); // Refresh the claims list
      } else {
        alert('Failed to update claim status');
      }
    } catch (error) {
      console.error('Error updating claim:', error);
      alert('Error updating claim status');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/admin/login');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'status-approved';
      case 'Rejected':
        return 'status-rejected';
      case 'Under Review':
        return 'status-review';
      default:
        return 'status-pending';
    }
  };

  const filteredClaims = claims;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label>Insurance Type:</label>
            <div className="tab-buttons">
              <button
                className={activeTab === 'all' ? 'tab-btn active' : 'tab-btn'}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={activeTab === 'health' ? 'tab-btn active' : 'tab-btn'}
                onClick={() => setActiveTab('health')}
              >
                Health
              </button>
              <button
                className={activeTab === 'vehicle' ? 'tab-btn active' : 'tab-btn'}
                onClick={() => setActiveTab('vehicle')}
              >
                Vehicle
              </button>
              <button
                className={activeTab === 'travel' ? 'tab-btn active' : 'tab-btn'}
                onClick={() => setActiveTab('travel')}
              >
                Travel
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-select"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Claims Table */}
        <div className="claims-section">
          {loading ? (
            <div className="loading-state">Loading claims...</div>
          ) : filteredClaims.length === 0 ? (
            <div className="empty-state">No claims found</div>
          ) : (
            <div className="claims-table-wrapper">
              <table className="claims-table">
                <thead>
                  <tr>
                    <th>Claim ID</th>
                    <th>User Email</th>
                    <th>Type</th>
                    <th>Company</th>
                    <th>Policy No</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClaims.map((claim) => (
                    <tr key={claim._id}>
                      <td>{claim._id.substring(0, 8)}...</td>
                      <td>{claim.userID?.email || 'N/A'}</td>
                      <td>
                        <span className={`type-badge type-${claim.type.toLowerCase()}`}>
                          {claim.type}
                        </span>
                      </td>
                      <td>{claim.company}</td>
                      <td>{claim.policy_no}</td>
                      <td>₹{claim.claim_amount?.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(claim.status)}`}>
                          {claim.status}
                        </span>
                      </td>
                      <td>{new Date(claim.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => handleViewDetails(claim)}
                          className="view-btn"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal for Claim Details */}
      {showModal && selectedClaim && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Claim Details</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <strong>Claim ID:</strong>
                  <span>{selectedClaim._id}</span>
                </div>
                <div className="detail-item">
                  <strong>User Email:</strong>
                  <span>{selectedClaim.userID?.email || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <strong>Type:</strong>
                  <span>{selectedClaim.type}</span>
                </div>
                <div className="detail-item">
                  <strong>Company:</strong>
                  <span>{selectedClaim.company}</span>
                </div>
                <div className="detail-item">
                  <strong>Policy Number:</strong>
                  <span>{selectedClaim.policy_no}</span>
                </div>
                <div className="detail-item">
                  <strong>Claim Amount:</strong>
                  <span>₹{selectedClaim.claim_amount?.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <strong>Status:</strong>
                  <span className={`status-badge ${getStatusBadgeClass(selectedClaim.status)}`}>
                    {selectedClaim.status}
                  </span>
                </div>
                <div className="detail-item">
                  <strong>Submitted:</strong>
                  <span>{new Date(selectedClaim.createdAt).toLocaleString()}</span>
                </div>

                {/* Type-specific fields */}
                {selectedClaim.type === 'Health' && (
                  <>
                    <div className="detail-item">
                      <strong>Patient Name:</strong>
                      <span>{selectedClaim.patient_name}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Hospital:</strong>
                      <span>{selectedClaim.hospital_name}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Ailment:</strong>
                      <span>{selectedClaim.ailment}</span>
                    </div>
                  </>
                )}

                {selectedClaim.type === 'Vehicle' && (
                  <>
                    <div className="detail-item">
                      <strong>Driver Name:</strong>
                      <span>{selectedClaim.driver_name}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Vehicle No:</strong>
                      <span>{selectedClaim.vehicle_no}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Wheeler Type:</strong>
                      <span>{selectedClaim.wheeler_type}</span>
                    </div>
                  </>
                )}

                {selectedClaim.type === 'Travel' && (
                  <>
                    <div className="detail-item">
                      <strong>Travel Type:</strong>
                      <span>{selectedClaim.travel_type}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Incident Date:</strong>
                      <span>{new Date(selectedClaim.incident_date).toLocaleDateString()}</span>
                    </div>
                  </>
                )}

                <div className="detail-item full-width">
                  <strong>User Story:</strong>
                  <p>{selectedClaim.user_story}</p>
                </div>
              </div>

              {/* Admin Comment Section */}
              <div className="comment-section">
                <label htmlFor="adminComment">
                  <strong>Admin Comment:</strong>
                </label>
                <textarea
                  id="adminComment"
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  placeholder="Add your comments here..."
                  rows="4"
                  className="comment-textarea"
                />
              </div>

              {/* Action Buttons */}
              {selectedClaim.status === 'Pending' || selectedClaim.status === 'Under Review' ? (
                <div className="action-buttons">
                  <button
                    onClick={() => handleUpdateStatus('Under Review')}
                    disabled={updating || selectedClaim.status === 'Under Review'}
                    className="btn-review"
                  >
                    {updating ? 'Updating...' : 'Mark Under Review'}
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('Approved')}
                    disabled={updating}
                    className="btn-approve"
                  >
                    {updating ? 'Updating...' : 'Approve Claim'}
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('Rejected')}
                    disabled={updating}
                    className="btn-reject"
                  >
                    {updating ? 'Updating...' : 'Reject Claim'}
                  </button>
                </div>
              ) : (
                <div className="status-message">
                  This claim has been {selectedClaim.status.toLowerCase()}.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

//       // Redirect to login page
//       window.location.href = '/Admin';
//     };

//     // Listen for back button press
//     window.addEventListener('popstate', handlePopState);

//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, []);

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     if (isAuthenticated) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       fetchRequests(activeTab);
//     }
//   }, [activeTab, isAuthenticated]);

//   const handleAction = async (id: string, action: 'Approved' | 'Rejected') => {
//     try {
//       /* Backend Connection Example:
//       const res = await fetch(`/api/claims/${id}`, {
//         method: 'PATCH',
//         body: JSON.stringify({ status: action })
//       });
//       */
//       setRequests(prev => prev.filter(req => req._id !== id));
//       alert(`Request ${action} successfully`);
//     } catch (error) {
//       alert("Action failed");
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       // Call logout API to clear cookie
//       await fetch('/api/admin/logout', {
//         method: 'POST',
//       });

//       // Clear sessionStorage as well
//       sessionStorage.removeItem('adminToken');

//       // Redirect to login
//       router.push('/Admin');
//     } catch (error) {
//       console.error('Logout error:', error);
//       // Still redirect even if API call fails
//       sessionStorage.removeItem('adminToken');
//       router.push('/Admin');
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Verifying authentication...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       {/* Sidebar Navigation */}
//       <aside className="w-64 bg-slate-900 text-white flex flex-col">
//         <div className="p-6 text-2xl font-bold border-b border-slate-800">
//           InsureCare <span className="text-blue-400">Admin</span>
//         </div>
//         <nav className="flex-1 p-4 space-y-2">
//           {['Travel', 'Health', 'Vehicle'].map((type) => (
//             <button
//               key={type}
//               onClick={() => setActiveTab(type as never)}
//               className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${activeTab === type ? 'bg-blue-600' : 'hover:bg-slate-800'
//                 }`}
//             >
//               <span>{type} Insurance</span>
//             </button>
//           ))}
//         </nav>
//         <div className="p-4 border-t border-slate-800">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-center space-x-2 p-3 bg-red-600 hover:bg-red-700 rounded-lg transition font-semibold"
//           >
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <main className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Header */}
//         <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
//           <h2 className="text-xl font-semibold text-gray-800">{activeTab} Requests</h2>
//           <div className="flex items-center space-x-4">
//             <span className="text-gray-600 font-medium">Welcome, <span className="text-blue-600">{adminEmail}</span></span>
//           </div>
//         </header>

//         <div className="p-8 overflow-y-auto">
//           {loading ? (
//             <div className="text-center py-10 text-gray-500">Loading {activeTab} requests...</div>
//           ) : (
//             <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
//               <table className="w-full text-left">
//                 <thead className="bg-gray-800 text-white text-sm uppercase">
//                   <tr>
//                     <th className="px-6 py-4">User ID</th>
//                     <th className="px-6 py-4">Insurance Type</th>
//                     <th className="px-6 py-4">Document Details</th>
//                     <th className="px-6 py-4">Risk Score</th>
//                     <th className="px-6 py-4">Severity</th>
//                     <th className="px-6 py-4 text-center">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 text-black">
//                   {requests.length > 0 ? (
//                     requests.map((req) => (
//                       <tr key={req._id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 font-medium">{req.userId}</td>
//                         <td className="px-6 py-4">{req.insuranceType}</td>
//                         <td className="px-6 py-4">
//                           <button className="text-blue-600 underline">preview</button>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`px-3 py-1 rounded-full text-xs font-bold ${req.riskScore === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
//                             }`}>{req.riskScore}</span>
//                         </td>
//                         <td className="px-6 py-4">{req.severity}</td>
//                         <td className="px-6 py-4 text-center">
//                           <div className="flex justify-center space-x-2">
//                             <button
//                               onClick={() => handleAction(req._id, 'Approved')}
//                               className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold"
//                             >Approve</button>
//                             <button
//                               onClick={() => handleAction(req._id, 'Rejected')}
//                               className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold"
//                             >Reject</button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={6} className="px-6 py-10 text-center text-gray-500">No pending {activeTab} requests found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }