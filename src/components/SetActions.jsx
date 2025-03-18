import React, { useState, useRef, useEffect } from 'react';

export default function SetActions({
  camoSets,
  activeSetId,
  setActiveSetId,
  addNewCamoSet,
  duplicateCamoSet,
  deleteCamoSet
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center w-full sm:w-auto">
      <div className="relative w-full" ref={dropdownRef}>
        <button 
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded flex items-center space-x-1 h-10 text-sm font-bold w-full"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="hidden sm:inline">Current Set:</span>
          <span className="font-medium truncate max-w-[150px]">
            {camoSets.find(set => set.id === activeSetId)?.name || "Set"}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-1 z-50 w-60 bg-gray-800 rounded-md shadow-lg">
            <div className="py-1 max-h-60 overflow-y-auto">
              {camoSets.map(set => (
                <button
                  key={set.id}
                  onClick={() => {
                    setActiveSetId(set.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
                    set.id === activeSetId ? 'bg-gray-700' : ''
                  }`}
                >
                  {set.name}
                </button>
              ))}
            </div>
            <div className="border-t border-gray-700 py-1">
              <button
                onClick={() => {
                  addNewCamoSet();
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Set
              </button>
              <button
                onClick={() => {
                  duplicateCamoSet();
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8m-4-4v8m0-12V4" />
                </svg>
                Duplicate Set
              </button>
              {camoSets.length > 1 && (
                <button
                  onClick={() => {
                    deleteCamoSet(activeSetId);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Set
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
