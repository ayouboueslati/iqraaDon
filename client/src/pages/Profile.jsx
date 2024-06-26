import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'; 
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data.reverse());
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      <DisplayCampaigns 
        isLoading={isLoading} 
        campaigns={campaigns} 
      />
    </div>
  );
}

export default Profile