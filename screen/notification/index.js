import { View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import { verticalScale, scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Notification = () => {
  // Liste des notifications avec des types d'événements et des messages
  const notifications = [
    { id: 1, eventType: 'delivery', message: 'Nouveau colis en attente de livraison.' },
    { id: 2, eventType: 'return', message: 'Votre demande de retour a été acceptée.' },
    { id: 3, eventType: 'message', message: 'Nouveau message de votre service client.' },
    { id: 4, eventType: 'schedule', message: 'Livraison prévue demain entre 14h et 16h.' },
    { id: 5, eventType: 'schedule', message: 'Livraison prévue demain entre 18h et 20h.' },
    { id: 6, eventType: 'schedule', message: 'Livraison prévue demain entre 22h et 00h.' },
  ];

  // Fonction pour obtenir l'icône en fonction du type d'événement
  const getIconForEvent = (eventType) => {
    switch (eventType) {
      case 'delivery':
        return 'car-outline'; // Icône de voiture pour la livraison
      case 'return':
        return 'return-up-forward'; // Icône de retour
      case 'message':
        return 'chatbubbles-outline'; // Icône de message
      case 'schedule':
        return 'calendar-outline'; // Icône de calendrier
      default:
        return 'notifications-outline'; // Icône par défaut
    }
  };

  return (
    <View style={styles.centeredContent}>
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
      <View style={styles.notificationsContainer}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notification}>
            {/* Icon on the left */}
            <View style={styles.iconContainer}>
              <Ionicons
                name={getIconForEvent(notification.eventType)} // Récupère l'icône selon l'événement
                size={30}
                color="#ECBE61FF" // Couleur de l'icône
              />
            </View>

            {/* Text in the center */}
            <Text style={styles.notificationText}>{notification.message}</Text>

            {/* Ellipsis on the right */}
            <Text style={styles.ellipsis}>...</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fefefe',
  },

  // Conteneur de toutes les notifications
  notificationsContainer: {
    width: '100%',
    paddingHorizontal: scale(15),
  },

  // Style de chaque notification
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: verticalScale(70),
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: scale(15),
    marginVertical: verticalScale(5),
  },

  // Conteneur de l'icône
  iconContainer: {
    width: verticalScale(40),
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Style pour le texte de notification
  notificationText: {
    flex: 1,
    fontSize: scale(14),
    color: '#333',
    marginLeft: scale(10),
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  // Ellipse à droite
  ellipsis: {
    fontSize: scale(20),
    color: '#333',
    marginLeft: scale(10),
  },
});

export default Notification;
