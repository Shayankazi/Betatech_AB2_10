import React, { useState } from 'react';
import { Bell, Upload, Moon, Sun, FileText, AlertTriangle, Info, ChevronDown, Shield, BarChart2, UserCheck } from 'lucide-react';

const UserDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [files, setFiles] = useState([
    { id: 1, name: 'financial_report.pdf', date: '2025-02-28 14:30', riskPercentage: 45, riskLevel: 7 },
    { id: 2, name: 'resume_template.docx', date: '2025-02-27 10:15', riskPercentage: 28, riskLevel: 4 },
    { id: 3, name: 'project_data.csv', date: '2025-02-25 16:42', riskPercentage: 62, riskLevel: 9 },
    { id: 4, name: 'meeting_notes.pdf', date: '2025-02-23 09:20', riskPercentage: 12, riskLevel: 2 },
    { id: 5, name: 'customer_feedback.docx', date: '2025-02-20 15:10', riskPercentage: 33, riskLevel: 5 }
  ]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle upload button click
  const handleUpload = () => {
    setShowUploadModal(true);
    setUploadProgress(0);
    setAnalyzing(false);
    setAnalysisComplete(false);
    setAnalysisResults(null);
  };

  // Simulate file upload
  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setAnalyzing(true);
        setTimeout(() => {
          setAnalyzing(false);
          setAnalysisComplete(true);
          setAnalysisResults({
            fileName: 'new_document.pdf',
            riskPercentage: Math.floor(Math.random() * 60) + 10,
            detectedItems: [
              'Full Name', 
              'Email Address', 
              'Phone Number',
              'Home Address'
            ]
          });
        }, 2000);
      }
    }, 150);
  };

  // Add new file after analysis
  const addNewFile = () => {
    if (analysisResults) {
      const riskLevel = Math.ceil(analysisResults.riskPercentage / 10);
      const newFile = {
        id: files.length + 1,
        name: analysisResults.fileName,
        date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }).replace(',', ''),
        riskPercentage: analysisResults.riskPercentage,
        riskLevel: riskLevel
      };
      setFiles([newFile, ...files]);
    }
    setShowUploadModal(false);
  };

  // Helper functions for risk styling
  const getRiskColor = (percentage) => {
    if (percentage < 20) return 'bg-green-500';
    if (percentage < 40) return 'bg-yellow-500';
    if (percentage < 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRiskTextColor = (percentage) => {
    if (percentage < 20) return 'text-green-500';
    if (percentage < 40) return 'text-yellow-500';
    if (percentage < 60) return 'text-orange-500';
    return 'text-red-500';
  };

  // Circle progress calculations
  const getStrokeDasharray = () => {
    const circumference = 2 * Math.PI * 40;
    return `${circumference} ${circumference}`;
  };

  const getStrokeDashoffset = (percentage) => {
    const circumference = 2 * Math.PI * 40;
    return ((100 - percentage) / 100) * circumference;
  };

  // Calculate average risk
  const averageRiskPercentage = Math.round(files.reduce((sum, file) => sum + file.riskPercentage, 0) / files.length);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="flex items-center space-x-2">
          <Shield size={24} className="text-blue-600" />
          <h1 className="text-xl font-bold">PII Detection</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              U
            </div>
            <span>User</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 mt-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Monitor and manage your document privacy</p>
          </div>
          <button 
            onClick={handleUpload}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition shadow-md"
          >
            <Upload size={18} />
            <span>Upload File</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Files Card */}
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} border-l-4 border-blue-500`}>
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">Total Files Analyzed</h3>
              <FileText className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold mt-4">{files.length}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>Last upload: {files[0]?.date}</p>
          </div>
          
          {/* Average Risk Score Card */}
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} relative border-l-4 border-yellow-500`}>
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-semibold">Average Risk Score</h3>
              <BarChart2 className="text-yellow-500" />
            </div>
            <div className="flex items-center">
              <div className="relative w-24 h-24 mr-4">
                <svg className="w-24 h-24" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke={darkMode ? "#374151" : "#E5E7EB"} 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke={
                      averageRiskPercentage < 20 ? "#10B981" : 
                      averageRiskPercentage < 40 ? "#F59E0B" : 
                      averageRiskPercentage < 60 ? "#F97316" : 
                      "#EF4444"
                    } 
                    strokeWidth="8"
                    strokeDasharray={getStrokeDasharray()}
                    strokeDashoffset={getStrokeDashoffset(averageRiskPercentage)}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <text 
                    x="50" 
                    y="50" 
                    dominantBaseline="middle" 
                    textAnchor="middle" 
                    fill={
                      averageRiskPercentage < 20 ? "#10B981" : 
                      averageRiskPercentage < 40 ? "#F59E0B" : 
                      averageRiskPercentage < 60 ? "#F97316" : 
                      "#EF4444"
                    }
                    style={{ fontSize: '14px', fontWeight: 'bold' }}
                  >
                    {averageRiskPercentage}%
                  </text>
                </svg>
              </div>
              <div>
                <div className="mb-1">Risk Level</div>
                <div className={`text-xl font-bold ${getRiskTextColor(averageRiskPercentage)}`}>
                  {Math.ceil(averageRiskPercentage / 10)}/10
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                  {
                    averageRiskPercentage < 20 ? "Low Risk" : 
                    averageRiskPercentage < 40 ? "Moderate Risk" : 
                    averageRiskPercentage < 60 ? "High Risk" : 
                    "Critical Risk"
                  }
                </div>
              </div>
            </div>
          </div>
          
          {/* High Risk Files Card */}
          <div className={`p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} border-l-4 border-red-500`}>
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold">High Risk Files</h3>
              <AlertTriangle className="text-red-500" />
            </div>
            <div className="flex items-center mt-4">
              <div className="text-3xl font-bold mr-2">
                {files.filter(file => file.riskPercentage > 30).length}
              </div>
              <div className="text-sm text-red-500">
                ({Math.round(files.filter(file => file.riskPercentage > 30).length / files.length * 100)}% of total)
              </div>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
              Files with risk percentage > 30%
            </p>
          </div>
        </div>

        {/* File History Table */}
        <div className={`rounded-lg shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} mb-8`}>
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <div className="flex items-center">
              <UserCheck className="mr-2 text-blue-500" />
              <h3 className="text-lg font-semibold">File Upload History</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-sm text-gray-500 dark:text-gray-400 flex items-center border px-2 py-1 rounded-md">
                Sort by <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-600'}`}>
                <tr>
                  <th className="px-4 py-3 text-left">File Name</th>
                  <th className="px-4 py-3 text-left">Upload Date</th>
                  <th className="px-4 py-3 text-left">Risk Percentage</th>
                  <th className="px-4 py-3 text-left">Risk Level (1-10)</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {files.map(file => (
                  <tr key={file.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className="px-4 py-3 flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${getRiskColor(file.riskPercentage)}`}></div>
                      {file.name}
                    </td>
                    <td className="px-4 py-3">{file.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="relative w-8 h-8 mr-2">
                          <svg className="w-8 h-8" viewBox="0 0 100 100">
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="40" 
                              fill="none" 
                              stroke={darkMode ? "#374151" : "#E5E7EB"} 
                              strokeWidth="8"
                            />
                            <circle 
                              cx="50" 
                              cy="50" 
                              r="40" 
                              fill="none" 
                              stroke={
                                file.riskPercentage < 20 ? "#10B981" : 
                                file.riskPercentage < 40 ? "#F59E0B" : 
                                file.riskPercentage < 60 ? "#F97316" : 
                                "#EF4444"
                              } 
                              strokeWidth="8"
                              strokeDasharray={getStrokeDasharray()}
                              strokeDashoffset={getStrokeDashoffset(file.riskPercentage)}
                              strokeLinecap="round"
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                        </div>
                        <span className={file.riskPercentage > 30 ? 'font-bold text-red-500' : ''}>
                          {file.riskPercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        file.riskLevel <= 3 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                        file.riskLevel <= 6 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {file.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-lg shadow-xl w-full max-w-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Upload className="mr-2 text-blue-500" />
              Upload File for PII Detection
            </h3>
            
            {!analyzing && !analysisComplete && (
              <>
                <div className="mb-4">
                  <div className={`border-2 border-dashed ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center">
                      <Upload className="text-blue-500" size={24} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click to browse or drag and drop your file here
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Supports PDF, DOCX, CSV, JPG, PNG and more
                    </p>
                  </div>
                </div>
                
                {uploadProgress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Uploading...</span>
                      <span className="text-sm">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-blue-500 h-2.5 rounded-full transition-all" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => setShowUploadModal(false)}
                    className={`px-4 py-2 rounded-md ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={simulateUpload}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-sm"
                  >
                    Upload
                  </button>
                </div>
              </>
            )}
            
            {analyzing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 mx-auto mb-4"></div>
                <p>Analyzing file for PII information...</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">This may take a moment</p>
              </div>
            )}
            
            {analysisComplete && analysisResults && (
              <div>
                <div className="mb-6 text-center">
                  {analysisResults.riskPercentage > 30 ? (
                    <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-center">
                        <AlertTriangle className="mr-2" />
                        <span className="font-bold">Warning: High Risk Detected!</span>
                      </div>
                      <p className="text-sm mt-1">
                        This file contains significant personally identifiable information.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg mb-4">
                      <p className="font-bold flex items-center justify-center">
                        <Shield className="mr-2" /> Analysis Complete
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-4 text-center">Risk Assessment</h4>
                  <div className="flex justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32" viewBox="0 0 100 100">
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          fill="none" 
                          stroke={darkMode ? "#374151" : "#E5E7EB"} 
                          strokeWidth="8"
                        />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          fill="none" 
                          stroke={
                            analysisResults.riskPercentage < 20 ? "#10B981" : 
                            analysisResults.riskPercentage < 40 ? "#F59E0B" : 
                            analysisResults.riskPercentage < 60 ? "#F97316" : 
                            "#EF4444"
                          } 
                          strokeWidth="8"
                          strokeDasharray={getStrokeDasharray()}
                          strokeDashoffset={getStrokeDashoffset(analysisResults.riskPercentage)}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                        <text 
                          x="50" 
                          y="45" 
                          dominantBaseline="middle" 
                          textAnchor="middle" 
                          fill={
                            analysisResults.riskPercentage < 20 ? "#10B981" : 
                            analysisResults.riskPercentage < 40 ? "#F59E0B" : 
                            analysisResults.riskPercentage < 60 ? "#F97316" : 
                            "#EF4444"
                          }
                          style={{ fontSize: '16px', fontWeight: 'bold' }}
                        >
                          {analysisResults.riskPercentage}%
                        </text>
                        <text 
                          x="50" 
                          y="65" 
                          dominantBaseline="middle" 
                          textAnchor="middle" 
                          fill={darkMode ? "#9CA3AF" : "#6B7280"}
                          style={{ fontSize: '12px' }}
                        >
                          Risk Score
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center">
                    <span>Risk Level: </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      Math.ceil(analysisResults.riskPercentage / 10) <= 3 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                      Math.ceil(analysisResults.riskPercentage / 10) <= 6 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {Math.ceil(analysisResults.riskPercentage / 10)} / 10
                    </span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Detected PII</h4>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <ul className="space-y-2">
                      {analysisResults.detectedItems.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => setShowUploadModal(false)}
                    className={`px-4 py-2 rounded-md ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={addNewFile}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-sm"
                  >
                    Add to History
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className={`mt-8 py-4 border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2025 PII Detection. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;