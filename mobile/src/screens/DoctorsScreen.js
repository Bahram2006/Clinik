// src/screens/DoctorsScreen.js

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { AppContext } from "../context/AppContext";
import { COLORS } from "../utils/theme";
import { Ionicons } from "@expo/vector-icons";

export default function DoctorsScreen({ route, navigation }) {
  const { doctors } = useContext(AppContext);
  const specialityParam = route.params?.speciality || "";

  const [filterDoc, setFilterDoc] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(specialityParam);
  const [searchQuery, setSearchQuery] = useState("");

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const applyFilter = () => {
    let filtered = doctors;
    if (selectedSpeciality) {
      filtered = filtered.filter(
        (doc) => doc.speciality === selectedSpeciality,
      );
    }
    if (searchQuery) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, selectedSpeciality, searchQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ähli Lukmanlar</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={COLORS.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Lukman ady boýunça gözle..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.contentRow}>
        {/* Specialities Sidebar / Horizontal Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              !selectedSpeciality && styles.activeChip,
            ]}
            onPress={() => setSelectedSpeciality("")}
          >
            <Text
              style={[
                styles.chipText,
                !selectedSpeciality && styles.activeChipText,
              ]}
            >
              Ählisi
            </Text>
          </TouchableOpacity>
          {specialities.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterChip,
                selectedSpeciality === item && styles.activeChip,
              ]}
              onPress={() => setSelectedSpeciality(item)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedSpeciality === item && styles.activeChipText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Doctors Grid */}
      <FlatList
        data={filterDoc}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
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
        )}
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
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 44, fontSize: 14, color: COLORS.textDark },
  filterScroll: { marginBottom: 16, maxHeight: 40 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    height: 36,
    justifyContent: "center",
  },
  activeChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 12, color: COLORS.textMuted },
  activeChipText: { color: COLORS.white, fontWeight: "600" },
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
