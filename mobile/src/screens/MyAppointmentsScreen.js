// src/screens/MyAppointmentsScreen.js

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { AppContext } from "../context/AppContext";
import { COLORS } from "../utils/theme";
import { RAZORPAY_KEY_ID } from "../utils/constants";

export default function MyAppointmentsScreen() {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      Toast.show({ type: "error", text1: error.message });
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } },
      );
      if (data.success) {
        Toast.show({ type: "success", text1: data.message });
        getUserAppointments();
        getDoctorsData();
      } else {
        Toast.show({ type: "error", text1: data.message });
      }
    } catch (error) {
      console.log(error);
      Toast.show({ type: "error", text1: error.message });
    }
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } },
      );

      if (data.success) {
        Alert.alert(
          "Töleg Integrasiýasy",
          `Order ID: ${data.order.id}\n\nTöleg simulaşiýasyny geçirmek isleýärsiňizmi?`,
          [
            {
              text: "Tölegi Tassykla",
              onPress: () => verifyRazorpay(data.order, appointmentId),
            },
            { text: "Ýatyr", style: "cancel" },
          ],
        );
      }
    } catch (error) {
      console.log(error);
      Toast.show({ type: "error", text1: error.message });
    }
  };

  const verifyRazorpay = async (razorpayOrder, appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/verifyRazorpay`,
        {
          razorpay_order_id: razorpayOrder.id,
          razorpay_payment_id: "pay_simulated_" + Date.now(),
          razorpay_signature: "simulated_signature",
        },
        { headers: { token } },
      );

      if (data.success) {
        getUserAppointments();
        Toast.show({ type: "success", text1: "Töleg üstünlikli geçirildi!" });
      }
    } catch (error) {
      console.log(error);
      Toast.show({ type: "error", text1: error.message });
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.docData.image }} style={styles.docImg} />
      <View style={styles.infoCol}>
        <Text style={styles.docName}>{item.docData.name}</Text>
        <Text style={styles.speciality}>{item.docData.speciality}</Text>
        <Text style={styles.addressLabel}>Salgy:</Text>
        <Text style={styles.addressText}>{item.docData.address.line1}</Text>
        <Text style={styles.addressText}>{item.docData.address.line2}</Text>
        <Text style={styles.dateTimeText}>
          <Text style={{ fontWeight: "bold" }}>Wagty:</Text> {item.slotDate} |{" "}
          {item.slotTime}
        </Text>
      </View>

      <View style={styles.actionCol}>
        {!item.cancelled && item.payment && !item.isCompleted && (
          <TouchableOpacity style={[styles.btn, styles.paidBtn]} disabled>
            <Text style={styles.paidText}>Tölenen</Text>
          </TouchableOpacity>
        )}

        {!item.cancelled && !item.payment && !item.isCompleted && (
          <TouchableOpacity
            style={[styles.btn, styles.payBtn]}
            onPress={() => appointmentRazorpay(item._id)}
          >
            <Text style={styles.payText}>Töleg Et</Text>
          </TouchableOpacity>
        )}

        {!item.cancelled && !item.isCompleted && (
          <TouchableOpacity
            style={[styles.btn, styles.cancelBtn]}
            onPress={() => cancelAppointment(item._id)}
          >
            <Text style={styles.cancelText}>Ýatyr</Text>
          </TouchableOpacity>
        )}

        {item.cancelled && !item.isCompleted && (
          <TouchableOpacity style={[styles.btn, styles.disabledBtn]} disabled>
            <Text style={styles.disabledText}>Ýatyryldy</Text>
          </TouchableOpacity>
        )}

        {item.isCompleted && (
          <TouchableOpacity style={[styles.btn, styles.completedBtn]} disabled>
            <Text style={styles.completedText}>Tamamlandy</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bron Edilen Qabullarym</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item._id}
        renderItem={renderAppointmentItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgLight, padding: 16 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    elevation: 2,
  },
  docImg: {
    width: 80,
    height: 100,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
  },
  infoCol: { flex: 1, marginLeft: 12, justifyContent: "center" },
  docName: { fontSize: 15, fontWeight: "bold", color: COLORS.textDark },
  speciality: { fontSize: 12, color: COLORS.textMuted, marginBottom: 6 },
  addressLabel: { fontSize: 11, fontWeight: "600", color: COLORS.textDark },
  addressText: { fontSize: 11, color: COLORS.textMuted },
  dateTimeText: { fontSize: 12, color: COLORS.textDark, marginTop: 6 },
  actionCol: { justifyContent: "flex-end", marginLeft: 8 },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 6,
    alignItems: "center",
  },
  payBtn: { backgroundColor: COLORS.primary },
  payText: { color: COLORS.white, fontSize: 12, fontWeight: "600" },
  cancelBtn: { borderWidth: 1, borderColor: "#EF4444" },
  cancelText: { color: "#EF4444", fontSize: 12 },
  paidBtn: { backgroundColor: "#E0E7FF" },
  paidText: { color: COLORS.primary, fontSize: 12, fontWeight: "600" },
  disabledBtn: { borderWidth: 1, borderColor: "#D1D5DB" },
  disabledText: { color: "#9CA3AF", fontSize: 12 },
  completedBtn: { borderWidth: 1, borderColor: "#10B981" },
  completedText: { color: "#10B981", fontSize: 12, fontWeight: "600" },
});
