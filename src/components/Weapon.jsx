import React from 'react';
import { challengesData, weaponCategories } from '../constants/weaponData';
import { getCountingCategories, getGoldRequirement } from '../constants/categoryRequirements';

export default function Weapon({ weapon, trackerData, updateCamoStatus, isExpanded, toggleWeapon, setAllCamosStatus }) {
  const weaponChallenges = challengesData[weapon.name] || [];
  
  // Find which category this weapon belongs to
  const findWeaponCategory = () => {
    for (const category of weaponCategories) {
      if (category.weapons.some(w => w.name === weapon.name)) {
        return category.name;
      }
    }
    return null;
  };
  
  const weaponCategory = findWeaponCategory();
  
  // Function to check if a camo is available based on requirements
  const isCamoAvailable = (camoName) => {
    // Base camos are always available
    if (camoName !== 'Diamond' && camoName !== 'Dark Spine' && camoName !== 'Dark Matter') {
      return true;
    }
    
    // Logic for Diamond camo availability
    if (camoName === 'Diamond') {
      if (!weaponCategory) return false;
      
      // Create temporary data with this weapon marked as Gold
      const tempData = { ...trackerData, Gold: true };
      
      // Count gold weapons in relevant categories
      const countingCategories = getCountingCategories(weaponCategory);
      let goldCount = 0;
      
      // Count gold weapons across all relevant categories
      for (const category of weaponCategories) {
        if (!countingCategories.includes(category.name)) continue;
        
        for (const w of category.weapons) {
          // If it's the current weapon, use our temp data
          if (w.name === weapon.name) {
            if (tempData.Gold) goldCount++;
          } 
          // Otherwise check the tracker data
          else if (trackerData[w.name]?.Gold) {
            goldCount++;
          }
        }
      }
      
      return goldCount >= getGoldRequirement(weaponCategory);
    }
    
    // Logic for Dark Spine camo availability
    if (camoName === 'Dark Spine') {
      // For Dark Spine, check if 33 weapons have Diamond
      let diamondCount = 0;
      for (const category of weaponCategories) {
        for (const w of category.weapons) {
          if (w.name === weapon.name) {
            // For this weapon, we'll assume it has Diamond
            if (trackerData.Diamond || trackerData.Gold) diamondCount++;
          } else if (trackerData[w.name]?.Diamond) {
            diamondCount++;
          }
        }
      }
      return diamondCount >= 33;
    }
    
    // Logic for Dark Matter camo availability
    if (camoName === 'Dark Matter') {
      // For Dark Matter, check if 33 weapons have Dark Spine
      let darkSpineCount = 0;
      for (const category of weaponCategories) {
        for (const w of category.weapons) {
          if (w.name === weapon.name) {
            // For this weapon, we'll assume it has Dark Spine
            if (trackerData['Dark Spine'] || trackerData.Diamond) darkSpineCount++;
          } else if (trackerData[w.name]?.['Dark Spine']) {
            darkSpineCount++;
          }
        }
      }
      return darkSpineCount >= 33;
    }
    
    return false;
  };
  
  // Calculate for button behavior - only available camos
  const availableCamos = weaponChallenges.filter(camo => isCamoAvailable(camo.name));
  const availableCompletedCount = availableCamos.filter(camo => trackerData[camo.name]).length;
  
  // Calculate for display - all camos regardless of availability
  const totalCompletedCount = weaponChallenges.filter(camo => trackerData[camo.name]).length;
  const totalCamosCount = weaponChallenges.length;
  
  // Only available camos affect the "all completed" state (for button toggling)
  const allCamosCompleted = availableCamos.length > 0 && 
    availableCamos.every(camo => trackerData[camo.name]);
  
  // For the progress bar, use percentage based on all camos (for display)
  const completionPercentage = totalCamosCount > 0 ? (totalCompletedCount / totalCamosCount) * 100 : 0;
  
  const completeAllCamos = () => {
    const newStatus = !allCamosCompleted;
    setAllCamosStatus(weapon.name, newStatus);
  };

  // Check if weapon image is empty or 0
  const hasWeaponImage = weapon.image && weapon.image !== 0;

  return (
    <div className="bg-gray-700 rounded-lg shadow-md transition-all duration-200 overflow-hidden">
      {/* Header with name and image */}
      <div
        className="flex items-center justify-between p-2 sm:p-3 border-b border-gray-600 cursor-pointer hover:bg-gray-600 active:bg-gray-650 transition-colors"
        onClick={() => toggleWeapon(weapon.name)}
      >
        <div className="flex items-center w-full space-x-3 sm:space-x-4">
          <div className="relative">
            {hasWeaponImage ? (
              <img
                src={weapon.image}
                alt={weapon.name}
                className="h-16 sm:h-20 md:h-24 lg:h-28 object-contain rounded max-w-[80px] sm:max-w-[100px] md:max-w-[120px]"
              />
            ) : (
              <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-[80px] sm:w-[100px] md:w-[120px] bg-gray-800 rounded flex items-center justify-center">
                <span className="text-gray-500 text-xs">{weapon.name.slice(0, 1)}</span>
              </div>
            )}
            
            {/* Progress indicator - uses totalCompletedCount for display */}
            {totalCompletedCount > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-600 rounded-b overflow-hidden">
                <div 
                  className="h-full bg-green-500" 
                  style={{ width: `${completionPercentage}%` }}
                  title={`${totalCompletedCount}/${totalCamosCount} completed (${Math.round(completionPercentage)}%)`}
                ></div>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center min-w-0 flex-1 pl-1">
            <span className="font-semibold text-sm sm:text-base md:text-lg whitespace-normal break-words">
              {weapon.name}
            </span>
            <div className="text-xs text-gray-400">
              {/* Display shows total counts */}
              {totalCompletedCount}/{totalCamosCount} camos
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
              {weaponChallenges.map((camo) => {
                // Check if camo image is empty or 0
                const hasCamoImage = camo.image && camo.image !== 0;
                
                return (
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
                      {hasCamoImage ? (
                        <img
                          src={camo.image}
                          alt={camo.name}
                          className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded transition-all duration-200 ${
                            trackerData[camo.name] ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'
                          }`}
                        />
                      ) : (
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded bg-gray-800 flex items-center justify-center transition-all duration-200 ${
                            trackerData[camo.name] ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'
                          }`}>
                          <span className="text-gray-500 text-xs">{camo.name.slice(0, 1)}</span>
                        </div>
                      )}
                      
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
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400 text-xs sm:text-sm">No challenges available</p>
          )}
        </div>
      </div>
    </div>
  );
}