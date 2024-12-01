import { View, Text, StyleSheet, TouchableOpacity, BackHandler, SafeAreaView, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../colors';
import Notification from '../notification';
import Profile from '../profile';
import { useRoute } from '@react-navigation/native';
import AnnoncesProche from './annonce';

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const backAction = () =>     {
      if (activeSection !== 'home') {
        setActiveSection('home');
        return true;
      }
      Alert.alert('Attention', 'Voulez-vous vraiment quitter l\'application?', [
        { text: 'Non', onPress: () => null, style: 'cancel' },
        { text: 'Oui', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [activeSection]);
  const route = useRoute();
  const { result} = route.params || {};
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
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
            <View style={{
              height:verticalScale(600),
              width:'100%'
            }}>
              <AnnoncesProche/>
            </View>
          </View>
        );
      case 'notifications':
        return <Notification />;
      case 'contacts':
        return <Profile/>;
      default:
        return <View />;
    }
  };

  const NavigationButton = ({ section, iconActive, iconInactive }) => (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel={section}
      onPress={() => setActiveSection(section)}
      style={[styles.navigationButton, activeSection === section ? { borderWidth: 0 } : null]}
    >
      <Ionicons
        name={activeSection === section ? iconActive : iconInactive}
        size={scale(26)}
        color={colors.white}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>
      <View style={styles.bottomNavigation}>
        <NavigationButton section="home" iconActive="home" iconInactive="home-outline" />
        <NavigationButton section="notifications" iconActive="notifications" iconInactive="notifications-outline" />
        <NavigationButton section="contacts" iconActive="menu" iconInactive="menu-outline" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor : '#fefefe'
  },
  bottomNavigation: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#4caf50',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(56),
    paddingHorizontal: scale(40),
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20)

  },
  navigationButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
