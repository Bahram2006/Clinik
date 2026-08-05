// src/screens/ProfileScreen.js

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { AppContext } from "../context/AppContext";
import { COLORS } from "../utils/theme";

export default function ProfileScreen({ navigation }) {
  const {
    token,
    setToken,
    userData,
    setUserData,
    backendUrl,
    loadUserProfileData,
  } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(userData?.name || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [address, setAddress] = useState(
    userData?.address || { line1: "", line2: "" },
  );
  const [gender, setGender] = useState(userData?.gender || "Male");
  const [dob, setDob] = useState(userData?.dob || "2000-01-01");

  const updateUserProfileData = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        { name, phone, address, gender, dob },
        { headers: { token } },
      );

      if (data.success) {
        Toast.show({ type: "success", text1: data.message });
        await loadUserProfileData();
        setIsEdit(false);
      } else {
        Toast.show({ type: "error", text1: data.message });
      }
    } catch (error) {
      console.log(error);
      Toast.show({ type: "error", text1: error.message });
    }
  };

  const logout = () => {
    setToken("");
    setUserData(false);
    Toast.show({ type: "success", text1: "Ulgamdan çykyldy" });
  };

  if (!token) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.notAuthText}>Profil görmek üçin ulgama giriň</Text>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginBtnText}>Ulgama Gir</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Şahsy Profilim</Text>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: userData?.image || "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userData?.name}</Text>
      </View>

      {/* Contact Info */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Habarlaşmak maglumatlary</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.valueText}>{userData?.email}</Text>

        <Text style={styles.label}>Telefon:</Text>
        {isEdit ? (
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        ) : (
          <Text style={styles.valueText}>
            {userData?.phone || "Görkezilmedik"}
          </Text>
        )}

        <Text style={styles.label}>Salgy:</Text>
        {isEdit ? (
          <View>
            <TextInput
              style={[styles.input, { marginBottom: 6 }]}
              value={address.line1}
              onChangeText={(val) =>
                setAddress((prev) => ({ ...prev, line1: val }))
              }
              placeholder="Salgy setiri 1"
            />
            <TextInput
              style={styles.input}
              value={address.line2}
              onChangeText={(val) =>
                setAddress((prev) => ({ ...prev, line2: val }))
              }
              placeholder="Salgy setiri 2"
            />
          </View>
        ) : (
          <Text style={styles.valueText}>
            {userData?.address?.line1} {userData?.address?.line2}
          </Text>
        )}
      </View>

      {/* Basic Info */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Esasy Maglumatlar</Text>

        <Text style={styles.label}>Jynsy:</Text>
        {isEdit ? (
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
          />
        ) : (
          <Text style={styles.valueText}>{userData?.gender}</Text>
        )}

        <Text style={styles.label}>Doglan güni:</Text>
        {isEdit ? (
          <TextInput style={styles.input} value={dob} onChangeText={setDob} />
        ) : (
          <Text style={styles.valueText}>{userData?.dob}</Text>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.btnRow}>
        {isEdit ? (
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={updateUserProfileData}
          >
            <Text style={styles.btnText}>Ýatda Sakla</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => setIsEdit(true)}
          >
            <Text style={styles.secondaryBtnText}>Üýtget</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Ulgamdan Çyk</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgLight, padding: 16 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bgLight,
    padding: 20,
  },
  notAuthText: {
    fontSize: 16,
    color: COLORS.textMuted,
    marginBottom: 16,
    textAlign: "center",
  },
  loginBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  loginBtnText: { color: COLORS.white, fontWeight: "bold" },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 16,
  },
  avatarContainer: { alignItems: "center", marginBottom: 20 },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.secondary,
    marginBottom: 10,
  },
  userName: { fontSize: 18, fontWeight: "bold", color: COLORS.textDark },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  label: { fontSize: 12, color: COLORS.textMuted, marginTop: 8 },
  valueText: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: "500",
    marginTop: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 4,
    color: COLORS.textDark,
    fontSize: 14,
  },
  btnRow: { marginBottom: 40 },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  btnText: { color: COLORS.white, fontWeight: "bold", fontSize: 15 },
  secondaryBtnText: { color: COLORS.primary, fontWeight: "bold", fontSize: 15 },
  logoutBtn: {
    backgroundColor: "#FEE2E2",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  logoutText: { color: "#EF4444", fontWeight: "bold", fontSize: 15 },
});
