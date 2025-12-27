import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Dev Duel TCG',
  projectId: 'YOUR_PROJECT_ID', // Get one for free at https://cloud.walletconnect.com/
  chains: [mainnet, polygon, optimism, arbitrum, base],
});