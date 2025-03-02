import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Bell,
  Search,
  AlertTriangle,
  FileText,
  Clock,
  Shield,
  Eye,
  Zap,
  LogOut,
} from "lucide-react";
import { Navigate } from "react-router-dom";

// Reduced mock data
const mockDetectionLogs = [
  {
    id: 1,
    timestamp: "2025-03-02T09:23:15",
    filename: "customer_data_export.csv",
    riskScore: 87,
    piiTypes: ["SSN", "Credit Card"],
    status: "High Risk",
  },
  {
    id: 4,
    timestamp: "2025-03-01T14:33:27",
    filename: "patient_records.pdf",
    riskScore: 95,
    piiTypes: ["SSN", "Medical ID", "Name"],
    status: "Critical Risk",
  },
  {
    id: 5,
    timestamp: "2025-03-01T11:05:42",
    filename: "sales_leads.xlsx",
    riskScore: 35,
    piiTypes: ["Name", "Email"],
    status: "Low Risk",
  },
  {
    id: 8,
    timestamp: "2025-02-28T09:11:03",
    filename: "user_database_backup.sql",
    riskScore: 92,
    piiTypes: ["SSN", "Password"],
    status: "Critical Risk",
  },
];

const riskByTypeData = [
  { name: "SSN", count: 3, value: 90 },
  { name: "Credit Card", count: 2, value: 85 },
  { name: "Password", count: 1, value: 75 },
  { name: "Name", count: 3, value: 40 },
  { name: "Email", count: 2, value: 30 },
];

const trendData = [
  { date: "02/27", files: 15, detections: 61, risk: 67 },
  { date: "02/28", files: 10, detections: 38, risk: 55 },
  { date: "03/01", files: 18, detections: 74, risk: 72 },
  { date: "03/02", files: 7, detections: 28, risk: 48 },
];

const statusData = [
  { name: "Critical Risk", value: 2, color: "#EF4444" },
  { name: "High Risk", value: 1, color: "#F97316" },
  { name: "Medium Risk", value: 0, color: "#FACC15" },
  { name: "Low Risk", value: 1, color: "#22C55E" },
];

const recentActivity = [
  {
    id: 1,
    user: "David Kim",
    action: "Redacted SSNs from patient_records.pdf",
    time: "35 minutes ago",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    action: "Approved export of marketing_list.csv",
    time: "2 hours ago",
  },
];

