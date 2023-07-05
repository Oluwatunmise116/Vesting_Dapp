// src/App.js
import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { ethers } from 'ethers';
import OrgRegistry from './contracts/OrgRegistry.json';
import VestingContract from './contracts/VestingContract.json';
import ConnectWallet from './components/ConnectWallet';
import RegisterOrg from './components/RegisterOrg';
import AddStakeholder from './components/AddStakeholder';
import SetVestingSchedule from './components/SetVestingSchedule';
import WithdrawTokens from './components/WithdrawTokens';

const App = () => {
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [orgRegistryContract, setOrgRegistryContract] = useState(null);
  const [vestingContract, setVestingContract] = useState(null);



  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = provider.getSigner();
          const account = await signer.getAddress();
          setSigner(signer);
          setAccount(account);
          const orgRegistryAddress = '0x49F8FD9D00871304952eD77364855D39f9F5Cce6';
          const vestingContractAddress = '0xfD03Ff7dc89fA404cDf88feD29a012dcc1B5508a';
          const OrgRegistryABI = [
            [
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "orgAddress",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "string",
                    "name": "orgName",
                    "type": "string"
                  },
                  {
                    "indexed": false,
                    "internalType": "address",
                    "name": "tokenContractAddress",
                    "type": "address"
                  }
                ],
                "name": "OrganizationRegistered",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "orgAddress",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "address",
                    "name": "stakeholderAddress",
                    "type": "address"
                  }
                ],
                "name": "StakeholderAdded",
                "type": "event"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "_orgAddress",
                    "type": "address"
                  },
                  {
                    "internalType": "address",
                    "name": "_stakeholderAddress",
                    "type": "address"
                  }
                ],
                "name": "addStakeholder",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "name": "organizations",
                "outputs": [
                  {
                    "internalType": "string",
                    "name": "orgName",
                    "type": "string"
                  },
                  {
                    "internalType": "address",
                    "name": "tokenContractAddress",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "string",
                    "name": "_orgName",
                    "type": "string"
                  },
                  {
                    "internalType": "address",
                    "name": "_tokenContractAddress",
                    "type": "address"
                  }
                ],
                "name": "registerOrganization",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              }
            ]

          ];

          const VestingContracABI = [
            [
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "stakeholder",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  }
                ],
                "name": "TokensClaimed",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "stakeholder",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "start",
                    "type": "uint256"
                  },
                  {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "duration",
                    "type": "uint256"
                  }
                ],
                "name": "VestingScheduleSet",
                "type": "event"
              },
              {
                "inputs": [],
                "name": "claimTokens",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "_stakeholder",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "_start",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "_duration",
                    "type": "uint256"
                  }
                ],
                "name": "setVestingSchedule",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  }
                ],
                "name": "totalTokensAllocated",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "name": "vestingSchedules",
                "outputs": [
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "start",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "duration",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bool",
                    "name": "claimed",
                    "type": "bool"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              }
            ]
          ];
          const orgRegistryContract = new ethers.Contract(orgRegistryAddress, OrgRegistryABI, signer);
          const vestingContract = new ethers.Contract(vestingContractAddress, VestingContracABI, signer);
          setOrgRegistryContract(orgRegistryContract);
          setVestingContract(vestingContract);
        } catch (error) {
          console.error('Failed to connect wallet:', error);
        }
      } else {
        console.error('Metamask extension not detected');
      }
    };

    connectWallet();
  }, []);

  const PrivateRoute = ({ element: Element, ...rest }) => {
    return (
      <Route
        {...rest}
        element={
          account ? (
            <Element orgRegistryContract={orgRegistryContract} vestingContract={vestingContract} account={account} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    );
  };

  return (
    <Router>
      <React.Fragment>
        <h1>DApp Demo</h1>
        <Routes>
          <Route path="/" element={<ConnectWallet connectWallet={setSigner} />} />
          <PrivateRoute path="/register" element={RegisterOrg} />
          <PrivateRoute path="/add-stakeholder" element={AddStakeholder} />
          <PrivateRoute path="/set-vesting" element={SetVestingSchedule} />
          <PrivateRoute path="/withdraw" element={WithdrawTokens} />
        </Routes>
      </React.Fragment>
    </Router>
  );
};

export default App;
