import React, { useState, useEffect } from 'react';
import WeaponCategory from './WeaponCategory';
import Counters from './Counters';
import { weaponCategories, challengesData } from '../constants/weaponData';

export default function AppWrapper() {
  const [camoSets, setCamoSets] = useState(() => {
    const saved = localStorage.getItem('camoSets');
    return saved ? JSON.parse(saved) : [{ id: 'default', name: 'Default', data: {} }];
  });
  const [activeSetId, setActiveSetId] = useState('default');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedWeapons, setExpandedWeapons] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('none');

  useEffect(() => {
    localStorage.setItem('camoSets', JSON.stringify(camoSets));
  }, [camoSets]);

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

  const expandAllCategories = () =>
    setExpandedCategories(weaponCategories.reduce((acc, cat) => ({ ...acc, [cat.name]: true }), {}));
  const collapseAllCategories = () => setExpandedCategories({});
  const expandAllWeapons = () => {
    const allWeapons = weaponCategories.flatMap((cat) => cat.weapons.map((w) => w.name));
    setExpandedWeapons(allWeapons.reduce((acc, weapon) => ({ ...acc, [weapon]: true }), {}));
  };
  const collapseAllWeapons = () => setExpandedWeapons({});
  const resetAllCamouflages = () => {
    const newCamoSets = camoSets.map((set) =>
      set.id === activeSetId ? { ...set, data: {} } : set
    );
    setCamoSets(newCamoSets);
  };

  const updateCamoStatus = (weapon, camo, status) => {
    const activeSet = camoSets.find((set) => set.id === activeSetId);
    const currentData = activeSet.data[weapon] || {};
    const weaponChallenges = challengesData[weapon] || [];
    const specialCamos = weaponChallenges
      .filter((c) => !['Gold', 'Diamond', 'Dark Spine', 'Dark Matter'].includes(c.name))
      .map((c) => c.name); // All non-standard camos are special

    let updatedData = { ...currentData };

    // Define camo hierarchy with special camos as optional base
    const camoHierarchy = {
      'Gold': specialCamos,
      'Diamond': ['Gold'],
      'Dark Spine': ['Diamond'],
      'Dark Matter': ['Dark Spine'],
    };

    if (status) {
      // When checking a camo, check all prerequisites
      const prereqs = new Set();
      const findPrereqs = (targetCamo) => {
        if (camoHierarchy[targetCamo]) {
          camoHierarchy[targetCamo].forEach((prereq) => {
            prereqs.add(prereq);
            findPrereqs(prereq); // Recursively find all prerequisites
          });
        }
      };
      findPrereqs(camo);
      prereqs.forEach((prereq) => {
        updatedData[prereq] = true;
      });
      updatedData[camo] = true;
    } else {
      // When unchecking a camo, uncheck all dependent camos
      const dependents = new Set();
      const findDependents = (targetCamo) => {
        Object.keys(camoHierarchy).forEach((key) => {
          if (camoHierarchy[key].includes(targetCamo)) {
            dependents.add(key);
            findDependents(key);
          }
        });
      };
      findDependents(camo);
      dependents.forEach((dep) => {
        updatedData[dep] = false;
      });
      updatedData[camo] = false;
    }

    // Ensure the state update works correctly
    const newCamoSets = camoSets.map((set) =>
      set.id === activeSetId
        ? { ...set, data: { ...activeSet.data, [weapon]: updatedData } }
        : set
    );
    setCamoSets(newCamoSets);
  };

  const addNewCamoSet = () => {
    const newName = window.prompt('Enter a name for the new camo set:', `Set ${camoSets.length + 1}`);
    if (newName) {
      const newId = `set_${Date.now()}`;
      const newSet = { id: newId, name: newName.trim() || `Set ${camoSets.length + 1}`, data: {} };
      setCamoSets([...camoSets, newSet]);
      setActiveSetId(newId);
    }
  };

  const duplicateCamoSet = () => {
    const activeSet = camoSets.find((set) => set.id === activeSetId);
    const newName = window.prompt('Enter a name for the duplicated set:', `${activeSet.name} Copy`);
    if (newName) {
      const newId = `set_${Date.now()}`;
      const newSet = { id: newId, name: newName.trim() || `${activeSet.name} Copy`, data: { ...activeSet.data } };
      setCamoSets([...camoSets, newSet]);
      setActiveSetId(newId);
    }
  };

  const deleteCamoSet = (id) => {
    if (camoSets.length > 1) {
      const newCamoSets = camoSets.filter((set) => set.id !== id);
      setCamoSets(newCamoSets);
      setActiveSetId(newCamoSets[0].id);
    }
  };

  const totalWeapons = weaponCategories.reduce((acc, category) => acc + category.weapons.length, 0);

  const filteredCategories = weaponCategories.map((category) => ({
    ...category,
    weapons: category.weapons.filter((weapon) =>
      weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((category) => category.weapons.length > 0);

  const activeTrackerData = camoSets.find((set) => set.id === activeSetId)?.data || {};

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6">COD BO6 Camos Tracker</h1>
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Search weapons or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-auto flex-1 p-2 sm:p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
        />
        <select
          value={activeSetId}
          onChange={(e) => setActiveSetId(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded w-full sm:w-auto"
        >
          {camoSets.map((set) => (
            <option key={set.id} value={set.id}>
              {set.name}
            </option>
          ))}
        </select>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
          onClick={addNewCamoSet}
        >
          New Set
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
          onClick={duplicateCamoSet}
        >
          Duplicate Set
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
          onClick={() => deleteCamoSet(activeSetId)}
          disabled={camoSets.length <= 1}
        >
          Delete Set
        </button>
      </div>
      <Counters trackerData={activeTrackerData} totalWeapons={totalWeapons} />
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
            onClick={expandAllCategories}
          >
            Expand All Categories
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-0 sm:mr-2 mb-2 sm:mb-0 w-full sm:w-auto"
            onClick={collapseAllCategories}
          >
            Collapse All Categories
          </button>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-0 sm:mr-2 mb-2 sm:mb-0 w-full sm:w-auto"
            onClick={expandAllWeapons}
          >
            Expand All Weapons
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
            onClick={collapseAllWeapons}
          >
            Collapse All Weapons
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
            trackerData={activeTrackerData}
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