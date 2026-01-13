import React, { useRef, useState, Suspense, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Phone, Mail, X, ChevronRight, Home, Building, Waves, Hotel, MessageCircle } from 'lucide-react';

// --- 🌳 Tree Component ---
const Tree = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.8, 8]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.5, 12, 12]} />
        <meshStandardMaterial color="#2E7D32" />
      </mesh>
      <mesh position={[0, 1.4, 0]} castShadow>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshStandardMaterial color="#388E3C" />
      </mesh>
    </group>
  );
};

// --- 🌿 Bush Component ---
const Bush = ({ position, scale = 1 }) => {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color="#43A047" />
      </mesh>
      <mesh position={[0.15, 0.05, 0.1]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#66BB6A" />
      </mesh>
    </group>
  );
};

// --- 💡 Street Lamp Component (เสาไฟถนน) ---
const StreetLamp = ({ position, rotation, isDark }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Pole */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 3, 8]} />
        <meshStandardMaterial color="#263238" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Arm */}
      <mesh position={[0.4, 2.9, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#263238" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Head */}
      <mesh position={[0.75, 2.85, 0]}>
        <boxGeometry args={[0.3, 0.08, 0.2]} />
        <meshStandardMaterial color="#263238" />
      </mesh>
      {/* Bulb */}
      <mesh position={[0.75, 2.8, 0]}>
        <boxGeometry args={[0.25, 0.02, 0.15]} />
        <meshStandardMaterial 
          color={isDark ? "#FFF9C4" : "#FFFFFF"}
          emissive={isDark ? "#FFF176" : "#000000"}
          emissiveIntensity={isDark ? 2 : 0}
        />
      </mesh>
      {/* Light Source */}
      {isDark && (
        <spotLight 
          position={[0.75, 2.7, 0]} 
          angle={0.6} 
          penumbra={0.5} 
          intensity={8} 
          distance={10}
          color="#FFF9C4"
          castShadow
        />
      )}
    </group>
  );
};

// --- 💡 Garden Light Component (ไฟทางเดิน) ---
const GardenLight = ({ position, isDark }) => {
  return (
    <group position={position}>
       {/* Body */}
       <mesh position={[0, 0.2, 0]} castShadow>
         <boxGeometry args={[0.1, 0.4, 0.1]} />
         <meshStandardMaterial color="#424242" />
       </mesh>
       {/* Light Part */}
       <mesh position={[0, 0.35, 0]}>
         <boxGeometry args={[0.08, 0.08, 0.08]} />
         <meshStandardMaterial 
            color="#FFFFFF"
            emissive={isDark ? "#FFD54F" : "#000000"}
            emissiveIntensity={isDark ? 3 : 0} 
         />
       </mesh>
       {/* Glow */}
       {isDark && (
         <pointLight position={[0, 0.4, 0]} intensity={1} distance={2} color="#FFD54F" />
       )}
    </group>
  );
};

