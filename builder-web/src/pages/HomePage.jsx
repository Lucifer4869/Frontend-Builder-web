import React, { useRef, useState, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Phone, Mail, X, ChevronRight, Home, Building, Waves, Hotel, MessageCircle } from 'lucide-react';

// --- Tree Component ---
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

// --- Bush Component ---
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

// --- Modern House with Mouse Rotation (Updated: Removed Hotspots) ---
const ModernHouse = ({ isDark }) => {
  const group = useRef();
  const { gl } = useThree();
  
  // Mouse drag state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.25, y: 0.5 });
  const currentRotation = useRef({ x: 0.25, y: 0.5 });
  const baseY = useRef(-1.2);

  // Mouse event handlers
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

  React.useEffect(() => {
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
    <group ref={group} position={[0.5, -1.2, 0]} scale={[0.65, 0.65, 0.65]}>
      
      <group position={[0, -0.1, 0]}>
        <mesh position={[0, -0.15, 0]} receiveShadow castShadow>
          <boxGeometry args={[8, 0.35, 6]} />
          <meshStandardMaterial color="#7CB342" />
        </mesh>
        <mesh position={[0, 0.02, 2]} castShadow>
          <boxGeometry args={[1.5, 0.08, 2]} />
          <meshStandardMaterial color="#BDBDBD" roughness={0.8} />
        </mesh>
        <mesh position={[-2.2, 0.02, 1]} castShadow>
          <boxGeometry args={[2.5, 0.08, 3]} />
          <meshStandardMaterial color="#9E9E9E" roughness={0.7} />
        </mesh>
        {/* Fences */}
        <mesh position={[-3.8, 0.4, 0]} castShadow>
          <boxGeometry args={[0.12, 0.8, 6]} />
          <meshStandardMaterial color="#FAFAFA" />
        </mesh>
        <mesh position={[3.8, 0.4, 0]} castShadow>
          <boxGeometry args={[0.12, 0.8, 6]} />
          <meshStandardMaterial color="#FAFAFA" />
        </mesh>
        <mesh position={[0, 0.4, -2.8]} castShadow>
          <boxGeometry args={[7.7, 0.8, 0.12]} />
          <meshStandardMaterial color="#FAFAFA" />
        </mesh>
      </group>

      {/* ===== GARAGE ===== */}
      <group position={[-2.2, 0.5, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 2, 2.5]} />
          <meshStandardMaterial color="#F5F5F5" />
        </mesh>
        <mesh position={[0, -0.3, 1.26]} castShadow>
          <boxGeometry args={[1.8, 1.4, 0.08]} />
          <meshStandardMaterial color="#424242" metalness={0.3} roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
          <boxGeometry args={[2.4, 0.18, 2.7]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
      </group>

      {/* ===== MAIN BUILDING ===== */}
      <group position={[0.8, 0.8, -0.3]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[4, 2.5, 3.5]} />
          <meshStandardMaterial color="#FAFAFA" />
        </mesh>
        <mesh position={[0.3, 2.2, 0]} castShadow>
          <boxGeometry args={[3.4, 1.8, 3.2]} />
          <meshStandardMaterial color="#F5F5F5" />
        </mesh>
        
        {/* Windows Floor 1 */}
        <mesh position={[-1.2, 0.2, 1.76]}>
          <boxGeometry args={[0.8, 1.2, 0.06]} />
          <meshStandardMaterial 
            color={isDark ? "#FFE082" : "#4FC3F7"} 
            emissive={isDark ? "#FFA726" : "#000000"}
            emissiveIntensity={isDark ? 0.8 : 0}
            metalness={isDark ? 0.1 : 0.5} 
            roughness={isDark ? 0.3 : 0.1} 
          />
        </mesh>
        <mesh position={[1.2, 0.2, 1.76]}>
          <boxGeometry args={[0.8, 1.2, 0.06]} />
          <meshStandardMaterial 
            color={isDark ? "#FFE082" : "#4FC3F7"} 
            emissive={isDark ? "#FFA726" : "#000000"}
            emissiveIntensity={isDark ? 0.8 : 0}
            metalness={isDark ? 0.1 : 0.5} 
            roughness={isDark ? 0.3 : 0.1} 
          />
        </mesh>
        
        {/* Door */}
        <mesh position={[0, -0.4, 1.76]} castShadow>
          <boxGeometry args={[0.9, 1.7, 0.1]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
        <mesh position={[0.3, -0.4, 1.82]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#FFD54F" metalness={0.8} />
        </mesh>
        
        {/* Window Floor 2 */}
        <mesh position={[0.3, 2.2, 1.61]}>
          <boxGeometry args={[2, 1, 0.06]} />
          <meshStandardMaterial 
            color={isDark ? "#FFE082" : "#4FC3F7"} 
            emissive={isDark ? "#FFA726" : "#000000"}
            emissiveIntensity={isDark ? 0.8 : 0}
            metalness={isDark ? 0.1 : 0.5} 
            roughness={isDark ? 0.3 : 0.1} 
          />
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
      <group position={[1.1, 3.5, -0.3]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[4.2, 0.22, 3.8]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
        <mesh position={[0, 0.72, 0]} castShadow>
          <boxGeometry args={[3.6, 0.22, 3.2]} />
          <meshStandardMaterial color="#4E342E" />
        </mesh>
        <mesh position={[0, 0.94, 0]} castShadow>
          <boxGeometry args={[2.8, 0.18, 2.4]} />
          <meshStandardMaterial color="#3E2723" />
        </mesh>
      </group>

      {/* ===== TREES & BUSHES ===== */}
      <Tree position={[3.2, 0, -1.5]} scale={1.2} />
      <Tree position={[-3.2, 0, -2]} scale={0.9} />
      <Tree position={[3, 0, 1.5]} scale={0.8} />
      
      <Bush position={[2.5, 0.1, 2]} scale={1} />
      <Bush position={[-1, 0.1, 2.2]} scale={0.8} />
      <Bush position={[3.2, 0.1, 0.5]} scale={0.7} />
      <Bush position={[-3, 0.1, 0]} scale={0.9} />

    </group>
  );
};

// --- Bottom Menu Component (New!) ---
const BottomMenu = ({ activePanel, onButtonClick }) => {
  const buttons = [
    { id: 'houses', label: 'แบบบ้าน', icon: <Home size={18} />, color: 'bg-blue-500', shadow: 'shadow-blue-500/30' },
    { id: 'line', label: 'Line Official', icon: <MessageCircle size={18} />, color: 'bg-green-500', shadow: 'shadow-green-500/30' },
    { id: 'contact', label: 'ติดต่อเรา', icon: <Phone size={18} />, color: 'bg-orange-500', shadow: 'shadow-orange-500/30' },
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
              {/* Tooltip for mobile where text is hidden (Optional) */}
              <span className="md:hidden">{btn.label}</span> 
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- Info Panel (Same as before) ---
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
    contact: {
      title: "ติดต่อเรา",
      icon: <Phone className="text-white" size={24} />,
      color: "bg-orange-500",
      content: (
        <div className="space-y-3">
          <p className="text-slate-600 mb-4">พร้อมให้คำปรึกษาและออกแบบบ้านในฝันของคุณ</p>
          {[
            { icon: Phone, label: "083-892-4659" },
            { icon: Phone, label: "097-248-1259" },
            { icon: Mail, label: "crystalbridge.co.th@gmail.com" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-orange-50 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <item.icon className="text-orange-600" size={16} />
              </div>
              <span className="font-medium text-slate-700">{item.label}</span>
            </div>
          ))}
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
    <div className="fixed left-6 md:left-16 top-1/2 -translate-y-1/2 z-20 max-w-md">
      <div className={`backdrop-blur-xl p-8 rounded-3xl shadow-2xl border ${isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white/80 border-white/50'}`}>
        <div className="inline-block bg-linear-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
          ✨ รับสร้างบ้าน 2026
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold leading-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          สร้างบ้าน...<br/>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-amber-500">
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
          <button className="w-full bg-linear-to-r from-orange-600 to-amber-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2">
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
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-slate-900/50 to-transparent"></div>
          </>
        ) : (
          <>
            <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-amber-300/40 rounded-full blur-[100px]"></div>
            <div className="absolute top-20 left-20 w-40 h-20 bg-white/50 rounded-full blur-xl"></div>
            <div className="absolute top-32 left-40 w-32 h-16 bg-white/40 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-amber-100/50 to-transparent"></div>
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
            <ambientLight intensity={isDark ? 0.4 : 0.6} />
            <directionalLight 
              position={[8, 12, 8]} 
              intensity={isDark ? 1.0 : 1.5} 
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <directionalLight position={[-5, 5, -5]} intensity={isDark ? 0.2 : 0.3} />
            <hemisphereLight intensity={isDark ? 0.3 : 0.4} groundColor="#8d7c5c" />
            
            <Environment preset={isDark ? "night" : "sunset"} background={false} />

            {/* ModernHouse (No Hotspots passed) */}
            <ModernHouse isDark={isDark} />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Elements */}
      <HeroContent isDark={isDark} />
      
      {/* Bottom Menu (New Position for Buttons) */}
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