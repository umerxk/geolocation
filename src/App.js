import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
            error: null,
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: "Please enable your location to see content on this page.",
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation not supported by your browser.",
      });
    }
  }, []);

  const saveLocation = async () => {
    if (location.latitude && location.latitude) {
      const payload = { UserId: '12113', Latitude: location.latitude, Longitude: location.longitude }
      await axios.post("https://upset-brittne-khokhar-c213fe5f.koyeb.app/make", JSON.stringify(payload))
    }
  }

  useEffect(() => {
    saveLocation();
  }, [location]);


  return (
    <div className="App">
      <header className="App-header">
        {location.error ? (
          <p>{location.error}</p>
        ) : (
          <>
            <p>Location has been shared with Umer Khokhar</p>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
