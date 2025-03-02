import React, { useState, useRef } from 'react';
import { Bell, Upload, FileText, AlertTriangle, ChevronDown, Shield, BarChart2, UserCheck, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const fileInputRef = useRef(null);
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
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const navigate = useNavigate(); 



    // Calculate average risk
    const averageRiskPercentage = Math.round(files.reduce((sum, file) => sum + file.riskPercentage, 0) / files.length);

    // Helper functions
    const getRiskColor = (percentage) =>
        percentage < 20 ? 'bg-green-500' : percentage < 40 ? 'bg-yellow-500' : percentage < 60 ? 'bg-orange-500' : 'bg-red-500';

    const getRiskTextColor = (percentage) =>
        percentage < 20 ? 'text-green-500' : percentage < 40 ? 'text-yellow-500' : percentage < 60 ? 'text-orange-500' : 'text-red-500';

    const getStrokeDasharray = () => 2 * Math.PI * 40;
    const getStrokeDashoffset = (percentage) => ((100 - percentage) / 100) * getStrokeDasharray();

    // Supported file types
    const supportedFileTypes = [
        'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword', 'text/csv', 'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg', 'image/png', 'text/plain'
    ];

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login')
    };

    // Handlers
    const handleUpload = () => {
        navigate('/file-dashboard');
      };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) handleFileUpload(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === 'dragenter' || e.type === 'dragover');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
    };

    const handleFileUpload = (file) => {
        // Check file type and size
        if (!supportedFileTypes.includes(file.type)) {
            alert('File type not supported. Please upload a PDF, DOCX, CSV, JPG, PNG or similar file.');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert('File too large. Maximum size is 10MB.');
            return;
        }

        setSelectedFile(file);
        uploadFile(file);
    };



    const simulateAnalysis = (file) => {
        setAnalyzing(true);

        setTimeout(() => {
            // Calculate a risk score based on file type
            let riskScore;
            if (file.type === 'application/pdf') riskScore = Math.floor(Math.random() * 40) + 20;
            else if (file.type.includes('word')) riskScore = Math.floor(Math.random() * 50) + 10;
            else if (file.type === 'text/csv') riskScore = Math.floor(Math.random() * 30) + 40;
            else riskScore = Math.floor(Math.random() * 60) + 10;

            // Generate detected items
            const commonItems = ['Full Name', 'Email Address'];
            const possibleItems = [
                'Phone Number', 'Home Address', 'Date of Birth',
                'Social Security Number', 'Credit Card Number',
                'Bank Account Number', 'Passport Number', 'Driver License'
            ];

            // Add 2-5 random items from possible items
            const numItems = Math.floor(Math.random() * 4) + 2;
            const selectedItems = [...commonItems];

            for (let i = 0; i < numItems; i++) {
                const randomItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
                if (!selectedItems.includes(randomItem)) selectedItems.push(randomItem);
            }

            setAnalyzing(false);
            setAnalysisComplete(true);
            setAnalysisResults({
                fileName: file.name,
                riskPercentage: riskScore,
                detectedItems: selectedItems
            });
        }, 2000);
    };

    const addNewFile = () => {
        if (analysisResults) {
            const newFile = {
                id: files.length + 1,
                name: analysisResults.fileName,
                date: new Date().toLocaleString('en-US', {
                    year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit'
                }).replace(',', ''),
                riskPercentage: analysisResults.riskPercentage,
                riskLevel: Math.ceil(analysisResults.riskPercentage / 10)
            };
            setFiles([newFile, ...files]);
            setShowUploadModal(false);
        }
    };

    // Enhanced components
    const EnhancedIcon = ({ Icon, color = "blue", notification = false }) => (
        <div className="relative">
            <Icon size={20} className={`text-${color}-600 transition-colors duration-300`} strokeWidth={2.5} />
            {notification && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>}
        </div>
    );

    const PIILogo = () => (
        <img src="./src/assets/pii_logo.jpg"
            width="40" height="40" alt="PII Logo" />
    );

    // Circle progress component
    const CircleProgress = ({ percentage, size = 100, strokeWidth = 8 }) => {
        const radius = (size / 2) - (strokeWidth / 2);
        const circumference = 2 * Math.PI * radius;
        const offset = ((100 - percentage) / 100) * circumference;
        const color = percentage < 20 ? "#10B981" : percentage < 40 ? "#F59E0B" : percentage < 60 ? "#F97316" : "#EF4444";

        return (
            <svg className={`w-${size / 4} h-${size / 4}`} viewBox={`0 0 ${size} ${size}`}>
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={strokeWidth} />
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    className={analysisComplete ? "animate-drawCircle" : ""} />
                {size > 50 && (
                    <>
                        <text x={size / 2} y={size / 2} dominantBaseline="middle" textAnchor="middle"
                            fill={color} style={{ fontSize: size / 6, fontWeight: 'bold' }}>
                            {percentage}%
                        </text>
                        {analysisComplete && (
                            <text x={size / 2} y={size / 2 + size / 8} dominantBaseline="middle" textAnchor="middle"
                                fill="#6B7280" style={{ fontSize: size / 8 }}>
                                Risk Score
                            </text>
                        )}
                    </>
                )}
            </svg>
        );
    };

    const getRiskStyle = (level) => level <= 3 ? 'bg-green-100 text-green-800' :
        level <= 6 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800';

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.docx,.doc,.csv,.xls,.xlsx,.jpg,.jpeg,.png,.txt"
            />

            {/* Header */}
            <header className="flex justify-between items-center p-4 bg-white shadow-md">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center">
                        <PIILogo />
                    </div>
                    <h1 className="text-xl font-bold">PII Detection</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="relative p-2 rounded-full hover:bg-gray-200 transition-colors duration-300">
                        <EnhancedIcon Icon={Bell} color="blue" notification={true} />
                    </button>
                    {/* Modified logout button with changed color */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-300"
                    >
                        <LogOut size={16} className="text-white" />
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-4 mt-8">
                    <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold">Dashboard</h2>
                        <p className="text-sm text-gray-500">Monitor and manage your document privacy</p>
                    </div>
                    <button 
                        onClick={handleUpload}
                        className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 shadow-md"
                    >
                        <Upload size={20} className="text-white" />
                        <span>Upload File</span>
                    </button>
                    </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Files Card */}
                    <div className="p-6 rounded-lg shadow-md bg-white border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">Total Files Analyzed</h3>
                            <FileText size={20} className="text-blue-500" strokeWidth={2.5} />
                        </div>
                        <p className="text-3xl font-bold mt-4">{files.length}</p>
                        <p className="text-sm text-gray-500 mt-2">Last upload: {files[0]?.date}</p>
                    </div>

                    {/* Average Risk Score Card */}
                    <div className="p-6 rounded-lg shadow-md bg-white relative border-l-4 border-yellow-500 transition-all duration-300 hover:shadow-lg">
                        <div className="flex justify-between mb-2">
                            <h3 className="text-lg font-semibold">Average Risk Score</h3>
                            <BarChart2 size={20} className="text-yellow-500" strokeWidth={2.5} />
                        </div>
                        <div className="flex items-center">
                            <CircleProgress percentage={averageRiskPercentage} size={96} />
                            <div className="ml-4">
                                <div className="mb-1">Risk Level</div>
                                <div className={`text-xl font-bold ${getRiskTextColor(averageRiskPercentage)}`}>
                                    {Math.ceil(averageRiskPercentage / 10)}/10
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {averageRiskPercentage < 20 ? "Low Risk" :
                                        averageRiskPercentage < 40 ? "Moderate Risk" :
                                            averageRiskPercentage < 60 ? "High Risk" : "Critical Risk"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* High Risk Files Card */}
                    <div className="p-6 rounded-lg shadow-md bg-white border-l-4 border-red-500 transition-all duration-300 hover:shadow-lg">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-semibold">High Risk Files</h3>
                            <AlertTriangle size={20} className="text-red-500" strokeWidth={2.5} />
                        </div>
                        <div className="flex items-center mt-4">
                            <div className="text-3xl font-bold mr-2">
                                {files.filter(file => file.riskPercentage > 30).length}
                            </div>
                            <div className="text-sm text-red-500">
                                ({Math.round(files.filter(file => file.riskPercentage > 30).length / files.length * 100)}% of total)
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Files with risk percentage > 30%</p>
                    </div>
                </div>

                {/* File History Table */}
                <div className="rounded-lg shadow-md overflow-hidden bg-white mb-8 transition-all duration-300 hover:shadow-lg">
                    <div className="flex justify-between items-center p-4 border-b">
                        <div className="flex items-center">
                            <UserCheck size={20} className="text-blue-600" strokeWidth={2.5} />
                            <h3 className="text-lg font-semibold ml-2">File Upload History</h3>
                        </div>
                        <button className="text-sm text-gray-500 flex items-center border px-2 py-1 rounded-md hover:bg-gray-100">
                            Sort by <ChevronDown size={16} className="ml-1" />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="px-4 py-3 text-left">File Name</th>
                                    <th className="px-4 py-3 text-left">Upload Date</th>
                                    <th className="px-4 py-3 text-left">Risk Percentage</th>
                                    <th className="px-4 py-3 text-left">Risk Level (1-10)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {files.map(file => (
                                    <tr key={file.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-4 py-3 flex items-center">
                                            <div className={`w-2 h-2 rounded-full mr-2 ${getRiskColor(file.riskPercentage)}`}></div>
                                            {file.name}
                                        </td>
                                        <td className="px-4 py-3">{file.date}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center">
                                                <CircleProgress percentage={file.riskPercentage} size={32} strokeWidth={8} />
                                                <span className={file.riskPercentage > 30 ? 'ml-2 font-bold text-red-500' : 'ml-2'}>
                                                    {file.riskPercentage}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskStyle(file.riskLevel)}`}>
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fadeIn">
                    <div className="rounded-lg shadow-xl w-full max-w-md p-6 bg-white transition-transform transform animate-slideIn">
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <Upload size={22} className="text-blue-600" />
                            <span className="ml-2">Upload File for PII Detection</span>
                        </h3>

                        {!analyzing && !analysisComplete && (
                            <>
                                <div className="mb-4">
                                    <div
                                        className={`border-2 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300 bg-gray-50'} rounded-lg p-6 text-center hover:border-blue-500 transition-all duration-300 cursor-pointer`}
                                        onClick={() => fileInputRef.current.click()}
                                        onDragEnter={handleDrag}
                                        onDragOver={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        {selectedFile ? (
                                            <div>
                                                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-green-50 flex items-center justify-center">
                                                    <FileText size={24} className="text-green-600" />
                                                </div>
                                                <p className="font-medium">{selectedFile.name}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-blue-50 flex items-center justify-center">
                                                    <Upload size={24} className="text-blue-600" />
                                                </div>
                                                <p className="text-sm text-gray-500">Click to browse or drag and drop your file here</p>
                                                <p className="text-xs text-gray-400 mt-2">Supports PDF, DOCX, CSV, JPG, PNG and more</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {uploadProgress > 0 && (
                                    <div className="mb-4">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm">Uploading...</span>
                                            <span className="text-sm">{uploadProgress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}></div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between">
                                    <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-600">Cancel</button>
                                    <button
                                        onClick={() => selectedFile && uploadFile(selectedFile)}
                                        className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md ${!selectedFile && 'opacity-50 cursor-not-allowed'}`}
                                        disabled={!selectedFile}
                                    >
                                        {uploadProgress > 0 ? 'Uploading...' : 'Upload'}
                                    </button>
                                </div>
                            </>
                        )}

                        {analyzing && (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mx-auto mb-4"></div>
                                <p>Analyzing file for PII information...</p>
                                <p className="text-xs text-gray-500 mt-2">This may take a moment</p>
                            </div>
                        )}

                        {analysisComplete && analysisResults && (
                            <div>
                                <div className="mb-6 text-center">
                                    {analysisResults.riskPercentage > 30 ? (
                                        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4 animate-pulse">
                                            <div className="flex items-center justify-center">
                                                <AlertTriangle size={20} className="text-red-500" />
                                                <span className="font-bold ml-2">Warning: High Risk Detected!</span>
                                            </div>
                                            <p className="text-sm mt-1">This file contains significant personally identifiable information.</p>
                                        </div>
                                    ) : (
                                        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 animate-fadeIn">
                                            <p className="font-bold flex items-center justify-center">
                                                <Shield size={24} className="text-green-600" /> <span className="ml-2">Analysis Complete</span>
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4 text-center">Risk Assessment</h4>
                                    <div className="flex justify-center mb-4">
                                        <CircleProgress percentage={analysisResults.riskPercentage} size={128} />
                                    </div>
                                    <div className="text-center">
                                        <span>Risk Level: </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskStyle(Math.ceil(analysisResults.riskPercentage / 10))
                                            }`}>
                                            {Math.ceil(analysisResults.riskPercentage / 10)} / 10
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold mb-2">Detected PII</h4>
                                    <div className="p-3 rounded-lg bg-gray-50">
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
                                    <button onClick={() => setShowUploadModal(false)} className="px-4 py-2 rounded-md hover:bg-gray-100 text-gray-600">Cancel</button>
                                    <button onClick={addNewFile} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-md">Add to History</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="mt-8 py-4 border-t bg-white border-gray-200">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                    © 2025 PII Detection. All rights reserved.
                </div>
            </footer>

            {/* Add CSS for custom animations */}
            <style jsx global>{`
 @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
 @keyframes slideIn { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
 @keyframes drawCircle { 0% { stroke-dashoffset: ${getStrokeDasharray()}; } 100% { stroke-dashoffset: ${getStrokeDashoffset(analysisResults?.riskPercentage || 0)}; } }
 .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
 .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
 .animate-drawCircle { animation: drawCircle 1.5s ease-out forwards; }
 `}</style>
        </div>
    );
};

export default UserDashboard;