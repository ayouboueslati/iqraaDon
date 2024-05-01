import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { Loader } from '../components';
import { useNavigate } from 'react-router-dom';

const TransparencyDashboard = () => {
  const { contract, getCampaigns, getDonations } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [totalFunds, setTotalFunds] = useState(0);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [recentDonations, setRecentDonations] = useState([]);
  const [popularCampaigns, setPopularCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const campaigns = await getCampaigns();
        setTotalCampaigns(campaigns.length);

        const totalFundsRaised = campaigns.reduce((sum, campaign) => {
          return sum + parseFloat(campaign.amountCollected);
        }, 0);
        setTotalFunds(totalFundsRaised);

        const recentDonations = await getDonations(0);
        setRecentDonations(recentDonations);

        const popular = [...campaigns]
          .sort((a, b) => b.amountCollected - a.amountCollected)
          .slice(0, 3);
        setPopularCampaigns(popular);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (contract) {
      fetchData();
    }
  }, [contract]);

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Transparency Dashboard</h1>
          <div className="mb-6">
            <h2 className="text-xl">Summary</h2>
            <p>Total Funds Raised: {totalFunds} ETH</p>
            <p>Total Campaigns: {totalCampaigns}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl">Popular Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {popularCampaigns.map((campaign, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 cursor-pointer"
                  onClick={() => navigate(`/campaign-details/${index}`)}
                >
                  <h3 className="text-lg font-semibold">{campaign.title}</h3>
                  <p>Funds Raised: {campaign.amountCollected} ETH</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl">Recent Donations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentDonations.map((donation, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
                  <p>Donator: {donation.donator}</p>
                  <p>Donation: {donation.donation} ETH</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TransparencyDashboard;
