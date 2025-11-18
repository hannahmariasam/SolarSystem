import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

import Sun from "./components/sun";
import Planet from "./components/planet";
import OrbitRing from "./components/OrbitRing";
import Quiz from "./components/Quiz";
import CameraController from "./components/CameraController";
import AsteroidBelt from "./components/asteroidbelt";
import KuiperBelt from "./components/kuiperbelt";

import "./App.css";
import { planets } from "./data/planets";
import GravityHUD from "./components/GravityHUD";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [zoomOutTrigger, setZoomOutTrigger] = useState(false);
  const [isZoomedOut, setIsZoomedOut] = useState(true);
  const [quizOpen, setQuizOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "black" }}>
        <div style={{ flex: 1 }}>
          <Canvas camera={{ position: [0, 12, 60], fov: 60 }}>
            <color attach="background" args={["#000010"]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={1.2} />
            <Stars radius={150} depth={60} count={5000} factor={4} fade speed={1} />

            <Suspense fallback={null}>
             

              {/* CAMERA */}
              <CameraController
                target={selected?.ref ? selected.ref.current : null}
                planetSize={selected?.size ?? 1}
                zoomOutTrigger={zoomOutTrigger}
              />

              {/* SUN */}
              <Sun
                onClick={(data) => {
                  setSelected({
                    ...data,
                    openVideo: () => setVideoOpen(true)
                  });
                  setIsZoomedOut(false);
                }}
              />

              {/* BELTS */}
           
          <AsteroidBelt isZoomedOut={isZoomedOut} />
          <KuiperBelt isZoomedOut={isZoomedOut} />

              {/* PLANETS */}
              {planets.slice(1).map((p, i) => (
                <React.Fragment key={i}>
                  <OrbitRing radius={p.distance} />
                  <Planet
                    {...p}
                    selected={selected}
                    isZoomedOut={isZoomedOut}
                    onClick={(data) => {

                      // ⭐ MOON click → NO CAMERA MOVEMENT
                      if (data.noZoom) {
                        setSelected({
                          ...data,
                          openVideo: () => setVideoOpen(true)
                        });
                        return;
                      }

                      // ⭐ PLANET click → CAMERA FOLLOWS
                      setSelected({
                        ...data,
                        openVideo: () => setVideoOpen(true)
                      });

                      setIsZoomedOut(false);
                    }}
                  />
                </React.Fragment>
              ))}

            </Suspense>

            <OrbitControls enableDamping dampingFactor={0.05} enabled={!selected} />
          </Canvas>
           {/* HUD FOR GRAVITY COMPARISON */}
          {/* ⭐ MOVED HERE: This is outside the <Canvas> component and uses standard HTML, fixing the error. */}
          <GravityHUD selected={selected} /> 
        </div>

        {/* INFO PANEL */}
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
                {/* ⭐ NEW: GRAVITY COMPARISON HUD */}
        {selected.info.gravity && (
            <GravityHUD
                planetName={selected.name}
                gravityInfo={selected.info.gravity}
            />
        )}

        {Object.entries(selected.info).map(([key, value]) => (
          <p key={key}>
            <strong>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </strong>{" "}
            {value}
          </p>
        ))}
                

                {selected.info ? (
                  <>
                    {Object.entries(selected.info).map(([key, val]) =>
                      key !== "description" ? (
                        <p key={key}>
                          <b>{key.replace(/([A-Z])/g, " $1")}:</b> {val}
                        </p>
                      ) : null
                    )}

                    <p
                      style={{ marginTop: 10 }}
                      dangerouslySetInnerHTML={{ __html: selected.info.description }}
                    ></p>
                    
                  </>
                ) : (
                  <p>No information available.</p>
                )}

               
              </>
            ) : (
              <p>Click a planet to view details!</p>
            )}

            {/* START QUIZ */}
            <button onClick={() => setQuizOpen(true)}>Start Quiz</button>
            <br />
            <br />

            {/* ZOOM OUT */}
            <button
              onClick={() => {
                setSelected(null);
                setIsZoomedOut(true);
                setZoomOutTrigger((p) => !p);
              }}
            >
              🔭 Zoom Out
            </button>
          </div>
        </div>

        {/* PANEL TOGGLE */}
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

      {/* QUIZ MODAL */}
      {quizOpen && <Quiz onClose={() => setQuizOpen(false)} />}

      
    </>
  );
}
