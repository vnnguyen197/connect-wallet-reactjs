import React from 'react';
import { networks } from '../../constants/networks';
import { changeNetwork } from '../../utils/ethereumMethods';
import './styles.css';

export default function SwitchButton({ networkName }) {
  return (
    <button
      disabled={window.ethereum.chainId === networks[networkName].chainId}
      className="button"
      onClick={() => changeNetwork(networkName)}
    >
      Switch to {networkName}
    </button>
  );
}
