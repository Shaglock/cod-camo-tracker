import React, { useState, useEffect } from 'react';
import WeaponCategory from './WeaponCategory';
import Counters from './Counters';
import SetActions from './SetActions';
import ExpandCollapseActions from './ExpandCollapseActions';
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
      .map((c) => c.name);

    let updatedData = { ...currentData };

    const camoHierarchy = {
      'Gold': specialCamos,
      'Diamond': ['Gold'],
      'Dark Spine': ['Diamond'],
      'Dark Matter': ['Dark Spine'],
    };

    if (status) {
      const prereqs = new Set();
      const findPrereqs = (targetCamo) => {
        if (camoHierarchy[targetCamo]) {
          camoHierarchy[targetCamo].forEach((prereq) => {
            prereqs.add(prereq);
            findPrereqs(prereq);
          });
        }
      };
      findPrereqs(camo);
      prereqs.forEach((prereq) => {
        updatedData[prereq] = true;
      });
      updatedData[camo] = true;
    } else {
      const dependents = new Set();
      const findDependents = (targetCamo) => {
        Object.keys(camoHierarchy).forEach((key) => {
          if (camoHierarchy[key].includes(targetCamo)) {
            dependents.add(key);
            findDependents(key);
          };
        });
      };
      findDependents(camo);
      dependents.forEach((dep) => {
        updatedData[dep] = false;
      });
      updatedData[camo] = false;
    }

    const newCamoSets = camoSets.map((set) =>
      set.id === activeSetId
        ? { ...set, data: { ...activeSet.data, [weapon]: updatedData } }
        : set
    );
    setCamoSets(newCamoSets);
  };

  const setAllCamosStatus = (weapon, status) => {
    const activeSet = camoSets.find((set) => set.id === activeSetId);
    const weaponChallenges = challengesData[weapon] || [];
    const updatedData = { ...activeSet.data[weapon] || {} };

    weaponChallenges.forEach((camo) => {
      updatedData[camo.name] = status;
    });

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
      
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search weapons or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 sm:p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
          />
        </div>
        
        <SetActions
          camoSets={camoSets}
          activeSetId={activeSetId}
          setActiveSetId={setActiveSetId}
          addNewCamoSet={addNewCamoSet}
          duplicateCamoSet={duplicateCamoSet}
          deleteCamoSet={deleteCamoSet}
        />
      </div>
      
      <Counters trackerData={activeTrackerData} totalWeapons={totalWeapons} />
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-10 text-sm flex items-center justify-center"
          onClick={resetAllCamouflages}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6" />
          </svg>
          Reset All Camos
        </button>
        
        <ExpandCollapseActions 
          expandAllCategories={expandAllCategories}
          collapseAllCategories={collapseAllCategories}
          expandAllWeapons={expandAllWeapons}
          collapseAllWeapons={collapseAllWeapons}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
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
            camoSets={camoSets}
            activeSetId={activeSetId}
            setCamoSets={setCamoSets}
            setAllCamosStatus={setAllCamosStatus}
          />
        ))}
      </div>
    </div>
  );
}