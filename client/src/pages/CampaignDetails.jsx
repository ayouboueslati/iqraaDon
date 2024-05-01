import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
import ShareButton from '../components/ShareButton';  // Import the new ShareButton


const CampaignDetails = () => {
  const { state } = useLocation();  // Get campaign data from routing
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();  // Ensure context works

  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const [amount, setAmount] = useState('');  // Donation amount
  const [donators, setDonators] = useState([]);  // List of donators

  // Calculate remaining days and amounts
  const remainingDays = daysLeft(state.deadline);
  const remainingAmount = state.target - state.amountCollected;

  // Fetch donators
  const fetchDonators = async () => {
    const data = await getDonations(state.pId);  // Fetch all donations
    setDonators(data);
  };

  useEffect(() => {
    if (contract) {
      fetchDonators();  // Fetch donators when contract or address changes
    }
  }, [contract, address]);

  // Handle donation
  const handleDonate = async () => {
    try {
      await donate(state.pId, amount);  // Donate to the campaign
      navigate('/');  // Redirect after donation
    } catch (error) {
      console.error('Donation failed:', error);
      alert('Failed to process donation. Please try again.');
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };

  return (
    <div>  {/* Ensure proper opening tag */}
      {isLoading && <Loader />}  // Display loader during async operations

      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="font-epilogue text-white text-[32px]">{state.title}</h1>
        <ShareButton campaign={state} />  // Add the Twitter sharing button
      </div>

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl" />
          <div className="relative w-full h-[7px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%' }}
            />
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays > 0 ? remainingDays : 0} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32]">
                <img src={thirdweb} alt="user" className="w-[60%] h-[60%]" />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4 bg-[#1c1c24] p-4 rounded-[10px]"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px]">
                      {index + 1}. {item.donator}
                    </p>
                    <p class="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all">
                      {ethers.formatUnits(item.donation, 'ether')} ETH
                    </p>
                  </div>
                ))
              ) : (
                <p class="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first to donate!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={`flex-1 ${remainingAmount <= 0 || remainingDays <= 0 ? 'hidden' : ''}`}>
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>   

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p class="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input 
                type="number"
                placeholder="1 ETH"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[#3a3a43] bg-transparent font-epilogue text-white"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 class="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
                <p class="font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to you.
                </p>
              </div>

              <CustomButton 
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
