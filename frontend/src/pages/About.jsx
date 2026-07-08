// import React from 'react'
import { assets } from "../assets/assets";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          {t("about.title_line1")}{" "}
          <span className="text-gray-700 font-medium">
            {t("about.title_line2")}
          </span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>{t("about.intro")}</p>
          <p>{t("about.description")}</p>
          <b className="text-gray-800">{t("about.vision_title")}</b>
          <p>{t("about.vision_text")}</p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          {t("about.why_choose_title")}
          <span className="text-gray-700 font-semibold">
            {t("about.why_choose_title_span")}
          </span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>{t("about.efficiency_title")}</b>
          <p>{t("about.efficiency_text")}</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>{t("about.convenience_title")}</b>
          <p>{t("about.convenience_text")}</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>{t("about.personalization_title")}</b>
          <p>{t("about.personalization_text")}</p>
        </div>
      </div>
    </div>
  );
};

export default About;