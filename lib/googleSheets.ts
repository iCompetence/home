export interface ProductData {
  title: string;
  subtitle: string;
  description: string;
  benefits: string;
  link?: string;
  image: string;
  features: string[];
}

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

// Secure server-side function to fetch data from Google Sheets
export async function fetchProductsFromSheet(): Promise<ProductData[]> {
  try {
    // This will now be called from an API route for security
    const response = await fetch('/api/products', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    // Return fallback data if API is unavailable
    return getFallbackData();
  }
}

// This function is now moved to the API route for server-side only usage

// Fallback data in case the sheet is unavailable
function getFallbackData(): ProductData[] {
  return [
    {
      title: "ICU User Journey Explorer",
      subtitle: "Kunde 1, Kunde 2",
      description: "Unser ICU User Journey Explorer ist das erste Tool, mit dem Customer Journeys nicht nur abgebildet, sondern intelligent interpretiert werden – datenquellenunabhängig, auf Knopfdruck und per Chat steuerbar.",
      benefits: "Keine mühsame Datensuche mehr – stattdessen führt euch ein einziger, gezielter Dialog direkt zu den Insights, die wirklich zählen.",
      link: "https://privacy-led-ai.de/icu-user-journey-explorer",
      image: DEFAULT_IMAGE,
      features: []
    },
    {
      title: "ICS Intelligentic Product Searcher",
      subtitle: "Kunde 1, Kunde 2",
      description: "Die ICS Intelligentic Product Searcher verwandelt jede Produktsuche in ein Gespräch: Statt Klicks durch Filter ermöglicht ein smarter Agent die Suche per natürlicher Sprache – präzise, relevant und blitzschnell.",
      benefits: "Keine verlorenen Käufe mehr durch schlechte Sucherlebnisse – euer Shop versteht endlich, was Ihre Kund:innen wirklich suchen.",
      link: "",
      image: DEFAULT_IMAGE,
      features: []
    }
  ];
} 