 const API_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
    let cachedFeatures = [];

    const statusContainer = document.getElementById("status-container");
    const recordsBody = document.getElementById("records-body");
    const metricCount = document.getElementById("metric-count");
    const metricMaxMag = document.getElementById("metric-max-mag");
    const metricAvgDepth = document.getElementById("metric-avg-depth");

    const filterMag = document.getElementById("filter-mag");
    const searchPlace = document.getElementById("search-place");
    const btnRefresh = document.getElementById("btn-refresh");
    const btnSimulateFail = document.getElementById("btn-simulate-fail");

    function renderStatus(type, message, onRetry = null) {
      if (!message) {
        statusContainer.innerHTML = "";
        return;
      }
      statusContainer.innerHTML = `
        <div class="status-alert status-${type}" role="${type === 'error' ? 'alert' : 'status'}">
          <p>${message}</p>
          ${onRetry ? '<button type="button" class="btn btn-primary" style="margin-top:0.75rem;" id="retry-btn">Retry Request</button>' : ''}
        </div>
      `;
      if (onRetry) {
        document.getElementById("retry-btn").addEventListener("click", onRetry);
      }
    }

    async function fetchData(forceError = false) {
      renderStatus("loading", "Connecting to USGS seismic feed...");
      recordsBody.innerHTML = "";

      // Abort controller to handle slow / hanging responses
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      try {
        const url = forceError ? "https://httpstat.us/504?sleep=3000" : API_URL;
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`USGS remote server returned status code ${res.status}.`);
        }

        const data = await res.json();
        cachedFeatures = data.features || [];
        renderStatus(null, "");
        applyFilters();
      } catch (err) {
        clearTimeout(timeoutId);
        const errMsg = err.name === "AbortError" 
          ? "The request to the data source timed out (exceeded 7s limit)." 
          : (err.message || "Failed to fetch remote seismic data.");
        renderStatus("error", `${errMsg} Check your connection or retry.`, () => fetchData(false));
      }
    }

    function applyFilters() {
      const minMag = filterMag.value === "all" ? -Infinity : parseFloat(filterMag.value);
      const query = searchPlace.value.trim().toLowerCase();

      const filtered = cachedFeatures.filter((f) => {
        const mag = f.properties.mag ?? 0;
        const place = (f.properties.place || "").toLowerCase();
        return mag >= minMag && place.includes(query);
      });

      renderTable(filtered);
      updateMetrics(filtered);
    }

    function updateMetrics(list) {
      metricCount.textContent = list.length;
      if (list.length === 0) {
        metricMaxMag.textContent = "0.0";
        metricAvgDepth.textContent = "0 km";
        return;
      }

      const mags = list.map((f) => f.properties.mag ?? 0);
      const depths = list.map((f) => f.geometry.coordinates[2] ?? 0);

      const maxM = Math.max(...mags);
      const avgD = depths.reduce((a, b) => a + b, 0) / depths.length;

      metricMaxMag.textContent = maxM.toFixed(1);
      metricAvgDepth.textContent = `${avgD.toFixed(1)} km`;
    }

    function getBadgeClass(mag) {
      if (mag >= 4.5) return "badge-strong";
      if (mag >= 2.5) return "badge-mod";
      return "badge-minor";
    }

    function renderTable(list) {
      recordsBody.innerHTML = "";
      if (list.length === 0) {
        recordsBody.innerHTML = `
          <tr>
            <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">
              No seismic events match your filter criteria.
            </td>
          </tr>
        `;
        return;
      }

      list.slice(0, 50).forEach((f) => {
        const mag = (f.properties.mag ?? 0).toFixed(1);
        const place = f.properties.place || "Unknown Location";
        const depth = `${(f.geometry.coordinates[2] ?? 0).toFixed(1)} km`;
        const time = new Date(f.properties.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><span class="badge ${getBadgeClass(f.properties.mag ?? 0)}">${mag}</span></td>
          <td>${place}</td>
          <td>${depth}</td>
          <td>${time}</td>
        `;
        recordsBody.appendChild(tr);
      });
    }

    filterMag.addEventListener("change", applyFilters);
    searchPlace.addEventListener("input", applyFilters);
    btnRefresh.addEventListener("click", () => fetchData(false));
    btnSimulateFail.addEventListener("click", () => fetchData(true));

    fetchData(false);