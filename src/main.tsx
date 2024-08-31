import './polyfills';
import './global.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, Chain } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const lorenzoProtocol: Chain = {
  id: 8329,
  name: 'Lorenzo Protocol Mainnet',
  network: 'lorenzo',
  iconUrl: 'https://example.com/lorenzo-icon.svg', // You can replace this URL with an actual icon URL if available
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'stBTC',
    symbol: 'stBTC',
  },
  rpcUrls: {
    public: { http: ['https://rpc.lorenzo-protocol.xyz'] },
    default: { http: ['https://rpc.lorenzo-protocol.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Lorenzo Explorer', url: 'https://scan.lorenzo-protocol.xyz' },
    etherscan: { name: 'Lorenzo Explorer', url: 'https://scan.lorenzo-protocol.xyz' },
  },
  testnet: false, // Set this to false as it's the mainnet
};

const { chains, publicClient } = configureChains(
  [lorenzoProtocol],
  [publicProvider()]
);


const { connectors } = getDefaultWallets({
  appName: 'LorenzoQuest',
  projectId: '536d26743c83b4e06ec7f8602883ce23',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);