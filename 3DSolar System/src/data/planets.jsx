export const planets = [
  {
    name: "Sun",
    textureUrl: "/textures/sun.jpg",
    size: 3.5,
    distance: 0,
    speed: 0,
    position: { x: 0, y: 0, z: 0 },
    info: {
      type: "Star",
      diameter: "1,391,000 km",
      surfaceTemp: "5,500°C",
      description:
        "The Sun is a massive G-type star providing light and warmth to the Solar System.",
    },
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
      diameter: "4,879 km",
      surfaceTemp: "430°C (day), -180°C (night)",
      rotationPeriod: "58.6 Earth days",
      revolutionPeriod: "88 Earth days",
      axisTilt: "0.034°",
      gravity: "3.7 m/s²",
      moons: "None",
      atmosphere: "Almost none (oxygen, sodium, hydrogen)",
      description: `Mercury is the smallest planet and closest to the Sun. It lacks an atmosphere, causing extreme temperature swings.<br><br>
<b>What is it like on Mercury?</b><br>
No air. Lots of craters. Freezing at night and super hot during the very, very long day.`
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
      diameter: "12,104 km",
      surfaceTemp: "465°C",
      atmosphere: "Carbon dioxide, sulfuric acid clouds",
      description:
        "Venus is the hottest planet due to a thick CO₂ atmosphere that traps heat. It rotates backward compared to most planets.",
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
      diameter: "12,742 km",
      surfaceTemp: "15°C average",
      atmosphere: "Nitrogen, oxygen",
      description:
        "Earth is the only known planet with life and liquid water. Its magnetic field and atmosphere make it habitable.",
    },
  },
  {
    name: "Mars",
    textureUrl: "/textures/mars.jpg",
    size: 0.6,
    distance: 12,
    speed: 0.03,
    position: { x: 12, y: 0, z: 0 },
    info: {
      type: "Terrestrial Planet",
      diameter: "6,779 km",
      surfaceTemp: "-60°C average",
      description:
        "Mars, the Red Planet, shows evidence of past liquid water. Scientists believe it may have once supported life.",
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
      diameter: "139,820 km",
      description:
        "Jupiter is the largest planet, mostly hydrogen and helium. Its Great Red Spot is a massive storm centuries old.",
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
      diameter: "116,460 km",
      description:
        "Saturn is known for its rings made of ice and rock. It has over 80 moons, including Titan with a dense atmosphere.",
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
      diameter: "50,724 km",
      description:
        "Uranus rotates on its side, causing extreme seasons. Its blue-green hue comes from methane gas in its atmosphere.",
    },
  },
  {
    name: "Neptune",
    textureUrl: "/textures/neptune.jpg",
    size: 1,
    distance: 27,
    speed: 0.015,
    position: { x: 27, y: 0, z: 0 },
    info: {
      type: "Ice Giant",
      diameter: "49,244 km",
      description:
        "Neptune is the farthest planet from the Sun with supersonic winds and a cold methane-rich atmosphere.",
    },
  },
];
