import React, { useRef } from 'react';

export default function ImportExportActions({ camoSets, importSets }) {
  const fileInputRef = useRef(null);

  // Export all sets to a JSON file
  const exportSets = () => {
    // Create a data object with version info for future compatibility
    const exportData = {
      version: "1.0",
      timestamp: new Date().toISOString(),
      sets: camoSets
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(exportData, null, 2);
    
    // Create a blob and download link
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `cod-camos-${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle file selection for import
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        
        // Check if the data has the expected structure
        if (importedData.sets && Array.isArray(importedData.sets)) {
          importSets(importedData.sets);
        } else {
          alert('Invalid import file format. Could not find sets data.');
        }
      } catch (error) {
        alert('Error importing sets: ' + error.message);
      }
      
      // Reset the file input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={exportSets}
        className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center h-10 text-sm font-bold"
        title="Export all sets to a file"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export
      </button>
      
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center h-10 text-sm font-bold"
        title="Import sets from a file"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Import
      </button>
      
      {/* Hidden file input for the import functionality */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
    </div>
  );
}