// --- 🚗 Compact Hyper-Realistic Car (Scaled Down & Detailed) ---
const Car = ({ position, rotation, isDark }) => {
  // --- CAR CUSTOMIZATION ---
  const bodyColor = "#283593"; // Deep Blue Metallic
  const roofColor = "#1A1A1A"; // Black Roof
  const glassColor = "#263238"; 
  const accentColor = "#FFC107"; // Gold Brake Calipers
  
  // ลดขนาดล้อและระยะต่างๆ ลง 25%
  const wheelRadius = 0.2; 
  const wheelWidth = 0.14;
  const chassisLevel = 0.22; // ระยะห่างจากพื้น (Ground Clearance)

  return (
    <group position={position} rotation={rotation}>
      
      {/* --- Main Car Body Group --- */}
      <group position={[0, chassisLevel, 0]}>

        {/* 1. Base Plate (ฐานล่างสุด) */}
        <mesh position={[0, -0.04, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.05, 0.08, 2.1]} /> {/* ลดขนาดจาก 1.4/2.8 */}
          <meshStandardMaterial color="#0A0A0A" roughness={0.9} />
        </mesh>

        {/* 2. Main Chassis Body (ตัวถังหลัก) */}
        <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.32, 2.05]} />
          <meshStandardMaterial color={bodyColor} metalness={0.7} roughness={0.2} />
        </mesh>

        {/* 3. Fender Flares (ซุ้มล้อโป่ง - ปรับตำแหน่งใหม่) */}
        {/* หน้าซ้าย/ขวา */}
        <mesh position={[0.5, 0.2, 0.65]} castShadow><boxGeometry args={[0.15, 0.22, 0.45]} /><meshStandardMaterial color={bodyColor} metalness={0.7} roughness={0.2} /></mesh>
        <mesh position={[-0.5, 0.2, 0.65]} castShadow><boxGeometry args={[0.15, 0.22, 0.45]} /><meshStandardMaterial color={bodyColor} metalness={0.7} roughness={0.2} /></mesh>
        {/* หลังซ้าย/ขวา */}
        <mesh position={[0.5, 0.2, -0.65]} castShadow><boxGeometry args={[0.15, 0.22, 0.45]} /><meshStandardMaterial color={bodyColor} metalness={0.7} roughness={0.2} /></mesh>
        <mesh position={[-0.5, 0.2, -0.65]} castShadow><boxGeometry args={[0.15, 0.22, 0.45]} /><meshStandardMaterial color={bodyColor} metalness={0.7} roughness={0.2} /></mesh>

        {/* 4. Hood (ฝากระโปรงหน้า - ลาดลง) */}
        <mesh position={[0, 0.36, 0.7]} rotation={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.95, 0.08, 0.8]} />
          <meshStandardMaterial color={bodyColor} metalness={0.7} roughness={0.2} />
        </mesh>

        {/* 5. Windshield & Cabin (กระจกและห้องโดยสาร) */}
        <mesh position={[0, 0.55, -0.1]} castShadow>
          <boxGeometry args={[0.85, 0.38, 1.3]} />
          <meshStandardMaterial color={glassColor} metalness={0.95} roughness={0.1} />
        </mesh>

        {/* 6. Roof (หลังคา Two-tone) */}
        <mesh position={[0, 0.75, -0.15]} castShadow>
          <boxGeometry args={[0.9, 0.04, 1.1]} />
          <meshStandardMaterial color={roofColor} metalness={0.5} roughness={0.3} />
        </mesh>

        {/* 7. Rear Trunk (ท้ายรถลาดลง) */}
        <mesh position={[0, 0.36, -0.7]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.95, 0.08, 0.8]} />
          <meshStandardMaterial color={bodyColor} metalness={0.7} roughness={0.2} />
        </mesh>

        {/* --- EXTERIOR DETAILS (รายละเอียดภายนอก) --- */}
        {/* กระจกมองข้าง */}
        <group>
          <mesh position={[0.52, 0.45, 0.3]}><boxGeometry args={[0.04, 0.02, 0.08]} /><meshStandardMaterial color="#555" /></mesh>
          <mesh position={[0.58, 0.42, 0.35]}><boxGeometry args={[0.12, 0.08, 0.06]} /><meshStandardMaterial color={bodyColor} /></mesh>
          
          <mesh position={[-0.52, 0.45, 0.3]}><boxGeometry args={[0.04, 0.02, 0.08]} /><meshStandardMaterial color="#555" /></mesh>
          <mesh position={[-0.58, 0.42, 0.35]}><boxGeometry args={[0.12, 0.08, 0.06]} /><meshStandardMaterial color={bodyColor} /></mesh>
        </group>

        {/* มือจับประตู */}
        <mesh position={[0.51, 0.32, 0]}><boxGeometry args={[0.02, 0.025, 0.12]} /><meshStandardMaterial color={roofColor} /></mesh>
        <mesh position={[-0.51, 0.32, 0]}><boxGeometry args={[0.02, 0.025, 0.12]} /><meshStandardMaterial color={roofColor} /></mesh>

        {/* ท่อไอเสียคู่ */}
        <mesh position={[0.2, 0.05, -1.05]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.035, 0.035, 0.1, 8]} /><meshStandardMaterial color="#333" /></mesh>
        <mesh position={[-0.2, 0.05, -1.05]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.035, 0.035, 0.1, 8]} /><meshStandardMaterial color="#333" /></mesh>

      </group>


      {/* --- WHEELS (ล้อแม็ก + เบรก) --- */}
      {[[-0.48, 0.65], [0.48, 0.65], [-0.48, -0.65], [0.48, -0.65]].map((pos, i) => (
        <group key={i} position={[pos[0], wheelRadius, pos[1]]} rotation={[0, 0, Math.PI / 2]}>
          {/* ยาง */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[wheelRadius, wheelRadius, wheelWidth, 24]} />
            <meshStandardMaterial color="#111111" roughness={0.8} />
          </mesh>
          {/* แม็ก */}
          <mesh position={[0, i % 2 === 0 ? -0.015 : 0.015, 0]}>
            <cylinderGeometry args={[0.13, 0.13, wheelWidth + 0.01, 16]} />
            <meshStandardMaterial color="#505050" metalness={0.8} />
          </mesh>
          {/* เบรกคาลิปเปอร์ */}
          <mesh position={[i % 2 === 0 ? -0.04 : 0.04, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.04, 0.1, 0.06]} />
            <meshStandardMaterial color={accentColor} />
          </mesh>
        </group>
      ))}


      {/* --- LIGHTING (ไฟหน้า/หลัง LED) --- */}
      <group position={[0, chassisLevel, 0]}>
        
        {/* ไฟหน้า (Headlights) */}
        <group position={[0, 0.35, 1.05]}>
           {/* กรอบดำ */}
           <mesh position={[0, 0, -0.02]}><boxGeometry args={[0.95, 0.2, 0.04]} /><meshStandardMaterial color="#0A0A0A" /></mesh>
           {/* หลอดไฟ */}
           {[-0.35, 0.35].map((x, i) => (
             <group key={i} position={[x, 0, 0]}>
                <mesh>
                  <boxGeometry args={[0.22, 0.12, 0.05]} />
                  <meshStandardMaterial color={isDark ? "#E0F7FA" : "#FFF"} emissive={isDark ? "#FFF" : "#CCC"} emissiveIntensity={isDark ? 5 : 0.5} toneMapped={false} />
                </mesh>
                {isDark && <spotLight position={[0, 0, 0.1]} angle={0.5} penumbra={0.4} intensity={8} distance={10} color="#FFF" target-position={[0, -0.5, 5]} />}
             </group>
           ))}
        </group>

        {/* ไฟท้าย (Tail Lights LED Bar) */}
        <group position={[0, 0.38, -1.05]}>
           <mesh position={[0, 0, -0.02]}><boxGeometry args={[0.95, 0.15, 0.04]} /><meshStandardMaterial color="#0A0A0A" /></mesh>
           {/* LED Strip */}
           <mesh><boxGeometry args={[0.9, 0.06, 0.05]} /><meshStandardMaterial color="#D32F2F" emissive="#FF0000" emissiveIntensity={isDark ? 2 : 0.8} toneMapped={false} /></mesh>
           {/* ไฟเลี้ยว/ถอย */}
           <mesh position={[0.3, 0.05, 0.01]}><boxGeometry args={[0.15, 0.02, 0.05]} /><meshStandardMaterial color="#FFB300" emissive="#FFB300" emissiveIntensity={1} /></mesh>
           <mesh position={[-0.3, 0.05, 0.01]}><boxGeometry args={[0.15, 0.02, 0.05]} /><meshStandardMaterial color="#FFB300" emissive="#FFB300" emissiveIntensity={1} /></mesh>
        </group>

        {/* กระจังหน้า (Grille) */}
        <group position={[0, 0.15, 1.06]} rotation={[0.05, 0, 0]}>
             <mesh position={[0, 0.15, 0]}><boxGeometry args={[0.5, 0.12, 0.04]} /><meshStandardMaterial color="#111" /></mesh>
             <mesh position={[0, -0.05, 0]}><boxGeometry args={[0.8, 0.08, 0.04]} /><meshStandardMaterial color="#111" /></mesh>
             <mesh position={[0, -0.05, 0.03]}><boxGeometry args={[0.3, 0.06, 0.02]} /><meshStandardMaterial color="#333" /></mesh> {/* ป้ายทะเบียน */}
        </group>

      </group>

    </group>
  );
};

