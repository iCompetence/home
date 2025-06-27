import { NextRequest, NextResponse } from 'next/server';
import { fetchProductsFromSheetSecure } from '../../../lib/googleSheets';

export async function GET(request: NextRequest) {
  try {
    // Check if all required environment variables are present
    const requiredEnvVars = [
      'GOOGLE_PROJECT_ID',
      'GOOGLE_PRIVATE_KEY_ID', 
      'GOOGLE_PRIVATE_KEY',
      'GOOGLE_CLIENT_EMAIL',
      'GOOGLE_CLIENT_ID',
      'GOOGLE_SHEET_ID'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('Missing environment variables:', missingVars);
      return NextResponse.json(
        { error: 'Server configuration error' }, 
        { status: 500 }
      );
    }

    // Fetch products using secure server-side method
    const products = await fetchProductsFromSheetSecure();
    
    // Set cache headers for performance (cache for 5 minutes)
    const response = NextResponse.json(products);
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate');
    
    return response;
  } catch (error) {
    console.error('Error in products API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' }, 
      { status: 500 }
    );
  }
} 