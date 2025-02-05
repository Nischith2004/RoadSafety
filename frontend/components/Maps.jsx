import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { supabase } from "./supabaseClient"; // Adjust the path if needed
import "./Maps.css";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";

const Maps = () => {
  const [LeafletComponents, setLeafletComponents] = useState(null);
  const [Leaflet, setLeaflet] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [uploadedImage, setUploadedImage] = useState("");
  const fileInputRef = useRef(null);

  // Dynamically load react-leaflet (including useMap) and leaflet modules
  useEffect(() => {
    Promise.all([import("react-leaflet"), import("leaflet")]).then(
      ([reactLeaflet, leaflet]) => {
        setLeafletComponents({
          MapContainer: reactLeaflet.MapContainer,
          TileLayer: reactLeaflet.TileLayer,
          Marker: reactLeaflet.Marker,
          Popup: reactLeaflet.Popup,
          useMap: reactLeaflet.useMap, // used for auto-adjusting the view
        });
        setLeaflet(leaflet);
      }
    );
  }, []);

  // Get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setError("Unable to fetch location");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  // Fetch existing markers from Supabase when the component mounts
  useEffect(() => {
    async function fetchMarkers() {
      const { data, error: fetchError } = await supabase
        .from("markers")
        .select("*");
      if (fetchError) {
        setError("Failed to fetch markers from database");
        console.error(fetchError);
      } else if (data) {
        // Map database rows to your local marker format (including the id)
        const formattedMarkers = data.map((marker) => ({
          id: marker.id,
          geocode: [marker.latitude, marker.longitude],
          imageUrl: marker.image_url,
        }));
        setMarkers(formattedMarkers);
      }
    }
    fetchMarkers();
  }, []);

  // Handle image upload (or fallback to URL from the text input)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setUploadedImage("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      setUploadedImage("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
      setError("");
    };
    reader.onerror = () => {
      setError("Failed to read the file.");
      setUploadedImage("");
    };
    reader.readAsDataURL(file);
  };

  // Save a new marker in Supabase and update local state
  const handleAddMarker = async () => {
    const lat = parseFloat(document.getElementById("lat").value);
    const lng = parseFloat(document.getElementById("lng").value);
    const imageUrl = document.getElementById("image").value;
    const imageToUse = uploadedImage || imageUrl;

    if (isNaN(lat) || isNaN(lng) || !imageToUse) {
      setError("Please fill in all fields correctly.");
      return;
    }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setError("Invalid latitude or longitude values.");
      return;
    }

    // Insert the new marker into Supabase and return the inserted row
    const { data: insertedData, error: insertError } = await supabase
      .from("markers")
      .insert([{ latitude: lat, longitude: lng, image_url: imageToUse }])
      .select();
    if (insertError) {
      setError("Failed to save marker in database.");
      console.error(insertError);
      return;
    }

    // Use the returned id from Supabase to update the marker state
    const newMarker = {
      id: insertedData[0].id,
      geocode: [lat, lng],
      imageUrl: imageToUse,
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setError("");
    setUploadedImage("");

    // Clear the input fields
    document.getElementById("lat").value = "";
    document.getElementById("lng").value = "";
    document.getElementById("image").value = "";
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUseCurrentLocation = () => {
    if (userLocation.lat && userLocation.lng) {
      document.getElementById("lat").value = userLocation.lat;
      document.getElementById("lng").value = userLocation.lng;
    } else {
      setError("Unable to fetch your location.");
    }
  };

  if (!LeafletComponents || !Leaflet) return <div>Loading...</div>;

  const { MapContainer, TileLayer, Marker, Popup, useMap } = LeafletComponents;
  const { Icon, divIcon, point } = Leaflet;

  const markerIconUrl = "/marker-icon.png";
  const customIcon = new Icon({
    iconUrl: markerIconUrl,
    iconSize: [38, 38],
  });

  // Create a custom cluster icon for MarkerClusterGroup
  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  // Inner component to adjust the map's view to include all markers.
  // This component receives the `markers` prop which we validate below.
  const RecenterAutomatically = ({ markers }) => {
    const map = useMap();
    useEffect(() => {
      if (markers.length > 0) {
        const bounds = markers.map((marker) => marker.geocode);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [markers, map]);
    return null;
  };

  // PropTypes validation for RecenterAutomatically
  RecenterAutomatically.propTypes = {
    markers: PropTypes.arrayOf(
      PropTypes.shape({
        geocode: PropTypes.arrayOf(PropTypes.number).isRequired,
        imageUrl: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  return (
    <div className="map-container">
      <div className="user-input">
        <label htmlFor="lat">Latitude:</label>
        <input type="number" id="lat" placeholder="Enter latitude (-90 to 90)" />
        <label htmlFor="lng">Longitude:</label>
        <input type="number" id="lng" placeholder="Enter longitude (-180 to 180)" />
        <label htmlFor="image">Image URL:</label>
        <input type="text" id="image" placeholder="Enter image URL" />
        <label htmlFor="imageUpload">Or upload image:</label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
        />
        <button onClick={handleAddMarker}>Add Marker</button>
        <button onClick={handleUseCurrentLocation}>Use My Location</button>
        {error && <p className="error">{error}</p>}
      </div>
      <MapContainer center={[11.0045, 76.961]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.length > 0 && <RecenterAutomatically markers={markers} />}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.geocode} icon={customIcon}>
              <Popup>
                <img
                  src={marker.imageUrl}
                  alt="User provided"
                  style={{ width: "100px", height: "100px" }}
                />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Maps;
