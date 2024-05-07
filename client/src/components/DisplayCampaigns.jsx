import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Progress } from 'antd';
import { motion } from 'framer-motion';  
import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl text-white text-center">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap gap-6 justify-center mt-6">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="text-gray-500 text-lg">No campaigns found.</p>
        )}

        {!isLoading && campaigns.length > 0 && (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.5, delayChildren: 0.3, staggerChildren: 0.1 }}
          >
            {campaigns.map((campaign) => (
              <motion.div
                key={uuidv4()}
                className="bg-[#1c1c24] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                whileHover={{ scale: 1.05 }}  
                onClick={() => handleNavigate(campaign)}
              >
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white truncate">{campaign.title}</h3> {/* Truncation for long text */}
                  <div className="mt-2">
                    <Progress
                      percent={(campaign.amountCollected / campaign.target) * 100}
                      status="active"
                      showInfo={false}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Raised {campaign.amountCollected} ETH of {campaign.target} ETH
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
