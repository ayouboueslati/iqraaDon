import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;  // Get the base URL from .env

// Function to create a campaign
const createCampaign = async (campaignData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/create-campaign`, campaignData);
    console.log(response.data);  // Handle success response
  } catch (error) {
    console.error('Error creating campaign:', error);
  }
};


export default createCampaign;  // Export the function for use elsewhere
