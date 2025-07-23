
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { address } = await req.json();
  const apiKey = process.env.DISTANCEMATRIX_AI_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key for geocoding is not configured' }, { status: 500 });
  }

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  const url = `https://api.distancematrix.ai/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' || data.result.length === 0) {
      console.error('Geocoding API Error:', data);
      return NextResponse.json({ error: 'Could not find coordinates for the address.' }, { status: 404 });
    }

    const location = data.result[0].geometry.location;

    return NextResponse.json({
      lat: location.lat,
      lng: location.lng,
    });
  } catch (error) {
    console.error('Failed to fetch from Geocoding API:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
