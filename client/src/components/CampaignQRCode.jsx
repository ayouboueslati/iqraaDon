import React from 'react';
import QRCode from 'qrcode.react';  // QR code generator component

const CampaignQRCode = ({ pId }) => {
  // Define the deep link to the specific campaign details page
  const campaignLink = `https://your-deployed-app.vercel.app/campaign-details/${pId}`;

  return (
    <div>
      <h3>Scan this QR code to view the campaign on your desktop</h3>
      <QRCode value={campaignLink} size={128} />  // Generate the QR code
    </div>
  );
};

export default CampaignQRCode;
