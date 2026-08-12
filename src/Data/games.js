const games = [  
 // =========================
  // ACTION — 1 to 10
  // =========================

  {
    id: 1,
    name: "Grand Theft Auto V",
    category: "Action",
    description: "Open-world action adventure with missions and online gameplay.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Xbox",
    players: "Single-player, Online",
    releaseYear: 2013,
    officialUrl: "https://www.rockstargames.com/gta-v",
  },

  {
    id: 2,
    name: "Resident Evil Requiem",
    category: "Action",
    description: "Survival-horror action adventure with a cinematic story.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S, Switch 2",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://www.residentevil.com/requiem/en-us/",

  },

  {
    id: 3,
    name: "DOOM: The Dark Ages",
    category: "Action",
    description: "Fast-paced first-person action set in a dark medieval world.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://doom.bethesda.net/en-US/the-dark-ages",

  },

  {
    id: 4,
    name: "Mafia: The Old Country",
    category: "Action",
    description: "Cinematic crime action adventure set in early 20th-century Sicily.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://mafiagame.com/",
  },

  {
    id: 5,
    name: "Crimson Desert",
    category: "Action",
    description: "Open-world action adventure across a vast fantasy continent.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://mafiagame.com/",
  },

  {
    id: 6,
    name: "007 First Light",
    category: "Action",
    description: "Action adventure following a young James Bond.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S, Switch 2",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://007firstlightgame.com/",

  },

  {
    id: 7,
    name: "Dying Light: The Beast",
    category: "Action",
    description: "Survival action in a dangerous world filled with infected creatures.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Co-op",
    releaseYear: 2025,
    officialUrl: "https://dyinglightgame.com/thebeast",


  },

  {
    id: 8,
    name: "Killing Floor 3",
    category: "Action",
    description: "Cooperative first-person action against waves of enemies.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Co-op",
    releaseYear: 2025,
    officialUrl: "https://killingfloor3.com/",

  },

  {
    id: 9,
    name: "FBC: Firebreak",
    category: "Action",
    description: "Cooperative first-person action during a supernatural crisis.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Co-op",
    releaseYear: 2025,
    officialUrl: "https://www.remedygames.com/games/fbc-firebreak/",

  },

  {
    id: 10,
    name: "MindsEye",
    category: "Action",
    description: "Cinematic action thriller set in a futuristic world.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.mindseye.game/",
  },


  // =========================
  // FIGHTING — 11 to 20
  // =========================

  {
    id: 11,
    name: "Tekken 8",
    category: "Fighting",
    description: "Competitive fighting game with story and online battles.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Online",
    releaseYear: 2024,
    officialUrl: "https://www.bandainamcoent.com/games/tekken-8",

  },

  {
    id: 12,
    name: "Fatal Fury: City of the Wolves",
    category: "Fighting",
    description: "Modern entry in SNK's classic fighting series.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Online",
    releaseYear: 2025,
    officialUrl: "https://www.snk-corp.co.jp/us/games/fatalfury-cotw/",

  },

  {
    id: 13,
    name: "Street Fighter 6",
    category: "Fighting",
    description: "Modern competitive fighting game with classic and online modes.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS4, PS5, Xbox Series X|S",
    players: "Single-player, Online",
    releaseYear: 2023,
    officialUrl: "https://www.streetfighter.com/6",

  },

  {
    id: 14,
    name: "Mortal Kombat 1",
    category: "Fighting",
    description: "Fast and cinematic fighting with a rebuilt Mortal Kombat universe.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S, Switch",
    players: "Single-player, Online",
    releaseYear: 2023,
    officialUrl: "https://www.mortalkombat.com/en-us",

  },

  {
    id: 15,
    name: "Dragon Ball: Sparking! ZERO",
    category: "Fighting",
    description: "High-speed arena fighting featuring Dragon Ball characters.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Online",
    releaseYear: 2024,
    officialUrl: "https://www.bandainamcoent.com/games/dragon-ball-sparking-zero",

  },

  {
    id: 16,
    name: "Granblue Fantasy Versus: Rising",
    category: "Fighting",
    description: "Anime-style competitive fighting with a large roster.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS4, PS5",
    players: "Single-player, Online",
    releaseYear: 2023,
    officialUrl: "https://rising.granbluefantasy.com/",

  },

  {
    id: 17,
    name: "Under Night In-Birth II Sys:Celes",
    category: "Fighting",
    description: "Technical anime-style fighting with deep competitive mechanics.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS4, PS5, Switch",
    players: "Single-player, Online",
    releaseYear: 2024,
    officialUrl: "https://www.arcsystemworks.jp/uni2celes/en/game/",

  },

  {
    id: 18,
    name: "2XKO",
    category: "Fighting",
    description: "Team-based competitive fighting game from Riot Games.",
    rating: null,
    price: "Check Store",
    platform: "PC, Console",
    players: "Online Multiplayer",
    releaseYear: 2025,
    officialUrl: "https://2xko.riotgames.com/",

  },

  {
    id: 19,
    name: "Virtua Fighter 5 R.E.V.O. World Stage",
    category: "Fighting",
    description: "Competitive Virtua Fighter experience with modern online features.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Online",
    releaseYear: 2025,
    officialUrl: "https://www.sega.com/virtua-fighter-5-revo",

  },

  {
    id: 20,
    name: "Fatal Fury: City of the Wolves - Season 2",
    category: "Fighting",
    description: "Additional fighters and content for City of the Wolves.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Online Multiplayer",
    releaseYear: 2026,
    officialUrl: "https://www.snk-corp.co.jp/us/games/fatalfury-cotw/",
  },


  // =========================
  // RPG — 21 to 30
  // =========================

  {
    id: 21,
    name: "Nioh 3",
    category: "RPG",
    description: "Hardcore action RPG set in a dark historical fantasy version of Japan.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://www.koeitecmoamerica.com/nioh3/",

  },

  {
    id: 22,
    name: "Clair Obscur: Expedition 33",
    category: "RPG",
    description: "Turn-based RPG adventure in a mysterious fantasy world.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.expedition33.com/",


  },

  {
    id: 23,
    name: "Monster Hunter Wilds",
    category: "RPG",
    description: "Hunt enormous monsters across dynamic natural environments.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Online",
    releaseYear: 2025,
    officialUrl: "https://www.monsterhunter.com/wilds/",

  },

  {
    id: 24,
    name: "Kingdom Come: Deliverance II",
    category: "RPG",
    description: "Historical role-playing adventure set in medieval Europe.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://kingdomcomerpg.com/",

  },

  {
    id: 25,
    name: "Avowed",
    category: "RPG",
    description: "Fantasy role-playing adventure filled with magic and choices.",
    rating: null,
    price: "Check Store",
    platform: "PC, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://avowed.obsidian.net/",
  },

  {
    id: 26,
    name: "Dune: Awakening",
    category: "RPG",
    description: "Survive, build and explore the dangerous planet Arrakis.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Online",
    releaseYear: 2025,
    officialUrl: "https://duneawakening.com/",
  },

  {
    id: 27,
    name: "Wuchang: Fallen Feathers",
    category: "RPG",
    description: "Dark action RPG inspired by Chinese history and mythology.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.wuchanggame.com/",
  },

  {
    id: 28,
    name: "Borderlands 4",
    category: "RPG",
    description: "Loot, shoot and explore a new world in a cooperative RPG shooter.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Co-op",
    releaseYear: 2025,
    officialUrl: "https://borderlands.2k.com/borderlands-4/",
  },

  {
    id: 29,
    name: "Like a Dragon: Pirate Yakuza in Hawaii",
    category: "RPG",
    description: "Role-playing adventure combining exploration and pirate combat.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS4, PS5, Xbox",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://ryu-ga-gotoku.com/pirate/en/",
  },

  {
    id: 30,
    name: "The Alters",
    category: "RPG",
    description: "Science-fiction survival RPG about alternate versions of one character.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.the-alters.com/",
  },
    // =========================
  // RACING — 31 to 40
  // =========================

  {
    id: 31,
    name: "Forza Horizon 6",
    category: "Racing",
    description: "Open-world racing adventure set across Japan.",
    rating: null,
    price: "Check Store",
    platform: "PC, Xbox Series X|S, PS5",
    players: "Single-player, Online",
    releaseYear: 2026,
    officialUrl: "https://forza.net/horizon-6", 
  },

  {
    id: 32,
    name: "Sonic Racing: CrossWorlds",
    category: "Racing",
    description: "High-speed arcade racing across changing worlds.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Xbox, Switch",
    players: "Single-player, Online",
    releaseYear: 2025,
    officialUrl: "https://asia.sega.com/SonicRacingCrossWorlds/en/",
  },

  {
    id: 33,
    name: "Mario Kart World",
    category: "Racing",
    description: "Large-scale kart racing with a connected world.",
    rating: null,
    price: "Check Store",
    platform: "Nintendo Switch 2",
    players: "Single-player, Multiplayer",
    releaseYear: 2025,
    officialUrl: "https://www.nintendo.com/us/gaming-systems/switch-2/games/mario-kart-world/",
  },

  {
    id: 34,
    name: "RIDE 6",
    category: "Racing",
    description: "Motorcycle racing with realistic bikes and tracks.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Online",
    releaseYear: 2026,
    officialUrl: "https://milestone.it/games/ride-6/",
  },

  {
    id: 35,
    name: "F1 25",
    category: "Racing",
    description: "Official Formula 1 racing experience for the 2025 season.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Online",
    releaseYear: 2025,
    officialUrl: "https://www.ea.com/games/f1/f1-25",

  },

  {
    id: 36,
    name: "MotoGP 25",
    category: "Racing",
    description: "Official motorcycle racing simulation featuring the 2025 season.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S, Switch",
    players: "Single-player, Online",
    releaseYear: 2025,
    officialUrl: "https://milestone.it/games/motogp-25/",

  },

  {
    id: 37,
    name: "Monster Energy Supercross 25",
    category: "Racing",
    description: "Professional motocross racing with realistic tracks.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Online",
    releaseYear: 2025,
    officialUrl: "https://milestone.it/games/monster-energy-supercross-25/",

  },

  {
    id: 38,
    name: "Le Mans Ultimate",
    category: "Racing",
    description: "Endurance racing simulation based on the World Endurance Championship.",
    rating: null,
    price: "Check Store",
    platform: "PC",
    players: "Single-player, Online",
    releaseYear: 2025,
    officialUrl: "https://lemansultimate.com/",
  },

  {
    id: 39,
    name: "Tokyo Xtreme Racer",
    category: "Racing",
    description: "Street racing experience focused on Tokyo highways.",
    rating: null,
    price: "Check Store",
    platform: "PC",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.shinobi.jp/",
    
  },

  {
    id: 40,
    name: "The Crew Motorfest",
    category: "Racing",
    description: "Open-world driving festival with cars, events and online play.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS4, PS5, Xbox, Switch",
    players: "Single-player, Online",
    releaseYear: 2023,
    officialUrl: "https://www.ubisoft.com/en-us/game/the-crew/motorfest",
  },


  // =========================
  // ADVENTURE — 41 to 50
  // =========================

  {
    id: 41,
    name: "Death Stranding 2: On the Beach",
    category: "Adventure",
    description: "Cinematic adventure focused on connection, exploration and survival.",
    rating: null,
    price: "Check Store",
    platform: "PS5, PC",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.kojimaproductions.jp/en/death-stranding-2",
  },

  {
    id: 42,
    name: "Ghost of Yotei",
    category: "Adventure",
    description: "Cinematic samurai adventure set in northern Japan.",
    rating: null,
    price: "Check Store",
    platform: "PS5",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.playstation.com/en-in/games/ghost-of-yotei/",
  },

  {
    id: 43,
    name: "Split Fiction",
    category: "Adventure",
    description: "Cooperative adventure where two writers travel through different worlds.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "2 Player Co-op",
    releaseYear: 2025,
    officialUrl: "https://www.ea.com/games/split-fiction",
  },

  {
    id: 44,
    name: "Lost Records: Bloom & Rage",
    category: "Adventure",
    description: "Narrative adventure centered around friendship and memories.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.dont-nod.com/en/games/lost-records-bloom-rage/",
  },

  {
    id: 45,
    name: "Little Nightmares III",
    category: "Adventure",
    description: "Dark puzzle adventure featuring two mysterious characters.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Xbox, Switch",
    players: "Single-player, Co-op",
    releaseYear: 2025,
    officialUrl: "https://www.little-nightmares.com/",
  },

  {
    id: 46,
    name: "South of Midnight",
    category: "Adventure",
    description: "Magical adventure inspired by Southern American folklore.",
    rating: null,
    price: "Check Store",
    platform: "PC, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.xbox.com/en-US/games/south-of-midnight",
  },

  {
    id: 47,
    name: "Indiana Jones and the Great Circle",
    category: "Adventure",
    description: "Cinematic archaeological adventure across famous locations.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2024,
    officialUrl: "https://indianajones.bethesda.net/",
  },

  {
    id: 48,
    name: "Mina the Hollower",
    category: "Adventure",
    description: "Dark pixel-art adventure filled with exploration and mysteries.",
    rating: null,
    price: "Check Store",
    platform: "PC, Console",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://yachtclubgames.com/mina-the-hollower/",
  },

  {
    id: 49,
    name: "Beast of Reincarnation",
    category: "Adventure",
    description: "Post-apocalyptic adventure centered around a warrior and her companion.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://www.beastofreincarnation.com/",
  },

  {
    id: 50,
    name: "Pragmata",
    category: "Adventure",
    description: "Science-fiction action adventure with a mysterious story.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S, Switch 2",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://www.pragmata.com/",
  },


  // =========================
  // ARCADE — 51 to 60
  // =========================

  {
    id: 51,
    name: "Mewgenics",
    category: "Arcade",
    description: "Strategic cat-themed adventure with unusual characters and battles.",
    rating: null,
    price: "Check Store",
    platform: "PC",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://www.mewgenics.com/",
  },

  {
    id: 52,
    name: "Blue Prince",
    category: "Arcade",
    description: "Mystery puzzle adventure built around a changing mansion.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://rawfury.com/games/blue-prince/",
  },

  {
    id: 53,
    name: "Mixtape",
    category: "Arcade",
    description: "Interactive teen movie experience blending music and mini-games.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://www.devolver.com/games/mixtape/",
  },

  {
    id: 54,
    name: "Titanium Court",
    category: "Arcade",
    description: "Fast match-three puzzle game with competitive mechanics.",
    rating: null,
    price: "Check Store",
    platform: "PC",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://www.nintendo.com/",
  },

  {
    id: 55,
    name: "Rhythm Heaven Groove",
    category: "Arcade",
    description: "Rhythm-based mini-games built around timing and music.",
    rating: null,
    price: "Check Store",
    platform: "Nintendo Switch 2",
    players: "Single-player, Multiplayer",
    releaseYear: 2026,
    officialUrl: "https://www.nintendo.com/",
  },

  {
    id: 56,
    name: "Donkey Kong Bananza",
    category: "Arcade",
    description: "Colorful platforming adventure with destructive arcade-style gameplay.",
    rating: null,
    price: "Check Store",
    platform: "Nintendo Switch 2",
    players: "Single-player, Multiplayer",
    releaseYear: 2025,
    officialUrl: "https://www.nintendo.com/us/gaming-systems/switch-2/games/donkey-kong-bananza/",

  },

  {
    id: 57,
    name: "Kirby Air Riders",
    category: "Arcade",
    description: "Fast arcade racing and action featuring Kirby characters.",
    rating: null,
    price: "Check Store",
    platform: "Nintendo Switch 2",
    players: "Multiplayer",
    releaseYear: 2025,
    officialUrl: "https://www.nintendo.com/",

  },

  {
    id: 58,
    name: "Shinobi: Art of Vengeance",
    category: "Arcade",
    description: "Fast side-scrolling action inspired by classic arcade games.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Xbox, Switch",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.sega.com/shinobi-art-of-vengeance",
  },

  {
    id: 59,
    name: "Pac-Man World 2: Re-Pac",
    category: "Arcade",
    description: "Modern remake of a colorful Pac-Man platforming adventure.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Xbox, Switch",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.pacman.com/",
  },

  {
    id: 60,
    name: "LEGO Party",
    category: "Arcade",
    description: "Party game collection featuring LEGO-themed mini-games.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Xbox, Switch",
    players: "Multiplayer",
    releaseYear: 2025,
    officialUrl: "https://www.lego.com/en-us/themes/games",
  },
    // =========================
  // SPORTS — 61 to 70
  // =========================

  {
    id: 61,
    name: "EA SPORTS FC 26",
    category: "Sports",
    description: "Football simulation featuring updated gameplay, teams and competitive modes.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Xbox, Switch",
    players: "Single-player, Online",
    releaseYear: 2025,
    officialUrl: "https://www.ea.com/games/ea-sports-fc/fc-26",
  },

  {
    id: 62,
    name: "NBA 2K26",
    category: "Sports",
    description: "Basketball simulation featuring professional teams and players.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Xbox, Switch 2",
    players: "Single-player, Online",
    releaseYear: 2025,
    officialUrl: "https://nba.2k.com/2k26/",
  },

  {
    id: 63,
    name: "WWE 2K26",
    category: "Sports",
    description: "Professional wrestling action featuring WWE superstars.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Multiplayer",
    releaseYear: 2026,
    officialUrl: "https://wwe.2k.com/2k26/",
  },

  {
    id: 64,
    name: "MLB The Show 26",
    category: "Sports",
    description: "Baseball simulation with career and competitive modes.",
    rating: null,
    price: "Check Store",
    platform: "PS5, Xbox Series X|S, Switch 2",
    players: "Single-player, Online",
    releaseYear: 2026,
    officialUrl: "https://mlbthe.show/",
  },

  {
    id: 65,
    name: "Mario Tennis Fever",
    category: "Sports",
    description: "Fast and colorful tennis action featuring Mario characters.",
    rating: null,
    price: "Check Store",
    platform: "Nintendo Switch 2",
    players: "Single-player, Multiplayer",
    releaseYear: 2026,
    officialUrl: "https://www.nintendo.com/us/store/products/mario-tennis-fever-switch-2/",
  },

  {
    id: 66,
    name: "PGA Tour 2K25",
    category: "Sports",
    description: "Professional golf simulation with competitive modes.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Online",
    releaseYear: 2025,
    officialUrl: "https://pgatour.2k.com/2k25/",
  },

  {
    id: 67,
    name: "Rematch",
    category: "Sports",
    description: "Fast online football matches focused on direct player control.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Online Multiplayer",
    releaseYear: 2025,
    officialUrl: "https://www.playrematch.com/",
  },

  {
    id: 68,
    name: "Tony Hawk's Pro Skater 3 + 4",
    category: "Sports",
    description: "Skateboarding action combining classic and modern content.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Xbox, Switch",
    players: "Single-player, Multiplayer",
    releaseYear: 2025,
    officialUrl: "https://www.playstation.com/en-in/games/tony-hawks-pro-skater-3-4/",
  },

  {
    id: 69,
    name: "Rugby 26",
    category: "Sports",
    description: "Rugby simulation with teams, tournaments and competitive play.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player, Multiplayer",
    releaseYear: 2026,
    officialUrl: "Official Link Coming Soon",
  },

  {
    id: 70,
    name: "FIFA Rivals",
    category: "Sports",
    description: "Fast football matches designed for quick competitive play.",
    rating: null,
    price: "Check Store",
    platform: "Mobile",
    players: "Online",
    releaseYear: 2025,
    officialUrl: "Official Link Coming Soon",
  },


  // =========================
  // STORY MODE — 71 to 80
  // =========================

  {
    id: 71,
    name: "Dispatch",
    category: "Story Mode",
    description: "Choice-driven superhero workplace story.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Xbox",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.playstation.com/en-in/games/dispatch/",
  },

  {
    id: 72,
    name: "Silent Hill f",
    category: "Story Mode",
    description: "Psychological horror story set in 1960s Japan.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.konami.com/games/silenthill/f/",
  },

  {
    id: 73,
    name: "Mafia: The Old Country - Story",
    category: "Story Mode",
    description: "Crime story exploring the origins of the Mafia in Sicily.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://mafiagame.com/",
  },

  {
    id: 74,
    name: "Clair Obscur: Expedition 33 - Story",
    category: "Story Mode",
    description: "Dramatic fantasy story about an expedition fighting against time.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.expedition33.com/",
  },

  {
    id: 75,
    name: "Resident Evil Requiem - Story",
    category: "Story Mode",
    description: "Dark survival-horror story featuring new characters and mysteries.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S, Switch 2",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://www.residentevil.com/requiem/en-us/",
  },

  {
    id: 76,
    name: "Ghost of Yotei - Story",
    category: "Story Mode",
    description: "Cinematic samurai story set in northern Japan.",
    rating: null,
    price: "Check Store",
    platform: "PS5",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.playstation.com/en-in/games/ghost-of-yotei/",
  },

  {
    id: 77,
    name: "Death Stranding 2: On the Beach - Story",
    category: "Story Mode",
    description: "Cinematic story about connection, survival and humanity.",
    rating: null,
    price: "Check Store",
    platform: "PS5, PC",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.kojimaproductions.jp/en/death-stranding-2",
  },

  {
    id: 78,
    name: "The Alters - Story",
    category: "Story Mode",
    description: "Science-fiction story about identity, survival and difficult choices.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.the-alters.com/",
  },

  {
    id: 79,
    name: "Lost Records: Bloom & Rage - Story",
    category: "Story Mode",
    description: "Character-driven story about friendship, memories and consequences.",
    rating: null,
    price: "Check Store",
    platform: "PC, PS5, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.lostrecords-game.com/",
  },

  {
    id: 80,
    name: "South of Midnight - Story",
    category: "Story Mode",
    description: "Folklore-inspired story following Hazel through a magical world.",
    rating: null,
    price: "Check Store",
    platform: "PC, Xbox Series X|S",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.xbox.com/en-US/games/south-of-midnight",
  },


  // =========================
  // CARTOON — 81 to 90
  // =========================

  {
    id: 81,
    name: "Pokémon Pokopia",
    category: "Cartoon",
    description: "Colorful Pokémon world focused on exploration and creativity.",
    rating: null,
    price: "Check Store",
    platform: "Nintendo Switch 2",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://www.nintendo.com/us/gaming-systems/switch-2/games/pokemon-pokopia/",

  },

  {
    id: 82,
    name: "Pokémon Legends: Z-A",
    category: "Cartoon",
    description: "Pokémon adventure centered around Lumiose City.",
    rating: null,
    price: "Check Store",
    platform: "Nintendo Switch, Switch 2",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.nintendo.com/us/gaming-systems/switch-2/games/pokemon-legends-z-a/",

  },

  {
    id: 83,
    name: "Donkey Kong Bananza - Family",
    category: "Cartoon",
    description: "Colorful platforming adventure featuring Donkey Kong.",
    rating: null,
    price: "Check Store",
    platform: "Nintendo Switch 2",
    players: "Single-player, Multiplayer",
    releaseYear: 2025,
    officialUrl: "https://www.nintendo.com/us/gaming-systems/switch-2/games/donkey-kong-bananza-switch-2/",

  },

  {
    id: 84,
    name: "Kirby Air Riders - Family",
    category: "Cartoon",
    description: "Colorful racing and action featuring Kirby characters.",
    rating: null,
    price: "Check Store",
    platform: "Nintendo Switch 2",
    players: "Multiplayer",
    releaseYear: 2025,
    officialUrl: "https://www.nintendo.com/",
  },

  {
    id: 85,
    name: "Mario Kart World - Family",
    category: "Cartoon",
    description: "Colorful racing adventure featuring Nintendo characters.",
    rating: null,
    price: "Check Store",
    platform: "Nintendo Switch 2",
    players: "Single-player, Multiplayer",
    releaseYear: 2025,
    officialUrl: "https://www.nintendo.com/us/gaming-systems/switch-2/games/mario-kart-world/",

  },

  {
    id: 86,
    name: "Hello Kitty Island Adventure",
    category: "Cartoon",
    description: "Relaxing colorful adventure with Hello Kitty and friends.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Switch, Mobile",
    players: "Single-player",
    releaseYear: 2025,
    officialUrl: "https://www.hellokittyislandadventure.com/",
  },

  {
    id: 87,
    name: "Yoshi and the Mysterious Book",
    category: "Cartoon",
    description: "Colorful platforming adventure starring Yoshi.",
    rating: null,
    price: "Check Store",
    platform: "Nintendo Switch 2",
    players: "Single-player",
    releaseYear: 2026,
    officialUrl: "https://www.nintendo.com/",
  },

  {
    id: 88,
    name: "LEGO Batman: Legacy of the Dark Knight",
    category: "Cartoon",
    description: "LEGO-style Batman action adventure with a family-friendly presentation.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Xbox, Switch 2",
    players: "Single-player, Co-op",
    releaseYear: 2026,
    officialUrl: "https://www.lego.com/en-in/games/lego-batman-legacy-dark-knight",
  },

  {
    id: 89,
    name: "Sonic Racing: CrossWorlds - Family",
    category: "Cartoon",
    description: "Colorful racing featuring Sonic characters.",
    rating: null,
    price: "Check Store",
    platform: "PC, PlayStation, Xbox, Switch",
    players: "Single-player, Online",
    releaseYear: 2025,
    officialUrl: "https://asia.sega.com/SonicRacingCrossWorlds/en/",
  },

  {
    id: 90,
    name: "Rhythm Heaven Groove",
    category: "Cartoon",
    description: "Colorful rhythm challenges built around music and timing.",
    rating: null,
    price: "Check Store",
    platform: "Nintendo Switch 2",
    players: "Single-player, Multiplayer",
    releaseYear: 2026,
    officialUrl: "https://www.nintendo.com/",
  }

];

export default games;