// --- 🏊 Swimming Pool Component (Smaller Size) ---
const SwimmingPool = ({ position, isDark }) => {
  return (
    <group position={position}>
      {/* 1. Pool Deck (ลดขนาดฐานสระลง) */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
         {/* เดิมกว้าง 3 ยาว 5.5 -> ปรับเหลือ กว้าง 2.6 ยาว 5 */}
         <boxGeometry args={[2.6, 0.1, 5]} /> 
         <meshStandardMaterial color="#8D6E63" roughness={0.8} />
      </mesh>

      {/* 2. Water Hole (ลดขนาดบ่อน้ำ) */}
      <mesh position={[0, 0.06, 0]}>
         {/* ปรับเหลือ กว้าง 2.0 ยาว 4.0 */}
         <boxGeometry args={[2.0, 0.05, 4.0]} />
         <meshStandardMaterial color="#006064" />
      </mesh>

      {/* 3. Water Surface (ผิวน้ำ) */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[2.0, 0.05, 4.0]} />
        <meshPhysicalMaterial color="#00E5FF" transparent opacity={0.7} metalness={0.1} roughness={0.05} transmission={0.6} thickness={1} />
      </mesh>
      
      {/* Pool Lights (Underwater) */}
      {isDark && (
        <>
            <pointLight position={[0, 0.3, 1]} intensity={2} distance={3} color="#00E5FF" />
            <pointLight position={[0, 0.3, -1]} intensity={2} distance={3} color="#00E5FF" />
        </>
      )}

      {/* 4. Coping (ขอบปูนสระ - คำนวณตำแหน่งใหม่ให้ชิดน้ำมากขึ้น) */}
      {/* ขอบบน-ล่าง (Z axis) */}
      <mesh position={[0, 0.11, -2.1]}><boxGeometry args={[2.4, 0.05, 0.2]} /><meshStandardMaterial color="#EEEEEE" /></mesh>
      <mesh position={[0, 0.11, 2.1]}><boxGeometry args={[2.4, 0.05, 0.2]} /><meshStandardMaterial color="#EEEEEE" /></mesh>
      {/* ขอบซ้าย-ขวา (X axis) - ขยับเข้าจาก 1.7 เหลือ 1.1 */}
      <mesh position={[-1.1, 0.11, 0]}><boxGeometry args={[0.2, 0.05, 4.4]} /><meshStandardMaterial color="#EEEEEE" /></mesh>
      <mesh position={[1.1, 0.11, 0]}><boxGeometry args={[0.2, 0.05, 4.4]} /><meshStandardMaterial color="#EEEEEE" /></mesh>

      {/* 5. Ladder (บันได - ขยับเข้ามาให้เกาะขอบสระใหม่) */}
      <group position={[-0.9, 0, -2.0]}>
         <mesh position={[0, 0, 0]}><cylinderGeometry args={[0.03, 0.03, 0.6]} /><meshStandardMaterial color="#CFD8DC" metalness={0.8} /></mesh>
         <mesh position={[0.3, 0, 0]}><cylinderGeometry args={[0.03, 0.03, 0.6]} /><meshStandardMaterial color="#CFD8DC" metalness={0.8} /></mesh>
      </group>

      {/* 6. Beach Chair (New Design: Modern Wooden Lounger) */}
      <group position={[0.7, 0.18, -3.5]} rotation={[0, -0.6, 0]}>
        
        {/* --- โครงเก้าอี้ (Frame) --- */}
        {/* พื้นราบ (Seat Base) */}
        <mesh position={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.6, 0.05, 1.2]} />
          <meshStandardMaterial color="#5D4037" /> {/* สีไม้เข้ม */}
        </mesh>

        {/* ขาเก้าอี้ (Legs) */}
        <mesh position={[-0.25, -0.08, 0.8]}><cylinderGeometry args={[0.02, 0.02, 0.15]} /><meshStandardMaterial color="#3E2723" /></mesh>
        <mesh position={[0.25, -0.08, 0.8]}><cylinderGeometry args={[0.02, 0.02, 0.15]} /><meshStandardMaterial color="#3E2723" /></mesh>
        <mesh position={[-0.25, -0.08, -0.2]}><cylinderGeometry args={[0.02, 0.02, 0.15]} /><meshStandardMaterial color="#3E2723" /></mesh>
        <mesh position={[0.25, -0.08, -0.2]}><cylinderGeometry args={[0.02, 0.02, 0.15]} /><meshStandardMaterial color="#3E2723" /></mesh>

        {/* --- พนักพิง (Backrest Frame - ปรับองศา) --- */}
        <group position={[0, 0, -0.3]} rotation={[0.5, 0, 0]}> 
          <mesh position={[0, 0.25, 0]} castShadow>
             <boxGeometry args={[0.6, 0.05, 0.6]} />
             <meshStandardMaterial color="#5D4037" />
          </mesh>
          {/* เบาะพิงหลัง (Back Cushion) */}
          <mesh position={[0, 0.28, 0]}>
             <boxGeometry args={[0.5, 0.06, 0.55]} />
             <meshStandardMaterial color="#FF5252" /> {/* สีเบาะแดง */}
          </mesh>
        </group>

        {/* --- เบาะนั่ง (Seat Cushion) --- */}
        <mesh position={[0, 0.06, 0.3]}>
          <boxGeometry args={[0.5, 0.06, 1.15]} />
          <meshStandardMaterial color="#FF5252" /> {/* สีเบาะแดง */}
        </mesh>

        {/* (Optional) หมอนใบเล็ก */}
        <mesh position={[0, 0.45, -0.55]} rotation={[0.5, 0, 0]}>
           <boxGeometry args={[0.35, 0.1, 0.2]} />
           <meshStandardMaterial color="#FFFFFF" />
        </mesh>

      </group>
    </group>
  );
};

