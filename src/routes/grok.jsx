
import React, { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/grok')({
  component: AppWrapper,
})

const weaponCategories = [
  {
    name: "Assault Rifle",
    weapons: [
      { name: "XM4", image: "https://assets.codmunity.gg/optimized/XM4-Dark-Spine.webp" },
      { name: "AK-74", image: "https://assets.codmunity.gg/optimized/ak-74-Dark-Spine.webp" },
      { name: "AMES 85", image: "https://assets.codmunity.gg/optimized/AMES-85-Dark-Spine.webp" },
      { name: "GPR 91", image: "https://assets.codmunity.gg/optimized/GPR-91-Dark-Spine.webp" },
      { name: "MODEL L", image: "https://assets.codmunity.gg/optimized/MODEL-L-Dark-Spine.webp" },
      { name: "GOBLIN MK 2", image: "https://assets.codmunity.gg/optimized/GOBLIN-MK-2-Dark-Spine.webp" },
      { name: "AS VAL", image: "https://assets.codmunity.gg/optimized/AS-VAL-Dark-Spine.webp" },
      { name: "KRIG C", image: "https://assets.codmunity.gg/optimized/KRIG-C.webp" },
      { name: "Cypher 091", image: "https://assets.codmunity.gg/optimized/Cypher-091.webp" },
    ],
  },
  {
    name: "SMG",
    weapons: [
      { name: "C9", image: "https://assets.codmunity.gg/optimized/C9-Dark-Spine.webp" },
      { name: "TANTO .22", image: "https://assets.codmunity.gg/optimized/Tanto-.22-Dark-Spine.webp" },
      { name: "JACKAL PDW", image: "https://assets.codmunity.gg/optimized/JACKAL-PDW-Dark-Spine.webp" },
      { name: "KSV", image: "https://assets.codmunity.gg/optimized/KSV-Dark-Spine.webp" },
      { name: "PP-919", image: "https://assets.codmunity.gg/optimized/PP-919-Dark-Spine.webp" },
      { name: "KOMPAKT 92", image: "https://assets.codmunity.gg/optimized/KOMPAKT-92-Dark-Spine.webp" },
      { name: "SAUG", image: "https://assets.codmunity.gg/optimized/SAUG.webp" },
      { name: "PPSh-41", image: "https://assets.codmunity.gg/optimized/PPSh-41.webp" },
    ],
  },
  {
    name: "Shotgun",
    weapons: [
      { name: "MARINE SP", image: "https://assets.codmunity.gg/optimized/Marine-SP-Dark-Spine.webp" },
      { name: "ASG-89", image: "https://assets.codmunity.gg/optimized/ASG-89-Dark-Spine.webp" },
      { name: "Maelstrom", image: "https://assets.codmunity.gg/optimized/Maelstrom.webp" },
    ],
  },
  {
    name: "LMG",
    weapons: [
      { name: "XMG", image: "https://assets.codmunity.gg/optimized/XMG-Dark-Spine.webp" },
      { name: "GPMG-7", image: "https://assets.codmunity.gg/optimized/GPMG-7-Dark-Spine.webp" },
      { name: "PU-21", image: "https://assets.codmunity.gg/optimized/PU-21-Dark-Spine.webp" },
      { name: "Feng 82", image: "https://assets.codmunity.gg/optimized/Feng-82.webp" },
    ],
  },
  {
    name: "Marksman Rifle",
    weapons: [
      { name: "SWAT 5.56", image: "https://assets.codmunity.gg/optimized/SWAFT-5.56-Dark-Spine.webp" },
      { name: "DM-10", image: "https://assets.codmunity.gg/optimized/DM-10-Dark-Spine.webp" },
      { name: "Tsarkov 7.62", image: "https://assets.codmunity.gg/optimized/Tsarkov-7.62-Dark-Spine.webp" },
      { name: "AEK-973", image: "https://assets.codmunity.gg/optimized/AEK-973-Dark-Spine.webp" },
      { name: "TR2", image: "https://assets.codmunity.gg/optimized/TR2.webp" },
    ],
  },
  {
    name: "Sniper",
    weapons: [
      { name: "LR 7.62", image: "https://assets.codmunity.gg/optimized/LR.7-Dark-Spine.webp" },
      { name: "SVD", image: "https://assets.codmunity.gg/optimized/SVD-Dark-Spine.webp" },
      { name: "LW3A1 Frostline", image: "https://assets.codmunity.gg/optimized/LW3A1-Frostline-Dark-Spine.webp" },
      { name: "AMR Mod 4", image: "https://assets.codmunity.gg/optimized/AMR-MOD-4.webp" },
    ],
  },
  {
    name: "Pistol",
    weapons: [
      { name: "GS45", image: "https://assets.codmunity.gg/optimized/Gs45-Dark-Spine.webp" },
      { name: "9MM PM", image: "https://assets.codmunity.gg/optimized/9mm-Dark-Spine.webp" },
      { name: "Grekhova", image: "https://assets.codmunity.gg/optimized/Grekhova-Dark-Spine.webp" },
      { name: "Stryder .22", image: "https://assets.codmunity.gg/optimized/Stryder-.22-Dark-Spine.webp" },
    ],
  },
  {
    name: "Launcher",
    weapons: [
      { name: "CIGMA 2B", image: "https://assets.codmunity.gg/optimized/CIGMA-2B-Dark-Spine.webp" },
      { name: "HE-1", image: "https://assets.codmunity.gg/optimized/HE-1-Dark-Spine.webp" },
    ],
  },
  {
    name: "Melee",
    weapons: [
      { name: "Knife", image: "https://assets.codmunity.gg/optimized/Knife-Dark-Spine.webp" },
      { name: "Baseball Bat", image: "https://assets.codmunity.gg/optimized/Baseball-Bat-Dark-Spine.webp" },
      { name: "Power Drill", image: "https://assets.codmunity.gg/optimized/Power-Drill.webp" },
      { name: "Cleaver", image: "https://assets.codmunity.gg/optimized/Cleaver.webp" },
      { name: "Skateboard", image: 0 },
      { name: "Katanas", image: "https://assets.codmunity.gg/optimized/Katanas.webp" },
      { name: "Bo Staff", image: "https://assets.codmunity.gg/optimized/Bo-Staff.webp" },
      { name: "Nunchaku", image: "https://assets.codmunity.gg/optimized/Nunchaku.webp" },
      { name: "Sai", image: "https://assets.codmunity.gg/optimized/Sai.webp" },
    ],
  },
  {
    name: "Special",
    weapons: [
      { name: "Sirin 9mm", image: "https://assets.codmunity.gg/optimized/Sirin-9mm.webp" },
      { name: "D1.3 Sector", image: 0 },
    ],
  },
];

