"use client";
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import dynamic from 'next/dynamic';
const WalletMultiButtonDynamic = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);
const WalletDisconnectButtonDynamic = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletDisconnectButton),
  { ssr: false }
);

import Airdrop from '@/components/Airdrop';
import Balance from '@/components/Balance';
import Transaction from '@/components/Transaction';
import SignMessage from '@/components/SignMessage';
import AllTokens from '@/components/AllTokens';
import TokenTransaction from '@/components/TokenTransaction';

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ToastContainer />
          <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
            <div className="w-full p-10 bg-white rounded-lg shadow-lg">
              <h1 className="mb-4 text-2xl font-bold text-center text-blue-500">Solana dApp</h1>

              <p className="mb-4 text-red-500 text-center">
                This dApp works only for Devnet. Please switch your wallet to Developer Mode before connecting.
              </p>

              <div className="flex justify-between mb-6 space-x-4">
                <WalletMultiButtonDynamic className="btn-primary" />
                <Balance />
                <WalletDisconnectButtonDynamic className="btn-secondary" />
              </div>

              <div className="flex justify-between mb-6">
                <div className="flex-1 mx-2">
                  <Airdrop />
                </div>
                <div className="flex-1 mx-2">
                  <Transaction />
                </div>
                <div className="flex-1 mx-2">
                  <SignMessage />
                </div>
              </div>

              <div className="flex justify-between mb-6 space-x-4">
                <AllTokens />
              </div>
              <div className="flex justify-between mb-6 space-x-4">
                <TokenTransaction />
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
