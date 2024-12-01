import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import { View, Text, Image, SectionList, BackHandler, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const Critere = () => {
  // Données regroupées en sections
  const navigation = useNavigation()
  useEffect(() => {
     
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, );
  const sections = [
    {
      title: 'Articles Exportables (avec limites)',
      data: [
        { name: 'Bouteilles de vin', limit: '12 bouteilles' },
        { name: 'Liqueurs fortes', limit: '2 litres' },
        { name: 'Cigarettes', limit: '200 unités' },
        { name: 'Parfums', limit: '50 ml' },
        { name: 'Pâtes fraîches', limit: '10 kg' },
        { name: 'Fromage affiné', limit: '15 kg' },
        { name: 'Thon en conserve', limit: '20 boîtes' },
        { name: 'Riz gluant', limit: '30 kg' },
        { name: 'Chocolat noir', limit: '25 kg' },
        { name: 'Poissons surgelés', limit: '40 kg' },
        { name: 'Saumon fumé', limit: '35 kg' },
        { name: 'Oignons rouges', limit: '65 kg' },
        { name: 'Citrons', limit: '80 kg' },
      ],
    },
    {
      title: 'Articles Non Exportables',
      data: [
        { name: 'Produits inflammables' },
        { name: 'Substances illégales' },
        { name: 'Armes' },
        { name: 'Matériel contrefait' },
      ],
    },
  ];

  // Fonction pour afficher les éléments
  const renderItem = ({ item }) => (
    <Text style={styles.listItem}>
      {item.name}
      {item.limit && (
        <>
          {' - '}
          <Text style={styles.itemLimit}>{item.limit}</Text>
        </>
      )}
    </Text>
  );

  // Fonction pour afficher le titre de chaque section
  const renderSectionHeader = ({ section }) => (
    <Text style={styles.listTitle}>{section.title}</Text>
  );

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/LyftBag.png')}
            style={styles.image}
          />
        </View>
      </View>

      {/* SectionList pour afficher les données */}
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    height: verticalScale(70),
    width: '100%',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '40%',
    height: '50%',
    marginTop: verticalScale(25),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  listsContainer: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#ECBE61FF',
  },
  listItem: {
    fontSize: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  itemLimit: {
    fontWeight: 'bold',
    color: '#4caf50',
  },
});

export default Critere;