const challengesData = {
  "GPMG-7": [
    { name: "Idyllic", challenge: "Get 30 Point Blank Kills", image: "https://assets.codmunity.gg/optimized/Idyllic.webp" },
    { name: "Brush Stroke", challenge: "Get 50 Eliminations while the Strategist Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Brush-Stroke.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "TANTO .22": [
    { name: "Go Bananas ", challenge: "Get 30 Kills without taking any damage", image: "https://assets.codmunity.gg/optimized/Go-bananas.webp" },
    { name: "Amorphous ", challenge: "Get 50 Kills while moving", image: "https://assets.codmunity.gg/optimized/Amorphous.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Grekhova": [
    { name: "Demeter", challenge: "Get 50 Eliminations while the Enforcer Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Demeter.webp" },
    { name: "Spin", challenge: "Get 30 Hipfire Kills", image: "https://assets.codmunity.gg/optimized/Spin.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "XMG": [
    { name: "Snakebite", challenge: "Get 50 Kills while moving", image: "https://assets.codmunity.gg/optimized/Snakebite.webp" },
    { name: "Buzz", challenge: "Get 2 Kills whitout releasing the trigger 5 times", image: "https://assets.codmunity.gg/optimized/Buzz.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "AK-74": [
    { name: "Vengeance", challenge: "Get 20 Kills with an Underbarrel Launcher attached ", image: "https://assets.codmunity.gg/optimized/Vengeance.webp" },
    { name: "Whitecap", challenge: "Get 50 Eliminations while the Strategist Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Whitecap.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Maelstrom": [
    { name: "Voidpulse", challenge: "Get 30 Point Blank Kills", image: "https://assets.codmunity.gg/optimized/Voidpulse.webp" },
    { name: "Moonlit Grace", challenge: "Get 50 Eliminations while the Enforcer Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Moonlit-Grace.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "KSV": [
    { name: "Throwback", challenge: "Get 50 Kills while moving", image: "https://assets.codmunity.gg/optimized/Throwback.webp" },
    { name: "Kakapo", challenge: "Get 2 Kills without reloading 10 times", image: "https://assets.codmunity.gg/optimized/Kakapo.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Knife": [
    { name: "Tropical Leopard ", challenge: "Get 30 Kills without taking any damage", image: "https://assets.codmunity.gg/optimized/Tropical-Leopard.webp" },
    { name: "Dying Envy", challenge: "Get 50 Eliminations while the Enforcer Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Dying-Envy.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "CIGMA 2B": [
    { name: "Abstract ", challenge: "Get Destroy 10 Aerial Scorestreaks ", image: "https://assets.codmunity.gg/optimized/Abstract.webp" },
    { name: "Policia", challenge: "Get 10 Direct Hit Kills", image: "https://assets.codmunity.gg/optimized/Policia.webp" },
    { name: "Gold", challenge: "Get 3 Destructions (scorestreak or vehicle) in a single match 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills in a single match 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 5 Destructions (scorestreak or vehicle) in a single match 3 times ", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills in a single match 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "9MM PM": [
    { name: "Blue Ring", challenge: "Get 50 Kills while using a Suppressor ", image: "https://assets.codmunity.gg/optimized/Blue-Ring.webp" },
    { name: "Exabyte", challenge: "Get 15 Kills shortly after switching weapons", image: "https://assets.codmunity.gg/optimized/Exabyte.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "AMR Mod 4": [
    { name: "Shadowthorn", challenge: "Get 30 One Shot Kills", image: "https://assets.codmunity.gg/optimized/Shadowthorn.webp" },
    { name: "Tidal Harmony", challenge: "Get 2 Kills without reloading 10 times", image: "https://assets.codmunity.gg/optimized/Tidal-Harmony.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Cleaver": [
    { name: "Creepy Crypt", challenge: "Get 50 Eliminations while the Strategist Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Creepy-Crypt.webp" },
    { name: "Luminous Leopard", challenge: "Get 30 Kills without taking any damage", image: "https://assets.codmunity.gg/optimized/Luminous-Leopard.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "MARINE SP": [
    { name: "Chromed Out", challenge: "Get 30 Kills shortly after sprinting", image: "https://assets.codmunity.gg/optimized/Chromed-Out.webp" },
    { name: "Blueberry Lime", challenge: "Get 30 Hipfire Kills", image: "https://assets.codmunity.gg/optimized/Blueberry-Lime.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "AS VAL": [
    { name: "Crimson Steppes", challenge: "Get 50 Eliminations while the Recon Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Crimson-steppes.webp" },
    { name: "Elk", challenge: "Get 30 Hipfire Kills", image: "https://assets.codmunity.gg/optimized/elk.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Baseball Bat": [
    { name: "Torment", challenge: "Get 15 Kills shortly after switching weapons", image: "https://assets.codmunity.gg/optimized/Torment.webp" },
    { name: "Slip", challenge: "Get 30 Kills without taking any damage", image: "https://assets.codmunity.gg/optimized/Slip.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "KOMPAKT 92": [
    { name: "Kingfisher", challenge: "Get 30 Hipfire Kills", image: "https://assets.codmunity.gg/optimized/Kingfisher.webp" },
    { name: "Blackthorn", challenge: "Get 30 Kills shortly after sprinting", image: "https://assets.codmunity.gg/optimized/Blackthorn.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "LR 7.62": [
    { name: "Chaparral", challenge: "Get 30 One Shot Kills", image: "https://assets.codmunity.gg/optimized/Chaparral.webp" },
    { name: "Nimbus", challenge: "Get 15 Longshot Kills", image: "https://assets.codmunity.gg/optimized/Nimbus.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "GOBLIN MK 2": [
    { name: "Astral Cry", challenge: "Get 30 Kills without taking any damage", image: "https://assets.codmunity.gg/optimized/ASTRAL-CRY.webp" },
    { name: "Hammerhead ", challenge: "Get 20 Kills with an Underbarrel Launcher attached ", image: "https://assets.codmunity.gg/optimized/HAMMERHEAD.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "DM-10": [
    { name: "Mellowbloom", challenge: "Get 50 Kills while using a Suppressor ", image: "https://assets.codmunity.gg/optimized/Mellowbloom.webp" },
    { name: "Cobalt ", challenge: "Get 15 Longshot Kills", image: "https://assets.codmunity.gg/optimized/Cobalt.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "PPSh-41": [
    { name: "Skythrone", challenge: "Get 30 Kills without taking any damage", image: "https://assets.codmunity.gg/optimized/Skythrone.webp" },
    { name: "Mirage", challenge: "Get 5 Kills in a single match 3 times", image: "https://assets.codmunity.gg/optimized/Mirage-pp.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "JACKAL PDW": [
    { name: "Deep End", challenge: "Get 30 Kills shortly after sprinting", image: "https://assets.codmunity.gg/optimized/Deep-End.webp" },
    { name: "Dread", challenge: "Get 30 Point Blank Kills", image: "https://assets.codmunity.gg/optimized/Dread.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "KRIG C": [
    { name: "Monochrome", challenge: "Get 30 Kills shortly after sprinting", image: "https://assets.codmunity.gg/optimized/Monochrome.webp" },
    { name: "Dreadshade", challenge: "Get 50 Kills while moving", image: "https://assets.codmunity.gg/optimized/Dreadshade.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "SAUG": [
    { name: "Netherworld", challenge: "Get 30 Point Blank Kills", image: "https://assets.codmunity.gg/optimized/Netherworld1.webp" },
    { name: "Solar Tide", challenge: "Get 50 Kills while moving", image: "https://assets.codmunity.gg/optimized/Solar-Tide.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Stryder .22": [
    { name: "Transcend ", challenge: "Get 50 Eliminations while the Recon Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Transcend.webp" },
    { name: "Ritual", challenge: "Get 50 Kills while moving", image: "https://assets.codmunity.gg/optimized/Ritual.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "MODEL L": [
    { name: "Cedar", challenge: "Get 50 Kills while using a Suppressor ", image: "https://assets.codmunity.gg/optimized/cedar.webp" },
    { name: "Cherry Blossom ", challenge: "Get 50 Eliminations while the Enforcer Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Cherry-blossom.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "PP-919": [
    { name: "Midnight Prowl ", challenge: "Get 50 Eliminations while the Strategist Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/MIDNIGHT-PROWL.webp" },
    { name: "Radiant Bath", challenge: "Get 30 Hipfire Kills", image: "https://assets.codmunity.gg/optimized/RADIANT-BATH.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Sirin 9mm": [
    { name: "Nebulon", challenge: "Get 30 Kills shortly after sprinting", image: "https://assets.codmunity.gg/optimized/Nebulon.webp" },
    { name: "Enchanted", challenge: "Get 50 Kills while moving", image: "https://assets.codmunity.gg/optimized/Enchanted.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "AEK-973": [
    { name: "Mirage", challenge: "Get 50 Kills while using a 4.0x or higher Magnification Scope", image: "https://assets.codmunity.gg/optimized/Mirage.webp" },
    { name: "Ablaze ", challenge: "Get 2 Kills without reloading 10 times", image: "https://assets.codmunity.gg/optimized/Ablaze.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "ASG-89": [
    { name: "Drive-In", challenge: "Get 50 Kills while moving", image: "https://assets.codmunity.gg/optimized/Drive-In.webp" },
    { name: "Night Terror", challenge: "Get 30 Point Blank Kills", image: "https://assets.codmunity.gg/optimized/Night-Terror.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "GPR 91": [
    { name: "Cacti Cathode ", challenge: "Get 50 Kills while moving", image: "https://assets.codmunity.gg/optimized/CACTI-CATHODE.webp" },
    { name: "Ambush", challenge: "Get 30 Kills shortly after sprinting", image: "https://assets.codmunity.gg/optimized/AMBUSH.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "GS45": [
    { name: "Ragamuffin", challenge: "Get 15 Kills shortly after switching weapons", image: "https://assets.codmunity.gg/optimized/Ragamuffin.webp" },
    { name: "Thistlevine", challenge: "Get 30 Point Blank Kills", image: "https://assets.codmunity.gg/optimized/Thistlevine.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Power Drill": [
    { name: "Twilight Toadstool", challenge: "Get 50 Eliminations while the Recon Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Twilight-Toadstool.webp" },
    { name: "Thermal", challenge: "Get 15 Kills shortly after sprinting", image: "https://assets.codmunity.gg/optimized/Thermal.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "SVD": [
    { name: "Patchwork ", challenge: "Get 50 Kills while using a 4.0x or higher Magnification Scope", image: "https://assets.codmunity.gg/optimized/Patchwork.webp" },
    { name: "Pixelized", challenge: "Get 50 Eliminations while the Recon Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Pixelized.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Tsarkov 7.62": [
    { name: "Concrete Jungle ", challenge: "Get 50 Eliminations while the Strategist Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Concrete-Jungle.webp" },
    { name: "Clear Water", challenge: "Get 15 Longshot Kills", image: "https://assets.codmunity.gg/optimized/Clear-Water.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "HE-1": [
    { name: "Dreamer", challenge: "Get Destroy 10 Scorestreaks or Enemy Equipments", image: "https://assets.codmunity.gg/optimized/Dreamer.webp" },
    { name: "Reboot", challenge: "Get 10 Direct Hit Kills", image: "https://assets.codmunity.gg/optimized/Reboot.webp" },
    { name: "Gold", challenge: "Get 3 Destructions (scorestreak or vehicle) in a single match 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills in a single match 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 5 Destructions (scorestreak or vehicle) in a single match 3 times ", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills in a single match 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "AMES 85": [
    { name: "Burial ", challenge: "Get 2 Kills without reloading 10 times", image: "https://assets.codmunity.gg/optimized/Burial.webp" },
    { name: "Heatstroke ", challenge: "Get 30 Kills without taking any damage", image: "https://assets.codmunity.gg/optimized/Heatstroke.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Katanas": [
    { name: "Coral Crush", challenge: "Get 5 Kills in a single match 3 times", image: 0 },
    { name: "Tempest", challenge: "Get 50 Eliminations while the Enforcer Combat Specialty is active", image: 0 },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "PU-21": [
    { name: "Vigilance", challenge: "Get 2 Kills without reloading 10 times", image: "https://assets.codmunity.gg/optimized/Vigilance.webp" },
    { name: "Neon Bath", challenge: "Get 30 Kills shortly after sprinting", image: "https://assets.codmunity.gg/optimized/Neon-Bath.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "LW3A1 Frostline": [
    { name: "Permafrost", challenge: "Get 2 Kills without reloading 10 times", image: "https://assets.codmunity.gg/optimized/Permafrost.webp" },
    { name: "Copper", challenge: "Get 50 Eliminations while the Enforcer Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Copper.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Sai": [
    { name: "Seep", challenge: "Get 50 Eliminations while the Recon Combat Specialty is active", image: 0 },
    { name: "Crestdeep", challenge: "Get 30 Kills without taking any damage", image: 0 },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "SWAT 5.56": [
    { name: "Lumberjack", challenge: "Get 50 Eliminations while the Enforcer Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Lumberjack.webp" },
    { name: "Ectoplasm", challenge: "Get 50 Kills while using a 4.0x or higher Magnification Scope", image: "https://assets.codmunity.gg/optimized/Ectoplasm.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "C9": [
    { name: "Panther", challenge: "Get 50 Kills while using a Suppressor ", image: "https://assets.codmunity.gg/optimized/Panther.webp" },
    { name: "Heatwave", challenge: "Get 30 Kills shortly after sprinting", image: "https://assets.codmunity.gg/optimized/Heatwave.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Nunchaku": [
    { name: "Nested", challenge: "Get 30 Kills without taking any damage", image: 0 },
    { name: "Radiate", challenge: "Get 15 Kills shortly after switching weapons", image: 0 },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "XM4": [
    { name: "Machina", challenge: "Get 30 Kills without taking any damage", image: "https://assets.codmunity.gg/optimized/Machina.webp" },
    { name: "Muddled", challenge: "Get 30 Kills shortly after sprinting", image: "https://assets.codmunity.gg/optimized/Muddled.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Skateboard": [
    { name: "Ripple", challenge: "Get 15 Kills shortly after switching weapons", image: 0 },
    { name: "Bliss", challenge: "Get 30 Kills without taking any damage", image: 0 },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "D1.3 Sector": [
    { name: "Meteorite", challenge: "Get 2 Kills without reloading 10 times", image: 0 },
    { name: "Fast Times", challenge: "Get 30 One Shot Kills", image: 0 },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Opal.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Cypher 091": [
    { name: "Scorching Slash", challenge: "Get 30 Kills without taking any damage", image: "https://assets.codmunity.gg/optimized/Scorching-Slash.webp" },
    { name: "Rotmist", challenge: "Get 2 Kills without reloading 10 times", image: "https://assets.codmunity.gg/optimized/Rotmist.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Feng 82": [
    { name: "Sunblossom", challenge: "Get 50 Kills while using a Suppressor ", image: "https://assets.codmunity.gg/optimized/Sunblossom.webp" },
    { name: "Bloodfang", challenge: "Get 2 Kills whitout releasing the trigger 5 times", image: "https://assets.codmunity.gg/optimized/Bloodfang.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "TR2": [
    { name: "Chompers", challenge: "Get 50 Eliminations while the Recon Combat Specialty is active", image: "https://assets.codmunity.gg/optimized/Chompers.webp" },
    { name: "Restless", challenge: "Get 2 Kills without reloading 10 times", image: "https://assets.codmunity.gg/optimized/Restless.webp" },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
  "Bo Staff": [
    { name: "Havoc", challenge: "Get 50 Eliminations while the Strategist Combat Specialty is active", image: 0 },
    { name: "Legacy", challenge: "Get 5 Kills in a single match 3 times", image: 0 },
    { name: "Gold", challenge: "Get 10 Double Kills", image: "https://assets.codmunity.gg/optimized/Camo_Gold.webp" },
    { name: "Diamond", challenge: "Get 3 Kills without dying 10 times", image: "https://assets.codmunity.gg/optimized/Camo_Diamond.webp" },
    { name: "Dark Spine", challenge: "Get 3 Triple Kills", image: "https://assets.codmunity.gg/optimized/Camo_DarkSpine.webp" },
    { name: "Dark Matter", challenge: "Get 5 Kills without dying 3 times", image: "https://assets.codmunity.gg/optimized/Camo_DarkMatter.webp" },
  ],
};

function AppWrapper() {
  const [trackerData, setTrackerData] = useState(() => {
    const saved = localStorage.getItem('camoTracker');
    return saved ? JSON.parse(saved) : {};
  });
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedWeapons, setExpandedWeapons] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('camoTracker', JSON.stringify(trackerData));
  }, [trackerData]);

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

  const expandAll = () => setExpandedCategories(weaponCategories.reduce((acc, cat) => ({ ...acc, [cat.name]: true }), {}));
  const collapseAll = () => setExpandedCategories({});
  const resetAllCamouflages = () => {
    const newTrackerData = {};
    weaponCategories.forEach((category) =>
      category.weapons.forEach((weapon) => {
        newTrackerData[weapon.name] = {};
      })
    );
    setTrackerData(newTrackerData);
  };

  const updateCamoStatus = (weapon, camo, status) => {
    setTrackerData((prev) => ({
      ...prev,
      [weapon]: {
        ...prev[weapon],
        [camo]: status,
      },
    }));
  };

  // Calculate total number of weapons dynamically
  const totalWeapons = weaponCategories.reduce((acc, category) => acc + category.weapons.length, 0);

  // Filter categories and weapons based on search term
  const filteredCategories = weaponCategories.map((category) => ({
    ...category,
    weapons: category.weapons.filter((weapon) =>
      weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((category) => category.weapons.length > 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6">COD BO6 Camos Tracker</h1>
      <div className="mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="Search weapons or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 sm:p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
        />
      </div>
      <Counters trackerData={trackerData} totalWeapons={totalWeapons} />
      <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 w-full sm:w-auto"
          onClick={resetAllCamouflages}
        >
          Reset All Camos
        </button>
        <div className="flex flex-col sm:flex-row">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-0 sm:mr-2 mb-2 sm:mb-0 w-full sm:w-auto"
            onClick={expandAll}
          >
            Expand All
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
            onClick={collapseAll}
          >
            Collapse All
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <WeaponCategory
            key={category.name}
            category={category}
            weapons={category.weapons}
            trackerData={trackerData}
            updateCamoStatus={updateCamoStatus}
            isExpanded={expandedCategories[category.name] || false}
            toggleCategory={toggleCategory}
            expandedWeapons={expandedWeapons}
            toggleWeapon={toggleWeapon}
          />
        ))}
      </div>
    </div>
  );
}

function WeaponCategory({ category, weapons, trackerData, updateCamoStatus, isExpanded, toggleCategory, expandedWeapons, toggleWeapon }) {
  const categoryProgress = defaultCamos.reduce((acc, camo) => {
    acc[camo] = weapons.filter((weapon) => trackerData[weapon.name]?.[camo] || false).length;
    return acc;
  }, {});
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
        <div className="p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 sm:gap-4">
          {weapons.map((weapon) => (
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
function Weapon({ weapon, trackerData, updateCamoStatus, isExpanded, toggleWeapon }) {
  const weaponChallenges = challengesData[weapon.name] || [];

  return (
    <div className="bg-gray-700 rounded-lg shadow-md transition-all duration-200 min-h-[100px] sm:min-h-[120px]">
      {/* Header with name and image, always visible */}
      <div className="flex items-center justify-between p-2 sm:p-3">
        <div className="flex items-center w-full space-x-2 sm:space-x-3">
          <img
            src={weapon.image || 'https://via.placeholder.com/1600x480'}
            alt={weapon.name}
            className="h-14 sm:h-16 md:h-20 lg:h-24 object-contain rounded max-w-[50%] sm:max-w-[40%]"
          />
          <span className="font-semibold text-sm sm:text-base md:text-lg whitespace-normal break-words">
            {weapon.name}
          </span>
        </div>
        <button
          className="ml-1 sm:ml-2 focus:outline-none"
          onClick={() => toggleWeapon(weapon.name)}
        >
          <span className="text-sm sm:text-base md:text-lg">{isExpanded ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Challenges section, collapsible */}
      {isExpanded && (
        <div className="p-2 sm:p-3">
          {weaponChallenges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {weaponChallenges.map((camo) => (
                <div
                  key={camo.name}
                  className="flex items-center space-x-2 sm:space-x-3 group"
                >
                  <img
                    src={camo.image || 'https://via.placeholder.com/50'}
                    alt={camo.name}
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded cursor-pointer transition-opacity duration-200 ${
                      trackerData[camo.name] ? 'opacity-100' : 'opacity-50 group-hover:opacity-75'
                    }`}
                    onClick={() =>
                      updateCamoStatus(weapon.name, camo.name, !trackerData[camo.name])
                    }
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

const defaultCamos = ['Gold', 'Diamond', 'Dark Spine', 'Dark Matter'];