import React, { useState } from 'react';
import { Upload, Shield, AlertTriangle, X, FileText, Loader2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FileDashboard = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFile(file);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAnalysis(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }

  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const getRiskColor = (score) => {
    if (score >= 60) return 'bg-red-500';
    if (score >= 40) return 'bg-orange-500';
    if (score >= 20) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <X className="text-gray-600" />
            </button>
            <img 
              src="./src/assets/pii_logo.jpg" 
              alt="PII Shield Logo" 
              className="h-10 w-10 object-contain" 
            />
            <h1 className="text-2xl font-bold text-gray-800">PII Scanner</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
          >
            <LogOut size={20} className="text-gray-600" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8 text-center">
          <label className="cursor-pointer">
            <input 
              type="file" 
              onChange={handleFileSelect} 
              className="hidden"
              accept=".pdf,.docx,.jpg,.png"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">
                {file ? file.name : 'Drag & drop or browse files'}
              </h2>
              <p className="text-gray-500 text-sm">
                Supported formats: PDF, DOCX, JPG, PNG
              </p>
            </div>
          </label>

          {selectedFile && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze File'}
            </button>
          )}

          {loading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-600">
              <Loader2 className="animate-spin w-5 h-5" />
              Processing file...
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-8 flex items-center gap-3">
            <AlertTriangle className="text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
            <X className="ml-auto cursor-pointer" onClick={() => setError(null)} />
          </div>
        )}

        {/* Results */}
        {analysis && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            {/* Risk Score Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`${getRiskColor(analysis['Risk Score'])} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold`}>
                {analysis['Risk Score']}
              </div>
              <div>
                <h3 className="text-xl font-semibold">Risk Level: {analysis['Risk Level']}</h3>
                <p className="text-gray-600 text-sm">{file.name}</p>
              </div>
            </div>

            {/* PII Findings */}
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(analysis).map(([category, values]) => (
                (category !== 'Risk Score' && category !== 'Risk Level' && values.length > 0) && (
                  <div key={category} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-gray-800">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {values.map((value, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-white border rounded-full text-sm text-gray-700"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* No PII Found */}
            {Object.entries(analysis).filter(([key]) => 
              key !== 'Risk Score' && key !== 'Risk Level'
            ).length === 0 && (
              <div className="text-center p-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                No sensitive information detected
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDashboard;