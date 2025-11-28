
  # icompetence.de

  This is a code bundle for icompetence.de. The original project is available at https://www.figma.com/design/9VdrylJgwtVflqPNVILdGO/icompetence.de.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Building for production

Run `npm run build` to create a production build.

The build output will be in the `build` folder. This folder contains all the static files needed to deploy the website.

## Deployment

To deploy to a web server:

1. Run `npm run build` to create the production build
2. Upload the entire `build` folder to your web server
3. Configure your web server to serve the `index.html` file for all routes (for client-side routing)
4. For static hosting services (Netlify, Vercel, etc.), point them to the `build` folder
  