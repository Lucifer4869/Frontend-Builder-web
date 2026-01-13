import React from 'react';
import { Phone, Mail, MapPin, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white relative z-50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-orange-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </div>
              <span className="font-bold text-2xl">
                CRYSTAL<span className="text-orange-500">BRIDGE</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              บริษัท คริสตัล บริดจ์ จำกัด<br/>
              รับสร้างบ้าน รีสอร์ท บ้านลอยน้ำ และอาคารพาณิชย์<br/>
              ด้วยมาตรฐานคุณภาพระดับพรีเมียม
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">ติดต่อเรา</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-3 hover:text-orange-500 transition-colors cursor-pointer">
                <Phone size={18} className="text-orange-500" />
                <span>083-892-4659</span>
              </li>
              <li className="flex items-center gap-3 hover:text-orange-500 transition-colors cursor-pointer">
                <Phone size={18} className="text-orange-500" />
                <span>097-248-1259</span>
              </li>
              <li className="flex items-center gap-3 hover:text-orange-500 transition-colors cursor-pointer">
                <Mail size={18} className="text-orange-500" />
                <span>crystalbridge.co.th@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">Social Media</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-3 hover:text-orange-500 transition-colors cursor-pointer">
                <Facebook size={18} className="text-orange-500" />
                <span>คริสตัล บริดจ์ รับสร้างบ้าน</span>
              </li>
              <li className="flex items-center gap-3 hover:text-orange-500 transition-colors cursor-pointer">
                <MessageCircle size={18} className="text-orange-500" />
                <span>@giftshi.official (Line)</span>
              </li>
              <li className="flex items-center gap-3 hover:text-orange-500 transition-colors cursor-pointer">
                <MessageCircle size={18} className="text-orange-500" />
                <span>@giftzapyya (Line)</span>
              </li>
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">ID & Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-orange-500 font-mono">ID:</span>
                <span>cb24659</span>
              </li>
              <li className="flex items-center gap-3 hover:text-orange-500 transition-colors cursor-pointer">
                <MapPin size={18} className="text-orange-500" />
                <span>GIFTSHI.BIZ</span>
              </li>
            </ul>
            
            {/* CTA Button */}
            <button className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/30">
              ขอใบเสนอราคา
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 Crystal Bridge Co., Ltd. สงวนลิขสิทธิ์ทุกประการ
            </p>
            <div className="flex gap-6 text-slate-500 text-sm">
              <a href="#" className="hover:text-orange-500 transition-colors">นโยบายความเป็นส่วนตัว</a>
              <a href="#" className="hover:text-orange-500 transition-colors">ข้อกำหนดการใช้งาน</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
