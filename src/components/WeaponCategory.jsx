import React from 'react';
import Weapon from './Weapon';
import { defaultCamos, challengesData } from '../constants/weaponData';

export default function WeaponCategory({
  category,
  weapons,
  trackerData,
  updateCamoStatus,
  isExpanded,
  toggleCategory,
  expandedWeapons,
  toggleWeapon,
  sortOption,
  camoSets,
  activeSetId,
  setCamoSets,
  setAllCamosStatus,
}) {
  const categoryProgress = defaultCamos.reduce((acc, camo) => {
    acc[camo] = weapons.filter((weapon) => trackerData[weapon.name]?.[camo] || false).length;
    return acc;
  }, {});

  const sortedWeapons = sortOption === 'none' ? weapons : [...weapons].sort((a, b) => {
    if (sortOption === 'progress') {
      const aProgress = defaultCamos.filter((camo) => trackerData[a.name]?.[camo] || false).length;
      const bProgress = defaultCamos.filter((camo) => trackerData[b.name]?.[camo] || false).length;
      return bProgress - aProgress;
    } else if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const allWeaponsCompleted = weapons.every((weapon) => {
    const weaponChallenges = challengesData[weapon.name] || [];
    return weaponChallenges.every((camo) => trackerData[weapon.name]?.[camo.name]);
  });

  const completeAllWeaponsCamos = () => {
    const activeSet = camoSets.find((set) => set.id === activeSetId);
    let updatedData = { ...activeSet.data };
    const newStatus = !allWeaponsCompleted; // Toggle based on current state

    weapons.forEach((weapon) => {
      const weaponChallenges = challengesData[weapon.name] || [];
      updatedData[weapon.name] = updatedData[weapon.name] || {};
      weaponChallenges.forEach((camo) => {
        updatedData[weapon.name][camo.name] = newStatus;
      });
    });

    const newCamoSets = camoSets.map((set) =>
      set.id === activeSetId ? { ...set, data: updatedData } : set
    );
    setCamoSets(newCamoSets);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg transition-all duration-300 overflow-hidden">
      <div
        className="flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-gray-700 transition-colors"
        onClick={() => toggleCategory(category.name)}
      >
        <div className="flex items-center">
          <span
            className={`mr-2 transition-transform duration-300 text-gray-400 ${
              isExpanded ? 'rotate-90' : 'rotate-0'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span className="font-semibold text-lg sm:text-xl">
            {category.name} ({category.weapons.length})
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-1">
            {defaultCamos.map((camo, index) => (
              <React.Fragment key={camo}>
                {index > 0 && <span className="text-gray-500">-</span>}
                <span className="text-sm text-gray-400">
                  {categoryProgress[camo]}/{category.weapons.length} {camo}
                </span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex sm:hidden items-center">
            <span className="text-sm text-gray-400">
              {categoryProgress['Gold']}/{category.weapons.length} Gold
            </span>
          </div>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-2 sm:p-4 border-t border-gray-700">
          <button
            className={`${
              allWeaponsCompleted
                ? 'bg-indigo-700 hover:bg-indigo-800'
                : 'bg-indigo-500 hover:bg-indigo-600'
            } text-white font-bold py-1 px-2 rounded text-xs sm:text-sm mb-4 h-8 flex items-center justify-center`}
            onClick={(e) => {
              e.stopPropagation();
              completeAllWeaponsCamos();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {allWeaponsCompleted ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              )}
            </svg>
            {allWeaponsCompleted ? 'Uncomplete All Weapons Camos' : 'Complete All Weapons Camos'}
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {sortedWeapons.map((weapon) => (
              <Weapon
                key={weapon.name}
                weapon={weapon}
                trackerData={trackerData[weapon.name] || {}}
                updateCamoStatus={updateCamoStatus}
                isExpanded={expandedWeapons[weapon.name] || false}
                toggleWeapon={toggleWeapon}
                setAllCamosStatus={setAllCamosStatus}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}