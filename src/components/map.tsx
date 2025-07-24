
'use client';

import React, { useEffect, useRef } from 'react';
import { Viewer } from 'mapillary-js';
import 'mapillary-js/dist/mapillary.css';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { AlertCircle } from 'lucide-react';

const NIGERIA_CENTER = { lat: 9.0820, lon: 8.6753 }; // Note: Mapillary uses lon, not lng

interface MapProps {
    onLocationSelect?: (location: { lat: number; lng: number }, address: string) => void;
    initialCenter?: { lat: number; lng: number }; // lng will be converted to lon
    interactive?: boolean;
}

const Map = ({ onLocationSelect, initialCenter, interactive = true }: MapProps) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = React.useState(false);
    const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');
    const [error, setError] = React.useState<string | null>(null);

    const mapillaryKey = process.env.NEXT_PUBLIC_MAPILLARY_ACCESS_TOKEN;

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !mapContainerRef.current || !mapillaryKey) {
            if (isClient && !mapillaryKey) {
                setError('Mapillary Access Token is not configured.');
                setStatus('error');
            }
            return;
        }

        let viewer: Viewer | null = new Viewer({
            accessToken: mapillaryKey,
            container: mapContainerRef.current,
        });

        const centerPoint = initialCenter 
            ? { lat: initialCenter.lat, lon: initialCenter.lng } 
            : NIGERIA_CENTER;

        viewer.moveTo(centerPoint)
            .then((node) => {
                setStatus('loaded');
                console.log('Moved to node:', node.id);
            })
            .catch((e) => {
                console.error('Failed to move to location:', e);
                setError('No street-level imagery found for this location. Please try another area.');
                setStatus('error');
            });
        
        if (interactive && onLocationSelect) {
            viewer.on('position', (event) => {
                const { lat, lng } = event.latLon;
                // For simplicity, we won't do reverse geocoding here as it's not a primary feature of MapillaryJS click events.
                const address = `Selected location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
                onLocationSelect({ lat, lng }, address);
            });
        }


        // Cleanup function to remove the map instance
        return () => {
            if (viewer) {
                viewer.remove();
                viewer = null;
            }
        };
    }, [isClient, mapillaryKey, initialCenter, interactive, onLocationSelect]);


    if (!isClient || status === 'loading') {
        return (
            <div className="flex items-center justify-center h-full w-full bg-muted">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Loading Street View...</p>
            </div>
        );
    }

     if (status === 'error') {
        return (
            <div className="flex items-center justify-center h-full w-full bg-muted p-4">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Map Error</AlertTitle>
                    <AlertDescription>
                        {error || 'Could not load the map.'}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return <div ref={mapContainerRef} className="h-full w-full" />;
};

export default Map;
