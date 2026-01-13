import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'บ้านโมเดิร์น 2 ชั้น',
    category: 'บ้าน',
    location: 'กรุงเทพมหานคร',
    size: '350 ตร.ม.',
    budget: '8.5 ล้านบาท',
    description: 'บ้านสไตล์โมเดิร์นมินิมอล 4 ห้องนอน 5 ห้องน้ำ พร้อมสระว่ายน้ำส่วนตัว',
    image: null,
    color: 'from-slate-700 to-slate-900'
  },
  {
    id: 2,
    title: 'Khao Yai Private Resort',
    category: 'รีสอร์ท',
    location: 'นครราชสีมา',
    size: '1,200 ตร.ม.',
    budget: '35 ล้านบาท',
    description: 'รีสอร์ทส่วนตัวกลางหุบเขา 8 ห้องพัก พร้อมร้านอาหารและสปา',
    image: null,
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 3,
    title: 'Nordic Cozy Home',
    category: 'บ้าน',
    location: 'เชียงใหม่',
    size: '280 ตร.ม.',
    budget: '6.2 ล้านบาท',
    description: 'บ้านสไตล์นอร์ดิกอบอุ่น กลางธรรมชาติ ออกแบบเพื่อความยั่งยืน',
    image: null,
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 4,
    title: 'Floating Villa Kanchanaburi',
    category: 'บ้านลอยน้ำ',
    location: 'กาญจนบุรี',
    size: '150 ตร.ม.',
    budget: '4.8 ล้านบาท',
    description: 'บ้านลอยน้ำดีไซน์ล้ำสมัย กลางอ่างเก็บน้ำ วิวภูเขาสุดตา',
    image: null,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 5,
    title: 'Commercial Building',
    category: 'อาคารพาณิชย์',
    location: 'ชลบุรี',
    size: '800 ตร.ม.',
    budget: '15 ล้านบาท',
    description: 'ตึกแถว 4 ชั้น สำหรับธุรกิจและที่พักอาศัย',
    image: null,
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 6,
    title: 'Pool Villa Hua Hin',
    category: 'บ้าน',
    location: 'หัวหิน',
    size: '420 ตร.ม.',
    budget: '12 ล้านบาท',
    description: 'พูลวิลล่าหรูริมทะเล 5 ห้องนอน คอนเซ็ปต์ทรอปิคอลโมเดิร์น',
    image: null,
    color: 'from-sky-500 to-blue-600'
  }
];

const categories = ['ทั้งหมด', 'บ้าน', 'รีสอร์ท', 'บ้านลอยน้ำ', 'อาคารพาณิชย์'];

const PortfolioPage = ({ isDark = false }) => {
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = selectedCategory === 'ทั้งหมด' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-b from-slate-50 to-slate-100'}`}>
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 ${isDark ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-orange-100 text-orange-800'}`}>
            🏗️ ผลงานของเรา
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            โครงการที่<span className="text-orange-600">ภาคภูมิใจ</span>
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            รวมผลงานการสร้างบ้าน รีสอร์ท และอาคารที่เราได้ส่งมอบให้ลูกค้า
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                    : isDark 
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-white text-slate-600 hover:bg-slate-100 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer"
              >
                <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} rounded-2xl p-6 flex flex-col justify-end relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                  {/* Overlay pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-32 h-32 border border-white/50 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-20 h-20 border border-white/30 rounded-full"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-3 inline-block backdrop-blur-sm">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm">{project.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div 
            className={`rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${isDark ? 'bg-slate-800' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-64 bg-gradient-to-br ${selectedProject.color} rounded-t-3xl relative`}>
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-6 left-6">
                <span className="bg-white/20 text-white text-sm px-4 py-1 rounded-full backdrop-blur-sm">
                  {selectedProject.category}
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedProject.title}</h2>
              <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{selectedProject.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                  <div className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>พื้นที่</div>
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedProject.size}</div>
                </div>
                <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                  <div className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>งบประมาณ</div>
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedProject.budget}</div>
                </div>
                <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
                  <div className={`text-sm mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>สถานที่</div>
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedProject.location}</div>
                </div>
              </div>
              
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-full font-bold transition-colors">
                สนใจโครงการแบบนี้
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className={`py-16 px-6 ${isDark ? 'bg-slate-800' : 'bg-slate-900'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ต้องการดูแบบบ้านเพิ่มเติม?
          </h2>
          <p className="text-slate-400 mb-6">
            ติดต่อเราเพื่อรับแคตตาล็อกแบบบ้านฟรี!
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-orange-600/30">
            ขอแคตตาล็อกฟรี
          </button>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
