import { useState } from "react";
import { FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      setAnalysisResult("Sensitive PII found at Page 2, Line 5."); // Mock response
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">PII Detection</h1>
        <p className="text-gray-600 mb-6">Upload your document, and our AI will detect personal information.</p>

        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
          <FaCloudUploadAlt className="text-5xl text-gray-400" />
          <span className="mt-2 text-gray-600">Click to upload or drag & drop</span>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        {file && <p className="mt-3 text-gray-800">Selected: {file.name}</p>}
        
        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          disabled={!file || loading}
        >
          {loading ? "Analyzing..." : "Analyze Document"}
        </button>

        {analysisResult && (
          <div className="mt-6 bg-green-100 text-green-700 p-3 rounded-lg flex items-center">
            <FaCheckCircle className="text-xl mr-2" />
            <span>{analysisResult}</span>
          </div>
        )}
      </div>
    </div>
  );
}
