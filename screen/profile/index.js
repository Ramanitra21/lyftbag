import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {

  
  const transactions = [
    { country: 'Île Maurice', weight: '90 kg' },
    { country: 'France', weight: '12 kg' },
    { country: 'Allemagne', weight: '23 kg' },
  ];

  

  // Définition des boutons
  const buttons = [
    { id: 1, name: 'Nos critere', icon: 'analytics-outline', route: 'Critere' },
    { id: 2, name: 'Demande Reçue', icon: 'mail-open-outline', route: 'DemandeRecue' },
    { id: 3, name: 'Demande Envoyée', icon: 'send-outline', route: 'DemandeEnvoyee' },
    { id: 4, name: 'Contact', icon: 'chatbubble-outline', route: 'Chat' },
    { id: 5, name: 'Déconnexion', icon: 'log-out-outline', route: 'Login' },
  ];

  // Informations utilisateur
  const userInfo = {
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    city: 'Paris, France',
    profilePicture: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/516000/516652-nathan-phillips-square.jpg?impolicy=fcrop&w=1040&h=580&q=mediumHigh",
  };

  const navigation = useNavigation();

  const deconnexion = async () => {
    try {
      // Supprimer les données d'authentification de AsyncStorage ou autre stockage utilisé
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userId');
      
      // Redirection vers l'écran de connexion après déconnexion
      navigation.navigate('Login');  // Change to your actual login screen name
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };


  return (
    <View style={styles.centeredContent}>
             {/* Header Section */}
             <View style={{
              backgroundColor: '#fff',
              height : verticalScale(70),
              width : '100%',
              alignContent : 'flex-start',
              justifyContent : 'center',
            }}>
              <View style={{
                width: '40%',
                height : '50%',
                marginTop: verticalScale(25)
              }}>
                <Image source={require('../../assets/LyftBag.png')} style={{
                  width:'100%',
                  height : '100%'
                }}/>
              </View>
            </View>
      {/* Section d'informations utilisateur */}
      <View style={styles.userInfo}>
        <Image source={{uri : userInfo.profilePicture}} style={styles.profilePicture} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
          <Text style={styles.userCity}>{userInfo.city}</Text>
        </View>
      </View>

     
      {/* Boutons de navigation */}
      <View style={styles.container}>
        {buttons.map((button) => (
          <TouchableOpacity
            key={button.id}
            style={styles.button}
            onPress={() => navigation.navigate(button.route)}
          >
            {/* Icône à gauche */}
            <Ionicons name={button.icon} size={30} color="#ECBE61FF" style={styles.icon} />
            {/* Nom du bouton au centre */}
            <Text style={styles.buttonText}>{button.name}</Text>
            {/* Flèche à droite */}
            <Ionicons name="chevron-forward-outline" size={25} color="#999" style={styles.arrow} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  // Styles pour les informations utilisateur
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    width: '90%',
    padding: scale(15),
    borderRadius: scale(10),
    marginBottom: verticalScale(15),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    marginTop: verticalScale(10)
  },
  profilePicture: {
    width: verticalScale(60),
    height: verticalScale(60),
    borderRadius: verticalScale(30),
    marginRight: scale(15),
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: scale(14),
    color: '#555',
    marginTop: verticalScale(5),
  },
  userCity: {
    fontSize: scale(14),
    color: '#777',
    marginTop: verticalScale(2),
  },
  dashboard: {
    backgroundColor: '#ECBE61FF',
    width: '90%',
    borderRadius: scale(10),
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    marginBottom: verticalScale(15),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  dashboardText: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#fff',
  },
  dashboardSubText: {
    fontSize: scale(16),
    color: '#fff',
    marginTop: verticalScale(5),
  },
  container: {
    width: '100%',
    backgroundColor: '#fefefe',
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(10),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: verticalScale(60),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: scale(10),
  },
  icon: {
    marginRight: scale(15),
  },
  buttonText: {
    flex: 1,
    fontSize: scale(14),
    color: '#333',
  },
  arrow: {
    marginLeft: scale(10),
  },
});

export default Notification;
