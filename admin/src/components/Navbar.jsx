// import React from 'react'
import { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { aToken, setAtoken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAtoken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? t("navbar.admin") : t("navbar.doctor")}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* ------- Language Switcher ------- */}
        <div className="flex items-center gap-1 border rounded-full p-1 text-xs font-medium">
          <button
            onClick={() => changeLanguage("tk")}
            className={`px-3 py-1 rounded-full transition-all ${
              i18n.language === "tk"
                ? "bg-primary text-white"
                : "text-gray-500"
            }`}
          >
            TK
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={`px-3 py-1 rounded-full transition-all ${
              i18n.language === "en"
                ? "bg-primary text-white"
                : "text-gray-500"
            }`}
          >
            EN
          </button>
        </div>

        <button
          onClick={logout}
          className="bg-primary text-white text-sm px-10 py-2 rounded-full"
        >
          {t("navbar.logout")}
        </button>
      </div>
    </div>
  );
};

export default Navbar;