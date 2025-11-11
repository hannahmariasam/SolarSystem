import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import Sun from "./components/sun";
import Planet from "./components/planet";
import OrbitRing from "./components/OrbitRing";
import Quiz from "./components/Quiz";
import CameraController from "./components/CameraController";
import { planets } from "./data/planets";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [zoomOutTrigger, setZoomOutTrigger] = useState(false);


  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "black" }}>
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 12, 60], fov: 60 }}>
          <color attach="background" args={["#000010"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 10]} intensity={1.2} />
          <Stars radius={150} depth={60} count={5000} factor={4} fade speed={1} />

          <Suspense fallback={null}>
            {/* Camera follows selected planet */}
           <CameraController
  target={selected?.ref ? selected.ref.current : null}
  planetSize={selected ? selected.size : 1}
/>



            {/* Sun */}
          <Sun onClick={(sunData) => setSelected(sunData)} />



            {/* Planets */}
           {planets.slice(1).map((p, i) => (
          <React.Fragment key={i}>
          <OrbitRing radius={p.distance} />
          <Planet {...p} onClick={setSelected} selected={selected} />
          </React.Fragment>
          ))}


            {/* Optional 3D overlay for selected planet */}
            
          
          </Suspense>

          <OrbitControls enableDamping dampingFactor={0.05} enabled={!selected} />


        </Canvas>
      </div>

      {/* Info Panel */}
      <div
        style={{
          width: 360,
          background: "rgba(25,25,35,0.98)",
          transform: isPanelOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s ease",
          borderLeft: "1px solid #333",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: 20, color: "white" }}>
          <h2>🌞 Solar System Explorer</h2>

          {selected ? (
  <>
    <h3>{selected.name}</h3>
    {selected.info ? (
      <>
        <p><b>Type:</b> {selected.info.type}</p>
        <p><b>Diameter:</b> {selected.info.diameter}</p>
        {selected.info.rotationPeriod && <p><b>Rotation Period:</b> {selected.info.rotationPeriod}</p>}
        {selected.info.revolutionPeriod && <p><b>Revolution Period:</b> {selected.info.revolutionPeriod}</p>}
        {selected.info.axisTilt && <p><b>Axis Tilt:</b> {selected.info.axisTilt}</p>}
        {selected.info.gravity && <p><b>Gravity:</b> {selected.info.gravity}</p>}
        {selected.info.moons && <p><b>Moons:</b> {selected.info.moons}</p>}
        {selected.info.surfaceTemp && <p><b>Surface Temp:</b> {selected.info.surfaceTemp}</p>}
        {selected.info.atmosphere && <p><b>Atmosphere:</b> {selected.info.atmosphere}</p>}
        <p
  style={{ marginTop: 10 }}
  dangerouslySetInnerHTML={{ __html: selected.info.description }}
></p>

      </>
    ) : (
      <p>No additional data available.</p>
    )}
  </>
) : (
  <p>Click a planet to view details!</p>
)}



          <Quiz />
        
    


        <button
           onClick={() => {
          setSelected(null);                    // deselect planet/Sun
          setZoomOutTrigger(prev => !prev);     // trigger one-time zoom out
         }}
        >
        🔭 Zoom Out
        </button>






        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        style={{
          position: "absolute",
          top: 20,
          right: isPanelOpen ? 365 : 10,
          background: "rgba(255,255,255,0.1)",
          color: "white",
          border: "1px solid #444",
          borderRadius: 6,
          padding: "6px 10px",
          cursor: "pointer",
          transition: "right 0.3s ease",
          zIndex: 10,
        }}
      >
        {isPanelOpen ? "⮜" : "⮞"}
      </button>
    </div>
  );
}
