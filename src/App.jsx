import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minRevenue: "",
    maxRevenue: "",
    minNetIncome: "",
    maxNetIncome: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "ascending" });

  // Backend URL
  const API_BASE_URL = "https://rahul-financial-data-app.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from backend...");

        // Dynamically build the query string to exclude empty values
        const queryParams = new URLSearchParams();

        if (filters.startDate) queryParams.append("start_date", filters.startDate);
        if (filters.endDate) queryParams.append("end_date", filters.endDate);
        if (filters.minRevenue) queryParams.append("min_revenue", filters.minRevenue);
        if (filters.maxRevenue) queryParams.append("max_revenue", filters.maxRevenue);
        if (filters.minNetIncome) queryParams.append("min_net_income", filters.minNetIncome);
        if (filters.maxNetIncome) queryParams.append("max_net_income", filters.maxNetIncome);

        const response = await fetch(`${API_BASE_URL}/data?${queryParams.toString()}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Data received from backend:", result);
        setData(result.data || []); // Ensure data is always an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from backend:", error);
        setLoading(false); // Stop the loading spinner in case of errors
      }
    };

    fetchData();
  }, [filters]);

  // Apply sorting to the filtered data
  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="text-center text-lg font-medium min-h-screen w-screen bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white flex flex-col items-center">
      <div className="w-full max-w-7xl px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Financial Data</h1>

        {/* Filters Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <input
            type="date"
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
            placeholder="Start Date"
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />
          <input
            type="date"
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
            placeholder="End Date"
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />
          <input
            type="number"
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
            placeholder="Min Revenue"
            onChange={(e) => setFilters({ ...filters, minRevenue: e.target.value })}
          />
          <input
            type="number"
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
            placeholder="Max Revenue"
            onChange={(e) => setFilters({ ...filters, maxRevenue: e.target.value })}
          />
          <input
            type="number"
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
            placeholder="Min Net Income"
            onChange={(e) => setFilters({ ...filters, minNetIncome: e.target.value })}
          />
          <input
            type="number"
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
            placeholder="Max Net Income"
            onChange={(e) => setFilters({ ...filters, maxNetIncome: e.target.value })}
          />
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-gray-800 text-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th
                  className="p-3 cursor-pointer"
                  onClick={() =>
                    setSortConfig({
                      key: "date",
                      direction: sortConfig.direction === "ascending" ? "descending" : "ascending",
                    })
                  }
                >
                  Date {sortConfig.key === "date" ? (sortConfig.direction === "ascending" ? "▲" : "▼") : ""}
                </th>
                <th
                  className="p-3 cursor-pointer"
                  onClick={() =>
                    setSortConfig({
                      key: "revenue",
                      direction: sortConfig.direction === "ascending" ? "descending" : "ascending",
                    })
                  }
                >
                  Revenue {sortConfig.key === "revenue" ? (sortConfig.direction === "ascending" ? "▲" : "▼") : ""}
                </th>
                <th
                  className="p-3 cursor-pointer"
                  onClick={() =>
                    setSortConfig({
                      key: "netIncome",
                      direction: sortConfig.direction === "ascending" ? "descending" : "ascending",
                    })
                  }
                >
                  Net Income {sortConfig.key === "netIncome" ? (sortConfig.direction === "ascending" ? "▲" : "▼") : ""}
                </th>
                <th className="p-3">Gross Profit</th>
                <th className="p-3">EPS</th>
                <th className="p-3">Operating Income</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item) => (
                <tr key={item.date} className="border-b border-gray-700">
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">{item.revenue}</td>
                  <td className="p-3">{item.netIncome}</td>
                  <td className="p-3">{item.grossProfit}</td>
                  <td className="p-3">{item.eps}</td>
                  <td className="p-3">{item.operatingIncome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
