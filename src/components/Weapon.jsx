import React from 'react';
import { challengesData } from '../constants/weaponData';

export default function Weapon({ weapon, trackerData, updateCamoStatus, isExpanded, toggleWeapon, setAllCamosStatus }) {
  const weaponChallenges = challengesData[weapon.name] || [];
  const allCamosCompleted = weaponChallenges.length > 0 && weaponChallenges.every((camo) => trackerData[camo.name]);
  
  // Calculate completion percentage
  const completedCount = weaponChallenges.filter(camo => trackerData[camo.name]).length;
  const totalCamos = weaponChallenges.length;
  const completionPercentage = totalCamos > 0 ? (completedCount / totalCamos) * 100 : 0;
  
  const completeAllCamos = () => {
    const newStatus = !allCamosCompleted; // Toggle based on current state
    setAllCamosStatus(weapon.name, newStatus);
  };

  return (
    <div className="bg-gray-700 rounded-lg shadow-md transition-all duration-200 overflow-hidden">
      {/* Header with name and image */}
      <div
        className="flex items-center justify-between p-2 sm:p-3 border-b border-gray-600 cursor-pointer hover:bg-gray-600 active:bg-gray-650 transition-colors"
        onClick={() => toggleWeapon(weapon.name)}
      >
        <div className="flex items-center w-full space-x-3 sm:space-x-4">
          <div className="relative">
            <img
              src={weapon.image || 'https://via.placeholder.com/1600x480'}
              alt={weapon.name}
              className="h-16 sm:h-20 md:h-24 lg:h-28 object-contain rounded max-w-[80px] sm:max-w-[100px] md:max-w-[120px]"
            />
            {/* Progress indicator */}
            {completedCount > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-600 rounded-b overflow-hidden">
                <div 
                  className="h-full bg-green-500" 
                  style={{ width: `${completionPercentage}%` }}
                  title={`${completedCount}/${totalCamos} completed (${Math.round(completionPercentage)}%)`}
                ></div>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center min-w-0 flex-1 pl-1">
            <span className="font-semibold text-sm sm:text-base md:text-lg whitespace-normal break-words">
              {weapon.name}
            </span>
            <div className="text-xs text-gray-400">
              {completedCount}/{totalCamos} camos
            </div>
          </div>
        </div>
        <span
          className={`text-sm sm:text-base md:text-lg transform transition-transform duration-300 cursor-pointer text-gray-400 ml-2 flex-shrink-0 ${
            isExpanded ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
      
      {/* Expanded content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-2 sm:p-3">
          <button
            className={`${
              allCamosCompleted
                ? 'bg-indigo-700 hover:bg-indigo-800'
                : 'bg-indigo-500 hover:bg-indigo-600'
            } text-white font-semibold py-1 px-2 rounded text-xs mb-2 h-7 flex items-center justify-center w-full`}
            onClick={(e) => {
              e.stopPropagation();
              completeAllCamos();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {allCamosCompleted ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              )}
            </svg>
            {allCamosCompleted ? 'Uncomplete All Camos' : 'Complete All Camos'}
          </button>
          
          {/* Camos grid */}
          {weaponChallenges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {weaponChallenges.map((camo) => (
                <div
                  key={camo.name}
                  className={`flex items-center space-x-2 sm:space-x-3 group cursor-pointer p-1 rounded-md transition-colors ${
                    trackerData[camo.name] 
                      ? 'bg-gray-600' 
                      : 'hover:bg-gray-600 active:bg-gray-650'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateCamoStatus(weapon.name, camo.name, !trackerData[camo.name]);
                  }}
                >
                  <div className="relative">
                    <img
                      src={camo.image || 'https://via.placeholder.com/50'}
                      alt={camo.name}
                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded transition-all duration-200 ${
                        trackerData[camo.name] ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'
                      }`}
                    />
                    {trackerData[camo.name] && (
                      <div className="absolute -top-1 -right-1 bg-indigo-500 rounded-full p-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
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
      </div>
    </div>
  );
}