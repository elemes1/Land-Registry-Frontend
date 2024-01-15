// useGeolocation.js
import { ref } from 'vue';

export function useGeolocation() {
  console.log('we are useGeolocation')
  const currentLatitude = ref(null);
  const currentLongitude = ref(null);
  const formattedAddress = ref(null);
  const geolocationError = ref(null);
  let geocoder;
  const updateLocation = ({ latitude, longitude }) => {
    console.log('we are updateLocation')

    currentLatitude.value = latitude;
    currentLongitude.value = longitude;
    fetchLocationAddress(latitude, longitude);
  };
  const fetchLocationAddress = (latitude, longitude) => {
    console.log('we are fetchLocationAddress', latitude, longitude)
    if (!latitude || !longitude) return;
    if (!geocoder) {
      geocoder = new google.maps.Geocoder();
    }
    const latlng = { lat: latitude, lng: longitude };
    geocoder.geocode({ 'location': latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          formattedAddress.value = results[0].formatted_address;
        } else {
          formattedAddress.value = 'Address UNKNOWN';
        }
        console.log(formattedAddress.value)
        return formattedAddress.value;
      } else {
        geolocationError.value = `Geocoder failed due to: ${status}`;
      }
    });
  };
  const fetchAddressByCoordsAsync = async (latitude, longitude) => {
    if (!geocoder) {
      geocoder = new google.maps.Geocoder();
    }
    try {
      const response = await new Promise((resolve, reject) => {
        geocoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
          if (status === 'OK') {
            resolve(results[0].formatted_address);
          } else {
            reject(new Error('Geocoder failed'));
          }
        });
      });
      return response;
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Address UNKNOWN';
    }
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        updateLocation(position.coords);
      }, (error) => {
        geolocationError.value = `Geolocation error: ${error.message}`;
      });
    } else {
      geolocationError.value = "Geolocation is not supported by this browser.";
    }
  };
  const loadGoogleMapsScript = () => {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        geocoder = new google.maps.Geocoder();
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Google Maps'));
      document.head.appendChild(script);
    });
  };
  // Call loadGoogleMapsScript immediately to load the script
  loadGoogleMapsScript().catch(error => {
    geolocationError.value = error.message;
  });
  return {
    currentLatitude,
    currentLongitude,
    formattedAddress,
    geolocationError,
    getCurrentLocation,
    updateLocation,
    fetchLocationAddress,
    fetchAddressByCoordsAsync
  };
}
