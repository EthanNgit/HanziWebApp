import React from 'react';
import '../../styles/Boxes/RedirectionNotification.css';

interface RedirectionNotificationProps {
  header: string;
  description: string;
  selectedOption: (newOption: boolean | null) => void;
}

function RedirectionNotification({ header, description, selectedOption}: RedirectionNotificationProps) {
  return (
    <div className='redirection-notification-wrapper'>
      <h1>{header}</h1>
      <hr className="notification-bar"/>
      <p>{description}</p>
      <button className="button-18" role="button" onClick={() => {selectedOption(false)}}>Stop</button>
      <button className="button-18" role="button" onClick={() => {selectedOption(true)}}>Continue</button>
    </div>
  );
}

export default RedirectionNotification;