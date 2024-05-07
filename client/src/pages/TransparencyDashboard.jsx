import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Statistic, Progress, Divider } from 'antd';
import { color, motion } from 'framer-motion'; 
import { Loader } from '../components';
import { useStateContext } from '../context';

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
          return sum + (parseFloat(campaign.amountCollected) || 0);
        }, 0);

        setTotalFunds(totalFundsRaised.toFixed(2));

        const recentDonations = await getDonations(0) || [];
        setRecentDonations(recentDonations);

        const popular = [...campaigns]
          .sort((a, b) => parseFloat(b.amountCollected) - parseFloat(a.amountCollected))
          .slice(0, 3);
        setPopularCampaigns(popular);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (contract) {
      fetchData();
    }
  }, [contract]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5, staggerChildren: 0.3 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center text-white">Transparency Dashboard</h1>

          <div className="mb-6 text-center text-white">
            <Statistic 
              title="Total Funds Raised"  
              value={`${totalFunds} ETH`} 
              titleStyle={{ color: 'white' }} 
              valueStyle={{ color: 'white' }} 
            />
            <Statistic 
              title="Total Campaigns"  
              value={totalCampaigns} 
              titleStyle={{ color: 'white' }} 
              valueStyle={{ color: 'white' }} 
            />
          </div>

          <Divider orientation="center" style={{ color: 'white' }}>Popular Campaigns</Divider>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCampaigns.map((campaign, index) => (
              <Card
                key={index}
                hoverable
                className="bg-[#1c1c24] text-white"
                onClick={() => navigate(`/campaign-details/${campaign.title}`, { state: campaign })}
                style={{ transition: 'transform 0.2s' }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <Card.Meta
                  title={campaign.title}
                  description={`Funds Raised: ${parseFloat(campaign.amountCollected).toFixed(2)} ETH`}
                />
                <Progress
                  percent={((parseFloat(campaign.amountCollected) || 0) / parseFloat(campaign.target)) * 100}
                  status="active"
                  strokeColor="#4acd8d"
                />
              </Card>
            ))}
          </div>
          
        </motion.div>
      )}
    </div>
  );
};

export default TransparencyDashboard;