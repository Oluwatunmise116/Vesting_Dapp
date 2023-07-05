// src/components/WithdrawTokens.js
import React from 'react';

const WithdrawTokens = ({ vestingContract, account }) => {
  const handleWithdrawTokens = async () => {
    try {
      const tx = await vestingContract.claimTokens();
      await tx.wait();
    } catch (error) {
      console.error('Failed to withdraw tokens:', error);
    }
  };

  return (
    <div>
      <h2>Withdraw Tokens</h2>
      <button onClick={handleWithdrawTokens}>Withdraw Tokens</button>
    </div>
  );
};

export default WithdrawTokens;
