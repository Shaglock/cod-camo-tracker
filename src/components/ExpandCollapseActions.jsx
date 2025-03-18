import React, { useState, useRef, useEffect } from 'react';

export default function ExpandCollapseActions({
  expandAllCategories,
  collapseAllCategories,
  expandAllWeapons,
  collapseAllWeapons,
  sortOption,
  setSortOption
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [weaponsExpanded, setWeaponsExpanded] = useState(false);

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

  const toggleCategories = () => {
    if (categoriesExpanded) {
      collapseAllCategories();
    } else {
      expandAllCategories();
    }
    setCategoriesExpanded(!categoriesExpanded);
  };

  const toggleWeapons = () => {
    if (weaponsExpanded) {
      collapseAllWeapons();
    } else {
      expandAllWeapons();
    }
    setWeaponsExpanded(!weaponsExpanded);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-end">
      <div className="flex gap-2">
        <button
          onClick={toggleCategories}
          className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors h-10 text-sm ${
            categoriesExpanded ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          title={categoriesExpanded ? 'Collapse All Categories' : 'Expand All Categories'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span className="hidden sm:inline">
            {categoriesExpanded ? 'Collapse Categories' : 'Expand Categories'}
          </span>
        </button>
        
        <button
          onClick={toggleWeapons}
          className={`flex items-center justify-center px-3 py-2 rounded-md transition-colors h-10 text-sm ${
            weaponsExpanded ? 'bg-gray-600 hover:bg-gray-700' : 'bg-purple-600 hover:bg-purple-700'
          }`}
          title={weaponsExpanded ? 'Collapse All Weapons' : 'Expand All Weapons'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="hidden sm:inline">
            {weaponsExpanded ? 'Collapse Weapons' : 'Expand Weapons'}
          </span>
        </button>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded flex items-center space-x-1 h-10 text-sm"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          title="Sort Options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 8l4-4" />
          </svg>
          <span className="hidden sm:inline">Sort: {sortOption === 'none' ? 'None' : sortOption === 'name' ? 'Name' : 'Progress'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg z-10">
            <div className="py-1">
              <button
                onClick={() => {
                  setSortOption('none');
                  setDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${sortOption === 'none' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                No Sorting
              </button>
              <button
                onClick={() => {
                  setSortOption('name');
                  setDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${sortOption === 'name' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                Sort by Name
              </button>
              <button
                onClick={() => {
                  setSortOption('progress');
                  setDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${sortOption === 'progress' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                Sort by Progress
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
