
'use client';

import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2 } from 'lucide-react';

const NIGERIA_CENTER: LatLngExpression = [9.0820, 8.6753];

interface MapProps {
    onLocationSelect?: (location: { lat: number, lng: number }, address: string) => void;
    initialCenter?: { lat: number, lng: number };
    markers?: { lat: number, lng: number }[];
    interactive?: boolean;
}

const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41]
});

function MapEventsHandler({ onLocationSelect, setPosition }: { onLocationSelect: MapProps['onLocationSelect'], setPosition: (pos: LatLngExpression) => void }) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            const mockAddress = `Selected location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            if (onLocationSelect) {
                onLocationSelect({ lat, lng }, mockAddress);
            }
        },
    });
    return null;
}

function Map({ 
    onLocationSelect, 
    initialCenter = NIGERIA_CENTER, 
    markers = [], 
    interactive = true 
}: MapProps) {
    const [isClient, setIsClient] = useState(false);
    const [position, setPosition] = useState<LatLngExpression | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const center = useMemo<LatLngExpression>(() => {
        if (initialCenter && initialCenter.lat && initialCenter.lng) {
            return [initialCenter.lat, initialCenter.lng];
        }
        return NIGERIA_CENTER;
    }, [initialCenter]);

    if (!isClient) {
        return (
            <div className="flex items-center justify-center h-full bg-muted">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Loading Map...</p>
            </div>
        );
    }
    
    return (
        <MapContainer center={center} zoom={interactive ? 6 : 14} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {interactive && <MapEventsHandler onLocationSelect={onLocationSelect} setPosition={setPosition} />}
            
            {interactive && position && (
                <Marker position={position} icon={customIcon}>
                     <Popup>Your selected delivery location.</Popup>
                </Marker>
            )}

            {!interactive && markers.map((marker, index) => (
                <Marker key={index} position={[marker.lat, marker.lng]} icon={customIcon}>
                    <Popup>Delivery Location #{index + 1}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
