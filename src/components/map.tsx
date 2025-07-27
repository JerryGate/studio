
'use client';

import React, { useState } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const NIGERIA_CENTER = { lat: 9.0820, lng: 8.6753 };
const DEFAULT_ZOOM = 6;
const FOCUSED_ZOOM = 15;

interface MapProps {
    onLocationSelect?: (location: { lat: number; lng: number }) => void;
    initialCenter?: { lat: number; lng: number };
    markers?: { lat: number; lng: number }[];
    interactive?: boolean;
}

const MapWrapper = ({ onLocationSelect, initialCenter, markers, interactive = true }: MapProps) => {
    const [selectedMarker, setSelectedMarker] = useState(initialCenter);

    const centerPoint = selectedMarker || initialCenter || NIGERIA_CENTER;

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (!interactive || !onLocationSelect || !event.latLng) return;
        const newLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        setSelectedMarker(newLocation);
        onLocationSelect(newLocation);
    };

    return (
        <GoogleMap
            mapId="e-pharma-map"
            style={{ width: '100%', height: '100%' }}
            defaultCenter={centerPoint}
            defaultZoom={initialCenter ? FOCUSED_ZOOM : DEFAULT_ZOOM}
            center={centerPoint}
            zoom={initialCenter ? FOCUSED_ZOOM : DEFAULT_ZOOM}
            gestureHandling={interactive ? 'auto' : 'none'}
            onClick={handleMapClick}
            disableDefaultUI={true}
        >
            {markers?.map((marker, index) => (
                <AdvancedMarker key={index} position={marker}>
                    <Pin />
                </AdvancedMarker>
            ))}
            {selectedMarker && !markers && (
                 <AdvancedMarker position={selectedMarker}>
                    <Pin />
                </AdvancedMarker>
            )}
        </GoogleMap>
    );
};


const Map = (props: MapProps) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
         return (
            <div className="flex items-center justify-center h-full w-full bg-muted p-4">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Map Configuration Error</AlertTitle>
                    <AlertDescription>The Google Maps API key is not configured. Please contact support.</AlertDescription>
                </Alert>
            </div>
        );
    }
    
    return (
        <APIProvider apiKey={apiKey} libraries={['marker']}>
            <MapWrapper {...props} />
        </APIProvider>
    )
}

export default Map;
