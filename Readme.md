# 🌎 Global Seismic Event Explorer

A responsive, single-page web application for exploring global earthquake activity using real-time data from the **United States Geological Survey (USGS) Earthquake Hazards Program**.

Built with HTML, CSS, and vanilla JavaScript, this project fetches earthquake data from a public GeoJSON API, calculates summary statistics, and provides interactive filtering and tabular data exploration.

## ✨ Features

- 🌍 **Live Earthquake Data** — Fetches earthquake records from the official USGS feed covering the past 24 hours.
- 📊 **Dataset Summary Metrics** — Displays the number of matching events, strongest detected magnitude, and average earthquake depth.
- 🔎 **Magnitude Filtering** — Filter earthquakes by minimum magnitude, including 2.5+ and 4.5+ thresholds.
- 📍 **Location Search** — Search earthquake records by place or region, such as California or Japan.
- 📋 **Interactive Data Table** — Displays earthquake magnitude, location, depth, and occurrence time.
- 🎨 **Magnitude Indicators** — Uses color-coded badges to distinguish minor, moderate, and stronger earthquakes.
- 🔄 **Manual Refresh** — Reload the latest earthquake feed with a single click.
- ⏱️ **Request Timeout** — Uses `AbortController` to limit requests to 7 seconds.
- ⚠️ **Error Handling** — Displays status messages when requests fail or time out, with an option to retry.
- 📱 **Responsive Layout** — Uses CSS Grid and Flexbox to adapt the interface to different screen sizes.
- ♿ **Accessibility Considerations** — Includes semantic sections, labeled controls, and an accessible status region.

## 🛰️ Data Source

This application uses the public earthquake feed provided by the USGS Earthquake Hazards Program.

**API endpoint:**

https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson

The feed provides GeoJSON records for earthquakes reported during the previous day.

Each earthquake record may include:

- **Magnitude:** The reported earthquake magnitude.
- **Location:** A description of the earthquake's geographic location.
- **Time:** The event timestamp.
- **Coordinates:** Longitude, latitude, and depth in kilometers.
- **Event URL:** A link to the corresponding USGS event page.
- **Additional metadata:** Information about the reported seismic event.

For more information, visit:

