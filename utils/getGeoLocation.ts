export const getGeoLocation = (
  setLatitude: (val: string) => void,
  setLongitude: (val: string) => void
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toString();
        const long = position.coords.longitude.toString();

        localStorage.setItem("lat", lat);
        localStorage.setItem("long", long);
        setLatitude(lat);     
        setLongitude(long);  
      },
      (error) => {
        console.error("Error getting GPS location:", error.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  } else {
    console.warn("Geolocation is not supported by this browser.");
  }
};
