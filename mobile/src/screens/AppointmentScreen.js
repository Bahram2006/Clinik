// src/screens/AppointmentScreen.js

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { AppContext } from "../context/AppContext";
import { COLORS } from "../utils/theme";
import { getErrorMessage } from "../utils/getErrorMessage";

export default function AppointmentScreen({ route, navigation }) {
  const { docId } = route.params;
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const doc = doctors.find((d) => d._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlots = async () => {
    if (!docInfo) return;
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const isSlotAvailable =
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formattedTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      Alert.alert("Eskertme", "Bron etmek üçin ulgama giriň", [
        { text: "Logina Gir", onPress: () => navigation.navigate("Login") },
        { text: "Ýatyr", style: "cancel" },
      ]);
      return;
    }

    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } },
      );

      if (data.success) {
        Toast.show({ type: "success", text1: data.message });
        getDoctorsData();
        navigation.navigate("MyAppointmentsTab");
      } else {
        Toast.show({ type: "error", text1: data.message });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: getErrorMessage(null, error, error.response?.data),
      });
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return docInfo ? (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Doctor Card */}
      <View style={styles.headerCard}>
        <Image source={{ uri: docInfo.image }} style={styles.docImage} />
        <View style={styles.docDetails}>
          <Text style={styles.docName}>{docInfo.name}</Text>
          <Text style={styles.docDegree}>
            {docInfo.degree} - {docInfo.speciality}
          </Text>
          <Text style={styles.experience}>{docInfo.experience}</Text>
          <Text style={styles.aboutTitle}>Barada:</Text>
          <Text style={styles.aboutText}>{docInfo.about}</Text>
          <Text style={styles.feeText}>
            Töleg bahasy:{" "}
            <Text style={styles.feeAmount}>
              {currencySymbol}
              {docInfo.fees}
            </Text>
          </Text>
        </View>
      </View>

      {/* Booking Slots */}
      <Text style={styles.sectionTitle}>Qabul wagtyny saýlaň</Text>

      {/* Days Horizontal List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.slotRow}
      >
        {docSlots.length > 0 &&
          docSlots.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCard,
                slotIndex === index && styles.activeDayCard,
              ]}
              onPress={() => setSlotIndex(index)}
            >
              <Text
                style={[
                  styles.dayText,
                  slotIndex === index && styles.activeText,
                ]}
              >
                {item[0] && daysOfWeek[item[0].datetime.getDay()]}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  slotIndex === index && styles.activeText,
                ]}
              >
                {item[0] && item[0].datetime.getDate()}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Times Horizontal List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.slotRow}
      >
        {docSlots.length > 0 &&
          docSlots[slotIndex] &&
          docSlots[slotIndex].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeCard,
                item.time === slotTime && styles.activeTimeCard,
              ]}
              onPress={() => setSlotTime(item.time)}
            >
              <Text
                style={[
                  styles.timeText,
                  item.time === slotTime && styles.activeText,
                ]}
              >
                {item.time.toLowerCase()}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Book Button */}
      <TouchableOpacity
        disabled={!slotTime}
        style={[styles.bookBtn, !slotTime && styles.disabledBtn]}
        onPress={bookAppointment}
      >
        <Text style={styles.bookBtnText}>Qabul Bron Et</Text>
      </TouchableOpacity>
    </ScrollView>
  ) : null;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgLight, padding: 16 },
  headerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  docImage: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    backgroundColor: COLORS.secondary,
  },
  docDetails: { marginTop: 12 },
  docName: { fontSize: 20, fontWeight: "bold", color: COLORS.textDark },
  docDegree: { fontSize: 14, color: COLORS.textMuted, marginTop: 2 },
  experience: {
    fontSize: 12,
    color: COLORS.primary,
    marginVertical: 6,
    fontWeight: "600",
  },
  aboutTitle: { fontSize: 14, fontWeight: "bold", marginTop: 8 },
  aboutText: { fontSize: 13, color: COLORS.textMuted, marginTop: 4 },
  feeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 12,
    color: COLORS.textDark,
  },
  feeAmount: { color: COLORS.primary },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 12,
  },
  slotRow: { flexDirection: "row", marginBottom: 16 },
  dayCard: {
    width: 60,
    height: 70,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeDayCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dayText: { fontSize: 12, color: COLORS.textMuted },
  dateText: { fontSize: 16, fontWeight: "bold", color: COLORS.textDark },
  timeCard: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    marginRight: 8,
  },
  activeTimeCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: { fontSize: 13, color: COLORS.textMuted },
  activeText: { color: COLORS.white },
  bookBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },
  disabledBtn: { backgroundColor: "#A5B4FC" },
  bookBtnText: { color: COLORS.white, fontWeight: "bold", fontSize: 16 },
});
