
'use client';

import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useEffect, useRef, useState, use } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const NIGERIA_CENTER = { lat: 9.0820, lng: 8.6753 };

interface MapProps {
    onLocationSelect?: (location: { lat: number, lng: number }, address: string) => void;
    initialCenter?: { lat: number, lng: number };
    markers?: { lat: number, lng: number }[];
    interactive?: boolean;
}

const render = (status: Status) => {
  if (status === Status.FAILURE) return <p>Error loading map</p>;
  return (
    <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p>Loading Map...</p>
    </div>
  );
};

const MyMapComponent = ({ 
    onLocationSelect, 
    initialCenter = NIGERIA_CENTER, 
    markers = [], 
    interactive = true 
}: MapProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [marker, setMarker] = useState<google.maps.Marker>();
  
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
          center: initialCenter,
          zoom: interactive ? 6 : 15,
          mapTypeControl: false,
          streetViewControl: false,
      }));
    }
  }, [ref, map, initialCenter, interactive]);

  // Handle static markers for dispatcher view
  useEffect(() => {
    if (map && !interactive && markers.length > 0) {
        // Clear existing markers
        // In a real app, you might manage multiple markers
        markers.forEach(pos => {
            new google.maps.Marker({
                position: pos,
                map: map,
            });
        })
        if(markers[0]) {
            map.setCenter(markers[0]);
            map.setZoom(15);
        }
    }
  }, [map, interactive, markers]);

  // Handle interactive marker for patient view
  useEffect(() => {
    if (map && interactive) {
      if (!marker) {
        const newMarker = new google.maps.Marker({
            map,
            draggable: true,
            animation: google.maps.Animation.DROP,
        });
        setMarker(newMarker);
      }
      
      const clickListener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng && marker) {
            marker.setPosition(e.latLng);
            map.panTo(e.latLng);
            
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: e.latLng }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                    if (onLocationSelect) {
                        onLocationSelect({ lat: e.latLng.lat(), lng: e.latLng.lng() }, results[0].formatted_address);
                    }
                }
            });
        }
      });
      
      return () => {
          google.maps.event.removeListener(clickListener);
      }
    }
  }, [map, marker, interactive, onLocationSelect]);
  

  return (
    <motion.div 
        ref={ref} 
        id="map" 
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    />
  );
};


const Map = (props: MapProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <div className="flex items-center justify-center h-full bg-muted text-destructive">API Key is missing.</div>;
  }

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <MyMapComponent {...props} />
    </Wrapper>
  );
};

export default Map;
