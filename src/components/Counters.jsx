import React from 'react';
import { weaponCategories, challengesData } from '../constants/weaponData';

function Counters({ trackerData, totalWeapons }) {
  const camoCounts = {
    Gold: 0,
    Diamond: 0,
    'Dark Spine': 0,
    'Dark Matter': 0,
  };

  weaponCategories.forEach((category) =>
    category.weapons.forEach((weapon) => {
      const weaponData = trackerData[weapon.name] || {};
      ['Gold', 'Diamond', 'Dark Spine', 'Dark Matter'].forEach((camo) => {
        if (weaponData[camo]) camoCounts[camo]++;
      });
    })
  );

  const camoImages = {
    Gold: challengesData['XM4']?.find((c) => c.name === 'Gold')?.image || 'https://via.placeholder.com/50',
    Diamond: challengesData['XM4']?.find((c) => c.name === 'Diamond')?.image || 'https://via.placeholder.com/50',
    'Dark Spine': challengesData['XM4']?.find((c) => c.name === 'Dark Spine')?.image || 'https://via.placeholder.com/50',
    'Dark Matter': challengesData['XM4']?.find((c) => c.name === 'Dark Matter')?.image || 'https://via.placeholder.com/50',
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">Overall Progress</h2>
      <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-2 sm:mb-4">
        <div
          className="bg-gray-700 p-2 sm:p-4 rounded-lg text-yellow-400 relative overflow-hidden"
          style={{
            backgroundImage: `url(${camoImages.Gold})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <p className="text-base sm:text-lg font-medium">Gold</p>
            <p className="text-sm sm:text-base">{camoCounts.Gold}/{totalWeapons}</p>
          </div>
        </div>
        <div
          className="bg-gray-700 p-2 sm:p-4 rounded-lg text-blue-300 relative overflow-hidden"
          style={{
            backgroundImage: `url(${camoImages.Diamond})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <p className="text-base sm:text-lg font-medium">Diamond</p>
            <p className="text-sm sm:text-base">{camoCounts.Diamond}/{totalWeapons}</p>
          </div>
        </div>
        <div
          className="bg-gray-700 p-2 sm:p-4 rounded-lg text-purple-400 relative overflow-hidden"
          style={{
            backgroundImage: `url(${camoImages['Dark Spine']})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <p className="text-base sm:text-lg font-medium">Dark Spine</p>
            <p className="text-sm sm:text-base">{camoCounts['Dark Spine']}/{totalWeapons}</p>
          </div>
        </div>
        <div
          className="bg-gray-700 p-2 sm:p-4 rounded-lg text-red-500 relative overflow-hidden"
          style={{
            backgroundImage: `url(${camoImages['Dark Matter']})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">
            <p className="text-base sm:text-lg font-medium">Dark Matter</p>
            <p className="text-sm sm:text-base">{camoCounts['Dark Matter']}/{totalWeapons}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counters;
