import React from 'react';
import { Users, Award, Target, Heart } from 'lucide-react';

const team = [
  { name: 'คุณสมชาย', role: 'ผู้ก่อตั้ง & CEO', image: null },
  { name: 'คุณวิศวกร', role: 'หัวหน้าฝ่ายวิศวกรรม', image: null },
  { name: 'คุณสถาปนิก', role: 'หัวหน้าฝ่ายออกแบบ', image: null },
  { name: 'คุณโฟร์แมน', role: 'หัวหน้าฝ่ายก่อสร้าง', image: null },
];

const values = [
  { icon: Award, title: 'คุณภาพ', description: 'เราใส่ใจทุกรายละเอียด ใช้วัสดุคุณภาพสูง' },
  { icon: Target, title: 'ความแม่นยำ', description: 'ส่งมอบงานตรงเวลา ตามแผนที่กำหนด' },
  { icon: Heart, title: 'ความใส่ใจ', description: 'ดูแลลูกค้าอย่างจริงใจ ทั้งก่อนและหลังส่งมอบ' },
  { icon: Users, title: 'ทีมงานมืออาชีพ', description: 'วิศวกรและช่างผู้เชี่ยวชาญกว่า 20 คน' },
];

const AboutPage = ({ isDark = false }) => {
  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-900' : 'bg-gradient-to-b from-slate-50 to-slate-100'}`}>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 ${isDark ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-orange-100 text-orange-800'}`}>
                🏢 เกี่ยวกับเรา
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                บริษัท <span className="text-orange-600">คริสตัล บริดจ์</span> จำกัด
              </h1>
              <p className={`text-lg mb-6 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                เราคือผู้เชี่ยวชาญด้านการรับสร้างบ้านและอาคารมากว่า 10 ปี 
                ด้วยทีมงานวิศวกรและสถาปนิกที่มีประสบการณ์ พร้อมช่างฝีมือระดับมืออาชีพ
              </p>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                เรามุ่งมั่นสร้างสรรค์ที่อยู่อาศัยที่ตอบโจทย์ทุกความต้องการของลูกค้า 
                ด้วยมาตรฐานคุณภาพและความใส่ใจในทุกรายละเอียด
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-1">
              <div className={`rounded-3xl p-12 text-center ${isDark ? 'bg-slate-800' : 'bg-slate-900'}`}>
                <div className="text-6xl font-bold text-white mb-2">10+</div>
                <div className="text-slate-400">ปีประสบการณ์</div>
                <div className="mt-8 text-4xl font-bold text-orange-500 mb-2">50+</div>
                <div className="text-slate-400">โครงการที่สำเร็จ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-20 px-6 ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ค่านิยมของเรา
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              สิ่งที่เรายึดถือและปฏิบัติในการทำงานทุกโครงการ
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className={`text-center p-6 rounded-2xl transition-colors ${isDark ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                  <value.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{value.title}</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ทีมงานของเรา
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              ผู้เชี่ยวชาญที่พร้อมดูแลโครงการของคุณ
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className={`w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:from-orange-400 group-hover:to-amber-400 transition-all duration-300 ${isDark ? 'bg-gradient-to-br from-slate-700 to-slate-600' : 'bg-gradient-to-br from-slate-200 to-slate-300'}`}>
                  <Users className={`w-12 h-12 group-hover:text-white transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                </div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{member.name}</h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-6 ${isDark ? 'bg-slate-800' : 'bg-slate-900'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            พร้อมที่จะร่วมงานกับเราหรือยัง?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            ติดต่อเราเพื่อรับคำปรึกษาฟรี ไม่มีค่าใช้จ่าย
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-orange-600/30">
            ติดต่อเรา
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
