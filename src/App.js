import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null
  });

  console.log("location", location);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation not supported by your browser."
      });
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Location has been shared with umer khokhar</p>
        <p>Latitude : {location.latitude}</p>
        <p>Longitude : {location.longitude}</p>
      </header>
    </div>
  );
}

export default App;
