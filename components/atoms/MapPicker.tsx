// "use client";

// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// const tankIcon = new L.Icon({
//   iconUrl: "/img/png/water-tank.png",
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// interface MapPickerProps {
//   lat: number;
//   lng: number;
//   setLat: (value: number) => void;
//   setLng: (value: number) => void;
// }

// function LocationSelector({ setLat, setLng }: Omit<MapPickerProps, "lat" | "lng">) {
//   useMapEvents({
//     click(e) {
//       setLat(e.latlng.lat);
//       setLng(e.latlng.lng);
//     },
//   });
//   return null;
// }

// export default function MapPicker({ lat, lng, setLat, setLng }: MapPickerProps) {
//   return (
//     <MapContainer
//       center={[lat, lng]}
//       zoom={16}
//       className="w-full h-64 rounded-lg overflow-hidden z-10"
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <Marker position={[lat, lng]} icon={tankIcon} />
//       <LocationSelector setLat={setLat} setLng={setLng} />
//     </MapContainer>
//   );
// }
