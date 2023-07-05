// src/components/AddStakeholder.js
import React, { useState } from 'react';

const AddStakeholder = ({ orgRegistryContract, account }) => {
  const [orgAddress, setOrgAddress] = useState('');
  const [stakeholderAddress, setStakeholderAddress] = useState('');

  const handleAddStakeholder = async () => {
    try {
      const tx = await orgRegistryContract.addStakeholder(orgAddress, stakeholderAddress);
      await tx.wait();
      setOrgAddress('');
      setStakeholderAddress('');
    } catch (error) {
      console.error('Failed to add stakeholder:', error);
    }
  };

  return (
    <div>
      <h2>Add Stakeholder</h2>
      <input
        type="text"
        value={orgAddress}
        onChange={(e) => setOrgAddress(e.target.value)}
        placeholder="Organization Address"
      />
      <input
        type="text"
        value={stakeholderAddress}
        onChange={(e) => setStakeholderAddress(e.target.value)}
        placeholder="Stakeholder Address"
      />
      <button onClick={handleAddStakeholder}>Add Stakeholder</button>
    </div>
  );
};

export default AddStakeholder;
