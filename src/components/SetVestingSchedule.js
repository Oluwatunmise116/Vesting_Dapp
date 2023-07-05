// src/components/SetVestingSchedule.js
import React, { useState } from 'react';

const SetVestingSchedule = ({ vestingContract, account }) => {
  const [stakeholderAddress, setStakeholderAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [start, setStart] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleSetVestingSchedule = async () => {
    try {
      const tx = await vestingContract.setVestingSchedule(stakeholderAddress, amount, start, duration);
      await tx.wait();
      setStakeholderAddress('');
      setAmount(0);
      setStart(0);
      setDuration(0);
    } catch (error) {
      console.error('Failed to set vesting schedule:', error);
    }
  };

  return (
    <div>
      <h2>Set Vesting Schedule</h2>
      <input
        type="text"
        value={stakeholderAddress}
        onChange={(e) => setStakeholderAddress(e.target.value)}
        placeholder="Stakeholder Address"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
        placeholder="Amount"
      />
      <input
        type="number"
        value={start}
        onChange={(e) => setStart(parseInt(e.target.value))}
        placeholder="Start (Unix timestamp)"
      />
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(parseInt(e.target.value))}
        placeholder="Duration (in seconds)"
      />
      <button onClick={handleSetVestingSchedule}>Set Vesting Schedule</button>
    </div>
  );
};

export default SetVestingSchedule;
