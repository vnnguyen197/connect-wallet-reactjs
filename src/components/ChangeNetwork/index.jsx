import SwitchButton from '../SwitchButton';
import './styles.css';

const ChangeNetwork = () => {
  return (
    <div className='network'>
      <SwitchButton  networkName='polygon'/>
      <SwitchButton  networkName='bsc'/>
    </div>
  );
};

export default ChangeNetwork;
