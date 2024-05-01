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
  const shareText = `Check out this campaign: ${campaign.title}`;

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

      {/* Facebook Sharing */}
      <FacebookShareButton
        url={encodedUrl}  // Use encoded URL to ensure valid format
        quote={shareText}
        hashtag="#Crowdfunding"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  );
};

export default ShareButton;
