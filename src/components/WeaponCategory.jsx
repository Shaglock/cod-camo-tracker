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
    <div className="bg-gray-800 rounded-lg shadow-lg transition-all duration-300">
      <div
        className="flex items-center justify-between p-3 sm:p-4 cursor-pointer"
        onClick={() => toggleCategory(category.name)}
      >
        <span className="font-semibold text-lg sm:text-xl">
          {category.name} ({category.weapons.length})
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-sm sm:text-base text-gray-400">
            {defaultCamos.map((camo) => `${categoryProgress[camo]}/${category.weapons.length} ${camo}`).join(' - ')}
          </span>
          <span
            className={`ml-2 transform transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          >
            ▼
          </span>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-2 sm:p-4">
          <button
            className={`${
              allWeaponsCompleted
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            } text-white font-bold py-1 px-2 rounded text-xs sm:text-sm mb-4 w-full sm:w-auto`}
            onClick={(e) => {
              e.stopPropagation();
              completeAllWeaponsCamos();
            }}
          >
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
                setAllCamosStatus={setAllCamosStatus} // Ensure it's passed to Weapon
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}