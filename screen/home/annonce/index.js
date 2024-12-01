import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../colors";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  Alert
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fakeData = require("./data/data.json");

const App = () => {
  const [announcements, setAnnouncements] = useState(fakeData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); 
  const [isPurchaseModalVisible, setPurchaseModalVisible] = useState(false); // Annonce sélectionnée
  const [searchQuery, setSearchQuery] = useState(""); // Pour la recherche
  const [formData, setFormData] = useState({
    weightAvailable: "",
    pricePerKg: "",
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
  });
  const [purchaseData, setPurchaseData] = useState({
    weight: "",
  });

  const handleCardPress = (item) => {
    setSelectedAnnouncement(item);
    setPurchaseModalVisible(true);
  };

  const handlePurchase = async () => {
    if (!purchaseData.weight || isNaN(purchaseData.weight)) {
      Alert.alert("Erreur", "Veuillez entrer un poids valide.");
      return;
    }
  
    if (purchaseData.weight > selectedAnnouncement.baggageDetails.weightAvailable) {
      Alert.alert("Erreur", "Le poids demandé dépasse le poids disponible.");
      return;
    }
  
    const purchaseDetails = {
      weight: purchaseData.weight,
      description: purchaseData.description,
      buyer: "Vous", // Exemple : les données du client
      seller: {
        name: selectedAnnouncement.user.name,
        email: selectedAnnouncement.user.email || "email@example.com",
        phone: selectedAnnouncement.user.phone || "1234567890",
      },
    };
  
    try {
      // Récupérer les données existantes depuis AsyncStorage
      const existingData = await AsyncStorage.getItem("purchaseDetails");
      let objectsArray;
  
      // Vérifier et parser les données existantes
      if (existingData) {
        try {
          objectsArray = JSON.parse(existingData);
          if (!Array.isArray(objectsArray)) {
            objectsArray = []; // Si les données ne sont pas un tableau, réinitialiser
          }
        } catch (parseError) {
          console.error("Erreur lors du parsing des données existantes :", parseError);
          objectsArray = []; // Réinitialiser si le JSON est corrompu
        }
      } else {
        objectsArray = []; // Si aucune donnée n'existe, initialiser un tableau vide
      }
  
      // Ajouter les nouvelles données
      objectsArray.push(purchaseDetails);
  
      // Sauvegarder les données mises à jour dans AsyncStorage
      await AsyncStorage.setItem("purchaseDetails", JSON.stringify(objectsArray));
  
      // Afficher un message de succès
      Alert.alert(
        "Achat réussi",
        `Vous avez réservé ${purchaseData.weight} kg avec ${selectedAnnouncement.user.name}.`
      );
  
      // Réinitialiser les états
      setPurchaseModalVisible(false);
      setPurchaseData({ weight: "", description: "" });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'achat :", error);
      Alert.alert("Erreur", "Impossible de stocker les détails de l'achat.");
    }
  };
  
  
  // Filtrer les annonces en fonction de la recherche
  const filteredAnnouncements = announcements.filter((item) =>
    item.baggageDetails.departureCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.baggageDetails.arrivalCity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fonction pour ajouter une annonce
  const addAnnouncement = () => {
    const newAnnouncement = {
      id: announcements.length + 1,
      user: {
        id: 0, // ID fictif pour "moi"
        name: "Moi",
        profilePhoto: "https://via.placeholder.com/100x100.png?text=Moi",
      },
      baggageDetails: {
        weightAvailable: parseInt(formData.weightAvailable, 10),
        pricePerKg: parseInt(formData.pricePerKg, 10),
        departureCity: formData.departureCity,
        arrivalCity: formData.arrivalCity,
        departureDate: formData.departureDate,
      },
      productPhoto: "https://via.placeholder.com/200x150.png?text=Mon+Bagage",
    };

    setAnnouncements((prevAnnouncements) => [...prevAnnouncements, newAnnouncement]);
    setModalVisible(false);
    setFormData({
      weightAvailable: "",
      pricePerKg: "",
      departureCity: "",
      arrivalCity: "",
      departureDate: "",
    });

    
  
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCardPress(item)}>
      <View style={styles.card}>
        <Image source={{ uri: item.user.profilePhoto }} style={styles.profilePhoto} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.user.name}</Text>
          <Text style={styles.details}>
            {item.baggageDetails.weightAvailable} kg disponibles - {item.baggageDetails.pricePerKg} €/kg
          </Text>
          <Text style={styles.route}>
            {item.baggageDetails.departureCity} → {item.baggageDetails.arrivalCity}
          </Text>
          <Text style={styles.date}>Départ : {item.baggageDetails.departureDate}</Text>
        </View>
        <Image source={{ uri: item.productPhoto }} style={styles.productPhoto} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Champ de recherche */}
      <View style={styles.searchBar}>
      <Ionicons
        name="search"
        size={scale(20)}
        color="gray"
       
      />
        <TextInput
          placeholder="Rechercher par ville de départ ou d'arrivée"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={{
            marginLeft: scale(5)
          }}
        />
       
      </View>

      {/* Liste filtrée des annonces */}
      <FlatList
        data={filteredAnnouncements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        scrollIndicatorInsets={false}
      />

      {/* Bouton flottant pour ouvrir le formulaire */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>


      {/* Modal pour le formulaire */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajouter une annonce</Text>
            <TextInput
              style={styles.input}
              placeholder="Poids disponible (kg)"
              keyboardType="numeric"
              value={formData.weightAvailable}
              onChangeText={(text) =>
                setFormData({ ...formData, weightAvailable: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Prix par kg (€)"
              keyboardType="numeric"
              value={formData.pricePerKg}
              onChangeText={(text) =>
                setFormData({ ...formData, pricePerKg: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Ville de départ"
              value={formData.departureCity}
              onChangeText={(text) =>
                setFormData({ ...formData, departureCity: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Ville d'arrivée"
              value={formData.arrivalCity}
              onChangeText={(text) =>
                setFormData({ ...formData, arrivalCity: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Date de départ (YYYY-MM-DD)"
              value={formData.departureDate}
              onChangeText={(text) =>
                setFormData({ ...formData, departureDate: text })
              }
            />
            <View style={styles.buttonContainer}>
              <Button title="Ajouter" onPress={addAnnouncement} />
              <Button
                title="Annuler"
                color="#ECBE61FF"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      
     {/* Modal pour le formulaire d'achat */}
     <Modal visible={isPurchaseModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Acheter un espace de bagage</Text>
            {selectedAnnouncement && (
              <>
                <Text style={styles.details}>
                  {selectedAnnouncement.baggageDetails.weightAvailable} kg disponibles -{" "}
                  {selectedAnnouncement.baggageDetails.pricePerKg} €/kg
                </Text>
                <Text style={styles.route}>
                  {selectedAnnouncement.baggageDetails.departureCity} →{" "}
                  {selectedAnnouncement.baggageDetails.arrivalCity}
                </Text>
              </>
            )}
            <TextInput
              style={styles.input}
              placeholder="Poids à acheter (kg)"
              keyboardType="numeric"
              value={purchaseData.weight}
              onChangeText={(text) => setPurchaseData({ ...purchaseData, weight: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description du produit"
              value={purchaseData.description}
              onChangeText={(text) =>
                setPurchaseData({ ...purchaseData, description: text })
              }
            />
            <View style={styles.buttonContainer}>
              <Button title="Acheter" onPress={handlePurchase} color="#4caf50"/>
              <Button
                title="Annuler"
                color="red"
                onPress={() => setPurchaseModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(580),
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  searchBar: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 0,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    justifyContent:'center',
    alignItems:'center',
    flexDirection: 'row',

  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  info: {
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    color: "#555",
  },
  route: {
    fontSize: 14,
    color: "#888",
  },
  date: {
    fontSize: 12,
    color: "#aaa",
  },
  productPhoto: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: verticalScale(50),
    backgroundColor: "#ECBE61FF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default App;
