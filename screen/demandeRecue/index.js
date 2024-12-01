import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const DemandeRecue = () => {
  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const fetchPurchaseDetails = async () => {
      try {
        const storedPurchaseDetails = await AsyncStorage.getItem(
          'purchaseDetails'
        );
        if (storedPurchaseDetails) {
          setPurchaseDetails(JSON.parse(storedPurchaseDetails));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails d'achat:", error);
      }
    };

    fetchPurchaseDetails();
  }, []);

  const handleAccept = (item) => {
    console.log('Demande acceptée:', item);
    // Ici, vous pouvez gérer les demandes acceptées selon vos besoins
  };

  const handleReject = async (item) => {
    const updatedDetails = purchaseDetails.filter(
      (detail) => detail !== item
    );
    setPurchaseDetails(updatedDetails);
    try {
      await AsyncStorage.setItem(
        'purchaseDetails',
        JSON.stringify(updatedDetails)
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour des détails:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Détails de l'achat</Text>
      <Text style={styles.details}>Poids: {item.weight} kg</Text>
      <Text style={styles.details}>Description: {item.description}</Text>
      <Text style={styles.details}>Acheteur: {item.buyer}</Text>
      <Text style={styles.details}>Vendeur: {item.seller.name}</Text>
      <Text style={styles.details}>Email du vendeur: {item.seller.email}</Text>
      <Text style={styles.details}>Téléphone du vendeur: {item.seller.phone}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => handleAccept(item)}
        >
          <Text style={styles.buttonText}>Accepter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleReject(item)}
        >
          <Text style={styles.buttonText}>Refuser</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (purchaseDetails.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Chargement des détails...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#fff',
          height: verticalScale(70),
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: '40%',
            height: '50%',
            marginTop: verticalScale(25),
          }}
        >
          <Image
            source={require('../../assets/LyftBag.png')}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      </View>
      <FlatList
        data={purchaseDetails}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  card: {
    margin: verticalScale(10),
    backgroundColor: '#fff',
    width: '92%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#ECBE61FF',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DemandeRecue;
