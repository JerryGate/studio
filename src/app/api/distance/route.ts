
import { NextRequest, NextResponse } from 'next/server';

// This would typically be a database call to find the nearest partner pharmacy.
// For this example, we'll use a fixed location in Lagos.
const NEAREST_PHARMACY_LOCATION = { lat: 6.5244, lon: 3.3792 }; // Mock pharmacy in Lagos
const DELIVERY_COST_PER_METER = 0.1; // NGN 100 per KM

export async function POST(req: NextRequest) {
  const { destination } = await req.json(); // { lat, lon }
  const apiKey = process.env.DISTANCEMATRIX_AI_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key for distance matrix is not configured' }, { status: 500 });
  }

  if (!destination || !destination.lat || !destination.lon) {
    return NextResponse.json({ error: 'Invalid destination coordinates provided' }, { status: 400 });
  }

  const originString = `${NEAREST_PHARMACY_LOCATION.lat},${NEAREST_PHARMACY_LOCATION.lon}`;
  const destinationString = `${destination.lat},${destination.lon}`;

  const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${originString}&destinations=${destinationString}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' || !data.rows[0].elements[0].distance) {
      console.error('Distance Matrix API Error:', data);
      return NextResponse.json({ error: 'Could not calculate distance.' }, { status: 500 });
    }

    const distanceInMeters = data.rows[0].elements[0].distance.value;
    const deliveryCost = Math.round(distanceInMeters * DELIVERY_COST_PER_METER);

    return NextResponse.json({
      distance: data.rows[0].elements[0].distance.text,
      duration: data.rows[0].elements[0].duration.text,
      deliveryCost,
    });
  } catch (error) {
    console.error('Failed to fetch from Distance Matrix API:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
