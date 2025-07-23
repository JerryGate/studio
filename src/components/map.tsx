
'use client';

import React, { useEffect, useRef } from 'react';
import L, { LatLngExpression, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2 } from 'lucide-react';

const NIGERIA_CENTER: LatLngExpression = [9.0820, 8.6753];

interface MapProps {
    onLocationSelect?: (location: { lat: number; lng: number }, address: string) => void;
    initialCenter?: { lat: number; lng: number };
    markers?: { lat: number; lng: number }[];
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

const Map = ({ onLocationSelect, initialCenter, markers = [], interactive = true }: MapProps) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = React.useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !mapContainerRef.current) return;

        // Ensure the container is empty before initializing
        if (mapContainerRef.current.hasChildNodes()) {
            mapContainerRef.current.innerHTML = '';
        }

        const map = L.map(mapContainerRef.current).setView(
            initialCenter ? [initialCenter.lat, initialCenter.lng] : NIGERIA_CENTER,
            initialCenter ? 14 : 6
        );

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        if (markers.length > 0) {
            markers.forEach(markerData => {
                if (markerData.lat && markerData.lng) {
                    const popupText = onLocationSelect ? 'Your selected delivery location.' : `Delivery Location`;
                    L.marker([markerData.lat, markerData.lng], { icon: customIcon })
                        .addTo(map)
                        .bindPopup(popupText)
                        .openPopup();
                }
            });
        }
        
        if (interactive && onLocationSelect) {
            map.on('click', async (e) => {
                const { lat, lng } = e.latlng;

                let address = `Selected location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                    const data = await response.json();
                    if (data && data.display_name) {
                        address = data.display_name;
                    }
                } catch (error) {
                    console.error("Reverse geocoding failed:", error);
                }
                onLocationSelect({ lat, lng }, address);
            });
        }
        
        // Cleanup function to remove the map instance
        return () => {
            map.remove();
        };
    }, [isClient, JSON.stringify(initialCenter), JSON.stringify(markers), interactive, onLocationSelect]);


    if (!isClient) {
        return (
            <div className="flex items-center justify-center h-full w-full bg-muted">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Loading Map...</p>
            </div>
        );
    }

    return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default Map;
