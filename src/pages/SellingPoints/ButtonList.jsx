import {useState} from 'react';
import './ButtonList.css'; // Make sure to create a corresponding CSS file for styling
import Overlay from './OverlaySellingPoint';

const ButtonList = () => {
  
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = () => {
    setShowOverlay(true);
    console.log('Kiosk button clicked');
  }

  return (
    <>
    <ul className="button-list">
      <li className="button-list__item">
        <button className="button-list__button" onClick={handleClick}>Kiosk</button>
      </li>
      <li className="button-list__item">
        <button className="button-list__button" onClick={handleClick}>Vending Machine</button>
      </li>
    </ul>
    {showOverlay && <Overlay  onClose={setShowOverlay}/>}
    </>
  );
};

export default ButtonList;
