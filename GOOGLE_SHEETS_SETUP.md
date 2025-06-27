# Secure Google Sheets Setup Guide

## Overview
This guide will help you set up secure access to Google Sheets using a service account instead of public access.

## Security Benefits
- ✅ No more "anyone with link" permissions
- ✅ Proper authentication and access control
- ✅ Server-side only access (credentials never exposed to client)
- ✅ Rate limiting and proper Google API usage
- ✅ Audit trail and access logging

## Setup Steps

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your PROJECT_ID

### 2. Enable Google Sheets API
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### 3. Create a Service Account
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `icompetence-sheets-reader`
   - Description: `Read-only access to product sheets`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 4. Create a Service Account Key
1. Click on the newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Choose "JSON" format
5. Download the JSON file (keep it secure!)

### 5. Configure Environment Variables
Create a `.env.local` file in your project root with these values (extract from the downloaded JSON):

```env
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_PRIVATE_KEY_ID=your-private-key-id-from-json
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_FROM_JSON\n-----END PRIVATE KEY-----"
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your-client-id-from-json
GOOGLE_SHEET_ID=your-actual-sheet-id
```

### 6. Share Your Sheet with the Service Account
1. Open your Google Sheet
2. Click "Share" button
3. Add the service account email (from GOOGLE_CLIENT_EMAIL) as a viewer
4. Make sure the sheet is **NOT** shared with "anyone with the link"

### 7. Update Sheet Permissions
1. Change your sheet sharing settings to "Restricted" 
2. Remove any "anyone with the link" permissions
3. Only the service account should have access

## Testing
After setup, restart your development server and test:
```bash
npm run dev
```

The products should load from your private sheet via the secure API route.

## Troubleshooting

### "Server configuration error"
- Check that all environment variables are set correctly
- Ensure the private key is properly formatted with `\n` for line breaks

### "Failed to fetch products" 
- Verify the service account has access to the sheet
- Check that the GOOGLE_SHEET_ID is correct
- Ensure the Google Sheets API is enabled

### "403 Forbidden"
- Make sure the service account email has been added to the sheet
- Check that the sheet is not restricted to specific domains

## Security Notes
- Never commit the service account JSON file to git
- Keep your `.env.local` file in `.gitignore`
- Use environment variables in production (Vercel, Netlify, etc.)
- Consider rotating service account keys periodically 