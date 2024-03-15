import { useEffect, useState } from 'react';
import './Overlay.css'; // Ensure this points to the correct CSS file path
import qrCodeSrc from '../../assets/QR_selling.png'; // Adjust this path as needed

const Overlay = ({ onClose }) => {
  // Initialize the timer to 5 minutes (300 seconds)
  const [timer, setTimer] = useState(300);

  useEffect(() => {
    // Only set the timeout if the timer is greater than 0
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000); // Decrease every second
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  // Convert timer to minutes and seconds for display
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const handleClick = () => {
    console.log('Close button clicked');
    onClose(false);
  };

  return (
    <div className="overlay">
      <div className="content">
        <img src={qrCodeSrc} alt="QR Code" />
        <span className='clock'>{`${minutes}:${seconds.toString().padStart(2, '0')}`}</span> {/* Display timer */}
        <button onClick={handleClick}>Close</button>
      </div>
    </div>
  );
};

export default Overlay;
