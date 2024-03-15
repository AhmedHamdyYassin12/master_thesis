import React, { useState } from 'react';
import {loadStripe} from "@stripe/stripe-js";
import './TravelForm.css'; // Assuming the CSS is in this file
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const TravelForm = () => {
  // State for each input field
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  // const [returnTime, setReturnTime] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  // const [returnDate, setReturnDate] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const profileImage  = "/src/assets/circle-profile.png";
  const history = useHistory();
  // Function to handle form submission

  const stripeLoadedPromise = loadStripe('pk_test_51NoXAaK0VVzEyEb6ptdDZmClW5FrhzvgrhGIvwMzQkVLRiJKam5xOnI0dVwspSgTvMxcFB0ozCfVAQjGt0Tfk9JZ00gwwUsG8J');


  const stripeFunc = async () => {
    const stripe = await stripeLoadedPromise;
    try {
        const result = await stripe.redirectToCheckout({
          lineItems: [{
            price: 'price_1OgtRwK0VVzEyEb6stW5E16V',
            quantity: 1,
          }],
          mode: 'payment',
          customerEmail: 'test@gmail.com',
          successUrl: 'http://localhost:3000/tickets',
          cancelUrl: 'http://localhost:3000/home',
        });
        // this will only log if the redirect did not work
        console.log(result.error);
    } catch (error) {
        // wrong API key? you will see the error message here
        console.log(error);
    }
  };

  function simpleEncrypt(text) {
    return btoa(text); // Base64 encode
  }
  
  function simpleDecrypt(text) {
    return atob(text); // Base64 decode
  }
    

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submit action
    // Create an object with the form data
    // const existingData = JSON.parse(localStorage.getItem('travelFormDataArray')) || [];

    // Push the new form data object to the array
    // existingData.push(formData);

    // Save the updated array back to local storage
    // localStorage.setItem('travelFormDataArray', JSON.stringify(existingData));
    setShowOverlay(true);
    // setFromStation('');
    // setToStation('');
    // setDepartureTime('');
    // setReturnTime('');
    // setDepartureDate('');
    // setReturnDate('');
  };

    const getNextDayDate = (date) => {
      const result = new Date(date);
      result.setDate(result.getDate() + 1);
      
      return result.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  };

  const handleTicketSelection = async (ticket) => {
    console.log("Selected ticket:", ticket);
    // Decrypt existing data from localStorage
    const existingDataString = localStorage.getItem('travelFormDataArray');
    const existingData = existingDataString ? JSON.parse(simpleDecrypt(existingDataString)) : [];
    console.log("Existing data:", existingData);
    // Add new ticket and encrypt data before storing it again
    existingData.push(ticket);
    localStorage.setItem('travelFormDataArray', simpleEncrypt(JSON.stringify((existingData))));

    setShowOverlay(false); // Hide overlay after selection
    // history.push('/tickets');
    stripeFunc();
  };


  return (
    <form className="travel-form" onSubmit={handleSubmit}>
      <h2 className="travel-form__title">Select a ticket</h2>
      <div className="travel-form__field">
        <select
          required
          value={fromStation}
          onChange={(e) => setFromStation(e.target.value)}
          placeholder="From Station"
        >
          <option value="From">Departure</option>
          <option value="Passau">Passau</option>
          <option value="Munich">Munich</option>
        </select>
        <div className='travel-form__swap-icon_container'>
          <span className="travel-form__swap-icon">⇅</span>
        </div>
      </div>
      <div className="travel-form__field">
        <select
          required
          value={toStation}
          onChange={(e) => setToStation(e.target.value)}
        >
          <option value="To">Destination</option>
          <option value="Munich">Munich</option>
          <option value="Passau">Passau</option>
        </select>
      </div>
      <div className="travel-form__dates">
        <input
          required
          type="time"
          placeholder="Departure"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
        />
      </div>
      <div className="travel-form__dates">
        <input
          required
          type="date"
          placeholder="Return"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </div>
      {showOverlay && (
        <div className="travel-form__overlay">
          <div className="travel-form__overlay-content">
            <ul className="travel-form__ticket-list">
              <li>
                <button 
                  className="travel-form__ticket-button"
                  onClick={() => handleTicketSelection({
                    fromStation,
                    toStation,
                    departureTime,
                    // returnTime,
                    departureDate,
                    // returnDate,
                  })}
                >
                  Ticket for {departureDate}: {fromStation} {departureTime} → {toStation} 
                </button>
              </li>
              <li>
                <button 
                  className="travel-form__ticket-button"
                  onClick={() => handleTicketSelection({
                    fromStation,
                    toStation,
                    departureTime,
                    // returnTime,
                    departureDate: getNextDayDate(departureDate),
                    // returnDate: getNextDayDate(returnDate),
                  })}
                >
                  Ticket for {getNextDayDate(departureDate)}: {fromStation} {departureTime} → {toStation}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="travel-form__buttons">
        <button type="submit" className="travel-form__button travel-form__button--primary">FIND TIMES AND TICKETS</button>
        {/* <button type="button" className="travel-form__button travel-form__button--secondary">DISCOUNT</button> */}
      </div>
    </form>
  );
};

export default TravelForm;
