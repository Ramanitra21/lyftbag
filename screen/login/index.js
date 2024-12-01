import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const auth = (email, password) => {
      if(email === "toki@gmail.com" && password === "123L"){
        return {
          success : true
        }
      }
  }

  const handleLogin = async () => {
    try {

      const result = auth(email, password)

      if (result.success) {
        navigation.navigate('Home', { result });
        console.log("Utilisateur connecté :", result.user);
        // Redirection ou autre logique ici
      } else {
        Alert.alert("Erreur", result.message || "Une erreur est survenue.");
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de se connecter. Vérifiez votre connexion.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: verticalScale(220), width: "100%" }}>
        <Image
          source={require("../../assets/LyftBag.png")}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: "55%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Connexion</Text>
        {/* Champ Email */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Adresse email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Champ Mot de Passe */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        {/* Bouton Connexion */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_2} >
          <Text style={styles.buttonText_2}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          height: verticalScale(100),
          width: "100%",
        }}
      >
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    height: verticalScale(680),
  },
  title: {
    fontSize: scale(24),
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    height:verticalScale(48)
  },
  input: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginVertical: verticalScale(5),

  },
  button_2: {
    backgroundColor: "#ECBE61FF",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginVertical: verticalScale(10),
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText_2: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default Login