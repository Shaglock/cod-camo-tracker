import React, { useState, useEffect } from 'react';
import WeaponCategory from './WeaponCategory';
import Counters from './Counters';
import { weaponCategories } from '../constants/weaponData';

export default function AppWrapper() {
  const [trackerData, setTrackerData] = useState(() => {
    const saved = localStorage.getItem('camoTracker');
    return saved ? JSON.parse(saved) : {};
  });
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedWeapons, setExpandedWeapons] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('none'); // Default to no sorting

  useEffect(() => {
    localStorage.setItem('camoTracker', JSON.stringify(trackerData));
  }, [trackerData]);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleWeapon = (weaponName) => {
    setExpandedWeapons((prev) => ({
      ...prev,
      [weaponName]: !prev[weaponName],
    }));
  };

  const expandAll = () => setExpandedCategories(weaponCategories.reduce((acc, cat) => ({ ...acc, [cat.name]: true }), {}));
  const collapseAll = () => setExpandedCategories({});
  const resetAllCamouflages = () => {
    const newTrackerData = {};
    weaponCategories.forEach((category) =>
      category.weapons.forEach((weapon) => {
        newTrackerData[weapon.name] = {};
      })
    );
    setTrackerData(newTrackerData);
  };

  const updateCamoStatus = (weapon, camo, status) => {
    setTrackerData((prev) => ({
      ...prev,
      [weapon]: {
        ...prev[weapon],
        [camo]: status,
      },
    }));
  };

  const totalWeapons = weaponCategories.reduce((acc, category) => acc + category.weapons.length, 0);

  const filteredCategories = weaponCategories.map((category) => ({
    ...category,
    weapons: category.weapons.filter((weapon) =>
      weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((category) => category.weapons.length > 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6">COD BO6 Camos Tracker</h1>
      <div className="mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="Search weapons or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 sm:p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
        />
      </div>
      <Counters trackerData={trackerData} totalWeapons={totalWeapons} />
      <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto"
          onClick={resetAllCamouflages}
        >
          Reset All Camos
        </button>
        <div className="flex flex-col sm:flex-row">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-0 sm:mr-2 mb-2 sm:mb-0 w-full sm:w-auto"
            onClick={expandAll}
          >
            Expand All
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
            onClick={collapseAll}
          >
            Collapse All
          </button>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded ml-2 w-full sm:w-auto"
          >
            <option value="none">No Sorting</option>
            <option value="name">Sort by Name</option>
            <option value="progress">Sort by Progress</option>
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <WeaponCategory
            key={category.name}
            category={category}
            weapons={category.weapons}
            trackerData={trackerData}
            updateCamoStatus={updateCamoStatus}
            isExpanded={expandedCategories[category.name] || false}
            toggleCategory={toggleCategory}
            expandedWeapons={expandedWeapons}
            toggleWeapon={toggleWeapon}
            sortOption={sortOption}
          />
        ))}
      </div>
    </div>
  );
}