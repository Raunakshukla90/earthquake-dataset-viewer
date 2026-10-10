Global Seismic Event Explorer
An accessible, responsive single-page web application that fetches, aggregates, and visualizes real-time global seismic activity using the United States Geological Survey (USGS) Earthquake Hazards API.

1. Prerequisites
Before running this project, ensure you have the following installed on your machine:

Web Browser: Any modern browser supporting ECMAScript 2020+ (Fetch API, AbortController):
Google Chrome version 90.0 or higher
Mozilla Firefox version 88.0 or higher
Apple Safari version 14.1 or higher
Microsoft Edge version 90.0 or higher
Local HTTP Server Runtime (Optional but Recommended):
Node.js: v18.0.0 or higher (LTS recommended, e.g., v20.x)
Package Manager: npm v9.0.0+ (comes bundled with Node.js) or npx
Alternative: Python 3.8.0 or higher (for http.server)
Git: version 2.30.0 or higher
2. Environment Variables
This application connects directly to the public USGS GeoJSON endpoint which does not enforce API key authentication or CORS restrictions.

Variable Name	Required?	Default / Fallback Value	Description & Source
API_URL	No	https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson	The public endpoint provided directly by USGS Earthquake Hazards Program. Hardcoded as default constant in index.html.
REQUEST_TIMEOUT_MS	No	7000 (7 seconds)	Duration before an active AbortController terminates a lagging request.
Note: No .env file or external secrets management is necessary to run this project.

3. How to Clone, Install, and Run Locally
Follow these sequential steps to run the application locally from scratch:

Step 1: Clone the Repository
Open your terminal / command prompt and run:

<!-- Verified browser support: Chrome, Edge, Firefox, Safari -->
git clone  https://github.com/Raunakshukla90/earthquake-dataset-viewer.git