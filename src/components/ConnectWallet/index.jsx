import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import logoConnet from '../../assets/img/logoConnect.png';
import './styles.css';
import ChangeNetwork from '../ChangeNetwork';

const ConnectWallet = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  // const logoutUser = () => {
  //   if (ethereum && ethereum.isMetaMask) {
  //     ethereum.on('accountsChanged', function (accounts) {
  //       return () => ethereum.removeListener('accountsChanged', accounts);
  //     });
  //   }
  // };

  return (
    <header className='App-header'>
      {haveMetamask ? (
        <div className='App-header'>
          {isConnected ? (
            <>
              <div className='card'>
                <div className='card-row'>
                  <h3>Wallet Address:</h3>
                  <p>
                    {accountAddress.slice(0, 4)}...
                    {accountAddress.slice(38, 42)}
                  </p>
                </div>
                <div className='card-row'>
                  <h3>Wallet Balance:</h3>
                  <p>{accountBalance}</p>
                </div>
              </div>
            </>
          ) : (
            <img src={logoConnet} className='App-logo' alt='logo' />
          )}
          {isConnected ? (
            <>
              <p className='info'>🎉 Connected Successfully 🎉 </p>
              <ChangeNetwork/>
            </>
          ) : (
            <>
              <button className='btn' onClick={connectWallet}>
                Connect Wallet
              </button>
            </>
          )}
        </div>
      ) : (
        <p>Please Install MataMask</p>
      )}
    </header>
  );
};

export default ConnectWallet;

// import { useNetwork, useSwitchNetwork } from 'wagmi';

// function ConnectWallet() {
//   const { chain } = useNetwork();
//   const { chains, error, isLoading, pendingChainId, switchNetwork } =
//     useSwitchNetwork();

//   return (
//     <>
//       {chain && <div>Connected to {chain.name}</div>}

//       {chains.map((x) => (
//         <button
//           disabled={!switchNetwork || x.id === chain?.id}
//           key={x.id}
//           onClick={() => switchNetwork?.(x.id)}>
//           {x.name}
//           {isLoading && pendingChainId === x.id && ' (switching)'}
//         </button>
//       ))}

//       <div>{error && error.message}</div>
//     </>
//   );
// }

// export default ConnectWallet;
