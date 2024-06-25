import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">المعلم المثالي</div>
        <ul className={`px-8 lg:flex lg:items-center lg:space-x-4 `}>
          <li>
            <a
              href="/"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              الرئيسية
            </a>
          </li>
          <li>
            <a
              href="/Spellchecker"
              className="text-white hover:text-blue-200 transition duration-300"
            >
               تصحيح املائي
            </a>
          </li>
          <li>
            <a
              href="/grammar"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              أعراب نحوي
            </a>
          </li>
          <li>
            <a
              href="/wordexplaner"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              معاني الكلمات
            </a>
          </li>
        </ul>
      </div>
      {/* Mobile Menu */}
      {/* <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="mt-4 bg-blue-500 text-white">
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-blue-600 transition duration-300"
            >
              الرئيسية
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-blue-600 transition duration-300"
            >
              ملفك الشخصي
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-blue-600 transition duration-300"
            >
              إعدادات
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-blue-600 transition duration-300"
            >
              تسجيل الخروج
            </a>
          </li>
        </ul>
      </div> */}
    </nav>
  );
};

export default Navbar;
