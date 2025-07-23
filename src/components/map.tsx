
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
            // Initialize map only if it doesn't exist
            const center = initialCenter ? [initialCenter.lat, initialCenter.lng] : NIGERIA_CENTER;
            const zoom = interactive ? 6 : 14;

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
                    // Remove previous markers and add a new one
                    map.eachLayer((layer) => {
                        if (layer instanceof L.Marker) {
                            map.removeLayer(layer);
                        }
                    });
                    L.marker([lat, lng], { icon: customIcon }).addTo(map)
                        .bindPopup('Your selected delivery location.')
                        .openPopup();
                });
            }

            // Cleanup function to run when component unmounts
            return () => {
                if (mapRef.current) {
                    mapRef.current.remove();
                    mapRef.current = null;
                }
            };
        }
    }, [isClient, initialCenter, interactive, onLocationSelect]);

    useEffect(() => {
        // Handle non-interactive markers
        if (mapRef.current && !interactive) {
            // Clear existing markers
            mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    mapRef.current?.removeLayer(layer);
                }
            });
            // Add new markers
            markers.forEach((marker, index) => {
                L.marker([marker.lat, marker.lng], { icon: customIcon }).addTo(mapRef.current!)
                    .bindPopup(`Delivery Location #${index + 1}`);
            });
        }
    }, [markers, interactive, isClient]);


    if (!isClient) {
        return (
            <div className="flex items-center justify-center h-full bg-muted">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Loading Map...</p>
            </div>
        );
    }

    return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default Map;
