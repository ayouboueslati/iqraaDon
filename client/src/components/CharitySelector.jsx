import React, { useState } from 'react';
import { ethers } from 'ethers';

const approvedCharities = [
  { name: 'Charity A', address: '0x1234567890abcdef1234567890abcdef12345678' },
  { name: 'Charity B', address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd' },

];

const CharitySelector = ({ onSelect }) => {
  const [selectedCharity, setSelectedCharity] = useState(null);

  const handleSelect = (e) => {
    const charity = approvedCharities.find(c => c.name === e.target.value);
    setSelectedCharity(charity);
    onSelect(charity);
  };

  return (
    <div>
      <label htmlFor="charity-select">Select a charity:</label>
      <select id="charity-select" onChange={handleSelect}>
        <option value="">--Choose a charity--</option>
        {approvedCharities.map(charity => (
          <option key={charity.address} value={charity.name}>
            {charity.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CharitySelector;
