// import React from 'react'
import { assets } from "../assets/assets";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ------- Left Section ------- */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            {t("footer.description")}
          </p>
        </div>

        {/* ------- Center Section ------- */}
        <div>
          <p className="text-xl font-medium mb-5">{t("footer.company")}</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>{t("footer.home")}</li>
            <li>{t("footer.about_us")}</li>
            <li>{t("footer.contact_us")}</li>
            <li>{t("footer.privacy_policy")}</li>
          </ul>
        </div>

        {/* ------- Right Section ------- */}
        <div>
          <p className="text-xl font-medium mb-5">{t("footer.get_in_touch")}</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+993 62 82-95-72</li>
            <li>sanlysaglyk@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ------- Copyright Text ------- */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">{t("footer.copyright")}</p>
      </div>
    </div>
  );
};

export default Footer;