// src/screens/HomeScreen.js

import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { AppContext } from "../context/AppContext";
import { COLORS } from "../utils/theme";
import { useTranslation } from "react-i18next";

export default function HomeScreen({ navigation }) {
  const { doctors, currencySymbol } = useContext(AppContext);
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerTextCol}>
          <Text style={styles.bannerTitle}>
            Ynamly Lukmanlar Bilen Wagtyňyzy Bron Ediň
          </Text>
          <TouchableOpacity
            style={styles.bannerBtn}
            onPress={() => navigation.navigate("DoctorsTab")}
          >
            <Text style={styles.bannerBtnText}>Lukmanlary Gör</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Top Doctors Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Iň Top Lukmanlar</Text>
        <TouchableOpacity onPress={() => navigation.navigate("DoctorsTab")}>
          <Text style={styles.moreText}>Ählisi ({doctors.length})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.doctorsGrid}>
        {doctors.slice(0, 4).map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("Appointment", { docId: item._id })
            }
          >
            <Image source={{ uri: item.image }} style={styles.cardImg} />
            <View style={styles.cardBody}>
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
              <Text style={styles.speciality} numberOfLines={1}>
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
  container: { flex: 1, backgroundColor: COLORS.bgLight, padding: 16 },
  banner: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  bannerTextCol: { flex: 1 },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    lineHeight: 28,
  },
  bannerBtn: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  bannerBtnText: { color: COLORS.primary, fontWeight: "600", fontSize: 14 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.textDark },
  moreText: { fontSize: 13, color: COLORS.primary, fontWeight: "600" },
  doctorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  card: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  cardImg: { width: "100%", height: 140, backgroundColor: COLORS.secondary },
  cardBody: { padding: 10 },
  statusRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusText: { fontSize: 11, color: COLORS.textMuted },
  docName: { fontSize: 14, fontWeight: "bold", color: COLORS.textDark },
  speciality: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
});
