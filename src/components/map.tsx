
'use client';

import { useState, useEffect, useRef } from 'react';
import L, { LatLngExpression, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Loader2 } from 'lucide-react';

const NIGERIA_CENTER: LatLngExpression = [9.0820, 8.6753];

interface MapProps {
    onLocationSelect?: (location: { lat: number, lng: number }, address: string) => void;
    initialCenter?: { lat: number, lng: number };
    markers?: { lat: number, lng: number }[];
    interactive?: boolean;
}

// Fix for default icon issue with webpack
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
    const mapRef = useRef<L.Map | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && mapContainerRef.current && !mapRef.current) {
            const center = initialCenter ? [initialCenter.lat, initialCenter.lng] : NIGERIA_CENTER;
            const zoom = initialCenter ? 14 : 6;

            const map = L.map(mapContainerRef.current).setView(center, zoom);
            mapRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            if (interactive) {
                map.on('click', (e) => {
                    const { lat, lng } = e.latlng;
                    const mockAddress = `Selected location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                    if (onLocationSelect) {
                        onLocationSelect({ lat, lng }, mockAddress);
                    }
                });
            }

            // This is the cleanup function that will be called when the component unmounts
            return () => {
                if (mapRef.current) {
                    mapRef.current.remove();
                    mapRef.current = null;
                }
            };
        }
    }, [isClient, initialCenter, interactive, onLocationSelect]);

    useEffect(() => {
        // Handle markers
        if (mapRef.current) {
            // Clear existing markers first to avoid duplicates
            mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    mapRef.current?.removeLayer(layer);
                }
            });

            // Add new markers
            const currentMarkers = onLocationSelect ? markers : (initialCenter ? [{lat: initialCenter.lat, lng: initialCenter.lng}] : markers);

            currentMarkers.forEach((marker, index) => {
                if(marker.lat && marker.lng) {
                    const popupText = onLocationSelect ? 'Your selected delivery location.' : `Delivery Location #${index + 1}`;
                    L.marker([marker.lat, marker.lng], { icon: customIcon }).addTo(mapRef.current!)
                        .bindPopup(popupText);
                }
            });
             if(currentMarkers.length === 1 && currentMarkers[0].lat && currentMarkers[0].lng){
                mapRef.current.setView([currentMarkers[0].lat, currentMarkers[0].lng], 14);
            }
        }
    }, [markers, initialCenter, onLocationSelect]);


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
