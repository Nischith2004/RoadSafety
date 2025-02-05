import { useEffect, useState, useRef } from "react";
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

    useEffect(() => {
        Promise.all([
            import("react-leaflet"),
            import("leaflet")
        ]).then(([reactLeaflet, leaflet]) => {
            setLeafletComponents({
                MapContainer: reactLeaflet.MapContainer,
                TileLayer: reactLeaflet.TileLayer,
                Marker: reactLeaflet.Marker,
                Popup: reactLeaflet.Popup
            });
            setLeaflet(leaflet);
        });
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, (error) => {
                setError("Unable to fetch location");
            });
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setUploadedImage("");
            return;
        }

        if (!file.type.startsWith('image/')) {
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

    const handleAddMarker = () => {
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

        setMarkers([...markers, { geocode: [lat, lng], imageUrl: imageToUse }]);
        setError("");
        setUploadedImage("");
        
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

    const { MapContainer, TileLayer, Marker, Popup } = LeafletComponents;
    const { Icon, divIcon, point } = Leaflet;

    const markerIconUrl = "/marker-icon.png";

    const customIcon = new Icon({
        iconUrl: markerIconUrl,
        iconSize: [38, 38]
    });

    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
            className: "custom-marker-cluster",
            iconSize: point(33, 33, true)
        });
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
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
                    {markers.map((marker, index) => (
                        <Marker key={index} position={marker.geocode} icon={customIcon}>
                            <Popup>
                                <img src={marker.imageUrl} alt="User provided" style={{ width: "100px", height: "100px" }} />
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
};

export default Maps;