// mobile/src/utils/assets.js

import header_img from "../../assets/header_img.png";
import General_physician from "../../assets/General_physician.svg";
import Gynecologist from "../../assets/Gynecologist.svg";
import Dermatologist from "../../assets/Dermatologist.png"; // ýa-da .svg
import Pediatricians from "../../assets/Pediatricians.svg";
import Neurologist from "../../assets/Neurologist.svg";
import Gastroenterologist from "../../assets/Gastroenterologist.svg";

export const assets = {
  header_img,
  General_physician,
  Gynecologist,
  Dermatologist,
  Pediatricians,
  Neurologist,
  Gastroenterologist,
};

export const specialityData = [
  {
    speciality: "General physician",
    image: assets.General_physician,
  },
  {
    speciality: "Gynecologist",
    image: assets.Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: assets.Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: assets.Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: assets.Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: assets.Gastroenterologist,
  },
];
