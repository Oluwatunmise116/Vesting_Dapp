// src/components/RegisterOrg.js
import React, { useState } from 'react';

const RegisterOrg = ({ orgRegistryContract, account }) => {
  const [orgName, setOrgName] = useState('');
  const [tokenContractAddress, setTokenContractAddress] = useState('');

  const handleRegisterOrg = async () => {
    try {
      const tx = await orgRegistryContract.registerOrganization(orgName, tokenContractAddress);
      await tx.wait();
      setOrgName('');
      setTokenContractAddress('');
    } catch (error) {
      console.error('Failed to register organization:', error);
    }
  };

  return (
    <div>
      <h2>Register Organization</h2>
      <input
        type="text"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
        placeholder="Organization Name"
      />
      <input
        type="text"
        value={tokenContractAddress}
        onChange={(e) => setTokenContractAddress(e.target.value)}
        placeholder="Token Contract Address"
      />
      <button onClick={handleRegisterOrg}>Register Organization</button>
    </div>
  );
};

export default RegisterOrg;
