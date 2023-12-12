import { AppBar, Avatar } from '@react-native-material/core';
import { View, Text, StyleSheet, Pressable, TextInput, Animated, LayoutAnimation, StatusBar } from 'react-native';
import { Color } from '../../utils/Color';
import MIIcons from "react-native-vector-icons/MaterialIcons";
import MICIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useLayoutEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import IonIcon from "react-native-vector-icons/Ionicons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { useRoute } from '@react-navigation/native';
import SocketService from '../../utils/Socket';

function ChatMessage({ message, dateTime, position = "right" }) {

  // let date = dateTime.getDate() + "/" + (dateTime.getMonth() + 1) + "/" + dateTime.getFullYear();
  let time = (dateTime.getHours() - 12) + ":" + dateTime.getMinutes() + " " + (dateTime.getHours() > 12 ? "pm" : "am");

  return (
    <Pressable style={(position === "left") ? { ...styles.message, justifyContent: "flex-start" } : { ...styles.message, justifyContent: "flex-end" }}>
      <View style={styles.messageText}>
        <Text style={{ color: "black" }} >{message}</Text>
        <Text style={{ fontSize: 10, color: "black" }}>{time}</Text>
      </View>
    </Pressable>
  );
}

export default function PersonalChat({ navigation }) {
  let route = useRoute();
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const messageRef = useRef(null);

  useLayoutEffect(() => {
    messageRef.current.scrollToEnd({ animated: false });
  }, [message]);

  const handleSend = () => {
    if (message !== "") {
      let dateTime = new Date();
      setData((prev) => [...prev, {
        sender_id: "",
        receiver_id: "",
        message,
        dateTime
      }]);
      SocketService.emit("chat", {
        sender_id: "65104b92c794d3bbbd5d190e",
        receiver_id: route.params.user_id,
        message,
        dateTime
      });
      setMessage("");
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Color.primary} barStyle={'light-content'} />
      <AppBar titleStyle={{
        fontSize: 15
      }} subtitleStyle={{
        fontSize: 11
      }} style={styles.appBar} title={route.params.name} subtitle={"online"} leading={() => {
        return (
          <View style={{
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
            marginRight: -10
          }}>
            <View style={{ borderRadius: 50, overflow: "hidden" }}>
              <Pressable onPress={() => {
                navigation.goBack();
              }} android_ripple={{ color: "rgba(255,255,255,0.2)" }}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 2 }}>
                  <MIIcons name="arrow-back" size={24} color="white" />
                  <Avatar text={"T"} size={34} />
                </View>
              </Pressable>
            </View>
          </View>
        );
      }} trailing={() => {
        return (
          <View style={{
            flexDirection: "row",
            gap: 4,
            alignItems: "center"
          }}>
            <View style={{ borderRadius: 50, overflow: "hidden" }}>
              <Pressable style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center" }} android_ripple={{ color: "rgba(255,255,255,0.2)" }}>
                <MIIcons name="videocam" size={24} color="white" />
              </Pressable>
            </View>
            <View style={{ borderRadius: 50, overflow: "hidden" }}>
              <Pressable style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center" }} android_ripple={{ color: "rgba(255,255,255,0.2)" }}>
                <MIIcons name="call" size={20} color="white" />
              </Pressable>
            </View>
            <View style={{ borderRadius: 50, overflow: "hidden" }}>
              <Pressable style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center" }} android_ripple={{ color: "rgba(255,255,255,0.2)" }}>
                <MICIcons name="dots-vertical" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        );
      }} />
      <ScrollView ref={messageRef} style={styles.messageContainer}>
        <View style={styles.messageArea}>
          {
            data.map((item, index) => {
              return <ChatMessage key={index} message={item.message} dateTime={item.dateTime} />
            })
          }
        </View>
      </ScrollView>
      <View style={styles.sendMessage}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          borderRadius: 50,
          overflow: "hidden",
          backgroundColor: "white",
        }}>
          <View style={{ borderRadius: 50, overflow: "hidden", marginLeft: 5 }}>
            <Pressable style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center" }} android_ripple={{ color: "#BFC0C1" }}>
              <IonIcon name='happy-outline' size={24} color={"#8798A0"} />
            </Pressable>
          </View>
          <TextInput value={message} onChangeText={setMessage} style={styles.messageInput} placeholder='Message' placeholderTextColor={"#8798A0"} />
          <Animated.View style={{ borderRadius: 50, overflow: "hidden", marginHorizontal: 5 }}>
            <Pressable style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center" }} android_ripple={{ color: "#BFC0C1" }}>
              <IonIcon name='attach' size={26} color={"#8798A0"} />
            </Pressable>
          </Animated.View>
          {(message === "") && <View style={{ borderRadius: 50, overflow: "hidden", marginHorizontal: 5 }}>
            <Pressable style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center" }} android_ripple={{ color: "#BFC0C1" }}>
              <View style={{ borderRadius: 50, overflow: "hidden", backgroundColor: "#8798A0", width: 22, height: 22, justifyContent: "center", alignItems: "center" }}>
                <FAIcon name='rupee' size={14} color={"white"} />
              </View>
            </Pressable>
          </View>}
          {(message === "") && <View style={{ borderRadius: 50, overflow: "hidden", marginHorizontal: 5 }}>
            <Pressable style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center" }} android_ripple={{ color: "#BFC0C1" }}>
              <IonIcon name='camera' size={24} color={"#8798A0"} />
            </Pressable>
          </View>}
        </View>
        <View style={{
          borderRadius: 50,
          overflow: "hidden",
          backgroundColor: Color.primary
        }}>
          <Pressable onPress={handleSend} style={{
            padding: 12,
            justifyContent: "center",
            alignItems: "center",
          }} android_ripple={{ color: "rgba(255,255,255,0.2)" }}>
            <IonIcon name='send' size={18} color={"white"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  appBar: {
    backgroundColor: Color.primary,
    paddingHorizontal: 4
  },
  messageContainer: {
    flex: 1,
    backgroundColor: "#C4C4C4"
  },
  messageArea: {
    flex: 1,
    backgroundColor: "#C4C4C4",
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: "column",
    gap: 4
  },
  message: {
    flexDirection: "row",
    width: "100%"
  },
  messageText: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#E7FFDB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
    maxWidth: "65%",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "flex-end"
  },
  sendMessage: {
    backgroundColor: "#C4C4C4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4
  },
  messageInput: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 8,
    color: "black",
    fontSize: 16
  }
});