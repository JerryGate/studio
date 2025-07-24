
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Viewer } from 'mapillary-js';
import 'mapillary-js/dist/mapillary.css';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const NIGERIA_CENTER = { lat: 9.0820, lng: 8.6753 };

interface MapProps {
    onLocationSelect?: (location: { lat: number; lng: number }) => void;
    initialCenter?: { lat: number; lng: number };
    markers?: { lat: number; lng: number }[];
    interactive?: boolean;
}

// Fix for default Leaflet icon path issue with Webpack
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

const Map = ({ onLocationSelect, initialCenter, markers, interactive = true }: MapProps) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState<'loading' | 'street' | 'map' | 'error'>('loading');
    const [error, setError] = useState<string | null>(null);

    const mapillaryKey = process.env.NEXT_PUBLIC_MAPILLARY_ACCESS_TOKEN;

    useEffect(() => {
        if (!mapContainerRef.current) return;
        
        let viewer: Viewer | null = null;
        let leafletMap: L.Map | null = null;

        const centerPoint = initialCenter || NIGERIA_CENTER;

        const initializeMapillary = () => {
            if (!mapillaryKey) {
                setError('Mapillary Access Token is not configured.');
                initializeLeaflet();
                return;
            }

            try {
                viewer = new Viewer({
                    accessToken: mapillaryKey,
                    container: mapContainerRef.current!,
                });

                viewer.moveCloseTo(centerPoint.lat, centerPoint.lng)
                    .then((node) => {
                        console.log('Mapillary loaded successfully for node:', node.id);
                        setStatus('street');
                        if (interactive && onLocationSelect) {
                            viewer?.on('position', (event) => {
                                onLocationSelect({ lat: event.latLon.lat, lng: event.latLon.lng });
                            });
                        }
                    })
                    .catch((e) => {
                        console.warn('Mapillary could not find street view, falling back to Leaflet.', e);
                        initializeLeaflet();
                    });

            } catch (e) {
                 console.error('Error initializing Mapillary Viewer:', e);
                 initializeLeaflet();
            }
        };

        const initializeLeaflet = () => {
            if (mapContainerRef.current && !leafletMap) {
                 mapContainerRef.current.innerHTML = ''; // Clear container
                 leafletMap = L.map(mapContainerRef.current).setView([centerPoint.lat, centerPoint.lng], 13);

                 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(leafletMap);
                
                (markers || [centerPoint]).forEach(markerLocation => {
                    L.marker([markerLocation.lat, markerLocation.lng]).addTo(leafletMap!);
                });
                
                if (interactive && onLocationSelect) {
                    leafletMap.on('click', (e) => {
                         onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
                         L.marker(e.latlng).addTo(leafletMap!);
                    });
                }
                
                setStatus('map');
            }
        };

        initializeMapillary();

        return () => {
            if (viewer) {
                viewer.remove();
                viewer = null;
            }
            if (leafletMap) {
                leafletMap.remove();
                leafletMap = null;
            }
        };
    }, [initialCenter, interactive, onLocationSelect, markers, mapillaryKey]);

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center h-full w-full bg-muted">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Loading Map...</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="flex items-center justify-center h-full w-full bg-muted p-4">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Map Error</AlertTitle>
                    <AlertDescription>{error || 'Could not load the map.'}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default Map;
