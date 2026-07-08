// import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b  border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">{t("navbar.home")}</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">{t("navbar.all_doctors")}</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">{t("navbar.about")}</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">{t("navbar.contact")}</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* ------- Language Switcher ------- */}
      <div className="hidden md:flex items-center gap-1 border rounded-full p-1 text-xs font-medium">
        <button
          onClick={() => changeLanguage("tk")}
          className={`px-3 py-1 rounded-full transition-all ${
            i18n.language === "tk" ? "bg-primary text-white" : "text-gray-500"
          }`}
        >
          TK
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1 rounded-full transition-all ${
            i18n.language === "en" ? "bg-primary text-white" : "text-gray-500"
          }`}
        >
          EN
        </button>
      </div>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 ">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  {t("navbar.my_profile")}
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  {t("navbar.my_appointments")}
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  {t("navbar.logout")}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            {t("navbar.create_account")}
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        {/* ------ Mobile Menu ------ */}
        <div
          className={` ${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">{t("navbar.home")}</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">{t("navbar.all_doctors")}</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">{t("navbar.about")}</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">{t("navbar.contact")}</p>
            </NavLink>

            {/* ------- Mobile Language Switcher ------- */}
            <div className="flex items-center gap-1 border rounded-full p-1 text-sm font-medium mt-3">
              <button
                onClick={() => changeLanguage("tk")}
                className={`px-4 py-1 rounded-full transition-all ${
                  i18n.language === "tk"
                    ? "bg-primary text-white"
                    : "text-gray-500"
                }`}
              >
                TK
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-4 py-1 rounded-full transition-all ${
                  i18n.language === "en"
                    ? "bg-primary text-white"
                    : "text-gray-500"
                }`}
              >
                EN
              </button>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;