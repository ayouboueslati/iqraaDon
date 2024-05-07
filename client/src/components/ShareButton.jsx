import React from 'react';
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share';

const ShareButton = ({ campaign }) => {
  const currentUrl = window.location.href;  // Get current page URL
  const encodedUrl = encodeURIComponent(currentUrl);  // Properly encode the URL
  const shareText = `Support "${campaign.title}"! Help us reach our goal `;

  if (!currentUrl || !currentUrl.startsWith("http")) {
    console.error("Invalid URL:", currentUrl);
    return null;  // Avoid rendering if URL is invalid
  }

  return (
    <div className="share-buttons">
      {/* Twitter Sharing */}
      <TwitterShareButton
        url={currentUrl}
        title={shareText}
        hashtags={["Crowdfunding"]}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

     
    </div>
  );
};

export default ShareButton;
