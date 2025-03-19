// Configuration for how many gold weapons are required in each category to unlock diamond

export const categoryRequirements = {
  'Assault Rifle': 7,
  'SMG': 6,
  'LMG': 3,
  'Shotgun': 2,
  'Pistol': 4,
  'Marksman Rifle': 4,
  'Sniper': 3,
  'Melee': 2,
  // Special categories that are merged for requirements
  'Launcher': 2,
  'Special': 2
};

// Helper to handle merged categories (Launchers and Special share the same requirement)
export const mergedCategories = {
  'Launcher': ['Launcher', 'Special'],
  'Special': ['Launcher', 'Special']
};

// Get the categories that count toward a specific category's requirements
export const getCountingCategories = (categoryName) => {
  return mergedCategories[categoryName] || [categoryName];
};

// Get the gold requirement for a category
export const getGoldRequirement = (categoryName) => {
  return categoryRequirements[categoryName] || 0;
};
