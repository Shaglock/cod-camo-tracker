import React, { useState, useEffect } from 'react';
import WeaponCategory from './WeaponCategory';
import Counters from './Counters';
import SetActions from './SetActions';
import ExpandCollapseActions from './ExpandCollapseActions';
import ImportExportActions from './ImportExportActions';
import { weaponCategories, challengesData } from '../constants/weaponData';
import { getCountingCategories, getGoldRequirement } from '../constants/categoryRequirements';

export default function AppWrapper() {
  const [camoSets, setCamoSets] = useState(() => {
    const saved = localStorage.getItem('camoSets');
    return saved ? JSON.parse(saved) : [{ id: 'default', name: 'Default', data: {} }];
  });
  
  // Initialize activeSetId with the value from localStorage, or the first available set, or 'default'
  const [activeSetId, setActiveSetId] = useState(() => {
    const savedSetId = localStorage.getItem('activeSetId');
    const savedSets = JSON.parse(localStorage.getItem('camoSets') || '[]');
    
    // Check if the saved set ID exists in the available sets
    if (savedSetId && savedSets.some(set => set.id === savedSetId)) {
      return savedSetId;
    }
    // Otherwise return the first available set ID or 'default'
    return savedSets.length > 0 ? savedSets[0].id : 'default';
  });
  
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedWeapons, setExpandedWeapons] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('none');

  useEffect(() => {
    localStorage.setItem('camoSets', JSON.stringify(camoSets));
  }, [camoSets]);

  // Save activeSetId to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeSetId', activeSetId);
  }, [activeSetId]);

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

  // Count gold weapons by category in the current active set
  const getGoldWeaponCountByCategory = (categoryName) => {
    const activeSet = camoSets.find((set) => set.id === activeSetId);
    if (!activeSet) return 0;
    
    // Get all categories that contribute to this category's diamond requirement
    const countingCategories = getCountingCategories(categoryName);
    
    // Find all weapons in these categories
    const relevantWeapons = weaponCategories
      .filter(cat => countingCategories.includes(cat.name))
      .flatMap(cat => cat.weapons);
    
    // Count weapons with gold status
    return relevantWeapons.filter(weapon => 
      activeSet.data[weapon.name]?.['Gold']
    ).length;
  };

  // Check if a category has enough gold weapons to unlock diamond
  const canUnlockDiamond = (categoryName) => {
    const goldCount = getGoldWeaponCountByCategory(categoryName);
    const requirement = getGoldRequirement(categoryName);
    return goldCount >= requirement;
  };

  // Count weapons with a specific camo across all categories
  const getWeaponCountWithCamo = (camoName) => {
    const activeSet = camoSets.find((set) => set.id === activeSetId);
    if (!activeSet) return 0;
    
    // Get all weapons across all categories
    const allWeapons = weaponCategories.flatMap(cat => cat.weapons);
    
    // Count weapons with the specified camo
    return allWeapons.filter(weapon => 
      activeSet.data[weapon.name]?.[camoName]
    ).length;
  };

  // Check if there are enough weapons with a specific camo
  const hasEnoughWeaponsWithCamo = (camoName, requiredCount) => {
    const count = getWeaponCountWithCamo(camoName);
    return count >= requiredCount;
  };

  const updateCamoStatus = (weapon, camo, status) => {
    const activeSet = camoSets.find((set) => set.id === activeSetId);
    const currentData = activeSet.data[weapon] || {};
    const weaponChallenges = challengesData[weapon] || [];
    const specialCamos = weaponChallenges
      .filter((c) => !['Gold', 'Diamond', 'Dark Spine', 'Dark Matter'].includes(c.name))
      .map((c) => c.name);

    let updatedData = { ...currentData };

    // Find the weapon's category
    let weaponCategory = null;
    for (const category of weaponCategories) {
      if (category.weapons.some(w => w.name === weapon)) {
        weaponCategory = category.name;
        break;
      }
    }

    const camoHierarchy = {
      'Gold': specialCamos,
      'Diamond': ['Gold'],
      'Dark Spine': ['Diamond'],
      'Dark Matter': ['Dark Spine'],
    };

    if (status) {
      // If trying to enable Diamond, check if enough Gold weapons in category
      if (camo === 'Diamond' && weaponCategory) {
        // First, temporarily mark this weapon's Gold as true to include it in the count
        const tempData = { 
          ...activeSet.data,
          [weapon]: { ...currentData, Gold: true } 
        };
        
        // Create a custom function to count with our temporary data
        const countGoldInCategory = (catName) => {
          const countingCategories = getCountingCategories(catName);
          const relevantWeapons = weaponCategories
            .filter(cat => countingCategories.includes(cat.name))
            .flatMap(cat => cat.weapons);
          
          return relevantWeapons.filter(w => 
            tempData[w.name]?.['Gold']
          ).length;
        };
        
        const goldCount = countGoldInCategory(weaponCategory);
        const requirement = getGoldRequirement(weaponCategory);
        
        if (goldCount < requirement) {
          alert(`You need Gold camo on ${requirement} weapons in the ${weaponCategory} category to unlock Diamond.`);
          return; // Stop the update if requirement not met
        }
      }
      
      // If trying to enable Dark Spine, check if there are 33 Diamond weapons
      if (camo === 'Dark Spine') {
        // Create temporary data with this weapon as Diamond
        const tempData = { 
          ...activeSet.data,
          [weapon]: { ...currentData, Diamond: true, Gold: true } 
        };
        
        // Count Diamond weapons with our temporary data
        const allWeapons = weaponCategories.flatMap(cat => cat.weapons);
        const diamondCount = allWeapons.filter(w => 
          w.name === weapon ? tempData[w.name]?.['Diamond'] : activeSet.data[w.name]?.['Diamond']
        ).length;
        
        const DARK_SPINE_REQUIREMENT = 33;
        if (diamondCount < DARK_SPINE_REQUIREMENT) {
          alert(`You need Diamond camo on at least ${DARK_SPINE_REQUIREMENT} weapons to unlock Dark Spine.`);
          return; // Stop the update if requirement not met
        }
      }
      
      // If trying to enable Dark Matter, check if there are 33 Dark Spine weapons
      if (camo === 'Dark Matter') {
        // Create temporary data with this weapon as Dark Spine
        const tempData = { 
          ...activeSet.data,
          [weapon]: { ...currentData, 'Dark Spine': true, Diamond: true, Gold: true } 
        };
        
        // Count Dark Spine weapons with our temporary data
        const allWeapons = weaponCategories.flatMap(cat => cat.weapons);
        const darkSpineCount = allWeapons.filter(w => 
          w.name === weapon ? tempData[w.name]?.['Dark Spine'] : activeSet.data[w.name]?.['Dark Spine']
        ).length;
        
        const DARK_MATTER_REQUIREMENT = 33;
        if (darkSpineCount < DARK_MATTER_REQUIREMENT) {
          alert(`You need Dark Spine camo on at least ${DARK_MATTER_REQUIREMENT} weapons to unlock Dark Matter.`);
          return; // Stop the update if requirement not met
        }
      }

      // Regular hierarchy logic for prerequisites
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
      // Regular hierarchy logic for dependents
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

    // Find the weapon's category
    let weaponCategory = null;
    for (const category of weaponCategories) {
      if (category.weapons.some(w => w.name === weapon)) {
        weaponCategory = category.name;
        break;
      }
    }

    if (status) {
      // We always allow setting basic camos and Gold
      weaponChallenges
        .filter(c => c.name !== 'Diamond' && c.name !== 'Dark Spine' && c.name !== 'Dark Matter')
        .forEach(camo => {
          updatedData[camo.name] = status;
        });
      
      // For Diamond, check requirements
      if (weaponChallenges.some(c => c.name === 'Diamond') && weaponCategory) {
        // First, mark this weapon's Gold as true
        updatedData['Gold'] = true;
        
        // Create a temporary data set with our changes so far
        const tempData = { 
          ...activeSet.data,
          [weapon]: updatedData
        };
        
        // Check if category meets gold requirements for diamond
        const countGoldInCategory = (catName) => {
          const countingCategories = getCountingCategories(catName);
          const relevantWeapons = weaponCategories
            .filter(cat => countingCategories.includes(cat.name))
            .flatMap(cat => cat.weapons);
          
          return relevantWeapons.filter(w => 
            w.name === weapon ? tempData[w.name]?.['Gold'] : activeSet.data[w.name]?.['Gold']
          ).length;
        };
        
        const goldCount = countGoldInCategory(weaponCategory);
        const requirement = getGoldRequirement(weaponCategory);
        
        // Can we enable Diamond?
        if (goldCount >= requirement) {
          updatedData['Diamond'] = status;
          
          // Check if we can enable Dark Spine (33 Diamond weapons)
          const tempDataWithDiamond = {
            ...activeSet.data,
            [weapon]: { ...updatedData }
          };
          
          const diamondCount = weaponCategories.flatMap(cat => cat.weapons).filter(w => 
            w.name === weapon ? tempDataWithDiamond[w.name]?.['Diamond'] : activeSet.data[w.name]?.['Diamond']
          ).length;
          
          const DARK_SPINE_REQUIREMENT = 33;
          if (diamondCount >= DARK_SPINE_REQUIREMENT) {
            updatedData['Dark Spine'] = status;
            
            // Check if we can enable Dark Matter (33 Dark Spine weapons)
            const tempDataWithDarkSpine = {
              ...activeSet.data,
              [weapon]: { ...updatedData }
            };
            
            const darkSpineCount = weaponCategories.flatMap(cat => cat.weapons).filter(w => 
              w.name === weapon ? tempDataWithDarkSpine[w.name]?.['Dark Spine'] : activeSet.data[w.name]?.['Dark Spine']
            ).length;
            
            const DARK_MATTER_REQUIREMENT = 33;
            if (darkSpineCount >= DARK_MATTER_REQUIREMENT) {
              updatedData['Dark Matter'] = status;
            }
          }
        }
      }
    } else {
      // When uncompleting camos, apply to all without restrictions
      weaponChallenges.forEach(camo => {
        updatedData[camo.name] = status;
      });
    }

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
      // If we're deleting the active set, switch to the first available set
      if (id === activeSetId) {
        setActiveSetId(newCamoSets[0].id);
      }
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

  // Import sets handler
  const importSets = (newSets) => {
    if (!newSets || !newSets.length) {
      alert('No sets found in the import file.');
      return;
    }

    // Ask the user if they want to replace or add to existing sets
    const action = window.confirm(
      `Do you want to replace your existing sets with the imported sets?\n\n` +
      `Click "OK" to replace all existing sets.\n` +
      `Click "Cancel" to add the imported sets to your existing collection.`
    );

    // Check for duplicate names and add a suffix if needed
    const ensureUniqueName = (name, existingSets) => {
      let uniqueName = name;
      let counter = 1;
      while (existingSets.some(set => set.name === uniqueName)) {
        uniqueName = `${name} (${counter})`;
        counter++;
      }
      return uniqueName;
    };

    // Generate new IDs for imported sets to avoid conflicts
    const processedSets = newSets.map(set => {
      const newId = `set_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      return {
        ...set,
        id: newId
      };
    });

    if (action) {
      // Replace all sets
      setCamoSets(processedSets);
      setActiveSetId(processedSets[0].id);
    } else {
      // Add to existing sets, ensuring unique names
      const updatedSets = [...camoSets];
      
      processedSets.forEach(newSet => {
        const uniqueName = ensureUniqueName(newSet.name, updatedSets);
        updatedSets.push({
          ...newSet,
          name: uniqueName
        });
      });
      
      setCamoSets(updatedSets);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6">COD BO6 Camos Tracker</h1>
      
      {/* Overall progress */}
      <Counters trackerData={activeTrackerData} totalWeapons={totalWeapons} />
      
      {/* Search and set actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="w-full sm:flex-1">
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
      
      {/* Import/Export and Reset/Expand actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <div className="flex flex-row items-center gap-2 w-full sm:w-auto">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded h-10 text-sm flex items-center justify-center"
            onClick={resetAllCamouflages}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Reset All Camos
          </button>
          
          <ImportExportActions 
            camoSets={camoSets}
            importSets={importSets}
          />
        </div>
        
        <ExpandCollapseActions 
          expandAllCategories={expandAllCategories}
          collapseAllCategories={collapseAllCategories}
          expandAllWeapons={expandAllWeapons}
          collapseAllWeapons={collapseAllWeapons}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </div>
      
      {/* Weapon categories */}
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