// Animation component for button hover effect
const AnimatedButton = ({ children, className, ...props }) => {
  return (
    <button
      className={`transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced utility components
const StatCard = ({ title, value, icon, trend, color }) => (
  <div className="bg-white rounded-lg shadow-lg p-5 transition-all duration-300 hover:shadow-xl hover:translate-y-1">
    <div className="flex justify-between">
      <div>
        <p className="text-gray-600 font-medium">{title}</p>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          {value}
        </h3>
      </div>
      <div
        className={`h-14 w-14 bg-${color}-100 rounded-lg flex items-center justify-center shadow-md`}
      >
        {React.cloneElement(icon, { className: `h-7 w-7 text-${color}-600` })}
      </div>
    </div>
    <p className={`text-${color}-600 text-sm mt-3 font-medium`}>{trend}</p>
  </div>
);

const Card = ({ title, children, footer, titleExtra }) => (
  <div className="bg-white rounded-lg shadow-lg border border-gray-50 transition-all duration-300 hover:shadow-xl">
    {title && (
      <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-bold text-lg text-gray-800">{title}</h2>
        {titleExtra}
      </div>
    )}
    <div className="p-5">{children}</div>
    {footer && (
      <div className="px-5 py-3 border-t border-gray-100">{footer}</div>
    )}
  </div>
);

const PiiDashboard = () => {
  const [logs, setLogs] = useState(mockDetectionLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [realtimeAlerts, setRealtimeAlerts] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Logout handler
  const handleLogout = () => {
    // In a real app, this would handle authentication cleanup
    setIsLoggedIn(false);
    // For demo purposes, show an alert
    alert("You have been logged out successfully.");
    // In a real app, this would redirect to login page

  };

  // Simulate real-time alerts (simplified)
  useEffect(() => {
    const alertInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert = {
          id: Date.now(),
          message: `High-risk PII detected in ${
            ["new_employee_data.xlsx", "customer_records.csv"][
              Math.floor(Math.random() * 2)
            ]
          }`,
          time: new Date().toLocaleTimeString(),
          seen: false,
        };
        setRealtimeAlerts((prev) => [newAlert, ...prev].slice(0, 3));
      }
    }, 10000);
    return () => clearInterval(alertInterval);
  }, []);

  // Handle search and filtering (simplified)
  useEffect(() => {
    let filteredLogs = mockDetectionLogs;
    if (searchQuery) {
      filteredLogs = filteredLogs.filter(
        (log) =>
          log.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.piiTypes.some((type) =>
            type.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }
    if (riskFilter !== "All") {
      filteredLogs = filteredLogs.filter((log) => log.status === riskFilter);
    }
    setLogs(filteredLogs);
  }, [searchQuery, riskFilter]);

  // Helper functions
  const getRiskColor = (score) => {
    if (score >= 80) return "bg-red-500";
    if (score >= 60) return "bg-orange-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  // Custom chart tooltip styles
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-3 rounded-md shadow-lg text-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // If user is logged out, show nothing (in a real app, would redirect to login)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        You have been logged out. Please refresh to log back in.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Removed the white background div that was creating the border */}
            <img
              src="./src/assets/pii-logo-pii-letter-pii-letter-logo-design-initials-pii-logo-linked-with-circle-and-uppercase-monogram-logo-pii-typography-for-technology-business-and-real-estate-brand-vector.jpg"
              alt="PII Shield Logo"
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-white text-2xl font-bold">
              PII Detection Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="bg-indigo-800 bg-opacity-40 p-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-opacity-60">
                <Bell className="text-white h-5 w-5" />
              </div>
              {realtimeAlerts.some((alert) => !alert.seen) && (
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3 animate-pulse"></span>
              )}
            </div>
            {/* Replaced user display with logout button */}
            <AnimatedButton
              onClick={handleLogout}
              className="flex items-center text-white bg-red-600 bg-opacity-90 hover:bg-opacity-100 p-2 pl-3 pr-4 rounded-full"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className="font-medium">Logout</span>
            </AnimatedButton>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <StatCard
            title="Total Scanned Files"
            value="247"
            icon={<FileText />}
            trend="↑ 12% from last week"
            color="indigo"
          />
          <StatCard
            title="PII Detections"
            value="845"
            icon={<AlertTriangle />}
            trend="↑ 23% from last week"
            color="red"
          />
          <StatCard
            title="Avg. Risk Score"
            value="68.5"
            icon={<Zap />}
            trend="↑ 5% from last week"
            color="yellow"
          />
          <StatCard
            title="Redaction Actions"
            value="134"
            icon={<Shield />}
            trend="↑ 18% from last week"
            color="green"
          />
        </div>

        {/* Main grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Search bar */}
            <div className="bg-white rounded-lg shadow-lg p-5">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-indigo-400" />
                    <input
                      type="text"
                      placeholder="Search by filename or PII type"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-gray-700 placeholder-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-[150px]">
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 text-gray-700 appearance-none bg-white"
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                      backgroundPosition: "right 0.5rem center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "1.5em 1.5em",
                      paddingRight: "2.5rem",
                    }}
                  >
                    <option value="All">All Risk Levels</option>
                    <option value="Critical Risk">Critical Risk</option>
                    <option value="High Risk">High Risk</option>
                    <option value="Medium Risk">Medium Risk</option>
                    <option value="Low Risk">Low Risk</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Logs table */}
            <Card title="Recent Detection Logs">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Filename
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Risk Score
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {logs.map((log) => (
                      <tr
                        key={log.id}
                        className={`transition-colors duration-200 ${
                          hoveredRow === log.id ? "bg-indigo-50" : ""
                        }`}
                        onMouseEnter={() => setHoveredRow(log.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">
                          {formatDate(log.timestamp)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {log.filename}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          <div className="flex items-center">
                            <div className="h-2 w-16 rounded-full bg-gray-200 mr-2">
                              <div
                                className={`h-2 rounded-full ${getRiskColor(
                                  log.riskScore
                                )}`}
                                style={{ width: `${log.riskScore}%` }}
                              ></div>
                            </div>
                            <span className="font-medium">{log.riskScore}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                              log.status === "Critical Risk"
                                ? "bg-red-100 text-red-800"
                                : log.status === "High Risk"
                                ? "bg-orange-100 text-orange-800"
                                : log.status === "Medium Risk"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <AnimatedButton className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </AnimatedButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Trends chart */}
            <Card title="Detection Trends">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={trendData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorFiles" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818CF8" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#818CF8"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorDetections"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#F87171" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#F87171"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 15 }} />
                  <Bar
                    dataKey="files"
                    name="Files Scanned"
                    fillOpacity={1}
                    fill="url(#colorFiles)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="detections"
                    name="PII Detections"
                    fillOpacity={1}
                    fill="url(#colorDetections)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Alerts */}
            <Card
              title="Realtime Alerts"
              titleExtra={
                <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-semibold animate-pulse">
                  Live
                </span>
              }
              footer={
                <AnimatedButton className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                  View All Alerts
                </AnimatedButton>
              }
            >
              <div className="space-y-4">
                {realtimeAlerts.length > 0 ? (
                  realtimeAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg ${
                        alert.seen ? "bg-gray-50" : "bg-red-50"
                      } border ${
                        alert.seen ? "border-gray-200" : "border-red-200"
                      } transition-all duration-300 hover:shadow-md`}
                    >
                      <div className="flex items-start">
                        <AlertTriangle
                          className={`h-5 w-5 ${
                            alert.seen ? "text-gray-400" : "text-red-500"
                          } mt-0.5 mr-3`}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2 flex items-center">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {alert.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No alerts at this time
                  </div>
                )}
              </div>
            </Card>

            {/* Risk pie chart */}
            <Card title="Risk Distribution">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <defs>
                    <filter
                      id="shadow"
                      height="200%"
                      width="200%"
                      x="-50%"
                      y="-50%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="3"
                        floodColor="#0003"
                      />
                    </filter>
                  </defs>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    label
                    animationDuration={800}
                    filter="url(#shadow)"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center">
                    <div
                      className="h-4 w-4 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* User activity */}
            <Card
              title="User Activity"
              footer={
                <AnimatedButton className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                  View All Activity
                </AnimatedButton>
              }
            >
              <div className="space-y-5">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex transition-transform duration-300 hover:translate-x-1"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center mr-4 shadow-md">
                      <img
                        src="/api/placeholder/40/40"
                        alt="User Avatar"
                        className="h-6 w-6 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PiiDashboard;
