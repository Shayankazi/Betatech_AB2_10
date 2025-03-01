import React, { useState, useEffect } from 'react';
import { Bell, Upload, FileText, User, Users, Settings, LogOut, AlertTriangle, Check, X } from 'lucide-react';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userLogs, setUserLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [riskScore, setRiskScore] = useState(null);
  const [riskPercentage, setRiskPercentage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  
  // Toggle between admin and user views (for demo purposes)
  const toggleView = () => setIsAdmin(!isAdmin);
  
  // Simulate risk assessment of uploaded file
  const assessRisk = (file) => {
    setIsUploading(true);
    
    // Simulating API call delay
    setTimeout(() => {
      // Generate random risk score between 1-10 and percentage between 5-60%
      const score = Math.floor(Math.random() * 10) + 1;
      const percentage = Math.floor(Math.random() * 56) + 5;
      
      setRiskScore(score);
      setRiskPercentage(percentage);
      
      // Add to logs
      const newLog = {
        id: Date.now(),
        filename: file.name,
        timestamp: new Date().toLocaleString(),
        riskScore: score,
        riskPercentage: percentage
      };
      
      setUserLogs(prevLogs => [newLog, ...prevLogs]);
      
      // Create alert if risk percentage is > 30%
      if (percentage > 30) {
        setShowWarning(true);
        setAlerts(prevAlerts => [
          {
            id: Date.now(),
            message: `High risk detected (${percentage}%) in file "${file.name}"`,
            type: 'warning',
            timestamp: new Date().toLocaleString()
          }, 
          ...prevAlerts
        ]);
      } else {
        setAlerts(prevAlerts => [
          {
            id: Date.now(),
            message: `File "${file.name}" assessed with low risk (${percentage}%)`,
            type: 'info',
            timestamp: new Date().toLocaleString()
          }, 
          ...prevAlerts
        ]);
      }
      
      setIsUploading(false);
    }, 1500);
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      assessRisk(file);
    }
  };
  
  const dismissWarning = () => {
    setShowWarning(false);
  };
  
  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  
  // Simulate admin data
  const adminStats = {
    totalUsers: 142,
    activeUsers: 87,
    highRiskUploads: userLogs.filter(log => log.riskPercentage > 30).length,
    totalUploads: userLogs.length,
    recentActivity: [
      { user: "john_doe", action: "Uploaded document", timestamp: "2025-03-01 09:45 AM", risk: "42%" },
      { user: "jane_smith", action: "Uploaded image", timestamp: "2025-03-01 08:30 AM", risk: "12%" },
      { user: "robert_johnson", action: "Uploaded spreadsheet", timestamp: "2025-02-28 04:15 PM", risk: "67%" },
      { user: "emma_wilson", action: "Uploaded document", timestamp: "2025-02-28 01:20 PM", risk: "8%" }
    ]
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">
                DataSafe {isAdmin ? "Admin" : "User"} Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleView} 
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm font-medium"
              >
                Switch to {isAdmin ? "User" : "Admin"} View
              </button>
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-500 cursor-pointer" />
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {alerts.length}
                  </span>
                )}
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <div className="flex items-center text-amber-500 mb-4">
              <AlertTriangle className="h-8 w-8 mr-2" />
              <h2 className="text-xl font-bold">High Risk Alert</h2>
            </div>
            <p className="text-gray-700 mb-4">
              The uploaded file contains <span className="font-bold text-red-500">{riskPercentage}%</span> personal data, 
              which exceeds our recommended threshold of 30%. Please review the file contents before proceeding.
            </p>
            <div className="flex justify-end">
              <button 
                onClick={dismissWarning} 
                className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
      
      {isAdmin ? (
        // ADMIN DASHBOARD
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Admin Stats Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-800">{adminStats.totalUsers}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-500">
                  <User className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Users</p>
                  <p className="text-2xl font-semibold text-gray-800">{adminStats.activeUsers}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-500">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">High Risk Uploads</p>
                  <p className="text-2xl font-semibold text-gray-800">{adminStats.highRiskUploads}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Uploads</p>
                  <p className="text-2xl font-semibold text-gray-800">{adminStats.totalUploads}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-800">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {adminStats.recentActivity.map((activity, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{activity.user}</p>
                      <p className="text-sm text-gray-500">{activity.action}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        parseFloat(activity.risk) > 30 ? 'text-red-500' : 'text-green-500'
                      }`}>
                        Risk: {activity.risk}
                      </p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* User Upload Logs */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-800">User Upload Logs</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Filename
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Percentage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {log.filename}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.riskScore}/10
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${log.riskPercentage > 30 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {log.riskPercentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.riskPercentage > 30 ? (
                          <span className="text-red-500 flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-1" /> High Risk
                          </span>
                        ) : (
                          <span className="text-green-500 flex items-center">
                            <Check className="h-4 w-4 mr-1" /> Safe
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {userLogs.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No uploads recorded yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        // USER DASHBOARD
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - File Upload & Risk Assessment */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-800 mb-4">Upload File for Risk Assessment</h2>
                  <p className="text-sm text-gray-500 mb-6">
                    Our system will analyze your file for personal data and provide a risk assessment.
                  </p>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        <span className="text-blue-500 font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, XLS, TXT, CSV (max. 50MB)</p>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Risk Assessment Results */}
              {riskScore !== null && (
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-medium text-gray-800">Risk Assessment Results</h2>
                      <span className="text-sm text-gray-500">{selectedFile?.name}</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="mr-4">
                        <div className="text-4xl font-bold text-gray-800">{riskScore}<span className="text-lg text-gray-500">/10</span></div>
                        <div className="text-sm text-gray-500">Risk Score</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Personal Data: {riskPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              riskPercentage > 30 ? 'bg-red-500' : 'bg-green-500'
                            }`}
                            style={{width: `${riskPercentage}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-md ${
                      riskPercentage > 30 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                    }`}>
                      {riskPercentage > 30 ? (
                        <div className="flex">
                          <AlertTriangle className="h-5 w-5 mr-2" />
                          <div>
                            <p className="font-medium">High Risk Detected</p>
                            <p className="text-sm">Your file contains {riskPercentage}% personal data, which exceeds our recommended threshold of 30%.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex">
                          <Check className="h-5 w-5 mr-2" />
                          <div>
                            <p className="font-medium">Low Risk Detected</p>
                            <p className="text-sm">Your file contains {riskPercentage}% personal data, which is below our recommended threshold of 30%.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar - Alerts & Logs */}
            <div className="lg:col-span-1">
              {/* Alerts */}
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-md font-medium text-gray-800">Alerts</h3>
                </div>
                <div className="p-4">
                  {alerts.length > 0 ? (
                    <div className="space-y-3">
                      {alerts.map(alert => (
                        <div 
                          key={alert.id} 
                          className={`p-3 rounded-md relative ${
                            alert.type === 'warning' ? 'bg-amber-50' : 'bg-blue-50'
                          }`}
                        >
                          <button 
                            onClick={() => dismissAlert(alert.id)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <p className={`text-sm ${
                            alert.type === 'warning' ? 'text-amber-700' : 'text-blue-700'
                          }`}>
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {alert.timestamp}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No alerts</p>
                  )}
                </div>
              </div>
              
              {/* User Logs */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-md font-medium text-gray-800">Upload History</h3>
                </div>
                {userLogs.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {userLogs.map(log => (
                      <div key={log.id} className="p-4">
                        <div className="flex justify-between">
                          <div className="font-medium text-gray-800 mb-1 truncate max-w-xs">
                            {log.filename}
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            log.riskPercentage > 30 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {log.riskPercentage}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {log.timestamp}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500">No files uploaded yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;