- [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/earthquakes/)
- [USGS GeoJSON Feeds Documentation](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure and semantic markup |
| CSS3 | Responsive layout, styling, and visual design |
| JavaScript (ES2020+) | Data fetching, filtering, and calculations |
| Fetch API | Retrieves earthquake data from USGS |
| AbortController | Cancels requests that exceed the timeout |
| GeoJSON | Represents earthquake events and geographic coordinates |
| USGS Earthquake API | Provides earthquake data |

No frontend framework, database, API key, or package installation is required for the current implementation.

## 📋 Prerequisites

You need:

- A modern web browser, such as Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari.
- Git, if you want to clone the repository.
- Python 3.8+ or another local HTTP server, recommended for local development.

Node.js and npm are not required for the current standalone HTML application.

## 🚀 Installation and Setup

### 1. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/Raunakshukla90/earthquake-dataset-viewer.git
```

### 2. Navigate to the Project Directory

```bash
cd earthquake-dataset-viewer
```

### 3. Start a Local HTTP Server

If Python is installed, run:

```bash
python -m http.server 8000
```

On some systems, use:

```bash
python3 -m http.server 8000
```

### 4. Open the Application

Open your browser and visit:

http://localhost:8000

The application will load `index.html` and request the latest earthquake data from the USGS feed.

You can also open `index.html` directly in a browser, although using a local HTTP server is recommended.

## 🎮 How to Use

1. Open the application in your browser.
2. Wait for the application to retrieve earthquake records from USGS.
3. Review the summary metrics displayed at the top.
4. Select a minimum magnitude to narrow the results.
5. Enter a place or region in the search field to find matching earthquakes.
6. Review the resulting records in the data table.
7. Click **Reload Feed** to fetch the latest available dataset.
8. Click **Simulate Timeout / Fail** to test the application's request-error handling.

The table displays up to 50 matching records, while the summary metrics are calculated from all records matching the active filters.

## ⚙️ Configuration

The application currently defines its API endpoint and request timeout directly in JavaScript.

| Setting | Default Value | Description |
|---|---|---|
| `API_URL` | `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson` | USGS earthquake data endpoint |
| Request timeout | `7000` milliseconds | Maximum configured duration for a request |

The endpoint is configured using the following constant:

```javascript
const API_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
```

The request timeout is currently defined in the `fetchData()` function:

```javascript
const timeoutId = setTimeout(
  () => controller.abort(),
  7000
);
```

**Note:** `API_URL` and the timeout are hardcoded in the current implementation. Environment variables such as `API_URL` and `REQUEST_TIMEOUT_MS` are not automatically read by browser JavaScript.

## 📊 Summary Metrics

The application calculates three metrics from the currently filtered earthquake records.

### Events Evaluated

The total number of earthquake records matching the selected magnitude and location filters.

### Strongest Detected

The highest reported magnitude among the matching records.

### Average Depth

The arithmetic mean of earthquake depths in kilometers among the matching records.

These values describe the available dataset and are not forecasts or estimates of future seismic activity.

## 🛡️ Error Handling

The application includes basic request-error handling:

- Displays a loading message while fetching data.
- Uses `AbortController` with a 7-second timeout.
- Checks the HTTP response status.
- Displays an error message if a request fails.
- Provides a retry button after an error.

The failure-simulation control requests an external HTTP endpoint to trigger an unsuccessful response. Its behavior depends on the availability and accessibility of that external service.

## ♿ Accessibility

Accessibility considerations in the current implementation include:

- Semantic HTML sections and headings.
- Explicit labels for the magnitude and location filters.
- An `aria-live="polite"` status container.
- Native buttons, inputs, and select controls.
- A horizontally scrollable table for narrower screens.

Further accessibility testing is recommended, including keyboard-only navigation, screen-reader testing, visible focus indicators, and color-contrast verification.

## 📁 Project Structure

The application can be maintained as a single HTML file:

```text
earthquake-dataset-viewer/
├── index.html
├── README.md
└── LICENSE
```

- `index.html` — Contains the HTML markup, CSS styles, and JavaScript logic.
- `README.md` — Project overview and documentation.
- `LICENSE` — Optional file specifying the project's license.

## 🧪 Testing

Recommended manual tests:

- Verify that earthquake data loads successfully.
- Change the minimum magnitude and confirm that the records update.
- Search for a location such as California or Japan.
- Confirm that the summary metrics update when filters change.
- Click **Reload Feed** and check the loading and success states.
- Test the failure-simulation button.
- Verify that the application remains usable on mobile screens.
- Test interactive controls using a keyboard.
- Confirm that the displayed event times and depths correspond to the source data.

## ⚠️ Limitations

- The application displays data supplied by the USGS feed and depends on its availability.
- The feed covers the previous day rather than the entire historical earthquake record.
- Only the first 50 matching records are displayed in the table.
- The interface does not currently include a geographic map, historical trend charts, or automatic periodic refreshing.
- The magnitude and depth metrics describe the filtered dataset, not all earthquakes worldwide.
- Earthquake reporting and detection depend on seismic monitoring coverage, event processing, and data availability.
- The application does not predict earthquakes or assess structural damage.

## 🔮 Future Improvements

Potential enhancements include:

- Interactive global earthquake map.
- Historical seismic activity charts.
- Additional date-range and depth filters.
- Sortable table columns and pagination.
- Automatic periodic data refresh.
- Exporting filtered records to CSV or JSON.
- Improved keyboard navigation and screen-reader support.
- Unit and integration tests.

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit your changes with a descriptive message.
5. Open a pull request explaining your improvements.

## 📄 License

No license has been specified yet. If you intend to distribute this project as open-source software, add an appropriate `LICENSE` file and ensure that its terms match your intentions.

## 🙏 Acknowledgements

Special thanks to the **United States Geological Survey (USGS)** for providing publicly accessible earthquake data.

- [USGS Official Website](https://www.usgs.gov/)
- [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/earthquakes/)

---

**Global Seismic Event Explorer**  
*Explore recent earthquake activity around the world through publicly available seismic data.*
