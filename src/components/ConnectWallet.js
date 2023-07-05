// src/components/ConnectWallet.js
import React, { useState } from 'react';
import { ethers } from 'ethers';

const ConnectWallet = ({ connectWallet }) => {
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        connectWallet(signer);
        setWalletConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.error('Metamask extension not detected');
    }
  };

  return (
    <div>
      {!walletConnected ? (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      ) : (
        <p>Wallet Connected</p>
      )}
    </div>
  );
};

export default ConnectWallet;
