// src/components/GravityHUD.jsx
import React, { useState, useEffect } from "react";
import "./gravityhud.css";

// Earth's standard gravity in m/s²
const EARTH_GRAVITY_MS2 = 9.8; 

export default function GravityHUD({ selected }) {
  const [inputWeight, setInputWeight] = useState(70); // Default to 70 kg
  const [unit, setUnit] = useState("kg");

  // Reset input weight when a new object is selected
  useEffect(() => {
    // Check if the input is in a reasonable range (to prevent resetting a custom value)
    if (inputWeight === 70 || inputWeight === 154) { 
        setUnit("kg");
        setInputWeight(70);
    }
  }, [selected]);


  if (!selected || !selected.info || !selected.info.gravity) {
    return null; // Don't render if no planet is selected or gravity data is missing
  }

  // 1. Get Planet Gravity
  // Extract the numerical part of the gravity string (e.g., "9.8 m/s²" -> 9.8)
  const gravityString = selected.info.gravity;
  const planetGravityMatch = gravityString.match(/([\d\.]+)/);
  const planetGravity = planetGravityMatch ? parseFloat(planetGravityMatch[1]) : null;

  if (planetGravity === null) {
    return null; // Handle case where gravity value cannot be parsed
  }

  // 2. Normalize Input Weight to a standard unit (Kilograms) for calculation
  let mass;
  if (unit === "kg") {
    // Assuming user inputs a mass (kg), which is common, but technically weight in kg-force.
    // We treat it as Mass (in kg) for the proportionality calculation.
    mass = inputWeight; 
  } else if (unit === "lbs") {
    // Convert pounds (weight) to mass (kg) using Earth's gravity in lbf/kg
    // 1 kg = 2.20462 lbs (on Earth)
    mass = inputWeight / 2.20462;
  }

  // 3. Calculate Weight on the Selected Object
  // Weight_Planet = Mass * Gravity_Planet
  // Since we don't have the user's mass (only Earth-Weight), we use the proportionality:
  // Weight_Planet = Weight_Earth * (Gravity_Planet / Gravity_Earth)
  
  // Calculate the gravity ratio (e.g., Moon is 1.62 / 9.8 = 0.165)
  const gravityRatio = planetGravity / EARTH_GRAVITY_MS2;
  
  // Convert inputWeight (which is Weight_Earth in kg or lbs) to Weight_Planet
  let calculatedWeight = inputWeight * gravityRatio;
  let unitName = unit === "kg" ? "kg" : "lbs";
  
  if (unit === "kg") {
      calculatedWeight = calculatedWeight;
  } else if (unit === "lbs") {
      calculatedWeight = calculatedWeight;
  }


  const planetName = selected.name;

  return (
    <div className="gravity-hud">
      <h3>Gravity Comparison HUD</h3>

      <div className="gravity-input-group">
        <label htmlFor="weight-input">Your Weight on Earth:</label>
        <input
          id="weight-input"
          type="number"
          min="1"
          step="1"
          value={inputWeight}
          onChange={(e) => setInputWeight(parseFloat(e.target.value) || 0)}
        />
      </div>

      <div className="gravity-input-group">
        <label htmlFor="unit-select">Unit:</label>
        <select
          id="unit-select"
          value={unit}
          onChange={(e) => {
            const newUnit = e.target.value;
            // Conversion logic for user experience (optional but good)
            if (newUnit === "lbs" && unit === "kg") {
                setInputWeight(Math.round(inputWeight * 2.20462)); // 70 kg -> 154 lbs
            } else if (newUnit === "kg" && unit === "lbs") {
                setInputWeight(Math.round(inputWeight / 2.20462)); // 154 lbs -> 70 kg
            }
            setUnit(newUnit);
          }}
        >
          <option value="kg">Kilograms (kg)</option>
          <option value="lbs">Pounds (lbs)</option>
        </select>
      </div>

      <div className="weight-result">
        <p>Gravity on {planetName}: <strong>{planetGravity} m/s²</strong></p>
        <p>Your Weight on Earth: <strong>{inputWeight} {unitName}</strong></p>
        <p>Your Weight on {planetName}: <strong>{calculatedWeight.toFixed(2)} {unitName}</strong></p>
      </div>
    </div>
  );
}