import {useState} from 'react';
import './TicketInfo.css'; // Make sure to create a corresponding CSS file for styling
import profileImage from '../../assets/circle-profile.png'; // Replace with the actual path to your profile image
import OverlayPhotoExtend from './OverlayPhotoExtend';
const TicketInfo = () => {
  // You would typically fetch this data from state or props
  const [extendedPhoto, setExtendedPhoto] = useState(false);
  const ticketDetails = {
    profileImage: profileImage, // Placeholder path
    fromStation: 'Passau',
    toStation: 'Munich',
    departureTime: '14:00',
    // arrivalTime: '18:30',
    departureDate: '2024-03-15',
    // returnDate: '2021-12-10',
    hasSchoolCertificate: true, // This could be a state or prop if dynamic
  };

  const handlePhotoExtend = () => {
    setExtendedPhoto(true);
  };

  function simpleDecrypt(text) {
    return atob(text); // Base64 decode
  }

  const existingData = JSON.parse(simpleDecrypt(localStorage.getItem('travelFormDataArray'))) || [];
  // console.log(existingData[5].profileImage);

  return (
    <div className="ticket-info">
      <h2 className="ticket-info__title">Ticket</h2>
      <div className="ticket-info__profile-image">
        <button  onClick={handlePhotoExtend} >
          <img src={ticketDetails.profileImage} alt="Profile" />
        </button>
      </div>
      {extendedPhoto && (
        <OverlayPhotoExtend onClose={setExtendedPhoto}/>
      )}
      <div className="ticket-info__ticket">
        <span className="ticket-info__station">{ticketDetails.fromStation}</span>
        <span className="ticket-info__arrow">→</span>
        {/* <span className="ticket-info__time">{ticketDetails.arrivalTime}</span> */}
        <span className="ticket-info__station">{ticketDetails.toStation}</span>
      </div>
      <div className='ticket-info__ticket_date'>
        <span className="ticket-info__time">Time: {ticketDetails.departureTime}</span>
        <br />
        <span className="ticket-info__date">Date: {ticketDetails.departureDate}</span>
        {/* <span className="ticket-info__date">{ticketDetails.returnDate}</span> */}
      </div>
          <div className="ticket-info__certificate">
        {ticketDetails.hasSchoolCertificate && (
          <span className="ticket-info__certificate-verified">
            Has Valid School Certificate
            <span className="ticket-info__checkmark">✓</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default TicketInfo;
