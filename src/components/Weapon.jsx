import React from 'react';
import { challengesData } from '../constants/weaponData';

export default function Weapon({ weapon, trackerData, updateCamoStatus, isExpanded, toggleWeapon, setAllCamosStatus }) {
  const weaponChallenges = challengesData[weapon.name] || [];

  const allCamosCompleted = weaponChallenges.length > 0 && weaponChallenges.every((camo) => trackerData[camo.name]);

  const completeAllCamos = () => {
    const newStatus = !allCamosCompleted; // Toggle based on current state
    setAllCamosStatus(weapon.name, newStatus);
  };

  return (
    <div className="bg-gray-700 rounded-lg shadow-md transition-all duration-200 min-h-[100px] sm:min-h[120px]">
      {/* Header with name and image */}
      <div
        className="flex items-center justify-between p-2 sm:p-3 border-b border-gray-600 cursor-pointer"
        onClick={() => toggleWeapon(weapon.name)}
      >
        <div className="flex items-center w-full space-x-2 sm:space-x-3">
          <img
            src={weapon.image || 'https://via.placeholder.com/1600x480'}
            alt={weapon.name}
            className="h-14 sm:h-16 md:h-20 lg:h-24 object-contain rounded max-w-[50%] sm:max-w[40%]"
          />
          <span className="font-semibold text-sm sm:text-base md:text-lg whitespace-normal break-words flex-1">
            {weapon.name}
          </span>
        </div>
        <span className="text-sm sm:text-base md:text-lg">{isExpanded ? '▲' : '▼'}</span>
      </div>

      {/* Expanded section with Complete All button and challenges */}
      {isExpanded && (
        <div className="p-2 sm:p-3">
          <button
            className={`${
              allCamosCompleted
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            } text-white font-bold py-1 px-2 rounded text-xs sm:text-sm mb-2 w-full sm:w-auto`}
            onClick={(e) => {
              e.stopPropagation();
              completeAllCamos();
            }}
          >
            {allCamosCompleted ? 'Uncomplete All Camos' : 'Complete All Camos'}
          </button>
          {weaponChallenges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {weaponChallenges.map((camo) => (
                <div
                  key={camo.name}
                  className="flex items-center space-x-2 sm:space-x-3 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={camo.image || 'https://via.placeholder.com/50'}
                    alt={camo.name}
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded cursor-pointer transition-opacity duration-200 ${
                      trackerData[camo.name] ? 'opacity-100' : 'opacity-50 group-hover:opacity-75'
                    }`}
                    onClick={() => updateCamoStatus(weapon.name, camo.name, !trackerData[camo.name])}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm md:text-base truncate">
                      {camo.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 group-hover:text-white line-clamp-2">
                      {camo.challenge}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-xs sm:text-sm">No challenges available</p>
          )}
        </div>
      )}
    </div>
  );
}