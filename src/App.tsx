
import { UserProvider } from '../src/components/UserContext.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider,  midnightTheme } from '@rainbow-me/rainbowkit';
import { Chain, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import HomePage from './pages/HomePage.tsx';
import Quest1 from './pages/Quest1.tsx';
import Quest2 from './pages/Quest2.tsx';
import HomePagePower from './components/HomePagePower.tsx';
import Quest3 from './pages/Quest3.tsx';
import Quest4 from './pages/Quest4.tsx';
import Quest5 from './pages/Quest5.tsx';
import Quest6 from './pages/Quest6.tsx';
import Quest7 from './pages/Quest7.tsx';
import Quest8 from './pages/Quest8.tsx';
import HomePageTrack from './pages/HomePage_track.tsx';
import AddressPage from './pages/AddressPage.tsx';
import ClaimPage from './pages/Claim.tsx';


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

const App = () => {
  return (
    <UserProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={midnightTheme({
            accentColor: '#00FFFFFF',
            accentColorForeground: 'white',
            borderRadius: 'large',
          })}
        >
          <Router>
            <main className="absolute top-0 left-0 w-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quest_1" element={<Quest1 />} />
                <Route path="/quest_2" element={<Quest2 />} />
                <Route path="/quest_3" element={<Quest3 />} />
                <Route path="/quest_4" element={<Quest4 />} />
                <Route path="/quest_5" element={<Quest5 />} />
                <Route path="/quest_6" element={<Quest6 />} />
                <Route path="/quest_7" element={<Quest7 />} />
                <Route path="/quest_8" element={<Quest8 />} />
                <Route path="/voting" element = {<HomePagePower />} />
                <Route path="/claim" element={<ClaimPage />} />
                <Route path='/explorer' element={!window.location.search.includes('?address=') ? <HomePageTrack /> : <AddressPage />}/>
              </Routes>
            </main>
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </UserProvider>
  );
};

export default App;
