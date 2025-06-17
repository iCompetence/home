import axios from 'axios';

export interface ProductData {
  title: string;
  subtitle: string;
  description: string;
  benefits: string;
  link?: string;
  image: string;
  features: string[];
}

const SHEET_ID = '1sYll9NvCW_zVibsHV4LmPPn8nK4i9aLWqj3Xg3AjUvk';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;

// Default placeholder image
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80";

// Google Drive folder ID for product images/videos
const DRIVE_FOLDER_ID = '1HE6YC6X3wSjX05hNeOPIXlvaJj1CwLbf';

// Function to generate Google Drive direct link for a file
function getGoogleDriveImageUrl(productTitle: string): string {
  // Try common file extensions
  const extensions = ['.mp4', '.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  // For now, we'll use a direct link format for Google Drive files
  // Note: This requires the files to be publicly accessible
  // Format: https://drive.google.com/uc?export=view&id=FILE_ID
  
  // Since we can't easily get individual file IDs without API access,
  // we'll create a mapping based on known files or use a fallback
  return getDirectGoogleDriveUrl(productTitle);
}

function getDirectGoogleDriveUrl(productTitle: string): string {
  // File ID mapping for Google Drive files
  // To get file IDs: Right-click file → Share → Copy link → Extract ID from URL
  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  
  const fileMapping: { [key: string]: string } = {
    // Add your actual file IDs here
    // Example: "ICU User Journey Explorer": "1ABC123DEF456GHI789JKL",
    
    // Placeholder - you'll need to replace with actual file IDs
    "ICU User Journey Explorer": "", // Add file ID here
    "ICS Intelligentic Product Searcher": "", // Add file ID here
    "User Consent Management": "", // Add file ID here
    "Customer Data Tracking": "", // Add file ID here
    "Customer Data Hub": "", // Add file ID here
    "Privacy-led AI Consulting": "", // Add file ID here
    "Privacy-led AI Hosting": "", // Add file ID here
  };
  
  const fileId = fileMapping[productTitle];
  
  if (fileId) {
    // For videos (.mp4), use embed format
    if (productTitle === "ICU User Journey Explorer") {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    // For images, use direct view format
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  return DEFAULT_IMAGE;
}

export async function fetchProductsFromSheet(): Promise<ProductData[]> {
  try {
    const response = await axios.get(CSV_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    const csvData = response.data;
    const lines = csvData.split('\n');
    
    // Skip header row
    const dataLines: string[] = lines.slice(1).filter((line: string) => line.trim() !== '');
    
    const products: ProductData[] = [];
    
    for (const line of dataLines) {
      // Parse CSV line (handling commas within quotes)
      console.log('Raw CSV line:', line);
      const columns = parseCSVLine(line);
      console.log('Parsed columns:', columns);
      
      // Ensure we have at least 5 columns, pad with empty strings if needed
      while (columns.length < 5) {
        columns.push('');
      }
      
      const title = columns[0]?.trim() || '';
      const description = columns[1]?.trim() || '';
      const benefits = columns[2]?.trim() || '';
      const link = columns[3]?.trim() || '';
      const subtitle = columns[4]?.trim() || '';
      
      // Only add products that have at least title and description
      if (title && description) {
        console.log('Processing product:', { 
          title, 
          subtitle, 
          description: description.length > 50 ? description.substring(0, 50) + '...' : description, 
          benefits: benefits.length > 30 ? benefits.substring(0, 30) + '...' : benefits, 
          link 
        });
        
        products.push({
          title,
          subtitle: subtitle || 'iCompetence Solution',
          description,
          benefits: benefits || 'Verbesserte Effizienz und Wachstum für Ihr Unternehmen',
          link: link || '',
          image: getGoogleDriveImageUrl(title),
          features: [] // We'll keep this empty for now as it's not in the sheet
        });
      } else {
        console.log('Skipping row - missing title or description:', { 
          title, 
          description: description ? (description.length > 30 ? description.substring(0, 30) + '...' : description) : 'empty'
        });
      }
    }
    
    return products;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    // Return fallback data if sheet is unavailable
    return getFallbackData();
  }
}

// Simple and reliable CSV parser using regex
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  
  // Use regex to split on commas, but respect quoted fields
  // This regex handles: "quoted,field",normal,,"empty",,
  const regex = /("(?:[^"]|"")*"|[^,]*)/g;
  let match;
  
  while ((match = regex.exec(line)) !== null) {
    let field = match[1];
    
    // Remove surrounding quotes if present
    if (field.startsWith('"') && field.endsWith('"')) {
      field = field.slice(1, -1);
      // Handle escaped quotes within the field
      field = field.replace(/""/g, '"');
    }
    
    result.push(field.trim());
  }
  
  // Handle trailing empty fields (if line ends with commas)
  const trailingCommas = line.match(/,+$/);
  if (trailingCommas) {
    for (let i = 0; i < trailingCommas[0].length; i++) {
      result.push('');
    }
  }
  
  return result;
}

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