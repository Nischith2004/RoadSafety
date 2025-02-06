import "./SOS.css";
import React from "react";
function Sos() {
  /*  /*This function is for sos message feature
  const sendSOS = () => {
    const phone = "+919740845269"; 
    let smsUrl = `sms:${phone}?body=Emergency! I need help!`;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          smsUrl += ` My Location: https://www.google.com/maps?q=${lat},${lon}`;
          window.location.href = smsUrl;
        },
        () => {
          alert("Unable to retrieve location.");
          window.location.href = smsUrl; // Send SMS without location
        }
      );
    } else {
      alert("Geolocation is not supported in this browser.");
      window.location.href = smsUrl;
    }
  };*/
  const callSOS = () => {
    const emergencyNumber = "+phno."; // Replace with actual emergency number
    window.location.href = `tel:${emergencyNumber}`;
  };

  return <div className="sos" onClick={callSOS}></div>;
}
export default Sos;
