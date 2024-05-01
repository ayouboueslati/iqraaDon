import { createCampaign, dashboard, profile,} from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'transparency-dashboard',  // Change to avoid conflict with existing names
    imgUrl: dashboard,  // Use a different icon if needed
    link: '/dashboard',  // Link to the transparency dashboard page
    disabled: false,  // Set to false if the link should be clickable
  },
];
