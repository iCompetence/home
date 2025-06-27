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
function getGoogleDriveImageUrl(productTitle: string, fileId: string): string {
  // If we have a file ID from the sheet, use it directly
  if (fileId) {
    return getDirectGoogleDriveUrl(productTitle, fileId);
  }
  
  // Fallback to default image if no file ID provided
  return DEFAULT_IMAGE;
}

function getDirectGoogleDriveUrl(productTitle: string, fileId: string): string {
  // Generate Google Drive URL based on file type
  // For videos (.mp4), use embed format for better display
  // For images, use direct view format
  
  if (fileId) {
    console.log(`Generating URL for ${productTitle} with file ID: ${fileId}`);
    
    // Check if this is likely a video based on product title
    // You can expand this logic or add a separate column for media type
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

export async function fetchProductsFromSheet(): Promise<ProductData[]> {
  try {
    const response = await axios.get(CSV_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    const csvData = response.data;
    console.log('Full CSV data received:', csvData);
    
    // More robust line splitting that handles various line endings
    const lines = csvData.split(/\r?\n/);
    
    // Skip header row and filter out empty lines
    let dataLines: string[] = lines.slice(1).filter((line: string) => line.trim() !== '');
    
    // Reconstruct lines that may have been split due to line breaks within quoted fields
    const reconstructedLines: string[] = [];
    let currentLine = '';
    let inQuotes = false;
    
    for (const line of dataLines) {
      if (currentLine) {
        currentLine += '\n' + line;
      } else {
        currentLine = line;
      }
      
      // Count quotes to determine if we're inside a quoted field
      const quoteCount = (currentLine.match(/"/g) || []).length;
      inQuotes = quoteCount % 2 === 1;
      
      if (!inQuotes) {
        reconstructedLines.push(currentLine);
        currentLine = '';
      }
    }
    
    // If there's a remaining line, add it
    if (currentLine) {
      reconstructedLines.push(currentLine);
    }
    
    console.log('Data lines found:', reconstructedLines.length);
    
    const products: ProductData[] = [];
    
    for (let i = 0; i < reconstructedLines.length; i++) {
      const line = reconstructedLines[i];
      console.log(`Processing line ${i + 1}:`, line);
      
      // Skip lines that are clearly incomplete or malformed
      if (!line.includes('"') && line.split(',').length < 3) {
        console.log('Skipping malformed line:', line);
        continue;
      }
      
      // Parse CSV line (handling commas within quotes)
      const columns = parseCSVLine(line);
      console.log('Parsed columns:', columns);
      
      // Ensure we have at least 6 columns, pad with empty strings if needed
      while (columns.length < 6) {
        columns.push('');
      }
      
      const title = columns[0]?.trim() || '';
      const description = columns[1]?.trim() || '';
      const benefits = columns[2]?.trim() || '';
      const link = columns[3]?.trim() || '';
      const subtitle = columns[4]?.trim() || '';
      const fileId = columns[5]?.trim() || '';
      
      // Only add products that have at least title and description
      if (title && description && !title.startsWith(',,')) {
        console.log('Adding product:', { 
          title, 
          subtitle, 
          description: description.length > 50 ? description.substring(0, 50) + '...' : description, 
          benefits: benefits.length > 30 ? benefits.substring(0, 30) + '...' : benefits, 
          link,
          fileId 
        });
        
        products.push({
          title,
          subtitle: subtitle || 'iCompetence Solution',
          description,
          benefits: benefits || 'Verbesserte Effizienz und Wachstum für Ihr Unternehmen',
          link: link || '',
          image: getGoogleDriveImageUrl(title, fileId),
          features: [] // We'll keep this empty for now as it's not in the sheet
        });
      } else {
        console.log('Skipping row - missing title or description or malformed:', { title, description });
      }
    }
    
    console.log('Final products array:', products);
    return products;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    // Return fallback data if sheet is unavailable
    return getFallbackData();
  }
}

// Robust CSV parser that handles quoted fields and empty cells
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Handle escaped quotes
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last field
  result.push(current.trim());
  
  // If we ended in quotes state, the line might be incomplete
  if (inQuotes) {
    console.warn('CSV line appears incomplete (unclosed quotes):', line);
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