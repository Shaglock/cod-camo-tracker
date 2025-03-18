# COD BO6 Camos Tracker Documentation
## Overview
The COD BO6 Camos Tracker is a web-based application designed to help players track their progress on camos for weapons in Call of Duty: Black Ops 6. Built with React and styled using Tailwind CSS, the app allows users to manage multiple camo sets, track individual weapon challenges, and visualize their progress. This document outlines the features, usage, and technical details for future reference and maintenance.
## Features
1. Camos Tracking
Individual Camos: Each weapon has a list of camos (e.g., Vengeance, Gold, Diamond, Dark Spine, Dark Matter) with associated challenges (e.g., "Get 20 Kills").

Toggle Completion: Click a camo image to toggle its completion status. When a higher-tier camo (e.g., Diamond) is checked, its prerequisites (e.g., Gold) are automatically checked due to hierarchy logic (except for bulk operations).

Visual Feedback: Completed camos display at full opacity, while incomplete ones are semi-transparent, with a hover effect to indicate interactivity.

2. Camos Sets Management
Multiple Sets: Users can create, duplicate, and delete camo sets to track progress across different playstyles or save points.
New Set: Adds a new set with a user-defined name (defaults to "Set X" if empty).

Duplicate Set: Creates a copy of the current set with a user-defined name (defaults to "[Current Name] Copy").

Delete Set: Removes the current set (disabled if only one set exists to prevent losing all data).

Active Set Selection: A dropdown allows switching between sets, with progress saved to local storage.

Import/Export: Import and export sets as JSON files for backup or sharing.

Persistence: Camos progress is saved to localStorage and persists across page reloads.

3. Category and Weapon Organization
Categories: Weapons are grouped into categories (e.g., Assault Rifles, SMGs), each expandable/collapsible.
Expand/Collapse All Categories: Buttons to expand or collapse all categories.

Weapons: Each category contains expandable weapon cards.
Expand/Collapse All Weapons: Buttons to expand or collapse all weapons within categories.

Search: Filter weapons and categories by name using a search bar.

Sorting: Sort weapons by name or progress using a dropdown (None, Name, Progress).

4. Bulk Completion/Uncompletion
Weapon-Level Toggle: A "Complete All Camos" / "Uncomplete All Camos" button in each weapon's expanded section toggles the completion status of all camos for that weapon.
Behavior: Ignores camo hierarchy, allowing independent completion/uncompletion of all camos.

Visual Cue: Green when incomplete, red when complete.

Category-Level Toggle: A "Complete All Weapons Camos" / "Uncomplete All Weapons Camos" button in each category's expanded section toggles the completion status of all camos for all weapons in that category.
Behavior: Ignores hierarchy, applying the toggle to all camos uniformly.

Visual Cue: Green when incomplete, red when complete.

5. Progress Tracking
Counters: Displays the total number of weapons and the number of completed camos across all weapons.

Category Progress: Shows the number of weapons with each default camo (Gold, Diamond, Dark Spine, Dark Matter) out of the total in the category (e.g., "5/10 Gold").

6. Reset Functionality
Reset All Camos: A button to clear all camo progress for the active set, resetting it to an empty state.

## Usage
Getting Started
Open the app in a web browser.

The most recently used set is loaded by default.

Use the features below to track your camo progress.

Managing Camos Sets
Switch Sets: Use the dropdown to select an existing set.

Create New Set: Click "New Set," enter a name, and switch to it.

Duplicate Set: Click "Duplicate Set," enter a name, and switch to the copy.

Delete Set: Click "Delete Set" (if more than one set exists) to remove the current set.

Import/Export: Use the Import and Export buttons to save your sets to a file or load from a file.

Tracking Camos
Expand a Category: Click the category name or arrow to view weapons.

Expand a Weapon: Click the weapon name or arrow to view camos.

Toggle Camos: Click a camo image to mark it as complete/incomplete (hierarchy applies).

Complete/Uncomplete All: Use the button in the weapon's expanded section to toggle all camos.

Search and Sort: Use the search bar or sort dropdown to organize weapons.

Bulk Actions
Category Toggle: In an expanded category, click the button to complete/uncomplete all camos for all weapons.

Reset: Click "Reset All Camos" to start fresh.

Sharing Progress
Export: Click the "Export" button to save all your camo sets to a JSON file.

Import: Click the "Import" button to load camo sets from a JSON file. Choose to either replace your existing sets or add the imported sets to your collection.

## Technical Details
### Technology Stack
Framework: React

Styling: Tailwind CSS

State Management: React useState and useEffect

Data Persistence: localStorage

### Component Structure
AppWrapper: Main component managing state, sets, and rendering categories.

WeaponCategory: Renders a category with weapons and the category-level toggle button.

Weapon: Renders a weapon with camos and the weapon-level toggle button.

Counters: Displays progress statistics.

ImportExportActions: Handles importing and exporting camo sets.

### Key Functions
updateCamoStatus(weapon, camo, status): Toggles individual camo status with hierarchy logic (prerequisites and dependents).

setAllCamosStatus(weapon, status): Toggles all camos for a weapon without hierarchy logic.

completeAllWeaponsCamos(): Toggles all camos for all weapons in a category without hierarchy logic.

importSets(newSets): Imports camo sets from a JSON file.

exportSets(): Exports current camo sets to a JSON file.

### State Management
camoSets: Array of objects { id, name, data } stored in localStorage.

activeSetId: String identifying the current set, also stored in localStorage.

expandedCategories: Object tracking expanded category states.

expandedWeapons: Object tracking expanded weapon states.

searchTerm: String for filtering weapons/categories.

sortOption: String for sorting weapons ("none", "name", "progress").

### Data Structure
weaponCategories: Array of objects { name, weapons } defining categories and their weapons.

challengesData: Object mapping weapon names to arrays of { name, challenge, image } for camos.

defaultCamos: Array ['Gold', 'Diamond', 'Dark Spine', 'Dark Matter'] for progress tracking.

### Known Limitations
No server-side synchronization (data is local only).

No validation for malformed challengesData (assumes correct structure).

Mobile layout might need further optimization for edge cases.

### Future Enhancements
Implement cloud sync for multi-device use.

Add progress percentages or visual charts.

Support custom challenge inputs.
