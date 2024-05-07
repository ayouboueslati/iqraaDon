import React, { useState } from 'react';
import { ethers } from 'ethers';
import CharitySelector from '../components/CharitySelector';

const DonateToCharity = ({ onDonate }) => {
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');

  const handleCharitySelect = (charity) => {
    setSelectedCharity(charity); 
  };

  const handleDonate = () => {
    if (selectedCharity && donationAmount > 0) {
      const amountInWei = ethers.parseUnits(donationAmount, 'ether');
      onDonate(selectedCharity.address, amountInWei); 
    }
  };

  
};

export default DonateToCharity;
