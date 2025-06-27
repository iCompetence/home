import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { ProductData } from '../../../lib/googleSheets';

// Default placeholder image
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80";

// Function to generate Google Drive direct link for a file
function getGoogleDriveImageUrl(productTitle: string, fileId: string): string {
  if (fileId) {
    return getDirectGoogleDriveUrl(productTitle, fileId);
  }
  return DEFAULT_IMAGE;
}

function getDirectGoogleDriveUrl(productTitle: string, fileId: string): string {
  if (fileId) {
    console.log(`Generating URL for ${productTitle} with file ID: ${fileId}`);
    
    // Check if this is likely a video based on product title
    if (productTitle === "ICU User Journey Explorer" || fileId.toLowerCase().includes('mp4')) {
      const videoUrl = `https://drive.google.com/file/d/${fileId}/preview`;
      console.log(`Generated video URL: ${videoUrl}`);
      return videoUrl;
    }
    // For images, use direct view format with proper sharing
    const imageUrl = `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
    console.log(`Generated image URL: ${imageUrl}`);
    return imageUrl;
  }
  
  console.log(`No file ID provided for ${productTitle}, using default image`);
  return DEFAULT_IMAGE;
}

// Server-side function for Google Sheets API
async function fetchProductsFromSheetSecure(): Promise<ProductData[]> {
  try {
    // Initialize Google Sheets API with service account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs'
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Fetch data from the private sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A2:F', // Adjust range as needed
    });

    const rows = response.data.values || [];
    console.log('Data rows found:', rows.length);
    
    const products: ProductData[] = [];
    
    for (const row of rows) {
      // Ensure we have at least 6 columns, pad with empty strings if needed
      while (row.length < 6) {
        row.push('');
      }
      
      const title = row[0]?.trim() || '';
      const description = row[1]?.trim() || '';
      const benefits = row[2]?.trim() || '';
      const link = row[3]?.trim() || '';
      const subtitle = row[4]?.trim() || '';
      const fileId = row[5]?.trim() || '';
      
      // Only add products that have at least title and description
      if (title && description) {
        console.log('Adding product:', { title, subtitle });
        
        products.push({
          title,
          subtitle: subtitle || 'iCompetence Solution',
          description,
          benefits: benefits || 'Verbesserte Effizienz und Wachstum für Ihr Unternehmen',
          link: link || '',
          image: getGoogleDriveImageUrl(title, fileId),
          features: []
        });
      }
    }
    
    console.log('Final products array:', products.length);
    return products;
  } catch (error) {
    console.error('Error fetching data from Google Sheets API:', error);
    // Return fallback data if API fails
    return [
      {
        title: "ICU User Journey Explorer",
        subtitle: "Kunde 1, Kunde 2",
        description: "Unser ICU User Journey Explorer ist das erste Tool, mit dem Customer Journeys nicht nur abgebildet, sondern intelligent interpretiert werden – datenquellenunabhängig, auf Knopfdruck und per Chat steuerbar.",
        benefits: "Keine mühsame Datensuche mehr – stattdessen führt euch ein einziger, gezielter Dialog direkt zu den Insights, die wirklich zählen.",
        link: "https://privacy-led-ai.de/icu-user-journey-explorer",
        image: DEFAULT_IMAGE,
        features: []
      }
    ];
  }
}

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