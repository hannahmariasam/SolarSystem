export const planets = [
  {
  name: "Sun",
  textureUrl: "/textures/sun.jpg",
  size: 3.5,
  distance: 0,
  speed: 0,
  position: { x: 0, y: 0, z: 0 },
  tilt: 0,
  info: {
    type: "Star",
    diameter: "1,391,000 km",
    surfaceTemp: "5,500°C",
    gravity: "274 m/s²",
    description: "The Sun is a massive G-type main-sequence star. It produces energy by nuclear fusion and is the center of the Solar System."
  }
},


 {
  name: "Mercury",
  textureUrl: "/textures/mercury.jpg",
  size: 0.4,
  distance: 6,
  speed: 0.05,
  position: { x: 6, y: 0, z: 0 },
  info: {
    type: "Rocky Planet",
    averageDistanceFromSun: "0.39 AU",
    diameterComparedToEarth: "0.38",
    gravity:"3.7 m/s²",
    madeOf: "Rock and metal",
    atmosphere: "None",
    moons: "None",
    rings: "None",
    temperature: "-280°F to 800°F (−173°C to 430°C)",
    dayLength: "1 day = 176 Earth days",
    yearLength: "1 year = 88 Earth days",
    whatIsItLike:
      "No air, lots of craters, freezing cold at night, extremely hot during the long daytime.",
    spacecraftVisited:
      "NASA’s Mariner 10 and MESSENGER; ESA–JAXA’s BepiColombo.",
    extraFacts:
      "Mercury looks like Earth's Moon, but it’s larger and more massive.",
    description:
      `Mercury is the smallest planet and has no atmosphere. Its surface is covered with ancient craters and rocky terrain.`
  },
},

  {
    name: "Venus",
    textureUrl: "/textures/venus.jpg",
    size: 0.7,
    distance: 8,
    speed: 0.04,
    position: { x: 8, y: 0, z: 0 },
    
      info: {
  type: "Rocky Planet",
  averageDistanceFromSun: "0.72 AU",
  diameterComparedToEarth: "0.95",
   gravity:"8.87 m/s²",
  madeOf: "Rock and metal",
  atmosphere: "Carbon dioxide and nitrogen",
  moons: "None",
  rings: "None",
  temperature: "860°F (460°C) all day",
  dayLength: "1 day = 117 Earth days",
  yearLength: "1 year = 225 Earth days",
  whatIsItLike:
    "Venus is like an oven. With dense clouds, sulfuric acid rain, and a thick atmosphere that can crush a truck in minutes. Venus is not a nice place to visit. Also, there's no water.",
  spacecraftVisited:
    "Venus 1–16, Mariner 2, 5, and 10, Pioneer Venus 1 and 2, the Magellan orbiter, and ESA’s Venus Express.",
  facts:
    "Most features on Venus are named for goddesses or women. Even the crater names honor poet Emily Dickinson.",
  description:
    `Venus is the hottest planet in the Solar System because its thick CO₂ atmosphere traps heat extremely well.`


    },
  },
  {
    name: "Earth",
    textureUrl: "/textures/earth.jpg",
    size: 0.75,
    distance: 10,
    speed: 0.035,
     
    position: { x: 10, y: 0, z: 0 },
   info: {
  type: "Terrestrial Planet",
  averageDistanceFromSun: "1 AU (93 million miles)",
  gravity:"9.8  m/s²",
  diameter: "7,900 miles (12,700 km)",
  madeOf: "Rock and metal",
  atmosphere: "Nitrogen, oxygen, and carbon dioxide",
  moons: "1",
  rings: "None",
  temperature: "−126°F to 136°F (−88°C to 58°C)",
  dayLength: "1 day = 24 Earth hours",
  yearLength: "1 year = 365.25 Earth days",
  whatIsItLike:
    "Earth is the only planet known to have life. Comfortable temperatures and a breathable atmosphere make it the solar system’s garden planet. It has liquid water on its surface and life everywhere.",
  spacecraftVisited:
    "Many spacecraft have visited Earth — orbiters study its weather, climate, and take pictures. Even the ISS orbits Earth with astronauts living in it.",
  extraFacts:
    "Earth is exactly the right temperature to have a water cycle.",
  description:
    `Earth is the only known planet with liquid water and life. Its magnetic field and atmosphere protect it from harmful radiation.`
},
moons: [
  {
    name: "Moon",
    textureUrl: "/textures/moon.jpg",
    size: 0.22,
    distance: 1.5,   // close to Earth but not touching the equator
    speed: 0.15 ,     // slow orbit
   
  }
],




  },
  {
  name: "Mars",
  textureUrl: "/textures/mars.jpg",
  size: 0.6,
  distance: 12,
  speed: 0.03,

  position: { x: 12, y: 0, z: 0 },
  info: {
    type: "Rocky Planet",
    averageDistanceFromSun: "1.5 AU",
    diameterComparedToEarth: "0.53",
     gravity:"3.73 m/s²",
    madeOf: "Mostly rock",
    atmosphere: "Carbon dioxide, nitrogen, argon",
    moons: "2 (Phobos & Deimos)",
    rings: "None",
    temperature: "-125°F to 135°F (−90°C to 60°C)",
    dayLength: "1 day = 24.6 Earth hours",
    yearLength: "1 year = 687 Earth days",
    whatIsItLike:
      "Colder than Earth, very thin atmosphere, reddish dusty soil.",
    spacecraftVisited:
      "Many rovers and orbiters including Curiosity, Perseverance, and InSight.",
    extraFacts:
      "Olympus Mons is the tallest volcano; Valles Marineris is the largest canyon in the solar system.",
    description:
      `Mars is called the Red Planet. Scientists believe it once had liquid water and may have supported simple life.`
  },
},

  {
  name: "Jupiter",
  textureUrl: "/textures/jupiter.jpg",
  size: 1.5,
  distance: 15,
  speed: 0.025,
  
  position: { x: 15, y: 0, z: 0 },
  info: {
    type: "Gas Giant",
    averageDistanceFromSun: "5.2 AU",
    diameterComparedToEarth: "11",
     gravity:"24.79 m/s²",
    madeOf: "Hydrogen and helium",
    atmosphere: "Hydrogen and helium",
    moons: "79+ (scientists continue to find more)",
    rings: "Very thin",
    temperature: "-230°F (−150°C)",
    dayLength: "1 day = 10 Earth hours",
    yearLength: "1 year = 11.8 Earth years",
    whatIsItLike:
      "No solid surface; made of gas and covered with thick clouds.",
    spacecraftVisited:
      "Pioneer 10 & 11, Voyager 1 & 2, Galileo, Juno, Cassini (flyby), New Horizons (flyby).",
    extraFacts:
      "The Great Red Spot is a giant storm larger than Earth that has existed for centuries.",
    description:
      `Jupiter is the largest planet in the solar system with powerful storms and dozens of moons.`
  },
},

  {
  name: "Saturn",
  textureUrl: "/textures/saturn.jpg",
  size: 1.2,
  distance: 19,
  speed: 0.02,
   
  position: { x: 19, y: 0, z: 0 },
  info: {
    type: "Gas Giant",
    averageDistanceFromSun: "9.5 AU",
    diameterComparedToEarth: "9.1",
    gravity:"10.44 m/s²",
    madeOf: "Hydrogen and helium",
    atmosphere: "Hydrogen and helium",
    moons: "82",
    rings: "Amazing — largest ring system in the solar system",
    temperature: "-290°F (−180°C)",
    dayLength: "1 day = 10.7 Earth hours",
    yearLength: "1 year = 29 Earth years",
    whatIsItLike:
      "A gas giant with fierce winds and iconic rings made of ice and rock.",
    spacecraftVisited:
      "Pioneer 11, Voyager 1 & 2, Cassini–Huygens, Dragonfly (arrives in 2030s).",
    extraFacts:
      "Shepherd moons keep gaps in Saturn’s rings clear. The north pole has a massive hexagon-shaped storm.",
    description:
      `Saturn is famous for its bright rings and huge number of moons, including Titan with a thick atmosphere.`
  },
},

 {
  name: "Uranus",
  textureUrl: "/textures/uranus.jpg",
  size: 1,
  distance: 23,
  speed: 0.018,
 
  position: { x: 23, y: 0, z: 0 },
  info: {
    type: "Ice Giant",
    averageDistanceFromSun: "19 AU",
    diameterComparedToEarth: "4.0",
      gravity:"8.69 m/s²",
    madeOf: "Hydrogen, helium, and methane",
    atmosphere: "Hydrogen, helium, and methane",
    moons: "27",
    rings: "Yes — second largest ring system after Saturn",
    temperature: "-360°F (−215°C)",
    dayLength: "1 day = 17.2 Earth hours",
    yearLength: "1 year = 84 Earth years",
    whatIsItLike:
      "Uranus rotates on its side, causing extreme seasons. It looks like a pale blue sphere.",
    spacecraftVisited:
      "Voyager 2 (the only spacecraft to visit Uranus).",
    extraFacts:
      "Miranda, one of Uranus’s moons, looks like smashed boulders stuck together.",
    description:
      `Uranus is an ice giant tilted sideways, giving it very unusual seasons and a unique ring system.`
  },
},

  {
  name: "Neptune",
  textureUrl: "/textures/neptune.jpg",
  size: 1, // Diameter compared to Earth
  distance: 30.06, // Average distance from Sun (AU)
  speed: 0.006, // Adjusted orbital speed for simulation
  
  position: { x: 30.06, y: 0, z: 0 },
  info: {
    type: "Ice Giant",
    averageDistanceFromSun: "30.1 AU",
    diameterComparedToEarth: "3.88",
     gravity:"11.15 m/s²",
    madeOf: "Hydrogen and helium",
    atmosphere: "Hydrogen, helium, and methane",
    moons: "14 (Triton is the largest)",
    rings: "Yes (faint, made of ice particles and dust)",
    temperature: "-373°F (-225°C)",
    dayLength: "1 day = 16 Earth hours",
    yearLength: "1 year = 165 Earth years",
    whatIsItLike:
      "Neptune is a **dark, cold, and extremely windy world**. It has the fastest winds in the solar system, which can reach up to 1,200 miles per hour. Its deep blue color comes from methane in the atmosphere.",
    spacecraftVisited:
      "Voyager 2 (only spacecraft to visit Neptune)",
    facts:
      "Neptune was the **first planet located by mathematical prediction** rather than by empirical observation.",
    description:
      `Neptune is the eighth and most distant major planet orbiting our Sun. Its atmosphere contains methane, which absorbs red light, giving the planet its blue color.`
  },
},
 {
  name: "Pluto",
  textureUrl: "/textures/pluto.jpg",
  size: 0.18, // Diameter compared to Earth
  distance: 39.5, // Average distance from Sun (AU)
  speed: 0.004, // Adjusted orbital speed for simulation
  
  position: { x: 39.5, y: 0, z: 0 },
  info: {
    type: "Dwarf Planet",
    averageDistanceFromSun: "39.5 AU",
    diameterComparedToEarth: "0.18",
     gravity:"0.62 m/s²",
    madeOf: "Rock and ice",
    atmosphere: "Nitrogen, methane, and carbon monoxide (thin and transient)",
    moons: "5 (Charon is the largest)",
    rings: "None",
    temperature: "-387 to -369°F (-233 to -223°C)",
    dayLength: "1 day = 6.4 Earth days",
    yearLength: "1 year = 248 Earth years",
    whatIsItLike:
      "Pluto is a cold, distant world with a varied terrain of **mountains, valleys, and glaciers**. Its atmosphere freezes and collapses onto its surface as it moves farther away from the Sun.",
    spacecraftVisited:
      "New Horizons (first and only spacecraft to visit Pluto)",
    facts:
      "Pluto was reclassified as a **dwarf planet in 2006**. It is part of the Kuiper Belt, a region of icy bodies beyond Neptune.",
    description:
      `Pluto is the largest known dwarf planet in the Solar System, famous for its heart-shaped region named Tombaugh Regio.`
  },
}

];
