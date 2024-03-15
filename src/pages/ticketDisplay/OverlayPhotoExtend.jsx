import './Overlay.css'; // Ensure this points to the correct CSS file path
import fullPic from "../../assets/full_pic.jpg";

const Overlay = ({ onClose }) => {
 
  const handleClick = () => {
    console.log('Close button clicked');
    onClose(false);
  };

  return (
    <div className="overlay">
      <div className="content">
        <img src={fullPic} alt="full" />
        <button onClick={handleClick}>Close</button>
      </div>
    </div>
  );
};

export default Overlay;