// --- 🏠 Modern House Component (With Fixes & Lights) ---
const ModernHouse = ({ isDark }) => {
  const group = useRef();
  const { gl } = useThree();
  
  // Mouse drag state logic
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.25, y: -0.5 });
  const currentRotation = useRef({ x: 0.25, y: -0.5 });
  const baseY = useRef(-1.2);

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    gl.domElement.style.cursor = 'grabbing';
  }, [gl]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    gl.domElement.style.cursor = 'grab';
  }, [gl]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;
    targetRotation.current.y += deltaX * 0.005;
    targetRotation.current.x += deltaY * 0.003;
    targetRotation.current.x = Math.max(0.0, Math.min(0.5, targetRotation.current.x));
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.style.cursor = 'grab';
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (!group.current) return;
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;
    group.current.rotation.x = currentRotation.current.x;
    group.current.rotation.y = currentRotation.current.y;
    group.current.position.y = baseY.current + Math.sin(Date.now() * 0.001) * 0.05;
  });

  return (
    <group ref={group} position={[0, -1.2, 0]} scale={[0.65, 0.65, 0.65]}>
      
      {/* Ground & Landscape */}
      <group position={[0, -0.1, 0]}>
        <mesh position={[0, -0.15, 0]} receiveShadow castShadow>
          <boxGeometry args={[12, 0.35, 11]} /> 
          <meshStandardMaterial color="#7CB342" />
        </mesh>
        
        {/* Driveway */}
        <mesh position={[-2.5, 0.02, 3]} receiveShadow>
          <boxGeometry args={[3, 0.08, 5]} />
          <meshStandardMaterial color="#9E9E9E" roughness={0.7} />
        </mesh>

        {/* Walkway (✅ Fixed Alignment: X=0.5 to match door) */}
        <mesh position={[0.5, 0.02, 2.5]} castShadow>
          <boxGeometry args={[1.5, 0.08, 2.5]} />
          <meshStandardMaterial color="#BDBDBD" roughness={0.8} />
        </mesh>

        {/* Fences */}
        <mesh position={[-5.8, 0.4, 0]} castShadow><boxGeometry args={[0.12, 0.8, 9]} /><meshStandardMaterial color="#FAFAFA" /></mesh>
        <mesh position={[5.8, 0.4, 0]} castShadow><boxGeometry args={[0.12, 0.8, 9]} /><meshStandardMaterial color="#FAFAFA" /></mesh>
        <mesh position={[0, 0.4, -4.3]} castShadow><boxGeometry args={[11.7, 0.8, 0.12]} /><meshStandardMaterial color="#FAFAFA" /></mesh>
      </group>

      {/* ===== 💡 LIGHTS ===== */}
      
      {/* 1. Street Lamp (เสาไฟถนน) */}
      <StreetLamp position={[-3.5, 0, 5]} rotation={[0, -Math.PI / 4, 0]} isDark={isDark} />
      
      {/* 2. Garden Lights (✅ Fixed Alignment to flank the walkway) */}
      <GardenLight position={[-0.1, 0, 3.5]} isDark={isDark} /> {/* ซ้าย */}
      <GardenLight position={[1.1, 0, 3.5]} isDark={isDark} />  {/* ขวา */}
      <GardenLight position={[-0.1, 0, 2]} isDark={isDark} />   {/* ซ้ายใน */}
      <GardenLight position={[1.1, 0, 2]} isDark={isDark} />    {/* ขวาใน */}

      {/* ===== 🏊 SWIMMING POOL ===== */}
      <SwimmingPool position={[4.0, 0, 1.5]} isDark={isDark} />

      {/* ===== 🏠 GARAGE ===== */}
      <group position={[-2.5, 0.5, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[2.5, 2, 2.5]} />
          <meshStandardMaterial color="#F5F5F5" />
        </mesh>
        <mesh position={[0, -0.3, 1.26]} castShadow>
          <boxGeometry args={[2.0, 1.4, 0.08]} />
          <meshStandardMaterial color="#424242" metalness={0.3} roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[2.7, 0.18, 2.7]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>

        {/* Wall Light Garage (ไฟกิ่งโรงรถ) */}
        <group position={[1, 0.5, 1.3]}>
           <mesh>
             <boxGeometry args={[0.15, 0.2, 0.1]} />
             <meshStandardMaterial color="#333" />
           </mesh>
           <mesh position={[0, 0, 0.05]}>
             <boxGeometry args={[0.1, 0.15, 0.02]} />
             <meshStandardMaterial color="#FFF" emissive={isDark ? "#FFA000" : "#000"} emissiveIntensity={isDark ? 3 : 0} />
           </mesh>
           {isDark && <pointLight intensity={1} distance={3} color="#FFA000" />}
        </group>
      </group>

      {/* ===== 🚗 CAR ===== */}
      <Car position={[-2.5, 0, 4]} rotation={[0, 0, 0]} isDark={isDark} />

      {/* ===== MAIN BUILDING (Global Center shifted X=0.5) ===== */}
      <group position={[0.5, 0.8, -0.3]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[4, 2.5, 3.5]} />
          <meshStandardMaterial color="#FAFAFA" />
        </mesh>
        <mesh position={[0.3, 2.2, 0]} castShadow>
          <boxGeometry args={[3.4, 1.8, 3.2]} />
          <meshStandardMaterial color="#F5F5F5" />
        </mesh>
        
        {/* Windows */}
        <mesh position={[-1.2, 0.2, 1.76]}>
          <boxGeometry args={[0.8, 1.2, 0.06]} />
          <meshStandardMaterial color={isDark ? "#FFE082" : "#4FC3F7"} emissive={isDark ? "#FFA726" : "#000000"} emissiveIntensity={isDark ? 0.8 : 0} metalness={isDark ? 0.1 : 0.5} roughness={isDark ? 0.3 : 0.1} />
        </mesh>
        <mesh position={[1.2, 0.2, 1.76]}>
          <boxGeometry args={[0.8, 1.2, 0.06]} />
          <meshStandardMaterial color={isDark ? "#FFE082" : "#4FC3F7"} emissive={isDark ? "#FFA726" : "#000000"} emissiveIntensity={isDark ? 0.8 : 0} metalness={isDark ? 0.1 : 0.5} roughness={isDark ? 0.3 : 0.1} />
        </mesh>
        
        {/* Door (Local X=0 matches Global X=0.5) */}
        <mesh position={[0, -0.4, 1.76]} castShadow>
          <boxGeometry args={[0.9, 1.7, 0.1]} />
          <meshStandardMaterial color="#3E2723" />
        </mesh>
        <mesh position={[0.35, -0.4, 1.82]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#FFD54F" metalness={0.8} />
        </mesh>

        {/* Wall Lights Front Door (ไฟกิ่งหน้าประตู) */}
        <group position={[-0.6, 0.2, 1.8]}>
           <mesh>
             <boxGeometry args={[0.12, 0.25, 0.1]} />
             <meshStandardMaterial color="#333" />
           </mesh>
           <mesh position={[0, 0, 0.06]}>
             <boxGeometry args={[0.08, 0.18, 0.02]} />
             <meshStandardMaterial color="#FFF" emissive={isDark ? "#FFA000" : "#000"} emissiveIntensity={isDark ? 3 : 0} />
           </mesh>
           {isDark && <pointLight intensity={1.5} distance={4} color="#FFA000" />}
        </group>
        <group position={[0.6, 0.2, 1.8]}>
           <mesh>
             <boxGeometry args={[0.12, 0.25, 0.1]} />
             <meshStandardMaterial color="#333" />
           </mesh>
           <mesh position={[0, 0, 0.06]}>
             <boxGeometry args={[0.08, 0.18, 0.02]} />
             <meshStandardMaterial color="#FFF" emissive={isDark ? "#FFA000" : "#000"} emissiveIntensity={isDark ? 3 : 0} />
           </mesh>
           {isDark && <pointLight intensity={1.5} distance={4} color="#FFA000" />}
        </group>
        
        {/* Window Floor 2 */}
        <mesh position={[0.3, 2.2, 1.61]}>
          <boxGeometry args={[2, 1, 0.06]} />
          <meshStandardMaterial color={isDark ? "#FFE082" : "#4FC3F7"} emissive={isDark ? "#FFA726" : "#000000"} emissiveIntensity={isDark ? 0.8 : 0} metalness={isDark ? 0.1 : 0.5} roughness={isDark ? 0.3 : 0.1} />
        </mesh>
        
        {/* Balcony */}
        <mesh position={[0.3, 1.4, 1.8]} castShadow>
          <boxGeometry args={[2.5, 0.12, 0.6]} />
          <meshStandardMaterial color="#9E9E9E" />
        </mesh>
        <mesh position={[0.3, 1.7, 2.05]}>
          <boxGeometry args={[2.5, 0.5, 0.06]} />
          <meshStandardMaterial color="#E0E0E0" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* ===== ROOF ===== */}
      <group position={[0.8, 3.5, -0.3]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[4.2, 0.22, 3.8]} />
          <meshStandardMaterial color="#3E2723" />
        </mesh>
        <mesh position={[0, 0.72, 0]} castShadow>
          <boxGeometry args={[3.6, 0.22, 3.2]} />
          <meshStandardMaterial color="#4E342E" />
        </mesh>
        <mesh position={[0, 0.94, 0]} castShadow>
          <boxGeometry args={[2.8, 0.18, 2.4]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
      </group>

      {/* ===== TREES & BUSHES ===== */}
      <Tree position={[5.2, 0, -3.5]} scale={1.2} />
      <Tree position={[-5.0, 0, -3]} scale={1.1} />
      <Tree position={[5, 0, 4]} scale={0.9} />
      
      <Bush position={[3, 0.1, 4.5]} scale={1} />
      <Bush position={[-1, 0.1, 3]} scale={0.8} />
      <Bush position={[5.2, 0.1, 1]} scale={0.7} />
      <Bush position={[-4.5, 0.1, 1]} scale={0.9} />

    </group>
  );
};

// --- Bottom Menu Component ---
const BottomMenu = ({ activePanel, onButtonClick }) => {
  const buttons = [
    { id: 'houses', label: 'แบบบ้าน', icon: <Home size={18} />, color: 'bg-blue-500', shadow: 'shadow-blue-500/30' },
    { id: 'line', label: 'Line Official', icon: <MessageCircle size={18} />, color: 'bg-green-500', shadow: 'shadow-green-500/30' },
  ];

  return (
    <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto">
      <div className="flex items-center gap-3 p-2.5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        {buttons.map((btn) => {
          const isActive = activePanel === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => onButtonClick(btn.id)}
              className={`
                relative flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl font-bold text-sm md:text-base text-white 
                transition-all duration-300 transform
                ${isActive ? `${btn.color} scale-105 shadow-lg ${btn.shadow} ring-2 ring-white/50` : 'hover:bg-white/10 hover:scale-105'}
              `}
            >
              {btn.icon}
              <span className="hidden md:inline">{btn.label}</span>
              <span className="md:hidden">{btn.label}</span> 
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- Info Panel ---
const InfoPanel = ({ type, isVisible, onClose }) => {
  const content = {
    line: {
      title: "Line Official",
      icon: <MessageCircle className="text-white" size={24} />,
      color: "bg-green-500",
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">แอดไลน์เพื่อรับโปรโมชั่นพิเศษและปรึกษาฟรี!</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "@giftshi.official", qr: "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://line.me/R/ti/p/@giftshi.official" },
              { id: "@giftzapyya", qr: "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://line.me/R/ti/p/@giftzapyya" }
            ].map((line, i) => (
              <div key={i} className="text-center p-3 bg-green-50 rounded-xl">
                <img src={line.qr} alt={line.id} className="w-20 h-20 mx-auto mb-2 rounded-lg" />
                <div className="text-xs font-bold text-green-700">{line.id}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    houses: {
      title: "แบบบ้าน",
      icon: <Home className="text-white" size={24} />,
      color: "bg-blue-500",
      content: (
        <div className="space-y-4">
          <p className="text-slate-600">เลือกชมแบบบ้านที่ตรงใจคุณ</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Home, name: "บ้านพักอาศัย", count: "25+" },
              { icon: Building, name: "อาคารพาณิชย์", count: "10+" },
              { icon: Waves, name: "บ้านลอยน้ำ", count: "8+" },
              { icon: Hotel, name: "รีสอร์ท", count: "12+" },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group">
                <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center mb-2 transition-colors">
                  <item.icon className="text-blue-600 group-hover:text-white transition-colors" size={16} />
                </div>
                <div className="font-medium text-slate-700 text-sm">{item.name}</div>
                <div className="text-xs text-slate-400">{item.count} แบบ</div>
              </div>
            ))}
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
            ดูแบบบ้านทั้งหมด
            <ChevronRight size={18} />
          </button>
        </div>
      )
    }
  };

  const info = content[type];
  if (!info) return null;

  return (
    <div className={`fixed right-4 top-24 w-80 z-40 transition-all duration-500 ease-out ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className={`${info.color} px-5 py-4 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              {info.icon}
            </div>
            <h3 className="text-white font-bold text-lg">{info.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="text-white" size={18} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-5">
          {info.content}
        </div>
      </div>
    </div>
  );
};

// --- Hero Content (Left side) ---
const HeroContent = ({ isDark }) => {
  return (
    <div className="fixed left-6 md:left-16 top-1/2 -translate-y-1/2 z-20 max-w-md pointer-events-none">
      <div className={`backdrop-blur-xl p-8 rounded-3xl shadow-2xl border pointer-events-auto ${isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-white/50'}`}>
        <div className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
          ✨ รับสร้างบ้าน 2026
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold leading-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          สร้างบ้าน...<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
            ที่บ่งบอกความเป็นคุณ
          </span>
        </h1>
        <p className={`leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          บริการรับสร้างบ้านครบวงจร รีสอร์ท บ้านลอยน้ำ และอาคารพาณิชย์ 
          ด้วยเทคโนโลยีทันสมัย ใส่ใจทุกรายละเอียด
        </p>
        
        {/* Stats */}
        <div className={`flex gap-6 mb-6 p-4 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-slate-900'} text-white`}>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-400">50+</div>
            <div className="text-xs text-slate-400">โครงการ</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-400">20</div>
            <div className="text-xs text-slate-400">ปีรับประกัน</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-400">100%</div>
            <div className="text-xs text-slate-400">ลูกค้าพอใจ</div>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2">
            ดูแบบบ้าน
            <ChevronRight size={20} />
          </button>
          <button className={`w-full px-8 py-4 rounded-xl font-bold transition-all duration-300 ${isDark ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
            ปรึกษาเรา
          </button>
        </div>

        <p className={`text-center text-sm mt-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          🖱️ ลากเมาส์เพื่อหมุนดูบ้าน 3D
        </p>
      </div>
    </div>
  );
};

// --- Main HomePage Component ---
const HomePage = ({ isDark }) => {
  const [activePanel, setActivePanel] = useState(null);

  const handleToggle = (type) => {
    setActivePanel(prev => prev === type ? null : type);
  };

  const handleClosePanel = useCallback(() => {
    setActivePanel(null);
  }, []);

  // Theme-aware backgrounds
  const lightBg = 'linear-gradient(180deg, #fef3c7 0%, #fed7aa 25%, #fecaca 50%, #e0e7ff 75%, #c7d2fe 100%)';
  const darkBg = 'linear-gradient(180deg, #0f172a 0%, #1e293b 30%, #334155 60%, #1e1b4b 100%)';

  return (
    <>
      {/* Background Gradient - Theme aware */}
      <div className="fixed inset-0 w-full h-full transition-all duration-700" style={{ 
        background: isDark ? darkBg : lightBg,
        zIndex: -1 
      }}></div>
      
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none transition-all duration-700" style={{ zIndex: -1 }}>
        {isDark ? (
          <>
            <div className="absolute top-0 left-0 right-0 h-[500px]">
              <div className="absolute -top-20 left-1/4 w-[700px] h-[400px] bg-gradient-to-b from-emerald-500/25 via-cyan-400/15 to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }}></div>
              <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-b from-violet-500/20 via-fuchsia-400/10 to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
              <div className="absolute -top-10 left-1/2 w-[500px] h-[300px] bg-gradient-to-b from-teal-400/15 via-green-300/8 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
            </div>
            <div className="absolute top-10 left-1/4 w-1 h-1 bg-white rounded-full opacity-60"></div>
            <div className="absolute top-20 left-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-40"></div>
            <div className="absolute top-32 right-1/4 w-1 h-1 bg-white rounded-full opacity-70"></div>
            <div className="absolute top-16 right-1/3 w-2 h-2 bg-white rounded-full opacity-30"></div>
            <div className="absolute top-40 left-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-50"></div>
            <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
          </>
        ) : (
          <>
            <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-amber-300/40 rounded-full blur-[100px]"></div>
            <div className="absolute top-20 left-20 w-40 h-20 bg-white/50 rounded-full blur-xl"></div>
            <div className="absolute top-32 left-40 w-32 h-16 bg-white/40 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-100/50 to-transparent"></div>
          </>
        )}
      </div>

      {/* 3D Canvas */}
      <div className="fixed inset-0 w-full h-screen" style={{ zIndex: 0 }}>
        <Canvas 
          shadows 
          camera={{ position: [0, 1.5, 10], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={isDark ? 0.3 : 0.6} />
            <directionalLight 
              position={[8, 12, 8]} 
              intensity={isDark ? 0.5 : 1.5} 
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <directionalLight position={[-5, 5, -5]} intensity={isDark ? 0.2 : 0.3} />
            <hemisphereLight intensity={isDark ? 0.3 : 0.4} groundColor="#8d7c5c" />
            
            <Environment preset={isDark ? "night" : "sunset"} background={false} />

            <ModernHouse isDark={isDark} />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Elements */}
      <HeroContent isDark={isDark} />
      
      {/* Bottom Menu */}
      <BottomMenu activePanel={activePanel} onButtonClick={handleToggle} />

      {/* Info Panels */}
      <InfoPanel 
        type={activePanel} 
        isVisible={!!activePanel} 
        onClose={handleClosePanel}
      />
    </>
  );
};

export default HomePage;