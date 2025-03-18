import React from 'react';
import Weapon from './Weapon';
import { defaultCamos } from '../constants/weaponData';

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
}) {
  const categoryProgress = defaultCamos.reduce((acc, camo) => {
    acc[camo] = weapons.filter((weapon) => trackerData[weapon.name]?.[camo] || false).length;
    return acc;
  }, {});

  // Sort weapons based on sortOption, default to original order if 'none'
  const sortedWeapons = sortOption === 'none' ? weapons : [...weapons].sort((a, b) => {
    if (sortOption === 'progress') {
      const aProgress = defaultCamos.filter((camo) => trackerData[a.name]?.[camo] || false).length;
      const bProgress = defaultCamos.filter((camo) => trackerData[b.name]?.[camo] || false).length;
      return bProgress - aProgress; // Descending order by progress
    } else if (sortOption === 'name') {
      return a.name.localeCompare(b.name); // Alphabetical order
    }
    return 0; // No change for 'none'
  });

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      <button
        className="w-full text-left p-3 sm:p-4 font-semibold text-lg sm:text-xl flex justify-between items-center"
        onClick={() => toggleCategory(category.name)}
      >
        <span>
          {category.name} ({category.weapons.length})
          <span className="ml-1 sm:ml-2 text-sm sm:text-base text-gray-400">
            {defaultCamos.map((camo) => `${categoryProgress[camo]}/${category.weapons.length} ${camo}`).join(' - ')}
          </span>
        </span>
        <span>{isExpanded ? '▲' : '▼'}</span>
      </button>
      {isExpanded && (
        <div className="p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {sortedWeapons.map((weapon) => (
            <Weapon
              key={weapon.name}
              weapon={weapon}
              trackerData={trackerData[weapon.name] || {}}
              updateCamoStatus={updateCamoStatus}
              isExpanded={expandedWeapons[weapon.name] || false}
              toggleWeapon={toggleWeapon}
            />
          ))}
        </div>
      )}
    </div>
  );
}

