import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, BackHandler, StyleSheet} from 'react-native'
import { verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function Chat() {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
    //   { id: "1", text: "", sender: "user1" },
      { id: "2", text: "Bonjours envoyez nous n message et nous allons vous repondre rapidement", sender: "user2" },
    ]);
    const [currentUser, setCurrentUser] = useState("user1"); // "user1" ou "user2"
  
    const handleSend = () => {
      if (message.trim() === "") return;
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString(), text: message, sender: currentUser },
      ]);
      setMessage("");
    };

    const navigation = useNavigation();

    useEffect(() => {
     
      const backAction = () => {
        navigation.goBack();
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => backHandler.remove();
    }, );
  

      const renderItem = ({ item }) => {
    const isCurrentUser = item.sender === "user1"; // Messages de user1 alignés à droite
    return (
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.messageUser1 : styles.messageUser2,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };
  return (
        <View style={{ display: "flex", flexDirection: "column", height: "100%"}}>
            <View style={{ flex: 1, backgroundColor: "white", position: "relative", marginTop: verticalScale(20 )}}>
                <Text style={{ margin: 14, fontSize: 24, fontWeight: "bold", textAlign: 'center'}}>Messages</Text>
                <TouchableOpacity style={ {position: "absolute", left: 24,top: 22} }>
                    <Icon name="arrow-right" size={24} color="#ecbe61ff" style={{transform: "rotate(180deg)"}}></Icon>
                </TouchableOpacity>
                <View style={{height: "90%"}}>
                    <FlatList
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.messagesList}
                    />
                </View>
            </View>
            <View style={{position:"relative" ,backgroundColor: "#f5f5f5", height: 65, display: "flex", justifyContent: "center", margin: 10, paddingInline:14, borderRadius: 14}}>
                <TextInput
                    placeholder= "Votre message . . . "
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={ {position: "absolute", right: 20} } onPress={handleSend} >
                    <Icon name="paper-plane" size={26} color="#ecbe61ff"></Icon>
                </TouchableOpacity>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    messagesList: {
      padding: 10,
    },
    messageContainer: {
        marginVertical: 5,
        // padding: 10,
        borderRadius: 10,
        maxWidth: "80%",
    },
    messageUser1: {
        color: "white",
        alignSelf: "flex-end",
        backgroundColor: "#ecbe61ff",
    },
    messageUser2: {
        alignSelf: "flex-start",
        color: "black",
        backgroundColor: "#f5f5f5",
    },
    messageText: {
        // borderRadius: 10,
        padding: 10,
        fontSize: 16,
    },
  });

export default Chat