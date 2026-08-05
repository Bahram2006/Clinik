// src/screens/HomeScreen.js

import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AppContext } from "../context/AppContext";
import { COLORS } from "../utils/theme";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const { doctors } = useContext(AppContext);

  // Web frontend-däki ýaly Hünärler sanawy
  const specialities = [
    { name: "General physician", icon: "medkit-outline" },
    { name: "Gynecologist", icon: "woman-outline" },
    { name: "Dermatologist", icon: "body-outline" },
    { name: "Pediatricians", icon: "happy-outline" },
    { name: "Neurologist", icon: "fitness-outline" },
    { name: "Gastroenterologist", icon: "nutrition-outline" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerLeft}>
          <Text style={styles.bannerTitle}>
            Ynamly Lukmanlar Bilen Wagtyňyzy Bron Ediň
          </Text>
          <TouchableOpacity
            style={styles.bannerBtn}
            onPress={() => navigation.navigate("Doctors")}
          >
            <Text style={styles.bannerBtnText}>Lukmanlary Gör</Text>
            <Ionicons
              name="arrow-forward"
              size={16}
              color={COLORS.primary}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        </View>

        {/* Local Header Image */}
        <Image
          source={require("../../assets/header_img.png")}
          style={styles.bannerImg}
          resizeMode="contain"
        />
      </View>

      {/* Speciality Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Hünärler Boýunça Gözle</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.specScroll}
      >
        {specialities.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.specCard}
            onPress={() =>
              navigation.navigate("Doctors", { speciality: item.name })
            }
          >
            <View style={styles.specIconBg}>
              <Ionicons name={item.icon} size={26} color={COLORS.primary} />
            </View>
            <Text style={styles.specText} numberOfLines={2}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Top Doctors Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Iň Top Lukmanlar</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Doctors")}>
          <Text style={styles.seeAllText}>Ählisi ({doctors.length})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.doctorsGrid}>
        {doctors.slice(0, 4).map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.docCard}
            onPress={() =>
              navigation.navigate("Appointment", { docId: item._id })
            }
          >
            <Image source={{ uri: item.image }} style={styles.docImg} />
            <View style={styles.docCardBody}>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: item.available ? "#10B981" : "#9CA3AF" },
                  ]}
                />
                <Text style={styles.statusText}>
                  {item.available ? "Elýeterli" : "Elýeter däl"}
                </Text>
              </View>
              <Text style={styles.docName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.docSpec} numberOfLines={1}>
                {item.speciality}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  banner: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    height: 160,
    position: "relative",
    overflow: "hidden",
  },
  bannerLeft: { flex: 1, paddingRight: 90, zIndex: 2 },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 22,
    marginBottom: 12,
  },
  bannerBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },
  bannerBtnText: { color: COLORS.primary, fontWeight: "bold", fontSize: 12 },
  bannerImg: {
    width: 130,
    height: 150,
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.textDark },
  seeAllText: { fontSize: 13, color: COLORS.primary, fontWeight: "600" },

  specScroll: { marginBottom: 24, flexDirection: "row" },
  specCard: { alignItems: "center", marginRight: 16, width: 80 },
  specIconBg: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  specText: {
    fontSize: 11,
    textAlign: "center",
    color: COLORS.textDark,
    fontWeight: "500",
  },

  doctorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  docCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    elevation: 2,
  },
  docImg: { width: "100%", height: 140, backgroundColor: "#EFF6FF" },
  docCardBody: { padding: 12 },
  statusRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusText: { fontSize: 11, color: "#10B981", fontWeight: "600" },
  docName: { fontSize: 14, fontWeight: "bold", color: COLORS.textDark },
  docSpec: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
});
