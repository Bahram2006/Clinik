// src/screens/LoginScreen.js

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { AppContext } from "../context/AppContext";
import { COLORS } from "../utils/theme";

export default function LoginScreen({ navigation }) {
  const { backendUrl, setToken } = useContext(AppContext);

  const [state, setState] = useState("Sign Up"); // 'Sign Up' ýa-da 'Login'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async () => {
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          Toast.show({ type: "success", text1: "Hasap üstünlikli döredildi!" });
          navigation.goBack();
        } else {
          Toast.show({ type: "error", text1: data.message });
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          Toast.show({ type: "success", text1: "Ulgama üstünlikli girildi!" });
          navigation.goBack();
        } else {
          Toast.show({ type: "error", text1: data.message });
        }
      }
    } catch (error) {
      console.log(error);
      Toast.show({ type: "error", text1: error.message });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {state === "Sign Up" ? "Hasap Döretmek" : "Ulgama Girmek"}
        </Text>
        <Text style={styles.subtitle}>
          Dowam etmek üçin maglumatlaryňyzy giriziň
        </Text>

        {state === "Sign Up" && (
          <>
            <Text style={styles.label}>Doly adyňyz</Text>
            <TextInput
              style={styles.input}
              placeholder="At Familya"
              value={name}
              onChangeText={setName}
            />
          </>
        )}

        <Text style={styles.label}>Email salgyňyz</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Açar sözi (Password)</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.submitBtn} onPress={onSubmitHandler}>
          <Text style={styles.submitBtnText}>
            {state === "Sign Up" ? "Hasap Döret" : "Giriş Et"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
          style={styles.switchRow}
        >
          <Text style={styles.switchText}>
            {state === "Sign Up"
              ? "Eýýäm hasabyňyz barmy? "
              : "Hasabyň ýokmy? "}
            <Text style={styles.switchLink}>
              {state === "Sign Up" ? "Giriş Et" : "Hasap Döret"}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.bgLight,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  subtitle: { fontSize: 13, color: COLORS.textMuted, marginBottom: 20 },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 14,
    fontSize: 14,
    color: COLORS.textDark,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  submitBtnText: { color: COLORS.white, fontWeight: "bold", fontSize: 16 },
  switchRow: { marginTop: 16, alignItems: "center" },
  switchText: { fontSize: 13, color: COLORS.textMuted },
  switchLink: { color: COLORS.primary, fontWeight: "bold" },
});
